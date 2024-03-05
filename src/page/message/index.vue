<template>
    <div>
        <!-- 页头搜索======================================================== -->
        <!-- 页头搜索 -->
        <div class="input">
            <div class="input-font">
                <div class="fontdiv">用户昵称</div>
                <el-input placeholder="请输入用户昵称" v-model="searchForm.nickname" clearable size="medium"></el-input>
            </div>
            <div class="input-font">
                <div class="fontdiv">手机号码</div>
                <el-input placeholder="请输入手机号码" v-model="searchForm.phonenumber" clearable size="medium"></el-input>
            </div>
            <div class="fontdiv">性 别</div>
            <el-select v-model="searchForm.gender" placeholder="请选择性别" clearable style="width: 160px" size="medium">
                <el-option label="男" value="1" />
                <el-option label="女" value="0" />
            </el-select>
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
                <el-button size="medium" type="primary" plain icon="el-icon-download" :disabled="false"
                    @click="exportData()">数据导出</el-button>
            </el-row>
        </div>

        <!-- 表格区域======================================================== -->
        <!-- 列表渲染 -->
        <div class="table">
            <el-table :data="tableData" style="width: 100%" ref="multipleTable" tooltip-effect="dark"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" min-width="60"></el-table-column>
                <el-table-column type="index" label="序号" min-width="80"></el-table-column>
                <el-table-column prop="avatar" label="头像" min-width="100">
                    <template #default="scope">
                        <div @click="avatarPreview(scope.row.avatar)">
                            <el-avatar :size="45" :src="scope.row.avatar" fit="contain">
                                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                            </el-avatar>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="nickname" label="昵称" min-width="120"></el-table-column>
                <el-table-column prop="gender" label="性别" min-width="80">
                    <template #default="scope">
                        <p v-if="scope.row.gender == '0'">女</p>
                        <p v-else-if="scope.row.gender == '1'">男</p>
                        <p v-else>未知</p>
                    </template>
                </el-table-column>
                <el-table-column prop="phonenumber" label="联系方式" min-width="150"></el-table-column>
                <el-table-column prop="roleList" label="角色" min-width="120">
                    <template #default="scope">
                        <el-tag v-for="item in scope.row.roleList" :key="item.id">{{ item.roleName }}</el-tag>
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
                        <el-button @click="deleteRow(scope.row.id)" type="text" size="small">🗑删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页器 -->
        <Pagination :total="total" :page="pageNumber" :size="pageSize" @getPage="getPage($event)"
            @getSize="getSize($event)">
        </Pagination>

        <!-- 头像预览=====================================================================  -->
        <el-dialog :visible.sync="avatarDialogVisible">
            <img width="60%" :src="avatarUrl" alt="" />
        </el-dialog>
        <!-- 修改 ===================================================================== -->
        <el-dialog title="修改" :visible.sync="updateFormVisible">
            <el-form :model="updateForm" :rules="rules" ref="updateForm" label-width="110px" class="demo-ruleForm">
                <el-form-item label="用户昵称" prop="nickname">
                    <el-input v-model="updateForm.nickname" placeholder="请输入昵称"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phonenumber">
                    <el-input v-model="updateForm.phonenumber" placeholder="请输入昵称"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-select v-model="updateForm.gender" placeholder="请选择">
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色" prop="role">
                    <el-select v-model="updateForm.role" filterable multiple placeholder="请选择" @change="changeSelect">
                        <el-option v-for="item in roleData" :key="item.roleId" :label="item.roleName" :value="item.roleId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="updateForm.email" placeholder="请输入邮箱"></el-input>
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
                <el-form-item label="用户昵称" prop="nickname">
                    <el-input v-model="addForm.nickname" placeholder="请输入用户昵称"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phonenumber">
                    <el-input v-model="addForm.phonenumber" placeholder="请输入昵称"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password" placeholder="请输入用户密码"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-select v-model="addForm.gender" placeholder="请选择" style="width: 240px">
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所在地区" prop="city">
                    <el-cascader v-model="selectCity" :options="cityData" @change="handleCity()"
                        style="width: 192px;" />
                </el-form-item>
                <el-form-item label="角色" prop="role">
                    <el-select v-model="addForm.role" filterable multiple placeholder="请选择">
                        <el-option v-for="item in roleData" :key="item.roleId" :label="item.roleName" :value="item.roleId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email" placeholder="请输入邮箱"></el-input>
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
import {
    getAllData,
    deletesUserInfo,
    updateUserInfo,
    addUserInfo,
    exportUserData
} from "@/api/message";
import { getRoleList } from "@/api/role";
import getCities from "@/utils/city"
import Pagination from "@/components/Pagination";
export default {
    name: "userManage",
    components: { Pagination },
    data() {
        return {
            //是否展示路由
            isShow: false,
            //页头搜索数据
            searchForm: {},
            //头像预览
            avatarDialogVisible: false,
            avatarUrl: "",
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
            //添加表单数据
            addForm: {
            },
            //添加表单数据规则
            rules: {
                username: [
                    { required: true, message: '请输入用户编号', trigger: 'blur' }
                ],
                nickname: [
                    { required: true, message: '请输入用户昵称', trigger: 'blur' }
                ]
            },
            // 添加、修改时 展示用于选择的用户角色列表数据
            roleData: [],
            // 可供选择的地区数据
            cityData:undefined,
            selectCity: undefined,
        };
    },
    mounted() {
        this.cityData = getCities();
        this.getTableData();
    },
    methods: {
        // 页头搜索
        resetSearch() {
            this.searchForm = {}
        },
        // 头像预览
        avatarPreview(url) {
            this.avatarUrl = url
            this.avatarDialogVisible = true
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
        deleteRow(id) {
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const data = [
                    {
                        "id": id
                    }
                ]
                const res = await deletesUserInfo(data);
                if (res.code == 200) {
                    this.getTableData();
                    this.$message.success("删除成功");
                    return;
                }
                // this.$message.error("删除失败");

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        async deleteList() {
            const data = this.selectedRows
            const res = await deletesUserInfo(data);
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
            getRoleList().then(res => {
                this.roleData = res.data
                this.updateForm.role = row.roleList.map(role => role.roleId);
            })
        },
        changeSelect() {
            this.$forceUpdate()
        },
        async editSubmit() {
            const res = await updateUserInfo(this.updateForm)
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
            const res = await updateUserInfo(row)
            if (res.code == 200) {
                this.$message.success(text);
            }
        },
        // 添加==============
        add() {
            this.addFormVisible = true
            getRoleList().then(res => {
                this.roleData = res.data
            })
        },
        handleCity() {
            if (this.addFormVisible = true) {
                this.addForm.province = this.selectCity[0]
                this.addForm.city = this.selectCity[1]
            }else if(this.updateFormVisible = true){
                this.updateForm.province = city[0]
                this.updateForm.city = city[1]
            }
        },
        async addSubmit() {
            const res = await addUserInfo(this.addForm)
            if (res.code != 200) {
                this.$message.error("添加失败");
                return;
            }
            this.$message.success("添加成功");
            this.getTableData()
            this.addFormVisible = false
        },
        // 数据导出
        async exportData() {
            let res = await exportUserData();
            console.log(res)
            //获取到blob
            let blob = new Blob([res], { type: "application/octet-stream" });
            //创建一个a标签元素
            const link = document.createElement("a");
            let _fileName = "用户数据导出.xlsx"; //文件名
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
            this.$message.success("导出成功");
        }

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