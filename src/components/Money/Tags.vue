<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :class="{ selected: selectedTags.indexOf(tag) >= 0 }" :key="tag.id" @click="toggle(tag)">{{ tag.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import store from '@/store/index2'
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
@Component
export default class Tags extends Vue {
  tagList = store.fetchTags() //直接获取
  selectedTags: string[] = []

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag)
    if (index >= 0) {
      this.selectedTags.splice(index, 1)
    } else {
      this.selectedTags.push(tag)
    }
    this.$emit('update:value', this.selectedTags) //触发事件,将被选中标签的值传出去
  }

  create() {
    const name = window.prompt('请输入标签名:')
    if (!name) {
      return window.alert('标签名不能为空') //先执行alert，然后return 退出函数，返回的是undefined
    }
    store.createTag(name) //因为都放到全局了，所以不用通知外面了去进行更新操作，直接调用
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background-color: white;
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      $bg: #d9d9d9;
      background: $bg;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected {
        //当标签被选中时
        background-color: darken($bg, 50%);
        color: white;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>
