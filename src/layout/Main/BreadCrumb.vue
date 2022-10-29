<template>
    <div id="breadcrumb">
        
        <div @click="switchSidebar"
        class="op-side-area"
        >
            <i v-if="!isCollapse" class="el-icon-s-fold op-side-btn"></i>
            <i v-else class="el-icon-s-unfold op-side-btn"></i>
        </div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
            v-for="(item,index) in breadList"
            :key="index"
            :to="item.path"
            >
            {{item.tittle}}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>

export default {
  name: "BreadCrumb",
  data() {
    return {
        msg:'这里是面包屑导航条',
        breadList: [] 
    };
  },
  components:{
  
  },
  computed:{
    isCollapse(){
      return this.$store.getters.isCollapse
    }
  },
  methods:{
      getBreadList(v){
          const matched = v.matched
          const home = {path:'/',tittle:'Home'}
          this.breadList.push(home)
          for(let items of matched){
                // console.log(items)
              if(items.path!=''&&items.meta.tittle){
                  this.breadList.push({path:items.path,tittle:items.meta.tittle})
              }
              
          }
      },
      switchSidebar(){
          this.$store.commit('switchCollapse')
      }
  },
  created(){
      this.getBreadList(this.$route)
      console.log(this.$store.getters.isCollapse)
  },
  watch:{
      $route(newval){
          this.breadList = []
          this.getBreadList(newval)
      }
  }
};
</script>
<style scoped>
#breadcrumb{
    height: 49px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #eee;
}
.el-breadcrumb {
    padding-left: 5px;
}
.op-side-area{
    padding: 0px 10px 0px 10px;
}
.op-side-btn{
    font-size: 28px;
}
.active{
    color: #ffd04b;
}
</style>
