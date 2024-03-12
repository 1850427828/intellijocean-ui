<template>
  <div class="main">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[3, 5, 6, 10, 15, 20]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
  
<script>
export default {
  name: "Pagination",
  data() {
    return {};
  },
  props: ["total", "page", "size"],
  methods: {
    handleSizeChange(val) {
      this.$emit("getSize", val);
    },
    handleCurrentChange(val) {
      this.$emit("getPage", val);
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
  justify-content: flex-end;
  margin: 15px 5px 0 0;
}
</style>
  