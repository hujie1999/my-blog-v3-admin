<template>
  <div id="manage-about">
    <el-form ref="form"  label-width="100px">
      <el-form-item label="标题">
        <h2 v-text="old_About_Tittle"></h2>
      </el-form-item>
      <el-form-item label="新标题">
        <el-input
          ref="input"
          v-model="presend.About_Tittle"
          maxlength="50"
          style="width: 350px"
          :autosize="{ minRows: 3, maxRows: 5}"
          type="textarea"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="内容">   
        <div class="markdown-control">
          <markdown
            ref="markdown"
            :show="false"
            :content="presend.About_Content"
            :condition="condition"
            :maximgarr="presend.About_Img"
            @addImgFunc="handleAddImgFunc"
            @textChange="getTextChange"
          >
          </markdown>
        </div>
        
      </el-form-item>
      <el-form-item label="图片">
        <div class="content-img-block">
          <imgcard
            v-if="presend.About_Img==''"
          ></imgcard>
          <imgcard
            v-else
            v-for="(p,index) in presend.About_Img"
            :key="index"
            :imgpath="p"
            :identification="condition"
            :instance="presend.About_Img"
            @delImgList="handleDelImgList"
          >
          </imgcard>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="update-btn">
          <el-button
          type="primary"
          size="medium"
          @click="submitUpdate"
          >
          提交修改
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import MarkDown from '../MarkDown/MarkDown.vue'
import ImgCard from '../ImgCard/AboutPageImgCard/ImageCard.vue'
import { 
  allaboutpageAPI,
  updateaboutAPI
} from '../../../http/api'
export default {
  name: "ManageAboutPage",
  data(){
    return{
      //父组件名称，供markdown组件识别
      condition:'about',
      presend:{
        About_Tittle:'',
        About_Content:'',
        About_Img:''
      },
      old_About_Tittle :''
    }
  },
  components:{
    markdown:MarkDown,
    imgcard:ImgCard
  },
  methods:{
    getAllAboutPage(){
      allaboutpageAPI()
      .then(res=>{
        let temp = Object.values(res.data)
        this.presend.About_Tittle = temp[0].About_Tittle
        this.presend.About_Content = temp[0].About_Content
        let tempimg = res.data[0].About_Img.split(',')
        tempimg = tempimg.filter(v=>{
            return v!=''
        })
        this.presend.About_Img = tempimg
        this.old_About_Tittle = temp[0].About_Tittle
      })
      .catch(err=>{
        console.log(err)
      })
    },
    handleAddImgFunc(path,condition){
      console.log(path)
      console.log(condition)
      this.presend.About_Img=this.presend.About_Img.concat(Array(path))
    },
    getTextChange(condition,text){
      console.log(condition)
      console.log(text)
      this.presend.About_Content = text
    },
    handleDelImgList(path,identity){
      this.presend.About_Img=this.presend.About_Img.filter((p)=>{
        return p!=path
      })
      if(this.presend.About_Img.length ==0){
        this.presend.About_Img = ['empty']
      }
    },
    submitUpdate(){
      updateaboutAPI({
        About_Tittle:this.presend.About_Tittle,
        About_Content:this.presend.About_Content
      }).then(res=>{
        this.$notify({
                title: '成功',
                message: '修改成功！',
                type: 'success'
              });
        setTimeout(()=>{
          this.$router.go(0)
        },1000)
      }).catch(err=>{
        this.$notify({
                title: '出错了',
                message: '修改失败',
                type: 'error'
              });
      })
    }
    
  },
  mounted(){
    this.getAllAboutPage()
  }
};
</script>

<style lang='less' scoped>
#manage-about {
  height: 80vh;
  width: auto;
  // margin: 0px 5px;
  // padding: 5px 10px;
  overflow: auto;
  /deep/.el-form-item__label{
        font-weight: 600 !important;
        font-size: 15px;
  }
  .markdown-control{
    width: 90%;
    height: auto;
  }
  .content-img-block{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 350px;
        overflow: hidden;
        overflow-y: scroll;
  }
  // .update-btn{
    
  // }
}
</style>
