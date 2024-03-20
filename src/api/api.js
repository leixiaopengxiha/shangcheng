// 请求接口
import axios from "axios";
import router from '../router'
import { ElMessage } from 'element-plus'
// 设置默认访问路径
axios.defaults.baseURL = process.env.VUE_APP_EXTERNAL_LINK;
axios.defaults.timeout = 2000;
// 在封装axios的文件中添加拦截器
// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(config => {
    config.cache = false
    // 设置请求头
    config.headers={
        'Access-Control-Allow-Origin': '*'
    }
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

export default axios