<template>
    <div>
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="true" label-width="68px">
            <el-form-item label="系统模块" prop="title">
                <el-input
                        v-model="queryParams.title"
                        placeholder="请输入系统模块"
                        clearable
                        style="width: 240px;"
                        size="small"
                        @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="操作人员" prop="operName">
                <el-input
                        v-model="queryParams.operName"
                        placeholder="请输入操作人员"
                        clearable
                        style="width: 240px;"
                        size="small"
                        @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="类型" prop="businessType">
                <el-select
                        v-model="queryParams.businessType"
                        placeholder="操作类型"
                        clearable
                        size="small"
                        style="width: 240px"
                >
                    <el-option
                            v-for="dict in typeOptions"
                            :key="dict.dictValue"
                            :label="dict.dictLabel"
                            :value="dict.dictValue"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-select
                        v-model="queryParams.status"
                        placeholder="操作状态"
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
            <el-form-item label="操作时间">
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
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
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
        <el-table  :data="list" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="日志编号" align="center" prop="operId" />
            <el-table-column label="系统模块" align="center" prop="title" />
            <el-table-column label="操作类型" align="center" prop="businessType"  :formatter="formatDate" />
            <el-table-column label="请求方式" align="center" prop="requestMethod" />
            <el-table-column label="操作人员" align="center" prop="operName" />
            <el-table-column label="主机" align="center" prop="operIp" width="130" :show-overflow-tooltip="true" />
            <el-table-column label="操作地点" align="center" prop="operLocation" :show-overflow-tooltip="true" />
            <el-table-column label="操作状态" align="center" prop="status" :formatter="formatLoginStaus" />
            <el-table-column label="操作日期" align="center" prop="operTime" width="180">
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-view"
                            @click="handleView(scope.row,scope.index)"
                    >详细</el-button>
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

        >
        </el-pagination>
        <!-- 操作日志详细 -->
        <el-dialog title="操作日志详细" :visible.sync="open" width="700px" append-to-body>
            <el-form ref="form" :model="form" label-width="100px" size="mini">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="操作模块：">{{ form.title }} / {{ formatDate(form) }}</el-form-item>
                        <el-form-item
                                label="登录信息："
                        >{{ form.operName }} / {{ form.operIp }} / {{ form.operLocation }}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="请求地址：">{{ form.operUrl }}</el-form-item>
                        <el-form-item label="请求方式：">{{ form.requestMethod }}</el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="操作方法：">{{ form.method }}</el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="请求参数：">{{ form.operParam }}</el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="返回参数：">{{ form.jsonResult }}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="操作状态：">
                            <div v-if="form.status === 0">正常</div>
                            <div v-else-if="form.status === 1">失败</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="操作时间：">{{ form.operTime}}</el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="异常信息：" v-if="form.status === 1">{{ form.errorMsg }}</el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="open = false">关 闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getRequest} from "../../utils/api";

    export default {
        name: "operLog",
        data(){
            return{
                queryParams:{
                    pageNum: 1,
                    pageSize: 10,
                    title: undefined,
                    operName: undefined,
                    businessType: undefined,
                    status: undefined,

                },
                dateRange:[],
                statusOptions:[],
                list:[],
                total:0,
                typeOptions:[
                    {"dictLabel":"新增","dictValue":1},
                    {"dictLabel":"修改","dictValue":2},
                    {"dictLabel":"删除","dictValue":3},
                    {"dictLabel":"授权","dictValue":4},
                    {"dictLabel":"导出","dictValue":5},
                    {"dictLabel":"导入","dictValue":6},
                    {"dictLabel":"强退","dictValue":7},
                    {"dictLabel":"生成代码","dictValue":8},
                    {"dictLabel":"清空数据","dictValue":9},
                ],

                statusOptions:[
                    {"dictLabel":"成功","dictValue":0},
                    {"dictLabel":"失败","dictValue":1},
                ],
                multipleSelection:[],
                operIds:[],
                form:{},
                open:false,
            }
        },
        methods:{
            handleQuery(){
                this.getList()
            },
            resetQuery(){

            },
            getList(){
                getRequest('/monitor/operlog/list',this.queryParams).then(
                    response=>{
                        if (response){
                            this.list = response.rows;
                            this.total = response.total;
                        }
                    }
                )
            },
            handleSelectionChange(val) {
                this.operIds = val.map(item => item.operId)
            },
            formatDate(row, column, cellValue){
                var newDate =row.businessType
                if (row.businessType ===1){
                    var newDate ='新增'
                }
                if (row.businessType ===2){
                    var newDate ='修改'
                }
                if (row.businessType ===3){
                    var newDate ='删除'
                }
                if (row.businessType ===4){
                    var newDate ='授权'
                }
                if (row.businessType ===5){
                    var newDate ='导出'
                }
                if (row.businessType ===6){
                    var newDate ='导入'
                }
                if (row.businessType ===7){
                    var newDate ='生成代码'
                }
                if (row.businessType ===8){
                    var newDate ='强退'
                }
                if (row.businessType ===9){
                    var newDate ='清空数据'
                }

                return newDate
            },
            formatLoginStaus(row, column, cellValue){
                let  newStatus = row.status;
                console.log(newStatus)
                if (newStatus===0){
                    newStatus='成功'
                }
                if (newStatus===1){
                    newStatus='失败'
                }
                return newStatus;
            },
            handleExport(){

            },
            handleDelete(){
                this.$confirm('是否确认删除访问编号为"' + this.operIds + '"的数据项?', "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.delLogininfor(this.operIds)
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
            delLogininfor(operIds){
                this.$deleteRequest('/monitor/operlog/'+operIds).then(response=>{
                    if (response){
                        this.$message("删除成功")
                    }
                })
            },
            cleanfor(){
                this.$deleteRequest('/monitor/operlog/clean').then(response=>{
                    if (response){
                        this.$message("删除成功")
                    }
                })
            },
            handleView(row){
                this.form =row;
                this.open =true
            }

        }
        ,
        mounted() {
            this.getList()
        }
    }
</script>

<style scoped>

</style>
