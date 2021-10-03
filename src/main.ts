import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue'
import Layout from '@/components/Layout.vue'
import Icon from '@/components/Icon.vue'
Vue.config.productionTip = false
Vue.component('Nav',Nav)
Vue.component('Layout',Layout)
Vue.component('Icon',Icon)

new Vue({
  router:router,
  store,
  render: h => h(App)
}).$mount('#app')

//让手机打开页面时，能够滚到最下面，显示出完整内容。
window.onload=function(){
  setTimeout(function(){
    window.scrollTo(0,1000)
  },0)
}
if(document.documentElement.clientWidth>500){
  const img=document.createElement('img')
  img.src=require('../public/qrcode.png')
  img.style.position='fixed';
  img.style.left='50%';
  img.style.top='50%';
  img.style.transform='translate(-50%,-50%)';
  img.style.boxShadow='0 0 10px rgba(0,0,0,0.25)';
  document.body.appendChild(img)
}