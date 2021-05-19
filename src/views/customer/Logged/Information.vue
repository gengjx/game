<template>
    <div class="information" >
        <div style="height: 100%;width: 100%">
            <div style="text-align: center;width: 100%;height: 5%">个人信息页面</div><br>
            <div style="height: 50%;width: 40%">
                <el-avatar :src="informationForm.avatar" style="margin-left: 20%" :size="300"></el-avatar><br>
                <el-upload

                        action="/api/console/imgUpload/"
                        list-type="picture-card"
                        accept="image/*"
                        :headers="header"
                        :limit="imgLimit"
                        :file-list="productImgs"
                        :multiple="isMultiple"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :on-exceed="handleExceed"
                        :on-error="imgUploadError"
                style="height: 10%;width: 10%;margin-left: 25%">
                    <i class="el-icon-plus"></i>
                </el-upload>
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
                productImgs: [],
                isMultiple: true,
                imgLimit: 6,
                header:{"Authorization":window.sessionStorage.getItem('token') },
                imageUrl:undefined,
                dialogFormVisible:false,
            }

        },
        methods:{
            edit(){
                if (this.informationForm.sex ==='女'){
                    this.informationForm.sex='1';
                }
                else{
                    this.informationForm.sex='2';
                }
                this.$putRequest('/system/user',this.informationForm).then(response=>{
                    if (response){
                        this.$confirm("修改成功是否立即刷新","提示",{
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(()=>{
                            this.$router.replace('/')
                            this.$getRepquest("/logout").catch(
                                resp=>{
                                    window.sessionStorage.setItem("token",null)
                                }
                            )
                        })
                    }

                });


            },
            handleRemove(file, fileList) {//移除图片
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {//预览图片时调用
                console.log(file);
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            beforeAvatarUpload(file) {//文件上传之前调用做一些拦截限制
                console.log(file);
                const isJPG = true;
                // const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            handleAvatarSuccess(res, file) {//图片上传成功
                console.log(res);
                console.log("file: "+file);
                this.imageUrl = URL.createObjectURL(file.raw);
                this.informationForm.avatar ='/img/'+ res.img
                this.productImgs = [];
            },
            handleExceed(files, fileList) {//图片上传超过数量限制
                this.$message.error('上传图片不能超过6张!');
                console.log(file, fileList);
            },
            imgUploadError(err, file, fileList) {//图片上传失败调用
                console.log(err)
                this.$message.error('上传图片失败!');
            },

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
