
import clone from "@/lib/clone";
const localStorageKeyName = "recordList";
const recordListModel = {
  data:[] as RecordItem[],//单个数据的类型定义可以用as强制进行类型断言
  clone(data:RecordItem[]|RecordItem){ //深拷贝的代码,都写到这里是为了Money.vue里不出现JSON相关的内容
    return JSON.parse(JSON.stringify(data))
  },
  create(record:RecordItem){
    const record2: RecordItem = clone(record);
    record2.createdAt = new Date(); //存储当前时间
    this.data.push(record2);
  },
  fetch() {
    this.data=JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]") as RecordItem[];//说清楚返回值到底是啥类型
    return this.data
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
};
export {recordListModel };
