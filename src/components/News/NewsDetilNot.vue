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
        <div style="text-align: left">
            <el-card>
                <span> <h1>请登录后再评论</h1></span>
            </el-card>

        </div>
        <div style="margin-top: 25px ;text-align: left">
            <el-card v-for="item in comments">
                <span >
                    <el-avatar :src="item.photo" ></el-avatar>{{item.nickname}}
                    <el-tag  v-show="item.createtime !=null" > {{item.createtime}} </el-tag>
                    点赞数:<el-tag  v-show="item.likeNumber != null">{{item.likeNumber}}</el-tag>
                    评论数<el-tag  v-show="item.commentNumber != null">{{item.commentNumber}}</el-tag>
                     <el-button @click="commentDetail(item)">详情查看</el-button>
                </span>
                <div>
                    <el-card style="width: 600px;height: 130px">
                        {{item.content}}
                    </el-card>
                </div>
            </el-card>
        </div>


    </div>

</template>

<script>
    export default {
        name: "NewsDetailNot",
        data() {
            return{
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
                queryParams:{
                    pageNum:1,
                    pageSize:10,
                    newsid:undefined,
                },
                total:undefined
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
            this.comments = [];
            this.form =JSON.parse(window.sessionStorage.getItem("form"));

            console.log(this.form)
            this.queryParams.newsid = this.form.id
            this.getList()

            this.comments =JSON.parse(window.sessionStorage.getItem("comment"));
            console.log(this.comments)
        },
        methods:{
            Reset(){
                location.reload()
            },
            getList(){
                this.$getRepquest('/newscomment/list/not',this.queryParams).then( response=>{
                    if (response){
                        this.comments = response.rows;
                        this.total = response.total;
                    }
                })
            },
            commentDetail(item){
                this.$confirm("请先登录使用更多功能","提示")
            }
        }
    }
</script>

<style scoped>

</style>
