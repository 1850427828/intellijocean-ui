<template>
  <div class="sideNav">
    <div class="sideNav-top">
      <img src="~@/assets/images/robot.png" alt="" style="width: 30px; margin-right: 10px" />
      <span class="text-weight" style="vertical-align: bottom; color: #333"></span>
    </div>
    <div class="sideNav-list">
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu :router="true" :default-active="index" :collapse="false" background-color="#a1a6bb"
          active-text-color="#fff" :unique-opened="true" :collapse-transition="true" mode="vertical"
          @select="handleSelect" @open="handleOpen" @close="handleClose">
          <el-menu-item index="/home">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-menu-item index="/message">
            <i class="el-icon-user-solid"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/roleManagement">
            <i class="el-icon-user-solid"></i>
            <span slot="title">角色管理</span>
          </el-menu-item>

          <el-submenu index="/systemTool">
            <template slot="title">
              <i class="el-icon-suitcase-1"></i>
              <span>系统工具</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/systemTool/codeGeneration">
                <i class="el-icon-printer"></i>
                <span>代码生成</span>
              </el-menu-item>
              <el-menu-item index="/systemTool/systemMaintenance">
                <i class="el-icon-s-operation"></i>
                <span>系统维护</span>
              </el-menu-item>
              <el-menu-item index="/systemTool/fileManagement">
                <i class="el-icon-s-operation"></i>
                <span>文件管理</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/interfaceManagement">
              <i class="el-icon-chat-line-round"></i>
              <span slot="title">开放Api管理</span>
            </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: "",
    };
  },
  mounted() {
    this.getPath();
  },

  methods: {
    //获取路由
    getPath() {
      const { meta, path } = this.$route;
      // console.log(meta, path);
      if (meta.activeMenu) {
        this.index = meta.activeMenu;
      } else {
        this.index = path;
      }
    },
    //菜单激活回调
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },

    //sub-menu 展开的回调
    handleOpen(key, keyPath) {
      // console.log("打开");
      // console.log(key, keyPath);
    },

    //sub-menu 关闭的回调
    handleClose(key, keyPath) {
      // console.log("收起");
      // console.log(key, keyPath);
    },
  },
  watch: {
    "$route.path"() {
      this.getPath();
    },
  },
  computed: {},
};
</script>

<style scoped>
:deep .el-row .el-col {
  width: 100%;
}

:deep .el-row .el-col .el-menu-vertical-demo {
  border-right: 0;
}

:deep .el-row .el-col .el-menu-vertical-demo .el-submenu .el-menu .el-menu-item-group .el-menu-item-group__title {
  display: none;
}

/* 小图标 */
i {
  color: #333;
  /* 将图标颜色设置为红色 */
}

.sideNav {
  transition: width 0.28s;
  width: 200px;
  background-color: #a1a6bb;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  overflow: hidden;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Arial, sans-serif;
  font-weight: 100;
  text-rendering: optimizeLegibility;
}

.sideNav-top {
  padding: 20px 5px 20px 0;
  text-align: center;
  font-size: 15px;
}

.sideNav-list {
  color: #909399;
}
</style>