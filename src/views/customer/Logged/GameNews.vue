<template>
    <div>
        <h1 style="color: white">游戏新闻模块</h1>

        <div style="float: left" >
            <el-card v-for="item in News1" style="margin-top: 30px;width: 1000px;height: 230px"  v-loading="loading">
                <div style="width: 650px;height: 200px;float: left">
                    新闻
                    <div>
                        <el-link @click="NewsDetail(item)">{{item.title}}</el-link>
                        <br>

                        <br><svg-icon icon-class="eye"></svg-icon> {{item.viewNumber}}
                    </div>


                    <div style="margin-top: 50px">
                        {{item.author}}
                    </div>

                    <br>
                </div>

                <div style="float: left;width: 250px;height:230px">
                    <el-image :src="item.photo"  style="width: 250px;height:180px"></el-image>
                    <svg-icon icon-class="message"></svg-icon>   {{item.commentNumber}} <svg-icon icon-class="date"></svg-icon>{{item.createTime}}
                </div>

            </el-card>

            <el-pagination
                    v-show="total>0"
                    :total="total"
                    :current-page.sync="queryParams2.pageNum"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size.sync="queryParams2.pageSize"
                    layout="sizes, prev, pager, next"
                    @size-change="getList"
                    @current-change="getList"
                    style="margin-top: 20px"
            ></el-pagination>
        </div>

        <div style="float: right;margin-top: 30px">
            <el-image :src="require('../../../assets/09cef1246b600c3308e6a5a71e4c510fd8f9a16b.jpg')"></el-image><br>
        </div>

    </div>
</template>

<script>
    export default {
        name: "GameNews",
        data(){
          return{
              News1:[],
              total:0,
              queryParams2:{
                  pageNum: 1,
                  pageSize: 5,
                  categoryId:0,

              },
              loading:false,
          }
        },
        methods:{
            getList(){
                this.loading =true;
                this.$getRepquest("/news/list/",this.queryParams2).then(
                    response=>{
                        if (response){
                            this.News1 =  response.rows;
                            this.total = response.total;
                            this.loading =false;
                        }
                    }
                )
            },
            NewsDetail(row){
                console.log(row)

                this.$postRequest("/news/add/"+row.id).then()
                window.sessionStorage.setItem("form",JSON.stringify(row));
                        let query={
                            newsid:row.id,
                            pageNum: 1,
                            pageSize: 10,
                        }
                        this.$getRepquest('/newscomment/list',query).then( response=>{
                            if (response){
                                window.sessionStorage.setItem("comment",JSON.stringify(response.rows));
                                this.$router.replace('/News/NewDetail')
                            }
                        })
                    }
        },
        mounted() {

            this.queryParams2.pageNum =1,
            this.getList();
        }
    }
</script>

<style scoped>

</style>
