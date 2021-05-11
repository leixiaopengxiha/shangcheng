import { createStore } from 'vuex'

export default createStore({
  state: {
    routeList:[],
    routeListOpstion:[],
    loginSt:1,
    routerpath:'/main/home',
    userList:{
      naem:11
    },
    appState:false,
    navactive:''
  },
  mutations: {
    Roterlists(state,data){
      state.routeList=data
      let arr = [{
        id: 0,
        title: "根菜单",
      },...data]
      state.routeListOpstion = arr
    },
    RouterPaths(state,data){
      state.routerpath=data
    },
    LoginSts(state,data){
      state.loginSt=data
    },
    UserLists(state,data){
      state.userList=data
    },
    AppStates(state,data){
      state.appState=data
    },
    Navactives(state,data){
      state.navactive=data
    }
  },
  actions: {
    Roterlist({commit},data){
      commit('Roterlists',data)
    },
    RouterPath({commit},data){
      commit('RouterPaths',data)
    },
    LoginSt({commit},data){
      commit('LoginSts',data)
    },
    UserList({commit},data){
      commit('UserLists',data)
    },
    AppState({commit},data){
      commit('AppStates',data)
    },
    Navactive({commit},data){
      commit('Navactives',data)
    },
  },
  modules: {
  }
})
