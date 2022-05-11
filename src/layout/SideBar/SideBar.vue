<template>
  <div>
    <div class="switch-block">
      <el-switch v-model="isCollapse" active-color="#13ce66"> </el-switch>
    </div>

    <el-menu
      :router="true"
      :default-active="$router.currentRoute.path"
      class="el-menu-vertical-demo"
      :unique-opened="true"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <!-- <h2>{{$router.currentRoute.path}}</h2> -->
      <span v-for="(item, index) in sidebar" :key="index">
        <el-submenu v-if="item.child" :index="item.path">
          <template slot="title">
            <i :class="item.class"></i>
            <span v-if="!isCollapse">{{ item.title }}</span>
          </template>

          <el-menu-item-group>
            <span v-if="isCollapse" slot="title">{{ item.title }}</span>
            <el-menu-item
              v-for="(i, index) in item.child"
              :key="index"
              :index="i.path"
              :route="i.path"
            >
              {{ i.title }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item v-else :index="item.path" :route="item.path">
          <i :class="item.class"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </span>
    </el-menu>
  </div>
</template>

<script>

export default {
  name: "SideBar",
  data() {
    return {
      isCollapse: false,
      sidebar: [
        {
          idx: "0",
          title: "DashBoard",
          class: "el-icon-s-grid",
          path: "/dashboard",
        },
        {
          idx: "1",
          title: "发布博客",
          class: "el-icon-upload",
          path: "/publishblog",
        },
        {
          idx: "2",
          title: "博客管理",
          class: "el-icon-s-order",
          path: "/manageblog",
        },
        {
          idx: "3",
          title: "评论管理",
          class: "el-icon-s-comment",
          path: "/managecomment",
          child: [
            {
              idx: "7",
              title: "博客评论管理",
              path: "/managecomment/blogcomment",
            },
            {
              idx: "8",
              title: "留言板留言管理",
              path: "/managecomment/messagecomment",
            },
            {
              idx: "9",
              title: "评论审核",
              path: "/managecomment/examinecomment",
            },
          ],
        },
        {
          idx: "4",
          title: "用户管理",
          class: "el-icon-user-solid",
          path: "/manageuser",
          child: [
            {
              idx: "10",
              title: "普通用户管理",
              path: "/manageuser/managenormaluser",
            },
            {
              idx: "11",
              title: "管理员管理",
              path: "/manageuser/manageadminuser",
            },
            {
              idx: "12",
              title: "用户注册审核",
              path: "/manageuser/examineuserandadmin",
            },
            {
              idx: "13",
              title: "添加用户",
              path: "/manageuser/adduseroradmin",
            },
          ],
        },
        {
          idx: "5",
          title: "网站管理",
          class: "el-icon-s-marketing",
          path: "/managewebsite",
          child: [
            {
              idx: "14",
              title: "博客标签管理",
              path: "/managewebsite/managetag",
            },
            {
              idx: "15",
              title: "博客分类管理",
              path: "/managewebsite/manageclass",
            },
            {
              idx: "16",
              title: "关于页面管理",
              path: "/managewebsite/manageaboutpage",
            },
            {
              idx: "17",
              title: "留言板页面管理",
              path: "/managewebsite/managemessagepage",
            },
            {
              idx: "18",
              title: "网站背景图管理",
              path: "/managewebsite/managebackgroundimg",
            },
            {
              idx: "19",
              title: "头像管理",
              path: "/managewebsite/manageavatar",
            },
            {
              idx: "20",
              title: "广告管理",
              path: "/managewebsite/manageadvertisement",
            },
            {
              idx: "21",
              title: "友链管理",
              path: "/managewebsite/manageafriendlink",
            }
          ],
        },
        {
          idx: "6",
          title: "权限管理",
          class: "el-icon-warning",
          path: "/manageprivilege",
        },
      ]


    };
  },
  props:{
    // sidebar:[]
  },
  methods: {
  },
 
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  /* min-height: 400px; */
  height: auto;
}
.switch-block {
  height: 56px;
  width: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-menu-item-group .el-menu-item {
    font-size: 12px !important;
    
}
</style>
