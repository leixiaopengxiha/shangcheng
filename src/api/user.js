// 请求接口
import axios from './api'

// 获取数据
export let postStats = (data) => {
    return axios({
        url: "/regiser",
        method: "post",
        // 传参
        data: {
            username:data.username,
            password:data.password
        }
    });
}
// 登录
export let postLogin= (data) => {
    return axios({
        url: "/login",
        method: "post",
        // 传参
        data: {
            username:data.username,
            password:data.password
        }
    });
}
// 注册
export let postRegister= (data) => {
    return axios({
        url: "/register",
        method: "post",
        // 传参
        data,
    });
}
// 获取用户信息
export let getGetInfo = (data)=>{
    return axios({
        url: "/GetInfo",
        method: "get",
        // 传参
        params: {
            token:data
        }
    });
}
// 获取路由
export let postRouterpage = ()=>{
    return axios({
        url: "/routerpage",
        method: "post",
    });
}
// 用户管理获取路由
export let AllQueryRouterList = (data)=>{
    return axios({
        url: "/queryrouterlist",
        method: "post",
        data,
    });
}

// 获取用户列表
export let AllUserpage = (data)=>{
    return axios({
        url: "/alluserpage",
        method: "post",
        data,
    });
}
// 删除用户
export let Deleteuserpage = (data)=>{
    return axios({
        url: "/deleteuserpage",
        method: "post",
        data,
    });
}
// 新增路由
export let postAddrouterpage = (data)=>{
    return axios({
        url: "/addrouterpage",
        method: "post",
        // 传参
        data,
    });
}
// 删除配置路由
export let postDeleteRouterpage = (data)=>{
    return axios({
        url: "/deleterouterpage",
        method: "post",
        // 传参
        data,
    });
}
// 更改路由信息
export let postUpdateRouterListPage = (data)=>{
    return axios({
        url: "/updaterouterlistpage",
        method: "post",
        // 传参
        data,
    });
}
// 修改用户信息
export let postUpdateUserPage = (data)=>{
    return axios({
        url: "/updateuserpage",
        method: "post",
        // 传参
        data,
    });
}
// 修改用户密码
export let postUpdateUserPwd = (data)=>{
    return axios({
        url: "/updateuserpwd",
        method: "post",
        // 传参
        data,
    });
}
