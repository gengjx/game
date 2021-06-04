<template>
    <div class="a" >
        <el-container  style="height: 100%;width: 100%;position: fixed">
            <el-header style="height: 5%;width: 100%">
                <div   class="t" style="height: 100%;width: 100%" >
                    <span style="margin-top: 20%">XGAME  网站功能反馈QQ号1335339044 </span>
                    <span style="margin-left: 100px">
                                    <el-dropdown >
                        <span style="color:white">导航</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="GoBase">主页</el-dropdown-item>
                            <el-dropdown-item @click.native="Tuijian">推荐</el-dropdown-item>
                        </el-dropdown-menu>
                 </el-dropdown>
                 <el-dropdown >
                        <span style="color:white;margin-left: 15px">攻略测评</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="GoGameMethod">游戏攻略</el-dropdown-item>
                            <el-dropdown-item @click.native="GoGameCheck">游戏测评</el-dropdown-item>
                        </el-dropdown-menu>
                 </el-dropdown>

                 <el-dropdown >
                        <span style="color:white;margin-left: 15px">新闻资讯</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="GoGameNews">新闻资讯</el-dropdown-item>
                        </el-dropdown-menu>
                 </el-dropdown>
                 <el-dropdown >
                        <span style="color:white;margin-left: 15px">俱乐部</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="GoJuLEBu">俱乐部</el-dropdown-item>
                        </el-dropdown-menu>
                 </el-dropdown>

                 <el-input  v-model="content" style="height:40px;width: 300px;margin-left: 300px" placeholder="请输入搜索信息" ></el-input><el-button type="primary" icon="el-icon-search" @click.native="serach"></el-button>
                    </span>

                    <span style="float: right">
                        <el-image  style="width: 5%;height: 5%;float: right;" :src="require('../../../assets/index.jpg')"> </el-image>
                        <el-dropdown style="float: right;margin-right: 30px">
                            <span style="color:white;font-size:18px;">{{userName}}</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="GoInformation">个人信息</el-dropdown-item>
                            <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
                            <el-dropdown-item @click.native="GoShoucang">我的收藏</el-dropdown-item>
                            <el-dropdown-item @click.native="GoMyNews">我发布的文章</el-dropdown-item>
                            <el-dropdown-item @click.native="drawer = true">站内消息</el-dropdown-item>
                             <el-dropdown-item @click.native="dialogFormVisible=true">修改密码</el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown>

                    </span>

                </div>
            </el-header>
            <el-main style="height: 75%" >
                <router-view></router-view>
            </el-main>
            <el-footer style="height: 20%;width: 100%;" >
                <div style="float: left;width: 20%; color: white;height: 50%">
                    <el-image :src="require('../../../assets/index.jpg')" style="height: 100%;float: left;width: 30%"></el-image>
                    <br>

                    <span style="float: left;height: 50%;font-size: 5%">
                        专业、严谨、有趣，游戏时光由热爱游戏的新老玩家组成,把关于电视游戏的一切分享给大家。
                    </span>

                </div>
                <div style="float: left;width: 20%;color: white;height: 100%">
                    <div style="font-size: 5%">
                    <div ><b>找游戏</b></div>
                    <el-link href="https://www.vgtime.com/topic/748493.jhtml" style="color: white">Ps4游戏推荐</el-link><br>
                    <el-link href="https://www.vgtime.com/topic/748493.jhtml" style="color: white">Xbox one游戏推荐</el-link><br>
                    <el-link href="https://www.vgtime.com/topic/748493.jhtml" style="color: white">Switch 游戏推荐</el-link><br>
                    <el-link href="https://www.vgtime.com/topic/748493.jhtml" style="color: white">PS VR 游戏推荐</el-link><br>
                    </div>
                </div>

                <div style="float: left;width: 20%;color: white">
                    <div style="font-size: 5%">
                        <div ><b>交流群</b></div>
                        <el-link href="https://www.vgtime.com/topic/748493.jhtml" style="color: white">交流①群1335339044</el-link><br>
                        <el-link href="https://www.vgtime.com/topic/748493.jhtml" style="color: white">交流②群1335339044</el-link><br>
                        <el-link href="https://www.vgtime.com/topic/748493.jhtml" style="color: white">交流③群1335339044</el-link><br>
                        <el-link href="https://www.vgtime.com/topic/748493.jhtml" style="color: white">交流④群1335339044</el-link>
                    </div>

                </div>


                <div style="float: left;width: 20%;color: white;font-size: 5%">
                    <div ><b>联系合作</b></div>
                    <el-link href="https://www.vgtime.com/topic/748493.jhtml" style="color: white">如何投稿</el-link><br>
                    <el-link href="https://www.vgtime.com/topic/748493.jhtml" style="color: white">主编信箱</el-link><br>
                    <el-link href="https://www.vgtime.com/topic/748493.jhtml" style="color: white">商务合作</el-link><br>
                    <el-link @click="Goto" style="color: white">后台管理</el-link><br>
                </div>

                <div style="float: left;width: 20%;color: white;height: 100%;font-size: 5%">
                    <div >
                        <i class="el-icon-edit" style="margin-left: 30px"></i>
                        <i class="el-icon-share" style="margin-left: 30px"></i>
                        <i class="el-icon-delete" style="margin-left: 30px"></i>
                    </div>
                    UCG商城 游久网 GOG 杉果 独立精神 <br>
                    虎牙 腾讯游戏

                </div>

            </el-footer>
        </el-container>


        <el-drawer
                title="站内信"
                :visible.sync="drawer"
                :direction="direction"
                :before-close="handleClose"
                 @open="handOpen">
                <h1>个人公告部分</h1>
                <el-card v-for="item in this.notices" v-show="notices.length>0">
                    <li>
                        {{item.content}}
                    </li>
                    <el-button @click="deleteNotice(item)">移除消息</el-button>
                </el-card>

                <h1>系统公告部分</h1>

            <el-card v-for="item in this.SystemNotices" v-show="SystemNotices.length>0" :title="item.noticeTitle">
                <span>{{item.noticeTitle}}</span>
                <hr>
                <li>
                    {{item.noticeContent}}
                </li>
            </el-card>
        </el-drawer>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="600px" append-to-body>
            <el-form label-width="60px">
                <el-form-item  label="新密码">
                    <el-input v-model="newpass" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="edit">确认</el-button>   <el-button type="warning" @click="dialogFormVisible=false">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "Base",
        methods:{
            deleteNotice(item){
                this.$deleteRequest('/notice/'+item.id).then(response=>{
                    let id = this.user.user.userId
                    let query={
                        userid:id
                    }
                    this.$getRepquest('/notice/list',query).then(response=>{
                        if (response){
                            this.notices = response.rows;
                            console.log(this.notices)
                            let query1 ={
                                pageNum:1,
                                pageSize:5,
                            }
                            this.$getRepquest('/system/notice/list',query1).then(response=>{
                                if (response){
                                    this.SystemNotices = response.rows;

                                }
                            })
                        }
                    })
                })



            },
            serach(){
                this.GoSearch();
            },
            GoSearch(){
                window.sessionStorage.setItem("content",JSON.stringify(this.content))
                this.$router.push("/go")

            },
            GoInformation(){
                this.$router.push("/Information")
            },
            GoBase(){
                this.$router.push('/LBase')
                location.reload();
            },
            Tuijian(){
                this.$router.push('/Tuijian')
            },
            logout(){

                this.$getRepquest("/logout").then(
                    resp=>{
                        this.$router.replace('/')
                        //window.sessionStorage.setItem("token",null)
                    }
                )
            },
            Goto(){
                this.$router.replace('/Ahome')
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
            GoShoucang(){
                this.$router.replace('/MyFavorite')
            },
            GoJuLEBu(){
                this.$router.replace('/JuLeBuIndex')
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            handOpen(){
                console.log(this.user.user)
                let id = this.user.user.userId
                let query={
                        userid:id,
                        pageNum:1,
                        pageSize:5,
                }
                this.$getRepquest('/notice/list',query).then(response=>{
                    if (response){
                        this.notices = response.rows;
                        console.log(this.notices)
                    }
                })
                this.$getRepquest('/system/notice/list').then(response=>{
                    if (response){
                        this.SystemNotices = response.rows;

                    }
                })
            },
            GoMyNews(){

                this.$router.push("/myNews")
            },
            edit(){

                let user = JSON.parse(window.sessionStorage.getItem("user")).user

                this.$confirm('请确认修改"' + user.userName + '"为新密码', "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消"
                }).then(({ value }) => {
                    this.ResetPwd.userName = user.userName;
                    this.ResetPwd.userId = user.userId;
                    this.ResetPwd.password =this.newpass;
                    this.$putRequest('/system/user/resetPwd',this.ResetPwd).then(response => {
                        if (response != null && response){
                            this.$message("修改成功，新密码是：" + this.newpass);
                        }

                    });
                }).catch(() => {});
            }
        },
        mounted() {
                this.user =JSON.parse(window.sessionStorage.getItem("user"));
                this.router =JSON.parse(window.sessionStorage.getItem("router"));
                this.userName =this.user.user.nickName;
                this.$router.push("/L/index")


        },
        data(){
            return{
                user:{},
                router:{},
                userName:'gengjiaxin',
                content:undefined,
                drawer: false,
                direction: 'rtl',
                notices:[],
                SystemNotices:[],
                dialogFormVisible:false,
                newpass:undefined,
                ResetPwd:{
                    userId:undefined,
                    value:undefined,
                },
            };
        },
    }
</script>

<style scoped>
    /*.a{*/
    /*    height: 100%;*/
    /*    width: 100%;*/
    /*}*/
    /*.el-header, .el-footer {*/
    /*    background-color: #161616;*/
    /*    color: white;*/
    /*    font-size: 20px;*/
    /*    line-height: 30px;*/

    /*}*/

    /*.el-main {*/
    /*    margin-top: 0px;*/
    /*    color: #333;*/
    /*    line-height: 40px;*/
    /*    background-color: #21262A;*/
    /*}*/

    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 25px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 25px;
    }

    .el-main {
        background-color: #21262A;
        color: #333;
        line-height: 25px;
    }

    body > .el-container {
        margin-bottom: 5px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height:25px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 25px;
    }

</style>
