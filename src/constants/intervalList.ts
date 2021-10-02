//因为这个数据可能在多处被用到，所以额外新建一个文件夹和ts文件来存储，避免后续的重复代码。
export default  Object.freeze([
    { text: '按天', value: 'day' },
    { text: '按周', value: 'week' },
    { text: '按月', value: 'month' }
  ])
//Object.freeze() 能让常量连对象内容都不能改