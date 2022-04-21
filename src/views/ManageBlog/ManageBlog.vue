<template>
  <div id="manageblog-page">
    <!-- <h2>this is ManageBlog page</h2> -->
    <el-tabs type="border-card"
    v-model="activeName"
     @tab-click="handleClick"
    >
      <el-tab-pane
      label="正常状态博客"
      name="active"
      >
      </el-tab-pane>
      <el-tab-pane
      label="冻结状态博客"
      name="frozen"
      >
      </el-tab-pane>
      <el-tab-pane
      label="草稿箱"
      name="drafts"
      >
      </el-tab-pane>
      
      
      <!-- blog列表 -->
      <bloglisttable
      :information = 'list'
      :activename='activeName'
      @changeView='handleTableViewChange'
      >
      </bloglisttable>
      
      <!-- 分页器 -->
      <bloglistpagenation 
      v-if="this.list.length!=0"
      :current='current_page'
      :start="start"
      :length="length"
      :total="total_count"
      @handledPageParams='getPageParam'
      :key="pagenation_key"
      >
      </bloglistpagenation>
    </el-tabs>
  </div>
</template>

<script>
import BlogListTable from './Table/BlogListTable.vue'
import BlogListPageNation from './Pagenation/BlogListPageNation.vue'
import settings from '../../setting'
import { 
  activeblogslistAPI,
  frozenblogslistAPI,
  activeblogscountAPI,
  frozenblogscountAPI,
  draftblogslistAPI,
  draftblogscountAPI
  } from '../../http/api'
export default {
  name: 'ManageBlog',
  components:{
    bloglisttable : BlogListTable,
    bloglistpagenation : BlogListPageNation
  },
  data() {
      return {
        list:[],
        activeName:'active',
        //分页参数
        current_page:1,
        start:0,
        length:4,
        total_count:null,
        // 组件的key,调用函数改变key值更新组件
        pagenation_key:null,
        userimgbaseurl:settings.userimgbaseurl
        
      }
    },
    methods: {
      resetPageParam(){
        this.current_page = 1
        this.start = 0
        this.total_count = null
      }
      ,
      getPageParam(c,s){
        this.current_page = c
        this.start = s
        this.handleClick()
      },
      setPagenationKey(){
        this.pagenation_key = new Date().getTime()
      },
      getActiveBlogs(){
        activeblogslistAPI({start:this.start,length:this.length})
          .then(res=>{this.list = Object.values(res.data)})
          .catch(err=>{console.log(err)})
      },
      getActiveCount(){
        activeblogscountAPI()
          .then(res=>{this.total_count = res.data[0]['count']})
          .catch(err=>{console.log(err)})
      },
      getFrozenBlogs(){
        frozenblogslistAPI({start:this.start,length:this.length})
        .then(res=>{this.list = Object.values(res.data)})
        .catch(err=>{console.log(err)})
      },
      getFrozenCount(){
        frozenblogscountAPI()
          .then(res=>{this.total_count = res.data[0]['count']})
          .catch(err=>{console.log(err)})
      },
      getDraftBlogs(){
        draftblogslistAPI({start:this.start,length:this.length})
        .then(res=>{this.list = Object.values(res.data)})
        .catch(err=>{console.log(err)})
      },
      getDraftCount(){
        draftblogscountAPI()
          .then(res=>{this.total_count = res.data[0]['count']})
          .catch(err=>{console.log(err)})
      },
      async handleClick() {
        if(this.activeName == 'active'){
          await this.getActiveCount()
          await this.getActiveBlogs()
        }else if(this.activeName == 'frozen'){
          await this.getFrozenCount()
          await this.getFrozenBlogs()
        }else if(this.activeName == 'drafts'){
          await this.getDraftCount()
          await this.getDraftBlogs()
        }
        this.setPagenationKey()
      },
      async initFunc(){
        await this.getActiveCount()
        await this.getActiveBlogs()
        this.setPagenationKey()
      },
      //table子组件点击操作后回传数据
      //
      handleTableViewChange(aimed_active_name){
        console.log('点击了操作'+aimed_active_name)
        this.activeName = aimed_active_name
        setTimeout(()=>{
          this.handleClick()
        },0)
      }
    },
    mounted(){
      // init
      this.initFunc()
    },
    watch:{
      activeName:{
        handler(oldVal,newVal){
          if(oldVal != newVal){
            this.resetPageParam()
          }
        }
      },
      list:{
        handler(oldVal,newVal){
          // this.list = oldVal
        },
        immediate:false,
        deep:true
      }
    }
}
</script>

<style lang="less" scoped>
#manageblog-page{
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  // height: 80vh;
  width: auto;
  height: auto;
  overflow: auto;
  .el-tabs--border-card {
    
    width: 100% !important;
  }
  .el-tab-pane{
    // height: 80vh !important;
    width: 100%;
  }
}

</style>
