<template>
    <div id="page">
        <el-drawer title="文件上传" :visible.sync="drawer" :direction="direction">
            <!-- <span>文件管理</span> -->
            <uploader :options="options" :autoStart="false" :fileStatusText="fileStatus" @file-added="onFileAdded"
                @file-success="onFileSuccess" @file-error="onFileError" @file-progress="onFileProgress"
                class="uploader-example">
                <uploader-unsupport></uploader-unsupport>
                <uploader-drop>
                    <uploader-btn>选择文件</uploader-btn>
                    <uploader-btn :attrs="attrs">选择图片</uploader-btn>
                    <uploader-btn :directory="true">选择文件夹</uploader-btn>
                </uploader-drop>
                <uploader-list></uploader-list>
            </uploader>


            <el-empty description="选择文件上传"></el-empty>
        </el-drawer>
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
                    @click="drawerClick()">上传文件</el-button>
            </el-row>
        </div>





        <!-- 列表渲染 -->
        <div class="table">
            <el-table :data="tableData" style="width: 100%" ref="multipleTable" tooltip-effect="dark">
                <el-table-column type="selection" min-width="60"></el-table-column>
                <el-table-column type="index" label="序号" min-width="80"></el-table-column>
                <el-table-column prop="avatar" label="预览" min-width="100">
                    <template #default="scope">
                        <el-avatar :size="45" :src="scope.row.url" fit="contain"
                            style="background-color: #fff;padding: 5px;" @error="avatarError()">
                            <img v-if="scope.row.fileSuffix === '.jpg' || scope.row.fileSuffix === '.png' || scope.row.fileSuffix === '.jpeg'"
                                src="http://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                            <img v-else-if="scope.row.fileSuffix === '.gif'" src="" />
                            <img v-else-if="scope.row.fileSuffix === '.mp3'"
                                src="http://47.120.8.164:9100/static/icon/mp3.png" />
                            <img v-else-if="scope.row.fileSuffix === '.mp4'"
                                src="http://47.120.8.164:9100/static/icon/mp4.png" />
                            <img v-else-if="scope.row.fileSuffix === '.doc' || scope.row.fileSuffix === '.docx'"
                                src="http://47.120.8.164:9100/static/icon/Word.png" />
                            <img v-else-if="scope.row.fileSuffix === '.xls' || scope.row.fileSuffix === '.xlsx'"
                                src="http://47.120.8.164:9100/static/icon/excel.png" />
                            <img v-else-if="scope.row.fileSuffix === '.zip'"
                                src="http://47.120.8.164:9100/static/icon/zip.png" />
                            <img v-else src="http://47.120.8.164:9100/static/icon/file.png" />
                        </el-avatar>
                    </template>
                </el-table-column>
                <el-table-column prop="originalName" label="文件名" min-width="120"></el-table-column>
                <el-table-column prop="fileSize" label="文件大小" min-width="80"></el-table-column>
                <el-table-column prop="fileSuffix" label="文件类型" min-width="80">
                    <template #default="scope">
                        <el-tag class="centered-tag" type="success"
                            v-if="scope.row.fileSuffix === '.jpg' || scope.row.fileSuffix === '.png' || scope.row.fileSuffix === '.jpeg'">图片</el-tag>
                        <el-tag class="centered-tag" type="success"
                            v-else-if="scope.row.fileSuffix === '.gif'">动态图片</el-tag>
                        <el-tag class="centered-tag" v-else-if="scope.row.fileSuffix === '.mp3'">音频</el-tag>
                        <el-tag class="centered-tag" v-else-if="scope.row.fileSuffix === '.mp4'">视频</el-tag>
                        <el-tag class="centered-tag" type="warning"
                            v-else-if="scope.row.fileSuffix === '.doc' || scope.row.fileSuffix === '.docx'">Word文档</el-tag>
                        <el-tag class="centered-tag" type="warning"
                            v-else-if="scope.row.fileSuffix === '.xls' || scope.row.fileSuffix === '.xlsx'">Excel表格</el-tag>
                        <el-tag class="centered-tag" v-else-if="scope.row.fileSuffix === '.zip'">压缩包</el-tag>
                        <el-tag class="centered-tag" type="info" v-else>未知类型</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="service" label="OSS厂商" min-width="150"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" min-width="160"></el-table-column>
                <!-- fixed="right" -->
                <el-table-column label="操作" min-width="160">
                    <template #default="scope">
                        <el-button @click="preview(scope.row.url)" type="text" size="small">👁预览</el-button>
                        <el-button @click="upload(scope.row.url, scope.row.originalName)" type="text"
                            size="small">🖊下载</el-button>
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

        <!-- 视频预览 -->
        <el-dialog title="预览" :visible.sync="videoPreview">
            <video alt="视频预览" width="700px" height="400px" :src="videoUrl" />
        </el-dialog>

    </div>
</template>
<script>

import SparkMD5 from 'spark-md5'
import { getToken } from '@/utils/auth'
import { mergeChunks, queryTableData, deletes, download, getUploadId } from '@/api/fileManagement'
import Pagination from "@/components/Pagination/index.vue";
export default {
    name: "fileManagement",
    components: { Pagination },
    data() {
        const token = getToken()
        const chunkSize = this.getChunkSize();

        return {
            // 抽屉是否打开
            drawer: false,
            // 抽屉打开的放向
            direction: "rtl",
            uploadId: "",
            options: {
                target: "/api/chunk/upload", //目标上传地址URL，默认值为 '/'   这个请求不会经过request.js  但是会代理api路径
                // 是否开启服务器分片校验。默认为 true   开启后文件上传时会同时向target路径发送get请求效验分片
                testChunks: true,
                query: () => ({
                    "uploadId": this.uploadId
                }),
                // 真正上传的时候使用的 HTTP 方法,默认 POST
                chunkSize: chunkSize,  //  文件分片大小 1024=1kB
                simultaneousUploads: 3, //并发上传数，默认 3。
                fileParameterName: "file",   //上传文件时文件的参数名，默认 file
                headers: {
                    // 需要携带token信息，当然看各项目情况具体定义
                    Authorization: 'Bearer ' + token,
                },  //额外的一些请求头，例如有时我们需要在header中向后台传递token，默认为对象: {}。
                maxChunkRetries: 1,   //最大自动失败重试上传次数，值可以是任意正整数，如果是 undefined 则代表无限次，默认 0。
                chunkRetryInterval: 1000,   //重试间隔，值可以是任意正整数，如果是 null 则代表立即重试，默认 null。
                parseTimeRemaining: function (timeRemaining, parsedTimeRemaining) {
                    //格式化时间
                    return parsedTimeRemaining
                        .replace(/\syears?/, "年")
                        .replace(/\days?/, "天")
                        .replace(/\shours?/, "小时")
                        .replace(/\sminutes?/, "分钟")
                        .replace(/\sseconds?/, "秒");
                },
                // 每一次分片上传成功后进入该事件 chunk第几个分片     message  后端的响应数据
                // * 检测校验是md5加密以后的事情，整个上传过程，只会执行一次。
                // * 执行一次以后，看是上传完成，还是需要继续上传
                // *
                // * 发起测试校验以后，所有分片都会进入这个回调
                // *
                // * 判断分片是否上传，秒传和断点续传基于此方法
                // * 如果后端返回的是true，代表秒传
                // * 如果后端返回[1,2,3,4,5,6,7,8,9]等(分片信息)，代表可以继续上传
                // 写了该方法之后   上传分片只会先发送一个get请求  用于效验该文件是否需要上传
                // 返回true代表文件已经上传过了  不需要再上传其他分片   实现妙传   
                // 只会发送一次get请求   之后每个分片在上传前都会通过过这个get请求的返回值来判断是否需要上传  
                // 从而实现后端返回（已上传的分片列表  这里判断哪些需要上传 实现断点续传）
                // 先进入这里 之后发送post方法上传分片
                checkChunkUploadedByResponse: (chunk, message) => {
                    let res = JSON.parse(message);
                    console.log(res)
                    if (res.code != 200) {
                        chunk.file.error = true
                        this.$message.error(res.message);
                        return;
                    }
                    if (res.data.isExist) {
                        console.log("秒传文件")
                        return true;
                    } else if (res.data.isMerge) {
                        console.log("合并文件成功")
                        return true;
                    }
                    console.log("继续上传第" + chunk.offset + "个分片")
                    return (res.data.chunkExists || []).indexOf(chunk.offset + 1) >= 0
                },

            },
            attrs: {
                accept: 'image/*'
            },
            // 文件上传的几种状态
            fileStatus: {
                success: '上传成功',
                error: '上传出错了',
                uploading: '上传中...',
                paused: '暂停',
                waiting: '等待中...',
            },

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
            // 视频预览
            videoPreview: false,
            videoUrl: "",

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
        // 下载文件
        async upload(url, originalName) {
            // download(url,originalName)
            // var downloadTask = browser.downloads.download({
            //     url: url,
            //     filename: originalName,
            //     conflictAction: "uniquify",
            // });
            // downloadTask.then(
            // (id)=>{
            //     console.log("开始下载",id)
            // },(error)=>{
            //     console.log("下载失败",error)
            // })
            window.open(url)
        },
        async deleteFile(ossId, url) {
            const data = [{
                "ossId": ossId,
                "url": url
            }]
            const res = await deletes(data)
            this.$message.success("删除成功");
            this.getTableData()
        },
        avatarError() {
            return true
        },

        //     ========================================分片上传
        getChunkSize() {
            return 1024 * 1024 * 5;
        },

        drawerClick() {
            this.drawer = true
        },

        // 添加了一个文件事件
        onFileAdded(file, event) {

            file.hqh = "123"
            /*
            *  计算文件 MD5
            * */
            this.getFileMD5(file, async (md5) => {
                if (md5 !== "") {
                    // 修改文件唯一标识
                    file.uniqueIdentifier = md5;
                    // 获取此次文件上传会话id
                    const data = {
                        "identifier": file.uniqueIdentifier,
                        "filename": file.name
                    }
                    const res = await getUploadId(data)
                    this.uploadId = res.data
                    file.resume();

                }
            });
        },
        // 一个文件上传成功事件
        async onFileSuccess(rootFile, file, message, chunk) {
            const uploadResponse = JSON.parse(message);
            if (uploadResponse.data.isExist) {
                this.$message.success("文件上传成功")
                return
            }
            // 上传成功  请求合并
            const data = {
                'totalChunks': file.chunks.length,
                'identifier': file.uniqueIdentifier,
                'filename': file.name,
                'totalSize': file.size,
                "relativePath": file.relativePath,
                "uploadId": this.uploadId
            }
            // 发送请求 合并分片
            const res = await mergeChunks(data)
            if (res.data.isMerge) {
                this.$message.success("文件上传成功")
                this.getTableData()
                return;
            }
            this.$message.error("文件上传失败");
        },
        // 上传过程中出错了
        onFileError(rootFile, file, message, chunk) {
            console.log("分片上传错误")
        },
        // 一个文件在上传中
        onFileProgress(rootFile, file, chunk) {
            console.log("文件上传中")
        },

        // 对文件进行md5 加密
        getFileMD5(file, callback) {
            var CHUNK_SIZE = this.getChunkSize();
            // 使用SparkMD5，对文件进行加密
            let spark = new SparkMD5.ArrayBuffer();
            let fileReader = new FileReader();
            //获取文件分片对象（注意它的兼容性，在不同浏览器的写法不同）
            let blobSlice =
                File.prototype.slice ||
                File.prototype.mozSlice ||
                File.prototype.webkitSlice;
            // 当前分片下标
            let currentChunk = 0;
            // 分片总数(向下取整)
            let chunks = Math.ceil(file.size / CHUNK_SIZE);
            // 暂停上传
            file.pause();
            // file.cmd5 = true;
            this.fileStatus.paused = "计算文件MD5中"
            let time = new Date().getTime();

            // 第一次加载分片的方法
            loadNext();
            // fileReader.readAsArrayBuffer，读完后的回调函数
            fileReader.onload = function (e) {
                spark.append(e.target.result);
                if (currentChunk < chunks) {
                    // console.log(`第${currentChunk}分片解析完成, 开始第${currentChunk +1} / ${chunks}分片解析`);
                    currentChunk++;
                    loadNext();
                } else {
                    // 该文件的md5值
                    let md5 = spark.end();
                    console.log(`MD5计算完成：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${file.size} 用时：${new Date().getTime() - time} ms`);
                    spark.destroy(); //释放缓存
                    // 回调传值md5
                    callback(md5);
                }
            };
            fileReader.onerror = function () {
                this.$message.error("文件读取错误");
                file.cancel();
            };

            // 加载下一个分片
            function loadNext() {
                const start = currentChunk * CHUNK_SIZE;
                const end =
                    start + CHUNK_SIZE >= file.size ? file.size : start + CHUNK_SIZE;
                // 文件分片操作，读取下一分片(fileReader.readAsArrayBuffer操作会触发onload事件)
                fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end));
            }

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