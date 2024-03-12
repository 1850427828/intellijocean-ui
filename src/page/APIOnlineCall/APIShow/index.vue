<template>
  <div>
    <div class="box">11</div>
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
</style>