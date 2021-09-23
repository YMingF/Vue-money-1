<template>
  <Layout>
    <ol class="tags">
      <li>
        <span>衣</span>
        <Icon name="right" />
      </li>
      <li>
        <span>食</span>
        <Icon name="right" />
      </li>
      <li>
        <span>住</span>
        <Icon name="right" />
      </li>
      <li>
        <span>行</span>
        <Icon name="right" />
      </li>
    </ol>
    <div>
      <button>新建标签</button>
    </div>
  </Layout>
</template>

<script>
export default {
  name: "Labels",
};
</script>

<style lang="scss" scoped>
.tags {
  background-color: white;
  > li {
  }
}
</style>
