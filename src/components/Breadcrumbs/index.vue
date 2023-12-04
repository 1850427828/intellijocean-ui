<template>
  <div>
    <el-scrollbar
      ref="scrollContainer"
      :vertical="false"
      class="scroll-container"
      @wheel.prevent="handleScroll"
    >
      <router-link
        v-for="tag in visitedViews"
        :key="tag.path"
        :data-path="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        class="tags-view-item"
      >
        {{ tag.title }}
        <span @click.prevent.stop="closeSelectedTag(tag)">
          <close
            class="el-icon-close"
            style="width: 1em; height: 1em; vertical-align: middle"
          />
        </span>
      </router-link>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      visitedViews: [
        {
          title: "首页",
          path: "/home",
          query: "",
          fullPath: "",
        },
        {
          title: "代码生成",
          path: "/systemTool/codeGeneration",
          query: "",
          fullPath: "",
        },
        {
          title: "员工管理",
          path: "/message",
          query: "",
          fullPath: "",
        },
        {
          title: "系统维护",
          path: "/systemTool/systemMaintenance",
          query: "",
          fullPath: "",
        }
      ],
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

    isActive(r) {
      return r.path === this.$route.path;
    },
    closeSelectedTag(view) {
      let path=view.path
      let v = this.visitedViews.filter(item => item.path !== path);
      console.log(v)
      this.visitedViews=v
      // this.$tab.closePage(view).then(({ visitedViews }) => {
      //   if (this.isActive(view)) {
      //     this.toLastView(visitedViews, view);
      //   }
      // });
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