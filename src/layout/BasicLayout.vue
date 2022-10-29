<template>
  <div id="layout">
    <div class="head">
      <Navigate></Navigate>
    </div>
    <div class="middle">
      <div class="aside">
        <SideBar></SideBar>
      </div>
      <div class="main">
        <BreadCrumb></BreadCrumb>

        <div class="content">
          <router-view name="main"></router-view>
        </div>
      </div>
    </div>
    <!-- <div class="foot">
      <Footer></Footer>
    </div> -->

  </div>
</template>

<script>
import { alltablistAPI, gettablistbyroleAPI } from "../http/api";
import qs from "qs";
import Navigate from "./Navigation/Navigation.vue";
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
    SideBar,
    Navigate,
    BreadCrumb,
    Footer
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
  width: 100%;
}
.content{
  overflow: auto;
  /* background: sienna; */
  background: #fff;
  /* height: calc(100vh - 170px ); */
  height: calc(100vh - 110px );
  width: inherit !important;
}

</style>
