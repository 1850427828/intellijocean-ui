import Vue from 'vue';
import Vuex from 'vuex';
//需要使用插件
Vue.use(Vuex);


//引入小仓库
import breadcrumb from '@/store/breadcrumb'


//对外暴露Store类的一个实例
export default new Vuex.Store({
    //实现Vuex仓库模块开发存储数据
    modules:{
        breadcrumb
    }
})