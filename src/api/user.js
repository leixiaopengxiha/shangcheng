// 请求接口
import axios from './api'
let url = '/basicsRouter'
// 获取数据
export let postStats = (data) => {
    return axios({
        url: `${url}/regiser`,
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
        url:  `${url}/login`,
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
// 获取路由
export let postRouterpage = (data)=>{
    return axios({
        url: `${url}/routerpage`,
        method: "post",
        data,
    });
}
// 用户管理获取路由
export let AllQueryRouterList = (data)=>{
    return axios({
        url:  `${url}/queryrouterlist`,
        method: "post",
        data,
    });
}

// 获取用户列表
export let AllUserpage = (data)=>{
    return axios({
        url: `${url}/alluserpage`,
        method: "post",
        data,
    });
}
// 删除用户
export let Deleteuserpage = (data)=>{
    return axios({
        url: `${url}/deleteuserpage`,
        method: "post",
        data,
    });
}
// 新增路由
export let postAddrouterpage = (data)=>{
    return axios({
        url: `${url}/addrouterpage`,
        method: "post",
        // 传参
        data,
    });
}
// 删除配置路由
export let postDeleteRouterpage = (data)=>{
    return axios({
        url: `${url}/deleterouterpage`,
        method: "post",
        // 传参
        data,
    });
}
// 更改路由信息
export let postUpdateRouterListPage = (data)=>{
    return axios({
        url: `${url}/updaterouterlistpage`,
        method: "post",
        // 传参
        data,
    });
}
// 修改用户信息
export let postUpdateUserPage = (data)=>{
    return axios({
        url: `${url}/updateuserpage`,
        method: "post",
        // 传参
        data,
    });
}
// 修改用户密码
export let postUpdateUserPwd = (data)=>{
    return axios({
        url: `${url}/updateuserpwd`,
        method: "post",
        // 传参
        data,
    });
}

// 给用户添加路由权限
export let postUpUserRouter = (data)=>{
    return axios({
        url: `${url}/upuserrouter`,
        method: "post",
        // 传参
        data,
    });
}


// 添加角色管理
export let postAddrolemanagement = (data)=>{
    return axios({
        url: `${url}/addrolemanagement`,
        method: "post",
        // 传参
        data,
    });
}

// 添加角色人员
export let postAddRolePersonnel = (data)=>{
    return axios({
        url: `${url}/addRolePersonnel`,
        method: "post",
        // 传参
        data,
    });
}

// 添加角色路由权限
export let postAddRolePermissions = (data)=>{
    return axios({
        url: `${url}/addRolePermissions`,
        method: "post",
        // 传参
        data,
    });
}
// 获取角色管理列表
export let postAllRoleManagement = (data)=>{
    return axios({
        url: `${url}/allRoleManagement`,
        method: "post",
        // 传参
        data,
    });
}

// 修改角色管理
export let postUpdateRoleManagement = (data)=>{
    return axios({
        url: `${url}/updateRoleManagement`,
        method: "post",
        // 传参
        data,
    });
}

// 获取角色人员管理
export let postAllRolePersonnel = (data)=>{
    return axios({
        url: `${url}/allRolePersonnel`,
        method: "post",
        // 传参
        data,
    });
}

// 获取角色路由权限
export let postAllRolePermissions = (data)=>{
    return axios({
        url: `${url}/allRolePermissions`,
        method: "post",
        // 传参
        data,
    });
}

// 获取表单列表
export let postGetAllFormList = (data)=>{
    return axios({
        url: `${url}/getAllFormList`,
        method: "post",
        // 传参
        data,
    });
}

// 修改表单列表
export let postModifyFormList = (data)=>{
    return axios({
        url: `${url}/modifyFormList`,
        method: "post",
        // 传参
        data,
    });
}

// 添加表单列表
export let postAddFormList = (data)=>{
    return axios({
        url: `${url}/addFormList`,
        method: "post",
        // 传参
        data,
    });
}
