<template>
  <div id="layout">
    <el-container>
      <el-header>
        <navigation></navigation>
      </el-header>

      <el-container>
        <el-aside>
          <!-- <sidebar :sidebar="reactive_sidebar"></sidebar> -->
          <sidebar></sidebar>
        </el-aside>

        <el-main>
          <breadcrumb></breadcrumb>
          <router-view name="main"></router-view>
        </el-main>
      </el-container>

      <el-footer>
        <foot></foot>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { alltablistAPI, gettablistbyroleAPI } from "../http/api";
import qs from "qs";
import Navigation from "./Navigation/Navigation.vue";
import SideBar from "./SideBar/SideBar.vue";
import BreadCrumb from "./Main/BreadCrumb.vue";
import Footer from './Footer/Footer.vue'
export default {
  name: "basic",
  data() {
    return {
      msg: "this is BasicLayout",
      //权限分配未完成，应使用 动态路由
      // reactive_sidebar: [],
      
    };
  },
  components: {
    sidebar: SideBar,
    navigation: Navigation,
    breadcrumb: BreadCrumb,
    foot: Footer
  },
  methods:{
  },
  created() {
    //动态获取 当前登陆权限对应的 sidebar
    // gettablistbyroleAPI({
    //   Role: this.$store.getters.admininfo.role,
    // })
    //   .then((res) => {
    //     let temp = Object.values(res.data)[0].Admin_Tab_List;
    //     this.reactive_sidebar = Object.values(qs.parse(temp));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    //获取所有sidebar
    // alltablistAPI()
    //   .then((res) => {
    //     let temp = Object.values(res.data)[0].Tab_List;
    //     // console.log(Object.values(qs.parse(temp)))
    //     this.test = Object.values(qs.parse(temp));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
};
</script>
<style scoped>
#layout {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: #fff;
  position: relative;
}
.el-header{
  height: 6px;
  width: auto;
  text-align: center;
  line-height: 60px;
  background-color: #b3c0d1;
}
.el-footer {
  /* background-color: #b3c0d1;
  color: #333;
  text-align: center; */
  margin: 0px;
  padding: 0px;
  height: auto;
  width: auto;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  /* height: auto !important; */
  width: auto !important;
  overflow: scroll;
}
/* 隐藏滚动条 */
.el-aside::-webkit-scrollbar {
  display: none;
}

.el-main {
  color: #333;
  /* text-align: center; */
  /* background:darkcyan; */
  height: 100%;
  /* height: 100vh; */
  padding: 0;
  /* line-height: 0 !important; */
}
.el-main::-webkit-scrollbar {
  display: none;
}
</style>
