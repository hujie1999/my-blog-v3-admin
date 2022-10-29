<template>
  <div id="bloglisttable-block">
    <!-- 用于展示正常和冻结状态博客的公用模板 -->
    <!-- max-height="600" ：滚动列表 -->
    <el-table
      :data="information"
      style="width: 100%"
      height="75vh"
      :cell-style="cellStyle"
    >
      <el-table-column type="expand" label="详细" width="80">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="博客ID">
              <span>{{ props.row.Blog_Id }}</span>
            </el-form-item>
            <el-form-item label="点赞数">
              <span>{{ props.row.Blog_Likes }}</span>
            </el-form-item>
            <el-form-item label="浏览数">
              <span>{{ props.row.Blog_Views }}</span>
            </el-form-item>
            <el-form-item label="收藏数">
              <span>{{ props.row.Blog_Collected }}</span>
            </el-form-item>
            <el-form-item label="评论数">
              <span>{{ props.row.Blog_Comments }}</span>
            </el-form-item>
            <el-form-item label="作者">
              <span>{{ props.row.Blog_Author }}</span>
            </el-form-item>
            <!-- <el-form-item label="状态">
              <span>{{ props.row.Blog_Status }}</span>
            </el-form-item> -->
            <el-form-item label="预览摘要">
                <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-view"
                    @click="showDrawer(props.row.Blog_Summary,'Summary')"
                    circle
            ></el-button>
            </el-form-item>
            <el-form-item label="预览内容">
                <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-view"
                    @click="showDrawer(props.row.Blog_Content,'Content')"
                    circle
            ></el-button>
            
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="Blog_Title" label="标题" width="150">
      </el-table-column>
      <el-table-column prop="Blog_Summary" label="摘要" width="180">
      </el-table-column>
      <el-table-column prop="Blog_Tags" label="标签" width="250px" 
      >
        <template slot-scope="scope"
        >
          <bloglisttabletags
          v-if="scope.row.Blog_Tags!=''"
            :tagslist= 'scope.row.Blog_Tags'
          ></bloglisttabletags>
          <span v-else>无标签</span>
        
        </template>
      </el-table-column>
      <el-table-column prop="Blog_Class" label="分类" width="70">
      </el-table-column>
      <el-table-column prop="Blog_Content"  label="内容" width="180">
      </el-table-column>
      <el-table-column prop="Blog_SummaryImg" label="摘要图片" width="200">
         <template slot-scope="scope">
           <img 
           style="height:110px"
           :src="scope.row.Blog_SummaryImg | imgUrlFormater(imgbaseurl)"
           alt=""> 
         </template>
      </el-table-column>
      <el-table-column prop="Blog_Createtime" :formatter="dateFormat" label="发布时间" width="100">

      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="handleUpdate(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip v-if="active_name == 'active'" class="item" effect="dark" content="冻结" placement="top">
            <el-button
              size="mini"
              type="warning"
              circle
              icon="el-icon-lock"
              @click="handleFrozenBlog(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip v-if="active_name == 'frozen'" class="item" effect="dark" content="解冻" placement="top">
            <el-button
              size="mini"
              type="success"
              circle
              icon="el-icon-unlock"
              @click="handleUnFrozenBlog(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip v-if="active_name == 'drafts'" class="item" effect="dark" content="直接发布" placement="top">
            <el-button
              size="mini"
              type="success"
              icon="el-icon-s-promotion"
              circle
              @click="handlePublishDraft(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDeleteBlog(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          
        </template>
      </el-table-column>
    </el-table>


    <el-drawer
        :visible.sync="drawer"    
        :with-header="true"
        :before-close="handleClose"
        size="50%">
        <h4 v-text="this.drawer_title"></h4>
        <div
        style="max-height:85vh">
            <markdown
            :show="true"
            :value="this.drawer_txt"
        ></markdown>
        </div>
    </el-drawer>
  </div>
</template>

<script>
import MarkDown from '../../../components/MarkDown/MarkDown.vue'
import BlogListTableTags from './Tags/BlogListTableTags.vue';
import settings from '../../../setting'
import { 
  publishdraftsAPI,
  frozenblogAPI,
  unfrozenblogAPI,
  deleteblogAPI

 } from '../../../http/api'
export default {
  name: "basic",
  components:{
      markdown : MarkDown,
      bloglisttabletags : BlogListTableTags
  },
  data() {
    return {
        drawer:false,
        drawer_title :'',
        drawer_txt:'',
        active_name:'',
        aimed_path:'',
        imgbaseurl:settings.userimgbaseurl
    };
  },
  props: {
    information: [],
    //传来的当前高亮的name，根据name可以跳转页面
    activename:null,
    //点击操作后，回传视图更新函数
    changeView:{
      type:Function
    }
  },
  filters:{
    //格式imgurl的过滤器
    imgUrlFormater(val,base){
      if(!val) return ''
      return base+val.slice(0,val.length-1)
    }
  },
  computed:{
  },
  methods: {
    showDrawer(txt,name){
      this.drawer_title = name
      this.drawer_txt = txt
      setTimeout(()=>{
        this.drawer = !this.drawer
      },500)
    },
    handleClose(done) {
      done()
    },
    handleUpdate(index, row) {
      // console.log(index, row);
      if(this.active_name == 'active'){
        this.aimed_path = '/updateblog'
      }
      else if(this.active_name == 'frozen'){
        this.aimed_path = '/updateblog'
      }
      else if(this.active_name =='drafts'){
        this.aimed_path = '/publishdrafts'
      }
      this.$router.push({
        path:this.aimed_path,
        query: {Blog_Id:row['Blog_Id']}
      })
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 2 || columnIndex == 5) {
        return {
          'display': "flex",
          'overflow': "hidden",
          "text-overflow": "ellipsis",
        };
      }
    },
    //格式化日期
    dateFormat(row,column){
       const date = row[column.property]
        if (date === undefined) {
          return ''
        }
        return this.$moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    handlePublishDraft(index, row){
      const loading = this.$loading({
                lock: true,
                text: '正在提交发布...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.7)'
            });
      publishdraftsAPI({Blog_Id:row['Blog_Id']})
      .then(res=>{
        setTimeout(()=>{
                    loading.close();
                    
                    this.$message({
                      type: 'success',
                      message: '发布草稿成功!'
                    });
                    //更新视图  
                   this.$emit('changeView',this.active_name)
                },1000)     
      })
      .catch(err=>{
        this.$message({
              type: 'error',
              message: '发布草稿失败!'
            }); 
      })
    },
    handleFrozenBlog(index, row){
      frozenblogAPI({Blog_Id:row['Blog_Id']})
      .then(res=>{
        this.$message({
              type: 'success',
              message: '冻结成功!'
            });
            this.$emit('changeView',this.active_name)
      })
      .catch(err=>{
        this.$message({
              type: 'error',
              message: '冻结失败!'
            }); 
      })
    },
    handleUnFrozenBlog(index, row){
      unfrozenblogAPI({Blog_Id:row['Blog_Id']})
      .then(res=>{
        this.$message({
              type: 'success',
              message: '解冻成功!'
            });
            //更新视图
            this.$emit('changeView',this.active_name)
      })
      .catch(err=>{
        this.$message({
              type: 'error',
              message: '解冻失败!'
            }); 
      })
    },
    handleDeleteBlog(index, row){
      this.$confirm('此操作将永久删除该博客, 是否继续?', '注意', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          deleteblogAPI({Blog_Id:row['Blog_Id']})
          .then(res=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            //更新视图
            this.$emit('changeView',this.active_name)
          })
          .catch(err=>{
            console.log(err)
            this.$message({
              type: 'error',
              message: '删除失败!'
            }); 
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    },
  },
  created(){
    
  },
  watch:{
    activename:{
      handler(oldVal,newVal){
        // console.log(oldVal)
        this.active_name = oldVal
      },
      immediate:true
    }
  }
};
</script>
<style lang='less'>
#bloglisttable-block {
  width: 100% !important;
  // min-height: 75vh !important;
  // height: 100%;
  .el-tabs--border-card {   
    border-bottom: 0;
  }
  .el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar {
    display: none !important;
  }
  .el-table__header tr,
  .el-table__header th {
    // text-align: center;
    padding: 0 !important;
    height: 40px !important;
  }
  .el-table__body tr,
  .el-table__body td {
    // margin: 20px 0px !important;
    height: 140px !important;
  }

  .demo-table-expand {
    font-size: 0;
    padding: 0px 20px !important;
    // background: #f0f9eb;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    height: 30px;
    margin-right: 0;
    margin-bottom: 0;
    width: 35%;
  }
  .el-drawer__header {
 
    margin-bottom: 0px !important;
    // padding: 20px 20px 0;
    padding: 20px 20px 0px 20px !important;
  }

}
</style>
