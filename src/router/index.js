import { createRouter, createWebHashHistory, } from 'vue-router'

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

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {

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
  if (to.path == '/main'||to.path=='/main/home') {
    if (!stores.state.routeList.length) {
       await postRouterpage().then(( data ) => {
          if (data.code == 2000) {
            let routelist=JSON.parse(JSON.stringify(data.data))
            let sidelist=JSON.parse(JSON.stringify(data.data))
            let yijiList= Router_tree(routelist)
            let mains= routes.filter(item=>item.path=='/main')[0]
            mains.children = yijiList;
            mains.redirect = '/main/home';
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
            router.replace("/main/home");
            next();

          } else {
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

export default router
