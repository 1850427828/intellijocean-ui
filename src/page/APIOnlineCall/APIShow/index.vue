<template>
  <div>
    <div class="box">
      <h3>api接口</h3>
      <div class="http">
        <div class="search">
          <div class="method">post</div>
          <div class="url">https://www.intellijocean.cn/api/queryIpAddress</div>
        </div>
        <el-button type="primary">发送</el-button>
      </div>
      <div>
        <el-tabs type="border-card">
          <el-tab-pane label="用户管理">用户管理</el-tab-pane>
          <el-tab-pane label="配置管理"> <CodeEditor></CodeEditor></el-tab-pane>
          <el-tab-pane label="角色管理">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import CodeEditor from "@/components/CodeEditor/index.vue";

export default {
  name: "apishow",
  components: {
    CodeEditor,
  },
  data() {
    return {
      //数据
      dataList: {},
    };
  },
  created() {},
  mounted() {
    this.dataList = this.$route.query;
    console.log(this.dataList);
  },
  methods: {},
};
</script>


<style scoped lang="less">
.box {
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 8px;

  .http {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;

    .search {
      width: 100%;
      background-color: #f5f7fa;
      border-radius: 5px;
      margin-right: 15px;
      height: 50px;
      display: flex;

      .method {
        width: 100px;
        text-align: center;
        line-height: 48px;
        color: #d45f21;
        font-weight: 700;
        font-size: 20px;
        border-right: 1px solid #d8d6d6;
      }

      .url {
        text-align: center;
        line-height: 50px;
        padding-left: 20px;
        font-size: 17px;
      }
    }
  }
}
</style>