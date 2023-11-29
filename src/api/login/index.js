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