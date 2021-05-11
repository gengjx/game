<template>
    <div style="text-align: center">
        <span ><el-button @click="GoNews">资讯</el-button> <el-button @click="GoGames">游戏</el-button> <el-button @click="GoNewsMethod()">攻略</el-button> <el-button @click="GoNewsPingjia">测评</el-button> </span>
        <div v-if="news.length>0" style="text-align: left">
            <el-card v-for="item in news" style="margin-top: 30px;width: 650px;height:150px"  v-loading="loading">
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
                    <el-image :src="item.photo"  style="width: 100px;height:70px"></el-image><br>
                    <svg-icon icon-class="message"></svg-icon>   {{item.commentNumber}} <svg-icon icon-class="date"></svg-icon>{{item.createTime}}
                </div>

            </el-card>

            <el-pagination
                    v-show="total>0"
                    :total="total"
                    :current-page.sync="newsSerach.pageNum"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size.sync="newsSerach.pageSize"
                    layout="sizes, prev, pager, next"
                    @size-change="getList"
                    @current-change="getList"
                    style="margin-top: 20px"
            ></el-pagination>
        </div>

        <div  v-show="console.length >0"  style="text-align: left">
            <el-card v-for="item in console" style="margin-top: 30px;width: 600px;height: 230px"  v-loading="loading">

                <div style="float: left;width: 250px;height:230px">
                    <el-image :src="item.gameImage"  style="width: 250px;height:180px"></el-image>
                    <svg-icon icon-class="date"></svg-icon>{{item.gameCreateTime}}
                </div>

                <div style="width: 200px;height: 200px;float: left;margin-left: 5%">
                    <div>
                        <el-link @click="NewsDetail(item)" style="font-size: 20px;color: cadetblue">{{item.gameName}}</el-link><br>
                        <el-link @click="NewsDetail(item)" style="color: yellow">{{item.gameCode}}</el-link>
                    </div>
                    <div >
                        <div>  <span style="color: #B3C0D1;font-size: 3px">发行商</span>  {{item.gameCreater}}</div>
                    </div>
                    <div >
                        <div>  <span style="color: #B3C0D1;font-size: 3px">发行时间</span>  {{item.gameCreateTime.toString().substring(0,10)}}</div>
                    </div>
                    <br>
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
        name: "SearchIndex",
        data(){
            return{
                console:[],
                news:[],
                content:undefined,
                consoleSearch: {},
                newsSerach:{
                    categoryId:0,
                    title:undefined,
                    pageNum: 1,
                    pageSize: 5,
                },
                total:undefined,
                loading:false,
                queryParams:{
                    pageNum: 1,
                    pageSize: 5,
                    gameCode: undefined,
                    gameName: undefined,
                    gameLable: undefined,

                },
            }

        },
        methods:{

            getGameList(){
                this.loading =true;
                this.$getRepquest("/console/list/",this.queryParams).then(
                    response=>{
                        if (response){
                            this.console =  response.rows;
                            this.total =response.total
                            this.loading =false;
                        }
                    }
                )
            },
            GameDetail(row){
                window.sessionStorage.setItem("gameform",null);
                window.sessionStorage.setItem("gamecomment",null);
                console.log(row)
                window.sessionStorage.setItem("gameform",JSON.stringify(row));

                let query={
                    pageNum: 1,
                    pageSize: 10,
                    consoleid:row.gameId
                }
                this.$getRepquest('/consolecomment/list/',query).then( response=>{
                    if (response){
                        window.sessionStorage.setItem("gamecomment",JSON.stringify(response.rows));

                        this.$postRequest('/console/image/'+row.gameId).then(response=>{
                            if (response){
                                console.log(response);
                                window.sessionStorage.setItem("imageList",JSON.stringify(response.imgs));
                                this.$router.replace('/game/gameDetail/')
                            }
                        })

                    }
                })
            },
            GoGames(){
                this.queryParams.pageNum = 1;
                this.queryParams.gameName = this.content
                this.news =[];
                this.getGameList()
            },
            GoNews(){
                this.newsSerach.pageNum= 1,
                this.newsSerach.categoryId =0;
                this.getList();

            },

            GoNewsMethod(){
                this.newsSerach.pageNum= 1,
                    this.newsSerach.categoryId =2;
                this.getList();

            },

            GoNewsPingjia(){
                this.newsSerach.pageNum= 1,
                    this.newsSerach.categoryId =1;
                this.getList();
            },
            NewsDetail(row){
                console.log(row)

                this.$postRequest("/news/add/"+row.id).then()
                window.sessionStorage.setItem("form",JSON.stringify(row));
                let query={
                    newsid:row.id,
                    pageNum: 1,
                    pageSize: 10,
                }
                this.$getRepquest('/newscomment/list',query).then( response=>{
                    if (response){
                        window.sessionStorage.setItem("comment",JSON.stringify(response.rows));
                        this.$router.replace('/News/NewDetail')
                    }
                })
            },
            getList(){
                this.console=[],
                this.loading = true,
                this.$getRepquest('/news/list',this.newsSerach).then(response=>{
                    if (response){
                        this.news = response.rows;
                        this.loading = false
                        this.total = response.total;
                    }
                })

            }
        },
        created() {
            this.console=[],
            this.news = [],
            this.loading = true
            this.content = JSON.parse(window.sessionStorage.getItem("content"))
            this.newsSerach.title = this.content
            this.$getRepquest('/news/list',this.newsSerach).then(response=>{
                    if (response){
                        this.news = response.rows;
                        this.loading = false
                        this.total = response.total;
                    }
            })



        }
    }
</script>

<style scoped>

</style>
