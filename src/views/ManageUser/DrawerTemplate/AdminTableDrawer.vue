<template>
  <div id="admin-table-drawer">
      <el-drawer
        title="修改用户"
        :visible.sync="drawer_data"
        :direction="direction"
        :before-close="handleClose"
        size="35%">
        <div class="inner-content">
             <el-form ref="form" :model="presend" label-width="100px">
                
                <!-- <el-form-item label="头像">
                    <el-avatar size="large" :src="information['Admin_Avatar']"></el-avatar>
                </el-form-item> -->
                <el-form-item label="昵称">
                    <span v-text="information['Admin_Nickname']"></span>
                </el-form-item>
                <el-form-item label="新昵称">
                    <el-input
                    ref="input" 
                    v-model="presend.Admin_Nickname"
                    maxlength="15"
                    style="width:350px"
                    show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="账号">
                    <span v-text="information['Admin_Account']"></span> 
                </el-form-item>
                <el-form-item label="密码">
                    <span v-text="information['Admin_Password']"></span> 
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input
                    ref="input" 
                    v-model="presend.Admin_Password"
                    maxlength="20"
                    style="width:350px"
                    show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="身份">
                    <span v-text="information['Admin_Role']"></span> 
                </el-form-item>
                <el-form-item label="新身份">
                    <el-select v-model="presend.Admin_Role" 
                    >
                        <el-option
                        v-for="(c,index) in Admin_Role_List"
                        :key="index"
                        :value="c"
                        >
                        </el-option>
                    </el-select> 
                </el-form-item>


                <el-form-item label="UniqueId">
                    <span v-text="information['Admin_UniqueId']"></span>
                </el-form-item>
                <el-form-item label="邮箱">
                    <span v-text="information['Admin_Email']"></span> 
                </el-form-item>
                <el-form-item label="新邮箱">
                    <el-input
                    ref="input" 
                    v-model="presend.Admin_Email"
                    maxlength="30"
                    style="width:350px"
                    show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <span v-text="information['Admin_PhoneNumber']"></span> 
                </el-form-item>
                <el-form-item label="新电话">
                    <el-input
                    ref="input" 
                    v-model="presend.Admin_PhoneNumber"
                    maxlength="11"
                    style="width:350px"
                    show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="介绍">
                    <span v-text="information['Admin_Introduction']"></span> 
                </el-form-item>
                <el-form-item label="新介绍">
                    <el-input
                    ref="input" 
                    v-model="presend.Admin_Introduction"
                    :autosize="{ minRows: 3, maxRows: 5}"
                    maxlength="50"
                    type="textarea"
                    style="width:350px"
                    show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <span>{{information['Admin_CreateTime'] | dateFormat}}</span> 
                </el-form-item>
                
                <el-form-item>
                    <el-button @click="updateUserInfo" type="success" 

                    style="width:100px;height:35px;margin:30px 0px 20px 0px">提交修改</el-button>
                </el-form-item>
            </el-form>
        </div>
      </el-drawer>
  </div>
</template>

<script>
import { allrolenamelistAPI } from '../../../http/api'
export default {
    name : 'AdminTableDrawer',
    data(){
        return {
            drawer_data:null,
            Admin_Role_List:[],
            presend:{
                Admin_UniqueId:'',
                Admin_Nickname:'',
                Admin_Password:'',
                Admin_Email:'',
                Admin_PhoneNumber:'',
                Admin_Introduction:'',
                Admin_Role:''
            }
        }
    },
    filters:{
        // dateFormat(value){
        //     return this.$moment(value).format('YYYY-MM-DD HH:mm:ss')
        // }
    },
    props:{
        drawer:{
            type:Boolean
        },
        direction:{
            type:String
        },
        information:[],
        //点击修改的回调函数
        showUpdate:{
            type:Function
        },
        showClose:{
            type:Function
        }
    },
    
    methods:{   
        updateUserInfo(){
            this.$emit('showUpdate',this.presend)
        },
        handleClose(done) {
            this.$confirm('确认取消编辑？')
            .then(_ => {
                // done();
                this.$emit('showClose',done)
            })
            .catch(_ => {});
        },
    },
    mounted(){
        allrolenamelistAPI().then(res=>{
            // this.Admin_Role_List = res.data
            let temp = []
            Object.values(res.data).map(v=>{
                temp.push(v['Admin_Role'])
            })
            this.Admin_Role_List = temp
        }).catch(err=>{console.log(err)})
    },
    watch:{
        information:{
            handler(oldVal,newVal){ 
                
                this.presend.Admin_UniqueId = oldVal.Admin_UniqueId
                this.presend.Admin_Nickname = oldVal.Admin_Nickname
                this.presend.Admin_Password = oldVal.Admin_Password
                this.presend.Admin_Email = oldVal.Admin_Email
                this.presend.Admin_PhoneNumber = oldVal.Admin_PhoneNumber
                this.presend.Admin_Introduction = oldVal.Admin_Introduction
                this.presend.Admin_Role = oldVal.Admin_Role
            },
        },
        drawer:{
            handler(oldVal,newVal){
                this.drawer_data = oldVal
            }
        }
    }
}
</script>

<style lang="less" scoped>
#admin-table-drawer{
    height: auto !important;
    width: 100% !important;
    .el-drawer__header {
        margin-bottom: 0px !important;
        // padding: 20px 20px 0;
        margin: 20px 20px 0px 20px !important;
    }
    .inner-content{
        height: auto !important;
        width: 100% !important;
    }
}
</style>