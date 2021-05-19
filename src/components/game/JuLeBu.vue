<template>
    <div style="width: 100%;height: 100%">
        <el-card  style="width: 60%;margin-left: 30%"  v-loading="loading">
            <div style="text-align: left;color: #B3C0D1">全部游戏 > 俱乐部 > <el-link @click="reset">
                {{console.gameName}}</el-link>
            </div>
            <div  >
                <el-avatar :src="console.gameImage"  style="width: 150px;height: 150px;float: left"></el-avatar>
                <div style="float: right">
                    {{console.remark}}
                </div>
            </div>
        </el-card>
        <el-card style="width: 60%;margin-left: 30%;margin-top: 2%">
                <el-button @click="openForm =true">发布文章</el-button>  <el-button @click="openForm=true">提问/求助</el-button>
        </el-card>
        <h1  style="margin-left: 30%">文章展示</h1>

        <div style="width: 60%;margin-left: 30%" >
            <el-button @click="getNews">新闻</el-button> <el-button @click="getNews1">测评</el-button > <el-button @click="getNews2">攻略</el-button> <el-button @click="getNews3">分享</el-button> <el-button @click="getNews4">提问</el-button>
            <el-card v-for="item in list" style="margin-top: 30px;width: 650px;height:150px"  v-loading="loading">
                <div style="width: 200px;height: 150px;float: left">
                    新闻资讯
                    <div>
                        <el-link @click="NewsDetail(item)">{{item.title}}</el-link>
                        <br><svg-icon icon-class="eye"></svg-icon> {{item.viewNumber}}
                    </div>


                    <div style="">
                        {{item.author}}
                    </div>

                    <br>
                </div>

                <div style="float: right">
                    <el-image :src="item.photo"  style="width: 100px;height:70px" @click="NewsDetail(item)"></el-image><br>
                    <svg-icon icon-class="message"></svg-icon>   {{item.commentNumber}} <svg-icon icon-class="date"></svg-icon>{{item.createTime}}
                </div>

            </el-card>

            <el-pagination
                    v-show="total>0"
                    :total="total"
                    :current-page.sync="queryParams.pageNum"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size.sync="queryParams.pageSize"
                    layout="sizes, prev, pager, next"
                    @size-change="getList"
                    @current-change="getList"
                    style="margin-top: 20px"
            ></el-pagination>
        </div>
        <el-dialog :title="title" :visible.sync="openForm" width="1500px" >
            <el-form ref="form" :model="form"  label-width="80px">
                <el-form-item label="游戏照片" prop="gameImage">
                    <el-image :src="form.photo"  ></el-image>
                    <el-upload
                            action="/api/console/imgUpload/"
                            list-type="picture-card"
                            accept="image/*"
                            :headers="header"
                            :limit="imgLimitEdit"
                            :file-list="productImgs"
                            :multiple="isMultiple"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :on-success="handleAvatarSuccess1"
                            :before-upload="beforeAvatarUpload"
                            :on-exceed="handleExceed"
                            :on-error="imgUploadError">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="文章分类" prop="categoryId">
                    <el-select  v-model="form.categoryId"
                                placeholder="操作类型"
                                clearable
                                size="small"
                                style="width: 240px">
                        <el-option v-for="dict in typeOptions"
                                   :key="dict.dictValue"
                                   :label="dict.dictLabel"
                                   :value="dict.dictValue">

                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="作者">
                    <el-input v-model="form.author"></el-input>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="游戏模块">
                    <el-input v-model="form.gameName"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <div class="edit_container">
                        <quill-editor
                                v-model="form.content"
                                ref="myQuillEditor"
                                :options="editorOption"
                                @change="onEditorChange($event)"
                        ></quill-editor>
                        <span v-on:click="saveHtml" class="button">保存</span>
                    </div>

                    <el-upload
                            class="avatar-uploader"
                            action="/api/console/imgUpload/"
                            name="file"
                            :headers="header"
                            :show-file-list="false"
                            :on-success="uploadSuccess"
                            :on-error="uploadError"
                            :before-upload="beforeUpload"
                    ></el-upload>

                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="openForm=false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "JuLeBu",
        data(){
            return{
                form:{
                    photo:undefined,
                    datetime:undefined,
                    viewNumber:0,
                    commentNumber:0,
                },
                openForm:false,
                title:'发布文章',
                header: {"Authorization":window.sessionStorage.getItem('token') },
                open:false,
                imageList:[],
                openUpload:false,
                dialogImageUrl: '',
                dialogVisible: false,
                productImgs: [],
                isMultiple: true,
                imgLimit: 6,
                imgLimitEdit: 1,
                uploadImg:{
                    gameId:undefined,
                    gameImage:undefined,
                },
                editorOption: {
                    placeholder: "",
                    theme: "snow", // or 'bubble'
                    modules: {
                        toolbar: {
                            container: this.$toolbarOptions,
                            handlers: {
                                image: function(value) {
                                    if (value) {
                                        // 触发input框选择图片文件
                                        document.querySelector(".avatar-uploader input").click();
                                    } else {
                                        this.quill.format("image", false);
                                    }
                                }
                            }
                        }
                    }
                },
                typeOptions:{},
                user:{},
                console:{},
                queryParams:{
                    pageNum: 1,
                    pageSize: 10,
                    title: undefined,
                    author: undefined,
                    categoryId:undefined
                },
                list:[],
                total:0,
                loading:false,
            }
        },
        mounted() {

            this.console = JSON.parse(window.sessionStorage.getItem("form"))
            console.log(this.console)
            this.$getDicts("sys_news_categoryId").then(response => {
                if (response){
                    this.typeOptions = response.data;
                }
            });
            this.user = JSON.parse(window.sessionStorage.getItem("user")).user
            console.log(this.user)
            this.form.author  = this.user.nickName
            this.form.createTime = new Date()
            this.form.gameName = this.console.gameName
            this.queryParams.gameName =  this.console.gameName
            this.getList()

        },
        methods:{
            getList(){
                this.loading = true
                this.$getRepquest('/news/list',this.queryParams).then(
                    response=>{
                        if (response){
                            this.list = response.rows;
                            this.total = response.total;
                            this.loading = false
                        }
                    }
                )
            },
            getNews(){
                this.queryParams.categoryId = 0;
                this.$getRepquest('/news/list',this.queryParams).then(
                    response=>{
                        if (response){
                            this.list = response.rows;
                            this.total = response.total;
                        }
                    }
                )
            },
            getNews1(){
                this.queryParams.categoryId = 1;
                this.loading =true
                setTimeout(()=>{
                        this.$getRepquest('/news/list',this.queryParams).then(
                            response=>{
                                if (response){
                                    this.list = response.rows;
                                    this.total = response.total;
                                    this.loading =false
                                }
                            }
                        )
                    }
                    ,500)
            },
            getNews2(){
                this.queryParams.categoryId = 2;
                this.loading =true
                setTimeout(()=>{
                        this.$getRepquest('/news/list',this.queryParams).then(
                            response=>{
                                if (response){
                                    this.list = response.rows;
                                    this.total = response.total;
                                    this.loading =false
                                }
                            }
                        )
                    }
                    ,500)
            },
            getNews3(){
                this.queryParams.categoryId = 3;
                this.loading =true
                setTimeout(()=>{
                        this.$getRepquest('/news/list',this.queryParams).then(
                            response=>{
                                if (response){
                                    this.list = response.rows;
                                    this.total = response.total;
                                    this.loading =false
                                }
                            }
                        )
                    }
                    ,500)
            },
            getNews4(){
                this.queryParams.categoryId = 4;
                this.loading =true
                setTimeout(()=>{
                        this.$getRepquest('/news/list',this.queryParams).then(
                            response=>{
                                if (response){
                                    this.list = response.rows;
                                    this.total = response.total;
                                    this.loading =false
                                }
                            }
                        )
                    }
                    ,500)


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

                // if (!isJPG) {
                //   this.$message.error('上传头像图片只能是 JPG 格式!');
                // }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            handleAvatarSuccess(res, file) {//图片上传成功
                let url ="/img/"+res.img
                this.imageUrl = URL.createObjectURL(file.raw);
                this.uploadImg.gameImage = url;
                this.$postRequest("/console/image/insert",this.uploadImg);
                this.getList()

            },
            //修改 添加游戏数据使用
            handleAvatarSuccess1(res, file) {//图片上传成功
                let url ="/img/"+res.img
                console.log(url)
                this.imageUrl = URL.createObjectURL(file.raw);
                this.form.photo = url;

            },
            handleExceed(files, fileList) {//图片上传超过数量限制
                this.$message.error('上传图片不能超过6张!');
                console.log(file, fileList);
            },
            handleExceedEdit(files, fileList) {//图片上传超过数量限制
                this.$message.error('上传图片不能超过1张!');
                console.log(file, fileList);
            },
            imgUploadError(err, file, fileList) {//图片上传失败调用
                console.log(err)
                this.$message.error('上传图片失败!');
            },
            handleRemove(file, fileList) {//移除图片
                console.log(file, fileList);
            },

            onEditorChange({ editor, html, text }) {
                //内容改变事件
                console.log("---内容改变事件---");
                this.content = html;
                console.log(html);
            },
            // 富文本图片上传前
            beforeUpload() {
                // 显示loading动画
                this.quillUpdateImg = true;
            },
            // 富文本图片上传失败
            uploadError() {
                // loading动画消失
                this.quillUpdateImg = false;
                this.$message.error("图片插入失败");
            },
            saveHtml: function(event) {
                alert(this.content);
            },
            uploadSuccess(res, file) {
                // res为图片服务器返回的数据
                // 获取富文本组件实例
                console.log(res);
                let quill = this.$refs.myQuillEditor.quill;
                // 如果上传成功
                if (res.code == 200) {
                    let length = quill.getSelection().index;
                    // 插入图片  res.url为服务器返回的图片地址
                    quill.insertEmbed(length, "image","/img/"+res.img);
                    // 调整光标到最后
                    quill.setSelection(length + 1);
                } else {
                    this.$message.error("图片插入失败");
                }
                // loading动画消失
                this.quillUpdateImg = false;
            },
            submitForm(){
                if (this.form.id != null && this.form.id !=''){
                    this.$confirm(
                        '确定删除修改游戏id为'+this.form.id+'的数据吗?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }
                    ).then(
                        ()=>{
                            console.log(this.form)
                            this.form.createTime = new Date(this.form.createTime).format("yyyy-MM-dd hh:mm:ss")
                            this.$putRequest('/news',this.form)
                            this.openForm =false;
                            this.getList()
                        }
                    )
                }
                else {
                    this.$confirm(
                        '确定要添加该的数据吗?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }
                    ).then(
                        ()=>{
                            this.form.tags =this.form.abstrs = this.form.title
                            this.form.userId = this.user.userId
                            this.form.createTime = new Date(this.form.createTime).format("yyyy-MM-dd hh:mm:ss")
                            this.$postRequest('/news',this.form).then(
                                response=>{
                                    if (response){
                                        this.form.userId = undefined
                                        this.openForm =false;
                                        this.getList()
                                    }
                                }
                            )

                        }
                    )
                }
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
            },
            reset(){
                this.loading =true
                setTimeout(()=>{
                        this.console = JSON.parse(window.sessionStorage.getItem("form"))
                        this.loading =false
                    }
                ,1000)

            }


        }

    }
</script>

<style scoped>
    .edit_container {
        width: 1200px;
        /*margin: 0px auto;*/
    }
    .edit_container >>> .ql-toolbar.ql-snow + .ql-container.ql-snow {
        width: 1200px;
        height: 600px;
        background-color: #fff;
    }
    .button {
        margin: 10px 0px 0px;
    }
</style>
