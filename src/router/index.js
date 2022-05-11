import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
// import HelloWorld from '@/components/HelloWorld'
// import BasicLayout from '../layout/BasicLayout.vue'
Vue.use(Router)

const router = new Router({
  mode:'history',
  routes: [
    {
      path: '',
      name: 'basiclayout',
      meta: {
        tittle : '主页',
        requiresAuth: true,
        // keepAlive:true
      },
      components:{
        app : ()=>import('../layout/BasicLayout.vue')
      },
      redirect:'/dashboard',
      children:[
        {
          path:'/dashboard',
          name:'dashboard',
          meta: {
            tittle : 'dashboard',
            requiresAuth: true,
          },
          components:{
            main: ()=>import('../views/Dashboard/Dashboard.vue')
          }
        },
        {
          path:'/publishblog',
          name:'publishblog',
          meta: {
            tittle : '发布博客',
            requiresAuth: true,
          },
          components:{
            main: ()=>import('../views/PublishBlog/PublishBlog.vue')
          }
        },
        {
          path:'/manageblog',
          name:'manageblog',
          meta: {
            tittle : '博客管理',
            requiresAuth: true,
          },
          components:{
            main: ()=>import('../views/ManageBlog/ManageBlog.vue')
          },
        },
        {
          // 修改博客页面
          path:'/updateblog',
          name:'updateblog',
          meta: {
            tittle : '修改博客',
            requiresAuth: true,
          },
          components:{
            main: ()=>import('../views/NewViews/FromManageBlog/UpdateBlog/UpdateBlog.vue')
          }
        },
        {
          // 修改草稿页面
          path:'/publishdrafts',
          name:'publishdrafts',
          meta: {
            tittle : '草稿箱',
            requiresAuth: true,
          },
          components:{
            main: ()=>import('../views/NewViews/FromManageBlog/PublishDrafts/PublishDrafts.vue')
          }
        },
        {
          path:'/managecomment',
          name:'managecomment',
          meta: {
            tittle : '评论管理',
            requiresAuth: true,
          },
          redirect:'/managecomment/blogcomment',
          components:{
            main: ()=>import('../views/ManageComment/ManageComment.vue')
          },
          children:[
            {
              path:'blogcomment',
              name:'blogcomment',
              meta: {
                tittle : '博客评论管理',
                requiresAuth: true,
              },
              components:{
                managecomment: ()=>import('../views/ManageComment/Children/BlogComment.vue')
              }
            },
            {
              path:'messagecomment',
              name:'messagecomment',
              meta: {
                tittle : '留言板留言管理',
                requiresAuth: true,
              },
              components:{
                managecomment: ()=>import('../views/ManageComment/Children/MessageComment.vue')
              }
            },
            {
              path:'examinecomment',
              name:'examinecomment',
              meta: {
                tittle : '评论审核',
                requiresAuth: true,
              },
              components:{
                managecomment: ()=>import('../views/ManageComment/Children/ExamineComment.vue')
              }
            },
          ]
        },
        {
          path:'/manageuser',
          name:'manageuser',
          meta: {
            tittle : '用户管理',
            requiresAuth: true,
          },
          redirect:'/manageuser/managenormaluser',
          components:{
            main: ()=>import('../views/ManageUser/ManageUser.vue')
          },
          children:[
            {
              path:'managenormaluser',
              name:'managenormaluser',
              meta: {
                tittle : '普通用户管理',
                requiresAuth: true,
              },
              components:{
                manageuser: ()=>import('../views/ManageUser/Children/ManageNormalUser.vue')
              }
            },
            {
              path:'manageadminuser',
              name:'manageadminuser',
              meta: {
                tittle : '管理员管理',
                requiresAuth: true,
              },
              components:{
                manageuser: ()=>import('../views/ManageUser/Children/ManageAdminUser.vue')
              }
            },
            {
              path:'examineuserandadmin',
              name:'examineuserandadmin',
              meta: {
                tittle : '用户注册审核',
                requiresAuth: true,
              },
              components:{
                manageuser: ()=>import('../views/ManageUser/Children/ExamineUserAndAdmin.vue')
              }
            },
            {
              path:'adduseroradmin',
              name:'adduseroradmin',
              meta: {
                tittle : '添加用户',
                requiresAuth: true,
              },
              components:{
                manageuser: ()=>import('../views/ManageUser/Children/AddUserOrAdmin.vue')
              }
            },
          ]
        },
        {
          path:'/managewebsite',
          name:'managewebsite',
          meta: {
            tittle : '网站管理',
            requiresAuth: true,
          },
          redirect:'/managewebsite/managetag',
          components:{
            main: ()=>import('../views/ManageWebsite/ManageWebsite.vue')
          },
          children:[
            {
              path:'managetag',
              name:'managetag',
              meta: {
                tittle : '博客标签管理',
                requiresAuth: true,
              },
              components:{
                managewebsite: ()=>import('../views/ManageWebsite/Children/ManageTag.vue')
              },
            },
            {
              path:'manageclass',
              name:'manageclass',
              meta: {
                tittle : '博客分类管理',
                requiresAuth: true,
              },
              components:{
                managewebsite: ()=>import('../views/ManageWebsite/Children/ManageClass.vue')
              },
            },
            {
              path:'manageaboutpage',
              name:'manageaboutpage',
              meta: {
                tittle : '关于页面管理',
                requiresAuth: true,
              },
              components:{
                managewebsite: ()=>import('../views/ManageWebsite/Children/ManageAboutPage.vue')
              },
            },
            {
              path:'managemessagepage',
              name:'managemessagepage',
              meta: {
                tittle : '留言板页面管理',
                requiresAuth: true,
              },
              components:{
                managewebsite: ()=>import('../views/ManageWebsite/Children/ManageMessagePage.vue')
              },
            },
            {
              path:'managebackgroundimg',
              name:'managebackgroundimg',
              meta: {
                tittle : '网站背景图管理',
                requiresAuth: true,
              },
              components:{
                managewebsite: ()=>import('../views/ManageWebsite/Children/ManageBackgroundImg.vue')
              },
            },
            {
              path:'manageavatar',
              name:'manageavatar',
              meta: {
                tittle : '用户头像管理',
                requiresAuth: true,
              },
              components:{
                managewebsite: ()=>import('../views/ManageWebsite/Children/ManageAvatar.vue')
              },
            },
            {
              path:'manageadvertisement',
              name:'manageadvertisement',
              meta: {
                tittle : '网站广告管理',
                requiresAuth: true,
              },
              components:{
                managewebsite: ()=>import('../views/ManageWebsite/Children/ManageAdvertisement.vue')
              },
            },
            {
              path:'manageafriendlink',
              name:'manageafriendlink',
              meta: {
                tittle : '友链管理',
                requiresAuth: true,
              },
              components:{
                managewebsite: ()=>import('../views/ManageWebsite/Children/ManageFriendLink.vue')
              },
            },
          ]
        },
        {
          // 管理权限
          path:'/manageprivilege',
          name:'manageprivilege',
          meta: {
            tittle : '权限管理',
            requiresAuth: true,
          },
          components:{
            main: ()=>import('../views/ManagePrivilege/ManagePrivilege.vue')
          }
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        requiresAuth: false,
        // keepAlive:true
      },
      components:{
        app : ()=>import('../views/NewViews/LoginPage/Login.vue')
      },
    }
  ],
  
  // scrollBehavior: () => ({ y: 0 }),
})
router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    if(!store.getters.admininfo.islogin){
      router.push('/login')
    }
    // router.push('/login')
  }
  next()
})

export default router