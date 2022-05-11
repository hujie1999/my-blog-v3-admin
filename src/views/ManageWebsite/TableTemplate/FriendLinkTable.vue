<template>
  <div id="frined-link-table">
      <!-- <h2>Friend Link Table</h2> -->
      <el-table
      :data="linklist"
      style="width:100%"
      height="70vh"
    >
      <el-table-column prop="id" label="id" width="80">
      </el-table-column>
      <el-table-column label="友链头像" width="100">
        <template slot-scope="props">         
              <div class="avatar-control">
                <img :src="props.row.FriendWebAvatar" alt="avatar">
              </div>
        </template>
      </el-table-column>
      <el-table-column prop="FriendWebAvatar"  label="友链头像地址" width="220">
      </el-table-column>
      <el-table-column prop="FriendWebName" :show-overflow-tooltip="true" label="友链网站名称" width="140">
      </el-table-column>
      <el-table-column prop="FriendWebDesc" :show-overflow-tooltip="true" label="友链网站描述" width="250">
      </el-table-column>
      <el-table-column  :show-overflow-tooltip="true" label="友链网站链接" width="200">
          <template slot-scope="props">           
            <a :href="props.row.FriendWebLink" target="_blank">{{props.row.FriendWebLink}}</a>              
        </template>
      </el-table-column>
      <el-table-column prop="FriendName"  label="所有者" width="70">
      </el-table-column>
      <el-table-column prop="LinkCreatTime" label="友链发布日期"  :formatter="dateFormat" width="180">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              size="mini"
              type="primary"
              circle
              icon="el-icon-edit"
              @click="handleUpdateLink(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDeleteLink(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
    name:'FriendLinkTable',
    data(){
        return{

        }
    },
    props:{
        linklist:[],
        showUpdate:{
            type:Function
        },
        showDelete:{
            type:Function
        }

    },
    methods:{
        dateFormat(row,column){
            const date = row[column.property]
            if (date === undefined) {
                return ''
            }
            return this.$moment(date).format('YYYY-MM-DD HH:mm:ss')
        },
      handleUpdateLink(idx,row){
    //    console.log(idx,row)
       this.$emit('showUpdate',idx,row)
      },
      handleDeleteLink(idx,row){
    //    console.log(idx,row)
       this.$emit('showDelete',idx,row)
      }
    }
}
</script>

<style lang='less' scoped>
.avatar-control{
    height: 60px;
    width: 60px;
    img{
        height: 100%;
        width: 100%;
        border-radius: 50%;
    }
}
</style>