//home小仓库
// import {reqCategoryList,reqGetBannerList,reqFloorList} from '@/api';

const state = {
    visitedViews: [{
        title: "",
        path: "",
        query: "",
        fullPath: "",
    },],
};

const mutations = {
    GETVISITEDVIEWS(state, visitedViews) {
        state.visitedViews = visitedViews;
    }
};

const actions = {
    async getVisitedViews({ commit }) {
        console.log("get")
        commit('GETVISITEDVIEWS', visitedViews);
    }
};

//计算属性
const getters = {};


export default {
    state,
    mutations,
    actions,
    getters
};