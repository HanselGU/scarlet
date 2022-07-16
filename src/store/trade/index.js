import { reqUserAddressList, reqTrade, reqSubmitOrder } from "@/api";
const state = { userAddress: [], tradeList: [], payId: '' };
const actions = {
    async getUserAddress({ commit }) {
        let result = await reqUserAddressList()

        if (result.data.code == 200) {
            commit('ADDRESSINFO', result.data.data)
        }
    },
    async getTradeInfo({ commit }) {
        let result = await reqTrade()

        if (result.data.code == 200) {
            commit('TRADEINFO', result.data.data)
        }
    },
    //提交订单:tradeNO 交易编码   data:付款人信息
    async submitInfo({ commit, state, dispatch }, { tradeNo, data }) {
        //提交订单的时候：返回一个很重要数据->订单ID【这笔交易唯一标识符:付款人、收款人】
        let result = await reqSubmitOrder(tradeNo, data);

        if (result.data.code == 200) {
            commit('SUBMITINFO', result.data.data);
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    }
};
const mutations = {
    ADDRESSINFO(state, addressInfo) {
        state.userAddress = addressInfo
    },
    TRADEINFO(state, tradeList) {
        state.tradeList = tradeList
    },
    SUBMITINFO(state, payId) {
        state.payId = payId;
    }
};
const getters = {};
export default {
    state,
    actions,
    mutations,
    getters
}