<template>
  <div id="layout">
    <div class="head">
      <navigation></navigation>
    </div>
    <div class="middle">
      <div class="aside">
        <sidebar></sidebar>
      </div>
      <div class="main">
        <breadcrumb></breadcrumb>

        <div class="content">
          <router-view name="main"></router-view>
        </div>
      </div>
    </div>
    <div class="foot">
      <foot></foot>
    </div>

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
<style>
#layout {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  background: #fff;
  position: relative;
  overflow: hidden;
}

.head{
  height: 60px;
  width: 100%;
  line-height: 60px;
  background-color: #b3c0d1;
}
.middle{
  display: flex;
  width: 100vw;
}
.foot{
  height: 60px;
  width: 100%;
}
.aside{
  width: auto;
  height: auto;
}
.main{
  /* overflow: auto !important; */
  width: 100%;
}
.content{
  overflow: auto;
  /* background: sienna; */
  background: #fff;
  height: calc(100vh - 170px );
  width: inherit !important;
  /* width: 100%; */
}
/* .el-header{
  height: 6px;
  width: auto;
  text-align: center;
  line-height: 60px;
  background-color: #b3c0d1;
} */
/* .el-footer {
  margin: 0px;
  padding: 0px;
  height: auto;
  width: auto;
  line-height: 60px;
} */

/* .el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  width: auto !important;
  overflow: scroll;
} */
/* 隐藏滚动条 */
/* .el-aside::-webkit-scrollbar {
  display: none;
} */

/* .el-main {
  color: #333;
  background:darkcyan;
  height: calc(100vh - 120px );
  padding: 0;

}
.el-main::-webkit-scrollbar {
  display: none;
} */
</style>
