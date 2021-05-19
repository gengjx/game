<template xmlns:text-align="http://www.w3.org/1999/xhtml">
    <div style="width: 50%;text-align: center;margin-left: 35%;margin-top: 3%" >
        <div style="text-align: left">
            <h1 style="font-size: 60px">文章速看:</h1>
        </div>
        <el-card >
            <el-image src="https://img01.vgtime.com/game/cover/2021/03/30/210330102853187_u1477.jpg"></el-image>
            <div style="text-align: left;color: #B3C0D1">首页 > 资讯列表 > <el-link @click="Reset">
                {{form.title}}</el-link></div>
            <div><h1>{{form.title}}</h1></div>
            <div style="text-align: right">作者:{{form.author}} <svg-icon icon-class="date"></svg-icon>{{form.createTime}} <svg-icon icon-class="eye"></svg-icon> {{form.viewNumber+1}}
            评论数:{{form.commentNumber}}
            </div>
            <p v-html="form.content"> {{form.content}}</p>
            <el-image src="https://img01.vgtime.com/game/cover/2021/03/30/210330102853187_u1477.jpg"></el-image>
        </el-card>
        <div style="text-align: left">
            <h1 style="font-size: 60px">评论专区:</h1>
        </div>
        <div style="text-align: left" v-show="item.id == undefined">
            <el-card>
               <span> 我也想说一句:<el-input style="width: 750px"  v-model="form2.content"> </el-input><el-button @click="add" >发表评论</el-button></span>
            </el-card>

        </div>


        <div style="text-align: left" v-show="item.id != undefined">

            <el-card title="我的评论足迹" v-show="item.id != undefined" >

                <span v-show="item.id != undefined" >
                    <el-avatar :src="this.item.photo" ></el-avatar>{{item.nickname}}
                    <el-tag  v-show="item.createtime !=null" > {{item.createtime}} </el-tag>
                    点赞数:<el-tag  v-show="item.likeNumber != null">{{item.likeNumber}}</el-tag>
                    评论数<el-tag  v-show="item.commentNumber != null">{{item.commentNumber}}</el-tag>
                    <el-link @click="open =true">修改评论</el-link>             <el-link @click="deletec" >删除评论</el-link>
                    <el-button @click="commentDetail(item)">详情查看</el-button>
                </span>
                <div v-show="item.id != undefined">
                    <el-card style="width: 600px;height: 130px">
                        {{item.content}}
                    </el-card>
                </div>
            </el-card>

        </div>

        <div style="margin-top: 25px ;text-align: left">
            <el-card v-for="item in comments">
                <span >
                    <el-avatar :src="item.photo" ></el-avatar>{{item.nickname}}
                    <el-tag  v-show="item.createtime !=null" > {{item.createtime}} </el-tag>
                    点赞数:<el-tag  v-show="item.likeNumber != null">{{item.likeNumber}}</el-tag>
                    评论数<el-tag  v-show="item.commentNumber != null">{{item.commentNumber}}</el-tag>
                     <el-button @click="deleteComment(item)" v-show="form.userId == user.user.userId">删除评论</el-button>
                    <el-button @click="commentDetail(item)">详情查看</el-button>
                </span>
                <div>
                    <el-card style="width: 600px;height: 130px">
                        {{item.content}}
                    </el-card>
                </div>
            </el-card>
        </div>
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
        <el-dialog :visible.sync="open" style="text-align: left" title="修改评论内容" >
            <el-card>
                <textarea style="width: 1200px;height: 75px" v-model="item.content">

                </textarea>
                <el-button @click="handlerEdit">修改</el-button>
            </el-card>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        name: "NewsDetail",
        data() {
            return{
                open:false,
                total:undefined,
                form:{
                    categoryId:undefined,
                    title:undefined,
                    abstrs:undefined,
                    tags:undefined,
                    photo:undefined,
                    author:undefined,
                    content:undefined,
                    viewNumber:0,
                    commentNumber:0,
                    createTime:undefined,
                },
                comments:[],
                form2 :{
                    newsid:undefined,
                    nickname:undefined,
                    content:undefined,
                    createtime:undefined,
                    photo:undefined,
                    userid:undefined,
                },
                user: {},
                queryParams:{
                    pageNum:1,
                    pageSize:10,
                    newsid:undefined,
                    parentId:0,
                },
                item:{
                    id:undefined,
                    newsid:undefined,
                    nickname:undefined,
                    content:undefined,
                    createtime:undefined,
                    photo:undefined,
                    userid:undefined,
                }
            }

        }
        ,
        mounted() {
            this.form ={
                categoryId:undefined,
                title:undefined,
                abstrs:undefined,
                tags:undefined,
                photo:undefined,
                author:undefined,
                content:undefined,
                viewNumber:0,
                commentNumber:0,
                createTime:undefined,
            };
            this.form =JSON.parse(window.sessionStorage.getItem("form"));
            this.queryParams.newsid = this.form.id
            this.getList()
            this.user =JSON.parse(window.sessionStorage.getItem("user"));
            console.log(this.user)
            this.form2.newsid = this.form.id
            this.form2.userid = this.user.user.userId
            this.form2.nickname = this.user.user.nickName
            this.form2.photo = this.user.user.avatar
            let query ={
                pageNum:1,
                pageSize:1,
                newsid:this.form.id,
                userid : this.user.user.userId
            }
            this.$getRepquest('/newscomment/list/',query).then(
                response =>{
                    if (response){
                        if (response.rows.length > 0){
                            this.item = response.rows[0];
                            console.log(this.item)
                        }
                    }
                }
            )
        },
        methods:{
            edit(){
                this.open = true
            },
            deleteComment(item){
                this.$deleteRequest('/newscomment/'+this.item.id).then(
                    response=>{
                        if (response){
                            this.getList()
                        }
                    }
                )

            },
            handlerEdit(){
                this.open = false
                this.$confirm('确定修改该条消息吗 ?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(
                    ()=>{

                        this.$putRequest('/newscomment',this.item)
                    }
                ).then(()=>{
                    this.open =false
                })
            },
            deletec(){
                this.$deleteRequest('/newscomment/'+this.item.id).then()
                this.getList()
                this.item.id = undefined

            },
            Reset(){
                location.reload()
            },
            add(){
                this.form2.createtime = new Date().format("yyyy-MM-dd hh:mm:ss")
                this.$postRequest('/newscomment',this.form2).then(response=>{
                    if (response){
                        this.getList()
                        this.form2.content = undefined
                        let query ={
                            pageNum:1,
                            pageSize:1,
                            newsid:this.form.id,
                            userid : this.user.user.userId
                        }
                        this.$getRepquest('/newscomment/list/',query).then(
                            response =>{
                                if (response){
                                    if (response.rows.length > 0){
                                        this.item = response.rows[0];
                                        console.log(this.item)
                                    }
                                }
                            }
                        )
                    }
                })
            },
            getList(){
                this.$getRepquest('/newscomment/list/',this.queryParams).then( response=>{
                    if (response){
                       this.comments = response.rows;
                       this.total = response.total;
                    }
                })
            },
            commentDetail(item){
                window.sessionStorage.setItem("newsCommentDeatail",JSON.stringify(item))
                this.$router.push('/NewsCommentSearch')
            }
        }
    }
</script>

<style scoped>

</style>
