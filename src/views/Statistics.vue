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

    &::-webkit-scrollbar {
      display: none;
    }
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
import _ from 'lodash';

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
    const div = (this.$refs.chartWrapper as HTMLDivElement);
    div.scrollLeft = div.scrollWidth;
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

  get dataArray() {
    console.log('groupedList的值是');
    console.log(this.groupedList);
    const today = new Date();
    const array = [];
    for (let i = 0; i <= 29; i++) {
      const dateString = dayjs(today)
          .subtract(i, 'day')
          .format('YYYY-MM-DD');
      const found = _.find(this.groupedList, {title: dateString});
      array.push({
        date: dateString, value: found ? found.total : 0
      });
    }
    array.sort((a, b) => {
      if (a.date > b.date) {return 1;} else if (a.date === b.date) {return 0;} else {return -1;}
    });
    return array;
  }

  get option() {
    const keys = this.dataArray.map(item => item.date);
    const values = this.dataArray.map(item => item.value);
    console.log('array');
    console.log(this.dataArray);
    return {
      tooltip: {
        show: true, triggerOn: 'click',
        formatter: '{c}',
        position: 'top'
      },
      grid: {
        left: 0,
        right: 0,
      },
      xAxis: {

        type: 'category',
        data: keys,
        axisTick: {
          alignWithLabel: true //让刻度与数字对齐
        },
        axisLabel: {
          formatter: function (value: string, index: number) {
            // 格式化成月/日
            let date = new Date(value);
            let texts = [(date.getMonth() + 1), date.getDate() + '日'];
            return texts.join('-');
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: false
        }
      },
      series: [
        {
          symbol: 'circle',
          symbolSize: 15,
          itemStyle: {color: 'orange'},
          data: values,
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
        result.push({title: dayjs(current.createdAt).format('YYYY-M-DD'), items: [current]});
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

