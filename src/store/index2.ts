import recordStore from "./recordStore"
import tagStore from "./tagStore"


const store={
   ...recordStore, //浅拷贝，直接把地址复制过来
   ...tagStore
    
}

export default store