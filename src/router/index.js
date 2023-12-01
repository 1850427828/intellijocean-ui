// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import { getToken } from '@/utils/auth'   //获取token
// import route from './route'
// 使用插件
Vue.use(VueRouter);
Vue.use(ElementUI);

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写push|replace
//第一个参数：告诉原来的push方法，往哪里跳转，后面是成功和失败
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}

const router = new VueRouter({
    // 配置路由
    routes: [
        // 重定向，在项目跑起来的时候，访问/，直接定向到首页
        {
            path: "",
            hidden: true,
            component: () => import("@/layout"),
            redirect: '/home',
            children: [
                {
                    path: "/home",
                    component: () => import("@/page/home.vue"),
                    name: '/home',
                    meta: {
                        title: "主页",
                        requiresAuth: true, //登录权限
                    }
                },
                {
                    path: "/systemTool/codeGeneration",
                    component: () => import("@/page/systemTool/codeGeneration"),
                    name: '/systemTool/codeGeneration',
                    meta: {
                        title: "代码生成页",
                        requiresAuth: true, //登录权限
                        activeMenu: '/systemTool/codeGeneration'
                    }
                },
                {
                    path: "/systemTool/codeGeneration/editor",
                    component: () => import("@/page/systemTool/codeGeneration/editor"),
                    name: '/systemTool/codeGeneration/editor',
                    meta: {
                        title: "代码生成页修改",
                        requiresAuth: true, //登录权限
                        activeMenu: '/systemTool/codeGeneration'
                    }
                },
                {
                    path: "/systemTool/systemMaintenance",
                    component: () => import("@/page/systemTool/systemMaintenance"),
                    name: '/systemTool/systemMaintenance',
                    meta: {
                        title: "111",
                        requiresAuth: true, //登录权限
                        permissions: ['admin'],
                        activeMenu: '/systemTool/systemMaintenance'
                    }
                },
            ]
        },
        {
            path: "/login",
            component: () => import("@/page/login/login.vue"),
            name: 'login',
            meta: {
                title: "登录",
                hidden: false,
                icon: 'Promotion'
            }
        }
    ]
})


router.beforeEach((to, from, next) => {
    const userToken = getToken();
    const userRole = localStorage.getItem('userRole');
    // 检查路由元信息
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // 用户需要身份验证，你可以在这里检查用户是否已登录
        if (userToken) {
            if (to.matched.some(record => record.meta.requiresAdmin)) {
                // 用户需要管理员权限，你可以在这里检查用户的权限
                if (userRole === 'admin') {
                    next() // 放行，允许管理员访问路由
                } else {
                    // 用户不是管理员，可以处理权限不足的情况
                    // 例如，重定向到一个错误页面
                    ElementUI.Message({
                        message: '您的权限不足',
                        type: 'error'
                    });
                }
            } else {
                next()
            }
        } else {
            next('/login')
        }
    } else {
        next() // 允许访问没有特殊要求的路由
    }
})

export default router
