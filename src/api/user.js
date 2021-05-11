// 请求接口
import axios from "axios";
import router from '../router'
import { ElMessage } from 'element-plus'
// 设置默认访问路径
axios.defaults.baseURL = process.env.VUE_APP_EXTERNAL_LINK;

// 在封装axios的文件中添加拦截器
// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
    config => {
    let userList= JSON.parse(sessionStorage.getItem('userList'))
      // 判断本地的cookie中是否有token
    if (userList) {
        if(userList.token){
            config.headers['authorization'] =userList.token
        }
    } else {
        // 跳转到登录页面(这里使用router，是因为路由文件引入到了此文件里)
        // router.push('/login')
    }
    return config
    },
    error => {
      return Promise.reject(error)
    })
  
// 请求拦截 响应拦截 Interceptors 拦截器
axios.interceptors.response.use(
    (res) => {
        if(res.data.code==4001){
            sessionStorage.clear()
            ElMessage.error(res.data.message);
            router.push('/login')
        }
        return res.data;
    },
    (err) => {
        Promise.reject(err);
    }
);

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
// 获取用户列表
export let AllUserpage = ()=>{
    return axios({
        url: "/alluserpage",
        method: "post",
    });
}

// deleteuserpage
// 获取用户列表
export let Deleteuserpage = (data)=>{
    return axios({
        url: "/deleteuserpage",
        method: "post",
        data,
    });
}
// export let getStats = (a) => {
//     return axios({
//         url: "/login",
//         method: "get",
//         // 传参
//         params: {
//             user: '123123'
//         }
//     });
// }
export let postAddrouterpage = (data)=>{
    return axios({
        url: "/addrouterpage",
        method: "post",
        // 传参
        data,
    });
}

export let postDeleteRouterpage = (data)=>{
    return axios({
        url: "/deleterouterpage",
        method: "post",
        // 传参
        data,
    });
}


export let postUpdateRouterListPage = (data)=>{
    return axios({
        url: "/updaterouterlistpage",
        method: "post",
        // 传参
        data,
    });
}
