<template>
    <div>
        <el-container style="height: 1200px;width: 100%">
            <el-header height="100px" class="header">
                欢迎使用管理后台
                <div>
                    <el-dropdown>
                <span class="el-dropdown-link">
                        用户您好<i class="el-icon-arrow-down el-icon--right"></i>
                 </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
                            <el-dropdown-item @click.native="dialogFormVisible = true">修改密码</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px" class="aside">
                    <el-menu  class="el-menu-vertical-demo"
                              router
                              default-active="2"
                              background-color="#545c64"
                              text-color="#fff"
                              active-text-color="#ffd04b"
                             >
<!--                        <template v-for="(item,i) in adminmenu">-->
<!--                            &lt;!&ndash;index 没有用但是必需字段且为 string &ndash;&gt;-->
<!--                            <el-submenu :key="i" :index="i + ''" style="text-align: left">-->
<!--                            <span slot="title" style="font-size: 17px;">-->
<!--                                    {{item.name}}</span>-->
<!--                                <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">-->
<!--                                    {{ child.name }}-->
<!--                                </el-menu-item>-->
<!--                            </el-submenu>-->
<!--                        </template>-->
                        <el-menu-item index="/home/index">首页</el-menu-item>
                        <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>系统管理模块</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/dept/index">部门管理</el-menu-item>
                            <el-menu-item index="/post/index">岗位管理</el-menu-item>
                            <el-menu-item index="/menu/index">菜单管理</el-menu-item>
                            <el-menu-item index="/role/index">角色管理</el-menu-item>
                            <el-menu-item index="/User/index">用户信息</el-menu-item>
                            <el-submenu index="1-1">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>日志管理模块</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="/Log/loginLog">登录日志管理</el-menu-item>
                                    <el-menu-item index="/Log/operLog">操作日志管理</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                        </el-menu-item-group>
                    </el-submenu>

                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>游戏管理模块</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/game/list">游戏数据管理</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group>
                                <el-menu-item index="/News/index">新闻管理界面</el-menu-item>
                            </el-menu-item-group>
                            <el-submenu index="2-1">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>评论管理模块</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="/news/comment/index">文章评论管理</el-menu-item>
                                    <el-menu-item index="/console/comment/index">游戏评论管理</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>

                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>

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
        name: "home",

        data(){
            return{
                dialogFormVisible:false,
                repeatePass:undefined,
                old:undefined,
                newpass:undefined,
                ResetPwd:{
                    userId:undefined,
                    value:undefined,
                },

            }
        },
        mounted(){
            this.$router.push('/home/index')
        },
        methods:{
            logout(){
                this.$router.replace('/')
                this.$getRepquest("/logout").catch(
                    resp=>{
                        window.sessionStorage.setItem("token",null)
                    }
                )

            },
            edit(){

                let user = JSON.parse(window.sessionStorage.getItem("user")).user

                this.$confirm('请确认修改"' + user.userName + '"为新密码', "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消"
                }).then(({ value }) => {
                    this.ResetPwd.userName = user.userName;
                    this.ResetPwd.userId = user.userId;
                    this.ResetPwd.value =this.newpass;
                    this.$putRequest('/system/user/',this.ResetPwd).then(response => {
                        if (response != null && response){
                            this.$message("修改成功，新密码是：" + this.newpass);
                        }

                    });
                }).catch(() => {});
            }

        }
    }
</script>

<style scoped>
    .header{
        background-color: #909399;
        color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #fff;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .aside{
        height: 100%;
        background-color: #545c64;
    }
    .el-menu-vertical-demo{
        width: 200px;
    }
</style>
