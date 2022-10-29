<template>
  <div id="blog-comments-table">
    <!-- <h2>this is 评论审核 page</h2> -->

      <el-tabs type="border-card"
      v-model="activeName"
      @tab-click="handleClick"
      >
        <el-tab-pane
        label="博客评论预审"
        name="preexmine_blogcomment"
        >
        </el-tab-pane>
        <el-tab-pane
        label="留言板回复预审"
        name="preexmine_messagecomment"
        >
        </el-tab-pane>
        <el-tab-pane
        label="博客评论未过审"
        name="fallen_blogcomment"
        >
        </el-tab-pane>
        <el-tab-pane
        label="留言板留言未过审"
        name="fallen_messagecomment"
        >
        </el-tab-pane>

     <el-table
      :data="information"
      style="width:100%"
      height="70vh"
      @selection-change="handleSelectionChange"
    > 
    <el-table-column
      type="selection"
      width="30"
      v-if=" activeName=='preexmine_blogcomment' || activeName=='preexmine_messagecomment'"
      >
    </el-table-column>
      <el-table-column type="expand" label="详细" width="50">
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
      <el-table-column prop="Blog_Id" label="所属博客ID" width="100"
      >
      </el-table-column>
      <el-table-column prop="Blog_Title" label="博客Title" width="220"
      >
      </el-table-column>
      <el-table-column prop="Parent_Person_Name" label="被评论人Name" width="140"
      >
      </el-table-column>   
      <el-table-column prop="Comment_Person_Name" label="评论人Name" width="140">
      </el-table-column>
      <el-table-column prop="Comment_Content" :show-overflow-tooltip="true" label="评论内容" width="280">
      </el-table-column>
      <el-table-column prop="Create_Time" label="评论发布日期"  :formatter="dateFormat" width="180">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-tooltip  
          class="item" 
          effect="dark" 
          content="审核通过" 
          placement="top">
            <el-button
              size="mini"
              type="success"
              circle
              icon="el-icon-check"
              @click="handleAdmit(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip  
          class="item" 
          effect="dark" 
          content="审核不通过" 
          placement="top"
          v-if="activeName !='fallen_blogcomment' && activeName !='fallen_messagecomment'"
          >
            <el-button
              size="mini"
              type="warning"
              circle
              icon="el-icon-close"
              @click="handleRefuse(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip 
          class="item" 
          effect="dark" 
          content="删除" 
          placement="top"
          v-if="activeName !='preexmine_blogcomment' && activeName !='preexmine_messagecomment'"
          >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDelete(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          
        </template>
      </el-table-column>
    </el-table>

      <div
      class="op-btn"
      v-if="activeName=='preexmine_blogcomment' || activeName=='preexmine_messagecomment'"
      >
        <el-button 
        type="primary" 
        size="small"
        :disabled='computedMultiBtn'
        @click="multiAdmit"
        >批量通过</el-button>
        <el-button 
        type="danger" 
        size="small"
        :disabled='computedMultiBtn'
        @click="multiRefuse"
        >批量否决</el-button>
      </div>

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
  preexminedblogcommentlistAPI,
  preexminedmessagecommentlistAPI,
  fallenblogcommentlistAPI,
  fallenmessagecommentlistAPI,
  preexminedblogcommentcountAPI,
  preexminedmessagecommentcountAPI,
  fallenblogcommentcountAPI,
  fallenmessagecommentcountAPI,
  exmineadmitblogcommentAPI,
  exminerefuseblogcommentAPI,
  exmineadmitmessagecommentAPI,
  exminerefusemessagecommentAPI,
  deleteblogcommentAPI,
  deletemessagecommentAPI,
  multiexmineadmitcommentAPI,
  multiexminerefusecommentAPI
 } from '../../../http/api'
export default {
  name: 'ExamineComment',
  mixins:[resetpagenationdata],
  data(){
    return {
      information:[],
      activeName:'preexmine_blogcomment',
      // //多选操作 所有选中的项
      // multipleSelection: [],
      // //多选操作按钮显示条件
      // showmultibtn:true,
      // //多选操作 评论或回复的Id 列表
      // Comment_Id_List:null
    }
  },
  components:{
    commentslistpagenation:CommentsListPageNation
  },
  computed:{
    computedMultiBtn(){
      return this.showmultibtn
    }
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
    //处理批量多选数据
     handleSelectionChange(val) {
        if(val.length!=0)
          this.showmultibtn = false
        else{
          this.showmultibtn = true
        }
        this.multipleSelection = val;
        // console.log(this.multipleSelection)
        let temp = []
        this.multipleSelection.map(v=>{
           temp.push(v['Comment_Id'])
        })
        this.Comment_Id_List = temp
      },
      //批量通过
      multiAdmit(){
        let params = {
          activeName:this.activeName,
          Comment_Id_List:this.Comment_Id_List
        }
        multiexmineadmitcommentAPI(params)
        .then(res=>{
          this.$notify({
            title: '成功',
            message: '批量通过审核操作成功！',
            type: 'success'
          });
          this.handleClick()
        })
        .catch(err=>{
          console.log(err)
          this.$notify({
            title: '出错了',
            message: '批量通过审核操作失败！',
            type: 'error'
          });
        })

      },
      //批量否决
      multiRefuse(){
        let params = {
          activeName:this.activeName,
          Comment_Id_List:this.Comment_Id_List
        }
        multiexminerefusecommentAPI(params)
        .then(res=>{
          this.$notify({
            title: '成功',
            message: '批量否决操作成功！',
            type: 'success'
          });
          this.handleClick()
        })
        .catch(err=>{
          console.log(err)
          this.$notify({
            title: '出错了',
            message: '批量否决操作失败！',
            type: 'error'
          });
        })
      },
      dealAdmit(idx,row){
        return new Promise ((resolve,reject)=>{
          if(this.activeName == 'preexmine_blogcomment' || this.activeName =='fallen_blogcomment'){
            exmineadmitblogcommentAPI({Comment_Id:row['Comment_Id']}).then(res=>{resolve(res)}).catch(err=>{reject(err)})
          }else if(this.activeName == 'preexmine_messagecomment' || this.activeName == 'fallen_messagecomment'){
            exmineadmitmessagecommentAPI({Comment_Id:row['Comment_Id']}).then(res=>{resolve(res)}).catch(err=>{reject(err)})
          }
        })
      },
      handleAdmit(idx,row){
        this.dealAdmit(idx,row)
        .then(res=>{
          this.$message({
              type: 'success',
              message: '审核成功通过!'
          });
          this.handleClick()
        })
        .catch(err=>{
          this.$message({
              type: 'error',
              message: '审核通过失败!!'
          }); 
        })

      },
      dealRefuse(idx,row){
        return new Promise ((resolve,reject)=>{
          if(this.activeName == 'preexmine_blogcomment'){
            exminerefuseblogcommentAPI({Comment_Id:row['Comment_Id']}).then(res=>{resolve(res)}).catch(err=>{reject(err)})
          }else if(this.activeName == 'preexmine_messagecomment'){
            exminerefusemessagecommentAPI({Comment_Id:row['Comment_Id']}).then(res=>{resolve(res)}).catch(err=>{reject(err)})
          }
        })
      },
      handleRefuse(idx,row){
        this.dealRefuse(idx,row)
        .then(res=>{
          this.$message({
              type: 'success',
              message: '执行成功!'
          });
          this.handleClick()
        })
        .catch(err=>{
          this.$message({
              type: 'error',
              message: '执行失败!!'
          }); 
        })
      },
      dealDelete(idx,row){
        return new Promise ((resolve,reject)=>{
          if(this.activeName =='fallen_blogcomment'){
            deleteblogcommentAPI({Comment_Id:row['Comment_Id']}).then(res=>{resolve(res)}).catch(err=>{reject(err)})
          }else if(this.activeName == 'fallen_messagecomment'){
            deletemessagecommentAPI({Comment_Id:row['Comment_Id']}).then(res=>{resolve(res)}).catch(err=>{reject(err)})
          }
        })
      },
      handleDelete(idx,row){
        this.$confirm('此操作将永久删除该留言, 是否继续?', '注意', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
          }).then(() => {
            this.dealDelete(idx,row)
            .then(res=>{
              this.$message({
                  type: 'success',
                  message: '执行成功!'
              });
              this.handleClick()
            })
            .catch(err=>{
              this.$message({
                  type: 'error',
                  message: '执行失败!!'
              }); 
            })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

        
        
      },
      getPreExminedBlogComment(){
        preexminedblogcommentlistAPI({start:this.start,length:this.length})
          .then(res=>{this.information = Object.values(res.data)})
          .catch(err=>{console.log(err)})
      },
      getPreExminedBlogCommentCount(){
        preexminedblogcommentcountAPI()
          .then(res=>{this.total_count = res.data[0]['count']})
          .catch(err=>{console.log(err)})
      },
      getPreExminedMessageComment(){
        preexminedmessagecommentlistAPI({start:this.start,length:this.length})
        .then(res=>{this.information = Object.values(res.data)})
        .catch(err=>{console.log(err)})
      },
      getPreExminedMessageCommentCount(){
        preexminedmessagecommentcountAPI()
          .then(res=>{this.total_count = res.data[0]['count']})
          .catch(err=>{console.log(err)})
      },
      
      getFallenBlogComment(){
        fallenblogcommentlistAPI({start:this.start,length:this.length})
          .then(res=>{this.information = Object.values(res.data)})
          .catch(err=>{console.log(err)})
      },
      getFallenBlogCommentCount(){
        fallenblogcommentcountAPI()
          .then(res=>{this.total_count = res.data[0]['count']})
          .catch(err=>{console.log(err)})
      },
      getFallenMessageComment(){
        fallenmessagecommentlistAPI({start:this.start,length:this.length})
          .then(res=>{this.information = Object.values(res.data)})
          .catch(err=>{console.log(err)})
      },
      getFallenMessageCommentCount(){
        fallenmessagecommentcountAPI()
          .then(res=>{this.total_count = res.data[0]['count']})
          .catch(err=>{console.log(err)})
      },

      async handleClick() {
        if(this.activeName == 'preexmine_blogcomment'){
          await this.getPreExminedBlogCommentCount()
          await this.getPreExminedBlogComment()
        }else if(this.activeName == 'preexmine_messagecomment'){
          await this.getPreExminedMessageCommentCount()
          await this.getPreExminedMessageComment()
        }
        else if(this.activeName =='fallen_blogcomment'){
          await this.getFallenBlogCommentCount()
          await this.getFallenBlogComment()
        }else if(this.activeName == 'fallen_messagecomment'){
          await this.getFallenMessageCommentCount()
          await this.getFallenMessageComment()
        }
        // this.multipleSelection = []
        // this.showmultibtn =true
        this.resetMultiData()
        this.setPagenationKey()
      },
      async initFunc(){
        await this.getPreExminedBlogCommentCount()
        await this.getPreExminedBlogComment()
        this.setPagenationKey()
      },
      getPageParam(c,s){
        this.current_page = c
        this.start = s
        this.handleClick()
      },
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
    width: 50%;
    padding: 0px 20px 0px 0px;
  }
  .op-btn{
    padding: 5px 10px;
  }
 

}
</style>
