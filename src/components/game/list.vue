<template>
    <div>
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="true" label-width="68px">
            <el-form-item label="游戏编码" prop="gameCode">
                <el-input
                        v-model="queryParams.gameCode"
                        placeholder="请输入游戏编码"
                        clearable
                        style="width: 240px;"
                        size="small"
                        @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="游戏名称" prop="gameName">
                <el-input
                        v-model="queryParams.gameName"
                        placeholder="请输入游戏名称"
                        clearable
                        style="width: 240px;"
                        size="small"
                        @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="类型" prop="businessType">
                <el-select
                        v-model="queryParams.businessType"
                        placeholder="操作类型"
                        clearable
                        size="small"
                        style="width: 240px"
                >
                    <el-option
                            v-for="dict in typeOptions"
                            :key="dict.dictValue"
                            :label="dict.dictLabel"
                            :value="dict.dictValue"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-select
                        v-model="queryParams.status"
                        placeholder="操作平台"
                        clearable
                        size="small"
                        style="width: 240px"
                >
                    <el-option
                            v-for="dict in platformOptions"
                            :key="dict.dictValue"
                            :label="dict.dictLabel"
                            :value="dict.dictValue"
                    />
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
            <el-table-column label="主图片" prop="gameImage">
                <template slot-scope="scope">
                     <el-image :src=scope.row.gameImage></el-image>
                </template>
            </el-table-column>
            <el-table-column label="主键id" align="center" prop="gameId" />
            <el-table-column label="游戏编码" align="center" prop="gameCode" />
            <el-table-column label="游戏名字" align="center" prop="gameName"   />
            <el-table-column label="游戏类型" align="center" prop="gameLable" :formatter="fromtter" />
            <el-table-column label="操作平台" align="center" prop="gameOperatorType" :formatter="platfromtter" />
            <el-table-column label="游戏语言" align="center" prop="gameLanguage" width="130" :formatter="Languagefromtter" />
            <el-table-column label="发行商" align="center" prop="gameCreater" :show-overflow-tooltip="true" />
            <el-table-column label="基本描述" align="center" prop="remark"  />
            <el-table-column label="发行时间" align="center" prop="gameCreateTime" width="180">

            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-view"
                            @click="handleView(scope.row,scope.index)"
                    >壁纸详细</el-button>

                    <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-view"
                            @click="handleUpload(scope.row,scope.index)"
                    >壁纸上传</el-button>


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
                :page-sizes="[5, 10, 15, 20]"
                :page-size.sync="queryParams.pageSize"
                layout="sizes, prev, pager, next"
                @size-change="getList"
                @current-change="getList"

        >
        </el-pagination>
        <!-- 操作日志详细 -->
        <el-dialog title="壁纸详情" :visible.sync="open" width="700px" append-to-body>

            <el-carousel height="500px">
                <el-carousel-item v-for="url in imageList"  :key="url.sysPictureId">
                    <el-image  :key="url.gameImage" :src="url.gameImage" @click="deletePicture(url.sysPictureId)" ></el-image>
                </el-carousel-item>
            </el-carousel>
        </el-dialog>


        <el-dialog title="壁纸上传" :visible.sync="openUpload" width="700px" append-to-body>
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
                    :on-error="imgUploadError">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-dialog>

        <el-dialog :title="title" :visible.sync="openForm" width="600px" >
            <el-form ref="form" :model="form"  label-width="80px">
                        <el-form-item label="游戏照片" prop="gameImage">
                            <el-image :src="form.gameImage" @change="testx" ></el-image>
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
                        <el-form-item label="游戏编码" prop="gameCode">
                            <el-input v-model="form.gameCode" ></el-input>
                        </el-form-item>
                        <el-form-item label="游戏名字" prop="gameName">
                            <el-input v-model="form.gameName"  @change="testx"></el-input>
                        </el-form-item>
                        <el-form-item label="游戏类型" >
                            <el-select v-model="form.LabelIds" multiple @change="testx" >
                                <el-option
                                        v-for="item1 in typeOptions"
                                        :key="item1.dictValue"
                                        :label="item1.dictLabel"
                                        :value="item1.dictValue"
                                        :disabled="item1.status == 1"
                                ></el-option>
                            </el-select>

                        </el-form-item>

                        <el-form-item label="游戏平台" >
                            <el-select v-model="form.platformids" multiple placeholder="请选择" @change="testx">
                                <el-option
                                        v-for="item2 in platformOptions"
                                        :key="item2.dictValue"
                                        :label="item2.dictLabel"
                                        :value="item2.dictValue"
                                >

                                </el-option>

                            </el-select>

                        </el-form-item>

                        <el-form-item label="游戏平台" >
                            <el-select v-model="form.LanaugeIds" multiple placeholder="请选择" @change="testx">
                                <el-option
                                        v-for="item3 in this.LanaugeOptions"
                                        :key="item3.dictValue"
                                        :label="item3.dictLabel"
                                        :value="item3.dictValue"
                                ></el-option>
                            </el-select>

                        </el-form-item>

                        <el-form-item label="游戏发行商"  prop="gameCreater" >
                            <el-input v-model="form.gameCreater"></el-input>
                        </el-form-item>
                        <el-form-item label="游戏发行时间" prop="gameCreateTime" >
                            <el-date-picker type="datetime" v-model="form.gameCreateTime"></el-date-picker>
                        </el-form-item>
                        <el-col>
                            <el-form-item label="游戏描述" prop="remark" >
                                <el-input v-model="form.remark"></el-input>
                            </el-form-item>
                        </el-col>
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
        name: "consolelist",
        data(){
            return{
                title:undefined,
                queryParams:{
                    pageNum: 1,
                    pageSize: 5,
                    gameCode: undefined,
                    gameName: undefined,
                    gameLable: undefined,


                },
                dateRange:[],
                statusOptions:[],
                list:[],
                total:0,
                typeOptions:[],
                LanaugeOptions:[],
                platformOptions:[],
                multipleSelection:[],
                ids:[],
                form:{
                    LabelIds:[],
                    platformids:[],
                    LanaugeIds:[],
                    gameCreater:'',
                    gameCode:'',
                    gameName:'',
                    gameImage:undefined,
                    gameCreateTime:undefined,
                    gameLable:undefined,
                    gameOperatorType:undefined,
                    gameLanguage:undefined,
                },
                open:false,
                imageList:[],
                openUpload:false,
                dialogImageUrl: '',
                dialogVisible: false,
                productImgs: [],
                isMultiple: true,
                imgLimit: 6,
                imgLimitEdit: 1,
                header:{"Authorization":window.sessionStorage.getItem('token') },
                uploadImg:{
                    gameId:undefined,
                    gameImage:undefined,
                },
                openForm:false,
            }
        },
        methods:{
            handleQuery(){
                this.getList()
            },
            resetQuery(){
                this.queryParams = {
                    pageNum: 1,
                        pageSize: 5,
                        gameCode: undefined,
                        gameName: undefined,
                        gameLable: undefined,

                }
            },
            getList(){
                this.$getRepquest('/console/list',this.queryParams).then(
                    response=>{
                        if (response){
                            this.list = response.rows;
                            this.total = response.total;
                        }
                    }
                )
            },
            handleSelectionChange(val) {
                this.ids = val.map(item => item.gameId)
            },
            handleDelete(row) {
                const userIds = row.gameId || this.ids;
                this.$confirm('是否确认删除用户编号为"' + userIds + '"的数据项?', "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$deleteRequest('/console/'+userIds)
                    this.$message("删除成功");
                    this.getList();
                    location.reload();
                })
            },
            handleClean(){

                this.$confirm('是否要清空所有数据项', "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.cleanfor()
                    this.getList();

                })

            },
            delLogininfor(operIds){
                this.$deleteRequest('/monitor/operlog/'+operIds).then(response=>{
                    if (response){
                        this.$message("删除成功")
                    }
                })
            },
            cleanfor(){
                this.$deleteRequest('/monitor/operlog/clean').then(response=>{
                    if (response){
                        this.$message("删除成功")
                    }
                })
            },
            handleView(row){
                // this.form =row;

               this.$postRequest('/console/image/'+row.gameId).then(response=>{
                   if (response){
                       console.log(response);
                       this.imageList = response.imgs;
                   }
               })
                this.open =true
            },
            handleUpload(row){
                this.openUpload =true;
                this.uploadImg.gameId = row.gameId;
            },

            //删除壁纸
            deletePicture(id){
                console.log(id)
                this.$confirm('确定删除该壁纸吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(
                    ()=> {
                        this.$deleteRequest('/console/image/'+id)
                        this.$message("删除")
                        this.getList();
                    }
                )
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
                this.form.gameImage = url;

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
            fromtter(row){
                let  t =[];
                   t= row.gameLable.toString().split(',');
                let newlable='';
                for (let i=0;i<t.length;i++){
                    newlable+=this.$statusFormat(this.typeOptions, t[i])+" "
                }

                return newlable;
            },


            platfromtter(row){
                let  t =[];
                t= row.gameOperatorType.toString().split(',');
                let newlable='';
                for (let i=0;i<t.length;i++){
                    newlable+=this.$statusFormat(this.platformOptions, t[i])+" "

                }

                return newlable;
            },
            Languagefromtter(row){
                let  t =[];
                t= row.gameLanguage.toString().split(',');
                let newlable='';
                for (let i=0;i<t.length;i++){
                    newlable+=this.$statusFormat(this.LanaugeOptions, t[i])+" "

                }

                return newlable;
            },

            handleInsert(){
                this.form= {
                    LabelIds:[],
                        platformids:[],
                        LanaugeIds:[],
                        gameCreater:'',
                        gameCode:'',
                        gameName:'',
                        gameImage:undefined,
                        gameCreateTime:undefined,
                        gameLable:undefined,
                        gameOperatorType:undefined,
                        gameLanguage:undefined,
                };
                this.openForm =true;

            },
            handleView2(row){
                this.openForm =true;
                if (row !=null){
                    this.form = row
                    this.title = '修改'
                    this.form.LabelIds = row.gameLable.split(",");
                    this.form.platformids = row.gameOperatorType.split(",");
                    this.form.LanaugeIds = row.gameLanguage.split(",");
                }


            },
            submitForm(){
                if (this.form.gameId != null && this.form.gameId !=''){
                    this.$confirm(
                        '确定删除修改游戏id为'+this.form.gameId+'的数据吗?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }
                    ).then(
                        ()=>{
                            this.form.gameLable ='';
                            for (let i =0;i<this.form.LabelIds.length;i++){
                                this.form.gameLable+=this.form.LabelIds[i]+",";
                            }
                            this.form.gameLable = this.form.gameLable.substring(0,this.form.gameLable.length-1)
                            this.form.gameOperatorType ='';
                            for (let i =0;i<this.form.platformids.length;i++){
                                this.form.gameOperatorType+=this.form.platformids[i]+",";
                            }
                            this.form.gameOperatorType = this.form.gameOperatorType.substring(0,this.form.gameOperatorType.length-1)
                            this.form.gameLanguage ='';
                            for (let i =0;i<this.form.LanaugeIds.length;i++){
                                this.form.gameLanguage+=this.form.LanaugeIds[i]+",";
                            }
                            this.form.gameLanguage = this.form.gameLanguage.substring(0,this.form.gameLanguage.length-1)
                            console.log(this.form)
                            this.form.gameCreateTime = new Date(this.form.gameCreateTime).format("yyyy-MM-dd hh:mm:ss")
                            this.$putRequest('/console',this.form)
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
                            this.form.gameLable ='';
                            for (let i =0;i<this.form.LabelIds.length;i++){
                                this.form.gameLable+=this.form.LabelIds[i]+",";
                            }
                            this.form.gameLable = this.form.gameLable.substring(0,this.form.gameLable.length-1)
                            this.form.gameOperatorType ='';
                            for (let i =0;i<this.form.platformids.length;i++){
                                this.form.gameOperatorType+=this.form.platformids[i]+",";
                            }
                            this.form.gameOperatorType = this.form.gameOperatorType.substring(0,this.form.gameOperatorType.length-1)
                            this.form.gameLanguage ='';
                            for (let i =0;i<this.form.LanaugeIds.length;i++){
                                this.form.gameLanguage+=this.form.LanaugeIds[i]+",";
                            }
                            this.form.gameLanguage = this.form.gameLanguage.substring(0,this.form.gameLanguage.length-1)
                            console.log(this.form)
                            this.form.gameCreateTime = new Date(this.form.gameCreateTime).format("yyyy-MM-dd hh:mm:ss")
                            this.$postRequest('/console',this.form)
                            this.openForm =false;
                            this.getList()
                        }
                    )
                }
            },
            cancel(){
                this.openForm =false
            },
            testx(){
                this.$forceUpdate()
            }

        }
        ,
        created() {
            this.getList();
            this.$getDicts("sys_console_platform").then(response => {
                if (response){
                    this.platformOptions = response.data;
                }

            });
            this.$getDicts("sys_console_type").then(response => {
                if (response){
                    this.typeOptions = response.data;
                }
            });

            this.$getDicts("sys_console_lanuage").then(response => {
                if (response){
                    this.LanaugeOptions = response.data;
                }

            });
        }
    }
</script>

<style scoped>

</style>
