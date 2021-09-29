<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack" />
      <span class="title">编辑标签</span>
      <!--下面东西写到这是方便布局来实现标题的居中显示-->
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem
        :value="tag.name"
        @update:value="update"
        fieldName="标签名"
        placeholder="请输入标签名"
      />
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签 </Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import FormItem from "@/components/Money/FormItem.vue";
import Button from "@/components/Button.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import store from "@/store/index2";
@Component({
  components: { FormItem, Button },
})
export default class EditLabel extends Vue {
  tag?: Tag = undefined; //声明好类型, ？表示这东西可以为空
  created() {
    //this.$route.params用于得到所有参数
    this.tag = store.findTag(this.$route.params.id); //将找到的tag赋值给前面定义的tag
    if (!this.tag) {
      this.$router.replace("/404"); //$router是路由器，可以进行转发等操作
    }
  }
  update(name: string) {
    if (this.tag) {
      store.updateTag(this.tag.id, name);
    }
  }
  remove() {
    if (this.tag) {
      if (store.removeTag(this.tag.id)) {
        this.$router.back();
      } else {
        window.alert("删除失败");
      }
    }
  }
  goBack() {
    this.$router.back();
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
