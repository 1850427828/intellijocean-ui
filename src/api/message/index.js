import service from "@/utils/request";

//
export const login = (data)=>service({
    url:'/login',
    method:"post",
    data:data
});
