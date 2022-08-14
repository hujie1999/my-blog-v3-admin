<template>
  <div id="examine-user-adn-admin">
    <!-- <h2>ExamineUserAndAdmin</h2> -->

      <el-tabs type="border-card"
      v-model="activeName"
      @tab-click="handleClick"
      >
        <el-tab-pane
        label="用户注册预审"
        name="preexamine_user"
        >
        </el-tab-pane>
        <el-tab-pane
        label="管理员注册预审"
        name="preexamine_admin"
        >
        </el-tab-pane>
        <el-tab-pane
        label="用户未过审"
        name="fallen_user"
        >
        </el-tab-pane>
        <el-tab-pane
        label="管理员未过审"
        name="fallen_admin"
        >
        </el-tab-pane>

        <usertable
        v-if="activeName == 'preexamine_user'||activeName == 'fallen_user'"
        :information="information"
        :activename="activeName"
        @showAdmit="handleAdmit"
        @showRefuse="handleRefuse"
        @showDelete="handleDelete"
        @showMultiData="handleMultiSelectionData"
        ></usertable>
        
        <admintable
        v-else
        :information="information"
        :activename="activeName"
        @showAdmit="handleAdmit"
        @showRefuse="handleRefuse"
        @showDelete="handleDelete"
        @showMultiData="handleMultiSelectionData"
        >
        </admintable>

      
      <div
      v-if="activeName=='preexamine_user'"
      class="op-btn"
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
      <userlistpagenation 
      v-if="this.information.length!=0"
      :current='current_page'
      :start="start"
      :length="length"
      :total="total_count"
      :key="pagenation_key"
      @handledPageParams='getPageParam'
      >
      </userlistpagenation>
      </el-tabs>

    

  </div>
</template>

<script>
import UserListPageNation from '../Pagenation/UserListPageNation.vue'
import { resetpagenationdata } from '../Mixin/resetpagenationdata'
import UserTable from '../TableTemplate/UserTable.vue'
import AdminTable from '../TableTemplate/AdminTable.vue'
import { 
  preexamineduserlistAPI,
  preexaminedusercountAPI,
  fallenexamineduserlistAPI,
  fallenexaminedusercountAPI,
  examineadmituserAPI,
  examinerefuseuserAPI,
  preexaminedadminlistAPI,
  preexaminedadmincountAPI,
  fallenexaminedadminlistAPI,
  fallenexaminedadmincountAPI,
  examineadmitadminAPI,
  examinerefuseadminAPI,
  deleteuserAPI,
  deleteadminuserAPI
 } from '../../../http/api'
export default {
  name: 'ExamineUserAndAdmin',
  mixins:[resetpagenationdata],
  data(){
    return {
      information:[],
      activeName:'preexamine_user',
      // User_UniqueId_List:[],
      // showmultibtn : true
    }
  },
  components:{
    userlistpagenation:UserListPageNation,
    usertable : UserTable,
    admintable : AdminTable
    

  },
  computed:{
    computedMultiBtn(){
      return this.showmultibtn
    }
  },
  methods:{

 
   
    //处理批量多选数据
     handleMultiSelectionData(val) {
       if(val.length!=0)
        this.showmultibtn = false
       else{
        this.showmultibtn = true
       }
        //这个页面 只为User的审核操作添加多选功能
        let temp = []
        val.map(v=>{
           temp.push(v['User_UniqueId'])
        })
        this.User_UniqueId_List = temp
      },
      //批量通过 undo
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
      //批量否决 undo 
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
          if(this.activeName == 'preexamine_user' || this.activeName =='fallen_user'){
            examineadmituserAPI({User_UniqueId:row['User_UniqueId']}).then(res=>{resolve(res)}).catch(err=>{reject(err)})
          }else if(this.activeName == 'preexamine_admin' || this.activeName == 'fallen_admin'){
            examineadmitadminAPI({Admin_UniqueId:row['Admin_UniqueId']}).then(res=>{resolve(res)}).catch(err=>{reject(err)})
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
          if(this.activeName == 'preexamine_user'){
            examinerefuseuserAPI({User_UniqueId:row['User_UniqueId']}).then(res=>{resolve(res)}).catch(err=>{reject(err)})
          }else if(this.activeName == 'preexamine_admin'){
            examinerefuseadminAPI({Admin_UniqueId:row['Admin_UniqueId']}).then(res=>{resolve(res)}).catch(err=>{reject(err)})
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
          if(this.activeName =='fallen_user'){
            deleteuserAPI({User_UniqueId:row['User_UniqueId']}).then(res=>{resolve(res)}).catch(err=>{reject(err)})
          }else if(this.activeName == 'fallen_admin'){
            deleteadminuserAPI({Admin_UniqueId:row['Admin_UniqueId']}).then(res=>{resolve(res)}).catch(err=>{reject(err)})
          }
        })
      },
      handleDelete(idx,row){
        this.$confirm('此操作将永久删除该用户, 是否继续?', '注意', {
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
      getPreExminedUserList(){
        preexamineduserlistAPI({start:this.start,length:this.length})
          .then(res=>{this.information = Object.values(res.data)})
          .catch(err=>{console.log(err)})
      },
      getPreExminedUserCount(){
        preexaminedusercountAPI()
          .then(res=>{this.total_count = res.data[0]['count']})
          .catch(err=>{console.log(err)})
      },
      getPreExminedAdminList(){
        preexaminedadminlistAPI({start:this.start,length:this.length})
        .then(res=>{this.information = Object.values(res.data)})
        .catch(err=>{console.log(err)})
      },
      getPreExminedAdminCount(){
        preexaminedadmincountAPI()
          .then(res=>{this.total_count = res.data[0]['count']})
          .catch(err=>{console.log(err)})
      },     
      getFallenUserList(){
        fallenexamineduserlistAPI({start:this.start,length:this.length})
          .then(res=>{this.information = Object.values(res.data)})
          .catch(err=>{console.log(err)})
      },
      getFallenUserCount(){
        fallenexaminedusercountAPI()
          .then(res=>{this.total_count = res.data[0]['count']})
          .catch(err=>{console.log(err)})
      },
      getFallenAdminList(){
        fallenexaminedadminlistAPI({start:this.start,length:this.length})
          .then(res=>{this.information = Object.values(res.data)})
          .catch(err=>{console.log(err)})
      },
      getFallenAdminCount(){
        fallenexaminedadmincountAPI()
          .then(res=>{this.total_count = res.data[0]['count']})
          .catch(err=>{console.log(err)})
      },

      async handleClick() {
        
        this.setPagenationKey()
        this.resetMultiData()
        if(this.activeName == 'preexamine_user'){
          await this.getPreExminedUserCount()
          await this.getPreExminedUserList()
        }else if(this.activeName == 'preexamine_admin'){
          await this.getPreExminedAdminCount()
          await this.getPreExminedAdminList()
        }
        else if(this.activeName =='fallen_user'){
          await this.getFallenUserCount()
          await this.getFallenUserList()
        }else if(this.activeName == 'fallen_admin'){
          await this.getFallenAdminCount()
          await this.getFallenAdminList()
        }      
        
      },
      async initFunc(){
        await this.getPreExminedUserCount()
        await this.getPreExminedUserList()
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
#examine-user-adn-admin{
  // height: 90vh;
  height: auto;
  width: auto;
  .el-tabs--border-card {  
    box-shadow: none !important; 
    border-bottom: 0 !important;
  }
  .op-btn{
    padding: 5px 10px;
  }
}
</style>
