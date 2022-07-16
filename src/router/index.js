//配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter);
//引入路由配置
import routes from './routes'
import store from '@/store'


// 备份VueRouter原型对象的push方法
let originPush = VueRouter.prototype.push;
//重写push|replace
//第一个参数：原来push方法传递的参数
VueRouter.prototype.push = function(location, resolve, reject) {
        if (resolve | reject) {
            //call|apply区别
            //相同点：都可以调用函数一次，可以篡改函数的上下文一次（改变一次this指向）
            //不同点：call和apply传递参数：call传递参数用逗号隔开，apply方法传递数组
            originPush.call(this, location, resolve, reject);
        } else {
            originPush.call(this, location, () => {}, () => {});
        }

    }
    // 备份VueRouter原型对象的replace方法
let originReplace = VueRouter.prototype.replace;
//重写push|replace
//第一个参数：原来replace方法传递的参数
VueRouter.prototype.replace = function(location, resolve, reject) {
        if (resolve | reject) {
            originReplace.call(this, location, resolve, reject);
        } else {
            originReplace.call(this, location, () => {}, () => {});
        }
    }
    //配置路由
const router = new VueRouter({
    routes,
    scrollBehavior() {
        //滚动行为这个函数,需要有返回值,返回值为一个对象。
        //经常可以设置滚动条x|y位置 [x|y数值的设置一般最小是零]
        return { y: 0 };
    }
})
router.beforeEach(async(to, from, next) => {
    //to:去的那个路由的信息
    //from:从那个路由而来的信息
    //next:放行函数!!!!!! 
    //第一种：next(),放行函数，放行到它想去的路由！！！
    //第二种:next(path),守卫指定放行到那个路由去?

    //用户是否登录:取决于仓库里面是否有token！！！
    //每一次路由跳转之前需要用有用户信息在跳转,没有发请求获取用户信息在跳转！！！！
    //token
    let hasToken = store.state.user.token;
    //用户信息
    let hasNickName = store.state.user.nickName;
    //用户登录
    if (hasToken) {
        //用户登录了,不能去login
        if (to.path == "/login") {
            next('/home');
        } else {
            //用户登陆了,而且还有用户信息【去的并非是login】
            if (hasNickName) {
                next();
            } else {
                //用户登陆了,但是没有用户信息 
                try {
                    //发请求获取用户信息以后在放行
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //用户没有信息，还携带token发请求获取用户信息【失败】
                    //token【学生证失效了】
                    //token失效:本地清空数据、服务器的token通知服务器清除
                    await store.dispatch('logout');
                    //回到登录页，重新获取一个新的学生证
                    next('/login');
                }
            }
        }
    } else {
        //用户未登录||目前的判断都是放行.将来这里会'回手掏'增加一些判断
        //用户未登录:不能进入/trade、/pay、/paysuccess、/center、/center/myorder  /center/teamorder
        let toPath = to.path;
        if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1) {
            next('/login?redirect=' + toPath);
        } else {
            next();
        }
    }
});

export default router