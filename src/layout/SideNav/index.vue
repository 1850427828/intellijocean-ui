<template>
  <div class="sideNav">
    <div class="sideNav-top">
      <img
          src="~@/assets/images/robot.png"
          alt=""
          style="width: 30px; margin-right: 10px"
      />
      <span
          class="text-weight"
          style="vertical-align: bottom; color: #333"
      ></span>
    </div>
    <div class="sideNav-list">
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
            :router="true"
            :default-active="index"
            :collapse="false"
            background-color="#a1a6bb"
            active-text-color="#fff"
            :unique-opened="true"
            :collapse-transition="true"
            mode="vertical"
            @select="handleSelect"
            @open="handleOpen"
            @close="handleClose"
        >
          <el-menu-item index="/home">
            <i class="el-icon-house"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-menu-item index="/message" v-if="userRole1">
            <i class="el-icon-s-custom"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/roleManagement" v-if="userRole2">
            <i class="el-icon-user"></i>
            <span slot="title">角色管理</span>
          </el-menu-item>

          <el-submenu index="/interfaceManagement">
            <template slot="title">
              <i class="el-icon-suitcase-1"></i>
              <span>开放API管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/interfaceManagement/apiMessage">
                <i class="el-icon-suitcase"></i>
                <span slot="title">API信息管理</span>
              </el-menu-item>
              <el-menu-item index="/interfaceManagement/rechargeManagement">
                <i class="el-icon-coin"></i>
                <span slot="title">API充值管理</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="/apiOnlineCall" v-if="userRole3">
            <i class="el-icon-finished"></i>
            <span slot="title">API在线调用</span>
          </el-menu-item>

          <el-menu-item index="/codeGeneration" v-if="userRole3">
            <i class="el-icon-printer"></i>
            <span slot="title">代码生成</span>
          </el-menu-item>

          <el-menu-item index="/fileManagement" v-if="userRole4">
            <i class="el-icon-folder-opened"></i>
            <span slot="title">文件管理</span>
          </el-menu-item>


          <el-menu-item index="/systemMaintenance">
            <i class="el-icon-s-operation"></i>
            <span slot="title">系统维护</span>
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
      //管理权限
      arr: ["common", "VIP", "manager", "admin"],
      userRole1: false, //超级管理员
      userRole2: false, //管理员
      userRole3: false, //vip
      userRole4: false, //普通用户
    };
  },
  mounted() {
    this.getUserRole()
    this.getPath();
  },

  methods: {
    //获取路由
    getPath() {
      const {meta, path} = this.$route;
      // console.log(meta, path);
      if (meta.activeMenu) {
        this.index = meta.activeMenu;
      } else {
        this.index = path;
      }
    },

    //获取权限
    getUserRole() {
      const userRole = localStorage.getItem("userRole");
      console.log(userRole);
      if (userRole.includes("admin")) {
        this.userRole4 = true;
        this.userRole3 = true;
        this.userRole2 = true;
        this.userRole1 = true;
      } else if (userRole.includes("manager")) {
        this.userRole4 = true;
        this.userRole3 = true;
        this.userRole2 = true;
      } else if (userRole.includes("VIP")) {
        this.userRole4 = true;
        this.userRole3 = true;
      } else if (userRole.includes("common")) {
        this.userRole4 = true;
      } else {
        console.log("没有任何权限");
        this.userRole4 = true;
        this.userRole3 = true;
        this.userRole2 = true;
        this.userRole1 = true;
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

:deep
.el-row
.el-col
.el-menu-vertical-demo
.el-submenu
.el-menu
.el-menu-item-group
.el-menu-item-group__title {
  display: none;
}

:deep .el-menu-item-group__title {
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