<template>
  <Layout classPrefix="layout">
    {{ record }}
    <NumberPad @update:value="onUpdateAmount" />
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
import { Component } from "vue-property-decorator";

type Record = {
  //对象的类型声明
  tags: string[];
  notes: string;
  type: string;
  amount: number;
};
@Component({
  components: { Types, NumberPad, Notes, Tags },
})
export default class Money extends Vue {
  tags = ["衣", "食", "住", "行"];
  record: Record = {
    tags: [],
    notes: "",
    type: "-",
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
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
