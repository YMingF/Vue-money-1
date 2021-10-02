<template>
  <Layout classPrefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    <!--支出收入-->
    <Tabs :dataSource="recordTypeList" :value.sync="record.type" />
    <!--备注-->
    <div class="notes">
      <FormItem @update:value="onUpdateNotes" fieldName="备注" placeholder="在这里输入备注" />
    </div>

    <!--标签-->
    <Tags />
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'

import NumberPad from '@/components/Money/NumberPad.vue'
import FormItem from '@/components/Money/FormItem.vue'
import Tags from '@/components/Money/Tags.vue'

import Tabs from '@/components/Tabs.vue'
import { Component } from 'vue-property-decorator'
import recordTypeList from '@/constants/recordTypeList'
@Component({
  components: { NumberPad, FormItem, Tags, Tabs }
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList
  }
  recordTypeList = recordTypeList
  record: RecordItem = {
    tags: [],
    notes: '',
    type: '+',
    amount: 0
  }
  created() {
    //一开始调用下fetch拿好数据
    this.$store.commit('fetchRecords')
  }

  onUpdateNotes(value: string) {
    this.record.notes = value
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value)
  }
  saveRecord() {
    this.$store.commit('createRecord', this.record)
  }
}
</script>
<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
}
</style>
