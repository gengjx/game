<template>
    <div style="height: 100%;width: 100%" >
        <div class="a">

            <div class="loginForm" style="margin-left: 0px">
                    <b ><h1 style="text-align: center ;color: beige;font-size: 55px">登录</h1></b>
                    <el-image :src="Src"></el-image>
                    <el-form  :model="loginForm" ref="formdata" >
                        <el-form-item prop="userName" label="用户名"  style="width:500px">
                            <el-input  v-model="loginForm.userName" icon="el-icon-user-solid"></el-input>
                        </el-form-item>
                        <el-form-item prop="password" label="密码"  style="width:500px">
                            <el-input  v-model="loginForm.password"  show-password></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button id="login" type="primary"  :disabled="mydisable" @click="login">登陆</el-button>
                        </el-form-item>
                    </el-form>
                    <el-link type="primary" @click="regist" style="font-size: large">忘记你的密码</el-link>

            </div >

            <div  class="TForm" style="text-align: center">
                加入 GGame，探索数千款精彩游戏。<br>
                了解更多<br>
                <el-image :src="join_pc" style="height: 300px"></el-image><br>
                免费加入且简单易用<br>
                <el-button @click="regist">加入我们</el-button>

            </div>




        </div>

    </div>
</template>

<script>
    export default {
        name: "Login",

        data(){
            return{
                mydisable:false,
                loginForm:{
                    userName:'',
                    password:'',

                },
                Src:"https://media.st.dl.pinyuncloud.com/steam/apps/1129190/header.jpg?t=1605535848",
                join_pc:"https://store.st.dl.pinyuncloud.com/public/shared/images/login/join_pc.png?v=1",
            }

        },
        methods:{
            login(){
                this.$router.push('/Home')
                this.$postRequest('/system/login',
                    {
                        userName:this.loginForm.userName,
                        password:this.loginForm.password
                    }

                ).then(
                    response=>{
                        if (response){
                            window.sessionStorage.setItem("LoginUser",JSON.stringify(response.data))
                            this.$router.push('/home')
                        }
                    }


                )
            },
            regist(){
                this.$router.push('/register')
            }
        }
    }
</script>

<style scoped>
    .a{
        background-image: url("../assets/acct_creation_bg.jpg");
        height:100%;
        width: 100%;
    }
    .loginForm{
        position:absolute;
        left:30%;    /* 定位父级的50% */
        top:50%;
        transform: translate(-50%,-50%); /*自己的50% */
        opacity:0.4;
        filter:alpha(opacity=100);
        font-size: large;
        color: yellow;

    }
    .TForm{
        position:absolute;
        left:70%;    /* 定位父级的50% */
        top:40%;
        transform: translate(-50%,-50%); /*自己的50% */
        opacity:0.4;
        filter:alpha(opacity=100);
        font-size: large;
        color: yellow;
        margin-right: 0px;
    }
</style>
