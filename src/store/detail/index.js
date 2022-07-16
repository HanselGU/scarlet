import { reqDetailList, reqAddToCart } from "@/api";
const state = { detailList: {} };
const actions = {
    async detailList({ commit }, params) {
        let result = await reqDetailList(params);

        if (result.data.code == 200) {
            commit("DETAIL", result.data.data);
        }
    },
    //加入购物车|将来修改商品个数的地方,右侧是载荷对象【两个K,两个V】
    async addToCart({ state, commit, dispatch }, { skuId, skuNum }) {
        //底下即为：加入购物车(修改商品个数)的请求,参数顺序不能瞎写
        let result = await reqAddToCart(skuId, skuNum);
        // console.log(result)
        if (result.data.code == 200) {
            //如果加入购物车成功,返回promise即为成功
            return "ok";
        } else {
            //如果加入购物车失败，返回失败的Promise
            return Promise.reject();
        }
        //思考问题:目的是前端把商品的ID、商品个数传递给服务器【人家服务器，兄弟我收到了,没有额外的给你传递其余的数据】
        //想的问题:豪哥不对，咱们以前经常commit条件mutation存储数据【没有返回数据，没有数据可存储】,没有需要提交mutation让仓库
        //存储数据
        //第一种解决方案code,完全可以！！！！

    }
};
const mutations = {
    DETAIL(state, detailList) {
        state.detailList = detailList;
    }
};
const getters = {
    categoryView(state) {
        //研究这个问题:
        //起始状态:state.detailList起始状态空对象,空对象.categoryView->undefined
        //当服务器数据回来之后state.detailList,并非空对象,获取的即为服务器返回的数据{7个K}
        //当前属性值:服务器的数据有值，用服务器的。服务器数据没有回来至少有一个空对象兜底【不能undefined兜底】
        return state.detailList.categoryView || {}
    },
    //商品信息的数据
    skuInfo() {
        return state.detailList.skuInfo || {}
    },
    //商品销售属性列表的数据
    spuSaleAttrList() {
        return state.detailList.spuSaleAttrList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
};