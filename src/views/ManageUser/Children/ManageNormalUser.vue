<template>
  <!-- <h1>ManageNormalUser</h1> -->
  <div id="manage-normal-user">
    <el-tabs type="border-card"
      v-model="activeName"
      @tab-click="handleClick"
      >
        <el-tab-pane
        label="用户列表"
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
      height="60vh"
    >
      <el-table-column type="expand"
      label="详细" width="80"
      >
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="头像:">
              <!-- <span>{{ props.row.User_Avatar }}</span> -->
              <div class="avatar-control">
                <img :src="props.row.User_Avatar!=''?avatarbaseurl+props.row.User_Avatar:''" alt="user-avatar">
              </div>
            </el-form-item>
            <el-form-item label="密码:">
              <span>{{ props.row.User_Password }}</span>
            </el-form-item>
            <el-form-item label="介绍:">
              <span>{{ props.row.User_Introduction }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="User_UniqueId" label="UniqueID" width="160">
      </el-table-column>
      <el-table-column prop="User_Nickname" label="昵称" width="100">
      </el-table-column>
      <el-table-column prop="User_Account" label="账号" width="120">
      </el-table-column>
      <el-table-column prop="User_Email" label="邮箱" width="180">
      </el-table-column>
      <el-table-column prop="User_PhoneNumber" label="电话" width="120">
      </el-table-column>
      <el-table-column prop="User_Introduction" label="介绍" :show-overflow-tooltip="true" width="180">
      </el-table-column>
      <el-table-column prop="User_CreateTime" :formatter="dateFormat" label="创建时间" width="160">
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
              @click="handleFrozenUser(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip v-if="activeName == 'frozen'" class="item" effect="dark" content="解冻" placement="top">
            <el-button
              size="mini"
              type="success"
              circle
              icon="el-icon-unlock"
              @click="handleUnFrozenUser(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="注销" placement="top">
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-switch-button"
              circle
              @click="handleDeleteUser(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          
        </template>
      </el-table-column>
      
    </el-table>

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

      <usertabledrawer
      :drawer="drawer"
      :direction="direction"
      :information="edituseritem"
      @showUpdate="getUpdateInfo"
      @showClose="handleCloseDrawer"
      :key="drawer_key"
      >

      </usertabledrawer>
      
      

      
  </div>
</template>

<script>
import setting from '../../../setting'
import { resetpagenationdata } from '../Mixin/resetpagenationdata'
import UserListPageNation from '../Pagenation/UserListPageNation.vue'
import UserTableDrawer from '../DrawerTemplate/UserTableDrawer.vue'
import { 
  activeuserlistAPI,
  activeusercountAPI,
  frozenuserlistAPI,
  frozenusercountAPI,
  frozenuserAPI,
  unfrozenuserAPI,
  deleteuserAPI,
  updateuserinfoAPI
 } from '../../../http/api'
export default {
    nameL:'ManageNormalUser',
    mixins:[resetpagenationdata],
    data(){
      return {
        information:[],
        activeName:'active',
        drawer: false,
        direction: 'rtl',
        edituseritem:[],
        avatarbaseurl:setting.userimgbaseurl
      }
    },
  components:{
    userlistpagenation:UserListPageNation,
    usertabledrawer:UserTableDrawer
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
     getActiveUser(){
        activeuserlistAPI({start:this.start,length:this.length})
          .then(res=>{this.information = Object.values(res.data)})
          .catch(err=>{console.log(err)})
      },
      getActiveCount(){
        activeusercountAPI()
          .then(res=>{this.total_count = res.data[0]['count']})
          .catch(err=>{console.log(err)})
      },
      getFrozenUser(){
        frozenuserlistAPI({start:this.start,length:this.length})
        .then(res=>{this.information = Object.values(res.data)})
        .catch(err=>{console.log(err)})
      },
      getFrozenCount(){
        frozenusercountAPI()
          .then(res=>{this.total_count = res.data[0]['count']})
          .catch(err=>{console.log(err)})
      },
      async handleClick() {
        this.drawer = false
        this.edituseritem = []
        if(this.activeName == 'active'){
          await this.getActiveCount()
          await this.getActiveUser()
        }else if(this.activeName == 'frozen'){
          await this.getFrozenCount()
          await this.getFrozenUser()
        }
        
        this.setPagenationKey()
      },
      async initFunc(){
        await this.getActiveCount()
        await this.getActiveUser()
        this.setPagenationKey()
      },
      getPageParam(c,s){
        this.current_page = c
        this.start = s
        this.handleClick()
      },
      handleFrozenUser(idx,row){
        frozenuserAPI({User_UniqueId:row['User_UniqueId']})
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
      handleUnFrozenUser(idx,row){
        unfrozenuserAPI({User_UniqueId:row['User_UniqueId']})
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
      handleDeleteUser(idx,row){
         this.$confirm('此操作将永久删除该用户, 是否继续?', '注意', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
          }).then(() => {
          deleteuserAPI({User_UniqueId:row['User_UniqueId']})
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
          User_Nickname:v.User_Nickname,
          User_Password:v.User_Password,
          User_Email:v.User_Email,
          User_PhoneNumber:v.User_PhoneNumber,
          User_Introduction:v.User_Introduction,
          User_UniqueId:v.User_UniqueId
        }
        // console.log(v)
        // this.drawer = false
        // this.edituseritem = []

        updateuserinfoAPI(params)
        .then(res=>{
          // console.log(res.data)
          this.$notify({
            title: '成功',
            message: '用户修改成功！',
            type: 'success'
          });
          this.handleClick()
        })
        .catch(err=>{
          this.$notify({
            title: '出错了',
            message: '用户修改失败！！',
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
#manage-normal-user{
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
    .avatar-control{
      height: 60px;
      width: 60px;
      border-radius: 30px;
      border: 1px solid #eee;
      overflow: hidden;
      img{
        height: 60px;
        width: 60px;
      }
    }
    
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