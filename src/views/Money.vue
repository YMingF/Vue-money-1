<template>
  <Layout classPrefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    <!--支出收入-->
    <Types :value.sync="record.type" />
    <!--备注-->
    <div class="notes">
      <FormItem
        @update:value="onUpdateNotes"
        fieldName="备注"
        placeholder="在这里输入备注"
      />
    </div>

    <!--标签-->
    <Tags :dataSource.sync="tags" @update:value="onUpdateTags" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";

import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component, Watch } from "vue-property-decorator";
import { recordListModel } from "@/models/recordListModel";

import { tagListModel } from "@/models/tagListModel";
import { RecordItem } from "@/custom"; //从.d.ts里导入全局的类型

const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();

@Component({
  components: { Types, NumberPad, FormItem, Tags },
})
export default class Money extends Vue {
  tags = tagList;
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
    const record2: RecordItem = recordListModel.clone(this.record);
    record2.createdAt = new Date(); //存储当前时间
    this.recordList.push(record2);
  }
  @Watch("recordList")
  onRecordListChange() {
    recordListModel.save(this.recordList);
  }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
}
</style>
