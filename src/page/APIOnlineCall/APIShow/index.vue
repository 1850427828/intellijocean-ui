<template>
  <div>
    <div class="box">
      <div>api接口</div>
      <div class="http">
        <div class="search">
          <span>post</span>
          <span> http</span>
        </div>
        <el-button type="primary">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "apishow",
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


<style scoped>
.box {
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
}

.http {
  display: flex;
  justify-content: space-between;
}

.search {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-right: 15px;
}
</style>