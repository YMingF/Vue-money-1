<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
//因为要影响全局,所以样式不加scoped
@import '~@/assets/style/reset.scss';
@import '~@/assets/style/helper.scss';

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  line-height: 1.5;
  font-family: $font-kai;
  color: #333;
  background-color: #f5f5f5;
}
#app {
  max-width: 500px;
  margin: 0 auto;
}
</style>
