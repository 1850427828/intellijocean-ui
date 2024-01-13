<template>
    <div>

        <!-- 页头搜索======================================================== -->
        <!-- 页头搜索 -->
        <div class="input">
            <div class="input-font">
                <div class="fontdiv">角色昵称</div>
                <el-input placeholder="请输入角色名称" v-model="searchForm.roleName" clearable size="medium"></el-input>
            </div>
            <div class="fontdiv">状 态</div>
            <el-select v-model="searchForm.status" placeholder="请选择状态" clearable style="width: 160px" size="medium">
                <el-option label="启用" value="0" />
                <el-option label="禁用" value="1" />
            </el-select>
            <div class="input-button input-font">
                <el-button size="medium" type="primary" icon="el-icon-search" :loading="false"
                    @click="getTableData()">搜索</el-button>
                <el-button size="medium" plain icon="el-icon-refresh" @click="resetSearch()">重置</el-button>
            </div>
        </div>
        <!-- 页头按钮======================================================== -->
        <!-- 页头按钮 -->
        <div class="button">
            <el-row>
                <el-button size="medium" type="primary" plain icon="el-icon-download" :disabled="false"
                    @click="add()">添加</el-button>
                <el-button size="medium" type="danger" plain icon="el-icon-download" :disabled="false"
                    @click="deleteList()">批量删除</el-button>
            </el-row>
        </div>

        <!-- 表格区域======================================================== -->
        <!-- 列表渲染 -->
        <div class="table">
            <el-table :data="tableData" style="width: 100%" ref="multipleTable" tooltip-effect="dark"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" min-width="60"></el-table-column>
                <el-table-column type="index" label="序号" min-width="80"></el-table-column>
                <!-- <el-table-column prop="avatar" label="头像" min-width="100">
                    <template #default="scope">
                        <el-avatar :size="45" :src="scope.row.avatar" fit="contain">
                            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                        </el-avatar>
                    </template>
                </el-table-column> -->
                <el-table-column prop="roleName" label="角色名称" min-width="120"></el-table-column>
                <el-table-column prop="roleKey" label="权限字符" min-width="80"></el-table-column>
                <el-table-column prop="roleSort" label="排序" min-width="150">
                    <template #default="scope">
                        <el-tag type="info">{{ scope.row.roleSort }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" min-width="160"></el-table-column>
                <el-table-column prop="updateTime" label="更新时间" min-width="160"></el-table-column>
                <el-table-column prop="status" label="状态" min-width="90">
                    <template #default="scope">
                        <div @click="changeStatus(scope.row)">
                            <el-switch v-model="scope.row.status" :active-value="'0'" :inactive-value="'1'"></el-switch>
                        </div>
                    </template>
                </el-table-column>
                <!-- 浮动侧边栏 -->
                <!-- <el-table-column label="操作" fixed="right" min-width="160" align="center"> -->
                <el-table-column label="操作" min-width="160">
                    <template #default="scope">
                        <el-button @click="editRow(scope.row)" type="text" size="small">👁预览</el-button>
                        <el-button @click="editRow(scope.row)" type="text" size="small">🖊编辑</el-button>
                        <el-button @click="deleteRow(scope.row.roleId)" type="text" size="small">🗑删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页器 -->
        <Pagination :total="total" :page="pageNumber" :size="pageSize" @getPage="getPage($event)"
            @getSize="getSize($event)">
        </Pagination>

        <!-- 修改 ===================================================================== -->
        <el-dialog title="修改" :visible.sync="updateFormVisible">
            <el-form :model="updateForm" :rules="rules" ref="updateForm" label-width="110px" class="demo-ruleForm">
                <el-form-item label="角色昵称" prop="roleName">
                    <el-input v-model="updateForm.roleName" placeholder="请输入角色昵称"></el-input>
                </el-form-item>
                <el-form-item label="角色权限字符" prop="roleKey">
                    <el-input v-model="updateForm.roleKey" placeholder="请输入角色权限字符"></el-input>
                </el-form-item>
                <el-form-item label="数据范围" prop="dataScope">
                    <el-select v-model="updateForm.dataScope" placeholder="请选择">
                        <el-option label="仅本人" value="1"></el-option>
                        <el-option label="全部数据权限" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="显示顺序" prop="roleSort">
                    <el-input v-model="updateForm.roleSort" placeholder="请输入角色显示顺序"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="updateForm.remark" placeholder="请输入备注"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="editSubmit()" type="primary" :plain="true">确认</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                    <el-button @click="updateFormVisible = false">取 消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 添加 ===================================================================== -->
        <el-dialog title="添加" :visible.sync="addFormVisible">
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="110px" class="demo-ruleForm">
                <el-form-item label="角色昵称" prop="roleName">
                    <el-input v-model="addForm.roleName" placeholder="请输入角色昵称"></el-input>
                </el-form-item>
                <el-form-item label="角色权限字符" prop="roleKey">
                    <el-input v-model="addForm.roleKey" placeholder="请输入角色权限字符"></el-input>
                </el-form-item>
                <el-form-item label="数据范围" prop="dataScope">
                    <el-select v-model="addForm.dataScope" placeholder="请选择">
                        <el-option label="仅本人" value="1"></el-option>
                        <el-option label="全部数据权限" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="显示顺序" prop="roleSort">
                    <el-input v-model="addForm.roleSort" placeholder="请输入角色显示顺序"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="addForm.remark" placeholder="请输入备注"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="addSubmit()" type="primary" :plain="true">确认</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                    <el-button @click="addFormVisible = false">取 消</el-button>
                </el-form-item>

            </el-form>
        </el-dialog>




    </div>
</template>
<script>
import { getAllData, deletesRoleInfo, updateRoleInfo, addRoleInfo } from "@/api/role"

import Pagination from "@/components/Pagination";
export default {
    name: "roleManage",
    components: { Pagination },
    data() {
        return {
            //是否展示路由
            isShow: false,
            //页头搜索数据
            searchForm: {},
            // ===========================================
            //保存多选框选中的行数据
            selectedRows: [],
            //渲染列表数据
            tableData: [],
            //总条数
            total: 0,
            //当前页数
            pageNumber: 1,
            //当前每页条数
            pageSize: 5,
            // ============================================
            //修改 是否展示
            updateFormVisible: false,
            //修改表单数据
            updateForm: {},
            // ============================================
            //添加 是否展示
            addFormVisible: false,
            //连接数据对话框表单数据
            addForm: {
            },
            //连接数据对话框表单数据规则
            rules: {
                rolename: [
                    { required: true, message: '请输入角色编号', trigger: 'blur' }
                ],
                nickname: [
                    { required: true, message: '请输入角色昵称', trigger: 'blur' }
                ]
            },
        };
    },
    mounted() {
        this.getTableData();
    },
    methods: {
        // 页头搜索
        resetSearch() {
            this.searchForm = {}
        },
        // 分页查询===================  
        async getTableData() {
            const page = {
                "pageNumber": this.pageNumber,
                "pageSize": this.pageSize
            }
            const data = this.searchForm
            const res = await getAllData(page, data);
            this.tableData = res.data.rows
            this.total = parseInt(res.data.total)
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
        //通过选中的多行数据存入数组
        handleSelectionChange(selection) {
            this.selectedRows = selection;
            console.log(this.selectedRows)
        },
        // 删除==============
        deleteRow(roleId) {
            this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const data = [
                    {
                        "roleId": roleId
                    }
                ]
                const res = await deletesRoleInfo(data);
                if (res.code == 200) {
                    this.getTableData();
                    this.$message.success("删除成功");
                    return;
                }
                this.$message.error("删除失败");
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });






        },
        async deleteList() {
            const data = this.selectedRows
            const res = await deletesRoleInfo(data);
            if (res.code == 200) {
                this.getTableData();
                this.$message.success("删除成功");
                return;
            }
            this.$message.error("删除失败");
        },

        // 修改==============
        editRow(row) {
            this.updateForm = row
            this.updateFormVisible = true

        },
        async editSubmit() {
            const res = await updateRoleInfo(this.updateForm)
            if (res.code != 200) {
                this.$message.error("修改失败");
                return;
            }
            this.$message.success("修改成功");
            this.updateFormVisible = false
        },
        resetForm() {
            this.addForm = {}
            this.updateForm = {}
        },
        // 修改状态
        async changeStatus(row) {
            console.log(row.status)
            var text = "操作成功"
            if (row.status == 0) {
                text = "启用成功"
            } else if (row.status == 1) {
                text = "禁用成功"
            }
            const res = await updateRoleInfo(row)
            if (res.code == 200) {
                this.$message.success(text);
            }
        },
        // 添加==============
        add() {
            this.addFormVisible = true
        },
        async addSubmit() {
            const res = await addRoleInfo(this.addForm)
            if (res.code != 200) {
                this.$message.error("添加失败");
                return;
            }
            this.$message.success("添加成功");
            this.getTableData()
            this.addFormVisible = false
        },

    }
}
</script>
<style scoped>
.table {
    margin-top: 15px;
}

/* 表格 */
:deep .table .el-table .el-table__header-wrapper .el-table__header .el-table__cell {
    padding: 7px 0;
    font-size: 14px;
    color: #999;
    font-weight: 600px;
    text-align: center;
    background-color: #f2f2f2;
}

:deep .el-table .el-table__body-wrapper .el-table__body .el-table__row .el-table__cell .cell {
    text-overflow: clip;
    text-align: center;
}

:deep .el-dialog__body {
    display: flex;
    justify-content: center;
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
}
</style>