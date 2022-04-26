


// 处理组件文件路径，最后面会讲为什么使用这种方法
function routerCom(path) {
    return () => import(`@/${path}`)
}
// 动态路由处理
exports.Router_tree=(jsonData,data={
  id:'id',
  pid:'pid'
})=>{
  // 进行排序
  jsonData.sort((a,b)=>{
    return a.sortid - b.sortid
  })
  let results = [], temps = {},lens= jsonData.length
  for (let i = 0; i < lens; i++) {
    jsonData[i].meta={}
    jsonData[i].meta.keepAlive = jsonData[i]['keepAlive']==1?true:false
    jsonData[i].meta.title = jsonData[i]['title']?jsonData[i]['title']:''
    // 以id作为索引存储元素，可以无需遍历直接快速定位元素
    jsonData[i]['path'] = `/main${jsonData[i]['path']}`;
    jsonData[i]['component'] = routerCom(jsonData[i]['component']);
    temps[jsonData[i][data.id]]= jsonData[i];

  }
  for(let j=0; j<lens; j++){
    let currentElement = jsonData[j]
    let tempCurrentElementParent 
    // 判断是否是一级
    if(!!currentElement[data.pid]){
       // 临时变量里面的当前元素的父元素，即pid的值，与找对应id值
      tempCurrentElementParent  = temps[currentElement[data.pid]] 
    }
     // 如果存在父元素，即如果有pid属性
    if(tempCurrentElementParent){
      if(!tempCurrentElementParent['children']){
        // 设上父元素的children键
        tempCurrentElementParent['children'] =[]
      }
      // 给父元素加上当前元素作为子元素
      tempCurrentElementParent['children'].push(currentElement) 
    }else{
      // 不存在父元素，意味着当前元素是一级元素
      results.push(currentElement)
    }
  };
  return results;
}
