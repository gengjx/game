<template>

    <div>
        <div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="登录地址">
                    <el-input v-model="queryParams.ipaddr" placeholder="登陆地址"></el-input>
                </el-form-item>
                <el-form-item label="登陆人">
                        <el-input v-model="queryParams.userName" placeholder="登录人"></el-input>
                </el-form-item>
                <el-form-item label="登录状态">
                    <el-select v-model="queryParams.status" placeholder="活动区域">
                        <el-option label="成功" value="0" title="成功"></el-option>
                        <el-option label="失败" value="1" title="失败"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="登录日期">
                    <el-col :span="11">
                        <el-form-item prop="date2">
                            <el-date-picker
                                    v-model="dateRange"
                                    size="small"
                                    style="width: 240px"
                                    value-format="yyyy-MM-dd"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button type="primary" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                        type="danger"
                        plain
                        icon="el-icon-delete"
                        size="mini"
                        @click="handleDelete"
                >删除</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        type="danger"
                        plain
                        icon="el-icon-delete"
                        size="mini"
                        @click="handleClean"
                >清空</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        type="warning"
                        plain
                        icon="el-icon-download"
                        size="mini"
                        @click="handleExport"
                >导出</el-button>
            </el-col>
        </el-row>
        <div>
            <el-table
                    ref="multipleTable"
                    :data="list"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column label="访问编号" align="center" prop="infoId" />
                <el-table-column label="用户名称" align="center" prop="userName" />
                <el-table-column label="登录地址" align="center" prop="ipaddr" width="130" :show-overflow-tooltip="true" />
                <el-table-column label="登录地点" align="center" prop="loginLocation" :show-overflow-tooltip="true" />
                <el-table-column label="浏览器" align="center" prop="browser" />
                <el-table-column label="操作系统" align="center" prop="os" />
                <el-table-column label="登录状态" align="center" prop="status" :formatter="formatLoginStaus"  />
                <el-table-column label="操作信息" align="center" prop="msg" />
                <el-table-column label="登录日期" align="center" prop="loginTime" width="180">
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

            >
            </el-pagination>

        </div>


    </div>


</template>

<script>
    import {addDateRange, getRequest, postRequest} from "../../utils/api";
    import axios from "axios";
    export default {
        name: "loginLog",
        data(){
            return{
                formInline:{
                    user:""
                },
                list: [],
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    ipaddr: undefined,
                    userName: undefined,
                    status: undefined
                },
                dateRange: [],
                total:0,
                multipleSelection:[],
                infoIds:[],
                open:false,
                form:{},
            }

        },
        methods:{
            onSubmit(){
                this.getList();
            },
            reset(){

            },
            handleSelectionChange(val) {
                this.infoIds = val.map(item => item.infoId)
            },
            getList(){

                getRequest('/monitor/logininfor/list', addDateRange(this.queryParams,this.dateRange)).then(response=>{
                    if (response){
                        this.list = response.rows;
                        this.total =response.total;
                        console.log(this.total)
                    }
                })
            },
            handleExport(){

            },
            handleDelete(){
                this.$confirm('是否确认删除访问编号为"' + this.infoIds + '"的数据项?', "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.delLogininfor(this.infoIds)
                    this.getList();

                })
            },
            handleClean(){

                this.$confirm('是否要清空所有数据项', "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.cleanfor()
                    this.getList();

                })

            },
            delLogininfor(infoIds){
                this.$deleteRequest('/monitor/logininfor/'+infoIds).then(response=>{
                    if (response){
                        this.$message("删除成功")
                    }
                })
            },
            cleanfor(){
                this.$deleteRequest('/monitor/logininfor/clean').then(response=>{
                    if (response){
                        this.$message("删除成功")
                    }
                })
            },
            formatLoginStaus(row, column, cellValue){
                let  newStatus = row.status;
                console.log(newStatus)
                if (newStatus==='0'){
                    newStatus='成功'
                }
                if (newStatus==='1'){
                    newStatus='失败'
                }
                console.log(newStatus)
                return newStatus;
            },
        },
        mounted() {
            this.getList();
        }
    }
</script>

<style scoped>

</style>
