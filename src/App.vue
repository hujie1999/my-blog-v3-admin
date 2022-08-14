<template>
  <div id="app">
    <router-view name="app"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {

    }
  },
  created(){
    
    //刷新保存 store 的AdminInfo数据
    if (localStorage.getItem("AdminInfo")) {
      this.$store.replaceState(this.$store.state,JSON.parse(localStorage.getItem("AdminInfo")))
    } 
    window.addEventListener("beforeunload",()=>{
      localStorage.setItem("AdminInfo",JSON.stringify(this.$store.getters.admininfo))
    })
  },
}
</script>

<style>
html,body{
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  box-sizing: border-box !important;
  padding: 0px;
  margin: 0px;
}

*::-webkit-scrollbar{
  display: none;
}

.el-tabs--border-card>.el-tabs__content {
    padding: 0 !important;
}

</style>
