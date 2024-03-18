<template>
  <div>
    <div class="box">
      <div class="data">
        <div class="up">
          <h3>{{ dataList.name }}</h3>
          <div class="header">
            <div class="search">
              <div class="method">{{ dataList.method }}</div>
              <div class="url">
                https://www.intellijocean.cn{{ dataList.url }}
              </div>
            </div>
            <el-button type="primary" @click="sendData">发送</el-button>
          </div>
          <div class="contain">
            <div class="tabs">
              <el-tabs
                type="border-card"
                @tab-click="handleChangeImport"
                value="Params"
              >
                <el-tab-pane label="Params" name="Params">
                  <el-table :data="tableData" border style="width: 100%">
                    <el-table-column
                      prop="name"
                      label="参数名"
                      width="351"
                      highlight-current-row="false"
                    >
                      <template slot-scope="scope"
                        ><el-input
                          class="params-name"
                          v-model="scope.row.name"
                        ></el-input
                      ></template>
                    </el-table-column>
                    <el-table-column prop="value" label="参数值" width="450">
                      <template slot-scope="scope"
                        ><el-input
                          class="params-value"
                          v-model="scope.row.value"
                        ></el-input></template
                    ></el-table-column>
                    <el-table-column prop="name" width="60"
                      ><template slot-scope="scope">
                        <div
                          v-if="scope.$index != tableData.length - 1"
                          class="params-delete"
                          @click="handleDelete(scope.$index, scope.row)"
                        >
                          ×
                        </div>
                      </template></el-table-column
                    >
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="Body" name="Body">
                  <el-radio-group v-model="radio" style="margin-bottom: 10px">
                    <el-radio label="json">json</el-radio>
                    <el-radio label="form-data">form-data</el-radio>
                  </el-radio-group>
                  <CodeEditor
                    @changed="handleJsonEditor"
                    ref="jsonEditor"
                    :value="{}"
                    :readOnly="false"
                  ></CodeEditor>
                </el-tab-pane>
                <el-tab-pane label="Header">{{ jsonStr }}</el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>

        <div class="footer">
          <ResizeBox
            :resize-conf="resizeConf"
            class="resizeBox"
            @resize-finished="handleResizeFinished"
          >
            <div
              class="resultbox"
              :class="resizeConf.height === 40 ? 'border_radius' : ''"
            >
              <el-button style="color: #fff" type="text" @click="resultClick"
                ><i class="el-icon-finished"></i> 返回结果</el-button
              >
            </div>
            <div
              class="result"
              v-if="showResult"
              :style="{ height: resizeBoxHeight + 'px' }"
            >
              <CodeEditor v-model="resultData" :readOnly="true"></CodeEditor>
            </div>
          </ResizeBox>
        </div>
      </div>
      <div class="show">111111111112312312</div>
    </div>
  </div>
</template>

<script>
import CodeEditor from "@/components/CodeEditor/index.vue";
import ResizeBox from "@/components/ResizeBox";
import { getResult } from "@/api/APIOnlineCall/index";
export default {
  name: "apishow",
  components: {
    CodeEditor,
    ResizeBox,
  },
  data() {
    return {
      //接口数据
      dataList: {},
      //params表格数据
      tableData: [{ name: "", value: "" }],
      //要发送的params数据
      paramsData: {},
      //代码编辑框数据
      jsonData: {},
      //Body格式
      radio: "json",
      //是否展示返回结果
      showResult: true,
      //返回的结果数据
      resultData: {},
      //传递给代码编辑器组件的数据
      jsonStr: {
        1: "2",
        2: "2",
        3: "2",
        4: "2",
        5: "2",
        6: "2",
        7: "2",
        13: "3",
        23: "3",
        33: "3",
        43: "3",
        53: "3",
        63: "3",
        73: "3",
      },
      //传递给伸缩框组件数据
      resizeConf: {
        height: 204, // 初始高度
        heightRange: [40, 200], // 高度范围
        bottomPosition: 20,
      },
      //初始化result高度
      resizeBoxHeight: 150,
    };
  },
  mounted() {
    this.dataList = this.$route.query;
  },
  methods: {
    //发送按钮
    async sendData() {
      this.editorTableData();
      console.log(this.dataList.id);
      // console.log(this.jsonData);
      const params = { id: this.dataList.id };
      const data = this.paramsData;
      const res = await getResult(params, data);
      console.log(res);
      // 格式化 JSON 字符串
      let formattedJsonString = JSON.stringify(JSON.parse(res.data), null, 2);
      // 去除无用字符（例如转义字符）
      formattedJsonString = formattedJsonString.replace(/\\n|\\r/g, "");
      res.data=formattedJsonString
      console.log(res.data)
      this.resultData = res.data;


      this.$message.success("API调用成功");
      if (this.resizeConf.height === 40) {
        this.resizeConf.height = 200;
        this.resizeBoxHeight = 150;
        this.showResult = true;
      }
    },

    //修改tableData格式
    editorTableData() {
      this.tableData.forEach((item, index) => {
        if (index === this.tableData.length - 1) {
          console.log(index);
        } else {
          this.paramsData[item.name] = item.value;
        }
      });
      console.log(this.paramsData);
    },

    //点击tab栏触发事件
    handleChangeImport(tab) {
      if (tab.name === "Body") {
        this.$nextTick(() => {
          this.$refs.jsonEditor.refresh();
        });
      }
    },

    //表格删除按钮
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
      console.log(index);
    },

    //返回结果
    resultClick() {
      if (this.resizeConf.height === 40) {
        this.resizeConf.height = 200;
        this.resizeBoxHeight = 150;
        this.showResult = true;
      } else {
        this.resizeConf.height = 40;
        this.showResult = false;
      }
    },

    //代码编辑框子传父事件
    handleJsonEditor(newValue) {
      this.jsonData = newValue;
    },

    //伸缩框子传父数据事件
    handleResizeFinished(newHeight) {
      if (newHeight <= 70) {
        this.showResult = false;
        this.resizeConf.height = 40;
      } else {
        this.showResult = true;
      }
      this.resizeBoxHeight = newHeight - 54;
      // 可以将新的高度保存到父组件的数据中，或者执行其他操作
    },
  },

  watch: {
    tableData: {
      handler(newVal, oldVal) {
        const index = this.tableData.length - 1;
        let first = false;
        if (!first) {
          if (
            this.tableData[index].name != "" ||
            this.tableData[index].value != ""
          ) {
            let newObj = { name: "", value: "" };
            this.tableData.push(newObj);
            first = true;
          }
        }
      },
      immediate: true, // 在监听器被创建时立即执行一次 handler
      deep: true, // 开启深度监听，以便监听数组对象内部属性的变化
    },
  },
};
</script>


<style scoped lang="less">
.box {
  height: calc(100vh - 118px);
  overflow: auto;
  padding: 10px;
  padding-bottom: 0;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  display: flex;

  .data {
    width: 900px;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;

    //头部样式
    .header {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;

      .search {
        width: 100%;
        background-color: #f5f7fa;
        border-radius: 5px;
        margin-right: 15px;
        height: 50px;
        display: flex;

        .method {
          width: 100px;
          text-align: center;
          line-height: 48px;
          color: #d45f21;
          font-weight: 700;
          font-size: 20px;
          border-right: 1px solid #d8d6d6;
        }

        .url {
          text-align: center;
          line-height: 50px;
          padding-left: 20px;
          font-size: 17px;
        }
      }
    }

    //中间样式
    .contain {
      .tabs {
        width: 900px;

        :deep .el-table th.el-table__cell > .cell {
          padding: 0 15px;
          line-height: 40px;
        }

        :deep .el-table tbody tr:hover > td {
          background-color: transparent;
        }

        :deep .el-table::before {
          z-index: 0;
        }

        :deep .el-table--border::after {
          z-index: 0;
        }

        // :deep .el-tabs__content {
        //   flex: 1; /* 表格容器占据剩余空间 */
        //   overflow: auto; /* 设置表格容器滚动条 */
        // }

        :deep .el-table .el-table__cell {
          padding: 0;
        }

        :deep .el-table .cell {
          padding: 0;
        }

        :deep .el-input__inner {
          border-radius: 0;
          border: none;
        }

        :deep .el-input__inner:hover {
          background-color: #f5f7fa;
        }

        :deep .el-input__inner:focus {
          border: 1px solid #409eff !important;
          box-shadow: 0 1px 0 0 #409eff !important;
        }

        .params-name {
          width: 350px;
        }

        .params-value {
          width: 449px;
        }

        .params-delete {
          width: 61px;
          height: 40px;
          font-size: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #aaaaaa;
          font-weight: 100;
        }

        .params-delete:hover {
          background-color: #f5f7fa;
        }
      }
    }

    //底部样式
    .footer {
      color: #909399;
      margin-top: 20px;
      overflow: hidden;
      .resizeBox {
        background-color: #15161a;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;

        .resultbox {
          padding: 0 15px;
          background-color: rgb(58, 58, 58);
        }
        .result {
          overflow-y: scroll;
          padding: 10px 15px;
        }
      }

      .border_radius {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }
  }

  .show {
    width: 100%;
    height: 100%;
    margin-left: 20px;
    display: flex;
    overflow-x: auto;
    background-color: #e99c9c;
  }
}
</style>