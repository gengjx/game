<template>
    <div>

        <div>
            <h1 style="color:white">游戏推荐</h1>  <el-link @click="GoGameList">更多速看</el-link>
            <el-row>
                <el-col :span="3" v-for="item in Consoles"  >
                    <el-card v-loading="loading" :body-style="{ padding: '0px'}" style="width: 200px;height: 250px;margin-top: 15px"  >
                        <el-avatar :src="item.gameImage" style="width: 200px;height: 150px"></el-avatar>
                        <div style="padding: 14px;">
                            <b> <el-link @click="ConsoleDetail(item)" >{{ item.gameName}}</el-link></b><br>
                            <b> {{item.gameCode}}</b><br>
                            {{item.gameCreateTime}}
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <div>
            <h1 style="color: white">新闻资讯</h1>  <el-link @click="GoGameNews">更多速看</el-link>
            <el-row>
                <el-col :span="7" v-for="item1 in News0" >
                    <el-card  style="width: 500px;height: 150px"  v-loading="loading">
                        <div style="height: 150px;float: left;width: 300px">
                            <b> <el-link @click="NewsDetail(item1)" >{{ item1.title}}</el-link></b><br>
                            <b> 作者:{{item1.author}}</b><br>
                            发布时间:{{item1.createTime}}
                        </div>
                        <div style="float: left;width: 75px;height: 75px;margin-left: 50px">
                            <el-avatar :src="item1.photo" style="height: 75px;width: 75px" ></el-avatar>
                        </div>


                    </el-card>
                </el-col>
            </el-row>
        </div>


        <div>
            <h1 style="color: white">攻略实战</h1>   <el-link @click="GoGameMethod" >更多速看</el-link>
            <el-row>
                <el-col :span="7" v-for="item1 in News1" >
                    <el-card  style="width: 500px;height: 150px"  v-loading="loading">
                        <div style="height: 150px;float: left;width: 300px">
                            <b> <el-link @click="NewsDetail(item1)" >{{ item1.title}}</el-link></b><br>
                            <b> 作者:{{item1.author}}</b><br>
                            发布时间:{{item1.createTime}}
                        </div>
                        <div style="float: left;width: 75px;height: 75px;margin-left: 50px">
                            <el-avatar :src="item1.photo" style="height: 75px;width: 75px" ></el-avatar>
                        </div>


                    </el-card>
                </el-col>
            </el-row>
        </div>


        <div>
            <h1 style="color: white">玩家点评</h1>   <el-link @click="GoGameCheck">更多速看</el-link>
            <el-row>
                <el-col :span="7" v-for="item1 in News2" >
                    <el-card  style="width: 500px;height: 150px" v-loading="loading" >
                        <div style="height: 150px;float: left;width: 300px">
                            <b> <el-link @click="NewsDetail(item1)" >{{ item1.title}}</el-link></b><br>
                            <b> 作者:{{item1.author}}</b><br>
                            发布时间:{{item1.createTime}}
                        </div>
                        <div style="float: left;width: 75px;height: 75px;margin-left: 50px">
                            <el-avatar :src="item1.photo" style="height: 75px;width: 75px" ></el-avatar>
                        </div>


                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Lindex",
        data(){
            return{
                Consoles:[],
                News0:[],
                News1:[],
                News2:[],
                loading:false

            }

        },
        methods:{
            GoGameList(){
                this.$router.replace('/GameList')
            },
            GoGameCheck(){
                this.$router.replace('/GameEvaluate')
            },
            GoGameMethod(){
                this.$router.replace('/GameMethod')
            },
            GoGameNews(){
                this.$router.replace('/GameNews')
            },
            ConsoleDetail(row){
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

            NewsDetail(row){
                console.log(row)

                this.$postRequest("/news/add/"+row.id).then()

                this.$getRepquest("/news/"+row.id).then(response=>{
                    if (response){
                        console.log(response)
                        window.sessionStorage.setItem("form",JSON.stringify(response.data));
                        let query={
                            newsid:row.newsid,
                            pageNum: 1,
                            pageSize: 10,
                        }
                        this.$getRepquest('/newscomment/list/',query).then( response=>{
                            if (response){
                                window.sessionStorage.setItem("comment",JSON.stringify(response.rows));
                                this.$router.replace('/News/NewDetail/')
                            }
                        })
                    }
                })
            }
        },
        mounted() {
            this.loading =true
            let queryParams={
                pageNum: 1,
                pageSize: 6,
                gameCode: undefined,
                gameName: undefined,
                gameLable: undefined,

            };
            this.$getRepquest("/console/list/",queryParams).then(
                response=>{
                    if (response){
                        this.Consoles =  response.rows;
                    }
                }
            )

            let queryParams1={
                pageNum: 1,
                pageSize: 8,
                categoryId:0,

            };

            let queryParams2={
                pageNum: 1,
                pageSize: 8,
                categoryId:1,

            };


            let queryParams3={
                pageNum: 1,
                pageSize: 8,
                categoryId:2,

            };
            this.$getRepquest("/news/list",queryParams1).then(
                response=>{
                    if (response){
                        this.News0 =  response.rows;
                    }
                }
            )

            this.$getRepquest("/news/list",queryParams3).then(
                response=>{
                    if (response){
                        this.News1 =  response.rows;
                    }
                }
            )

            this.$getRepquest("/news/list",queryParams2).then(
                response=>{
                    if (response){
                        this.News2 =  response.rows;
                        this.loading =false
                    }
                }
            )

        }
    }
</script>

<style scoped>

</style>
