<template>
  <Layout classPrefix="layout">
    <NumberPad />
    <Types :xxx="333" />
    <Notes />
    <Tags :dataSource.sync="tags" />
    <!--支出收入-->

    <!--备注-->

    <!--标签-->
  </Layout>
</template>

<script>
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
export default {
  name: "Money",
  components: { Types, NumberPad, Notes, Tags },
  data() {
    return {
      tags: ["衣", "食", "住", "行"],
    };
  },
};
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
