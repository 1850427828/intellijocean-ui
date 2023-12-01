import { Loading } from 'element-ui';
import Vue from 'vue'
let loadingInstance;

let options =
{
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
}


export const loadingService = () => {
    loadingInstance = Loading.service(options);
}

export const loadingClose = () => {
    Vue.nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        loadingInstance.close();
    });
}

