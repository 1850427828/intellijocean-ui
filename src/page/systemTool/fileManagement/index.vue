<template>
    <div>
        <el-button @click="drawerClick" type="primary" style="margin-left: 16px;">
            点我打开
        </el-button>

        <el-drawer title="文件管理" :visible.sync="drawer" :direction="direction">
            <!-- <span>文件管理</span> -->
            <uploader :options="options" :autoStart="false" :fileStatusText="fileStatus" @file-added="onFileAdded"
                @file-success="onFileSuccess" @file-error="onFileError" @file-progress="onFileProgress"
                class="uploader-example">
                <uploader-unsupport></uploader-unsupport>
                <uploader-drop>
                    <p>上传文件</p>
                    <uploader-btn>选择文件</uploader-btn>
                    <uploader-btn :attrs="attrs">选择图片</uploader-btn>
                    <uploader-btn :directory="true">选择文件夹</uploader-btn>
                </uploader-drop>
                <uploader-list></uploader-list>
            </uploader>
        </el-drawer>
    </div>
</template>
<script>

import SparkMD5 from 'spark-md5'
import { getToken } from '@/utils/auth'
import { mergeChunks } from '@/api/systemTool/fileManagement/index'

export default {


    data() {
        const token = getToken()
        return {
            // 抽屉是否打开
            drawer: false,
            // 抽屉打开的放向
            direction: "rtl",
            options: {
                target: "/api/chunk/upload", //目标上传地址URL，默认值为 '/'   这个请求不会经过request.js  但是会代理api路径
                // 是否开启服务器分片校验。默认为 true   开启后文件上传时会同时向target路径发送get请求效验分片
                testChunks: true,
                // 真正上传的时候使用的 HTTP 方法,默认 POST
                chunkSize: 1024,  //  文件分片大小 1024=1kB
                simultaneousUploads: 5, //并发上传数，默认 3。
                fileParameterName: "file",   //上传文件时文件的参数名，默认 file
                headers: {
                    // 需要携带token信息，当然看各项目情况具体定义
                    Authorization: 'Bearer ' + token,
                },  //额外的一些请求头，例如有时我们需要在header中向后台传递token，默认为对象: {}。
                maxChunkRetries: 3,   //最大自动失败重试上传次数，值可以是任意正整数，如果是 undefined 则代表无限次，默认 0。
                chunkRetryInterval: 100,   //重试间隔，值可以是任意正整数，如果是 null 则代表立即重试，默认 null。
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
                // 只会发送一次get请求   之后每个分片在上传前都会经过这个方法来判断是否需要上传  
                // 从而实现后端返回（已上传的分片列表  这里判断哪些需要上传 实现断点续传）
                // 先进入这里 之后发送post方法上传分片
                checkChunkUploadedByResponse: (chunk, message) => {
                    let res = JSON.parse(message);
                    if (res.data.isExist) {
                        console.log("秒传文件")
                        this.fileStatus.success = '秒传文件';
                        return true;
                    } else if (res.data.isMerge) {
                        console.log("合并文件")
                        return true;
                    }
                    console.log("继续上传第" + chunk.offset + "个分片")
                    return (res.data.uploaded || []).indexOf(chunk.offset + 1) >= 0
                },
                // TODO  研究一下 在什么时间发送合并分片的请求 看看有没有发送post方法上传分片之后 进入的方法


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
            }

        }
    },
    mounted() {
    },

    methods: {
        drawerClick() {
            this.drawer = true
        },

        // 添加了一个文件事件
        onFileAdded(file, event) {
            // 初始化上传成功时所显示的文字
            this.fileStatus.success = "上传成功"
            /*
            *  第一步：判断文件类型是否允许上传
            * */
            // todo 判断文件类型是否允许上传

            /*
            *  第二步：计算文件 MD5，并恢复上传
            * */
            this.getFileMD5(file, async (md5) => {

                if (md5 !== "") {
                    // 修改文件唯一标识
                    file.uniqueIdentifier = md5;
                    this.fileStatus.paused = "暂停"
                    file.resume();
                    // // 请求后台判断是否上传
                    // const data = {
                    //     'totalSize': file.size,
                    //     'identifier': md5
                    // }
                    // const res = await checkFileMd5(data)
                    // if (res.data.isExist) {
                    //     this.fileStatus.success = 'md5检测秒传文件';
                    //     file.resume(); //开始上传
                    // } else {
                    //     // 恢复上传
                    //     this.fileStatus.paused="文件MD5中计算完成"
                    //     file.resume(); //开始上传
                    // }
                }
            });
        },
        // 一个文件上传成功事件
        async onFileSuccess(rootFile, file, message, chunk) {
            // 上传成功  请求合并
            const data = {
                'totalChunks': file.chunks.length,
                'identifier': file.uniqueIdentifier,
                'filename': file.name
            }
            // 发送请求 合并分片
            const res = await mergeChunks(data)
            console.log("文件上传成功")
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
            var CHUNK_SIZE = 1024
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

<style>
.uploader-example {
    width: 400px;
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
</style>