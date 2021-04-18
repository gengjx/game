<template>
    <div>
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="true" label-width="68px">
            <el-form-item label="新闻标题" prop="title">
                <el-input
                        v-model="queryParams.title"
                        placeholder="请输入新闻标题"
                        clearable
                        style="width: 240px;"
                        size="small"
                        @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="文章作者" prop="author">
                <el-input
                        v-model="queryParams.author"
                        placeholder="请输入新闻作者"
                        clearable
                        style="width: 240px;"
                        size="small"
                        @keyup.enter.native="handleQuery"
                />
            </el-form-item>

            <el-form-item label="文章分类" prop="categoryId">
                <el-select  v-model="queryParams.categoryId"
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

            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                        type="danger"
                        plain
                        icon="el-icon-delete"
                        size="mini"
                        @click="handleDelete"
                >删除</el-button>

                <el-button
                        type="danger"
                        plain
                        icon="el-icon-delete"
                        size="mini"
                        @click="handleInsert"
                >添加</el-button>
            </el-col>
        </el-row>

        <el-table  :data="list" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="主图片" prop="photo">
                <template slot-scope="scope">
                    <el-image :src=scope.row.photo></el-image>
                </template>
            </el-table-column>
            <el-table-column label="主键id" align="center" prop="id" />
            <el-table-column label="标题" align="center" prop="title" />
            <el-table-column label="分类" align="center" prop="categoryId" :formatter="fromtter" />
            <el-table-column label="摘要" align="center" prop="abstrs"   />
            <el-table-column label="标签" align="center" prop="tags"   />
            <el-table-column label="标签" align="center" prop="author"   />
            <el-table-column label="作者" align="center" prop="viewNumber"   />
            <el-table-column label="评论数" align="center" prop="commentNumber"   />
            <el-table-column label="操作" align="center" >
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-view"
                            @click="handleView(scope.row,scope.index)"
                    >文章详情</el-button>
                    <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-view"
                            @click="handleView2(scope.row,scope.index)"
                    >游戏编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                v-show="total>0"
                :total="total"
                :current-page.sync="queryParams.pageNum"
                :page-sizes="[10, 20, 30, 40]"
                :page-size.sync="queryParams.pageSize"
                layout="sizes, prev, pager, next"
                @size-change="getList"
                @current-change="getList"

        >
        </el-pagination>
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
                <el-form-item label="摘要">
                        <textarea v-model="form.abstrs"></textarea>
                </el-form-item>
                <el-form-item label="标签">
                    <el-input v-model="form.tags"></el-input>
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

                <el-form-item label="浏览数">
                    <el-tag style="width: 80px" type="success">{{form.viewNumber}}</el-tag>
                </el-form-item>
                <el-form-item label="评论数">
                    <el-tag  style="width: 80px" type="success">{{form.commentNumber}}</el-tag>
                </el-form-item>

                <el-form-item label="创建时间">
                    <el-date-picker type="datetime"    v-model="form.createTime"></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Newslist",
        data(){
            return{
                ids:[],
                queryParams:{
                    pageNum: 1,
                    pageSize: 10,
                    title: undefined,
                    author: undefined,
                    categoryId:undefined
                },
                list:[],
                typeOptions:[],
                openForm:false,
                form:{},
                title:undefined,
                total:undefined,
                quillUpdateImg: false,
                content: null,
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
            }
        },
        methods:{
            handleQuery(){
                this.getList()
            },
            resetQuery(){
                this.queryParams = {
                    pageNum: 1,
                    pageSize: 10,
                    title: undefined,
                    author: undefined,
                }
            },
            getList(){
                this.$getRepquest('/news/list',this.queryParams).then(
                    response=>{
                        if (response){
                            this.list = response.rows;
                            this.total = response.total;
                        }
                    }
                )
            },
            //删除
            handleDelete(row){
                const newsIds = row.id || this.ids;
                this.$confirm('是否确认删除文章编号为"' + newsIds + '"的数据项?', "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$deleteRequest('/news/'+newsIds)
                    this.$message("删除成功");
                    this.getList();
                })
            },
            //添加
            handleInsert(){
                this.form ={

                    categoryId:undefined,

                    /**
                     * 标题
                     */
                    title:undefined,

                    /**
                     * 摘要
                     */
                    abstrs:undefined,

                    /**
                     * 标签
                     */
                    tags:undefined,

                    /**
                     * 主页照片
                     */
                    photo:undefined,

                    /**
                     * 作者
                     */
                    author:undefined,

                    /**
                     * 内容
                     */
                    content:undefined,

                    /**
                     * 浏览数
                     */
                    viewNumber:0,

                    /**
                     * 评论数
                     */
                    commentNumber:0,

                    /**
                     * 创建时间
                     */
                    createTime:undefined,
                }
                this.openForm =true;
            },
            //选中改变
            handleSelectionChange(val){
                this.ids = val.map(item => item.id)
            },
            handleView(row){
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
            fromtter(row){
                let  t =[];
                if (row.categoryId != null && row.categoryId.isString){
                    t= row.categoryId.toString().split(',');
                    if (t != null) {
                        let newlable = '';
                        for (let i = 0; i < t.length; i++) {
                            newlable += this.$statusFormat(this.typeOptions, t[i]) + " "
                        }

                        return newlable;
                    }
                }

                    return row.categoryId;

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
            // 富文本图片上传失败
            uploadError() {
                // loading动画消失
                this.quillUpdateImg = false;
                this.$message.error("图片插入失败");
            },
            saveHtml: function(event) {
                alert(this.content);
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
            handleView2(row){
                this.form = row;
                this.openForm =true;
                // //初始化编辑器文字提示
                // autotip: {
                //     document.getElementsByClassName("ql-editor")[0].dataset.placeholder = "";
                //     for (let item of this.$titleConfig) {
                //         let tip = document.querySelector(".quill-editor " + item.Choice);
                //         if (!tip) continue;
                //         tip.setAttribute("title", item.title);
                //     }
                // }
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
                            this.form.createTime = new Date(this.form.createTime).format("yyyy-MM-dd hh:mm:ss")
                            this.$postRequest('/news',this.form)
                            this.openForm =false;
                            this.getList()
                        }
                    )
                }
            },
            cancel(){
                this.openForm =false;
            }
        },
        created() {
            this.getList();
            this.$getDicts("sys_news_categoryId").then(response => {
                if (response){
                    this.typeOptions = response.data;
                }
            });

        },
        mounted() {

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
