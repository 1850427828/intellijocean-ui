<template>
  <div>
    <!-- 头部按钮 -->
    <div class="button">
      <div>
        <el-button
          type="text"
          icon="el-icon-arrow-left"
          size="medium"
          @click="backCodeGeneration"
          >返回</el-button
        >
      </div>
      <div>
        <el-button
          size="medium"
          type="primary"
          icon="el-icon-s-tools"
          plain
          @click="dialogFormVisible = true"
          >配置信息</el-button
        >
        <el-button
          size="medium"
          type="primary"
          icon="el-icon-download"
          @click="saveTableData"
          >保存</el-button
        >
        <el-button
          size="medium"
          icon="el-icon-refresh"
          plain
          @click="resetTableData"
          >重置</el-button
        >
      </div>
    </div>

    <!-- 数据展示列表 -->
    <el-table
      :data="tableData.columnList"
      style="width: 100%"
      ref="multipleTable"
      tooltip-effect="dark"
    >
      <el-table-column type="selection" width="40"></el-table-column>

      <el-table-column prop="dbName" label="列名"></el-table-column>

      <el-table-column prop="comment" label="说明">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.comment"
            placeholder="请输入内容"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column prop="dbType" label="物理类型"> </el-table-column>

      <el-table-column prop="javaType" label="Java类型">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.javaType"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column prop="javaName" label="Java属性名称">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.javaName"
            placeholder="请输入内容"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column prop="primary" label="主键" width="60">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.primary"></el-checkbox>
        </template>
      </el-table-column>

      <el-table-column prop="notNull" label="非空" width="60">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.notNull"></el-checkbox>
        </template>
      </el-table-column>

      <el-table-column prop="insert" label="插入" width="60">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.insert"></el-checkbox>
        </template>
      </el-table-column>

      <el-table-column prop="edit" label="编辑" width="60">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.edit"></el-checkbox>
        </template>
      </el-table-column>

      <el-table-column prop="list" label="列表" width="60">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.list"></el-checkbox>
        </template>
      </el-table-column>

      <el-table-column prop="query" label="查询" width="60">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.query"></el-checkbox>
        </template>
      </el-table-column>

      <el-table-column prop="selectType" label="查询匹配方式">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.selectType"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column prop="htmlType" label="显示表单类型">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.htmlType"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="字典类型">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.name"
            placeholder="请输入内容"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="排序">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.name"
            placeholder="请输入内容"
          ></el-input>
        </template>
      </el-table-column>
    </el-table>

    <!-- 配置信息按钮的对话框 -->
    <el-dialog title="信息配置" :visible.sync="dialogFormVisible" center>
      <el-form
        :model="tableData"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div class="widthbox">
          <el-form-item label="生成业务名">
            <el-input
              v-model="tableData.serveName"
              placeholder="请输入生成业务名"
            ></el-input>
          </el-form-item>

          <el-form-item label="生成包路径">
            <el-input
              v-model="tableData.packageName"
              placeholder="请输入生成包路径"
            ></el-input>
          </el-form-item>

          <el-form-item label="作者">
            <el-input
              v-model="tableData.author"
              placeholder="请输入作者"
            ></el-input>
          </el-form-item>
        </div>

        <el-form-item label="生成模板">
          <el-checkbox
            v-for="(item, index) in tableData.templateFiles"
            :key="index"
            @change="updateTemplates(item)"
            :checked="isChecked(item)"
            >{{ item }}</el-checkbox
          >
        </el-form-item>

        <el-form-item label="生成功能">
          <el-checkbox v-model="tableData.query">查询</el-checkbox>
          <el-checkbox v-model="tableData.add">添加</el-checkbox>
          <el-checkbox v-model="tableData.update">修改</el-checkbox>
          <el-checkbox v-model="tableData.delete">删除</el-checkbox>
        </el-form-item>

        <el-form-item label="生成代码方式">
          <el-radio v-model="radio" label="1">zip压缩包</el-radio>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button
          @click="dialogFormVisible = false"
          type="primary"
          :plain="true"
          >完成</el-button
        >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import _ from "lodash";
import {
  getDetilData, //获取表详细信息
  editTableData, //修改表详细信息
} from "@/api/codeGeneration";
import { getNewTime, setUpdateTime } from "@/utils/time";
import { getDataBaseId } from "@/utils/localStorage";
export default {
  name: "editor",
  data() {
    return {
      //压缩包选中状态
      radio: "1",
      //列表数据
      tableData: [],
      tableDataPrimitive: [],
      //配置信息对话框
      dialogFormVisible: false,
      //下拉列表选择类型
      options: [
        {
          value: "String",
          label: "String",
        },
        {
          value: "Integer",
          label: "Integer",
        },
        {
          value: "Long",
          label: "Long",
        },
        {
          value: "Boolean",
          label: "Boolean",
        },
        {
          value: "Data",
          label: "Data",
        },
      ],
      options1: [
        {
          value: "=",
          label: "=",
        },
        {
          value: "like",
          label: "like",
        },
        {
          value: ">=",
          label: ">=",
        },
        {
          value: "<=",
          label: "<=",
        },
        {
          value: ">",
          label: ">",
        },
        {
          value: "<",
          label: "<",
        },
      ],
      options2: [
        {
          value: "input",
          label: "文本框",
        },
        {
          value: "textarea",
          label: "文本域",
        },
        {
          value: "radio",
          label: "单选框",
        },
        {
          value: "checkbox",
          label: "复选框",
        },
        {
          value: "select",
          label: "下拉菜单",
        },
        {
          value: "timepicker",
          label: "时间选择器",
        },
        {
          value: "datepicker",
          label: "日期选择器",
        },
        {
          value: "upload",
          label: "文件上传",
        },
      ],
    };
  },

  created() {
    this.getTableData();
  },

  methods: {
    //获取后端列表数据
    async getTableData() {
      const tableName = this.$route.query.tableName;
      const id = getDataBaseId();
      const data = {
        id,
        table: {
          tableName,
        },
      };
      try {
        const res = await getDetilData(data);
        this.tableDataPrimitive = res.data;
        this.tableData = _.cloneDeep(this.tableDataPrimitive);
      } catch (error) {
        console.log(error);
      }
    },

    //返回主页面按钮
    backCodeGeneration() {
      this.$router.push({
        path: "/systemTool/codeGeneration",
      });
    },

    //页头配置信息弹框生成模板change改变事件
    updateTemplates(item) {
      let isExist = false;
      for (let i = 0; i < this.tableData.templates.length; i++) {
        if (
          Object.keys(item).every(
            (key) => this.tableData.templates[i][key] === item[key]
          )
        ) {
          this.tableData.templates.splice(i, 1); // 如果存在相同元素，则删除
          isExist = true;
          break;
        }
      }
      if (!isExist) {
        this.tableData.templates.push(item); // 如果不存在相同元素，则添加
      }
    },

    //页头配置信息弹框生成模板是否选中事件
    isChecked(item) {
      let isExist = false;
      for (let i = 0; i < this.tableData.templates.length; i++) {
        if (
          Object.keys(item).every(
            (key) => this.tableData.templates[i][key] === item[key]
          )
        ) {
          isExist = true;
          break;
        }
      }
      if (!isExist) {
        isExist = false;
      }
      return isExist;
    },

    //页头保存按钮
    async saveTableData() {
      const id = getDataBaseId();
      const data = {
        id,
        table: this.tableData,
      };
      try {
        const res = await editTableData(data);
        setUpdateTime(getNewTime());
        this.$message({
          message: "保存成功",
          type: "success",
        });
      } catch (error) {
        console.log(error);
      }
    },

    //页头重置按钮
    resetTableData() {
      this.tableData = _.cloneDeep(this.tableDataPrimitive);
    },
  },
};
</script>

<style scoped>
:deep
  .el-table
  .el-table__header-wrapper
  .el-table__header
  .has-gutter
  .el-table__cell {
  padding: 7px 0;
  background-color: #f2f2f2;
  font-size: 14px;
  color: #666;
  font-weight: normal;
  text-align: center;
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

:deep .el-dialog__wrapper .el-dialog {
  width: 50%;
}

/* :deep .el-dialog__wrapper .el-dialog .el-dialog__body .el-form  .el-form-item:nth-last-child(1) {
  display: block;
  display: flex;
  margin: 0;
} */

.button {
  margin: 0 5px 10px 5px;
  display: flex;
  justify-content: space-between;
}

.widthbox {
  width: 60%;
}
:deep .el-dialog__wrapper .el-dialog {
  height: 75%;
  overflow: auto;
}
:deep .el-dialog__wrapper .el-dialog::-webkit-scrollbar-thumb {
  border-radius: 16px;
  background-color: rgb(222, 221, 221);
}

:deep .el-dialog__wrapper .el-dialog::-webkit-scrollbar {
  width: 10px;
}
:deep .el-dialog__wrapper .el-dialog::-webkit-scrollbar-track {
  background-color: rgb(255, 255, 255);
}
</style>