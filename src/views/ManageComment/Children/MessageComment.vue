<template>
  <div id="blog-comments-table">
    <!-- <h2>this is 留言板评论管理 page</h2> -->

      <el-tabs type="border-card"
      v-model="activeName"
      @tab-click="handleClick"
      >
        <el-tab-pane
        label="正常状态留言"
        name="active"
        >
        </el-tab-pane>
        <el-tab-pane
        label="冻结状态留言"
        name="frozen"
        >
        </el-tab-pane>

     <el-table
      :data="information"
      style="width:100%"
      height="70vh"
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
      <el-table-column prop="Parent_Person_Name" label="被评论人Name" width="140">
      </el-table-column>
      <!-- <el-table-column prop="Comment_Person_Id" label="评论人ID" width="180">
      </el-table-column> -->
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
              @click="handleFrozenMessage(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip v-if="activeName == 'frozen'" class="item" effect="dark" content="解冻" placement="top">
            <el-button
              size="mini"
              type="success"
              circle
              icon="el-icon-unlock"
              @click="handleUnFrozenMessage(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDeleteMessage(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          
        </template>
      </el-table-column>
      
    </el-table>


    </el-tabs>

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

  </div>
</template>

<script>
import { resetpagenationdata } from '../Mixin/resetpagenationdata'
import CommentsListPageNation from '../Pagenation/CommentsListPageNation.vue'
import { 
  activemessagecommentslistAPI,
  activemessagecommentscountAPI,
  frozenmessagecommentslistAPI,
  frozenmessagecommentscountAPI,
  frozenmessagecommentAPI,
  unfrozenmessagecommentAPI,
  deletemessagecommentAPI
 } from '../../../http/api'
export default {
  name: 'MessageComment',
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
     getActiveMessage(){
        activemessagecommentslistAPI({start:this.start,length:this.length})
          .then(res=>{this.information = Object.values(res.data)})
          .catch(err=>{console.log(err)})
      },
      getActiveCount(){
        activemessagecommentscountAPI()
          .then(res=>{this.total_count = res.data[0]['count']})
          .catch(err=>{console.log(err)})
      },
      getFrozenMessage(){
        frozenmessagecommentslistAPI({start:this.start,length:this.length})
        .then(res=>{this.information = Object.values(res.data)})
        .catch(err=>{console.log(err)})
      },
      getFrozenCount(){
        frozenmessagecommentscountAPI()
          .then(res=>{this.total_count = res.data[0]['count']})
          .catch(err=>{console.log(err)})
      },
    async handleClick() {
        if(this.activeName == 'active'){
          await this.getActiveCount()
          await this.getActiveMessage()
        }else if(this.activeName == 'frozen'){
          await this.getFrozenCount()
          await this.getFrozenMessage()
        }
        this.setPagenationKey()
      },
      async initFunc(){
        await this.getActiveCount()
        await this.getActiveMessage()
        this.setPagenationKey()
      },
      getPageParam(c,s){
        this.current_page = c
        this.start = s
        this.handleClick()
      },
      handleFrozenMessage(idx,row){
        frozenmessagecommentAPI({Comment_Id:row['Comment_Id']})
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
      handleUnFrozenMessage(idx,row){
        unfrozenmessagecommentAPI({Comment_Id:row['Comment_Id']})
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
      handleDeleteMessage(idx,row){
         this.$confirm('此操作将永久删除该留言, 是否继续?', '注意', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
          }).then(() => {
          deletemessagecommentAPI({Comment_Id:row['Comment_Id']})
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

<style lang="less" scoped>
#blog-comments-table{
  height: 90vh;
  width: auto;
  .el-tabs--border-card {  
    box-shadow: none !important; 
    border-bottom: 0 !important;
  }
  .demo-table-expand {
    font-size: 0;
    padding: 0px 60px !important;
    background: #f0f9eb;
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
    width: 50%;
  }
 

}
</style>
