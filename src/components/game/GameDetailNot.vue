<template>
    <div style="width: 1000px;text-align: center;margin-left: 35%;margin-top: 3%" >
        <div style="text-align: left">
            <h1 style="font-size: 60px">游戏看一看:</h1>
        </div>
        <el-card >

            <el-image src="https://img01.vgtime.com/game/cover/2021/03/30/210330102853187_u1477.jpg"></el-image>
            <div style="text-align: left;color: #B3C0D1">首页 > 全部游戏 > <el-link @click="Reset">
                {{form.gameName}}</el-link></div>
            <div><h1>{{form.gameName}}</h1></div>

            <div style="text-align: right">发行商:{{form.gameCreater}}
                发行日期:<svg-icon icon-class="date"></svg-icon>{{form.gameCreateTime }}
            </div>
            <el-carousel style="height:500px;width: 500px;float: left" >
                <el-carousel-item v-for="url in imgList"  :key="url.sysPictureId">
                    <el-image  :key="url.gameImage" :src="url.gameImage" style="height:500px;width: 500px;" ></el-image>
                </el-carousel-item>
            </el-carousel>
            <div style="margin-left: 350px;margin-top: 20px">
                <el-card style="height: 200px;width: 200px;margin-left: 300px">
                <el-avatar :src="form.gameImage"  style="height: 150px;width: 150px"></el-avatar>
                </el-card>
                <div>
                   <span><b style="font-size:30px">{{form.gameGrade}}</b>

                       {{form.gameGradeNumber}} 参与了评分

                   </span>
                </div>
                发行日期:<svg-icon icon-class="date"></svg-icon>{{form.gameCreateTime }}<br>
                游戏基因: <el-tag v-for="item in newLable" v-show="item != null && item !='' ">{{item}}</el-tag> <br>
                游戏平台: <el-tag v-for="item in platform" v-show="item != null && item !=''">{{item}}</el-tag> <br>
                开发商:{{form.gameCreater}}<br>
                发行商:{{form.gameCreater}}<br>
            </div>
            <br>
            <br>

            <div style="text-align: left;float: left">
                <h1>编辑的话</h1>
                适当娱乐,学业和生活同样重要
            </div>

            <div style="text-align: left;float: left">
                <h1>关于游戏</h1>
                {{form.remark}}
            </div>

            <el-image src="https://img01.vgtime.com/game/cover/2021/03/30/210330102853187_u1477.jpg"></el-image>


        </el-card>
        <div style="text-align: left">
            <h1 style="font-size: 60px">玩家点评:</h1>
        </div>
        <div style="text-align: left">
            <el-card>
                <span> <h1>请登录后再评论,登录后可以查看更多玩家点评</h1></span>
            </el-card>

        </div>
        <div style="margin-top: 25px ;text-align: left">
            <el-card v-for="item in comments">
                <span >
                    <el-avatar :src="item.photo" ></el-avatar>{{item.nickname}}
                    <el-tag  v-show="item.gametype !=null"> {{item.gametype}} </el-tag>
                    <el-tag  v-show="item.grade !=null" > {{item.grade}} </el-tag>
                    <el-tag  v-show="item.createtime !=null" > {{item.createtime}} </el-tag>
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
        name: "GameDetailNot",
        data(){
            return{
                form:{

                },
                comments:[],
                imgList:[],
                typeOptions:[],
                platformOptions:[],
                LanaugeOptions:[],
                newLable:undefined,
                platform:undefined,
                Language:undefined,
                queryParams:{
                    pageNum:1,
                    pageSize:10,
                    consoleid:undefined,
                    userid:undefined
                },
            }
        },
        methods:{

            platfromtter(row,gameOperatorType){
                let  t =[];
                t= gameOperatorType.toString().split(',');
                let newlable='';
                for (let i=0;i<t.length;i++){
                    newlable+=this.$statusFormat(row, t[i])+" "

                }

                return newlable;
            },

            getList(){
                this.$getRepquest('/consolecomment/list/not',this.queryParams).then( response=>{
                    if (response){
                        this.comments = response.rows;
                        this.total = response.total;
                    }
                })
            },
        },

        mounted() {
            this.form ={};
            this.comments = [];
            this.imageList= [];
            this.form =JSON.parse(window.sessionStorage.getItem("gameform"));
            console.log(this.form)
            this.comments =JSON.parse(window.sessionStorage.getItem("gamecomment"));
            console.log(this.comments)
            this.imgList = JSON.parse(window.sessionStorage.getItem("imageList"));
            this.$getDicts("sys_console_platform").then(response => {
                if (response){
                    this.platformOptions = response.data;
                    this.platform =  this.platfromtter(this.platformOptions,this.form.gameOperatorType).toString().split(" ")

                }

            });
            this.$getDicts("sys_console_type").then(response => {
                if (response){
                    this.typeOptions = response.data;
                    this.newLable =this.platfromtter(this.typeOptions,this.form.gameLable).toString().split(" ")
                }
            });

            this.$getDicts("sys_console_lanuage").then(response => {
                if (response){
                    this.LanaugeOptions = response.data;
                    this.Language = this.platfromtter(this.LanaugeOptions,this.form.gameLanguage).toString().split(" ")
                }

            });

        }
    }
</script>

<style scoped>

</style>
