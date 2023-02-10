// 请求接口
import axios from './api'
let url = '/openAiRouter'
axios.defaults.timeout = 200000;
// Ai 查询
export let GenerateAi= (data) => {
    return axios({
        url: `${url}/GenerateAi`,
        method: "post",
        // 传参
        data,
    });
}

