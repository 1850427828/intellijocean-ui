// //home小仓库
// import {reqCategoryList,reqGetBannerList,reqFloorList} from '@/api';

// const state={
//     //根据接口返回值初始化

//     //home仓库中存储的三级菜单的数据
//     categoryList:[],
//     //大轮播图的数据
//     bannerList:[],
//     //floor组件数据
//     floorList:[],
// };

// const mutations={
//     //三级联动
//     CATEGORYLIST(state,categoryList){
//         state.categoryList=categoryList;
//     },

//     //首页轮播图
//     GETBANNERLIST(state,bannerList){
//         state.bannerList=bannerList;
//     },

//     //floor组件数据
//     GETFLOORLIST(state,floorList){
//         state.floorList=floorList;
//     }


// };

// const actions={
//     //三级联动，通过API接口函数调用，向服务器发请求获取数据
//     async categoryList({commit}){
//         let result = await reqCategoryList();
//         if(result.code==200){
//             commit('CATEGORYLIST',result.data);
//         }
//     },

//     //获取首页轮播图的数据
//     async getBannerList({commit}){
//         let result=await reqGetBannerList();
//          if(result.code==200){
//             commit('GETBANNERLIST',result.data);
//         }
//     },

//     //获取floor数据
//     async getFloorList({commit}){
//         let result=await reqFloorList();
//          if(result.code==200){
//             commit('GETFLOORLIST',result.data);
//         }
//     }
// };

// //计算属性
// const getters={};


// export default {
//     state,
//     mutations,
//     actions,
//     getters
// };