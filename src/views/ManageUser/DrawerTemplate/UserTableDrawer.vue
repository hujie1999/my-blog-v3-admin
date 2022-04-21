<template>
  <div id="user-table-drawer">
      <el-drawer
        title="修改用户"
        :visible.sync="drawer_data"
        :direction="direction"
        :before-close="handleClose"
        size="35%">
        <div class="inner-content">
             <el-form ref="form" :model="presend" label-width="100px">
                
                <el-form-item label="头像">
                    <el-avatar size="large" :src="information['User_Avatar']"></el-avatar>
                </el-form-item>
                <el-form-item label="昵称">
                    <span v-text="information['User_Nickname']"></span>
                </el-form-item>
                <el-form-item label="新昵称">
                    <el-input
                    ref="input" 
                    v-model="presend.User_Nickname"
                    maxlength="15"
                    style="width:350px"
                    show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="账号">
                    <span v-text="information['User_Account']"></span> 
                </el-form-item>
                <el-form-item label="密码">
                    <span v-text="information['User_Password']"></span> 
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input
                    ref="input" 
                    v-model="presend.User_Password"
                    maxlength="20"
                    style="width:350px"
                    show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="UniqueId">
                    <span v-text="information['User_UniqueId']"></span>
                </el-form-item>
                <el-form-item label="邮箱">
                    <span v-text="information['User_Email']"></span> 
                </el-form-item>
                <el-form-item label="新邮箱">
                    <el-input
                    ref="input" 
                    v-model="presend.User_Email"
                    maxlength="30"
                    style="width:350px"
                    show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <span v-text="information['User_PhoneNumber']"></span> 
                </el-form-item>
                <el-form-item label="新电话">
                    <el-input
                    ref="input" 
                    v-model="presend.User_PhoneNumber"
                    maxlength="11"
                    style="width:350px"
                    show-word-limit
                    ></el-input>
                </el-form-item>
               <el-form-item label="介绍">
                    <span v-text="information['User_Introduction']"></span> 
                </el-form-item>
                <el-form-item label="新介绍">
                    <el-input
                    ref="input" 
                    v-model="presend.User_Introduction"
                    :autosize="{ minRows: 3, maxRows: 5}"
                    maxlength="50"
                    type="textarea"
                    style="width:350px"
                    show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <span>{{information['User_CreateTime'] | dateFormat}}</span> 
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

export default {
    name : 'UserTableDrawer',
    data(){
        return {
            drawer_data:null,
            presend:{
                User_UniqueId:'',
                User_Nickname:'',
                User_Password:'',
                User_Email:'',
                User_PhoneNumber:'',
                User_Introduction:'',
            },
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
    watch:{
        information:{
            handler(oldVal,newVal){ 
                this.presend.User_UniqueId = oldVal.User_UniqueId
                this.presend.User_Nickname = oldVal.User_Nickname
                this.presend.User_Password = oldVal.User_Password
                this.presend.User_Email = oldVal.User_Email
                this.presend.User_PhoneNumber = oldVal.User_PhoneNumber
                this.presend.User_Introduction = oldVal.User_Introduction
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
#user-table-drawer{
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