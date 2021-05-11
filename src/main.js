import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {Message} from "element-ui";
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import {getRequest,postRequest,deleteRequest,putRequest,handleTree,statusFormat, addDateRange,getDicts} from "./utils/api";
import axios from 'axios'
import './icons'
import VueQuillEditor  from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import TrendChart from "vue-trend-chart";

Vue.use(TrendChart);
Vue.use(VueQuillEditor);
//全局定义文本框的功能和文字提示
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["image"],
  ["clean"]
];
const titleConfig = [
  { Choice: ".ql-bold", title: "加粗" },
  { Choice: ".ql-italic", title: "斜体" },
  { Choice: ".ql-underline", title: "下划线" },
  { Choice: ".ql-header", title: "段落格式" },
  { Choice: ".ql-strike", title: "删除线" },
  { Choice: ".ql-blockquote", title: "块引用" },
  { Choice: ".ql-code", title: "插入代码" },
  { Choice: ".ql-code-block", title: "插入代码段" },
  { Choice: ".ql-font", title: "字体" },
  { Choice: ".ql-size", title: "字体大小" },
  { Choice: '.ql-list[value="ordered"]', title: "编号列表" },
  { Choice: '.ql-list[value="bullet"]', title: "项目列表" },
  { Choice: ".ql-direction", title: "文本方向" },
  { Choice: '.ql-header[value="1"]', title: "h1" },
  { Choice: '.ql-header[value="2"]', title: "h2" },
  { Choice: ".ql-align", title: "对齐方式" },
  { Choice: ".ql-color", title: "字体颜色" },
  { Choice: ".ql-background", title: "背景颜色" },
  { Choice: ".ql-image", title: "图像" },
  { Choice: ".ql-video", title: "视频" },
  { Choice: ".ql-link", title: "添加链接" },
  { Choice: ".ql-formula", title: "插入公式" },
  { Choice: ".ql-clean", title: "清除字体格式" },
  { Choice: '.ql-script[value="sub"]', title: "下标" },
  { Choice: '.ql-script[value="super"]', title: "上标" },
  { Choice: '.ql-indent[value="-1"]', title: "向左缩进" },
  { Choice: '.ql-indent[value="+1"]', title: "向右缩进" },
  { Choice: ".ql-header .ql-picker-label", title: "标题大小" },
  { Choice: '.ql-header .ql-picker-item[data-value="1"]', title: "标题一" },
  { Choice: '.ql-header .ql-picker-item[data-value="2"]', title: "标题二" },
  { Choice: '.ql-header .ql-picker-item[data-value="3"]', title: "标题三" },
  { Choice: '.ql-header .ql-picker-item[data-value="4"]', title: "标题四" },
  { Choice: '.ql-header .ql-picker-item[data-value="5"]', title: "标题五" },
  { Choice: '.ql-header .ql-picker-item[data-value="6"]', title: "标题六" },
  { Choice: ".ql-header .ql-picker-item:last-child", title: "标准" },
  { Choice: '.ql-size .ql-picker-item[data-value="small"]', title: "小号" },
  { Choice: '.ql-size .ql-picker-item[data-value="large"]', title: "大号" },
  { Choice: '.ql-size .ql-picker-item[data-value="huge"]', title: "超大号" },
  { Choice: ".ql-size .ql-picker-item:nth-child(2)", title: "标准" },
  { Choice: ".ql-align .ql-picker-item:first-child", title: "居左对齐" },
  {
    Choice: '.ql-align .ql-picker-item[data-value="center"]',
    title: "居中对齐"
  },
  {
    Choice: '.ql-align .ql-picker-item[data-value="right"]',
    title: "居右对齐"
  },
  {
    Choice: '.ql-align .ql-picker-item[data-value="justify"]',
    title: "两端对齐"
  }
];
Vue.prototype.$toolbarOptions = toolbarOptions; //全局注册，使用方法为:this.$toolbarOptions
Vue.prototype.$titleConfig = titleConfig; //全局注册，使用方法为:this.$titleConfig
Vue.config.productionTip = false
Vue.prototype.$axios=axios
Vue.prototype.$getRepquest=getRequest;
Vue.prototype.$postRequest=postRequest;
Vue.prototype.$deleteRequest =deleteRequest;
Vue.prototype.$putRequest =putRequest;
Vue.prototype.$handleTree= handleTree;
Vue.prototype.$statusFormat =statusFormat
Vue.prototype.$addDateRange =addDateRange
Vue.prototype.$getDicts =getDicts
Vue.use(ElementUI)
Vue.use(Treeselect)

Date.prototype.format = function(fmt) {

  var o = {

    "M+" : this.getMonth()+1, //月份

    "d+" : this.getDate(), //日

    "h+" : this.getHours(), //小时

    "m+" : this.getMinutes(), //分

    "s+" : this.getSeconds(), //秒

    "q+" : Math.floor((this.getMonth()+3)/3), //季度

    "S" : this.getMilliseconds() //毫秒

  };

  if(/(y+)/.test(fmt)) {

    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));

  }

  for(var k in o) {

    if(new RegExp("("+ k +")").test(fmt)){

      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));

    }

  }
  return fmt;
}
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
