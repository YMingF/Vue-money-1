<template>
  <Layout>
    <Tabs classPrefix="type" :dataSource="recordTypeList" :value.sync="type" />
    <Tabs classPrefix="interval" :dataSource="intervalList" :value.sync="interval" />
    <ol>
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">{{beautify(group.title)}}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{tagString(item.tags)}}</span>
            <span class="notes">{{item.notes}}</span>
            <span>￥{{item.amount}}</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>


<style lang='scss' scoped>
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
    background-color: white;
    &.selected {
      background-color: #c4c4c4;
      &::after {
        display: none;
      }
    }
  }
  .interval-tabs-item {
    height: 48px;
  }
}
</style>

<script lang='ts'>
import Vue from 'vue'

import Tabs from '@/components/Tabs.vue'
import intervalList from '@/constants/intervalList'
import recordTypeList from '@/constants/recordTypeList'
import { Component } from 'vue-property-decorator'
import dayjs from 'dayjs'
import clone from '@/lib/clone'
@Component({
  components: { Tabs }
})
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',')
  }
  beautify(string: string) {
    const day = dayjs(string)
    const now = dayjs() //获取到当前时间
    if (day.isSame(now, 'day')) {
      return '今天'
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天'
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天'
    } else if (day.isSame(now, 'year')) {
      //如果是同一年，就省掉年份的显示
      return day.format('M月-D日')
    } else {
      return day.format('YYYY年-M月-D日')
    }
  }
  get recordList() {
    return (this.$store.state as RootState).recordList
  }
  get groupedList() {
    const { recordList } = this //等同于recordList=this.recordList
    if (recordList.length === 0) {
      return []
    }
    const newList = clone(recordList).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())

    const result = [{ title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]] }]
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i]
      const last = result[result.length - 1]

      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current)
      } else {
        result.push({ title: dayjs(current.createdAt).format('YYYY-M-D'), items: [current] })
      }
    }
    console.log(result)
    return result
  }
  beforeCreate() {
    this.$store.commit('fetchRecords')
  }
  type = '-'
  interval = 'day'
  intervalList = intervalList
  recordTypeList = recordTypeList
}
</script>

