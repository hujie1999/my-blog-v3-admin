<template>
  <div id="manage-background-img">
    <el-form ref="form"  label-width="100px">
      <el-form-item label="原背景">
        <div class="pre-view-img">
          <el-image 
            style="width: 100%;height: auto;"
            :src="getImgUrl"
            @click="dialogVisible=true"
            >
          </el-image>
          <el-button
          size="large"
          icon="el-icon-delete"
          type="danger"
          circle
          @click="deleteImg"
          >
          </el-button>
        </div>
      </el-form-item>
      <el-form-item label="Path">
        <span v-text="getImgUrl"></span>
      </el-form-item>
      <el-form-item label="上传">
        <el-upload
          class="avatar-uploader"
          :action="this.testcations"
          :show-file-list="false"
          :http-request="handleHttpRequset">
          <i  class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
     <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="getImgUrl" alt="">
      </el-dialog>
  </div>
</template>

<script>
import setting from '../../../setting'
import { 
  getbackgroundimgAPI,
  uploadwebsiteimgAPI,
  updatewebsiteimgpathAPI,
  deletewebsiteimgAPI
 } from '../../../http/api'
export default {
  name: 'ManageBackgroundImg',
  data(){
    return {
      testcations:'https://www.baidu.com',
      userimgbaseurl:setting.userimgbaseurl,
      //是否存在背景图片
      imgexist:false,
      //原图片背景
      backgroundimgurl:'',
      //上传服务器后返回图片背景
      newbackgroundimgurl:'',
      //上传标识
      condition:'background',
      //上传成功返回会的路径
      dialogVisible:false

    }
  },
  computed:{
    getImgUrl(){
      return (this.userimgbaseurl+this.backgroundimgurl)
    },
    // getNewImgUrl(){
    //   return (this.userimgbaseurl+this.newbackgroundimgurl)
    // }
  },
  methods:{
      handleHttpRequset($file){
        console.log('start')
        if(this.imgexist){
          this.$notify.error({
                title: '注意!',
                message: '请先删除已有的图片！'
          });
          return
        }
        console.log('return  else')
        let formdata = new FormData();
        formdata.append('image', $file.file);
        formdata.append('condition',this.condition)
        uploadwebsiteimgAPI(formdata,{'Content-Type':'multipart/form-data'}).then(res => {
            let handledimgpath = this.userimgbaseurl+(res.data.imgpath)
            this.newbackgroundimgurl = res.data.imgpath
            this.backgroundimgurl = res.data.imgpath
            updatewebsiteimgpathAPI({
              identification:this.condition,
              image_path:this.newbackgroundimgurl
            }).then(res=>{
              // console.log(res.data)
              this.$notify({
                title: '成功',
                message: '图片上传成功！',
                type: 'success'
              });
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
      deleteImg(){
        deletewebsiteimgAPI({
          'Identification':this.condition,
          'ImgPath':this.backgroundimgurl,
        })
        .then(res=>{
          this.$notify({
                title: '成功',
                message: '图片删除成功！',
                type: 'success'
          });
          this.resetData()
        })
        .catch(err=>{
          this.$notify.error({
                title: '出错了',
                message: '图片删除失败!'
          });
        })
      },
      getBackgroundImg(){
        getbackgroundimgAPI()
        .then(res=>{
          let temp = Object.values(res.data)[0].Backgroung_Img.split(',')
          this.backgroundimgurl = temp.filter(v=>{
            return v!=''
          })
          if(temp[0].length!=0)
          this.imgexist = true 
        })
        .catch(err=>{
          console.log(err)
        })
      },
      resetData(){
        this.backgroundimgurl = ''
        this.newbackgroundimgurl = ''
        this.dialogVisible = false
      }
  },
  mounted(){
    this.getBackgroundImg()
  }
}
</script>

<style lang="less" scoped>
#manage-background-img{
  height: auto;
  width: auto;
  overflow: auto;
  margin-top: 20px;
  .pre-view-img{
    height: 300px;
    width: 300px;
    // height: auto;
    // width: 60%;
  }
  .new-pre-view-img{
    height: 300px;
    width: 300px;
    // height: auto;
    // width: 60%;
  }
  /deep/.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  /deep/.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  /deep/.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  /deep/.avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

}
</style>
