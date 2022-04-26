import { createRouter,createWebHashHistory, createWebHistory } from 'vue-router'

// import axios from 'axios'
import stores from '../store/index'
import {Router_tree} from '../util/router_tree'
import { ElMessage } from 'element-plus'
import {postRouterpage} from '../api/user'
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('@/views/Main.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('../views/404.vue'),
  },
  
]
// 一些配置页面可以配置为本地
let routePageLists=[
    {
      path: '/main/home/myas1',
      name: 'myas1',
      component: () => import('../views/haha.vue'),
    },
    { path: '/main/:pathMatch(.*)*',  component: () => import('../views/main-404.vue')}
]

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(),
  scrollBehavior: () => ({ y: 0 }),
  routes
})

router.beforeEach(async (to, from, next) => {
  if(to.path=='/'){
    sessionStorage.clear()
    next('/login');
  }
  if(to.path!='/login'||to.path!='/main'||to.path!='/main/home'){
    let navactive = sessionStorage.getItem("navactive");
    stores.dispatch("user/Navactive", navactive?navactive:'');
    stores.dispatch("user/RouterPath", to.path);
    let aa= to.path.indexOf(navactive)
    if(aa!=0){
      stores.dispatch('user/Navactive','');
      stores.dispatch("user/RouterPath", "/main");
      sessionStorage.getItem("navactive");
    }
  }
  if(to.path=='/main/home'){
   let aa= stores.state.user.routerpath.indexOf(stores.state.user.navactive)
   if(aa==-1){
    stores.dispatch('user/CloseTabList',[])
    stores.dispatch('user/Navactive','')
   }
  }
  if(to.path=='/login'){
     sessionStorage.clear()
     stores.dispatch('user/Navactive','')
     stores.dispatch('user/CloseTabList',[])
     stores.dispatch("user/RouterPath", "/main");
   }
  if(to.path=='/404'){
    stores.dispatch('user/Navactive','/main')
    stores.dispatch("user/RouterPath", "/main");
  }
  // 进入系统动态获取地址
  if (to.path.indexOf('/main')!= -1 || to.path == '/404') {
    if (!stores.state.user.routeList.length) {
       await postRouterpage().then(( data ) => {
          if (data.code == 2000) {
            let routelist=JSON.parse(JSON.stringify(data.data))
            let sidelist=JSON.parse(JSON.stringify(data.data))
            let yijiList= Router_tree(routelist)
            let mains= routes.filter(item=>item.path=='/main')[0]
            mains.children =[ ...routePageLists,...yijiList];
            let urlsa = sessionStorage.getItem("urls");
            // 地址栏跳转页面的时候使用
            let wsr = window.history.state.current.split('/')
            if(urlsa&&(window.history.state.current!=urlsa)&&(window.history.state.current.indexOf('/main/')!=-1)&&wsr[2].length){
              sessionStorage.setItem("urls",window.history.state.current);
              let wsr = window.history.state.current.split('/')
              sessionStorage.setItem("navactive",`/${wsr[1]}/${wsr[2]}`);
            }
            let navactive = sessionStorage.getItem("navactive");
            let urls = sessionStorage.getItem("urls");
            let isurls = (urls=='/404' ? '/main/home' : urls)
            let url = urls ? isurls : '/main/home'
            if(!navactive){
              sessionStorage.setItem("navactive",'/main/home');
            }
            stores.dispatch('user/RouterPath',url)
            mains.redirect = url
            let sidebarLsit= sidelist.filter(item=>item.sidebar==1)
            let sidebarLsits=[]
            if(sidebarLsit.length){
              sidebarLsits= Router_tree(sidebarLsit);
            }
            stores.dispatch('user/Roterlist',sidebarLsits );
            // 添加404页面
            // let err={ path: '/:pathMatch(.*)*', redirect: '/main/404'};
            router.addRoute(mains);
            // router.addRoute(err);
            stores.dispatch('user/AppState',true );
            router.replace(url);
            next();

          } else {
            ElMessage.error(data.message);
            stores.dispatch('user/AppState',true );
            router.replace("/login");
            next();
          }
        }).catch(err=>{
          router.replace("/login");
          sessionStorage.clear();
          next();
          stores.dispatch('user/AppState',true );
          ElMessage.error('服务器异常请联系管理员');
        })
    }else{
      let navactives = sessionStorage.getItem("navactive");
      if(navactives){
        let isPath = stores.state.user.tabList.some(item=>item.path==to.path)
        if(!isPath){
          stores.dispatch("user/TabList", {path:to.path,title:to.meta?.title,navactive:navactives});
        }
      }
      stores.dispatch('user/AppState',true );
      next()
    }
  } else {
      stores.dispatch('user/AppState',true );
      next();
  }

})

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  if(!isChunkLoadFailed){
    const componentDefault = /Couldn't resolve component "default"/g;
    const isComponentDefault = error.message.match(componentDefault);
    if(isComponentDefault){
      let errArr = error.message.split(' ')
      let arrl = errArr[errArr.length-1]
      router.push(arrl.substring(1,arrl.length-2)); 
    }
  }else {
    const targetPath = router?.history?.pending?.fullPath;
    router.push(targetPath);
  }
});

export default router
