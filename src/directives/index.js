// 自定义组件
export default (app)=>{
  // 动态给html设置属性
  app.directive('attributes',{
    mounted(el,binding,) {
      // console.log( 'children', el)
      // console.log(binding)
      // if(data.value){
      //   for (const key in data.value) {
      //     // console.log( 'children', el.children)
      //     // el.children[0].setAttribute(key,data.value[key])
      //   }
      // }
    }
  })
  // 
}