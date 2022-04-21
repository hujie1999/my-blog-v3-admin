<template>
  <div id="blog-tags">
     <el-tag
            v-for="(t,index) in tagslist"
            :key="index"
            effect="dark"  
            :type='tag_color_list[Math.floor(Math.random()*4)]'
        >{{t}}</el-tag>
  </div>
</template>

<script>
export default {
    name:'BlogTagsTemplate',
    data(){
        return {
            tag_color_list : ['success','warning','danger','primary']
        }
    },
    props:{
        tagslist:[]
    }

}
</script>

<style lang='less'>
#blog-tags{
    .el-tag{
        margin: 4px 2.5px !important;
    }
}
</style>