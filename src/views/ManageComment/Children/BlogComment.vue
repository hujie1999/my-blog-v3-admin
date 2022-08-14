<template>
  <div id="blog-comments-table">
    <!-- <h2>this is 博客评论管理 page</h2> -->

      <el-tabs type="border-card"
      v-model="activeName"
      @tab-click="handleClick"
      >
        <el-tab-pane
        label="正常状态评论"
        name="active"
        >
        </el-tab-pane>
        <el-tab-pane
        label="冻结状态评论"
        name="frozen"
        >
        </el-tab-pane>

     <el-table
      :data="information"
      style="width:100%"
      height="65vh"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="被评论ID:">
              <span>{{ props.row.Father_Comment_Id }}</span>
            </el-form-item>
            <el-form-item label="现评论ID:">
              <span>{{ props.row.Comment_Id }}</span>
            </el-form-item>
            <el-form-item label="被评论人ID:">
              <span>{{ props.row.Parent_Person_Id }}</span>
            </el-form-item>
            <el-form-item label="评论人ID:">
              <span>{{ props.row.Comment_Person_Id }}</span>
            </el-form-item>
            <!-- 被评论内容 字段需要再次请求实现 -->
            <el-form-item label="被评论内容:"
              v-if="props.row.Parrent_Comment_Content"
            >
              <span>{{ props.row.Parrent_Comment_Content.Comment_Content }}</span>
            </el-form-item>
            <el-form-item label="被评论内容:"
              v-else
            >
              <span>{{ props.row.Parrent_Comment_Content }}</span>
            </el-form-item>
            <el-form-item label="评论内容:">
              <span>{{ props.row.Comment_Content }}</span>
            </el-form-item>
            
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="Blog_Id" label="所属博客ID" width="150">
      </el-table-column>
      <el-table-column prop="Blog_Title" label="博客Title" width="220">
      </el-table-column>
      <el-table-column prop="Parent_Person_Name" label="被评论人Name" width="140">
      </el-table-column>
      <el-table-column prop="Comment_Person_Name" label="评论人Name" width="140">
      </el-table-column>
      <el-table-column prop="Comment_Content" :show-overflow-tooltip="true" label="评论内容" width="280">
      </el-table-column>
      <el-table-column prop="Create_Time" label="评论发布日期"  :formatter="dateFormat" width="180">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-tooltip v-if="activeName == 'active'" class="item" effect="dark" content="冻结" placement="top">
            <el-button
              size="mini"
              type="warning"
              circle
              icon="el-icon-lock"
              @click="handleFrozenComment(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip v-if="activeName == 'frozen'" class="item" effect="dark" content="解冻" placement="top">
            <el-button
              size="mini"
              type="success"
              circle
              icon="el-icon-unlock"
              @click="handleUnFrozenComment(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDeleteComment(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          
        </template>
      </el-table-column>
    </el-table>
<!-- 分页器 -->
      <commentslistpagenation 
      v-if="this.information.length!=0"
      :current='current_page'
      :start="start"
      :length="length"
      :total="total_count"
      :key="pagenation_key"
      @handledPageParams='getPageParam'
      >
      </commentslistpagenation>

    </el-tabs>

    

  </div>
</template>

<script>
import CommentsListPageNation from '../Pagenation/CommentsListPageNation.vue'
import { resetpagenationdata } from '../Mixin/resetpagenationdata'
import { 
  activeblogcommentslistAPI,
  activeblogcommentscountAPI,
  frozenblogcommentslistAPI,
  frozenblogcommentscountAPI,
  frozenblogcommentAPI,
  unfrozenblogcommentAPI,
  deleteblogcommentAPI
 } from '../../../http/api'
export default {
  name: 'BlogComment',
  mixins:[resetpagenationdata],
  data(){
    return {
      information:[],
      activeName:'active',
      // current_page:1,
      // start:0,
      // length:4,
      // total_count:null,
      // pagenation_key:null
    }
  },
  components:{
    commentslistpagenation:CommentsListPageNation
  },
  methods:{
    //格式化日期
    dateFormat(row,column){
       const date = row[column.property]
        if (date === undefined) {
          return ''
        }
        return this.$moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
     getActiveComment(){
        activeblogcommentslistAPI({start:this.start,length:this.length})
          .then(res=>{this.information = Object.values(res.data)})
          .catch(err=>{console.log(err)})
      },
      getActiveCount(){
        activeblogcommentscountAPI()
          .then(res=>{this.total_count = res.data[0]['count']})
          .catch(err=>{console.log(err)})
      },
      getFrozenComment(){
        frozenblogcommentslistAPI({start:this.start,length:this.length})
        .then(res=>{this.information = Object.values(res.data)})
        .catch(err=>{console.log(err)})
      },
      getFrozenCount(){
        frozenblogcommentscountAPI()
          .then(res=>{this.total_count = res.data[0]['count']})
          .catch(err=>{console.log(err)})
      },
      async handleClick() {
        if(this.activeName == 'active'){
          await this.getActiveCount()
          await this.getActiveComment()
        }else if(this.activeName == 'frozen'){
          await this.getFrozenCount()
          await this.getFrozenComment()
        }
        this.setPagenationKey()
      },
      async initFunc(){
        await this.getActiveCount()
        await this.getActiveComment()
        this.setPagenationKey()
      },
      resetPageParam(){
        this.current_page = 1
        this.start = 0
        this.total_count = null
      },
      getPageParam(c,s){
        this.current_page = c
        this.start = s
        this.handleClick()
      },
      handleFrozenComment(idx,row){
        frozenblogcommentAPI({Comment_Id:row['Comment_Id']})
        .then(res=>{
          this.$message({
              type: 'success',
              message: '冻结成功!'
          });
          this.handleClick()
        })
        .catch(err=>{
          this.$message({
              type: 'error',
              message: '冻结失败!'
          }); 
        })
      },
      handleUnFrozenComment(idx,row){
        unfrozenblogcommentAPI({Comment_Id:row['Comment_Id']})
        .then(res=>{
          this.$message({
              type: 'success',
              message: '解冻成功!'
          });
          this.handleClick()
        })
        .catch(err=>{
          this.$message({
              type: 'error',
              message: '解冻失败!'
          }); 
        })
      },
      handleDeleteComment(idx,row){
         this.$confirm('此操作将永久删除该评论, 是否继续?', '注意', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          deleteblogcommentAPI({Comment_Id:row['Comment_Id']})
          .then(res=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.handleClick()
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
      }
  },
  mounted(){
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
  }
}
</script>
<style>
 .el-tooltip__popper {
  max-width: 60%;
  }
.el-tooltip__popper,
 .el-tooltip__popper.is-dark {
    max-width: 30%;
    /* line-height: 24px; */
    height: auto;
    max-height: 60px;
    /* padding-bottom: 20px; */
    overflow: hidden;
    color: #fff;
  }
</style>
<style lang="less" scoped>
#blog-comments-table{
  // height: 90vh;
  height: auto;
  width: auto;
  .el-tabs--border-card {  
    box-shadow: none !important; 
    border-bottom: 0 !important;
  }
  .demo-table-expand {
    font-size: 0;
    padding: 0px 40px !important;
    // background: #f0f9eb;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    height: auto;
    line-height: 10px;
    margin-right: 0;
    margin-bottom: 0;
    padding: 0px 20px 0px 0px;
    width: 50%;
  }
 

}
</style>
