<template>
    <div>
        <el-row :gutter="20">
            <!--部门数据-->
            <el-col :span="4" :xs="24">
                <div class="head-container">
                    <el-input
                            v-model="deptName"
                            placeholder="请输入部门名称"
                            clearable
                            size="small"
                            prefix-icon="el-icon-search"
                            style="margin-bottom: 20px"
                    />
                </div>
                <div class="head-container">
                    <el-tree
                            :data="deptOptions"
                            :props="defaultProps"
                            :expand-on-click-node="false"
                            :filter-node-method="filterNode"
                            ref="tree"
                            default-expand-all
                            @node-click="handleNodeClick"
                    />
                </div>
            </el-col>
            <!--用户数据-->
            <el-col :span="20" :xs="24">
                <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
                    <el-form-item label="用户名称" prop="userName">
                        <el-input
                                v-model="queryParams.userName"
                                placeholder="请输入用户名称"
                                clearable
                                size="small"
                                style="width: 240px"
                                @keyup.enter.native="handleQuery"
                        />
                    </el-form-item>
                    <el-form-item label="手机号码" prop="phonenumber">
                        <el-input
                                v-model="queryParams.phonenumber"
                                placeholder="请输入手机号码"
                                clearable
                                size="small"
                                style="width: 240px"
                                @keyup.enter.native="handleQuery"
                        />
                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                        <el-select
                                v-model="queryParams.status"
                                placeholder="用户状态"
                                clearable
                                size="small"
                                style="width: 240px"
                        >
                            <el-option
                                    v-for="dict in statusOptions"
                                    :key="dict.dictValue"
                                    :label="dict.dictLabel"
                                    :value="dict.dictValue"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                    </el-form-item>
                </el-form>

                <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">
                        <el-button
                                type="primary"
                                plain
                                icon="el-icon-plus"
                                size="mini"
                                @click="handleAdd"
                        >新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                                type="success"
                                plain
                                icon="el-icon-edit"
                                size="mini"
                                :disabled="single"
                                @click="handleUpdate"
                        >修改</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button
                                type="danger"
                                plain
                                icon="el-icon-delete"
                                size="mini"
                                :disabled="multiple"
                                @click="handleDelete"
                        >删除</el-button>
                    </el-col>
                </el-row>

                <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column label="用户编号" align="center" key="userId" prop="userId" v-if="columns[0].visible" />
                    <el-table-column label="用户名称" align="center" key="userName" prop="userName" v-if="columns[1].visible" :show-overflow-tooltip="true" />
                    <el-table-column label="用户昵称" align="center" key="nickName" prop="nickName" v-if="columns[2].visible" :show-overflow-tooltip="true" />
                    <el-table-column label="部门" align="center" key="deptName" prop="dept.deptName" v-if="columns[3].visible" :show-overflow-tooltip="true" />
                    <el-table-column label="手机号码" align="center" key="phonenumber" prop="phonenumber" v-if="columns[4].visible" width="120" />
                    <el-table-column label="状态" align="center" key="status" v-if="columns[5].visible">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.status"
                                    active-value="0"
                                    inactive-value="1"
                                    @change="handleStatusChange(scope.row)"
                            ></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间" align="center" prop="createTime" v-if="columns[6].visible" width="160">
                        <template slot-scope="scope">
                            <span>{{ scope.row.createTime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            align="center"
                            width="160"
                            class-name="small-padding fixed-width"
                    >
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="text"
                                    icon="el-icon-edit"
                                    @click="handleUpdate(scope.row)"
                            >修改</el-button>
                            <el-button
                                    v-if="scope.row.userId !== 1"
                                    size="mini"
                                    type="text"
                                    icon="el-icon-delete"
                                    @click="handleDelete(scope.row)"
                            >删除</el-button>
                            <el-button
                                    size="mini"
                                    type="text"
                                    icon="el-icon-key"
                                    @click="handleResetPwd(scope.row)"
                            >重置</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination
                        v-show="total>0"
                        :total="total"
                        :current-page.sync="queryParams.pageNum"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size.sync="queryParams.pageSize"
                        layout="sizes, prev, pager, next"
                        @size-change="getList"
                        @current-change="getList"

                />
            </el-col>
        </el-row>

        <!-- 添加或修改参数配置对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户昵称" prop="nickName">
                            <el-input v-model="form.nickName" placeholder="请输入用户昵称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="归属部门" prop="deptId">
                            <el-tree :data="deptOptions" :props="defaultProps" @node-click="handleNodeClick2"></el-tree>
                            <el-input v-model="form.dept.deptName" placeholder="请选择归属部门" v-show="form.dept.deptName != undefined"/>
                            <el-input v-model="form.deptId"  placeholder="请选择归属部门" v-show="false" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机号码" prop="phonenumber">
                            <el-input v-model="form.phonenumber" placeholder="请输入手机号码" maxlength="11" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item v-if="form.userId == undefined" label="用户名称" prop="userName">
                            <el-input v-model="form.userName" placeholder="请输入用户名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item v-if="form.userId == undefined" label="用户密码" prop="password">
                            <el-input v-model="form.password" placeholder="请输入用户密码" type="password" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户性别">
                            <el-select v-model="form.sex" placeholder="请选择"  >
                                <el-option
                                        v-for="dict in sexOptions"
                                        :key="dict.dictValue"
                                        :label="dict.dictLabel"
                                        :value="dict.dictValue"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="状态">
                            <el-radio-group v-model="form.status">
                                <el-radio
                                        v-for="dict in statusOptions"
                                        :key="dict.dictValue"
                                        :label="dict.dictValue"
                                >{{dict.dictLabel}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="岗位">
                            <el-select v-model="form.postIds" multiple placeholder="请选择">
                                <el-option
                                        v-for="item in postOptions"
                                        :key="item.postId"
                                        :label="item.postName"
                                        :value="item.postId"
                                        :disabled="item.status == 1"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="角色">
                            <el-select v-model="form.roleIds" multiple placeholder="请选择">
                                <el-option
                                        v-for="item in roleOptions"
                                        :key="item.roleId"
                                        :label="item.roleName"
                                        :value="item.roleId"
                                        :disabled="item.status == 1"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {addDateRange, getRequest, postRequest} from "../../utils/api";
    export default {
        name: "User",
        data() {
            return {
                ResetPwd:{
                  userId:undefined,
                  value:undefined,
                },
                // 遮罩层
                loading: true,
                // 选中数组
                ids: [],
                // 非单个禁用
                single: true,
                // 非多个禁用
                multiple: true,
                // 显示搜索条件
                showSearch: true,
                // 总条数
                total: 0,
                // 用户表格数据
                userList: null,
                // 弹出层标题
                title: "",
                // 部门树选项
                deptOptions: undefined,
                // 是否显示弹出层
                open: false,
                // 部门名称
                deptName: undefined,
                // 默认密码
                initPassword: undefined,
                // 日期范围
                dateRange: [],
                // 状态数据字典
                statusOptions: [
                    {"dictLabel":"启用","dictValue":0},
                    {"dictLabel":"停用","dictValue":1},
                ],
                // 性别状态字典
                sexOptions: [
                    {"dictLabel":"男","dictValue":0},
                    {"dictLabel":"女","dictValue":1},
                ],
                // 岗位选项
                postOptions: [],
                // 角色选项
                roleOptions: [],
                // 表单参数
                form: {
                    userId: undefined,
                    deptId: undefined,
                    userName: undefined,
                    nickName: undefined,
                    password: undefined,
                    phonenumber: undefined,
                    email: undefined,
                    sex: undefined,
                    status: "0",
                    remark: undefined,
                    postIds: [],
                    roleIds: [],
                    dept:{
                        deptName:undefined
                    },
                },
                defaultProps: {
                    children: "children",
                    label: "label"
                },
                // 用户导入参数
                upload: {
                    // 是否显示弹出层（用户导入）
                    open: false,
                    // 弹出层标题（用户导入）
                    title: "",
                    // 是否禁用上传
                    isUploading: false,
                    // 是否更新已经存在的用户数据
                    updateSupport: 0,
                    // 设置上传的请求头部
                    // headers: { Authorization: "Bearer " + getToken() },
                    // 上传的地址
                    url: process.env.VUE_APP_BASE_API + "/system/user/importData"
                },
                // 查询参数
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    userName: undefined,
                    phonenumber: undefined,
                    status: undefined,
                    deptId: undefined
                },
                // 列信息
                columns: [
                    { key: 0, label: `用户编号`, visible: true },
                    { key: 1, label: `用户名称`, visible: true },
                    { key: 2, label: `用户昵称`, visible: true },
                    { key: 3, label: `部门`, visible: true },
                    { key: 4, label: `手机号码`, visible: true },
                    { key: 5, label: `状态`, visible: true },
                    { key: 6, label: `创建时间`, visible: true }
                ],
                // 表单校验
                rules: {
                    userName: [
                        { required: true, message: "用户名称不能为空", trigger: "blur" }
                    ],
                    nickName: [
                        { required: true, message: "用户昵称不能为空", trigger: "blur" }
                    ],
                    password: [
                        { required: true, message: "用户密码不能为空", trigger: "blur" }
                    ],
                    email: [
                        {
                            type: "email",
                            message: "'请输入正确的邮箱地址",
                            trigger: ["blur", "change"]
                        }
                    ],
                    phonenumber: [
                        {
                            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
                            message: "请输入正确的手机号码",
                            trigger: "blur"
                        }
                    ]
                }
            };
        },
        methods:{
            handleQuery() {
                this.queryParams.page = 1;
                this.getList();
            },
            getList() {
                this.loading = true;
                this.$getRepquest('/system/user/list',addDateRange(this.queryParams, this.dateRange)).then(response => {
                    if (response){
                        this.userList = response.rows;
                        this.total = response.total;
                        this.loading = false;
                    }

                    }
                );
            },
            /** 查询部门下拉树结构 */
            getTreeselect() {
                this.$getRepquest('/system/dept/treeselect').then(response => {
                    this.deptOptions = response.data;
                });
            },
            // 筛选节点
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            // 节点单击事件
            handleNodeClick(data) {
                this.queryParams.deptId = data.id;
                this.getList();
            },
            handleNodeClick2(data){
                console.log(data)
                console.log(data.id)
                this.form.deptId = data.id;
                this.form.dept.deptName = data.label;
            },
            // 用户状态修改
            handleStatusChange(row) {
                let text = row.status === "0" ? "启用" : "停用";
                this.$confirm('确认要"' + text + '""' + row.userName + '"用户吗?', "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() =>{
                    let  newStaus={"userId":row.userId,
                    status:row.status
                    }
                    console.log(newStaus)
                    this.$putRequest("/system/user/changeStatus",newStaus)
                }).then(() => {
                    this.$message(text + "成功");
                }).catch(()=> {
                    row.status = row.status === "0" ? "1" : "0";
                });
            },
            // 取消按钮
            cancel() {
                this.open = false;
                this.reset();
            },
            // 表单重置
            reset() {
                this.form = {
                    userId: undefined,
                    deptId: undefined,
                    userName: undefined,
                    nickName: undefined,
                    password: undefined,
                    phonenumber: undefined,
                    email: undefined,
                    sex: undefined,
                    status: "0",
                    remark: undefined,
                    postIds: [],
                    roleIds: [],
                    dept: {
                        deptName: undefined
                    }
                };
                // this.resetForm("form");
            },
            /** 搜索按钮操作 */
            handleQuery() {
                this.queryParams.page = 1;
                this.getList();
            },
            /** 重置按钮操作 */
            resetQuery() {
                this.dateRange = [];
                this.queryParams={}
                this.handleQuery();
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.userId);
                this.single = selection.length != 1;
                this.multiple = !selection.length;
            },
            /** 新增按钮操作 */
            handleAdd() {
                this.reset();
                this.getTreeselect();
                this.$getRepquest('/system/user/').then(response => {
                    if (response){
                        this.postOptions = response.posts;
                        this.roleOptions = response.roles;
                        this.open = true;
                        this.title = "添加用户";
                        this.form.password = this.initPassword;
                    }

                });
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset();
                this.getTreeselect();
                const userId = row.userId || this.ids;
                this.$getRepquest('/system/user/'+userId).then(response => {
                    this.form = response.data;
                    this.postOptions = response.posts;
                    this.roleOptions = response.roles;
                    this.form.postIds = response.postIds;
                    this.form.roleIds = response.roleIds;
                    this.open = true;
                    this.title = "修改用户";
                    this.form.password = "";
                });
            },
            /** 重置密码按钮操作 */
            handleResetPwd(row) {
                this.$prompt('请输入"' + row.userName + '"的新密码', "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消"
                }).then(({ value }) => {
                    this.ResetPwd.userName = row.userName;
                    this.ResetPwd.userId = row.userId;
                    this.ResetPwd.password =value;
                    this.$putRequest('/system/user/resetPwd',this.ResetPwd).then(response => {
                        if (response != null && response){
                            this.$message("修改成功，新密码是：" + value);
                        }

                    });
                }).catch(() => {});
            },
            /** 提交按钮 */
            submitForm: function() {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        if (this.form.userId != undefined) {
                            this.$putRequest('/system/user',this.form).then(response => {
                                if(response !=null && response){
                                    this.$message("修改成功");
                                    this.open = false;
                                    this.getList();
                                }

                            });
                        } else {
                            this.$postRequest('/system/user/',this.form).then(response => {
                                if(response !=null && response){
                                    this.$message("新增成功");
                                    this.open = false;
                                    this.getList();
                                }

                            });
                        }
                    }
                });
            },
            /** 删除按钮操作 */
            handleDelete(row) {
                const userIds = row.userId || this.ids;
                this.$confirm('是否确认删除用户编号为"' + userIds + '"的数据项?', "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.del(userIds)

                    this.$message("删除成功");
                    this.getList();
                })
            },
            /** 导出按钮操作 */
            handleExport() {
                const queryParams = this.queryParams;
                this.$confirm('是否确认导出所有用户数据项?', "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(function() {
                    return exportUser(queryParams);
                }).then(response => {
                    this.download(response.msg);
                })
            },
            /** 导入按钮操作 */
            handleImport() {
                this.upload.title = "用户导入";
                this.upload.open = true;
            },
            /** 下载模板操作 */
            importTemplate() {
                importTemplate().then(response => {
                    this.download(response.msg);
                });
            },
            // 文件上传中处理
            handleFileUploadProgress(event, file, fileList) {
                this.upload.isUploading = true;
            },
            // 文件上传成功处理
            handleFileSuccess(response, file, fileList) {
                this.upload.open = false;
                this.upload.isUploading = false;
                this.$refs.upload.clearFiles();
                this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
                this.getList();
            },
            // 提交上传文件
            submitFileForm() {
                this.$refs.upload.submit();
            },
            del(userIds){
                this.$deleteRequest('/system/user/'+userIds);
                return true
            }
        },

        mounted() {
            this.getList()
            this.getTreeselect()
        },
        watch: {
            deptName(val) {
                this.$refs.tree.filter(val);

            }
        },


    }
</script>

<style scoped>

</style>
