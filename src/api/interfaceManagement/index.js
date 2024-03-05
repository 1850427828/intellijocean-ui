import service from "@/utils/request";

export const getRoleList = () => service({
    url: '/role/list',
    method: "get",
});



//分页查询所有
export const getAllData = (query, data) => service({
    url: '/role/queryList',
    method: "post",
    data: data,
    params: query
});

//添加(注册)
export const addRoleInfo = (data) => service({
    url: 'role/add',
    method: "post",
    data: data,
});

export const updateRoleInfo = (data) => service({
    url: 'role/update',
    method: "post",
    data: data,
});

export const deletesRoleInfo = (data) => service({
    url: 'role/deletes',
    method: "post",
    data: data,
});
