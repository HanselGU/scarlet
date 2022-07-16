//二次封装axios
//创建axios实例
import axios from 'axios';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import store from '@/store'
const requests = axios.create({
    //配置对象
    //基础路径，发请求时路径中会自动添加api
    baseURL: "/api",
    //请求超时时间设置
    timeout: 5000
});
//请求拦截器
requests.interceptors.request.use((config) => {
    if (store.state.user.token) {
        config.headers.token = store.state.user.token;
    }
    if (store.state.shopcart.USER_ID) {
        config.headers.userTempId = store.state.shopcart.USER_ID;
    }
    nprogress.start();
    //返回配置对象，其中请求头属性很重要
    return config;

});
//响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调
    nprogress.done();
    return res;
}, () => {
    //失败的回调
    return Promise.reject(new Error('fail'));

});
//对外暴露
export default requests;