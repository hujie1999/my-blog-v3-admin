<template>
  <!-- <h1>AddUserOrAdmin</h1> -->
  <div id="add-user-or-admin">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      >
      <el-tab-pane
      v-for="(item, index) in tabs"
      :key="index"
      :label="item.title"
      :name="item.name"
      >
      </el-tab-pane>
        <component :is="this.componentname[this.currentindex]"></component>
      </el-tabs>
  </div>
</template>

<script>
import { resetpagenationdata } from '../Mixin/resetpagenationdata'
import adduser from '../AsyncTemplate/AddUser.vue'
import addadmin from '../AsyncTemplate/AddAdmin.vue'
import { 

 } from '../../../http/api'
export default {
    nameL:'AddUserOrAdmin',
    mixins:[resetpagenationdata],
    data(){
      return {
        tabs:[
          {
            idx:0,
            name:'user',
            title:'添加用户'
          },
          {
            idx:1,
            name:'admin',
            title:'添加管理员'
          }
        ],
        componentname:['adduser','addadmin'],
        activeName:'user',
        currentindex:0,
      }
    },
  components:{
    adduser,
    addadmin
  },
  methods:{
      handleClick(tab,event) {
        // console.log(tab)
        // console.log(event)
        this.currentindex = Number(tab.index)
      },
  
  },
  mounted(){

  },
  watch:{
  }
}
</script>

<style lang="less" scoped>
#add-user-or-admin{
  height: 90vh;
  width: auto;
  // .el-tabs--border-card {  
  //   box-shadow: none !important; 
  //   border-bottom: 0 !important;
  // }
  // .demo-table-expand {
  //   font-size: 0;
  //   padding: 0px 60px !important;
  //   background: #f0f9eb;
  // }
  // .demo-table-expand label {
  //   width: 90px;
  //   color: #99a9bf;
  // }
  // .demo-table-expand .el-form-item {
  //   height: auto;
  //   line-height: 10px;
  //   margin-right: 0;
  //   margin-bottom: 0;
  //   width: 30%;
  // }
  /deep/.el-tabs__header {

    padding: 0 10px !important;
  }
  
}
</style>