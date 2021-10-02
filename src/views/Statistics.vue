<template>
  <Layout>
    <Tabs classPrefix="type" :dataSource="recordTypeList" :value.sync="type" />
    <Tabs classPrefix="interval" :dataSource="intervalList" :value.sync="interval" />
  </Layout>
</template>

<style lang='scss' scoped>
::v-deep .type-tabs-item {
  background-color: white;
  &.selected {
    background-color: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
</style>


<script lang='ts'>
import Vue from 'vue'
import Types from '@/components/Money/Types.vue'

import Tabs from '@/components/Tabs.vue'
import intervalList from '@/constants/intervalList'
import recordTypeList from '@/constants/recordTypeList'

import { Component } from 'vue-property-decorator'
@Component({
  components: { Types, Tabs }
})
export default class Statistics extends Vue {
  type = '-'
  interval = 'day'
  intervalList = intervalList
  recordTypeList = recordTypeList
}
</script>
