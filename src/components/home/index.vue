<template>
    <div>
        <div >
            <el-card style="width: 100%;height: 40%">
                <br>
                领取阿里云通用云产品1888优惠券<br>

                <el-link style="color: #3a8ee6">https://www.aliyun.com/minisite/goods?userCode=brki8iof</el-link>
                <br>

                领取腾讯云通用云产品2860优惠券<br>
                <el-link style="color: #b3e19d">https://cloud.tencent.com/redirect.php?redirect=1025&cps_key=198c8df2ed259157187173bc7f4f32fd&from=console</el-link>
                <br>
                阿里云服务器折扣区
                <el-link  style="color: #66b1ff" href="https://www.aliyun.com/minisite/goods?userCode=brki8iof">☛☛点我进入☚☚</el-link>
                <br>
                腾讯云服务器秒杀区
                <el-link  style="color: #409eff " href="https://cloud.tencent.com/act/cps/redirect?redirect=1062&cps_key=198c8df2ed259157187173bc7f4f32fd&from=console">☛☛点我进入☚☚</el-link>

                云产品通用红包，可叠加官网常规优惠使用。(仅限新用户)
            </el-card>

        </div>
        <div style="width: 70%;top: 50%;float: left" >
            <h2>游戏商城后台管理框架</h2>
            <div style="font-size:20px">
                该商城后台管理系统 为20172759 耿嘉新同学的毕业设计
                当前版本: v1.1.0
            </div>

        </div>

        <div style="width: 30%;float: left" >
            <div style="font-size:20px">
            技术选型
            后端技术
            SpringBoot
            Spring Security
            JWT
            MyBatis
            Druid
            Fastjson
            ...
            前端技术
            Vue
            Vuex
            Element-ui
            Axios
            Sass
            ...
                </div>
        </div>



        <div style="width:400px;margin-top: 100px">

            <el-card title="联系信息" >
                联系信息
                <hr></hr>
                <i class="el-icon-edit"></i>QQ:1335339044 <br>
                <i class="el-icon-share"></i>tel:18745781312<br>
                <i class="el-icon-delete"></i>支付宝:1335339044 <br>
                <i class="el-icon-delete"></i> 微信:18745781312<br>
            </el-card>

        </div>

        <div class="demo-image__lazy" style="height: 300px;margin-left: 350px">
            <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image>
        </div>
    </div>

</template>

<script>
    export default {
        name: "homeIndex",
        data() {
            return {
                urls: [
                    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                ]
            }
        }
    }
</script>

<style scoped>

</style>
