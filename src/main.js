import Vue from 'vue'
import App from './App.vue'

//全局引用组件
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'
//引入路由
import router from '@/router'
import store from '@/store'

import "@/mock/mockServer"
import 'swiper/css/swiper.css'


//按需引入
import { Button, Row, Col, MessageBox, Message, Input } from 'element-ui';
//element-ui大多数组件，注册为全局组件Vue.component|Vue.use
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Input)
    //按需引入写法不同的:MessageBox、Message、Loading、Notification
Vue.prototype.$msgbox = MessageBox;
//消息提示框
Vue.prototype.$alert = MessageBox.alert;

Vue.prototype.$message = Message;
//将项目全部请求函数引入进来[分别暴露]
import * as api from '@/api';


Vue.config.productionTip = false


Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)
new Vue({
    beforeCreate() {
        //配置全局事件总线
        Vue.prototype.$bus = this;
        //通过Vue.prototype原型对象,将全部请求函数挂载到原型对象身上[VC:就可以使用请求函数]
        Vue.prototype.$api = api;
    },
    render: h => h(App),

    router,
    store
}).$mount('#app')