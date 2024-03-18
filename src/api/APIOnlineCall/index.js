import service from "@/utils/request";

//分页查询API
export const getAllData = (params, data) => service({
    url: '/ApiInfo/selectPage',
    method: "post",
    params: params,
    data: data,
});

//发送调用数据
export const getResult = (params, data) => service({
    url: '/ApiInfo/invoke',
    method: "post",
    params: params,
    data: data
});

