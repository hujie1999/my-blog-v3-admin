<template>
<!-- 这是BlogListTable 里的随机颜色标签的组件 -->
  <div id="blog-list-table-tags">
      <el-tag
         v-for="(t,index) in (tagslist.split(','))"
        :key="index"
        effect="dark"  
        :type='tag_color_list[Math.floor(Math.random()*4)]'
       >{{t}}</el-tag>
  </div>
</template>

<script>
export default {
    name:'BlogListTableTags',
    data(){
        return {
            tag_color_list : ['success','warning','danger','primary']
        }
    },
    props:{
        tagslist:{
            type : String
        }
    }

}
</script>

<style lang='less'>
#blog-list-table-tags{
    .el-tag{
        margin: 4px 2.5px !important;
    }
}
</style>