import { reqSearchList } from "@/api";
const state = { searchList: {} };
const actions = {
    async getSearchList({ commit }, params = {}) {
        let result = await reqSearchList(params);

        if (result.status == 200) {
            commit("getSearchList", result.data.data);

        }
    },
};
const mutations = {
    getSearchList(state, searchList) {
        state.searchList = searchList
    }
};
const getters = { //计算新的属性:state,当前小仓库的数据
    goodsList(state) {
        return state.searchList.goodsList;
    },
    //品牌的数据
    trademarkList(state) {
        return state.searchList.trademarkList;
    },
    //商品属性
    attrsList(state) {
        return state.searchList.attrsList;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
};