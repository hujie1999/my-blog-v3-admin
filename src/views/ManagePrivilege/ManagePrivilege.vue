<template>
  <div id="manage-privilege">
    <div class="role-list">
        <h3>角色表：</h3>
        <!-- table -->
        <roletable
        :information="information"
        @showPreview='handlePreview'
        @showUpdate="handleUpdate"
        @showDelete="handleDelete"
        @showStop="handleStop"
        @showStart="handleStart"
        >
        </roletable>
        <!-- pagenation -->
        <rolelistpagenation
        :current="current"
        :start="start"
        :length="length"
        :total="total"
        @handledPageParams="handlePage"
        >
        </rolelistpagenation>
    </div>
    <div class="role-details">
        <h3>角色详情：</h3>
        <roledetails
        :sidebar="preview_role_sidbar"
        >
        </roledetails>
    </div>

  </div>
</template>

<script>
import setting from '../../setting'
import RoleTable from './TableTemplate/RoleTable.vue'
import RoleDetails from './TreeTemplate/RoleDetails.vue'
import RoleListPageNation from './Pagenation/RoleListPageNation.vue'
import qs from 'qs'
import {
    adminrolelistAPI,
    adminrolelistcountAPI,
    stoproleAPI,
    startroleAPI,
    deleteroleAPI,
} from '../../http/api'
export default {
    name:'ManagePrivilege',
    data(){
        return{
            //roletable组件参数
            information:[],
            // 分页器组件参数
            current:1,
            start:0,
            length:setting.managepriviligetablelength,
            total:null,

            //role details参数
            preview_role_sidbar:[]
        }
    },
    components:{
        roletable:RoleTable,
        rolelistpagenation:RoleListPageNation,
        roledetails:RoleDetails
    },
    methods:{
        handlePreview(idx,row){
            console.log('click handlePreview')
            this.preview_role_sidbar = Object.values(qs.parse(row['Admin_Tab_List']))
        },
        handleUpdate(idx,row){
            console.log('click handleUpdate')
        },
        handleDelete(idx,row){
            console.log('click handleDelete')
            deleteroleAPI({Admin_Role_Id:row['Admin_Role_Id']})
            .then(res=>{
                
                this.initFunc()
            })
            .catch(err=>{
                console.log(err)
            })
        },
        handleStop(idx,row){
            console.log('click handleStop')
            stoproleAPI({Admin_Role_Id:row['Admin_Role_Id']})
            .then(res=>{
                this.initFunc()
            })
            .catch(err=>{
                console.log(err)
            })
        },
        handleStart(idx,row){
            console.log('click handleStart')
            startroleAPI({Admin_Role_Id:row['Admin_Role_Id']})
            .then(res=>{
                this.initFunc()
            })
            .catch(err=>{
                console.log(err)
            })
        },
        handlePage(cur,start){
            this.start = start
            this.current = cur
            this.initFunc()
        },
        restPageParams(){
            this.start = 0
            this.current = 1
        },
        getRoleListCount(){
            adminrolelistcountAPI().then(res=>{this.total = res.data[0]['count']}).catch(err=>{console.log(err)})
        },
        getRoleList(){
            adminrolelistAPI({start:this.start,length:this.length}).then(res=>{this.information = Object.values(res.data)}).catch(err=>{console.log(err)})
        },
        async initFunc(){
            await this.getRoleListCount()
            await this.getRoleList()
        },

    },
    mounted(){
        this.initFunc()
    },
}
</script>

<style lang="less" scoped>
#manage-privilege{
    height: 80vh;
    width: auto;
    padding: 0px 20px;
    // border: 1px  solid black;
    display: flex;
    .role-list{
        min-height: 400px;
        min-width: 850px;
        height: auto;
        width: auto;
        padding: 0px 5px;
        // background: blanchedalmond;
        border: 1px solid #e0e0e0;
        border-radius: 15px;
    }
    .role-details{
        
        min-width: 400px;
        max-width: 500px;
        min-height: 400px;
        height: auto;
        padding: 0px 5px;
        // background: cadetblue;
        overflow: auto;
        margin-left: 20px;
        border: 1px solid #e0e0e0;
        border-radius: 15px;
    }
}
</style>