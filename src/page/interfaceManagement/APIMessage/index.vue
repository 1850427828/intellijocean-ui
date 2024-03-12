<template>
  <div id="page">
    <!-- 页头搜索 -->
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="API接口名称">
        <el-input v-model="searchForm.name" placeholder="请输入API接口名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="方法">
        <el-select v-model="searchForm.method" placeholder="请选择方法" clearable>
          <el-option label="GET" value="get"></el-option>
          <el-option label="POST" value="post"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="API接口类型">
        <el-select v-model="searchForm.type" placeholder="请选择类型" clearable>
          <el-option label="普通" value="11"></el-option>
          <el-option label="付费" value="21"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
            size="medium"
            type="primary"
            icon="el-icon-search"
            :loading="false"
            @click="search()"
        >搜索
        </el-button
        >
        <el-button
            size="medium"
            plain
            icon="el-icon-refresh"
            @click="resetSearch()"
        >重置
        </el-button
        >
      </el-form-item>
    </el-form>

    <!-- 页头按钮 -->
    <div class="button">
      <el-row>
        <el-button
            size="medium"
            type="success"
            plain
            icon="el-icon-plus"
            @click="addAPIButton('addForm')"
        >开放API新增
        </el-button
        >
      </el-row>
    </div>

    <!-- 列表渲染 -->
    <div class="table">
      <el-table
          :data="tableData"
          style="width: 100%"
          ref="multipleTable"
          tooltip-effect="dark"
      >
        <el-table-column type="selection" min-width="60"></el-table-column>
        <el-table-column
            type="index"
            label="序号"
            min-width="80"
        ></el-table-column>
        <el-table-column
            prop="name"
            label="API名称"
            min-width="130"
        ></el-table-column>
        <el-table-column
            prop="type"
            label="类型"
            min-width="90"
        >
          <template #default="scope">
            <el-tag v-if="scope.row.type[0] === '1'">普通</el-tag>
            <el-tag type="warning" v-if="scope.row.type[0] === '2'">付费</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="method"
            label="方法"
            min-width="80"
        >
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.method === 'get'">{{ scope.row.method }}</el-tag>
            <el-tag type="danger" v-if="scope.row.method === 'post'">{{ scope.row.method }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="responseHeader"
            label="响应格式"
            min-width="140"
        ></el-table-column>
        <el-table-column prop="status" label="下线 / 发布" min-width="80">
          <template #default="scope">
            <div @click="publishAPI(scope.row)">
              <el-switch
                  v-model="scope.row.status"
                  :active-value="'1'"
                  :inactive-value="'2'"
              ></el-switch>
            </div>
          </template>
        </el-table-column>

        <!-- fixed="right" -->
        <el-table-column label="操作" min-width="110">
          <template #default="scope">
            <el-button @click="editAPIButton(scope.row)" type="text" size="small">修改</el-button>
            <el-button
                @click="deleteAPI(scope.row)"
                type="text"
                size="small"
            >删除
            </el-button>
            <el-button @click="onlineDebug(scope.row)" type="text" size="small">在线调试</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页器 -->
    <Pagination
        :total="total"
        :page="pageNumber"
        :size="pageSize"
        @getPage="getPage($event)"
        @getSize="getSize($event)"
    >
    </Pagination>

    <!-- 添加 -->
    <el-dialog title="添加" :visible.sync="addFormVisible">
      <el-form :model="addForm" :rules="rules" ref="addForm" :inline="true" label-width="110px"
               class="demo-ruleForm-inline">
        <el-form-item label="API名称" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入API名称"></el-input>
        </el-form-item>
        <el-form-item label="IP" prop="host">
          <el-input v-model="addForm.host" placeholder="例：127.0.0.1"></el-input>
        </el-form-item>
        <el-form-item label="端口号" prop="port">
          <el-input v-model="addForm.port" placeholder="例：8003"></el-input>
        </el-form-item>
        <el-form-item label="URL" prop="url">
          <el-input v-model="addForm.url" placeholder="例：/api/queryIpAddress"></el-input>
        </el-form-item>
        <el-form-item label="请求参数示例" prop="requestHeader">
          <el-input v-model="addForm.requestParams" placeholder="例：cityName='北京'"></el-input>
        </el-form-item>
        <el-form-item label="请求参数类型" prop="requestHeader">
          <el-input v-model="addForm.requestHeader" placeholder="例：application/json"></el-input>
        </el-form-item>
        <el-form-item label="响应结果类型" prop="responseHeader">
          <el-input v-model="addForm.responseHeader" placeholder="例：application/json"></el-input>
        </el-form-item>

        <el-form-item label="方法" prop="method">
          <el-select v-model="addForm.method" placeholder="请选择方法" style="width: 202px">
            <el-option label="GET" value="get"></el-option>
            <el-option label="POST" value="post"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="类型" prop="type">
          <el-select v-model="addForm.type" placeholder="请选择类型" style="width: 202px">
            <el-option label="普通" value="11"></el-option>
            <el-option label="付费" value="21"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="描述内容">
          <el-input
              style="width: 202px"
              type="textarea"
              :rows="2"
              placeholder="请输入描述内容"
              v-model="addForm.description">
          </el-input>
        </el-form-item>
        <el-form-item label=" " prop="">
        </el-form-item>

        <el-form-item label=" ">
          <el-button @click="addAPI('addForm')" type="primary">添加</el-button>
          <el-button @click="addForm = {}">重置</el-button>
          <el-button @click="cancelAddForm">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="updateFormVisible">
      <el-form :model="updateForm" :rules="rules" ref="updateForm" :inline="true" label-width="110px"
               class="demo-ruleForm-inline">
        <el-form-item label="API名称" prop="name">
          <el-input v-model="updateForm.name" placeholder="请输入API名称"></el-input>
        </el-form-item>
        <el-form-item label="IP" prop="host">
          <el-input v-model="updateForm.host" placeholder="例：127.0.0.1"></el-input>
        </el-form-item>
        <el-form-item label="端口号" prop="port">
          <el-input v-model="updateForm.port" placeholder="例：8003"></el-input>
        </el-form-item>
        <el-form-item label="URL" prop="url">
          <el-input v-model="updateForm.url" placeholder="例：/api/queryIpAddress"></el-input>
        </el-form-item>
        <el-form-item label="请求头" prop="requestHeader">
          <el-input v-model="updateForm.requestHeader" placeholder="例：application/json"></el-input>
        </el-form-item>
        <el-form-item label="响应头" prop="responseHeader">
          <el-input v-model="updateForm.responseHeader" placeholder="例：application/json"></el-input>
        </el-form-item>

        <el-form-item label="方法" prop="method">
          <el-select v-model="updateForm.method" placeholder="请选择方法" style="width: 202px">
            <el-option label="GET" value="get"></el-option>
            <el-option label="POST" value="post"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="类型" prop="type">
          <el-select v-model="updateForm.type" placeholder="请选择类型" style="width: 202px">
            <el-option label="普通" value="11"></el-option>
            <el-option label="付费" value="21"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="描述内容">
          <el-input
              style="width: 202px"
              type="textarea"
              :rows="2"
              placeholder="请输入描述内容"
              v-model="updateForm.description">
          </el-input>
        </el-form-item>
        <el-form-item label=" " prop="">
        </el-form-item>

        <el-form-item label=" ">
          <el-button @click="updateAPI" type="primary">保存</el-button>
          <el-button @click="updateForm = {}">重置</el-button>
          <el-button @click="updateFormVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {getAllData, publishAPI, deleteAPI, addAPI, updateAPI} from "@/api/interfaceManagement/APIMessage";
import Pagination from "@/components/Pagination/index.vue";

export default {
  name: "interfaceManagement",
  components: {Pagination},
  data() {
    return {
      // 搜索表单数据
      searchForm: {},
      // 表格数据
      tableData: [],
      //总条数
      total: 0,
      //当前页数
      pageNumber: 1,
      //当前每页条数
      pageSize: 5,
      //添加弹框是否展示
      addFormVisible: false,
      //修改弹框是否展示
      updateFormVisible: false,
      //修改表单数据
      updateForm: {

      },
      //添加表单数据
      addForm: {
        name: "天气",
        description: "1111111111111",
        host: "127.0.0.1",
        port: "8003",
        url: "/api/address",
        type: "11",
        method: "get",
        requestParams:"cityName='北京'",
        requestHeader: "application/json",
        responseHeader: "application/json",
      },
      //添加表单数据规则
      rules: {
        name: [
          {required: true, message: '请输入API名称', trigger: 'blur'}
        ],
        host: [
          {required: true, message: '请输入IP', trigger: 'blur'}
        ],
        port: [
          {required: true, message: '请输入端口号', trigger: 'blur'}
        ],
        url: [
          {required: true, message: '请输入URL', trigger: 'blur'}
        ],
        requestHeader: [
          {required: true, message: '请输入请求头', trigger: 'blur'}
        ],
        responseHeader: [
          {required: true, message: '请输入响应头', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请选择类型', trigger: 'blur'}
        ],
        method: [
          {required: true, message: '请选择方法', trigger: 'blur'}
        ],
      },
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
      const data = this.searchForm;
      const res = await getAllData(page, data);
      console.log(res);
      this.tableData = res.data.rows;
      this.total = parseInt(res.data.total);
    },

    //页头重置按钮
    resetSearch() {
      this.searchForm = {};
      this.getTableData();
    },

    //页头搜索按钮
    search() {
      this.pageNumber = 1;
      this.getTableData();
    },

    //开放API新增按钮
    addAPIButton(addForm) {
      addForm
      // this.$refs[addForm].clearValidate()
      this.addFormVisible = true
    },

    //开放API新增按钮————添加按钮
    async addAPI(addForm) {
      this.$refs[addForm].validate(async (valid) => {
        if (valid) {
          try {
            const res = await addAPI(this.addForm)
            console.log(res);
            this.addFormVisible = false
            await this.getTableData()
            this.$message.success("添加成功");
          } catch (error) {
            console.log(error.message);
          }
        } else {
          this.$message.error("请完善信息后重试");
        }
      });
    },

    //开放API新增按钮————取消按钮
    cancelAddForm() {
      this.addFormVisible = false
    },

    //表格发布状态
    async publishAPI(row) {
      console.log("发布", row);
      const data = {
        id: row.id
      }
      const res = await publishAPI(data);
      console.log(res);
      this.$message.success("成功");
    },

    //表格修改按钮
    editAPIButton(row) {
      this.updateFormVisible = true
      this.updateForm = row
    },

    //表格修改按钮————保存按钮
    async updateAPI() {

      const res = await updateAPI(this.updateForm)
      console.log(res)

      this.$message.success("成功");
    },

    //表格删除按钮
    async deleteAPI(row) {
      this.$confirm('此操作将永久删除该接口, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const data = [
          {
            id: row.id
          }
        ]
        const res = await deleteAPI(data);
        if (res.code === 200) {
          await this.getTableData();
          this.$message.success("删除成功");
        } else {
          this.$message.error("删除失败")
        }
      }).catch((error) => {
        console.log(error)
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      });
    },

    //表格在线调试
    onlineDebug() {
      console.log("在线调试");
    },

    //获取当前页数
    getPage(value) {
      this.pageNumber = value;
      this.getTableData();
    },

    //获取每页多少条
    getSize(value) {
      this.pageSize = value;
    },
  },
};
</script>

<style scoped>
.table {
  margin-top: 15px;
}

/* 表格 */
:deep
.table
.el-table
.el-table__header-wrapper
.el-table__header
.el-table__cell {
  padding: 7px 0;
  font-size: 14px;
  color: #999;
  font-weight: 600;
  text-align: center;
  background-color: #f2f2f2;
}

:deep
.el-table
.el-table__body-wrapper
.el-table__body
.el-table__row
.el-table__cell
.cell {
  text-overflow: clip;
  text-align: center;
}

/*弹框*/
:deep .el-dialog__body {
  padding: 30px 20px 20px 20px;
}

:deep .el-dialog {
  width: 60%;
}


/*头部表单*/
:deep .el-form-item__label {
  color: #999;
  font-weight: 600;
  font-size: 15px;
}


.table {
  margin-top: 15px;
}
</style>