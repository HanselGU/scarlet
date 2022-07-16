//二次封装axios
//创建axios实例
import axios from 'axios';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
const requests = axios.create({
    //配置对象
    //基础路径，发请求时路径中会自动添加api
    baseURL: "/mock",
    //请求超时时间设置
    timeout: 5000
});
//请求拦截器
requests.interceptors.request.use((config) => {
    nprogress.start();
    //返回配置对象，其中请求头属性很重要
    return config;

});
//响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调
    nprogress.done();
    return res.data;
}, (err) => {
    //温馨提示:某一天发请求,请求失败,请求失败的信息打印出来
    alert(err.message);
    //终止Promise链
    return new Promise();
});
//对外暴露
export default requests;