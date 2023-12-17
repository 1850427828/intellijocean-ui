import service from "@/utils/request";

//获取基本列表数据
export const getAllData = (id)=>service({
    url:'/code-gen/getAllTableInfo',
    method:"get",
    params:{id}
});

//获取历史下拉列表数据
export const getHistoryData = ()=>service({
    url:'/code-gen/history',
    method:"get",
});

//连接数据源
export const connectData = (data)=>service({
    url:'/code-gen/datasourceConnect',
    method:"post",
    data:data
});

//获取表详细信息
export const getDetilData = (data)=>service({
    url:'/code-gen/getTable',
    method:"post",
    data:data
});

//刪除一个/多个
export const deleteData = (data)=>service({
    url:'/code-gen/deleteTable',
    method:"post",
    data:data
});

//修改详细信息
export const editTableData = (data)=>service({
    url:'/code-gen/updateTable',
    method:"post",
    data:data
});

//代码生成
export const codeGen = (data,responseType)=>service({
    url:'/code-gen/gen',
    method:"post",
    data:data,
    responseType:responseType
});

//获取当前全局生成策略
export const getGenStrategy = (id)=>service({
    url:'code-gen/getGenStrategy',
    method:"get",
    params:{id}
});

//代码生成修改全局策略
export const editGenStrategy = (data)=>service({
    url:'/code-gen/updateStrategy',
    method:"post",
    data:data,
});


