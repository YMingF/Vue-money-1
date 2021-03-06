    
import Vue from 'vue'
import Component from 'vue-class-component'

//定义对象任意字符名，避免检查为空报错
const map:{[key:string]:string}={
  'tag name duplicated':'标签名重复'
}

// You can declare mixins as the same style as components.
@Component
export class TagHelper extends Vue {
  createTag() {
    const name = window.prompt('请输入标签名:')
    if (!name) {
      return window.alert('标签名不能为空')
    }
    this.$store.commit('createTag', name)
    if(this.$store.state.createTagError){
      window.alert(map[this.$store.state.createTagError.message]|| '未知错误') //获取到错误信息并警示出来
    }
  }
}

export default TagHelper