type RecordItem = {
    //对象的类型声明
    tags: string[];
    notes: string;
    type: string;
    amount: number; //数据类型
    createdAt?: Date; //类
  }
type Tag={
    id:string;
    name:string;
  }
type TagListModel={
    data:Tag[]
    fetch:()=>Tag[]  //设置好函数的返回值是string[]字符串数组类型
    create:(name:string)=>'success'|'duplicated' //表示返回值要么是success要么duplicated，只能是这两种值,
    update:(id:string,name:string)=>'success'|'not found'  |'duplicated'
    remove:(id:string)=>boolean
    save:()=>void //void表示没返回值
  }
interface Window{
  tagList:Tag[];
  createTag:(name:string)=>void;
  removeTag:(id:string)=>boolean;
  updateTag:TagListModel['update'] //这表示其类型和TagListModel['update']一样
  findTag:(id:string)=>Tag|undefined;
  recordList:RecordItem[]
  createRecord:(record:RecordItem)=>void
}
