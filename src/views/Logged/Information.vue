<template>
    <div class="information" >
        <div style="height: 100%;width: 100%;">
            <div style="text-align: center;width: 100%;height: 5%">个人信息页面</div><br>
            <div style="height: 50%;width: 40%">
                <el-avatar :src="require('../../assets/user.jpg')" style="margin-left: 20%" :size="300"></el-avatar><br>
                <div style="height: 70%;width: 60%;margin-left: 20%;margin-top: 15%">
                    昵称:耿嘉新<br>
                    签名:一切都是最好的安排
                </div>
            </div>
            <div  class="three">
                资料卡  <el-button icon="el-icon-edit" type="primary" style="float: right" @click="edit()">修改</el-button>
                <el-card title="基本信息" style="background-color: #21262A;color: white;opacity:0.4;
        filter:alpha(opacity=100);border: 0px">
                    昵称<el-input ></el-input>
                    性别<el-input></el-input>
                    生日<el-input></el-input>
                    签名<el-input></el-input>
                </el-card>
                更多信息
                <el-card title="基本信息" style="background-color: #21262A;color: white;opacity:0.4;
        filter:alpha(opacity=100);border: 0px ">

                    邮箱:<br>
                    <el-input style="width: 500px"></el-input><br>
                    手机号:<br>
                    <el-input style="width: 500px"></el-input>
                </el-card>
            </div>
        </div>

    </div>

</template>

<script>
    export default {
        name: "Information",
        data(){
            return{
                imgsize:'100',
            }

        },
        methods:{
            edit(){
                this.$message("信息修改成功")
            }
        }
    }
</script>

<style scoped>
    .information{
        color: white;
        height: 100%;
        background-image: url("../../assets/timg.jpg");
    }
    .three{
        position: absolute;
        top: 20%;
        left: 40%;
        width: 25%;
    }
</style>
