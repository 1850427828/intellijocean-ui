//面包屑
// import {reqCategoryList,reqGetBannerList,reqFloorList} from '@/api';

const state = {
    isCollapse: false,//导航栏是否折叠
    tabList: [
        {
            title: '首页',
            path: '/home',
            name: '/home',
            query: "",
            fullPath: "",
        },
    ],//面包屑的数据:点了哪个路由,首页是一定有的
};

const mutations = {
    // 修改导航栏展开和收起的方法
    CollapseMenu(state) {
        state.isCollapse = !state.isCollapse
    },
    // 更新面包屑的数据
    SelectMenu(state, item) {
        // 如果点击的不在面包屑数据中,则添加
        const index = state.tabList.findIndex(val => val.name === item.name)
        if (index === -1) {
            state.tabList.push(item)
        }
    },
    // 删除tag:删除tabList中对应的item
    closeTag(state, item) {
        // 要删除的是state.tabList中的item
        const index = state.tabList.findIndex(val => val.name === item.name)
        state.tabList.splice(index, 1)
    }

};

//计算属性
const getters = {};


export default {
    state,
    mutations,
    getters
};