<template>
  <!-- <h1>ManageAdminUser</h1> -->
  <div id="manage-admin-user">
    <el-tabs type="border-card"
      v-model="activeName"
      @tab-click="handleClick"
      >
        <el-tab-pane
        label="管理员列表"
        name="active"
        >
        </el-tab-pane>
        <el-tab-pane
        label="冻结列表"
        name="frozen"
        >
        </el-tab-pane>

     <el-table
      :data="information"
      style="width:100%"
      height="65vh"
    >
      <el-table-column type="expand"
      label="详细" width="80"
      >
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <!-- <el-form-item label="头像:">
              <span>{{ props.row.Admin_Avatar }}</span>
            </el-form-item> -->
            <el-form-item label="密码:">
              <span>{{ props.row.Admin_Password }}</span>
            </el-form-item>
            <!-- <el-form-item label="Admin_Role_Id:">
              <span>{{ props.row.Admin_Role_Id }}</span>
            </el-form-item> -->
            <el-form-item label="介绍:">
              <span>{{ props.row.Admin_Introduction }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="Admin_UniqueId" label="UniqueID" width="160">
      </el-table-column>
      <el-table-column prop="Admin_Role" label="Role" width="80">
      </el-table-column>
      <el-table-column prop="Admin_Nickname" label="昵称" width="120">
      </el-table-column>
      <el-table-column prop="Admin_Account" label="账号" width="100">
      </el-table-column>
      <el-table-column prop="Admin_Email" label="邮箱" width="180">
      </el-table-column>
      <el-table-column prop="Admin_PhoneNumber" label="电话" width="120">
      </el-table-column>
      <el-table-column prop="Admin_Introduction" label="介绍" :show-overflow-tooltip="true" width="180">
      </el-table-column>
      <el-table-column prop="Admin_CreateTime" :formatter="dateFormat" label="创建时间" width="160">
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
          <el-tooltip v-if="activeName == 'active'" class="item" effect="dark" content="冻结" placement="top">
            <el-button
              size="mini"
              type="warning"
              circle
              icon="el-icon-lock"
              @click="handleFrozenAdmin(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip v-if="activeName == 'frozen'" class="item" effect="dark" content="解冻" placement="top">
            <el-button
              size="mini"
              type="success"
              circle
              icon="el-icon-unlock"
              @click="handleUnFrozenAdmin(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="注销" placement="top">
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-switch-button"
              circle
              @click="handleDeleteAdmin(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          
        </template>
      </el-table-column>
      
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
    </el-table>


    </el-tabs>
      <admintabledrawer
      :drawer="drawer"
      :direction="direction"
      :information="edituseritem"
      @showUpdate="getUpdateInfo"
      @showClose="handleCloseDrawer"
      :key="drawer_key"
      >

      </admintabledrawer>
   
      

  </div>
</template>

<script>
import { resetpagenationdata } from '../Mixin/resetpagenationdata'
import UserListPageNation from '../Pagenation/UserListPageNation.vue'
import AdminTableDrawer from '../DrawerTemplate/AdminTableDrawer.vue'
import { 
  activeadminuserlistAPI,
  activeadminusercountAPI,
  frozenadminuserlistAPI,
  frozenadminusercountAPI,
  frozenadminuserAPI,
  unfrozenadminuserAPI,
  deleteadminuserAPI,
  updateadmininfoAPI
 } from '../../../http/api'
export default {
    nameL:'ManageAdminUser',
    mixins:[resetpagenationdata],
    data(){
      return {
        information:[],
        activeName:'active',
        drawer: false,
        direction: 'rtl',
        edituseritem:[]
      }
    },
  components:{
    userlistpagenation:UserListPageNation,
    admintabledrawer:AdminTableDrawer

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
     getActiveAdmin(){
        activeadminuserlistAPI({start:this.start,length:this.length})
          .then(res=>{this.information = Object.values(res.data)})
          .catch(err=>{console.log(err)})
      },
      getActiveCount(){
        activeadminusercountAPI()
          .then(res=>{this.total_count = res.data[0]['count']})
          .catch(err=>{console.log(err)})
      },
      getFrozenAdmin(){
        frozenadminuserlistAPI({start:this.start,length:this.length})
        .then(res=>{this.information = Object.values(res.data)})
        .catch(err=>{console.log(err)})
      },
      getFrozenCount(){
        frozenadminusercountAPI()
          .then(res=>{this.total_count = res.data[0]['count']})
          .catch(err=>{console.log(err)})
      },
      async handleClick() {
        this.drawer = false
        this.edituseritem = []
        if(this.activeName == 'active'){
          await this.getActiveCount()
          await this.getActiveAdmin()
        }else if(this.activeName == 'frozen'){
          await this.getFrozenCount()
          await this.getFrozenAdmin()
        }
        this.setPagenationKey()
      },
      async initFunc(){
        await this.getActiveCount()
        await this.getActiveAdmin()
        this.setPagenationKey()
      },
      getPageParam(c,s){
        this.current_page = c
        this.start = s
        this.handleClick()
      },
      handleFrozenAdmin(idx,row){
        frozenadminuserAPI({Admin_UniqueId:row['Admin_UniqueId']})
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
      handleUnFrozenAdmin(idx,row){
        unfrozenadminuserAPI({Admin_UniqueId:row['Admin_UniqueId']})
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
      handleDeleteAdmin(idx,row){
         this.$confirm('此操作将永久删除该用户, 是否继续?', '注意', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
          }).then(() => {
          deleteadminuserAPI({Admin_UniqueId:row['Admin_UniqueId']})
          .then(res=>{
            this.$message({
              type: 'success',
              message: '注销成功!'
            });
            this.handleClick()
          })
          .catch(err=>{
            console.log(err)
            this.$message({
              type: 'error',
              message: '注销失败!'
            }); 
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleUpdate(idx,row){
        // console.log('点击了编辑按钮')
        this.drawer = true
        this.edituseritem = row
      },
      getUpdateInfo(v){
        
        let params={
          Admin_Nickname:v.Admin_Nickname,
          Admin_Password:v.Admin_Password,
          Admin_Email:v.Admin_Email,
          Admin_PhoneNumber:v.Admin_PhoneNumber,
          Admin_Introduction:v.Admin_Introduction,
          Admin_Role:v.Admin_Role,
          Admin_UniqueId:v.Admin_UniqueId
        }
        // console.log(params)
        this.drawer = false
        this.edituseritem = []

        updateadmininfoAPI(params)
        .then(res=>{
          this.$notify({
            title: '成功',
            message: '管理员修改成功！',
            type: 'success'
          });
          this.handleClick()
        })
        .catch(err=>{
          this.$notify({
            title: '出错了',
            message: '管理员修改失败！！',
            type: 'error'
          });
          this.setDrawerKey()
          this.drawer = false
          this.edituseritem = []
        })
      },
      handleCloseDrawer(done){
        this.drawer = false
        this.edituseritem = []
        done()
        //调用子组件关闭drawer函数close后，重新给drawer组件key赋值
        this.setDrawerKey()
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
#manage-admin-user{
  // height: 90vh;
  height: auto;
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
    width: 30%;
  }
}
</style>