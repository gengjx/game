<template>
    <div>
        <h1 style="color: white">游戏模块</h1>

        <div style="float: left" >
            <el-card v-for="item in Consoles" style="margin-top: 30px;width: 1000px;height: 230px"  v-loading="loading">
                <div style="width: 650px;height: 200px;float: left">
                    游戏
                    <div>
                        <el-link @click="NewsDetail(item)">{{item.gameName}}</el-link>
                        <el-link @click="NewsDetail(item)">{{item.gameCode}}</el-link>
                    </div>


                    <div style="margin-top: 50px">
                        {{item.gameCreater}}
                    </div>

                    <br>
                </div>

                <div style="float: left;width: 250px;height:230px">
                    <el-image :src="item.gameImage"  style="width: 250px;height:180px"></el-image>
                     <svg-icon icon-class="date"></svg-icon>{{item.gameCreateTime}}
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

        <div style="float: right;margin-top: 30px">
            <el-image :src="require('../../../assets/09cef1246b600c3308e6a5a71e4c510fd8f9a16b.jpg')"></el-image><br>
        </div>

    </div>
</template>

<script>
    export default {
        name: "GameList",
        data(){
          return{
              Consoles:[],
              total:0,
              queryParams:{
                  pageNum: 1,
                  pageSize: 5,
                  gameCode: undefined,
                  gameName: undefined,
                  gameLable: undefined,

              },
              loading:false,
          }
        },
        methods:{
            getList(){
                this.loading =true;
                this.$getRepquest("/console/list/",this.queryParams).then(
                    response=>{
                        if (response){
                            this.Consoles =  response.rows;
                            this.total =response.total
                            this.loading =false;
                        }
                    }
                )
            },
            NewsDetail(row){
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

            this.queryParams.pageNum =1,
            this.getList();
        }
    }
</script>

<style scoped>

</style>
