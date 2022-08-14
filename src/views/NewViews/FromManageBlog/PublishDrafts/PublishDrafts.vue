
<template>
  <div id="editblog-page">
      <!-- <span>this is PublishDraft page</span> -->
      <el-form ref="form" :model="presend" label-width="80px">
        <el-form-item label="原标题">
            <span v-text="info['Blog_Title']"></span>
        </el-form-item>
        <el-form-item label="新标题">
            <el-input
            ref="input" 
            v-model="presend.Blog_Title"
            :autosize="{ minRows: 3, maxRows: 5}"
            maxlength="50"
            type="textarea"
            style="width:350px"
            show-word-limit
            >
            </el-input>
        </el-form-item>
        <el-form-item label="原分类">
            <el-tag
                v-if="info['Blog_Class']!=''"
                type='success'
                effect="dark"
                v-text="info['Blog_Class']"
            >
            </el-tag>
            <span v-else>无分类</span>
        </el-form-item>
        <el-form-item label="新分类">
            <el-select v-model="presend.Blog_Class" 
             >
                <el-option
                v-for="(c,index) in class_list"
                :key="index"
                :value="c"
                >
                </el-option>
            </el-select> 
        </el-form-item>
        <el-form-item label="原标签">
            <blogtagstemplate
                v-once
                v-if="info['Blog_Tags']"
                :tagslist="info['Blog_Tags'].split(',')"
            ></blogtagstemplate>            
        </el-form-item>
        <el-form-item label="新标签">
             <el-select v-model="presend.Blog_Tags" 
             multiple 
             :placeholder="presend.Blog_Tags?'最好添加标签便于搜索':''"
             >
                <el-option
                v-for="(tag,index) in tag_list"
                :key="index"
                :value="tag"
                >
                </el-option>
            </el-select>    
            <span>{{info['Blog_Tags']}}</span>        
        </el-form-item>
        <el-form-item label="摘要">
            <div class="markdown-control">
                <markdown
                    ref = 'summary'
                    :save_area="save_area.summary"
                    :blog_id = "Blog_Id"
                    :content="info['Blog_Summary']"
                    :show="false"
                    @addImgFunc='handleAddImgFunc'
                    @textChange="getTextChange"
                ></markdown>
            </div>
        </el-form-item>
        <el-form-item label="摘要图片">
            <imagecard
            :imgpath="presend.Blog_SummaryImg"
            :identification="dele_area.summary"
            :blogid="Blog_Id"
            @delImgList='handleDelImgList'            
            ></imagecard>
        </el-form-item>
        <el-form-item label="内容">
            <div class="markdown-control">
                <markdown
                    ref="content"
                    :save_area="save_area.content"
                    :blog_id = "Blog_Id"
                    :content="info['Blog_Content']"
                    :show="false"
                    :maximgarr = "presend.Blog_Imgs"
                    @addImgFunc='handleAddImgFunc'
                    @textChange="getTextChange"
                ></markdown>
            </div>
        </el-form-item>
        <el-form-item label="内容图片">
            <span class="content-img-block">
                <!-- 空图片展示图床 -->
                <imagecard
                v-if="presend.Blog_Imgs==''"
                ></imagecard>
                <!-- 有图片展示图床 -->
                <imagecard
                v-else
                    v-for="(p,index) in presend.Blog_Imgs"
                    :key="index"
                    :imgpath="p"
                    :identification="dele_area.content"
                    :instance="presend.Blog_Imgs"
                    :blogid="Blog_Id"
                    @delImgList='handleDelImgList'   
                ></imagecard>
            </span>
        </el-form-item>
        <el-form-item>
            <el-button @click="updateBlog" type="success" 
            size="medium">提交修改</el-button>

            <el-button @click="PublishDraft" type="primary" 
            size="medium">发布</el-button>
        </el-form-item>
      </el-form>   
  </div>
</template>

<script>
import MarkDown from '../../../../components/MarkDown/MarkDown.vue'
import BlogTagsTemplate from './tag/TagsTemplate.vue'
import ImageCard from './ImgCard/ImageCard.vue'
import {
    takeablogAPI,
    alltagslistAPI,
    allclasslistAPI,
    updateblogAPI,
    publishdraftsAPI
} from '../../../../http/api'
export default {
    name:'PublishDrafts',
    data(){
        return {
            Blog_Id : Number(this.$route.query['Blog_Id']),
            info:[],
            presend:{
                'Blog_Title':'',
                'Blog_SummaryImg':'',
                'Blog_Summary':'',
                'Blog_Content':'',
                'Blog_Tags':'',
                'Blog_Class':'',
                'Blog_Imgs':''
            },
            tag_list:[],
            class_list:[],
            //图片上传需要参数
            save_area:{
                'summary':'summary',
                'content':'content'
            },
            //图片删除需要参数
            dele_area:{
                'summary':'summary',
                'content':'content'
            },
            
        }
    },
    components:{
        markdown : MarkDown ,
        blogtagstemplate : BlogTagsTemplate ,
        imagecard : ImageCard
    },
    props:{

    },
    computed:{
    },
    methods:{
        async initFunc(){
            await takeablogAPI({bgid:this.Blog_Id})
                .then(res=>{
                    this.info = res.data[0];
                    this.presend.Blog_Title = res.data[0].Blog_Title
                    // this.presend.Blog_SummaryImg = res.data[0].Blog_SummaryImg
                    let tmp = res.data[0].Blog_SummaryImg.split(',')
                    tmp = tmp.filter(k=>{
                        return k!=''
                    })
                    this.presend.Blog_SummaryImg = String(tmp)
                    this.presend.Blog_Summary = res.data[0].Blog_Summary
                    this.presend.Blog_Content = res.data[0].Blog_Content
                    this.presend.Blog_Tags = res.data[0].Blog_Tags.split(',')
                    this.presend.Blog_Class = res.data[0].Blog_Class
                    // this.presend.Blog_Imgs = res.data[0].Blog_Imgs.split(',')
                    let temp = res.data[0].Blog_Imgs.split(',')
                    temp = temp.filter(v=>{
                        return v!=''
                    })
                    this.presend.Blog_Imgs = temp
                })
                .catch(err=>{console.log(err)}) 
            await alltagslistAPI()
                .then(res=>{
                    this.tag_list = res.data;
                })
                .catch(err=>{console.log(err)})
            await allclasslistAPI()
                .then(res=>{
                    this.class_list = res.data
                })
                .catch(err=>{console.log(err)})
        },
        updateBlog(){
            // console.log(this.$refs.content._data.text)
            //发布函数 更新  5项 传6项,因为图片上传时已经更新过了
            //Blog_Id Blog_Title  Blog_Summary  Blog_Content  Blog_Tags  Blog_Class
            let params  = {
                'Blog_Id':this.Blog_Id,
                'Blog_Title':this.presend.Blog_Title,
                'Blog_Summary':this.presend.Blog_Summary,
                'Blog_Content':this.presend.Blog_Content,
                'Blog_Tags':this.presend.Blog_Tags,
                'Blog_Class':this.presend.Blog_Class,
            }
            // console.log(params)
            const loading = this.$loading({
                lock: true,
                text: '正在提交修改...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.7)'
            });
            updateblogAPI(params)
            .then(res=>{
                // console.log(res.data)
                setTimeout(()=>{
                    loading.close();
                    
                    this.$notify({
                        title: '成功',
                        message: '草稿更新成功!',
                        type: 'success'
                    });
                
                    setTimeout(()=>{this.$router.replace('/manageblog')},1000)
                },1000)
                
            })
            .catch(err=>{
                console.log(err)
                loading.close();
                setTimeout(() => {
                    this.$confirm('草稿更新失败!', '出错了', {
                        confirmButtonText: '确定',
                        type: 'error'
                    }).then(() => {
                        this.$router.replace('/manageblog')
                    }).catch(() => {
                        this.$router.replace('/manageblog')
                    });
                }, 500);
            })
        },
        PublishDraft(){
          //将草稿发布到博客(让Blog_Status从3 变为1)
          const loading = this.$loading({
                lock: true,
                text: '正在提交发布...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.7)'
            });
          publishdraftsAPI({Blog_Id:this.Blog_Id})
          .then(res=>{
            setTimeout(()=>{
                    loading.close();
                    
                    this.$notify({
                        title: '成功',
                        message: '草稿成功发布!',
                        type: 'success'
                    });
                
                    setTimeout(()=>{this.$router.replace('/manageblog')},1500)
                },1000)
          })
          .catch(err=>{
            console.log(err)
                loading.close();
                setTimeout(() => {
                    this.$confirm('草稿发布失败!', '出错了', {
                        confirmButtonText: '确定',
                        type: 'error'
                    }).then(() => {
                        this.$router.replace('/manageblog')
                    }).catch(() => {
                        this.$router.replace('/manageblog')
                    });
                }, 500);
          })
        },
        handleDelImgList(path,identity){
            //img card删除图片后触发的函数
            //更新 Blog_Imgs，Blog_SummaryImg 
            if(identity == 'summary'){
                this.presend.Blog_SummaryImg = null
            }
            else if(identity == 'content'){
               this.presend.Blog_Imgs=this.presend.Blog_Imgs.filter((p)=>{
                    console.log('p====>'+p)
                    return p!=path
                })
                
            }
            if(this.presend.Blog_Imgs.length ==0){
                    this.presend.Blog_Imgs = ['empty']
            }
            this.$notify({
                title: '成功',
                message: '图片删除成功！',
                type: 'success'
            });
        },
        handleAddImgFunc(path,identity){
            //markdown 上传图片成功后触发的函数
            //更新 对应图床的视图
            if(identity == 'summary'){
                this.presend.Blog_SummaryImg = path
            }
            else if(identity == 'content'){
                this.presend.Blog_Imgs=this.presend.Blog_Imgs.concat(Array(path))               
            }
        },
        getTextChange(identification,text){
            //编辑器编辑区域文字改变触发函数
            if(identification == 'summary'){
                this.presend.Blog_Summary = text
            }
            else if(identification == 'content'){
                this.presend.Blog_Content = text
            }
        },

    },
    created(){
        
    },
    mounted(){
        this.initFunc()
        //让input聚焦，实现加载显示顶部
        this.$refs.input.focus()
        
    },
    watch:{
        presend:{
            handler(oldVal,newVal){
                // console.log(oldVal.Blog_Title)
                // console.log(oldVal.Blog_Tags)
                // console.log(oldVal.Blog_Class)
                // console.log(newVal)
            },
            immediate:true,
            deep:true
        }
    }
    

}
</script>

<style lang='less' scoped>
#editblog-page{
    background: #fff;
    margin: 0;
    padding: 0;
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
    }
}
</style>