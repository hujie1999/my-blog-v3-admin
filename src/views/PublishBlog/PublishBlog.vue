<template>
  <div id="publish-page">
    <!-- <h2>发布博客</h2> -->
    <el-form ref="form" :model="presend" label-width="100px">
      <el-form-item label="标题">
        <el-input
          ref="input"
          v-model="presend.Blog_Title"
          :autosize="{ minRows: 3, maxRows: 5 }"
          maxlength="50"
          type="textarea"
          style="width: 350px"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="presend.Blog_Class">
          <el-option v-for="(c, index) in class_list" :key="index" :value="c">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签">
        <el-select
          v-model="presend.Blog_Tags"
          multiple
          :placeholder="presend.Blog_Tags ? '最好添加标签便于搜索' : ''"
        >
          <el-option v-for="(tag, index) in tag_list" :key="index" :value="tag">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="摘要">
        <div class="markdown-control">
          <markdown
            ref="summary"
            :save_area="save_area.summary"
            :blog_id="Aimed_Blog_Id"
            :show="false"
            @addImgFunc="handleAddImgFunc"
            @textChange="getTextChange"
          ></markdown>
        </div>
      </el-form-item>
      <el-form-item label="摘要图片">
        <imagecard
          :imgpath="presend.Blog_SummaryImg"
          :identification="dele_area.summary"
          :blogid="Aimed_Blog_Id"
          @delImgList="handleDelImgList"
        ></imagecard>
      </el-form-item>
      <el-form-item label="内容">
        <div class="markdown-control">
          <markdown
            ref="content"
            :save_area="save_area.content"
            :blog_id="Aimed_Blog_Id"
            :show="false"
            :maximgarr="presend.Blog_Imgs"
            @addImgFunc="handleAddImgFunc"
            @textChange="getTextChange"
          ></markdown>
        </div>
      </el-form-item>
      <el-form-item label="内容图片">
        <span class="content-img-block">
          <!-- 空图片展示图床 -->
          <imagecard v-if="presend.Blog_Imgs == ''"></imagecard>
          <!-- 有图片展示图床 -->
          <imagecard
            v-else
            v-for="(p, index) in presend.Blog_Imgs"
            :key="index"
            :imgpath="p"
            :identification="dele_area.content"
            :instance="presend.Blog_Imgs"
            :blogid="Aimed_Blog_Id"
            @delImgList="handleDelImgList"
          ></imagecard>
        </span>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="publishBlog"
          type="success"
          style="width: 120px; height: 45px; margin: 50px 0px"
          >发布博客</el-button
        >
        <el-button
          @click="saveAsDraft"
          type="primary"
          style="width: 120px; height: 45px; margin: 50px 0px"
          >保存草稿</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
#publish-page {
  background: #fff;
  margin: 0;
  padding: 0;
  height: auto;
  /deep/.el-form-item__label{
        font-weight: 600 !important;
        font-size: 15px;
    }
  .markdown-control {
    width: 90%;
    height: auto;
  }
  .content-img-block {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    // height: 350px;
    max-height: 350px;
    height: auto;
        // background: blueviolet;
    overflow: hidden;
    overflow-y: scroll;
  }
}
</style>
<script>
import MarkDown from "./MarkDown/MarkDown.vue";
import {
  lastblogidAPI,
  alltagslistAPI,
  allclasslistAPI,
  updateblogAPI,
  updateimgpathAPI,
  addonedraftAPI,
  publishwithconditionAPI,
  savedraftwithconditionAPI
} from "../../http/api";
import BlogTagsTemplate from "./Tag/TagsTemplate.vue";
import ImageCard from "./ImgCard/ImageCard.vue";
export default {
  name: "PublishBlog",
  components: {
    markdown: MarkDown,
  },
  data() {
    return {
      Aimed_Blog_Id: null,
      //博客是否存草稿标识
        draft:false,
      //预发布数据
      presend: {
        'Blog_Title': "",
        'Blog_SummaryImg': "",
        'Blog_Summary': "",
        'Blog_Content': "",
        'Blog_Tags': "",
        'Blog_Class': "",
        'Blog_Imgs': [],
        'Blog_Author':"xiaohai"
      },
      tag_list: [],
      class_list: [],
      //图片上传需要参数
      save_area: {
        'summary': "summary",
        'content': "content",
      },
      //图片删除需要参数
      dele_area: {
        'summary': "summary",
        'content': "content",
      },
      tips:null
    };
  },
  components: {
    markdown: MarkDown,
    blogtagstemplate: BlogTagsTemplate,
    imagecard: ImageCard,
  },
  methods: {
    //提示函数，当上传图片时，自动保存到草稿
    tipsFunc() {
      this.tips = this.$notify({
        title: "须知",
        message:
          "单独执行上传图片操作,会自动保存图片作为草稿,之后当写完其他内容时再点击保存草稿," +
          "会自动合并当前页面相关联的所有内容;你可以在->博客管理->草稿箱 操作保存的草稿",
        duration: 0,
        type: "warning",
      });
    },
    async initFunc() {
      await lastblogidAPI()
        .then((res) => {
          //让Blog_Id加一即是预上传Blog_id
          this.Aimed_Blog_Id = Number(res.data.Blog_Id) + 1;
        })
        .catch((err) => {
          console.log(err);
        });
      await alltagslistAPI()
        .then((res) => {
          this.tag_list = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      await allclasslistAPI()
        .then((res) => {
          this.class_list = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //重置函数，当提交后，不管成功失败，都执行此函数更新视图
    resetFunc(){
        this.draft = false
        //更新Aimed_Blog_Id
        lastblogidAPI().then((res) =>{this.Aimed_Blog_Id = Number(res.data.Blog_Id) + 1}).catch((err) => {console.log(err)});
        this.presend.Blog_Title = ''
        this.presend.Blog_SummaryImg = ''
        this.presend.Blog_Summary = ''
        this.presend.Blog_Content = ''
        this.presend.Blog_Tags = ''
        this.presend.Blog_Class = ''
        this.presend.Blog_Imgs = []
        this.presend.Blog_Author = 'xiaohai'

        this.$refs.input.focus();
    },
    //按条件存入草稿箱
    saveAsDraft(){
         let params = {
          'Indentity' : this.draft,
          'Aimed_Blog_Id' : this.Aimed_Blog_Id,
          
          'Blog_Title' : this.presend.Blog_Title,
          'Blog_Summary' : this.presend.Blog_Summary,
          'Blog_Content' : this.presend.Blog_Content,
          'Blog_Tags' : this.presend.Blog_Tags,
          'Blog_Class' : this.presend.Blog_Class,
          'Blog_Author' : this.presend.Blog_Author,
      };
      // console.log(params)
      const loading = this.$loading({
        lock: true,
        text: "正在保存草稿...",
        spinner: "el-icon-loading",
        background: "rgba(255, 255, 255, 0.7)",
      });
      savedraftwithconditionAPI(params)
        .then((res) => {
          // console.log(res.data)
          
            loading.close();

            this.$notify({
                title: '成功',
                message: '博客成功存入草稿!',
                type: 'success'
            });
            this.resetFunc()

        })
        .catch((err) => {
          console.log(err);
          loading.close();
          this.$confirm('博客存入草稿失败!', '出错了', {
                confirmButtonText: '确定',
                type: 'error'
            }).then(() => {
                this.resetFunc()
            }).catch(() => {
                this.resetFunc()
            });
        });

    },
    //按条件发布博客
    publishBlog() {
      let params = {
          'Indentity' : this.draft,
          'Aimed_Blog_Id' : this.Aimed_Blog_Id,
          
          'Blog_Title' : this.presend.Blog_Title,
          'Blog_Summary' : this.presend.Blog_Summary,
          'Blog_Content' : this.presend.Blog_Content,
          'Blog_Tags' : this.presend.Blog_Tags,
          'Blog_Class' : this.presend.Blog_Class,
          'Blog_Author' : this.presend.Blog_Author,
      };
      // console.log(params)
      const loading =this.$loading({
        lock: true,
        text: "正在发布...",
        spinner: "el-icon-loading",
        background: "rgba(255, 255, 255, 0.7)",
      });
      publishwithconditionAPI(params)
        .then((res) => {
          // console.log(res.data)
          
            loading.close();
            this.$notify({
                title: '成功',
                message: '博客发布成功!',
                type: 'success'
            });
            this.resetFunc()
        })
        .catch((err) => {
          console.log(err);
          loading.close();
            this.$confirm('博客发布失败!', '出错了', {
                confirmButtonText: '确定',
                type: 'error'
            }).then(() => {
                this.resetFunc()
            }).catch(() => {
                this.resetFunc()
            });
        });
    },
    //更新数据库图片路径函数
    updateImagePath(path,identity){
         updateimgpathAPI({
              identification : identity,
              Blog_Id : this.Aimed_Blog_Id,
              image_path : path
            }).then(res=>{
            //   console.log(res.data)
              this.$notify({
                title: '成功',
                message: '图片上传成功！',
                type: 'success'
              });
            }).catch(err=>{
              // console.log(err)
              this.$notify.error({
                title: '出错了',
                message: '图片上传失败！'
              });
            })
    },
    handleDelImgList(path, identity) {
      //img card删除图片后触发的函数
      //更新 Blog_Imgs，Blog_SummaryImg
      if (identity == "summary") {
        this.presend.Blog_SummaryImg = null;
      } else if (identity == "content") {
        this.presend.Blog_Imgs = this.presend.Blog_Imgs.filter((p) => {
          return p != path;
        });
      }
      if (this.presend.Blog_Imgs.length == 0) {
        this.presend.Blog_Imgs = ["empty"];
      }
      this.$notify({
        title: "成功",
        message: "图片删除成功！",
        type: "success",
      });
    },
    handleAddImgFunc(path, identity) {
      //markdown 上传图片成功后触发的函数
      //更新 对应图床的视图
      if (identity == "summary") {
        this.presend.Blog_SummaryImg = path;
      } else if (identity == "content") {
          let temp = path.split(',')
          temp = temp.filter(v=>{
              return v!=''
          })
        this.presend.Blog_Imgs = this.presend.Blog_Imgs.concat(temp);
      }
      let _that = this
      if(this.draft == true){
            this.updateImagePath(path,identity)
      } 
      else if(this.draft == false){
            addonedraftAPI().then(res=>{
                _that.updateImagePath(path,identity)
            }).catch(err=>{
                console.log(err)
            })
            
          this.draft = true
      }
            
           
    },
    getTextChange(identification, text) {
      //编辑器编辑区域文字改变触发函数
      if (identification == "summary") {
        this.presend.Blog_Summary = text;
      } else if (identification == "content") {
        this.presend.Blog_Content = text;
      }
    },
  },
  mounted() {
    this.initFunc();
    //让input聚焦，实现加载显示顶部
    this.$refs.input.focus();
    this.tipsFunc();
  },
  beforeDestroy(){
      //切换页面关闭 tips
      this.tips.close()
  },
  watch: {
    presend: {
      handler(oldVal, newVal) {
        // console.log(oldVal.Blog_Title)
        // console.log(oldVal.Blog_Tags)
        // console.log(oldVal.Blog_Class)
        // console.log(newVal);
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>


