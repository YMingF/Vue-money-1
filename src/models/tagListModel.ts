
import createId from "@/lib/createId";
const localStorageKeyName = "tagList";

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
    const id=createId().toString()
    this.data.push({id,name})//等同于{id:id,name:name}
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
  remove(id:string){
    let index=-1
    for(let i=0;i<this.data.length;i++){
      if(this.data[i].id===id){
        index=i
        break
      }
    }
    this.data.splice(index,1)
    this.save()
    return true
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
};
export {tagListModel };
