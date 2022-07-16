//在这里对API进行统一管理
import requests from './request'
import mockRequests from './mockAjax'

//三级联动接口 /api/product/getBaseCategoryList  get请求，无参数
export const reqCategoryList = () => {
    return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}

//获取首页轮播图数据的接口
export const reqBannerList = () => mockRequests({ url: '/banner', method: 'get' });

//获取Floor数据接口
export const reqFloorList = () => mockRequests({ url: '/floor', method: 'get' });

//搜索模块的请求接口函数:
//将来根据不同的搜索条件,需要给服务器携带不同的参数
//请求体携带搜索的参数
//搜索的条件:它应该是一个对象10K,可有可无，但是data至少是一个空对象
//没有发现:
//第一步:整理搜索的参数
//第二步：根据最新的搜索参数，获取最新的数据展示!!
export const reqSearchList = (data) => requests({ url: '/list', method: 'post', data })

//详情模块商品的数据
export const reqDetailList = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' });

//修改购物车数据
export const reqAddToCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' });

//请求购物车数据
export const reqShopCart = () => requests({ url: `/cart/cartList`, method: 'get' })

//删除某一个商品的接口
export const reqDeleteCart = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });

//修改某一个商品的勾选的状态
export const reqUpdateChecked = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });

//验证码
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' });

//注册
export const reqRegister = (data) => requests({ url: `/user/passport/register`, data, method: 'post' })

//登录
export const reqLogin = (data) => requests({ url: `/user/passport/login`, data, method: 'post' })

//获取用户信息 需要带着token
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })

//退出登录业务
export const reqUserLogout = () => requests({ url: `/user/passport/logout`, method: 'get' });

//获取用户收货地址信息
export const reqUserAddressList = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

//获取用户交易信息
export const reqTrade = () => requests({ url: '/order/auth/trade', method: 'get' })

//提交订单接口
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data });

//获取支付信息接口
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });

//查询支付结果
export const reqPayResult = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });


//获取我的订单
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' });