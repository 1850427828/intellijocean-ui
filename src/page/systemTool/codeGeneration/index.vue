<template>
  <div id="page">
    <!-- 页头搜索 -->
    <div class="input">
      <div class="input-font">
        <div class="fontdiv">表名称</div>
        <el-input placeholder="请输入表名称" v-model="input1" clearable size="medium"></el-input>
      </div>

      <div class="input-font">
        <div class="fontdiv">表描述</div>
        <el-input placeholder="请输入表描述" v-model="input2" clearable size="medium"></el-input>
      </div>

      <div class="input-font">
        <div class="fontdiv">创建时间</div>
        <el-date-picker v-model="time" type="daterange" range-separator="-" start-placeholder="开始日期"
          end-placeholder="结束日期" size="medium">
        </el-date-picker>
      </div>

      <div class="input-button input-font">
        <el-button size="medium" type="primary" icon="el-icon-search" :loading="false">搜索</el-button>
        <el-button size="medium" plain icon="el-icon-refresh" @click="resetInput()">重置</el-button>
      </div>
    </div>

    <!-- 页头按钮 -->
    <div class="button" v-loading.fullscreen.lock="codeGenLoading" element-loading-text="代码拼命生成中"
      element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-row>
        <el-button id="codeGen" size="medium" type="primary" plain icon="el-icon-download" :disabled="false"
          @click="codeGen()">生成</el-button>
        <el-button id="globalStrategy" size="medium" type="success" plain icon="el-icon-edit" @click="getGenStrategy()">配置</el-button>
        <el-button id="delete" size="medium" type="danger" plain icon="el-icon-delete" :disabled="disabled"
          @click="deleteSelected">删除</el-button>
        <el-button id="datasourceConnection" size="medium" type="info" plain icon="el-icon-upload" :disabled="false"
          @click="dialogFormVisible = true">连接数据源</el-button>
        <el-select id="connectionHistory" v-model="id" filterable size="medium" placeholder="请选择" @change="getAllData"
          style="width: 140px; margin: 0 10px;">
          <el-option v-for="item in option" :key="item.id" :label="item.datasourceName" :value="item.id">
          </el-option>
        </el-select>
      </el-row>
      <!-- <el-row>
        <el-select
          v-model="id"
          filterable
          size="medium"
          placeholder="请选择"
          @change="getAllData"
          style="width: 140px"
        >
          <el-option
            v-for="item in option"
            :key="item.id"
            :label="item.datasourceName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-row> -->
    </div>

    <!-- 列表渲染 -->
    <div class="table">
      <el-table :data="tableData" style="width: 100%" ref="multipleTable" tooltip-effect="dark" fixed
        @selection-change="handleSelectionChange" v-loading.fullscreen.lock="tableDataLoading">
        <el-table-column type="selection" min-width="50"></el-table-column>
        <el-table-column type="index" label="序号" min-width="50"></el-table-column>
        <el-table-column prop="tableName" label="表名称" min-width="200"></el-table-column>
        <el-table-column prop="tableComment" label="表描述" min-width="200"></el-table-column>
        <el-table-column prop="className" label="实体" min-width="120"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="180">{{
          createTime
        }}</el-table-column>
        <el-table-column prop="updateTime" label="更新时间" min-width="180">{{
          updateTime
        }}</el-table-column>
        <el-table-column label="操作" fixed="right" min-width="150" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">👁预览</el-button>
            <el-button @click="editTable(scope.row)" type="text" size="small">🖊编辑</el-button>
            <el-button @click="deleteRow(scope.$index, scope.row)" type="text" size="small">🗑删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 连接数据源弹框 -->
    <el-dialog title="数据库配置"  :visible.sync="dialogFormVisible" v-loading="dialogLoading" element-loading-text="数据库拼命连接中"
      element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-form :model="configForm" :rules="rules" ref="configForm" label-width="110px" class="demo-ruleForm">
        <el-form-item label="数据库类型" prop="dbTypeName">
          <el-select v-model="configForm.dbType" placeholder="请选择数据库类型">
            <el-option label="MySQL" value="MySQL"></el-option>
            <el-option label="SqlServer" value="SqlServer"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="数据库地址" prop="host">
          <el-input v-model="configForm.dbUrl" placeholder="ip:port/url"></el-input>
        </el-form-item>

        <el-form-item label="数据库用户名" prop="username">
          <el-input v-model="configForm.username" placeholder="请输入数据库用户名"></el-input>
        </el-form-item>

        <el-form-item label="数据库密码" prop="password">
          <el-input v-model="configForm.password" placeholder="请输入数据库密码" type="password"></el-input>
        </el-form-item>

        <el-form-item label="数据库名称" prop="dbName">
          <el-input v-model="configForm.dbName" placeholder="请输入数据库名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="submitForm('configForm')" type="primary" :plain="true">连接</el-button>
          <el-button @click="resetForm(configForm)">重置</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 配置信息按钮的对话框 -->
    <el-dialog title="信息配置" :visible.sync="editFormVisible" center>
      <el-form :model="strategyData" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="widthbox">
          <el-form-item label="生成业务名">
            <el-input v-model="strategyData.serverName" placeholder="请输入生成业务名"></el-input>
          </el-form-item>

          <el-form-item label="生成包路径">
            <el-input v-model="strategyData.packageName" placeholder="请输入生成包路径"></el-input>
          </el-form-item>

          <el-form-item label="作者">
            <el-input v-model="strategyData.author" placeholder="请输入作者"></el-input>
          </el-form-item>
        </div>

        <el-form-item label="生成模板">
          <el-checkbox-group v-model="strategyData.templates">
            <el-checkbox :label="item" v-for="(item, index) in strategyData.templateFiles" :key="index"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="生成功能">
          <el-checkbox v-model="strategyData.queryFunction" true-label="true" false-label="false">查询</el-checkbox>
          <el-checkbox v-model="strategyData.addFunction" true-label="true" false-label="false">添加</el-checkbox>
          <el-checkbox v-model="strategyData.updateFunction" true-label="true" false-label="false">修改</el-checkbox>
          <el-checkbox v-model="strategyData.deleteFunction" true-label="true" false-label="false">删除</el-checkbox>
        </el-form-item>

        <el-form-item label="生成代码方式">
          <el-radio v-model="radio" label="zip压缩包">zip压缩包</el-radio>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editGenStrategy()" type="primary" :plain="true">保存</el-button>
        <el-button @click="editFormVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import {
  getAllData, //获取基本列表数据
  connectData, //连接数据源
  deleteData, //删除
  getHistoryData, //获取历史下拉列表数据
  codeGen, //代码生成
  getGenStrategy, //获取当前全局生成策略
  editGenStrategy, //代码生成修改全局策略
} from "@/api/systemTool/codeGeneration";
import {
  getNewTime,
  setCreateTime,
  getCreateTime,
  setUpdateTime,
  getUpdateTime,
} from "@/utils/time";
import { getDataBaseId, setDataBaseId } from "@/utils/localStorage";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export default {
  name: "codeGeneration",
  data() {
    return {
      // 对话框加载
      dialogLoading: false,
      // 主页数据加载
      tableDataLoading: false,
      // 代码生成加载
      codeGenLoading: false,
      //页头搜索数据
      input1: "",
      input2: "",
      time: "",
      //页头历史记录下拉列表
      option: [],
      //选中的历史连接过的数据（发请求）
      id: "",
      //页头删除按钮禁用状态
      disabled: true,
      //保存多选框选中的行数据
      selectedRows: [],
      //渲染列表数据
      tableData: [],
      //配置对话框数据
      strategyData: {},
      //创建时间
      createTime: "",
      //更新时间
      updateTime: "",
      //连接数据对话框
      dialogFormVisible: false,
      //配置对话框
      editFormVisible: false,
      //配置对话框默认ZIP生成方式
      radio: "zip压缩包",
      //连接数据对话框表单数据
      configForm: {
        dbType: "", //数据库类型
        dbUrl: "152.136.182.118:9000", //数据库连接地址
        username: "hqh", //数据库用户名
        password: "hqh031218", //数据库密码
        dbName: "hqh-app", //数据库名称
      },
      //连接数据对话框表单数据规则
      rules: {
        dbHost: [
          { required: true, message: "请输入数据库地址", trigger: "change" },
        ],
        dbType: [
          { required: true, message: "请选择数据库类型", trigger: "change" },
        ],
        username: [
          { required: true, message: "请输入数据库用户名", trigger: "change" },
        ],
        password: [
          { required: true, message: "请输入数据库密码", trigger: "change" },
        ],
        dbName: [
          { required: true, message: "请输入数据库名称", trigger: "change" },
        ],
      },
      driverObj: driver({
        popoverClass: 'driverjs-theme',
        allowClose: true,
        showProgress: true,
        steps: [
          { element: '.page', popover: { title: 'SparcFusion', description: '欢迎来到代码生成器！', side: "left", align: 'start' } },
          { element: '#datasourceConnection', popover: { title: '连接数据源', description: '在这里您可以选择想要连接的数据源进行连接', side: "bottom", align: 'start' } },
          { element: '.table', popover: { title: '查看数据源信息', description: '连接后您可以在这里看到关于数据源的相关信息', side: "left", align: 'start' } },
          { element: '#globalStrategy', popover: { title: '全局策略配置', description: '如果您想要控制生成策略,可点击进行个性化配置', side: "bottom", align: 'start' } },
          { element: '#delete', popover: { title: '删除信息', description: '如果您想要删除某条信息,可选中一条数据后点击此处', side: "right", align: 'start' } },
          { element: '#codeGen', popover: { title: '生成代码', description: '完成修改后,只需点击生成即可获取一套CRUD代码以及相关的UI代码', side: "top", align: 'start' } },
          { element: '#connectionHistory', popover: { title: '数据源更换', description: '最后,在此处将显示您的数据源连接历史,您可以通过选择不同的数据源进行更换展示以及需要生成的相关信息', side: "top", align: 'start' } }
        ]
      })
    };
  },

  created() {
    this.init();
  },
  mounted(){
    this.driverObj.drive();
  },
  methods: {
    // 页面初始化
    init() {
      this.getHistoryData().then(() => {
        this.getAllData();
      });
    },

    // 操作指引
    driver() {
      const driverObj = driver();
      driverObj.highlight({
        element: '.page',
        popover: {
          title: 'SparcFusion',
          description: '欢迎来到代码生成器',
        },
      },
      
      );
    },

    //获取基本列表数据
    async getAllData() {
      if (getDataBaseId() && !this.id) {
        this.id = getDataBaseId();
      }
      if (getDataBaseId() || this.id) {
        this.tableDataLoading = true;
        try {
          const res = await getAllData(this.id || getDataBaseId());
          if (res.code == 200) {
            setDataBaseId(this.id);
            this.createTime = getCreateTime();
            this.updateTime = getUpdateTime();
            this.tableData = res.data;
          } else {
            this.$message.error(res.message);
          }
          this.tableDataLoading = false;
        } catch (error) {
          console.log(error.message);
        }
      }
    },

    //页头重置按钮
    resetInput() {
      this.input1 = "";
      this.input2 = "";
    },

    //页头代码生成
    async codeGen() {
      if (this.selectedRows.length === 0) {
        this.$message.error("请选择要生成代码的数据表");
      } else {
        let TableNameList = [];
        for (let i = 0; i < this.selectedRows.length; i++) {
          TableNameList.push({ tableName: this.selectedRows[i].tableName });
        }
        const data = {
          id: getDataBaseId(),
          tableList: TableNameList,
        };
        this.codeGenLoading = true;
        try {
          const res = await codeGen(data, "blob");
          //创建一个a标签元素
          const link = document.createElement("a");
          try {
            //获取到blob
            let blob = new Blob([res], { type: "application/octet-stream" });
            let _fileName = "code-gen.zip"; //文件名，中文无法解析的时候会显示 _(下划线),生产环境获取不到
            link.style.display = "none";
            // 兼容不同浏览器的URL对象
            const url = window.URL || window.webkitURL || window.moxURL;
            link.href = url.createObjectURL(blob);
            link.setAttribute(
              "download",
              _fileName.substring(_fileName.lastIndexOf("_") + 1)
            );
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            url.revokeObjectURL(link.href); //销毁url对象
            this.codeGenLoading = false;
            this.$message.success("代码生成成功");
          } catch (e) {
            console.log("代码生成出错", e);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    },

    //页头连接数据对话框连接按钮
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.dialogLoading = true;
          try {
            const res = await connectData(this.configForm);
            if (res.code === 200) {
              this.dialogFormVisible = false;
              setCreateTime(getNewTime());
              setUpdateTime(getNewTime());
              this.getHistoryData();
              this.$message({
                message: "连接成功",
                type: "success",
              });
            } else {
              this.configForm = {};
              this.$message.error("数据库连接失败");
            }
            this.dialogLoading = false;
          } catch (error) {
            console.log(error.message);
            this.$message.error(res.message);
          }
        } else {
          this.$message.error("请完善信息后重试");
        }
      });
    },

    //页头连接数据对话框重置按钮
    resetForm(configForm) {
      this.configForm = {};
    },

    //页头删除按钮
    async deleteSelected() {
      let TableNameList = [];
      for (let i = 0; i < this.selectedRows.length; i++) {
        TableNameList.push({ tableName: this.selectedRows[i].tableName });
      }
      const data = {
        id: getDataBaseId(),
        tableList: TableNameList,
      };
      if (TableNameList.length !== 0) {
        try {
          const res = await deleteData(data);
          if (res.code === 200) {
            for (let i = 0; i < this.selectedRows.length; i++) {
              const index = this.tableData.indexOf(this.selectedRows[i]);
              if (index > -1) {
                this.tableData.splice(index, 1);
              }
            }
            this.disabled = true;
            this.selectedRows = []; // 清空选中的行数据
            this.$message({
              message: "删除成功",
              type: "success",
            });
          }
        } catch (error) {
          console.log(error);
          this.$message.error(res.message);
        }
      } else {
        this.$message.error("请选择要删除的对象");
      }
    },

    //获取页头历史数据
    async getHistoryData() {
      try {
        const res = await getHistoryData();
        if (res.code == 200) {
          console.log(res);
          this.option = res.data;
        } else {
          this.$message.error(res.message);
        }
        this.tableDataLoading = false;
      } catch (error) {
        console.log(error.message);
      }
    },

    //页头配置对话框
    async getGenStrategy() {
      this.editFormVisible = true;
      try {
        const res = await getGenStrategy(getDataBaseId());
        if (res.code == 200) {
          console.log(res);
          this.strategyData = res.data;
        } else {
          this.$message.error(res.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    },

    // 页头配置对话框保存按钮
    async editGenStrategy() {
      const data = {
        id: getDataBaseId(),
        table: {
          author: this.strategyData.author,
          serveName: this.strategyData.serveName,
          packageName: this.strategyData.packageName,
          templates: this.strategyData.templates,
          query: this.strategyData.queryFunction,
          delete: this.strategyData.deleteFunction,
          update: this.strategyData.updateFunction,
          add: this.strategyData.addFunction,
        },
      };
      try {
        const res = await editGenStrategy(data);
        if (res.code == 200) {
          console.log(res);
          this.editFormVisible = false;
        } else {
          this.$message.error(res.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    },

    //通过选中的多行数据存入数组
    handleSelectionChange(selection) {
      this.disabled = false;
      this.selectedRows = selection;
    },

    // //操作栏预览
    // handleClick(row) {
    //   this.$router.push({
    //     path: "/index/form",
    //   });
    //   console.log(row);
    //   console.log(this.tableData);
    // },

    //操作栏编辑
    editTable(row) {
      const tableName = row.tableName;
      this.$router.push({
        path: "/editor",
        query: { tableName },
      });
    },

    //操作栏删除
    async deleteRow(index, row) {
      const data = {
        id: getDataBaseId(),
        tableList: [
          {
            tableName: row.tableName,
          },
        ],
      };
      try {
        const res = await deleteData(data);
        if (res.code === 200) {
          this.tableData.splice(index, 1);
          this.$message({
            message: "删除成功",
            type: "success",
          });
        }
      } catch (error) {
        console.log(error);
        this.$message.error(res.message);
      }
    },
  },
};
</script>

<style scoped>
:deep .table .el-table .el-table__header-wrapper .el-table__header .el-table__cell {
  /* padding: 7px 0; */
  font-size: 14px;
  color: #999;
  font-weight: 600px;
  text-align: center;
  /* background-color: #f2f2f2; */
}

/* el-table__cell */
:deep .el-table .el-table__body-wrapper .el-table__body .el-table__row .el-table__cell .cell .el-button--text {
  font-size: 13px;
}

:deep .el-dialog__wrapper .el-dialog .el-dialog__body .el-form .el-form-item {
  width: 380px;
  margin-bottom: 35px;
}

:deep .el-dialog__wrapper .el-dialog .el-dialog__body {
  padding: 30px 20px 1px 50px;
}

:deep .el-dialog__wrapper .el-dialog {
  width: 35%;
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
.button {
  margin-top: 15px;
  /* display: flex;
  justify-content: space-between; */
}




</style>