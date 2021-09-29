
import clone from "@/lib/clone";
const localStorageKeyName = "recordList";
const recordListModel = {
  data:[] as RecordItem[],//单个数据的类型定义可以用as强制进行类型断言
  
  create(record:RecordItem){
    const record2: RecordItem = clone(record);
    record2.createdAt = new Date(); //存储当前时间
    this.data.push(record2);
    this.save();
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
