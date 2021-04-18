<template>
    <div class="information" >
        <div style="height: 100%;width: 100%">
            <div style="text-align: center;width: 100%;height: 5%">个人信息页面</div><br>
            <div style="height: 50%;width: 40%">
                <el-avatar :src="informationForm.avatar" style="margin-left: 20%" :size="300"></el-avatar><br>
                <div style="height: 70%;width: 60%;margin-left: 20%;margin-top: 15%">
                    昵称:{{informationForm.nickName}}<br>
                    签名:一切都是最好的安排
                </div>
            </div>

            <div  class="three">
                资料卡  <el-button icon="el-icon-edit" type="primary"  @click="edit()">修改</el-button>
                <el-card title="基本信息" style="background-color: #21262A;color: white;opacity:0.4;
        filter:alpha(opacity=100);border: 0px">
                    昵称<el-input v-model="informationForm.nickName"></el-input>
                    性别<el-input v-model="informationForm.sex"></el-input>
                    生日<el-input value="1999-09-13"></el-input>
                    签名<el-input value="一切都是最好的安排"></el-input>
                </el-card>
                更多信息
                <el-card title="基本信息" style="background-color: #21262A;color: white;opacity:0.4;
        filter:alpha(opacity=100);border: 0px ">

                    邮箱:<br>
                    <el-input style="width: 500px" v-model="informationForm.email"></el-input><br>
                    手机号:<br>
                    <el-input style="width: 500px" v-model="informationForm.phonenumber"></el-input>
                </el-card>
            </div>
        </div>

    </div>

</template>

<script>
    export default {
        name: "Information",
        mounted() {
            this.informationForm=JSON.parse(window.sessionStorage.getItem("user")).user
            if (this.informationForm.sex ==='1'){
                this.informationForm.sex='女';
            }
            else{
                this.informationForm.sex='男';
            }
        },
        data(){
            return{
                imgsize:'100',
                informationForm:{

                },
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
        background-image: url("../../../assets/timg.jpg");
    }
    .three{
        position: absolute;
        top: 20%;
        left: 40%;
        width: 25%;
    }
</style>
