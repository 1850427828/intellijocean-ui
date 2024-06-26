//对axios进行二次封装
import axios from "axios";
import errorCode from '@/utils/errorCode'  //错误状态码
import { getToken } from '@/utils/auth'   //获取token
import { loadingService, loadingClose } from '@/utils/loading'   //加载状态
import { messageBoxConfirm } from '@/utils/messageBox'   //加载状态
import router from "@/router/index"       //引入路由
import { Message } from 'element-ui';     //消息提示
// 导入Vue实例
import Vue from 'vue';


// 创建axios实例
const service = axios.create({
  baseURL: '/api', // API基础URL
  timeout: 15000 // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(config => {
  // 是否需要设置 token
  // const isToken = (config.headers || {}).isToken === false
  // 是否需要防止数据重复提交
  // const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
  if (getToken()) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // get请求映射params参数
  // if (config.method === 'get' && config.params) {
  //   let url = config.url + '?' + tansParams(config.params);
  //   url = url.slice(0, -1);
  //   config.params = {};
  //   config.url = url;
  // }
  // if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
  //   const requestObj = {
  //     url: config.url,
  //     data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
  //     time: new Date().getTime()
  //   }
  //   const sessionObj = cache.session.getJSON('sessionObj')
  //   if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
  //     cache.session.setJSON('sessionObj', requestObj)
  //   } else {
  //     const s_url = sessionObj.url;                // 请求地址
  //     const s_data = sessionObj.data;              // 请求数据
  //     const s_time = sessionObj.time;              // 请求时间
  //     const interval = 1000;                       // 间隔时间(ms)，小于此时间视为重复提交
  //     if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
  //       const message = '数据正在处理，请勿重复提交';
  //       console.warn(`[${s_url}]: ` + message)
  //       return Promise.reject(new Error(message))
  //     } else {
  //       cache.session.setJSON('sessionObj', requestObj)
  //     }
  //   }
  // }
  loadingService();  //开启加载
  return config
}, error => {
  loadingClose();
  console.log(error)
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
  //关闭加载
  loadingClose();
  // 未设置状态码则默认成功状态
  const code = res.data.code || 200;
  // 获取错误信息
  const msg = errorCode[code] || res.data.message || errorCode['default']
  // 二进制数据则直接返回
  if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
    return res.data
  }

  if (code === 200) {
    // if (!isRelogin.show) {
    //   isRelogin.show = true;
    //   ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', { confirmButtonText: '重新登录', cancelButtonText: '取消', type: 'warning' }).then(() => {
    //     isRelogin.show = false;
    //     useUserStore().logOut().then(() => {
    //       location.href = import.meta.env.VITE_APP_CONTEXT_PATH + 'index';
    //     })
    //   }).catch(() => {
    //     isRelogin.show = false;
    //   });
    // }
    return Promise.resolve(res.data)
  }
  else if (/^30\d*/.test(code)) {
    messageBoxConfirm()
    return Promise.reject(new Error(msg))
  }
  else if (/^40\d*/.test(code)) {
    Message.error(msg);
    return Promise.reject(new Error(msg))
  }
  else if (/^50\d*/.test(code)) {
    Message.error(msg);
    return Promise.reject(new Error(msg))
  }
  else {
    Message.error(msg);
    return Promise.reject('错误码：' + code)
  }
}, error => {
  console.log('err' + error)
  let { message } = error;
  if (message == "Network Error") {
    message = "后端接口连接异常";
  } else if (message.includes("timeout")) {
    message = "系统接口请求超时";
  } else if (message.includes("Request failed with status code")) {
    message = "系统接口" + message.substr(message.length - 3) + "异常";
  }
  // ElMessage({ message: message, type: 'error', duration: 5 * 1000 })
  return Promise.reject(error)
})

//验证是不是管理员
// if(res.config.data){
//   const jsonStr = res.config.data;
//   const jsonObj = JSON.parse(jsonStr);
//   const username = jsonObj.username;
//   localStorage.setItem("userRole", username);
//   console.log("用户："+username)
// }




//对外暴露
export default service;