import service from "@/utils/request";

export const mergeChunks = (data) => service({
    url:'/chunk/upload',
    method:"get",
    params:data,
});