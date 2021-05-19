<template>
    <div style="width: 1000px;text-align: center;margin-left: 35%;margin-top: 3%" >
        <div style="text-align: left">
            <h1 style="font-size: 60px">游戏看一看:</h1>
        </div>
        <el-card >

            <el-image src="https://img01.vgtime.com/game/cover/2021/03/30/210330102853187_u1477.jpg"></el-image>
            <div style="text-align: left;color: #B3C0D1">首页 > 全部游戏 > <el-link @click="Reset">
                {{form.gameName}}</el-link></div>
            <div><h1>{{form.gameName}}</h1> <el-button v-if="guanzhu !=undefined" @click="remove" type="primary">已经关注啦</el-button>

                                            <el-button v-if="guanzhu == undefined" @click="adds" type="warning">点个关注吧</el-button>
            </div>
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
                <el-avatar :src="form.gameImage"  style="width: 150px;height: 150px"></el-avatar>
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
                <el-button @click="dialogVisible = true" v-show="item.createtime == undefined" >打分与点评</el-button>
                <h1>俱乐部  <el-link @click="julebu">更多</el-link></h1>
                <el-card v-show="item.createtime !=undefined" style="text-align: left">
                             <span >
                    <el-avatar :src="item.photo" v-show="item.photo !=null"></el-avatar>{{item.nickname}}
                    <el-tag  v-show="item.gametype !=null"> {{item.gametype}} </el-tag>
                    <el-tag  v-show="item.grade !=null" > {{item.grade}} </el-tag>
                    <el-tag  v-show="item.createtime !=null" > {{item.createtime}} </el-tag><br>
                    <span>
                            <el-button @click="edit"> 修改</el-button>
                            <el-button @click="delping(item)"> 删除</el-button>
                    </span>

                </span>
                    <div v-show="item.content !=undefined">
                        <el-card style="width:300px;height: 130px">
                            {{item.content}}
                        </el-card>
                    </div>
                </el-card>
            </div>
            <br>
            <br>
            <div    v-show="data!=null &&data.length>0" style="text-align: left;">
                价格趋势图:<br>
                $: {{currentInfo.value}}RMB
            </div>

            <TrendChart
                    v-show="data!=null &&data.length>0"
                    @mouse-move="onMouseMove"
                    :datasets="[
                 {
                    data,
                    smooth: true,
                    fill: true,
                    showPoints:true
                 }
                 ]"
                    :grid="{
                    verticalLines: true,
                    horizontalLines: true
                 }"
                    :min="0"
                    :interactive="true"
                    :labels="{
                        xLabels
                    }"
            >
            </TrendChart>
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

        <div style="text-align: left;color: white">
            <h1 style="font-size: 60px">新闻资讯:</h1>
        </div>

        <div v-show="News.length <=0">
            <el-card>
                <div style="color: chartreuse">暂无资讯</div>
            </el-card>

        </div>
        <div>
            <el-card v-for="item in News" style="margin-top: 30px;width: 1000px;height:150px"  v-loading="loading">
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
        </div>


        <div style="text-align: left;color: white">
            <h1 style="font-size: 60px">玩家点评:</h1>
        </div>

        <div style="margin-top: 25px ;text-align: left">
            <el-card v-for="item in comments">
                <span >
                    <el-avatar :src="item.photo" ></el-avatar>{{item.nickname}}
                    <el-tag  v-show="item.gametype !=null"> {{item.gametype}} </el-tag>
                    <el-tag  v-show="item.grade !=null" > {{item.grade}} </el-tag>
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


        <el-dialog title="点评打分" style="text-align: left"
                   :visible.sync="dialogVisible"
        >
            <div>
                <el-avatar :src="this.form2.photo"></el-avatar> {{this.form2.nickname}}
                <div  style="width: 40% ;height: 15%;" >
                  <span> 游戏评分 <el-slider v-model="form2.grade" :format-tooltip="formatTooltip"></el-slider></span>
                </div>

                <div >
                    游戏状态:
                    <el-radio-group v-model="form2.gametype">
                        <el-radio label="在玩"></el-radio>
                        <el-radio label="通关"></el-radio>
                        <el-radio label="弃坑"></el-radio>
                    </el-radio-group>
                </div>

                <div>
                    评价内容:<br>
                    <textarea style="width: 500px;height: 200px" v-model="form2.content"></textarea>
                </div>

                <div>
                    <el-button @click="add">发布评论</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "GameDetail",
        data(){
            return{
                dialogVisible:false,
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
                    userid:undefined,
                    parentId:0,
                },
                total:undefined,
                form2:{
                    id:undefined,
                    consoleid:undefined,
                    nickname:undefined,
                    content:undefined,
                    createtime:undefined,
                    photo:undefined,
                    userid:undefined,
                    grade:undefined,
                    gametype:undefined,
                    gameGrade:'',
                    parentId: 0
                },
                UserNotes:{
                    id:undefined,
                    gameid:undefined,
                    createtime:undefined,
                    userid:undefined,
                    type:undefined,
                },
                Attation:{
                    id:undefined,
                    gameid:undefined,
                    userid:undefined,
                },
                guanzhu:undefined,
                item: {

                },
                queryParams1:{
                    pageNum:1,
                    pageSize:10,
                    consoleid:undefined,
                    userid:undefined
                },
                currentInfo:{
                    label:undefined,
                    value:undefined
                },
                sort:[

                ],
                data :[70, 100, 400, 180, 100],
                xLabels: ["Mon", "Tue", "Wed", "Thu"],
                News:[],

            }
        },
        methods:{
            julebu(){
                this.$router.push('/JuLeBu')
                window.sessionStorage.setItem("form",JSON.stringify(this.form))
            },
            commentDetail(item){
                window.sessionStorage.setItem("commentDeatail",JSON.stringify(item))
                this.$router.push('/CommentSearch')
            },
            onMouseMove(params) {
                console.log(params)
                if (!params) {
                    this.currentInfo = null;
                    return;
                }
                this.currentInfo = {
                    value: params.data[0]
                }
            },
            edit(){
                this.form2 = this.item,
                this.dialogVisible =true
            },
            delping(item){
                if (item.id != null){
                    this.$confirm("确定删除自己的评论记录吗","提示",{
                        confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                    }).then(()=>{
                        this.$deleteRequest('/consolecomment/'+item.id).then(response=>{
                            if (response){
                                this.item ={};
                                this.item.createtime = undefined;
                                this.getList()
                            }
                        })

                    })
                }
            },
            formatTooltip(val) {
                return val / 10;
            },
            adds(){

                this.$postRequest('/console/insertAttation',this.Attation).then(
                    response=>{
                        if (response.code ===200){
                            this.guanzhu = 1;
                            this.getAttation()
                        }
                    }
                )
            },
            remove(){
                this.$postRequest('/console/deleteAttation',this.Attation).then(
                    response=>{
                        if (response.code ===200){
                            this.guanzhu = undefined;
                        }
                    }
                )
            },
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
                this.$getRepquest('/consolecomment/list',this.queryParams).then( response=>{
                    if (response){
                        this.comments = response.rows;
                        this.total = response.total;
                    }
                })
            },
            Reset(){
                location.reload()
            },
            add(){
                if (this.form2.id == undefined){
                    this.form2.grade =  this.form2.grade/10
                    this.form2.createtime = new Date().format("yyyy-MM-dd hh:mm:ss")
                    this.$postRequest('/consolecomment',this.form2).then(response=>{
                        if (response){
                            this.getList()
                            this.getComment();
                        }
                    })
                }
                else {
                    this.form2.grade =  this.form2.grade/10
                    this.$postRequest('/consolecomment/edit',this.form2).then(response=>{
                        if (response){

                            this.getList()
                            this.form2 ={
                                id:undefined,
                                consoleid:undefined,
                                nickname:undefined,
                                content:undefined,
                                createtime:undefined,
                                photo:undefined,
                                userid:undefined,
                                grade:undefined,
                                gametype:undefined
                            }
                        }
                    })
                }
                this.dialogVisible =false

            },
            getAttation(){
                this.$getRepquest('/console/Attation',this.Attation).then(response=>{
                    if (response){
                        console.log(response);
                        if (response.code ===500){
                            this.guanzhu = undefined;
                        }
                        else {
                            this.guanzhu = 1;
                            this.Attation = response.data
                        }
                    }
                })
            },
            NewsDetail(row){
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
            getComment(){
                this.item = [],
                this.queryParams1.userid = this.form2.userid
                this.queryParams1.consoleid = this.form2.consoleid
                this.$getRepquest('/consolecomment/list',this.queryParams1).then( response=>{
                    if (response){
                        if (response.rows != null &&response.rows.length>0){
                            this.item = response.rows[0];
                            this.queryParams1.userid =undefined;
                        }

                    }
                })
            }
        },

        mounted() {
            this.form ={};
            this.comments = [];
            this.imageList= [];
            this.form =JSON.parse(window.sessionStorage.getItem("gameform"));
            if (this.form.gameGrade != ''&& this.form.gameGradeNumber != null){
                this.form.gameGrade = this.form.gameGrade.substring(0,3);
            }
            else {
                this.form.gameGrade = 0;
                this.form.gameGradeNumber = 0;
            }
            this.queryParams.consoleid = this.form.gameId
            this.getList()
            this.user =JSON.parse(window.sessionStorage.getItem("user"));
            this.form2.consoleid = this.form.gameId
            this.form2.userid = this.user.user.userId
            this.form2.nickname = this.user.user.nickName
            this.form2.photo = this.user.user.avatar
            console.log(this.form2)
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

            this.UserNotes.type = this.form.gameLable;
            this.UserNotes.userid =this.user.user.userId
            this.Attation.userid = this.user.user.userId
            this.Attation.gameid = this.form.gameId
            this.UserNotes.gameid =this.form.gameId
            this.UserNotes.createtime = new Date().format("yyyy-MM-dd hh:mm:ss")
            this.$postRequest('/console/insertNotes',this.UserNotes).then()

            this.$getRepquest('/console/Attation',this.Attation).then(response=>{
                if (response){
                    console.log(response);
                    if (response.code ===500){
                        this.guanzhu = undefined;
                    }
                    else {
                        this.guanzhu = 1;
                        this.Attation = response.data
                    }
                }
            });

            // this.queryParams1.userid = this.form2.userid
            // this.queryParams1.consoleid = this.form2.consoleid
            // this.$getRepquest('/consolecomment/list',this.queryParams1).then( response=>{
            //     if (response){
            //         if (response.rows != null &&response.rows.length>0){
            //             this.item = response.rows[0];
            //             this.queryParams1.userid =undefined;
            //         }
            //
            //     }
            // })
            this.getComment();
            let query1={
                pageNum:1,
                pageSize:7,
                gameid : this.form2.consoleid
            }
            this.$getRepquest('/GamePrice/list',query1).then(
                response=>{
                    if (response){
                        console.log(response)
                        this.sort = response.sort
                        console.log(this.sort)
                        this.data=[]
                        for (let i= 0 ;i<this.sort.length ;i++){
                            this.data[i]=this.sort[i].value;
                            this.xLabels[i] = this.sort[i].time;
                        }

                    }
                }
            );
            let query2={
                pageNum:1,
                pageSize:3,
                gameName : this.form.gameName
            }
            this.News =[]
            this.$getRepquest('/news/list/',query2).then(
                response=>{
                    if (response && response.rows !=[]){
                        this.News = response.rows;
                    }
                }
            );


        }
    }
</script>

<style scoped>

</style>
