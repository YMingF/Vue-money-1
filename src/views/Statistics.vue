<template>
  <Layout>
    <Tabs classPrefix="type" :dataSource="recordTypeList" :value.sync="type"/>
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart class="chart" :options="option"/>
    </div>
    <ol v-if="groupedList.length>0">
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">
          {{ beautify(group.title) }}
          <span>￥{{ group.total }}</span>
        </h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">目前暂无相关记录</div>
  </Layout>
</template>


<style lang='scss' scoped>
.noResult {
  padding: 16px;
  text-align: center;
}

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  @extend %item;
}

.record {
  background-color: white;
  @extend %item;
}

.notes {
  margin-right: auto; //让备注能够靠左显示，而不会居中
  margin-left: 16px;
  color: #999;
}

::v-deep {
  .type-tabs-item {
    background-color: #c4c4c4;

    &.selected {
      background-color: white;

      &::after {
        display: none;
      }
    }
  }

  .interval-tabs-item {
    height: 48px;
  }
}

.chart {
  width: 430%; /*因为每屏要展示7天数据,一共是30天,所以需要将近5个屏来展示所有内容*/
  &-wrapper {
    overflow: auto;
  }
}
</style>

<script lang='ts'>

import Vue from 'vue';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import {Component} from 'vue-property-decorator';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import Chart from '@/components/Chart.vue';

@Component({
  components: {Tabs, Chart}
})
export default class Statistics extends Vue {
  type = '-';
  recordTypeList = recordTypeList;

  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.map(t => t.name).join('，');
  }

  mounted() {
    (this.$refs.chartWrapper as HTMLDivElement).scrollLeft = 9999;
  }

  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs(); //获取到当前时间
    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (day.isSame(now, 'year')) {
      //如果是同一年，就省掉年份的显示
      return day.format('M月-D日');
    } else {
      return day.format('YYYY年-M月-D日');
    }
  }

  get option() {
    return {
      tooltip: {show: true},
      grid: {
        left: 0,
        right: 0,
      },
      xAxis: {
        type: 'category',
        data: [
          '1', '2', '3', '4', '5', '6', '7',
          '8', '9', '10', '11', '12', '13', '14',
          '15', '16', '17', '18', '19', '20', '21',
          '22', '23', '24', '25', '26', '27', '28',
          '29', '30',
        ]
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: false
        }
      },
      series: [
        {
          data: [
            120, 200, 150, 80, 70, 110, 130,
            120, 200, 150, 80, 70, 110, 130,
            120, 200, 150, 80, 70, 110, 130,
            120, 200, 150, 80, 70, 110, 130,
            120, 200
          ],
          type: 'line'
        }
      ]
    };
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const {recordList} = this; //等同于recordList=this.recordList

    type Result = { title: string; total?: number; items: RecordItem[] }[]

    const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    //加分支解决没有收入数据时的undefined报错
    if (newList.length === 0) {
      return [] as Result;
    }

    const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];

      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createdAt).format('YYYY-M-D'), items: [current]});
      }
    }
    //取出列表里的每一项，然后将统计到的总金额设置到total属性
    result.map(group => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    });
    return result;
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }
}
</script>

