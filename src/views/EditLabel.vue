<template>
  <Layout>
    删除标签
  </Layout>
</template>

<script lang="ts">
import { tagListModel } from "@/models/tagListModel";
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class EditLabel extends Vue {
  created() {
    const id = this.$route.params.id; //this.$route.params用于得到所有参数
    tagListModel.fetch();
    const tags = tagListModel.data;
    const tag = tags.filter((t) => t.id === id)[0];
    if (tag) {
      console.log(tag);
    } else {
      this.$router.replace("/404"); //$router是路由器，可以进行转发等操作
    }
  }
}
</script>

<style lang="scss" scoped></style>
