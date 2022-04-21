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
}
html,body,#app,.el-container{
        /*设置内部填充为0，几个布局元素之间没有间距*/
        padding: 0px;
         /*外部间距也是如此设置*/
        margin: 0px;
        /*统一设置高度为100%*/
        height: 100%;
        /* height: 100vh; */
}

*::-webkit-scrollbar{
  display: none;
}



</style>
