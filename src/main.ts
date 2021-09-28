import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue'
import Layout from '@/components/Layout.vue'
import Icon from '@/components/Icon.vue'
import { tagListModel } from '@/models/tagListModel'
Vue.config.productionTip = false
Vue.component('Nav',Nav)
Vue.component('Layout',Layout)
Vue.component('Icon',Icon)

window.tagList = tagListModel.fetch(); //这里的tagList需要到custom.d.ts里申明类型，不然报错

new Vue({
  router:router,
  store,
  render: h => h(App)
}).$mount('#app')
