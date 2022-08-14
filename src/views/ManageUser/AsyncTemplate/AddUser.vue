<template>
  <!-- <p>AddUser</p> -->
  <div class="add-user">
      <el-form ref="form" :model="presend" label-width="80px">
                
                <el-form-item label="头像">
                    <el-avatar size="large" src=""></el-avatar>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input
                    ref="input" 
                    v-model="presend.User_Nickname"
                    maxlength="15"
                    style="width:350px"
                    show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input
                    ref="input" 
                    v-model="presend.User_Account"
                    maxlength="15"
                    style="width:350px"
                    show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input
                    ref="input" 
                    v-model="presend.User_Password"
                    maxlength="20"
                    style="width:350px"
                    show-word-limit
                    ></el-input>
                </el-form-item>

                <el-form-item label="邮箱">
                    <el-input
                    ref="input" 
                    v-model="presend.User_Email"
                    maxlength="30"
                    style="width:350px"
                    show-word-limit
                    ></el-input>
                </el-form-item>

                <el-form-item label="电话">
                    <el-input
                    ref="input" 
                    v-model="presend.User_PhoneNumber"
                    maxlength="11"
                    style="width:350px"
                    show-word-limit
                    ></el-input>
                </el-form-item>

                <el-form-item label="介绍">
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

                
                <el-form-item>
                    <el-button @click="AddUser" type="success" 

                    style="width:100px;height:35px;margin:30px 0px 20px 0px">创建</el-button>
                </el-form-item>
            </el-form>
  </div>
</template>

<script>

import {
    addoneuserAPI
} from '../../../http/api'
export default {
    name:'AddUser',
    data(){
        return{
            presend:{
                User_Nickname:'',
                User_Account:'',
                User_Password:'',
                User_Email:'',
                User_PhoneNumber:'',
                User_Introduction:''
            }
        }
    },
    methods:{
        AddUser(){
            // console.log('clicked adduser btn ')
            addoneuserAPI({userinfo:this.presend}).then(res=>{
                // console.log(res.data)
                if(res.data.code==50){
                    console.log('添加用户成功')
                }
                else if(res.data.code==51){
                    console.log('该账号已存在')
                }
                else if(res.data.code==52){
                    console.log('添加用户失败')
                }
                this.presend.User_Nickname = ''
                this.presend.User_Account = ''
                this.presend.User_Password = ''
                this.presend.User_Email = ''
                this.presend.User_PhoneNumber = ''
                this.presend.User_Introduction = ''
            }).catch(err=>{
                console.log(res.data)
            })
        }
    }
}
</script>

<style lang="less" scoped>
#add-user{
    height: auto !important;
    width: 100% !important;
}
</style>