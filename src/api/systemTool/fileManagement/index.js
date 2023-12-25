import service from "@/utils/request";

export const queryTableData = (page, data) => service({
    url: '/oss/queryList',
    method: "post",
    data: data,
    params: page
});

export const deletes = ( data) => service({
    url: '/oss/deletes',
    method: "post",
    data: data,
});

export const mergeChunks = (data) => service({
    url: '/chunk/upload',
    method: "get",
    params: data,
});