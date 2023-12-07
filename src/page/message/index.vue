<template>
  <div>
    <!-- 页头搜索 -->
    <div class="input">
      <el-form
        :model="searchForm"
        ref="queryRef"
        :inline="true"
        label-width="60px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="searchForm.username"
            placeholder="请输入用户名"
            clearable
            style="width: 240px"
            @keyup.enter="searchId()"
            size="medium"
          />
        </el-form-item>

        <el-form-item label="昵称" prop="nickname">
          <el-input
            v-model="searchForm.nickname"
            placeholder="请输入昵称"
            clearable
            style="width: 240px"
            @keyup.enter="searchId()"
            size="medium"
          />
        </el-form-item>

        <el-form-item label="性别" prop="gender">
          <el-select
            v-model="searchForm.gender"
            placeholder="请选择性别"
            clearable
            style="width: 240px"
            size="medium"
          >
            <el-option label="女" value="0" />
            <el-option label="男" value="1" />
          </el-select>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select
            v-model="searchForm.status"
            placeholder="请选择状态"
            clearable
            style="width: 240px"
            size="medium"
          >
            <el-option label="启用" value="0" />
            <el-option label="禁用" value="1" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button
            size="medium"
            icon="el-icon-search"
            type="primary"
            @click="searchId()"
            >搜索</el-button
          >
          <el-button
            size="medium"
            plain
            icon="el-icon-refresh"
            @click="resetSearch"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <!-- 页头按钮 -->
    <div class="button">
      <el-row>
        <el-button
          size="medium"
          type="success"
          plain
          icon="el-icon-plus"
          :disabled="false"
          @click="dialogFormVisible = true"
          >添加</el-button
        >
        <el-button
          size="medium"
          type="danger"
          plain
          icon="el-icon-delete"
          :disabled="disabled"
          @click="deleteSelected"
          >删除</el-button
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
        @selection-change="handleSelectionChange"
        v-loading.fullscreen.lock="tableDataLoading"
      >
        <el-table-column type="selection" min-width="60"></el-table-column>
        <el-table-column
          type="index"
          label="序号"
          min-width="80"
        ></el-table-column>
        <el-table-column prop="avatar" label="头像" min-width="100">
          <template #default="scope">
            <el-avatar :size="45" :src="scope.row.avatar" fit="contain">
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              />
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
          min-width="120"
        ></el-table-column>
        <el-table-column prop="gender" label="性别" min-width="80">
          <template #default="scope">
            <p v-if="scope.row.gender == '0'">女</p>
            <p v-else-if="scope.row.gender == '1'">男</p>
            <p v-else>未知</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="phonenumber"
          label="联系方式"
          min-width="150"
        ></el-table-column>
        <el-table-column prop="status" label="状态" min-width="90">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              disabled
              :active-value="'0'"
              :inactive-value="'1'"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          min-width="160"
        ></el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          min-width="160"
        ></el-table-column>
        <el-table-column label="操作" min-width="180">
          <template slot-scope="scope">
            <el-link
              @click="editTable(scope.row)"
              :underline="false"
              type="primary"
              disabled
              >编辑</el-link
            >&nbsp;&nbsp;
            <el-link
              @click="deleteRow(scope.$index, scope.row)"
              :underline="false"
              type="primary"
              disabled
              >删除</el-link
            >
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
      @getSize="getSize"
    >
    </Pagination>

    <!-- 添加弹框 -->
    <el-dialog title="添加信息" :visible.sync="dialogFormVisible">
      <el-form
        :inline="true"
        :model="addForm"
        :rules="rules"
        ref="addForm"
        label-width="80px"
        class="demo-form-inline"
      >
        <!-- <el-form-item label="头像">
          <el-input
            v-model="addForm.avatar"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="用户名">
          <el-input
            style="width: 221px"
            v-model="addForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input
            style="width: 221px"
            v-model="addForm.password"
            placeholder="请输入用户密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input
            style="width: 221px"
            v-model="addForm.nickname"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select
            v-model="addForm.gender"
            placeholder="请选择性别"
            clearable
          >
            <el-option label="女" value="0" />
            <el-option label="男" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input
            style="width: 221px"
            v-model="addForm.phonenumber"
            placeholder="请输入联系方式"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
            style="width: 221px"
            v-model="addForm.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-select
            v-model="addForm.status"
            placeholder="请选择状态"
            clearable
          >
            <el-option label="启用" value="0" />
            <el-option label="禁用" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="用户角色">
          <el-select
            v-model="addForm.role"
            placeholder="请选择用户角色"
            clearable
          >
            <el-option label="超级管理员" value="1" />
            <el-option label="管理员" value="2" />
            <el-option label="普通用户" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="删除状态">
          <el-select
            v-model="addForm.delFlag"
            placeholder="请选择删除状态"
            clearable
          >
            <el-option label="存在" value="0" />
            <el-option label="删除" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            style="width: 221px"
            v-model="addForm.remark"
            placeholder="请输入备注"
          ></el-input>
        </el-form-item>

        <el-form-item
          style="width: 700px; display: flex; justify-content: center"
        >
          <el-button
            type="primary"
            plain
            size="medium"
            @click="addExistForm('addForm')"
            >保存</el-button
          >
          <el-button @click="addForm = {}" size="medium">重置</el-button>
          <el-button @click="dialogFormVisible = false" size="medium"
            >取 消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑弹框 -->
    <el-dialog title="修改用户信息" :visible.sync="exitDialogFormVisible">
      <el-form
        :model="editForm"
        ref="editForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="头像">
          <el-input
            v-model="editForm.ename"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input
            v-model="editForm.ename"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input
            v-model="editForm.ename"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input
            v-model="editForm.ename"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input
            v-model="editForm.ename"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input
            v-model="editForm.etele"
            placeholder="请输入联系方式"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
            v-model="editForm.etele"
            placeholder="请输入联系方式"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-input
            v-model="editForm.etele"
            placeholder="请输入联系方式"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="editForm.etele"
            placeholder="请输入联系方式"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain size="medium" @click="editExistForm()"
            >保存</el-button
          >
          <el-button @click="exitDialogFormVisible = false" size="medium"
            >取 消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getAllData, addUserInfo } from "@/api/message";
import Pagination from "@/components/Pagination";
export default {
  name: "empManage",
  components: { Pagination },
  data() {
    return {
      // 对话框加载
      dialogLoading: false,
      // 主页数据加载
      tableDataLoading: false,
      // 代码生成加载
      empLoading: false,
      //页头搜索表单
      searchForm: {
        // nickname: "",
        // gender: "",
        // username: "",
        // status: 0,
      },
      //总条数
      total: 0,
      //当前页数
      pageNumber: 1,
      //当前每页条数
      pageSize: 3,
      //页头搜索数据
      input: "",
      //页头删除按钮禁用状态
      disabled: true,
      //保存多选框选中的行数据
      selectedRows: [],
      //渲染列表数据
      tableData: [],
      //编辑对话框
      exitDialogFormVisible: false,
      //编辑对话框表单数据
      editForm: {
        eno: "",
        ename: "",
        etele: "",
        epost: "",
      },
      //添加对话框
      dialogFormVisible: false,
      //添加对话框表单数据
      addForm: {},
      //添加对话框表单数据规则
      rules: {
        ename: [{ required: true, message: "请输入姓名", trigger: "change" }],
        etele: [
          { required: true, message: "请输入联系方式", trigger: "change" },
        ],
        epost: [{ required: true, message: "请输入职位", trigger: "change" }],
      },
    };
  },

  created() {
    this.getAllData();
  },

  methods: {
    //获取列表数据
    async getAllData(obj) {
      let query = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
      };
      let data = obj || {};
      try {
        const res = await getAllData(query, data);
        if (res.code == 200) {
          this.tableData = res.data.rows;
          this.total = res.data.total;
          console.log(res.data.rows);
        } else {
          this.$message.error(res.message);
        }
        this.tableDataLoading = false;
      } catch (error) {
        console.log(error.message);
      }
    },

    //获取当前页数
    getPage(value) {
      this.pageNumber = value;
      this.getAllData();
    },

    //获取每页多少条
    getSize(value) {
      this.pageSize = value;
      this.getAllData();
    },

    //页头搜索按钮
    async searchId() {
      this.getAllData(this.searchForm);
    },

    //页头重置按钮
    resetSearch() {
      this.searchForm = {};
      this.getAllData();
    },

    //页头添加对话框保存按钮
    addExistForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const res = await addUserInfo(this.addForm);
            if (res.code === 200) {
              this.dialogFormVisible = false;
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.getAllData();
            } else {
              this.addForm = {};
              this.$message.error("添加失败");
            }
          } catch (error) {
            console.log(error);
            this.$message.error(error);
          }
        } else {
          this.$message.error("请完善信息后重试");
        }
      });
    },

    //页头删除按钮
    async deleteSelected() {
      // let TableNameList = [];
      // for (let i = 0; i < this.selectedRows.length; i++) {
      //   TableNameList.push(this.selectedRows[i])
      // }
      // if(TableNameList.length!==0){
      //   try{
      //     const res=await reqDeleteTable(TableNameList);
      //     if (res.code === 200) {
      //       // for (let i = 0; i < this.selectedRows.length; i++) {
      //       //   const index = this.tableData.indexOf(this.selectedRows[i]);
      //       //   if (index > -1) {
      //       //     this.tableData.splice(index, 1);
      //       //   }
      //       // }
      //       this.disabled =true;
      //       this.selectedRows = []; // 清空选中的行数据
      //       this.$message({
      //         message: '删除成功',
      //         type: 'success'
      //       });
      //       this.getAllData()
      //     }
      //   }catch(error){
      //     console.log(error)
      //     this.$message.error(error);
      //   }
      // }else{
      //   this.$message.error("逻辑有问题");
      // }
    },

    //通过选中的多行数据存入数组
    handleSelectionChange(selection) {
      // this.disabled = false;
      // this.selectedRows = selection;
      // let TableNameList = [];
      // for (let i = 0; i < this.selectedRows.length; i++) {
      //   TableNameList.push(this.selectedRows[i])
      // }
      // console.log(TableNameList)
      // if(TableNameList.length==0){
      //   this.disabled=true
      // }
    },

    //操作栏编辑
    editTable(row) {
      this.exitDialogFormVisible = true;
      this.editForm = row;
    },

    //操作栏编辑保存按钮
    async editExistForm() {
      // this.tableDataLoading = true
      // try{
      //   const res=await requpdateTable(this.editForm);
      //   if (res.code == 200) {
      //     this.$message.success("修改成功");
      //   } else {
      //     this.$message.error(res.message);
      //   }
      //   this.tableDataLoading = false
      //   this.exitDialogFormVisible = false
      // }catch(error){
      //   console.log(error.message)
      // }
    },

    //操作栏删除
    deleteRow(index, row) {
      // const eno = row.eno
      // this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      // }).then(async () => {
      //   try{
      //     const res=await reqDeleteno(eno);
      //     if (res.code === 200) {
      //       this.tableData.splice(index, 1);
      //       this.$message({
      //         message: '删除成功',
      //         type: 'success'
      //       });
      //     }
      //   }catch(error){
      //     console.log(error)
      //     this.$message.error(error);
      //   }
      // }).catch(() => {
      //     // 点击取消:不删除了
      //     this.$message({
      //         type: 'info',
      //         message: '已取消删除'
      //     });
      // });
    },
  },
};
</script>

<style scoped>
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
  font-weight: 600px;
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

:deep
  .el-table
  .el-table__body-wrapper
  .el-table__body
  .el-table__row
  .el-table__cell
  .cell
  .el-button--text {
  font-size: 13px;
}

/* 弹框表单 */
:deep .el-dialog__wrapper .el-dialog {
  width: 55%;
}

:deep .el-dialog__wrapper .el-dialog .el-dialog__body {
  padding: 30px 20px 1px 50px;
}

:deep .el-dialog__wrapper .el-dialog .el-dialog__body .el-form .el-form-item {
  width: 330px;
  margin-bottom: 35px;
}

/* 页头搜索框 */
.el-form-item {
  margin-bottom: 10px;
}

/* 页头搜索框 */
.input {
  display: flex;
  margin-top: 0;
}

/* 表格 */
.table {
  margin-top: 15px;
}
</style>