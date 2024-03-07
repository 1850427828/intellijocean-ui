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


//第三方登录:Gitee 跳转gitee授权
export const giteeLogin = ()=>service({
    url:'/giteeLogin',
    method:"get",
});

//第三方登录:gitee gitee回调
export const giteeCallback = (data)=>service({
    url:'/giteeCallback',
    method:"get",
    params:data
});

//第三方登录:wechat 获取二维码
export const weChatLogin = ()=>service({
    url:'/wx/wxQrCode',
    method:"get",
});

//第三方登录:wechat 获取扫码结果
export const weChatCheckScan = (data)=>service({
    url:'/wx/checkScan',
    method:"get",
    params:data
});

//第三方登录:获取邮箱验证码
export const getEmailUuid = (data)=>service({
    url:'/sendEmail',
    method:"get",
    params:data
});

//第三方登录:邮箱登录
export const emailLogin = (data)=>service({
    url:'/qqEmailLogin',
    method:"post",
    data:data
});