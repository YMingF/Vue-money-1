<template>
  <Layout>
    <Tabs classPrefix="type" :dataSource="recordTypeList" :value.sync="type" />
    <Tabs classPrefix="interval" :dataSource="intervalList" :value.sync="interval" />
    <ol>
      <li v-for="(group,index) in result" :key="index">
        <h3 class="title">{{group.title}}</h3>
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
@Component({
  components: { Tabs }
})
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',')
  }
  get recordList() {
    return (this.$store.state as RootState).recordList
  }
  get result() {
    const { recordList } = this //等同于recordList=this.recordList
    type HashTabelValue = { title: string; items: RecordItem[] }
    const hashTabel: { [key: string]: HashTabelValue } = {}
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createdAt!.split('T')
      hashTabel[date] = hashTabel[date] || { title: date, items: [] } //当前这时间对应有没有数据，若没有赋值一个初始数据，方便后面的新增
      hashTabel[date].items.push(recordList[i])
    }
    console.log('hashTabel的值来了')
    console.log(hashTabel)
    return hashTabel
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

