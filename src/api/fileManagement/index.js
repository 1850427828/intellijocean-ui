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

export const download=(params) =>service({
    url: '/oss/download',
    method: "get",
    params: params,
    responseType:'blob'
});

export const mergeChunks = (params) => service({
    url: '/chunk/upload',
    method: "get",
    params: params,
});

export const getUploadId=(data) =>service({
    url: '/chunk/uploadId',
    method: "post",
    data: data,
});