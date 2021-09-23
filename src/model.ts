
import { RecordItem } from "@/custom";
const localStorageKeyName = "recordList";
const model = {
  clone(data:RecordItem[]|RecordItem){ //深拷贝的代码,都写到这里是为了Money.vue里不出现JSON相关的内容
    return JSON.parse(JSON.stringify(data))
  },
  fetch() {
    return JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]") as RecordItem[];//说清楚返回值到底是啥类型
  },
  save(data:RecordItem[]) {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  },
};
export { model };
