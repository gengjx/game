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
        //Message.success({message:resp.data.msg})
    }
    return resp.data ;

},error => {
    if (error.response){
        if (error.response.status == 504 || error.response.status ==404){
            Message.error({message:"服务器被吃了"});
        }
        else if (error.response.status == 403){
            Message.error({message:"对不起权限不足"})
        }
        else if (error.response.status ==401){
            Message.error({message:'对不去请先登录'})
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
