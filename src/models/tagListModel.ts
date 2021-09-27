
import { RecordItem } from "@/custom";
const localStorageKeyName = "tagList";
type Tag={
  id:string;
  name:string
}
type TagListModel={
  data:Tag[]
  fetch:()=>Tag[]  //设置好函数的返回值是string[]字符串数组类型
  create:(name:string)=>'success'|'duplicated' //表示返回值要么是success要么duplicated，只能是这两种值,
  update:(id:string,name:string)=>'success'|'not found'  |'duplicated'
  save:()=>void //void表示没返回值
}
const tagListModel:TagListModel = {
  data:[],
  fetch() {
    this.data= JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]") ;//说清楚返回值到底是啥类型
    return this.data
  },
  create(name){
    //this.data=[{id:'1',name:'1'},{id:"2",name:"2"}]
    const names=this.data.map(item=>item.name)//把data里每一项的name收集起来，得到一个新的数组
    if(names.indexOf(name)>=0){return 'duplicated'}  //检测是否有重复数据
    this.data.push({id:name,name:name})
    this.save()
    return 'success'
  },
  //将对应id的name进行更新
  update(id,name){
    const idList=this.data.map(item=>item.id)
   
    if( idList.indexOf(id)>=0){
        const names=this.data.map(item=>item.name)
        if(names.indexOf(name)>=0){
          return 'duplicated'
        }else{
          const tag=this.data.filter(item=>item.id===id)[0]
          tag.name=name 
          this.save()
          return 'success'
        }
    }else{
      return 'not found'
    }
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
};
export {tagListModel };
