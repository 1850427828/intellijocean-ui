import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import router from '@/router/index'
import axios from 'axios';
import store from "@/store"
import VueParticles from 'vue-particles' //粒子特效
import * as echarts from 'echarts'   //echarts图表
import uploader from 'vue-simple-uploader' // 分片上传

import CodeEditor from 'bin-code-editor';
Vue.use(CodeEditor);


import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/base.css';

Vue.use(ElementUI);
Vue.use(VueParticles)
Vue.use(uploader)
Vue.prototype.$echarts = echarts;


//引入适配器
// import "amfe-flexible/index";

//关闭生产环境下的Vue提示信息
Vue.config.productionTip = false
//将axios库添加到Vue原型  可以在Vue组件中通过this.$axios来访问axios实例
Vue.prototype.$axios = axios

const EventBus = new Vue();  // 创建一个新的Vue实例作为全局事件总线
Vue.prototype.$bus = EventBus; // 将全局事件总线挂载到Vue实例的原型上


new Vue({
  render: h => h(App),
  store,
  router,

}).$mount('#app')
