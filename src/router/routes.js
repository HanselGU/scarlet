//引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import center from '@/pages/center2'
import myOrder from '@/pages/center2/myOrder'
import teamOrder from '@/pages/center2/teamOrder'
export default [{
        path: "/center",
        component: center,
        children: [{
                path: 'myorder',
                component: myOrder
            },
            {
                path: 'teamorder',
                component: teamOrder
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]

        ,
        meta: {
            show: true
        }
    }, {
        path: "/paySuccess",
        component: PaySuccess,

        meta: {
            show: true
        }
    }, {
        path: "/pay",
        component: Pay,

        meta: {
            show: true
        }
    },
    {
        path: "/trade",
        component: Trade,

        meta: {
            show: true
        }
    }, {
        path: "/shopcart",
        component: ShopCart,

        meta: {
            show: true
        }
    }, {
        path: "/addcartsuccess",
        component: AddCartSuccess,

        meta: {
            show: true
        }
    }, {
        path: "/detail/:skuId",
        component: Detail,
        meta: {
            show: true
        }
    }, {
        path: "/home",
        component: Home,
        meta: {
            show: true
        }
    },
    {
        path: "/search/:keyWord?",
        component: Search,
        meta: {
            show: true
        },
        name: 'search',

    },
    {
        path: "/login",
        component: Login,

    },
    {
        path: "/register",
        component: Register,
        meta: {
            show: false
        }
    },
    //重定向，项目运行时访问'/'，定向至首页
    {
        path: '*',
        redirect: '/home'
    }
]