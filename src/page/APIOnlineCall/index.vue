<template>
  <div>
    <div class="box">
      <el-card
        class="box-card"
        shadow="hover"
        v-for="item in tableData"
        :key="item.id"
      >
        <div slot="header" class="clearfix">
          <el-tooltip :content="item.name" placement="left-start">
            <span class="tooltip text">{{ item.name }}</span>
          </el-tooltip>
          <!-- <el-button
            @click="onlineCall(item)"
            style="float: right; padding: 3px 0"
            type="text"
            >在线调试</el-button
          > -->
          <el-button type="success" round @click="onlineCall(item)"
            >在线调试</el-button
          >
        </div>
        <el-tooltip
          :content="`https://www.intellijocean.cn${item.url}`"
          placement="top"
        >
          <div class="tooltip">
            <span class="blue padding">接口地址</span
            >：https://www.intellijocean.cn{{ item.url }}
          </div>
        </el-tooltip>
        <div class="tooltip">
          <span class="yellow padding">返回格式</span>：{{
            item.responseHeader
          }}
        </div>
        <div class="tooltip">
          <span class="red padding">请求方式</span>：{{ item.method }}
        </div>
        <el-tooltip
          :content="`https://www.intellijocean.cn${item.url}?${item.requestParams}=00001`"
          placement="bottom"
        >
          <div class="tooltip">
            <span class="green padding">JSON请求示例</span
            >：https://www.intellijocean.cn{{ item.url }}?{{
              item.requestParams
            }}=0000
          </div>
        </el-tooltip>
      </el-card>
    </div>
    <Pagination
      :total="total"
      :page="pageNumber"
      :size="pageSize"
      @getPage="getPage($event)"
      @getSize="getSize($event)"
    >
    </Pagination>
  </div>
</template>

<script>
import { getAllData } from "@/api/APIOnlineCall/index";
import Pagination from "@/components/Pagination/index.vue";
export default {
  name: "apionlinecall",
  components: {
    Pagination,
  },
  data() {
    return {
      // 表格数据
      tableData: [],
      //总条数
      total: 0,
      //当前页数
      pageNumber: 1,
      //当前每页条数
      pageSize: 6,
    };
  },
  mounted() {
    this.getTableData();
  },

  methods: {
    //获取分页数据
    async getTableData() {
      const page = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
      };
      const data = {};
      const res = await getAllData(page, data);
      console.log(res);
      this.tableData = res.data.rows;
      this.total = parseInt(res.data.total);
    },

    //在线调试按钮
    onlineCall(item) {
      this.$router.push({
        path: "/apiShow",
        query: item,
      });
    },

    //获取当前页数
    getPage(value) {
      this.pageNumber = value;
      this.getTableData();
    },

    //获取每页多少条
    getSize(value) {
      this.pageSize = value;
      this.getTableData();
    },
  },
};
</script>


<style scoped>
:deep .el-card__header {
  background-color: #fafafa;
}
:deep .el-card__body {
  padding: 10px 20px;
}

.box {
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  background-color: #d8dcf3;
}

.box-card {
  min-width: 350px;
  max-width: 392px;
  margin: 15px;
}

.tooltip {
  font-size: 15px;
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: Lato;
  /* font-family: Cursive; */
}

.clearfix {
  display: flex;
  justify-content: space-between;
}

.text {
  font-size: 17px;
  font-weight: 600;
  /* font-family: Lato; */
}

.padding {
  padding: 4px;
}

.red {
  background-color: #fde2e2;
  /* background-color: #f56c6c; */
}
.blue {
  background-color: #d9ecff;
  /* background-color: #409eff; */
}
.yellow {
  background-color: #faecd8;
  /* background-color: #e6a23c; */
}
.green {
  background-color: #e1f3d8;
  /* background-color: #67c23a; */
}
</style>