
const state = {
    routeList: [],
    routeListOpstion: [],
    loginSt: 1,
    routerpath: '/main/home', // 侧边栏默认选中状态
    userList: {
        name: 11
    },
    appState: false, // 是否是登录转态
    navactive: '',
    handleMenu: {}, 
    isAsideWidth: true, // 侧边栏是否收起
    tabList:[] // tab页签存储

};
const getters = {};
const mutations = {
    Roterlists(state, data) {
        state.routeList = data
        let arr = [{
            id: 0,
            title: "根菜单",
        }, ...data]
        state.routeListOpstion = arr
    },
    RouterPaths(state, data) {
        state.routerpath = data
    },
    LoginSts(state, data) {
        state.loginSt = data
    },
    UserLists(state, data) {
        state.userList = data
    },
    AppStates(state, data) {
        state.appState = data
    },
    Navactives(state, data) {
        state.navactive = data
    },
    HandleMenus(state, data) {
        state.handleMenu = data
    },
    isAsideWidths(state, data) {
        state.isAsideWidth = data
    },
    TabLists(state,data){
        state.tabList = [data,...state.tabList]
    },
    CloseTabLists(state,data){
        state.tabList =  data
    },
    ClosePages(state,data){
        state.tabList =  state.tabList.filter(item=>item.path!=state.routerpath);
    },
};
const actions = {
    Roterlist({ commit }, data) {
        commit('Roterlists', data)
    },
    RouterPath({ commit }, data) {
        commit('RouterPaths', data)
    },
    LoginSt({ commit }, data) {
        commit('LoginSts', data)
    },
    UserList({ commit }, data) {
        commit('UserLists', data)
    },
    AppState({ commit }, data) {
        commit('AppStates', data)
    },
    Navactive({ commit }, data) {
        commit('Navactives', data)
    },
    HandleMenu({ commit }, data) {
        commit('HandleMenus', data)
    },
    IsAsideWidth({ commit }, data) {
        commit('isAsideWidths', data)
    },
    // 页签数据
    TabList({ commit }, data) {
        commit('TabLists', data)
    },
    // 页签关闭使用
    CloseTabList({ commit }, data){
        commit('CloseTabLists', data)
    },
    // 页面关闭页签使用
    ClosePage({ commit }, data){
        commit('ClosePages', data)
    },

};
const modules = {
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
    modules,
}