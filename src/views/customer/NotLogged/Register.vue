<template>
    <div class="background">
        <div style="height: 100%;width: 40%;float: left;margin-left: 25%">
            <div style="font-size: 52px;margin-top: 80px"> 创建账户</div><br>
            <el-form :model="RegisterFrom" ref="RegisterFrom" :rule="rules" :label-position="label_position" class="RegisterFrom" >

                <el-form-item  label="手机号" prop="username">
                    <el-input   v-model="RegisterFrom.username"  >     </el-input>
                </el-form-item>
                <el-form-item  label="密码" prop="password">
                    <el-input type="password"   v-model="RegisterFrom.password"   >     </el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="code" >
                         <el-input style="height: 50px" v-model="RegisterFrom.code"></el-input>

                </el-form-item>
                <el-form-item>
                    <el-image style="margin-left: 30%" :src="codeSrc" @click="getcaptchaImage"></el-image>
                    <el-link @click="getcaptchaImage" style="float: left">看不清楚,换一张</el-link>
                </el-form-item>

                <el-form-item  style="text-align: center">
                    <el-button @click="create('RegisterFrom')">创建账户</el-button>
                </el-form-item>

            </el-form>



        </div>

    </div>
</template>

<script>
    export default {
        name: "Register",
        data(){
            return{
                codeSrc:'',
                RegisterFrom:{
                    username:'',
                    password:'',
                    code:'',
                    uuid:undefined
                },
                label_position :  'top',
                rules: {
                    username: [
                        { required: true, message: '请输入用户名称', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请选择输入密码', trigger: 'blur' }
                    ],
                }


            }
        },
        mounted() {
            this.getcaptchaImage();
        },
        methods:{
            create(RegisterFrom){

                this.$refs[RegisterFrom].validate((valid) => {
                    if (valid) {
                        this.register()
                        this.$router.push('/Login')
                        return true;
                    } else {
                        this.$alert('请查看错误提示');
                        return false;
                    }
                });


            },
            getcaptchaImage(){
                this.$getRepquest("/captchaImage").then(resp=>{
                    console.log(resp)
                    this.codeSrc='data:image/png;base64,'+resp.img;
                    this.RegisterFrom.uuid = resp.uuid;

                    console.log(this.codeSrc)

                });
            },
            register(){
                this.$postRequest('/register',this.RegisterFrom).then(
                    response=>{
                        if (response){
                        }

                    }
                )
            }
        }
    }
</script>

<style scoped>
    .background{
        background-image: url("../../../assets/acct_creation_bg.jpg");
        height: 100%;
        width: 100%;
        color: white;
    }
    .RegisterFrom{
        font-size: 100px;
        color: white;
        width: 50%;


    }
</style>
