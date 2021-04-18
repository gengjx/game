<template>
        <div class="a" >
                <div class="loginForm" style="text-align: center;width: 50%;margin-left: 35%;">
                    <b ><h1 style="text-align: center ;color: beige;font-size: 55px">管理端登录</h1></b>
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
        </div>

</template>

<script>
    export default {
        name: "ALogin",
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

                rules: {
                    username: [
                        { required: true, message: '请输入用户名称', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请选择输入密码', trigger: 'blur' }
                        ,{min:6,max:11,message: '密码在6到11位之间',trigger: 'blur'}
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
                                        this.getRouters();
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
                            this.$router.push('/Ahome')
                        }

                    }
                );
            }

        }
    }
</script>

<style scoped>
    .a{
        margin-top: 0px;
        height: 1200px;
        background-image: url("../../assets/acct_creation_bg.jpg");
    }

    /*}*/
</style>
