<template>
    <div style="height: 100%;width: 100%;margin-top: 0px" >
        <div class="a">

            <div class="loginForm" style="margin-left: 15%;width: 30%;height: 50%">
                    <b ><h1 style="text-align: center ;color: beige;font-size: 55px">登录</h1></b>
                    <el-image :src="require('../../../assets/header.jpg')"></el-image>
                    <el-form  :model="loginForm" ref="loginForm" :rules="rules"  >
                        <el-form-item prop="username" label="用户名"  style="width:100%">
                            <el-input  v-model="loginForm.username" icon="el-icon-user-solid"></el-input>
                        </el-form-item>
                        <el-form-item prop="password" label="密码"  style="width:100%">
                            <el-input  v-model="loginForm.password"  show-password></el-input>
                        </el-form-item>
                        <el-form-item prop="code" label="验证码" style="width: 100%">
                            <el-input v-model="loginForm.code"></el-input>
                        </el-form-item>
                        <el-form-item style="width: 100%;text-align: center">
                            <el-image :src="this.codeSrc" @click="getcaptchaImage"></el-image>
                            <el-link style="float: left;color: yellowgreen" @click="getcaptchaImage">看不清楚,换一张</el-link>
                        </el-form-item>
                        <el-form-item >
                            <el-button id="login" type="primary"  :disabled="mydisable" @click="login('loginForm')">
                                登陆
                            </el-button>
                        </el-form-item>
                    </el-form>
                    <el-link type="primary" @click="regist" style="font-size: large">忘记你的密码</el-link>

            </div >

            <div  class="TForm" style="text-align: center;height:55%;margin-top: 5%;width: 30%">
                <div >
                    加入我们，探索大千世界。<br>
                    了解更多<br>
                </div>

                <el-image :src="require('../../../assets/join_pc.png')" style="width: 70%"></el-image><br>
                免费加入且简单易用<br>
                <el-button @click="regist">加入我们</el-button>

            </div>




        </div>

    </div>
</template>

<script>
    export default {
        name: "Login",
        mounted() {
        this.getcaptchaImage();
        },
        data(){
            return{

                codeSrc:'',
                mydisable:false,
                loginForm:{
                    username:'',
                    password:'',
                    code:'',
                    uuid:'',

                },
                Src:"https://media.st.dl.pinyuncloud.com/steam/apps/1129190/header.jpg?t=1605535848",
                join_pc:"https://store.st.dl.pinyuncloud.com/public/shared/images/login/join_pc.png?v=1",

                rules: {
                    username: [
                        { required: true, message: '请输入用户名称', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请选择输入密码', trigger: 'blur' }
                        // ,{min:6,max:11,message: '密码在6到11位之间',trigger: 'blur'}
                        ],
                    code:[
                        { required: true, message: '请选择输入验证码', trigger: 'blur' }
                    ]



                }
    }

        },
        methods:{
            login(formdata){
                this.$refs[formdata].validate((valid) => {
                    if (valid) {
                        this.$postRequest('/login',this.loginForm).then(
                            resp=>{
                                if (resp){
                                    if (resp.code=='200'){
                                        window.sessionStorage.setItem("token","Bearer "+resp.token)
                                        this.getUserInfo();
                                        // this.getRouters();

                                    }
                                }


                            }

                        )
                        return true;
                    } else {
                        this.$alert('请查看错误提示');
                        return false;
                    }
                });

            },
            regist(){
                this.$router.push('/register')
            },
            getcaptchaImage(){
                this.$getRepquest("/captchaImage").then(resp=>{
                    if (resp){
                        console.log(resp)
                        this.codeSrc='data:image/png;base64,'+resp.img;
                        this.loginForm.uuid = resp.uuid;
                        console.log(this.codeSrc)
                    }


                });
            },
            getUserInfo(){
                this.$getRepquest('getInfo').then(
                    resp =>{
                        if(resp){
                            console.log(resp)
                            window.sessionStorage.setItem("user",JSON.stringify(resp))
                            this.getRouters()
                        }

                    }
                );
            },
            getRouters(){
                this.$getRepquest("getRouters").then(
                    resp=>{
                        if (resp){
                            console.log(resp);
                            window.sessionStorage.setItem("router",JSON.stringify(resp))
                            this.$router.replace('/LBase')
                        }

                    }
                );
            }

        }
    }
</script>

<style scoped>
    .a{
        background-image: url("../../../assets/acct_creation_bg.jpg");
        height:100%;
        width: 100%;
    }
    .loginForm{
        /*position:absolute;*/
        left:30%;    /* 定位父级的50% */
        top:50%;
        /*transform: translate(-50%,-50%); !*自己的50% *!*/
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
        margin-top: 0px;
    }
</style>
