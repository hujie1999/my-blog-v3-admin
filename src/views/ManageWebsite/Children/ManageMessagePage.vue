<template>
  <div id="manage-message">
    <el-form ref="form" :model="presend" label-width="100px">
      <el-form-item label="标题">
        <h2 v-text="presend.Message_Title"></h2>
      </el-form-item>
      <el-form-item label="新标题">
        <el-input
          ref="input"
          v-model="presend.Message_Title"
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
            :content="presend.Message_Content"
            :condition="this.condition"
            :maximgarr="presend.Message_Img"
            @addImgFunc="handleAddImgFunc"
            @textChange="getTextChange"
          >
          </markdown>
        </div>
        
      </el-form-item>
      <el-form-item label="图片">
        <div class="content-img-block">
          <imgcard
            v-if="presend.Message_Img==''"
          ></imgcard>
          <imgcard
            v-else
            v-for="(p,index) in presend.Message_Img"
            :key="index"
            :imgpath="p"
            :identification="condition"
            :instance="presend.Message_Img"
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
import ImgCard from '../ImgCard/MessagePageImgCard/ImageCard.vue'
import { 
  allmessagepageAPI,
  updatemessageAPI
} from '../../../http/api'
export default {
  name: 'ManageMessagePage',
  data(){
    return{
      condition:'message',
      presend:{
        Message_Title:'',
        Message_Content:'',
        Message_Img:''
      }
    }
  },
  components:{
    markdown:MarkDown,
    imgcard:ImgCard
  },
  methods:{
    getAllMessagePage(){
      allmessagepageAPI()
      .then(res=>{
        let temp = Object.values(res.data)
        this.presend.Message_Title = temp[0].Message_Title
        this.presend.Message_Content = temp[0].Message_Content
        let tempimg = res.data[0].Message_Img.split(',')
        tempimg = tempimg.filter(v=>{
            return v!=''
        })
        this.presend.Message_Img = tempimg
      })
      .catch(err=>{
        console.log(err)
      })
    },
    handleAddImgFunc(path,condition){
      console.log(path)
      console.log(condition)
      this.presend.Message_Img=this.presend.Message_Img.concat(Array(path))
    },
    getTextChange(condition,text){
      // console.log(condition)
      // console.log(text)
      this.presend.Message_Content = text
    },
    handleDelImgList(path,identity){
      this.presend.Message_Img=this.presend.Message_Img.filter((p)=>{
        return p!=path
      })
      if(this.presend.Message_Img.length ==0){
        this.presend.Message_Img = ['empty']
      }
    },
    submitUpdate(){
      updatemessageAPI({
        Message_Title:this.presend.Message_Title,
        Message_Content:this.presend.Message_Content
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
    this.getAllMessagePage()
  }
}
</script>

<style lang='less' scoped>
#manage-message {
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
