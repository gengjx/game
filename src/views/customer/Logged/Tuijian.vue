<template>
    <div>
        <div style="color:yellow">
            <h1>根据您留下的足迹，我们为准备了如下了的游戏推荐</h1>
        </div>
        <div>
            <el-row>
                <el-col :span="3" v-for="item in consoles"  >
                    <el-card :body-style="{ padding: '0px'}" style="width: 200px;height: 250px;margin-top: 15px" >
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
        <h1>今日最优惠</h1>
        <el-row>
            <el-col :span="3" v-for="item in consoless"  >
                <el-card :body-style="{ padding: '0px'}" style="width: 200px;height: 250px;margin-top: 15px" >
                    <el-avatar :src="item.gameImage" style="width: 200px;height: 150px"></el-avatar>
                    <div style="padding: 14px;">
                        <b> <el-link @click="ConsoleDetail(item)" >{{ item.gameName}}</el-link></b><br>
                        <b> {{item.gameCode}}</b><br>
                        {{item.gameCreateTime}}
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <h1>点评最热门</h1>
        <el-row>
            <el-col :span="3" v-for="item in consolesss"  >
                <el-card :body-style="{ padding: '0px'}" style="width: 200px;height: 250px;margin-top: 15px" >
                    <el-avatar :src="item.gameImage" style="width: 200px;height: 150px"></el-avatar>
                    <div style="padding: 14px;">
                        <b> <el-link @click="ConsoleDetail(item)" >{{ item.gameName}}</el-link></b><br>
                        <b> {{item.gameCode}}</b><br>
                        {{item.gameCreateTime}}
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <h1>社区最热门</h1>
        <el-row>
            <el-col :span="3" v-for="item in consolessss"  >
                <el-card :body-style="{ padding: '0px'}" style="width: 200px;height: 250px;margin-top: 15px" >
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
</template>

<script>
    export default {
        name: "Tuijian",
        data(){
            return{
                user:{},
                consoles:[],
                consoless:[],
                consolesss:[],
                consolessss:[],
            }
        },
        methods:    {
            getList(){
                this.$getRepquest('/console/listTuijian/'+this.user.userId).then(
                    response=>{
                        if (response){
                            this.consoles =response.rows
                        }
                    }
                )
                this.$getRepquest('/console/listTuijianPrize/'+this.user.userId).then(
                    response=>{
                        if (response){
                            this.consoless =response.rows
                        }
                    }
                )

                this.$getRepquest('/console/listTuijianConsoleComment/'+this.user.userId).then(
                    response=>{
                        if (response){
                            this.consolesss =response.rows
                        }
                    }
                )

                this.$getRepquest('/console/listTuijianNewsComment/'+this.user.userId).then(
                    response=>{
                        if (response){
                            this.consolessss =response.rows
                        }
                    }
                )

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
        },
        created() {
        },
        mounted() {
            let user = JSON.parse(window.sessionStorage.getItem("user"))
            console.log(user)
            this.user = user.user
            this.getList()

        }
    }
</script>

<style scoped>

</style>
