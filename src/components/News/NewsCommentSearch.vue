<template>
    <div>
        <div style="margin-left: 30%">
            <el-avatar :src="comment.photo" style="width: 75px;height: 75px" ></el-avatar>
            <span style="color: yellow">{{comment.nickname}} </span>
            <el-card style="width: 60%" v-model="loading">
                <el-tag  v-show="comment.gametype !=null"> {{comment.gametype}} </el-tag>
                <el-tag  v-show="comment.grade !=null" > {{comment.grade}} </el-tag>
                <el-tag  v-show="comment.createtime !=null" > {{comment.createtime}} </el-tag>
                点赞数:<el-tag  v-show="comment.likeNumber != null">{{comment.likeNumber}}</el-tag>
                评论数<el-tag  v-show="comment.commentNumber != null">{{comment.commentNumber}}</el-tag>
                <span style="margin-left: 30%">
                    <span style="color: #b3e19d" v-show="on==false">点个赞吧: <el-button class="el-icon-star-off"  @click="dianzan"></el-button></span>
                   <span style="color: #b3e19d" v-show="on==true" >已点赞: <el-button class="el-icon-star-on" @click="dianzan" ></el-button></span>
                </span>
            </el-card>

            <div style="color: dodgerblue;height: 35%;margin-top: 3%"   >
                <el-tag>评价内容：</el-tag>
                <el-card title="评价内容" style="width: 60%;height:300px" v-model="loading">

                    {{comment.content}}
                </el-card>

            </div>
            <div style="width:60%;margin-top: 3%"  v-show="this.comment.userid != this.user.userId&&this.item.userid != this.user.userId">
                <span style="color: yellow;">我来说一句:</span><el-input style="width:59%;" v-model="form.content"  ></el-input><el-button @click="add">确认评论</el-button>
            </div>
            <div style="text-align: left;width: 60%" v-show="item.id != undefined" >
                评论足迹
                <el-card title="我的评论足迹" v-show="item.id != undefined" v-model="loading" >

                <span v-show="item.id != undefined" >
                    <el-avatar :src="this.item.photo" ></el-avatar>{{item.nickname}}
                    <el-tag  v-show="item.createtime !=null" > {{item.createtime}} </el-tag>
                                        <el-link @click="open =true">修改评论</el-link>             <el-link @click="deletec" >删除评论</el-link>
                                        <el-button @click="commentDetail(item)">详情查看</el-button>
                </span>
                    <div v-show="item.id != undefined">
                        <el-card style="width: 600px;height: 130px">
                            {{item.content}}
                        </el-card>
                    </div>
                </el-card>

            </div>

            <div style="margin-top: 1%" >
                <h1>玩家评论</h1>

                <div style="margin-top:1% ;text-align: left;width: 60%">
                    <el-card v-for="item in comments">
                <span >
                    <el-avatar :src="item.photo" ></el-avatar>{{item.nickname}}
                    <el-tag  v-show="item.gametype !=null"> {{item.gametype}} </el-tag>
                    <el-tag  v-show="item.grade !=null" > {{item.grade}} </el-tag>
                    <el-tag  v-show="item.createtime !=null" > {{item.createtime}} </el-tag>
                    <el-button @click="commentDetail(item)">详情查看</el-button>
                </span>
                        <div>
                            <el-card style="width: 600px;height: 130px">
                                {{item.content}}
                            </el-card>
                        </div>
                    </el-card>
                </div>
            </div>

        </div>
        <el-dialog :visible.sync="open" style="text-align: left" title="修改评论内容" >
            <el-card>
                <textarea style="width: 1200px;height: 75px" v-model="item.content">

                </textarea>
                <el-button @click="handlerEdit">修改</el-button>
            </el-card>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "NewsCommentSearch",
        data(){
            return{
                comment:{},
                comments:[],
                form:{
                    newsid:undefined,
                    nickname:undefined,
                    content:undefined,
                    createtime:undefined,
                    photo:undefined,
                    userid:undefined,
                },
                total:undefined,
                user:{
                    userId:undefined
                },
                item:{
                    newsid:undefined,
                    nickname:undefined,
                    content:undefined,
                    createtime:undefined,
                    photo:undefined,
                    userid:-1,
                },
                open:false,
                on:false,
                like:{},
                loading:false
            }
        },
        methods:{
            dianzan(){
                if (this.on==false){
                    this.on = true
                    this.comment.likeNumber = this.comment.likeNumber+1
                    this.$putRequest('/newscomment',this.comment)
                    this.getList()

                    let query={
                        consolenewsid:this.comment.id,
                        userid:this.user.userId
                    }

                    this.$postRequest('/newcommentlike',query).then(
                        response=>{
                            if (response){

                            }
                        }
                    )

                }
                else {
                    this.on =false;
                    this.comment.likeNumber =    this.comment.likeNumber-1
                    this.$putRequest('/newscomment',this.comment)
                    this.$deleteRequest('/newcommentlike/'+this.like.id)
                    this.getList()
                }
            },
            getList(){

                let query ={
                    pageNum:1,
                    pageSize:5,
                    parentId:this.comment.id
                }
                this.comments =[]
                this.$getRepquest('/newscomment/list',query).then(
                    response=>{
                        if (response){
                            if (response.code === 200){
                                this.comments = response.rows;
                                this.total  = response.total;
                            }
                        }
                    }
                )
                let query1 ={
                    pageNum:1,
                    pageSize:5,
                    parentId:this.comment.id,
                    userid: this.user.userId,
                }
                this.item={}
                this.$getRepquest('/newscomment/list',query1).then(
                    response=>{
                        if (response){
                            if (response.code === 200&& response.rows.length>0){
                                this.item = response.rows[0];
                            }
                        }
                    }
                )

                let query2 ={
                    pageNum:1,
                    pageSize:5,
                    id :this.comment.id
                }
                this.$getRepquest('/newscomment/list',query2).then(
                    response=>{
                        if (response){
                            if (response.code === 200&& response.rows.length>0){
                                this.comment = response.rows[0];
                                let query3={
                                    consolenewsid:this.comment.id,
                                    userid:this.user.userId
                                }
                                this.$getRepquest('/newcommentlike/list',query3).then(
                                    response=>{
                                        if (response){
                                            if (response.rows.length>0){
                                                this.on =true
                                                this.like = response.rows[0]
                                            }
                                            else {
                                                this.on =false
                                            }
                                        }
                                    }
                                )
                            }
                        }
                    }
                )

            },
            add(){
                this.form.createtime = new Date().format("yyyy-MM-dd hh:mm:ss");
                this.$postRequest('/newscomment',this.form).then(response=>{
                    if (response.code===200){

                        this.comment.commentNumber =    this.comment.commentNumber+1
                        this.$putRequest('/newscomment',this.comment).then(
                            ()=>{
                                this.getList()
                            }
                        )
                    }
                })
            },
            commentDetail(item){

                this.comment = item,
                    this.form.parentId = this.comment.id;
                this.form.newsid = this.comment.newsid;
                let user = JSON.parse(window.sessionStorage.getItem("user")).user
                this.form.nickname = user.nickName
                this.form.userid= user.userid;
                this.form.photo = user.avatar
                this.getList();
            },

            edit(){
                this.open = true
            },
            handlerEdit(){
                this.open = false
                this.$confirm('确定修改该条消息吗 ?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(
                    ()=>{
                        this.$putRequest('/newscomment',this.item)
                        this.getList()
                    }
                ).then(()=>{
                    this.open =false
                })
            },
            deletec(){
                this.$deleteRequest('/newscomment/'+this.item.id).then()
                this.item.id = undefined
                this.comment.commentNumber =    this.comment.commentNumber-1
                this.$putRequest('/newscomment',this.comment)
                setTimeout(()=>{
                    this.getList()
                },500)


            },
        },
        mounted() {
            this.comment = JSON.parse(window.sessionStorage.getItem("newsCommentDeatail"))
            this.comments = [],
            this.form.parentId = this.comment.id;
            this.form.newsid = this.comment.newsid;
            this.user = JSON.parse(window.sessionStorage.getItem("user")).user
            this.form.nickname =this.user.nickName
            this.form.userid= this.user.userId;
            this.form.photo = this.user.avatar
            let query ={
                pageNum:1,
                pageSize:5,
                parentId:this.comment.id
            }
            this.$getRepquest('/newscomment/list',query).then(
                response=>{
                    if (response){
                        if (response.code === 200){
                            this.comments = response.rows;
                            this.total  = response.total;
                        }
                    }
                }
            )

            let query1 ={
                pageNum:1,
                pageSize:5,
                parentId:this.comment.id,
                userid: this.user.userId,
            }
            this.$getRepquest('/newscomment/list',query1).then(
                response=>{
                    if (response){
                        if (response.code === 200&& response.rows.length>0){
                            this.item = response.rows[0];
                        }
                    }
                }
            )

            let query2 ={
                pageNum:1,
                pageSize:5,
                id :this.comment.id
            }
            this.$getRepquest('/newscomment/list',query2).then(
                response=> {
                    if (response) {
                        if (response.code === 200 && response.rows.length > 0) {
                            this.comment = response.rows[0];
                        }
                    }
                }
            )

            let query3={
                consolenewsid:this.comment.id,
                userid:this.user.userId
            }
            this.$getRepquest('/newcommentlike/list',query3).then(
                response=>{
                    if (response){
                        if (response.rows.length>0){
                            this.on =true
                            this.like = response.rows[0]
                        }
                        else {
                            this.on =false
                        }
                    }
                }
            )
        }

    }
</script>

<style scoped>

</style>
