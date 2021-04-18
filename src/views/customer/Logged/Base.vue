<template>
    <div class="a" >
        <el-container  style="height: 1200px;width: 100%">
            <el-header style="height: 5%">
                <div   class="t" style="height: 100%" >
                    <span style="margin-top: 20%">小耿商城  网站功能反馈QQ号1335339044 </span>
                    <span style="margin-left: 100px">
                                    <el-dropdown >
                        <span style="color:white;font-size:18px">导航</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="GoBase">主页</el-dropdown-item>
                            <el-dropdown-item @click.native="update">推荐</el-dropdown-item>
                        </el-dropdown-menu>
                 </el-dropdown>
                 <el-dropdown >
                        <span style="color:white;font-size:18px;margin-left: 15px">攻略测评</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="GoGameMethod">游戏攻略</el-dropdown-item>
                            <el-dropdown-item @click.native="GoGameCheck">游戏测评</el-dropdown-item>
                        </el-dropdown-menu>
                 </el-dropdown>

                 <el-dropdown >
                        <span style="color:white;font-size:18px;margin-left: 15px">新闻资讯</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="GoGameNews">新闻资讯</el-dropdown-item>
                        </el-dropdown-menu>
                 </el-dropdown>

                        <el-input  v-model="content" style="width: 300px;margin-left: 300px" placeholder="请输入搜索信息" ></el-input><el-button type="primary" icon="el-icon-search" @click.native="serach"></el-button>
                    </span>

                    <span style="float: right">
                        <el-image  style="width: 10%;height: 10%;float: right;" :src="require('../../../assets/index.jpg')"> </el-image>
                        <el-dropdown style="float: right;margin-right: 30px">
                            <span style="color:white;font-size:18px;">{{userName}}</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="GoInformation">个人信息</el-dropdown-item>
                            <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
                            <el-dropdown-item @click.native="GoShoucang">我的收藏</el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown>

                    </span>

                </div>
            </el-header>
            <el-main style="height: 75%" >
                <router-view></router-view>
            </el-main>
            <el-footer style="height: 20%;width: 100%;padding-bottom: 0%" >
                <div style="float: left;width: 20%; color: white">
                    <el-image :src="require('../../../assets/index.jpg')" style="height: 10%;float: left;width: 30%;margin-top: 5%"></el-image>
                    <br>
                    <br>
                    <br>
                    <br>
                    <span style="float: left">
                        专业、严谨、有趣，游戏时光由热爱游戏的新老玩家组成,
                        把关于电视游戏的一切分享给大家。
                    </span>

                </div>
                <div style="float: left;width: 20%;color: white">
                    <div style="margin-top: 20px"><b>找游戏</b></div>
                    <el-link href="https://www.vgtime.com/topic/748493.jhtml" style="color: white">Ps4游戏推荐</el-link><br>
                    <el-link href="https://www.vgtime.com/topic/748493.jhtml" style="color: white">Xbox one游戏推荐</el-link><br>
                    <el-link href="https://www.vgtime.com/topic/748493.jhtml" style="color: white">Switch 游戏推荐</el-link><br>
                    <el-link href="https://www.vgtime.com/topic/748493.jhtml" style="color: white">PS VR 游戏推荐</el-link><br>
                </div>

                <div style="float: left;width: 20%;color: white">
                    <div style="margin-top: 20px"><b>交流群</b></div>
                    <el-link href="https://www.vgtime.com/topic/748493.jhtml" style="color: white">交流①群1335339044</el-link><br>
                    <el-link href="https://www.vgtime.com/topic/748493.jhtml" style="color: white">交流②群1335339044</el-link><br>
                    <el-link href="https://www.vgtime.com/topic/748493.jhtml" style="color: white">交流③群1335339044</el-link><br>
                    <el-link href="https://www.vgtime.com/topic/748493.jhtml" style="color: white">交流④群1335339044</el-link>
                </div>


                <div style="float: left;width: 20%;color: white">
                    <div style="margin-top: 20px"><b>联系合作</b></div>
                    <el-link href="https://www.vgtime.com/topic/748493.jhtml" style="color: white"></el-link><br>
                    <el-link href="https://www.vgtime.com/topic/748493.jhtml" style="color: white">如何投稿</el-link><br>
                    <el-link href="https://www.vgtime.com/topic/748493.jhtml" style="color: white">主编信箱</el-link><br>
                    <el-link href="https://www.vgtime.com/topic/748493.jhtml" style="color: white">商务合作</el-link><br>
                    <el-link @click="Goto" style="color: white">后台管理</el-link><br>
                </div>

                <div style="float: left;width: 20%;color: white;height: 100%">
                    <div style="margin-top: 20px">
                        <i class="el-icon-edit" style="margin-left: 30px"></i>
                        <i class="el-icon-share" style="margin-left: 30px"></i>
                        <i class="el-icon-delete" style="margin-left: 30px"></i>
                    </div>

                    <div style="height: 30%">

                    </div>
                    UCG商城 游久网 GOG 杉果 独立精神 <br>
                    虎牙 腾讯游戏

                </div>

            </el-footer>
        </el-container>


    </div>
</template>

<script>
    export default {
        name: "Base",
        methods:{
            serach(){
                this.GoSearch();
            },
            GoSearch(){
                window.sessionStorage.setItem("content",JSON.stringify(this.content))
                this.$router.push("/Information").then(
                    this.$router.push('/SearchIndex')
                )

            },
            GoInformation(){
                this.$router.push("/Information")
            },
            GoBase(){
                this.$router.push('/LBase')
                location.reload();
            },
            logout(){
                this.$router.replace('/')
                this.$getRepquest("/logout").catch(
                    resp=>{
                        window.sessionStorage.setItem("token",null)
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
            }

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
