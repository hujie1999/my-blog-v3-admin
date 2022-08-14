<template>
  <!-- <p>AddAdmin</p> -->
  <div class="add-admin">
      <el-form ref="form" :model="presend" label-width="80px">       
                <!-- <el-form-item label="头像">
                    <el-avatar size="large" src=""></el-avatar>
                </el-form-item> -->
                <el-form-item label="昵称">
                    <el-input
                    ref="input" 
                    v-model="presend.Admin_Nickname"
                    maxlength="15"
                    style="width:350px"
                    show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input
                    ref="input" 
                    v-model="presend.Admin_Account"
                    maxlength="15"
                    style="width:350px"
                    show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input
                    ref="input" 
                    v-model="presend.Admin_Password"
                    maxlength="20"
                    style="width:350px"
                    show-word-limit
                    ></el-input>
                </el-form-item>

                <el-form-item label="身份">
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

                <el-form-item label="邮箱">
                    <el-input
                    ref="input" 
                    v-model="presend.Admin_Email"
                    maxlength="30"
                    style="width:350px"
                    show-word-limit
                    ></el-input>
                </el-form-item>

                <el-form-item label="电话">
                    <el-input
                    ref="input" 
                    v-model="presend.Admin_PhoneNumber"
                    maxlength="11"
                    style="width:350px"
                    show-word-limit
                    ></el-input>
                </el-form-item>

                <el-form-item label="介绍">
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

                
                <el-form-item>
                    <el-button @click="AddUser" type="success" 

                    style="width:100px;height:35px;margin:30px 0px 20px 0px">创建</el-button>
                </el-form-item>
            </el-form>
  </div>
</template>

<script>
import { 
    allrolenamelistAPI,
    addoneadminAPI
} from '../../../http/api'
export default {
    name:'AddAdmin',
    data(){
        return{
            presend:{
                Admin_Nickname:'',
                Admin_Account:'',
                Admin_Password:'',
                Admin_Role:'',
                Admin_Email:'',
                Admin_PhoneNumber:'',
                Admin_Introduction:''
            },
            Admin_Role_List:[]
        }
    },
    methods:{
        AddUser(){
            // console.log('clicked adduser btn ')
            addoneadminAPI({userinfo:this.presend}).then(res=>{
                // console.log(res.data)
                if(res.data.code==55){
                    console.log('添加管理员成功')
                }
                else if(res.data.code==56){
                    console.log('该账号已存在')
                }
                else if(res.data.code==57){
                    console.log('添加管理员失败')
                }
                this.presend.Admin_Nickname = ''
                this.presend.Admin_Account = ''
                this.presend.Admin_Password = ''
                this.presend.Admin_Role = ''
                this.presend.Admin_Email = ''
                this.presend.Admin_PhoneNumber = ''
                this.presend.Admin_Introduction = ''
            }).catch(err=>{
                console.log(res.data)
            })

        }
    },
    mounted(){
      allrolenamelistAPI().then(res=>{
        let temp = []
        Object.values(res.data).map(v=>{
            temp.push(v['Admin_Role'])
        })
        this.Admin_Role_List = temp
      }).catch(err=>{console.log(err)})
    }
}
</script>

<style lang="less" scoped>
#add-admin{
    height: auto !important;
    width: 100% !important;
}
</style>