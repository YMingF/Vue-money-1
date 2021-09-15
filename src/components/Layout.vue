<template>
   <div class="nav-wrapper">
        <div class="content">
            <slot />  <!--插槽，用于接收等下给组件传入的东西-->
        </div>
        <Nav />
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.nav-wrapper{
     border: 1px solid green;
     display: flex;
     flex-direction: column;
     height: 100vh;
 }
 .content{
     flex-grow: 1; //高度尽可能分配给.content剩余的给别人
     overflow: auto;

 }
</style>