<template>
  <div id="nav">
    <!-- <div class="avatar">
      <el-avatar :size="60" :src="circleUrl"></el-avatar>
    </div> -->
    <div class="logo">
      <h3>My Blog V3 Admin</h3>
    </div>
    <div class="info">
      

      <el-dropdown trigger="click" @command="handleCommand">
        <span>
          {{$store.getters.admininfo.nickname}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="SignOut">
                <i class="el-icon-switch-button"></i>
                登出
            </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      circleUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "SignOut":
          this.signOut();
          break;
      }
    },
    signOut(){
      this.$store.commit('resetAdminInfo')
      window.localStorage.removeItem('AdminInfo')
      setTimeout(()=>{this.$router.push('/login')},0)
    },
  },
};
</script>

<style>
#nav {
  box-sizing: border-box;
  padding: 0px 10px;
  height: 60px;
  width: 100%;
  line-height: 60px;
  background: #fafafa;
  border-bottom: 1px solid #eee;
  /* box-shadow: rgb(0 0 0 / 10%) 1px 1px 10px; */
}

.avatar {
  float: left;
}
.logo h3{
margin: 0px;
padding: 0px;
float: left;
}
.info {
  float: right;
  margin-right: 20px;
}
.icon-size{
    font-size: 25px;
    margin-left: 5px;
}
</style>
