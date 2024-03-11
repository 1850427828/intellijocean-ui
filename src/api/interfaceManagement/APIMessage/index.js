import service from "@/utils/request";

//分页查询
export const getAllData = (params, data) => service({
    url: '/ApiInfo/selectPage',
    method: "post",
    params: params,
    data: data,
});

//下线api开放接口
export const publishAPI = (params) => service({
    url: '/ApiInfo/offline',
    method: "post",
    params: params,
});

//添加api开放接口信息
export const addAPI = (data) => service({
    url: '/ApiInfo/add',
    method: "post",
    data: data,
});

//删除api开放接口信息
export const deleteAPI = (data) => service({
    url: '/ApiInfo/deleteByIds',
    method: "post",
    data: data,
});

//修改api开放接口信息
export const updateAPI = (data) => service({
    url: '/ApiInfo/updateById',
    method: "post",
    data: data,
});
