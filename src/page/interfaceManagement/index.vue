<template>
    <div id="page">
        <!-- ===================================================================================================================== -->


        <!-- 页头搜索 -->
        <div class="input">
            <div class="input-font">
                <div class="fontdiv">文件名</div>
                <el-input placeholder="请输入文件名" v-model="searchForm.originalName" clearable size="medium"></el-input>
            </div>

            <div class="input-font">
                <div class="fontdiv">OSS厂商</div>
                <el-input placeholder="请输入OSS厂商" v-model="searchForm.service" clearable size="medium"></el-input>
            </div>

            <div class="input-font">
                <div class="fontdiv">文件类型</div>
                <el-select v-model="searchForm.fileSuffix" placeholder="请选择文件类型" clearable style="width: 160px"
                    size="medium">
                    <el-option label="图片" value=".jp" />
                    <el-option label="视频" value=".mp4" />
                    <el-option label="音频" value=".mp3" />
                    <el-option label="动图" value=".gif" />
                    <el-option label="文档" value=".doc" />
                    <el-option label="表格" value=".xls" />
                    <el-option label="压缩包" value=".zip" />
                    <el-option label="其他类型" value="other" />
                </el-select>
            </div>

            <div class="input-button input-font">
                <el-button size="medium" type="primary" icon="el-icon-search" :loading="false"
                    @click="search()">搜索</el-button>
                <el-button size="medium" plain icon="el-icon-refresh" @click="resetSearch()">重置</el-button>
            </div>
        </div>

        <!-- 页头按钮 -->
        <div class="button">
            <el-row>

                <el-button size="medium" type="primary" plain icon="el-icon-download" :disabled="false"
                    @click="drawerClick()">开放API新增</el-button>
            </el-row>
        </div>





        <!-- 列表渲染 -->
        <div class="table">
            <el-table :data="tableData" style="width: 100%" ref="multipleTable" tooltip-effect="dark">
                <el-table-column type="selection" min-width="60"></el-table-column>
                <el-table-column type="index" label="序号" min-width="80"></el-table-column>
                <el-table-column prop="originalName" label="文件名" min-width="120"></el-table-column>
                <el-table-column prop="fileSize" label="文件大小" min-width="80"></el-table-column>
                <el-table-column prop="service" label="OSS厂商" min-width="150"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" min-width="160"></el-table-column>
                <!-- fixed="right" -->
                <el-table-column label="操作" min-width="160">
                    <template #default="scope">
                        <el-button @click="preview(scope.row.url)" type="text" size="small">👁详情</el-button>
                        <el-button @click="upload(scope.row.url, scope.row.originalName)" type="text"
                            size="small">🖊发布</el-button>
                        <el-button @click="deleteFile(scope.row.ossId, scope.row.url)" type="text"
                            size="small">🗑下线</el-button>
                            <el-button @click="deleteFile(scope.row.ossId, scope.row.url)" type="text"
                            size="small">🗑删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页器 -->
        <Pagination :total="total" :page="pageNumber" :size="pageSize" @getPage="getPage($event)"
            @getSize="getSize($event)">
        </Pagination>



    </div>
</template>
<script>

import {  queryTableData, deletes,  } from '@/api/interfaceManagement'
import Pagination from "@/components/Pagination";
export default {
    name: "interfaceManagement",
    components: { Pagination },
    data() {

        return {
           

            // ======================================================
            // 搜索表单数据
            searchForm: {},
            // 表格数据
            tableData: [],
            //总条数
            total: 0,
            //当前页数
            pageNumber: 1,
            //当前每页条数
            pageSize: 5,
            // ======================================


        }
    },
    mounted() {
        this.getTableData();
    },
    methods: {




        resetSearch() {
            this.searchForm = {}
            this.getTableData()
        },
        search() {
            this.pageNumber = 1;
            this.getTableData();
        },
        async getTableData() {
            console.log(this.searchForm)
            const page = {
                "pageNumber": this.pageNumber,
                "pageSize": this.pageSize
            }
            const data = this.searchForm
            const res = await queryTableData(page, data)
            this.tableData = res.data.rows
            this.total = parseInt(res.data.total)
        },
        //获取当前页数
        getPage(value) {
            this.pageNumber = value;
            this.getTableData();
        },
        //获取每页多少条
        getSize(value) {
            this.pageSize = value;
        },
        preview(url) {
            this.videoPreview = true
            this.videoUrl = url
        },
       
    }
}
</script>

<style scoped>
.uploader-example {
    width: 600px;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
}

.uploader-example .uploader-btn {
    margin-right: 4px;
}

.uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
}

/* ============================================================================== */

.table {
    margin-top: 15px;
}

/* 表格 */
:deep .table .el-table .el-table__header-wrapper .el-table__header .el-table__cell {
    padding: 7px 0;
    font-size: 14px;
    color: #999;
    font-weight: 600px;
    text-align: center;
    background-color: #f2f2f2;
}

:deep .el-table .el-table__body-wrapper .el-table__body .el-table__row .el-table__cell .cell {
    text-overflow: clip;
    text-align: center;
}

:deep .el-dialog__body {
    display: flex;
    justify-content: center;
}


.input {
    display: flex;
    margin-top: 0;
}

.input-font {
    width: 370px;
    display: flex;
}

.input-button {
    margin-left: 15px;
}

.fontdiv {
    font-weight: 600;
    font-size: 15px;
    width: 110px;
    line-height: 36px;
    text-align: center;
    color: #999;
}

.table,
.button {
    margin-top: 15px;
}
</style>