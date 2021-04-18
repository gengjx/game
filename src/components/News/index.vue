<template>
        <div>


                <div class="edit_container">
                        <quill-editor
                                v-model="content"
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


        </div>
</template>

<script>
        export default {
                name: "districtActive",
                components: {},
                data() {
                        return {
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
                        };
                },
                mounted() {
                        //初始化编辑器文字提示
                        autotip: {
                                document.getElementsByClassName("ql-editor")[0].dataset.placeholder = "";
                                for (let item of this.$titleConfig) {
                                        let tip = document.querySelector(".quill-editor " + item.Choice);
                                        if (!tip) continue;
                                        tip.setAttribute("title", item.title);
                                }
                        }
                },
                methods: {
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
                        }
                }
        };
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
