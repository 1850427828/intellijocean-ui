<template>
  <div>
    <!-- 页头搜索 -->
    <div class="input">

      <div class="input-font">
        <div class="fontdiv">员工号</div>
        <el-input placeholder="请输入员工号" v-model="input" clearable size="medium"></el-input>
      </div>

      <div class="input-button input-font">
        <el-button size="medium" type="primary" icon="el-icon-search" :loading="false" @click="searchId()">搜索</el-button>
        <el-button size="medium" plain icon="el-icon-refresh" @click="resetSearch">重置</el-button>
      </div>

    </div>
    <!-- 页头按钮 -->
    <div class="button"  v-loading.fullscreen.lock="empLoading"  element-loading-text="代码拼命生成中" 
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)" >
      <el-row>
        <el-button size="medium" type="success" plain icon="el-icon-plus" :disabled="false"
          @click="dialogFormVisible = true">添加</el-button>
        <el-button size="medium" type="danger" plain icon="el-icon-delete" :disabled="disabled"
          @click="deleteSelected">删除</el-button>
      </el-row>
    </div>

    <!-- 列表渲染 -->
    <div class="table">
      <el-table :data="tableData" style="width: 100%" ref="multipleTable" tooltip-effect="dark"
        @selection-change="handleSelectionChange" v-loading.fullscreen.lock="tableDataLoading">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="eno" label="工号" width="70"></el-table-column>
        <el-table-column prop="ename" label="姓名" width="120"></el-table-column>
        <el-table-column prop="etele" label="联系方式" width="120"></el-table-column>
        <el-table-column prop="epost" label="职位" width="120"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="180"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="editTable(scope.row)" type="text" size="small">🖊编辑</el-button>
            <el-button @click="deleteRow(scope.$index, scope.row)" type="text" size="small">🗑删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加弹框 -->
    <el-dialog title="添加员工信息" :visible.sync="dialogFormVisible"
       v-loading="dialogLoading" element-loading-text="添加中" element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="80px" class="demo-ruleForm">

        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.ename" placeholder="请输入姓名"></el-input>
        </el-form-item>

        <el-form-item label="联系方式" prop="tele" maxlength="11">
          <el-input v-model="addForm.etele" placeholder="请输入联系方式"></el-input>
        </el-form-item>

        <el-form-item label="职位" prop="post">
          <el-input v-model="addForm.epost" placeholder="请输入职位"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" plain size="medium" @click="addExistForm('addForm')">保存</el-button>
          <el-button @click="addForm = {}" size="medium">重置</el-button>
          <el-button @click="dialogFormVisible = false" size="medium">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑弹框 -->
    <el-dialog title="修改员工信息" :visible.sync="exitDialogFormVisible"
       v-loading="dialogLoading" element-loading-text="修改中" element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-form :model="editForm" ref="editForm" label-width="80px" class="demo-ruleForm">

        <el-form-item label="姓名">
          <el-input v-model="editForm.ename" placeholder="请输入姓名"></el-input>
        </el-form-item>

        <el-form-item label="联系方式">
          <el-input v-model="editForm.etele" placeholder="请输入联系方式"></el-input>
        </el-form-item>

        <el-form-item label="职位">
          <el-input v-model="editForm.epost" placeholder="请输入职位"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" plain size="medium" @click="editExistForm()">保存</el-button>
          <el-button @click="exitDialogFormVisible = false" size="medium">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "empManage",
  data() {
    return {
      // 对话框加载
      dialogLoading: false,
      // 主页数据加载
      tableDataLoading: false,
      // 代码生成加载
      empLoading: false,
      //页头搜索数据
      input: '',
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
        eno: '',
        ename: '',
        etele: '',
        epost:''
      },
      //添加对话框
      dialogFormVisible: false,
      //添加对话框表单数据
      addForm: {
      },
      //添加对话框表单数据规则
      rules: {
      ename: [
        { required: true, message: '请输入姓名', trigger: 'change' }
      ],
      etele: [
        { required: true, message: '请输入联系方式', trigger: 'change' }
      ],
      epost: [
        { required: true, message: '请输入职位', trigger: 'change' }
      ],
    }
    };
  },

  created() {
    this.getAllTable();
  },

  methods: {
    //获取列表数据
    async getAllTable() {
      // this.tableDataLoading = true
      // try{
      //   const res=await reqGetAllTable();
      //   if (res.code == 200) {
      //     this.tableData = res.data;
      //   } else {
      //     this.$message.error(res.message);
      //   }
      //   this.tableDataLoading = false
      // }catch(error){
      //   console.log(error.message)
      // }
    },

    //页头搜索按钮
    async searchId(){
      // try{
      //   console.log(this.input)
      //   const res=await reqSelecteno(this.input);
      //   if (res.code == 200) {
      //     this.tableData = res.data;
      //   } else {
      //     this.$message.error(res.message);
      //   }
      // }catch(error){
      //   console.log(error.message)
      // }
    },

    //页头重置按钮
    resetSearch(){
      this.input="";
      this.getAllTable();
    },

    //页头添加对话框保存按钮
    addExistForm(formName) {
      // this.$refs[formName].validate(async (valid) => {
      //   if (valid) {
      //     this.dialogLoading = true;
      //     try{
      //       console.log(this.addForm)
      //       const res=await reqaddTable(this.addForm);
      //       this.dialogLoading = false
      //       if (res.code === 200) {
      //         this.dialogFormVisible = false;
      //         this.$message({
      //           message: '添加成功',
      //           type: 'success'
      //         });
      //         this.getAllTable()
      //       } else {
      //         this.addForm = {}
      //         this.$message.error('添加失败');
      //       }
      //     }catch(error){
      //       console.log(error.message);
      //       this.$message.error(res.message);
      //     }
      //   } else {
      //     this.$message.error('请完善信息后重试');
      //   }
      // });
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
      //       this.getAllTable()
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
      this.exitDialogFormVisible = true
      this.editForm= row
    },

    //操作栏编辑保存按钮
    async editExistForm(){
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
:deep .table .el-table .el-table__header-wrapper .el-table__header  .el-table__cell {
  padding: 7px 0;
  font-size: 14px;
  color: #999;
  font-weight: 600px;
  text-align: center;
  background-color: #f2f2f2;
}
/* el-table__cell */
:deep .el-table .el-table__body-wrapper .el-table__body .el-table__row .el-table__cell .cell .el-button--text {
  font-size: 13px;
}

:deep .el-dialog__wrapper .el-dialog .el-dialog__body .el-form .el-form-item {
  width: 330px;
  margin-bottom: 35px;
}

:deep .el-dialog__wrapper .el-dialog .el-dialog__body {
  padding: 30px 20px 1px 50px;
}

:deep .el-dialog__wrapper .el-dialog {
  width: 36%;
}

:deep .el-table .el-table__body-wrapper .el-table__body .el-table__row .el-table__cell .cell {
  text-overflow: clip;
  text-align: center;
}

.input {
  display: flex;
  margin-top: 0;
}

.input-font {
  width: 370px;
  display: flex;
}

.input-button {
  margin-left: 15px;
}

.fontdiv {
  font-weight: 600;
  font-size: 15px;
  width: 110px;
  line-height: 36px;
  text-align: center;
  color: #999;
}

.table,
.button{
  margin-top: 15px;
}

</style>