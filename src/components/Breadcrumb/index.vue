<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="item in breakList" :key="item.path">{{
        item.title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      breakList: [],
    };
  },
  created() {
    this.calcBreads();
  },
  mounted() {},
  methods: {
    calcBreads() {
      let temp = [{ to: "/home", title: "首页" }];
      let test = this.$route.matched
        .filter((v) => v.meta.title) //当点击的是没有子菜单的导航项时,过滤掉matched对象数组中的第二项
        .map((v) => {
          return { title: v.meta.title }; //提取path和title生成我们需要的数据格式
        });
      if (test[0].title == "首页") {
        this.breakList = [...temp];
      } else {
        this.breakList = [...temp, ...test]; //让面包屑以首页开头  => 首页 / 账号管理 / 账号添加
      }
    },
  },
  watch: {
    "$route.path"() {
      this.calcBreads();
    },
  },
};
</script>
<style scoped>
</style>