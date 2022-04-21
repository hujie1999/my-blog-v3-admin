<template>
  <div id="manage-avatar">
    <!-- 头像展示区域 -->
      <div class="avatar-show-block">
        <div class="view-avatar">
          <h5>头像列表</h5>

          <div class="avatar-area">

            <span
            class="loop-container"
            v-for="(url,index) in avatars_list" 
              :key="index"
            >
              <el-image 
              style="width: 120px; height: 120px"
              :src="userimgbaseurl+url"
              @click="handleUrl(url)"
              lazy>
              </el-image>
            </span>
          </div>
        </div>
      </div>
      <!-- 删除头像区域 -->
      <div class="avatar-delect-block">
        <div class="delect-avatar">
          <h5>待删除</h5>
          
          <div class="img-card">
            <el-card>
              <img :src="pre_delete" style="height:110px;width:110px">
              <div>
                
                <div class="delect-avatar-url">
                  <span>{{pre_delete}}</span>
                </div>
                <div class="bottom clearfix">
                  <el-button 
                  type="danger" 
                  size="mini"
                  @click="deleteImg"
                  :disabled="pre_delete_url.length==0"
                  >删除</el-button>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </div>
      <!-- 头像上传区域 -->
      <div class="avatar-upload-block">
        <div class="upload-avatar">
          <h5>上传头像</h5>
          <el-upload
            class="avatar-uploader"
            :action="this.testcations"
            :show-file-list="false"
            :http-request="handleHttpRequset">
            <i  class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </div>
      </div>
  </div>
</template>

<script>
import setting from '../../../setting'
import {
  uploadwebsiteimgAPI,
  updatewebsiteimgpathAPI,
  deletewebsiteimgAPI,
  getavatarsAPI
} from '../../../http/api'
export default {
    name:'ManageAvatar',
    data(){
      return{
        testcations:'https://www.baidu.com',
        userimgbaseurl:setting.userimgbaseurl,

        //上传标识
        condition:'avatar',
        //头像列表
        avatars_list:[],
        //待删除（展示用）
        pre_delete:'#',
        //待删除（点击用）
        pre_delete_url:''
        
      }
    },
    methods:{
      //上传头像
      handleHttpRequset($file){
        console.log('start')
        let formdata = new FormData();
        formdata.append('image', $file.file);
        formdata.append('condition',this.condition)
        uploadwebsiteimgAPI(formdata,{'Content-Type':'multipart/form-data'}).then(res => {
            // let handledimgpath = this.userimgbaseurl+(res.data.imgpath)
            updatewebsiteimgpathAPI({
              identification:this.condition,
              image_path:res.data.imgpath
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
      //获取头像列表
      getAvatars(){
        getavatarsAPI()
        .then(res=>{
          // let temp = Object.values(res.data)[0].Avatars.split(',')
          // let newtemp = []
          // temp.map(v=>{
          //   newtemp.push(this.userimgbaseurl+v)
          // })
          // this.avatars_list = newtemp

          // console.log(Object.values(res.data)[0].Avatars.split(','))
          let temp = Object.values(res.data)[0].Avatars.split(',')
          temp = temp.filter(v=>{
            return v!=''
          })
          this.avatars_list = temp
        })
        .catch(err=>{
          console.log(err)
        })
      },
      //点击头像
      handleUrl(url){
        // console.log(url)
        this.pre_delete = this.userimgbaseurl+url
        this.pre_delete_url = url
     
      },
      //删除头像
      deleteImg(){
        deletewebsiteimgAPI({
                  'Identification':this.condition,
                  'ImgPath':this.pre_delete_url,
                  'Instance':this.avatars_list
                }).then(res=>{
                  this.$notify({
                    title: '成功',
                    message: '图片删除成功！',
                    type: 'success'
                  });

                  const save = this.pre_delete_url
                  this.avatars_list=this.avatars_list.filter(v=>{
                    return v!=save
                  })
                  this.pre_delete_url = ''
                  this.pre_delete = '#'

                }).catch(err=>{
                  // console.log(err)
                  this.$notify.error({
                    title: '错误',
                    message: '图片删除失败！'
                  });
                })  
      }



    },
    created(){
      this.getAvatars()
    }
}
</script>

<style lang='less' scoped>
#manage-avatar{
  height: 80vh;
  width: auto;
  overflow: auto;
  padding: 5px;
  h5{
    margin:0px !important;
    padding: 5px;
  }
  .avatar-show-block{
    min-height: 300px;
    max-height: 400px;
    height: auto;
    width: 80%;
    //  overflow: auto;
    // background: blueviolet;
    border: 1px solid black;
    border-radius: 5px;

    .avatar-area{
      overflow: auto;
      min-height: 200px;
      max-height: 300px;
      /deep/img{
        width: 110px;
        height: 110px;
        margin: 5px !important;
      }
      /deep/img:hover{
        position: relative;
        border: 1px solid gold;
        // z-index: 100 !important;
      }
  }
  }
  .avatar-delect-block{
    margin-top: 5px;
    min-height: 300px;
    height: auto;
    width: auto;
    // background: cadetblue;
    border-radius: 5px;

    .img-card{
      height: auto;
      width: 250px;
    }
    .delect-avatar-url{
      width: 200px;
      height: auto;
      word-wrap: break-word;
    }
  }
 
  .avatar-upload-block{
    margin-top: 5px;
    min-height: 300px;
    height: auto;
    width: auto;
    // background: cadetblue;
    border-radius: 5px;
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