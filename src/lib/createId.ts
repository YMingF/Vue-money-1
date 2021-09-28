let id:number = parseInt(window.localStorage.getItem("_idMax")|| '0')||0 ; //前一个||'0'是保证parseInt里有一个字符串,后一个||0是保证最终结果最起码是个0，而不会是NaN
function createId() {
  id++;
  return id;
}

export default createId;
