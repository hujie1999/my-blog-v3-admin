<template>
  <div class="markdown">
    <span :show="show"
    >
    <!-- 编辑 -->
      <mavon-editor
        v-if="!show"
        ref="md"
        :boxShadow="true"
        v-model="text"
        :toolbars="toolbars"
        style="z-index: 1;height:600px;"
        :scrollStyle = "true"
        @imgAdd="$imgAdd"
      ></mavon-editor>
      <!-- 展示 -->
      <mavon-editor
        v-else
        :value="value"
        defaultOpen="preview"
        :boxShadow="true"
        style="z-index: 1; min-height: 300px;max-height:500px;width:auto"
        :editable="false"
        :subfield="false"
        :toolbarsFlag="false"
        
      ></mavon-editor>
    </span>
  </div>
</template>
<style>
/* 隐藏markdown编辑器的滚动条样式 */
.markdown-body::-webkit-scrollbar{
  display: none;
}
</style>
<script>
import setting from '../../../setting'
import {
  uploadwebsiteimgAPI,
  updatewebsiteimgpathAPI
         } from '../../../http/api'
const toolbars = {
  bold: true, // 粗体
  italic: true, // 斜体
  header: true, // 标题
  underline: true, // 下划线
  strikethrough: true, // 中划线
  mark: true, // 标记
  superscript: true, // 上角标
  subscript: true, // 下角标
  quote: true, // 引用
  ol: true, // 有序列表
  ul: true, // 无序列表
  link: true, // 链接
  imagelink: true, // 图片链接
  code: true, // code
  table: true, // 表格
  fullscreen: true, // 全屏编辑
  readmodel: true, // 沉浸式阅读
  htmlcode: true, // 展示html源码
  help: true, // 帮助
  /* 1.3.5 */
  undo: true, // 上一步
  redo: true, // 下一步
  trash: true, // 清空
  save: false, // 保存（触发events中的save事件）
  /* 1.4.2 */
  navigation: true, // 导航目录
  /* 2.1.8 */
  alignleft: true, // 左对齐
  aligncenter: true, // 居中
  alignright: true, // 右对齐
  /* 2.2.1 */
  subfield: true, // 单双栏模式
  preview: true, // 预览
};

export default {
  name: "MarkDown",
  data(){
    return {
      text:'',
      toolbars: toolbars,
      //about page上传图片最大数量
      aboutimgsmaxcount:setting.aboutimgsmaxcount,
      //message page上传图片最大数量
      messageimgsmaxcount:setting.messageimgsmaxcount,
      //图片路径数组，用于与setting.contentimgmaxcount比较
      max_arr:[],
      condition_data:'',
      imagepath:'',
    }
  },
  components: {},
  props: {
    value: {
      // 预览传来的prop
      type: String,
      default: "",
    },
    show: {
      // 预览判断，预览 show 为 true，编辑 show 为 false 或者不填
      type: Boolean,
      default: false,
    },
    //用于博客编辑回传，展示初始化的内容
    //此值使用watch监听传给 data 的text，
    //text 使用v-model 绑定在模板上
    content:{
      type: String,
      default: "",
    },
    //保存标识，区分是哪个组件调用的值
    condition:{
      type:String,
      default:''
    },
    //上传图片成功后emit的函数
    addImgFunc:{
      type:Function
    },
    //用于计算当前已上传图片的数量
    maximgarr:[],
    //内容改变emit的函数,参数  identification,text
    textChange:{
      type:Function
    },
  },

  methods: {
    
      execBody(pos,$file){
        var formdata = new FormData();
        formdata.append('image', $file);
        formdata.append('condition',this.condition_data)
        uploadwebsiteimgAPI(formdata,{'Content-Type':'multipart/form-data'}).then(res => {
            let handledimgpath = setting.userimgbaseurl+(res.data.imgpath)
            this.imagepath = res.data.imgpath
            this.$refs.md.$img2Url(pos, handledimgpath);
            updatewebsiteimgpathAPI({
              identification:this.condition_data,
              image_path:this.imagepath
            }).then(res=>{
              console.log(res.data)
              this.$notify({
                title: '成功',
                message: '图片上传成功！',
                type: 'success'
              });
              //图片上传到服务器成功，回传函数驱动视图更新
              this.$emit('addImgFunc',this.imagepath,this.condition_data)
            }).catch(err=>{
              // console.log(err)
              this.$notify.error({
                title: '出错了',
                message: '图片上传失败'+err
              });
            })
            
        }).catch(err => {
          console.log(err)
          this.$notify.error({
                title: '出错了',
                message: '图片上传到服务器失败!'
            });
        })
      },

    // 上传图片方法
    //background图片上传使用自定义组件，这里不做判定
     $imgAdd(pos, $file) {
       
       if(this.condition_data=='about'){
         console.log("condition='about'")
          if(this.max_arr.length<this.aboutimgsmaxcount){
            this.execBody(pos,$file)
          }
          else{
            this.$confirm('上传图片数量不能超过'+this.aboutimgsmaxcount+'张！', '注意', {
              confirmButtonText: '确定',
              type: 'error'
            }).then(() => {
              return
            }).catch(() => {
                return
            });
          }
       }
       else if(this.condition_data=='message'){
         console.log("condition_data='message'")
         if(this.max_arr.length<this.messageimgsmaxcount){
            this.execBody(pos,$file)
          }
          else{
            this.$confirm('上传图片数量不能超过'+this.messageimgsmaxcount+'张！', '注意', {
              confirmButtonText: '确定',
              type: 'error'
            }).then(() => {
              return
            }).catch(() => {
                return
            });
          }
       }
      
      
    },
    async  highlighthandle(){
      await import('highlight.js/styles/atom-one-dark.css');
      let highlight = document.querySelectorAll('pre code');
      // console.log(highlight)
      highlight.forEach((block)=>{
        //10.7.0版本以上语法
        //  hljs.highlightElement(block);
        this.$hljs.highlightBlock(block);

      })
    },

  },
  mounted () {
    this.highlighthandle()
    console.log(this.condition_data)
  },

  created(){
    
  },
  updated () {
    // this.highlighthandle()
  },
  watch:{
    content:{
       handler: function (newVal, oldVal) {
        this.text = newVal
      },
      immediate: true
    },
    condition:{
       handler: function (newVal, oldVal) {
        console.log(oldVal)
        console.log(newVal)
        this.condition_data = null
        this.condition_data = newVal
      },
      immediate: true
    },
    maximgarr:{
       handler: function (newVal, oldVal) {
        // console.log(newVal)
        this.max_arr = newVal
      },
      immediate: true
    },
    text:{
       handler: function (newVal, oldVal) {
        // console.log(newVal)
        // this.max_arr = newVal
        this.$emit('textChange',this.condition_data,this.text)
      },
      immediate: true
    },


  }
};
</script>