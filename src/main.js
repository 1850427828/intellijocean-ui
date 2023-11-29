import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import router  from '@/router/index'
import axios from 'axios';
import store from "@/store"

import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/base.css';

Vue.use(ElementUI);


//引入适配器
// import "amfe-flexible/index";

//关闭生产环境下的Vue提示信息
Vue.config.productionTip = false
//将axios库添加到Vue原型  可以在Vue组件中通过this.$axios来访问axios实例
Vue.prototype.$axios = axios


// 创建一个新的Vue实例作为全局事件总线
const EventBus = new Vue();
// 将全局事件总线挂载到Vue实例的原型上
Vue.prototype.$bus = EventBus;


new Vue({
  render: h => h(App),
  store,
  router,

}).$mount('#app')
