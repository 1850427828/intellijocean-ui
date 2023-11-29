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
      <el-row class="tac">
        <el-col :span="12">
          <el-menu
            :router="true"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item index="home">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>

            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-suitcase-1"></i>
                <span>系统工具</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="codeGeneration">
                  <i class="el-icon-printer"></i>
                  <span>代码生成</span>
                </el-menu-item>
                <el-menu-item index="systemMaintenance">
                  <i class="el-icon-s-operation"></i>
                  <span>系统维护</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-menu-item index="message">
              <i class="el-icon-tickets"></i>
              <span slot="title">公司信息</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
      <el-scrollbar :class="sideTheme" wrap-class="scrollbar-wrapper">
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :background-color="bgColor"
          :text-color="textColor"
          :unique-opened="true"
          :active-text-color="activeColor"
          :collapse-transition="true"
          mode="vertical"
        >
          <sidebar-item
            v-for="(route, index) in sidebarRouters"
            :key="route.path + index"
            :item="route"
            :base-path="route.path"
          />
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showList1: false,
      showList2: false,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    changeList(item) {
      this.showList1 = !this.showList1;
      if (!this.showList1) {
        this.showList2 = !this.showList2;
      } else {
        this.showList2 = false;
      }
      this.$nextTick();
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
/* 小图标 */
i {
  color: #333; /* 将图标颜色设置为红色 */
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