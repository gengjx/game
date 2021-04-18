<template>
    <div>
        <el-card v-show="open == true">
            <div>世界这么大 总有你喜欢的 去看一看吧 <el-link @click="GoGameList">更多速看</el-link> </div>
            <el-image :src="require('../../../assets/1.jpg')"></el-image>
        </el-card>

        <div v-show="open ==false">
            <h1 style="color:white">关注的游戏时常看一看</h1>  <el-link @click="GoGameList">更多速看</el-link>
            <el-row>
                <el-col :span="4" v-for="item in Consoles"  >
                    <el-card :body-style="{ padding: '0px'}" style="width: 300px;height: 250px;margin-top: 15px" >
                        <img :src="item.gameImage" style="width: 300px;height: 150px">
                        <div style="padding: 14px;">
                            <b> <el-link @click="ConsoleDetail(item)" >{{ item.gameName}}</el-link></b><br>
                            <b> {{item.gameCode}}</b><br>
                            {{item.gameCreateTime}}
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>


    </div>
</template>

<script>
    export default {
        name: "MyFavorite",
        data(){
            return{
                form:{
                    userid:1,

                },
                Consoles:[],
                open:true,
            }

        },
        methods:{
            GoGameList(){
                this.$router.replace('/GameList')
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
            }

        },
        mounted() {
            this.$getRepquest('/console/UserAttation',this.form).then(resp=>{
                if (resp.data != null && resp.data.length >0){
                    console.log(resp);
                    this.Consoles=resp.data;
                    this.open = false
                }
            })
        }
    }
</script>

<style scoped>

</style>
