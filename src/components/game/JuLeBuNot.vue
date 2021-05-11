<template>
    <div style="width: 100%;height: 100%">
        <el-card  style="width: 60%;margin-left: 30%"  v-loading="loading">
            <div style="text-align: left;color: #B3C0D1">全部游戏 > 俱乐部 > <el-link @click="reset">
                {{console.gameName}}</el-link>
            </div>
            <div  >
                <el-avatar :src="console.gameImage"  style="width: 150px;height: 150px;float: left"></el-avatar>
                <div style="float: right">
                    {{console.remark}}
                </div>
            </div>
        </el-card>
        <el-card style="width: 60%;margin-left: 30%;margin-top: 2%">
                <el-button @click="tip">发布文章</el-button>  <el-button @click="tip">提问/求助</el-button>
        </el-card>
        <h1  style="margin-left: 30%">文章展示</h1>

        <div style="width: 60%;margin-left: 30%" >
            <el-button @click="getNews">新闻</el-button> <el-button @click="getNews1">测评</el-button > <el-button @click="getNews2">攻略</el-button> <el-button @click="getNews3">分享</el-button> <el-button @click="getNews4">提问</el-button>
            <el-card v-for="item in list" style="margin-top: 30px;width: 650px;height:150px"  v-loading="loading">
                <div style="width: 200px;height: 150px;float: left">
                    新闻资讯
                    <div>
                        <el-link @click="NewsDetail(item)">{{item.title}}</el-link>
                        <br><svg-icon icon-class="eye"></svg-icon> {{item.viewNumber}}
                    </div>


                    <div style="">
                        {{item.author}}
                    </div>

                    <br>
                </div>

                <div style="float: right">
                    <el-image :src="item.photo"  style="width: 100px;height:70px" @click="NewsDetail(item)"></el-image><br>
                    <svg-icon icon-class="message"></svg-icon>   {{item.commentNumber}} <svg-icon icon-class="date"></svg-icon>{{item.createTime}}
                </div>

            </el-card>

            <el-pagination
                    v-show="total>0"
                    :total="total"
                    :current-page.sync="queryParams.pageNum"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size.sync="queryParams.pageSize"
                    layout="sizes, prev, pager, next"
                    @size-change="getList"
                    @current-change="getList"
                    style="margin-top: 20px"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "JuLeBuNot",
        data(){
            return{
                form:{
                    photo:undefined,
                    datetime:undefined,
                    viewNumber:0,
                    commentNumber:0,
                },
                openForm:false,
                title:'发布文章',
                header: {"Authorization":window.sessionStorage.getItem('token') },
                open:false,
                imageList:[],
                openUpload:false,
                dialogImageUrl: '',
                dialogVisible: false,
                productImgs: [],
                isMultiple: true,
                imgLimit: 6,
                imgLimitEdit: 1,
                uploadImg:{
                    gameId:undefined,
                    gameImage:undefined,
                },
                editorOption: {
                    placeholder: "",
                    theme: "snow", // or 'bubble'
                    modules: {
                        toolbar: {
                            container: this.$toolbarOptions,
                            handlers: {
                                image: function(value) {
                                    if (value) {
                                        // 触发input框选择图片文件
                                        document.querySelector(".avatar-uploader input").click();
                                    } else {
                                        this.quill.format("image", false);
                                    }
                                }
                            }
                        }
                    }
                },
                typeOptions:{},
                user:{},
                console:{},
                queryParams:{
                    pageNum: 1,
                    pageSize: 10,
                    title: undefined,
                    author: undefined,
                    categoryId:undefined
                },
                list:[],
                total:0,
                loading:false,
            }
        },
        mounted() {

            this.console = JSON.parse(window.sessionStorage.getItem("form"))
            this.queryParams.gameName =  this.console.gameName
            this.getList()

        },
        methods:{
            getList(){
                this.loading = true
                this.$getRepquest('/news/list/news',this.queryParams).then(
                    response=>{
                        if (response){
                            this.list = response.rows;
                            this.total = response.total;
                            this.loading = false
                        }
                    }
                )
            },
            getNews(){
                this.queryParams.categoryId = 0;
                this.$getRepquest('/news/list/news',this.queryParams).then(
                    response=>{
                        if (response){
                            this.list = response.rows;
                            this.total = response.total;
                        }
                    }
                )
            },
            getNews1(){
                this.queryParams.categoryId = 1;
                this.loading =true
                setTimeout(()=>{
                        this.$getRepquest('/news/list/news',this.queryParams).then(
                            response=>{
                                if (response){
                                    this.list = response.rows;
                                    this.total = response.total;
                                    this.loading =false
                                }
                            }
                        )
                    }
                    ,500)
            },
            getNews2(){
                this.queryParams.categoryId = 2;
                this.loading =true
                setTimeout(()=>{
                        this.$getRepquest('/news/list/news',this.queryParams).then(
                            response=>{
                                if (response){
                                    this.list = response.rows;
                                    this.total = response.total;
                                    this.loading =false
                                }
                            }
                        )
                    }
                    ,500)
            },
            getNews3(){
                this.queryParams.categoryId = 3;
                this.loading =true
                setTimeout(()=>{
                        this.$getRepquest('/news/list/news',this.queryParams).then(
                            response=>{
                                if (response){
                                    this.list = response.rows;
                                    this.total = response.total;
                                    this.loading =false
                                }
                            }
                        )
                    }
                    ,500)
            },
            getNews4(){
                this.queryParams.categoryId = 4;
                this.loading =true
                setTimeout(()=>{
                        this.$getRepquest('/news/list/news',this.queryParams).then(
                            response=>{
                                if (response){
                                    this.list = response.rows;
                                    this.total = response.total;
                                    this.loading =false
                                }
                            }
                        )
                    }
                    ,500)


            },
            NewsDetail(row){

                this.$postRequest("/news/add/not/"+row.id).then()
                window.sessionStorage.setItem("form",JSON.stringify(row));
                let query={
                    newsid:row.id,
                    pageNum: 1,
                    pageSize: 5,
                }
                this.$getRepquest('/newscomment/list/not',query).then( response=>{
                    if (response){
                        window.sessionStorage.setItem("comment",JSON.stringify(response.rows));
                        this.$router.replace('/News/NewDetail/not')
                    }
                })
            },
            reset(){
                this.loading =true
                setTimeout(()=>{
                        this.console = JSON.parse(window.sessionStorage.getItem("form"))
                        this.loading =false
                    }
                ,1000)

            },
            tip(){
                this.$confirm("请登录后使用此功能","提示")
            }


        }

    }
</script>

<style scoped>
    .edit_container {
        width: 1200px;
        /*margin: 0px auto;*/
    }
    .edit_container >>> .ql-toolbar.ql-snow + .ql-container.ql-snow {
        width: 1200px;
        height: 600px;
        background-color: #fff;
    }
    .button {
        margin: 10px 0px 0px;
    }
</style>
