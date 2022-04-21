<template>
  <div id="role-table">
      <el-table
      :data="information"
      style="width:100%"
      height="500px"
    >
      <el-table-column prop="Admin_Role" label="身份名称" width="100">
      </el-table-column>
      <el-table-column prop="Admin_Role_Id" label="RoleId" width="200">
      </el-table-column>
      <el-table-column prop="Admin_Role_CreateTime" :formatter="dateFormat" label="创建时间" width="180">
      </el-table-column>
      <el-table-column prop="Admin_Role_UpdateTime" :formatter="dateFormat" label="修改时间" width="180">
      </el-table-column>
      
      <el-table-column label="操作" width="180">
        
        <template slot-scope="scope">
          <el-tooltip  class="item" effect="dark" content="查看详情" placement="top">
            <el-button
              size="mini"
              type="info"
              circle
              icon="el-icon-view"
              @click="handlePreview(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip  class="item" effect="dark" content="修改" placement="top">
            <el-button
              size="mini"
              type="primary"
              circle
              icon="el-icon-edit"
              @click="handleUpdate(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip v-if="scope.row['Admin_Role_Status']==1" class="item" effect="dark" content="停用" placement="top">
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-close"
              circle
              @click="handleStop(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip v-if="scope.row['Admin_Role_Status']==2" class="item" effect="dark" content="启用" placement="top">
            <el-button
              size="mini"
              type="success"
              icon="el-icon-check"
              circle
              @click="handleStart(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
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
  </div>
</template>

<script>
export default {
    name:'RoleTable',
    data(){
        return{

        }
    },
    props : {
        information:[],
        showPreview:{
            type : Function
        },
        showUpdate:{
            type : Function
        },
        showDelete:{
            type : Function
        },
        showStop:{
            type : Function
        },
        showStart:{
            type : Function
        }

    },
    methods : {
        handlePreview(idx,row){
            this.$emit('showPreview',idx,row)
        },
        handleUpdate(idx,row){
            this.$emit('showUpdate',idx,row)
        },
        handleDelete(idx,row){
            this.$emit('showDelete',idx,row)
        },
        handleStop(idx,row){
            this.$emit('showStop',idx,row)
        },
        handleStart(idx,row){
            this.$emit('showStart',idx,row)
        },
         //格式化日期
        dateFormat(row,column){
            const date = row[column.property]
            if (date === undefined) {
            return ''
            }
            return this.$moment(date).format('YYYY-MM-DD HH:mm:ss')
        },

    }
}
</script>

<style lang="less" scoped>

#role-table{
    height: auto;
    width: auto;
}
</style>