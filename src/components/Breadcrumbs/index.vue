<template>
  <div>
    <el-scrollbar
      ref="scrollContainer"
      :vertical="false"
      class="scroll-container"
      @wheel.prevent="handleScroll"
    >
      <router-link
        v-for="(tag, index) in visitedViews"
        :key="index"
        :data-path="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        class="tags-view-item"
      >
        {{ tag.title }}
        <span
          @click.prevent.stop="closeSelectedTag(tag, index)"
          v-if="tag.name != '/home'"
        >
          <i class="el-icon-close"></i>
        </span>
      </router-link>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.calcBreads();
  },

  //获取state里的面包屑数据
  computed: {
    ...mapState({
      visitedViews: (state) => state.breadcrumb.tabList,
    }),
  },
  methods: {
    //添加面包屑
    calcBreads() {
      let test = this.$route.matched.filter((v) => v.name); //当点击的是没有子菜单的导航项时,过滤掉matched对象数组中的第二项
      // console.log(test);
      let item = {
        title: test[0].meta.title,
        path: test[0].path,
        name: test[0].name,
        query: "",
        fullPath: "",
      }; //提取path和title生成我们需要的数据格式
      this.$store.commit("SelectMenu", item);
    },

    //样式是否展示
    isActive(r) {
      return r.path === this.$route.path;
    },

    //关闭面包屑
    closeSelectedTag(item, index) {
      // 删除面包屑数据
      this.$store.commit("closeTag", item);
      // 如果删除的刚好是自己
      if (item.name === this.$route.name) {
        const length = this.visitedViews.length;
        // 如果删除的是最后一个:跳到前一个
        if (length === index) {
          this.$router.push({ name: this.visitedViews[index - 1].name });
        }
        // 不是最后一个:往后一个
        else {
          this.$router.push({ name: this.visitedViews[index].name });
        }
      }
    },
  },

  //监听路由变化
  watch: {
    "$route.path"() {
      this.calcBreads();
    },
  },
};
</script>
<style scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
}
:deep(.el-scrollbar__bar) {
  bottom: 0px;
}
:deep(.el-scrollbar__wrap) {
  height: 39px;
}

.active {
  background-color: #a1a6bb;
  color: #fff;
  border-color: #a1a6bb;
}
.active::before {
  content: "";
  background: #fff;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  margin-right: 2px;
}
.tags-view-item {
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 22px;
  line-height: 22px;
  border: 1px solid #d8dce5;
  color: #495060;
  background: #fff;
  padding: 0 8px;
  font-size: 12px;
  margin-left: 5px;
  margin-top: 6px;
}
.tags-view-item:first-of-type {
  margin-left: 15px;
}
.tags-view-item:last-of-type {
  margin-right: 15px;
}
.tags-view-item.active {
  background-color: #a1a6bb;
  color: #fff;
  border-color: #a1a6bb;
}
.tags-view-item.active::before {
  content: "";
  background: #fff;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  margin-right: 2px;
}
</style>