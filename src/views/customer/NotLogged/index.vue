<template>
    <div>

        <div>
            <h1 style="color:white">游戏推荐  <el-link @click="GameList">更多-></el-link></h1>
            <el-row>
                <el-col :span="4" v-for="item in Consoles"  >
                    <el-card v-loading="loading" :body-style="{ padding: '0px'}" style="width: 200px;height: 250px;margin-top: 15px"  >
                        <el-avatar :src="item.gameImage" style="width: 75px;height: 75px;margin-left: 50px"></el-avatar>
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
                <el-col :span="8" v-for="item1 in News0" >
                    <el-card  style="width: 400px;height: 150px" v-loading="loading" >
                        <div style="height: 150px;float: left;width: 200px">
                            <b> <el-link @click="NewsDetail(item1)" >{{ item1.title}}</el-link></b><br>
                            <b> 作者:{{item1.author}}</b><br>
                            发布时间:{{item1.createTime}}
                        </div>
                        <div style="float: left;width: 75px;height: 75px">
                            <el-avatar :src="item1.photo" style="height: 75px;width: 75px" ></el-avatar>
                        </div>


                    </el-card>
                </el-col>
            </el-row>
        </div>


        <div>
            <h1 style="color: white">攻略实战</h1>   <el-link @click="GoGameMethod" >更多速看</el-link>
            <el-row>
                <el-col :span="8" v-for="item1 in News1" >
                    <el-card  style="width: 400px;height: 150px" v-loading="loading" >
                        <div style="height: 150px;float: left;width: 200px">
                            <b> <el-link @click="NewsDetail(item1)" >{{ item1.title}}</el-link></b><br>
                            <b> 作者:{{item1.author}}</b><br>
                            发布时间:{{item1.createTime}}
                        </div>
                        <div style="float: left;width: 75px;height: 75px">
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
                    <el-card  style="width: 400px;height: 150px" v-loading="loading" >
                        <div style="height: 150px;float: left;width: 200px">
                            <b> <el-link @click="NewsDetail(item1)" >{{ item1.title}}</el-link></b><br>
                            <b> 作者:{{item1.author}}</b><br>
                            发布时间:{{item1.createTime}}
                        </div>
                        <div style="float: left;width: 75px;height: 75px">
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
        name: "index",
        data(){
            return{
                Consoles:[],
                News0:[],
                News1:[],
                News2:[],

            }

        },
        methods:{
            ConsoleDetail(row){
                window.sessionStorage.setItem("gameform",null);
                window.sessionStorage.setItem("gamecomment",null);
                window.sessionStorage.setItem("gameform",JSON.stringify(row));

                let query={
                    pageNum: 1,
                    pageSize: 10,
                    consoleid:row.gameId
                }
                this.$getRepquest('/consolecomment/list/not',query).then( response=>{
                    if (response){
                        window.sessionStorage.setItem("gamecomment",JSON.stringify(response.rows));

                        this.$postRequest('/console/image/not/'+row.gameId).then(response=>{
                            if (response){
                                console.log(response);
                                window.sessionStorage.setItem("imageList",JSON.stringify(response.imgs));
                                this.$router.replace('/game/gameDetail/not')
                            }
                        })

                    }
                })

            },
            GameList(){
                this.$router.push('/GameListNot')
            },
            GoGameCheck(){
                this.$router.replace('/Not/GameEvaluateNot')
            },
            GoGameMethod(){
                this.$router.replace('/Not/GameMethod')
            },
            GoGameNews(){
                this.$router.replace('/Not/GameNewsNot')
            },
            NewsDetail(row){
                console.log("row:"+row)

                this.$postRequest("/news/add/not/"+row.id).then()

                 window.sessionStorage.setItem("form",JSON.stringify(row));
                 let query={
                            newsid:row.id,
                            pageNum: 1,
                            pageSize: 10,
                 }
                 console.log(query)
                this.$getRepquest('/newscomment/list/not/',query).then( response=>{
                       if (response){
                                window.sessionStorage.setItem("comment",JSON.stringify(response.rows));
                                this.$router.replace('/News/NewDetail/not')
                       }
                })
            }
        },
        mounted() {
            let queryParams={
                pageNum: 1,
                pageSize: 6,
                gameCode: undefined,
                gameName: undefined,
                gameLable: undefined,

            };
            this.$getRepquest("/console/list/notDenglu",queryParams).then(
                response=>{
                    if (response){
                        this.Consoles =  response.rows;
                    }
                }
            )

            let queryParams1={
                pageNum: 1,
                pageSize: 7,
                categoryId:0,

            };

            let queryParams2={
                pageNum: 1,
                pageSize: 7,
                categoryId:1,

            };


            let queryParams3={
                pageNum: 1,
                pageSize: 7,
                categoryId:2,

            };
            this.$getRepquest("/news/list/news",queryParams1).then(
                response=>{
                    if (response){
                        this.News0 =  response.rows;
                    }
                }
            )

            this.$getRepquest("/news/list/news",queryParams2).then(
                response=>{
                    if (response){
                        this.News1 =  response.rows;
                    }
                }
            )

            this.$getRepquest("/news/list/news",queryParams3).then(
                response=>{
                    if (response){
                        this.News2 =  response.rows;
                    }
                }
            )

        }
    }
</script>

<style scoped>

</style>
