<template>
  <div id="login-page">
    <div class="format-control">
        <div class="form-title">
            <h2>Admin Login</h2>
            <h3>my-blog-v3</h3>
        </div>
        <el-form :model="userinfo" class="el-form" :rules="rules" ref="userinfo">
            <el-form-item label="账号" prop="acc" size="medium">
                <el-input v-model="userinfo.acc"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd"  size="medium">
                <el-input type="password" v-model="userinfo.pwd"></el-input>
            </el-form-item>
            <el-form-item
            class="btn-area"
            >
                <el-button type="primary" @click="submitForm('userinfo')" 
                size="medium"
                :disabled="btnlock"
                >登录</el-button
                >
                <!-- <el-button type="success" @click="registbtn" 
                :disabled="btnlock"
                size="medium"
                >注册</el-button> -->
            </el-form-item>
            <!-- <el-form-item
            class="forget-pwd"
            >
                <a href="#">忘记密码？</a>
            </el-form-item> -->
        </el-form>
    </div>
  </div>
</template>

<script>
import setting from '../../../setting'
import { adminloginAPI } from "../../../http/api";
export default {
  name: "Login",
  data() {
    var checkAcc = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      let reg = new RegExp("^[A-Za-z0-9]+$");
      setTimeout(() => {
        if (!reg.test(value)) {
          return callback(new Error("账号只能包含数字和字母！"));
        } else if (value.length > 15 || value.length < 5) {
          return callback(new Error("账号长度应为 6~15 位！"));
        } else {
          return callback();
        }
      }, 500);
    };
    var checkPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      let reg = new RegExp("^[A-Za-z0-9]+$");
      setTimeout(() => {
        if (!reg.test(value)) {
          return callback(new Error("密码只能包含数字和字母！"));
        } else if (value.length > 20 || value.length < 6) {
          return callback(new Error("密码长度应为 6~20 位！"));
        } else {
          return callback();
        }
      }, 500);
    };
    return {
      userinfo: {
        acc: "",
        pwd: "",
      },
      rules: {
        acc: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { validator: checkAcc, trigger: "blur" },
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: checkPwd, trigger: "blur" },
        ],
      },
      //提交按钮锁
      //同时控制 按钮的disabled
      btnlock:false
    }

    
  },
  methods: {
    // registbtn() {
    //   window.location.href = "/regist";
    // },
    loginbtn() {
      
      if(this.btnlock==false){
        this.btnlock = true
        adminloginAPI({
            account:this.userinfo.acc,
            password:this.userinfo.pwd
        })
        .then((res) => {
          
          let temp = res.data;
          console.log(temp);
          if (temp.code == 1000) {
            let admininfo = {
              islogin: true,
              token: temp.token,
              nickname: temp.nickname,
              role: temp.role,
              account: temp.account,
              uniqueid: temp.uniqueid,
            }
            this.$store.commit('modifyAdminInfo',admininfo)

            window.localStorage.setItem("AdminInfo",JSON.stringify(admininfo))
            this.$notify({
              title: '成功',
              type: "success",
              message: "登录成功，正在跳转主页面...",
              duration:3000
            });
            setTimeout(() => {
              this.btnlock = false
              this.$router.replace({ name: "basiclayout" });
            }, 3000);
          } 
          else if (temp.code == 1001) {
            this.$notify({
              title: '出错了',
              message: temp.message,
              type: "error",
            });
            this.btnlock = false
          }
          else if (temp.code == 1004) {
            this.$notify({
              title: '失败',
              message: "登陆失败，账号密码不匹配！",
              type: "error",
              duration:3000
            });
            this.btnlock = false
          }
          else if (temp.code == 1003) {
            this.$notify({
              title: '通知',
              message: "登陆失败，您的账号被冻结，\n如有需要请联系管理员解冻！",
              type: "warning",
              duration:5000
            });
            this.btnlock = false
          }
          else if (temp.code == 1002) {
            this.$notify({
              title: '失败',
              message: "登陆失败，服务器不存在该账号！\n请检查账号密码是否正确！",
              type: "error",
              duration:3000
            });
            this.btnlock = false
          }


        })
        .catch((err) => {
          this.btnlock = false
          console.log(err);
        });

      }
      
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          this.loginbtn();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  created(){
  }
};
</script>
<style scoped>
#login-page {
  height: 100vh;
  width: auto;
  background: #fff;
  
  display: flex;
  justify-content: center;
  align-items: center;
}

.format-control {
  height: 420px;
  width: 250px;
  padding: 0px 20px;
  background: #fff;
    border: 1px solid #ebebeb;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
  border-radius: 20px;
}
.format-control:hover{
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 16%), 0 0 6px 0 rgb(0 0 0 / 16%);
}
.form-title{
    padding: 10px 0px 30px 0px;
    text-align: center;
}
.btn-area{
    /* text-align: center; */
    padding-top: 50px;
}
.el-form-item{
    margin-bottom: 10px !important;
}
.forget-pwd a{
    color: gray;
    font-weight: 400;
    font-size: 12px;
}
.forget-pwd a:hover{
    color: #000000;
    font-weight: 500;
    font-size: 13px;
}
</style>