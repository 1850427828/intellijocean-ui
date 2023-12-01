import service from "@/utils/request";

//账号密码登录
export const login = (data)=>service({
    url:'/login',
    method:"post",
    data:data
});

//获取验证码
export const getCaptcha = ()=>service({
    url:'/captchaImage',
    method:"get",
});


//第三方登录:gitee
export const giteeLogin = (data)=>service({
    url:'/giteeLogin',
    method:"get",
});

//第三方登录:gitee
export const giteeCallback = (data)=>service({
    url:'/giteeCallback',
    method:"get",
    params:data
});

//第三方登录:wechat
export const wechatLogin = (data)=>service({
    url:'/wechatLogin',
    method:"get",
});

//第三方登录:wechat
export const wechatCallback = (data)=>service({
    url:'/wechatCallback',
    method:"get",
    params:data
});