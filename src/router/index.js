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
    path: '/404',
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
    stores.dispatch("Navactive", navactive?navactive:'');
   let aa= to.path.indexOf(navactive)
   if(aa!=0){
    stores.dispatch('Navactive','')
    sessionStorage.getItem("navactive");
   }
  }
  if(to.path=='/main/home'){
   let aa= stores.state.routerpath.indexOf(stores.state.navactive)
   if(aa==-1){
    stores.dispatch('Navactive','')
   }
  }
  if(to.path=='/login'){
     sessionStorage.clear()
     stores.dispatch('Navactive','')
     stores.dispatch("RouterPath", "/main");
   }
  if(to.path=='/404'){
    stores.dispatch("RouterPath", "/main");
  }
  // 进入系统动态获取地址
  if (to.path.indexOf('/main')!= -1 || to.path == '/404') {
    if (!stores.state.routeList.length) {
       await postRouterpage().then(( data ) => {
          if (data.code == 2000) {
            let routelist=JSON.parse(JSON.stringify(data.data))
            let sidelist=JSON.parse(JSON.stringify(data.data))
            let yijiList= Router_tree(routelist)
            let mains= routes.filter(item=>item.path=='/main')[0]
            mains.children =[ ...routePageLists,...yijiList];
            let navactive = sessionStorage.getItem("navactive");
            let urls = sessionStorage.getItem("urls");
            let isurls = (urls=='/404' ? '/main/home' : urls)
            let url = urls ? isurls : '/main/home'
            if(!navactive){
              sessionStorage.setItem("navactive",'/main/home');
            }
            stores.dispatch('RouterPath',url)
            mains.redirect = url
            let sidebarLsit= sidelist.filter(item=>item.sidebar==1)
            let sidebarLsits=[]
            if(sidebarLsit.length){
              sidebarLsits= Router_tree(sidebarLsit);
            }
            stores.dispatch('Roterlist',sidebarLsits );
            // 添加404页面
            let err={ path: '/:pathMatch(.*)*', redirect: '/404'};
            router.addRoute(mains);
            router.addRoute(err);
            stores.dispatch('AppState',true );
            router.replace(url);
            next();

          } else {
            ElMessage.error(data.message);
            stores.dispatch('AppState',true );
            router.replace("/login");
            next();
          }
        }).catch(err=>{
          router.replace("/login");
          next();
          stores.dispatch('AppState',true );
          ElMessage.error('服务器异常请联系管理员');
        })
    }else{
      stores.dispatch('AppState',true );
      next()
    }
  } else {
      stores.dispatch('AppState',true );
      next();
  }

})

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});

export default router
