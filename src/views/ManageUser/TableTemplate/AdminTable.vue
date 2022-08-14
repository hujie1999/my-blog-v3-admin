<template>
  <div id="admin-table">
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
          <el-tooltip  class="item" effect="dark" content="审核通过" placement="top">
            <el-button
              size="mini"
              type="success"
              circle
              icon="el-icon-check"
              @click="handleAdmitUser(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip v-if="activename == 'preexamine_admin'" class="item" effect="dark" content="审核不通过" placement="top">
            <el-button
              size="mini"
              type="warning"
              circle
              icon="el-icon-close"
              @click="handleRefuseUser(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip v-if="activename == 'fallen_admin'" class="item" effect="dark" content="注销" placement="top">
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
  </div>
</template>

<script>
export default {
    name : 'AdminTable',
    data (){
        return {

        }
    },
    props : {
        information:[],
        activename:{
          type : String,
          default : null
        },
        showAdmit:{
          type : Function
        },
        showRefuse:{
          type : Function
        },
        showDelete:{
          type : Function
        },
        showMultiData:{
          type :Function
        }
    },
    methods : {
        handleAdmitUser(idx,row){
            this.$emit('showAdmit',idx,row)
        },
        handleRefuseUser(idx,row){
            this.$emit('showRefuse',idx,row)
        },
        handleDeleteUser(idx,row){
            this.$emit('showDelete',idx,row)
        },
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
          this.$emit('showMultiData',val)

        },
    }
}
</script>

<style lang="less" scoped>
#admin-table{
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
    width: 20%;
  }
}
</style>