<template>
    <div class="background">
        <div style="height: 100%;width: 40%;float: left;margin-left: 25%">
            <div style="font-size: 52px;margin-top: 80px"> 创建账户</div><br>
            <el-form :model="RegisterFrom" ref="RegisterFrom"  :label-position="label_position" class="RegisterFrom" >
                <el-form-item  label="手机号">
                    <el-input   v-model="RegisterFrom.userName"  >     </el-input>
                </el-form-item>
                <el-form-item  label="密码">
                    <el-input type="password"   v-model="RegisterFrom.Password"   >     </el-input>
                </el-form-item>
                <el-form-item label="验证码">
                         <el-input style="height: 50px"></el-input>
                    <el-image style="margin-left: 30%" :src="require('../../assets/logo.png')"></el-image>
                    <el-link>看不清楚,换一张</el-link>
                </el-form-item>
                <el-form-item  style="text-align: center">
                    <el-button >创建账户</el-button>
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

                RegisterFrom:{
                    userName:'18745781312',
                    Password:'wgjx913886'
                },
                label_position :  'top'
            }
        }
    }
</script>

<style scoped>
    .background{
        background-image: url("../../assets/acct_creation_bg.jpg");
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
