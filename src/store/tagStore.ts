import { tagListModel } from "@/models/tagListModel";

export default{
    //tag store
    tagList :tagListModel.fetch(), //这里的tagList需要到custom.d.ts里申明类型，不然报错
    findTag(id:string){
    return this.tagList.filter((t) => t.id === id)[0];
    },
    createTag:(name:string)=>{
      const message = tagListModel.create(name);
      if (message === "duplicated") {
        window.alert("标签名重复了");
      } else if (message === "success") {
        window.alert("添加成功");
      }
    },
    removeTag:(id:string)=>{
      return tagListModel.remove(id) //返回布尔值，判定是否成功
      
    },
    updateTag:(id:string,name:string)=>{
      return tagListModel.update(id, name);
    }
}