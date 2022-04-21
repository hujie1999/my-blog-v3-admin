<template>
  <div id="img-block">
    <!-- 博客图片的展示图床 -->
    <el-avatar
      class="img-avatar"
      shape="square"
      style="height: 150px; width: auto"
      fit="fit"
    >
        <img v-if="imgpath=='' || imgpath =='empty' || imgpath ==null ||imgpath == undefined " 
        src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" alt="无图片" />
      <img v-else :src="userimgbaseurl+imgpath" alt="" />
    </el-avatar>
    <div class="opreation-panel">
      <div class="panel-text"> 
          <p
          v-if="imgpath=='' || imgpath =='empty' || imgpath ==null || imgpath == undefined"
          >没有图片！</p>
        <p v-else>Img-Path: {{ userimgbaseurl+imgpath }}</p>
      </div>
      <el-button type="danger" @click="delImage(imgpath)">删除</el-button>
    </div>
  </div>
</template>

<script>
import settings from '../../../../setting';
import { deletewebsiteimgAPI } from '../../../../http/api'
export default {
    name:'ImageCard',
    data(){
        return{
            userimgbaseurl:settings.userimgbaseurl
        }
    },
    props:{
        imgpath:'',
        identification:'',
        instance:[],
        delImgList:{
          type:Function
        }
    },
    methods:{
        delImage(p){
            if(this.imgpath==''||this.imgpath =='empty' || this.imgpath ==null  ||this.imgpath == undefined){
                // console.log('没有图片，无法删除')
                this.$notify.error({
                  title: '错误',
                  message: '没有图片，无法删除！'
                });
            }else{
                // console.log(p)
                deletewebsiteimgAPI({
                  'Identification':this.identification,
                  'ImgPath':this.imgpath,
                  'Instance':this.instance
                }).then(res=>{
                  // console.log(res.data)
                  this.$emit('delImgList',this.imgpath,this.identification)
                }).catch(err=>{
                  // console.log(err)
                  this.$notify.error({
                    title: '错误',
                    message: '图片删除失败！'
                  });
                })
            }
            
        }
    },
    watch:{
    }
};
</script>

<style lang='less'>
#img-block{
        width: 266px;
        height: 290px;
        // max-height: 290px;
        // height: auto;
        padding:10px 10px 40px 10px;
        margin-right: 10px;
        margin-bottom: 15px;
        border-radius: 10px;
        border: 1px solid #dbdfe6;
        overflow: hidden;
        .opreation-panel{
            
            width: 266px;
           display: flex;
           justify-content: flex-start;
           align-items: flex-start;
           flex-direction: column;
            line-height: 20px;
          .panel-text{
            width: 266px;    
            word-wrap:break-word
          }
        }
    }
</style>