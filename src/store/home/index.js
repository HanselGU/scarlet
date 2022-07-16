import { reqCategoryList, reqBannerList, reqFloorList } from "@/api";
const state = { categoryList: [], bannerList: [], floorList: [] };
const actions = {
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.status == 200) {
            commit("CATEGORY", result.data.data);

        }
    },
    //获取首页轮播图数据
    async getBannerList({ commit }) {
        let result = await reqBannerList();

        if (result.code == 200) {
            commit("BANNERLIST", result.data);

        }
    },
    //获取Floor数据
    async getFloorList({ commit }) {
        let result = await reqFloorList();

        if (result.code == 200) {
            commit("FLOORLIST", result.data);

        }
    },
};
const mutations = {
    CATEGORY(state, categoryList) {
        state.categoryList = categoryList;
    },
    BANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    FLOORLIST(state, floorList) {
        state.floorList = floorList
    }
};
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
};