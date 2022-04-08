// 请求接口
import axios from './api'
let url = '/applicationRouter'

// 注册
export let postRegister= (data) => {
    return axios({
        url: `${url}/register`,
        method: "post",
        // 传参
        data,
    });
}
// 获取用户信息
export let getGetInfo = (data)=>{
    return axios({
        url: `${url}/GetInfo`,
        method: "get",
        // 传参
        params: {
            token:data
        }
    });
}

