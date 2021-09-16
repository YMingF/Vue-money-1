<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
//因为要影响全局,所以样式不加scoped
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.5;
  font-family: $font-kai;
  color: #333;
}
a {
  text-decoration: none;
  color: inherit;
}
</style>
