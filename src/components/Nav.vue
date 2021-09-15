<template>
    <div class="nav">
        <router-link to='/money'>
            <svg>  
                <use href='#label' />
            </svg>
            记账
        
        </router-link>
        |
        <router-link to='/labels'>标签</router-link>
        |
        <router-link to='/statistics'>统计</router-link>
    </div>
</template>

<script>
    import x from '@/assets/icons/label.svg'
     import y from '@/assets/icons/money.svg'
    export default {
        
    }
</script>

<style lang="scss" scoped>
.nav{
    border: 1px solid  red ;
}
</style>