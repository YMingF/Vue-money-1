<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" />
      <span class="title">编辑标签</span>
      <!--下面东西写到这是方便布局来实现标题的居中显示-->
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem fieldName="标签名" placeholder="请输入标签名" />
    </div>
    <div class="button-wrapper">
      <Button>删除标签 </Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import FormItem from "@/components/Money/FormItem.vue";
import Button from "@/components/Button.vue";
import { tagListModel } from "@/models/tagListModel";
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component({
  components: { FormItem, Button },
})
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

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .title {
  }
  > .leftIcon {
    width: 24px;
    height: 24px;
  }
  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}
.form-wrapper {
  background-color: white;
  margin-top: 8px;
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>
