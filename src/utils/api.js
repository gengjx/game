import axios from "axios";
import {Message} from "element-ui";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 首先对拦截器的请求进行设置，并在方法中return config，此处为固定格式
axios.interceptors.request.use(config => {
    // 表示在配置中的设置头消息的字段Authorization为从本地获取的token值
    if (window.sessionStorage.getItem('token') !=null){
        config.headers.Authorization = window.sessionStorage.getItem('token')
        return config
    }
    else {
        return config;
    }

})

//拦截器
axios.interceptors.response.use(resp =>{

    if (resp.data){
        return resp.data ;
    }
},error => {
    if (error.response){
        if (error.response.status == 504 || error.response.status ==404){
            //Message.error({message:"服务器被吃了"});
        }
        else if (error.response.status == 403){
            //Message.error({message:"对不起权限不足"})
        }
        else if (error.response.status ==401){
            //Message.error({message:'对不去请先登录'})
        }
        else if (error.response.status==500){
            console.log(error.response)
            Message.error({message:error.response.data.message})
        }
        else {
            Message.error({message:'未知错误'})
        }
    }
    return;



})
let base ='';
//get请求
export const getRequest =(url,params)=>{
    return axios({
        method:'get',
        url:`${base}${url}`,
        params:params,

    });
}
//post请求
export const postRequest =(url,params)=>{
    return axios({
        method:'post',
        url:`${base}${url}`,
        data:params,

    });
}
//delete
export const deleteRequest =(url,params)=>{
    return axios({
        method:'delete',
        url:`${base}${url}`,
        params:params,

    });
}

export const putRequest =(url,params)=>{
    return axios({
        method:'put',
        url:`${base}${url}`,
        data:params,

    });
}
// 添加日期范围
export function addDateRange(params, dateRange, propName) {
    var search = params;

    if (null != dateRange && '' != dateRange) {
        search.params = {};
        if (typeof(propName) === "undefined") {
            search.params["beginTime"] = dateRange[0];
            search.params["endTime"] = dateRange[1];
        } else {
            search.params["begin" + propName] = dateRange[0];
            search.params["end" + propName] = dateRange[1];
        }
    }
    return search;
}


export function handleTree(data, id, parentId, children, rootId) {
    id = id || 'id'
    parentId = parentId || 'parentId'
    children = children || 'children'
    rootId = rootId || Math.min.apply(Math, data.map(item => { return item[parentId] })) || 0
    //对源数据深度克隆
    const cloneData = JSON.parse(JSON.stringify(data))
    //循环所有项
    const treeData = cloneData.filter(father => {
        let branchArr = cloneData.filter(child => {
            //返回每一项的子级数组
            return father[id] === child[parentId]
        });
        branchArr.length > 0 ? father.children = branchArr : '';
        //返回第一层
        return father[parentId] === rootId;
    });
    console.log(treeData)
    return treeData != '' ? treeData : data;
}

export  function  statusFormat(statusOptions, status) {
    var statusOptions = statusOptions;
    for (let i = 0 ; i<statusOptions.length ;i++){

        if (statusOptions[i].dictValue === status){
            return statusOptions[i].dictLabel
        }
    }
};

export function getDicts(dict) {
    return this.$getRepquest('/system/dict/data/type/' +dict)
}
