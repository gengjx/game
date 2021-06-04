<template>
    <div>
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="true" label-width="68px">
            <el-form-item label="评论用户" prop="title">
                <el-input
                        v-model="queryParams.nickname"
                        placeholder="请输入新闻标题"
                        clearable
                        style="width: 240px;"
                        size="small"
                        @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="评论内容" prop="author">
                <el-input
                        v-model="queryParams.content"
                        placeholder="请输入新闻作者"
                        clearable
                        style="width: 240px;"
                        size="small"
                        @keyup.enter.native="handleQuery"
                />
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
        </el-row>


        <el-table  :data="list" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="主图片" prop="photo">
                <template slot-scope="scope">
                    <el-avatar :src=scope.row.photo></el-avatar>
                </template>
            </el-table-column>
<!--            <el-table-column label="主键id" align="center" prop="id" />-->
<!--            <el-table-column label="文章id" align="center" prop="newsid" />-->
<!--            <el-table-column label="用户id" align="center" prop="userid" />-->
            <el-table-column label="评论用户" align="center" prop="nickname"  />
            <el-table-column label="评论内容" align="center" prop="content"   />
            <el-table-column label="创建时间" align="center" prop="createtime"   />
            <el-table-column label="操作" align="center" >
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-view"
                            @click="handleView(scope.row,scope.index)"
                    >文章详情</el-button>
<!--                    <el-button-->
<!--                            size="mini"-->
<!--                            type="text"-->
<!--                            icon="el-icon-view"-->
<!--                            @click="handleView2(scope.row,scope.index)"-->
<!--                    >游戏编辑</el-button>-->
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
    </div>
</template>

<script>
    export default {
        name: "NewsCommentindex",
        data(){
            return{
                ids:[],
                queryParams:{
                    pageNum: 1,
                    pageSize: 10,
                    nickname:undefined,
                    content:undefined
                },
                list:[],
                total:undefined,
                openForm:false,

            }
        },
        methods:{
            handleQuery(){
                this.queryParams.pageNum = 1,
                this.getList()
            },
            resetQuery(){
                this.queryParams = {
                    pageNum: 1,
                    pageSize: 10,
                    nickname: undefined,
                    content: undefined,
                }
            },
            getList(){
                this.$getRepquest('/newscomment/list',this.queryParams).then(
                    response=>{
                        if (response){
                            this.list = response.rows;
                            this.total = response.total;
                        }
                    }
                )
            },

            //删除
            handleDelete(row){
                const newsIds = row.id || this.ids;
                this.$confirm('是否确认删除文章编号为"' + newsIds + '"的数据项?', "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$deleteRequest('/newscomment/'+newsIds)
                    this.$message("删除成功");
                    this.getList();
                })
            },
            //添加
            handleInsert(){
                this.form ={
                }
                this.openForm =true;
            },
            //选中改变
            handleSelectionChange(val){
                this.ids = val.map(item => item.id)
            },
            handleView(row){
                console.log(row)

                this.$postRequest("/news/add/"+row.newsid).then()

                this.$getRepquest("/news/"+row.newsid).then(response=>{
                    if (response){
                        console.log(response)
                        window.sessionStorage.setItem("form",JSON.stringify(response.data));
                        let query={
                            newsid:row.newsid,
                            pageNum: 1,
                            pageSize: 10,
                        }
                        this.$getRepquest('/newscomment/list',query).then( response=>{
                            if (response){
                                window.sessionStorage.setItem("comment",JSON.stringify(response.rows));
                                this.$router.replace('/News/NewDetail')
                            }
                        })
                    }
                })


            },
        },
        created() {
            this.getList()
        }
    }
</script>

<style scoped>

</style>
