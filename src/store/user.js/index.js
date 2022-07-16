import { reqGetCode, reqRegister, reqLogin, reqUserInfo, reqUserLogout } from "@/api";
const state = { code: '', token: localStorage.getItem('TOKEN'), nickName: '' };
const actions = {
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);

        if (result.data.code == 200) {
            commit("CODE", result.data.data);

        }
    },
    async Register({ commit }, user) {
        let result = await reqRegister(user);
        console.log(result)
            // if (result.data.code == 200) {
            //     commit("CODE", result.data.data);

        // }
    },
    async userLogin({ commit }, user) {
        let result = await reqLogin(user);
        localStorage.setItem('TOKEN', result.data.data.token);
        if (result.data.code == 200) {
            commit('USERLOGIN', result.data.data.token)
        }
    },
    //获取用户信息
    async getUserInfo({ commit, state, dispatch }) {
        let result = await reqUserInfo();

        if (result.data.code == 200) {
            commit('SETUSERINFO', result.data.data.nickName);
            return 'ok';
        } else {
            return Promise.reject();
        }
    },
    async logout({ commit, state, dispatch }) {
        //发请求通知服务器销毁当前token【学生证】
        let result = await reqUserLogout();
        if (result.data.code == 200) {
            commit('CLEAR');
            return 'ok';
        } else {
            return Promise.reject(new Error(result.data.message));
        }
    }

};
const mutations = {
    CLEAR(state) {
        //清除仓库相关用户信息
        state.token = '';
        state.nickName = '';
        //本地存储令牌清空
        localStorage.removeItem('TOKEN');
    },
    SETUSERINFO(state, nickName) {
        state.nickName = nickName;
    },
    CODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token
    }

};
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
};