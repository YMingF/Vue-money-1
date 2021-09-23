<template>
  <Layout classPrefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    <!--支出收入-->
    <Types :value.sync="record.type" />
    <!--备注-->
    <Notes @update:value="onUpdateNotes" />
    <!--标签-->
    <Tags :dataSource.sync="tags" @update:value="onUpdateTags" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";

import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component, Watch } from "vue-property-decorator";
import { model } from "@/model";
import { RecordItem } from "@/custom"; //从.d.ts里导入全局的类型
const recordList = model.fetch();

@Component({
  components: { Types, NumberPad, Notes, Tags },
})
export default class Money extends Vue {
  tags = ["衣", "食", "住", "行"];
  recordList: RecordItem[] = recordList; //存储提交的记录
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "+",
    amount: 0,
  };
  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
  saveRecord() {
    const record2: RecordItem = model.clone(this.record);
    record2.createdAt = new Date(); //存储当前时间
    this.recordList.push(record2);
  }
  @Watch("recordList")
  onRecordListChange() {
    model.save(this.recordList);
  }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
