import service from "@/utils/request";

export const checkFileMd5 = (data) => service({
    url:'/oss/checkMd5',
    method:"post",
    data:data,
});