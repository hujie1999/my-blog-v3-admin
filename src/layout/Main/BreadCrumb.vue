<template>
    <div id="breadcrumb">
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
      }
  },
  created(){
      this.getBreadList(this.$route)
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
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* margin: 20px 5px; */
    background: #fff;
}
.el-breadcrumb {
    /* float: left; */
    padding-left: 5px;
}
</style>
