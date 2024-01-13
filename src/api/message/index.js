import service from "@/utils/request";

//分页查询所有
export const getAllData = (query, data) => service({
    url: '/user/queryList',
    method: "post",
    data: data,
    params: query
});

//添加(注册)
export const addUserInfo = (data) => service({
    url: 'user/register',
    method: "post",
    data: data,
});

export const updateUserInfo = (data) => service({
    url: 'user/update',
    method: "post",
    data: data,
});

export const deletesUserInfo = (data) => service({
    url: 'user/deletes',
    method: "post",
    data: data,
});
