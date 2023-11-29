import service from "@/utils/request";

//账号密码登录
export const reqSubmitLogin = (data)=>service({
    url:'/login',
    method:"post",
    data:data
});

//获取验证码
export const getCaptcha = ()=>service({
    url:'/captchaImage',
    method:"get",
});


//第三方登录请求:gitee
// export const reqGiteeLogin = ()=>request({url:'user/preGiteeLogin',method:"get"});