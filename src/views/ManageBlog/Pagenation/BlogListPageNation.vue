<template>
  <div id="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-size="length"
      layout="total, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "BlogListPageNation",
  data() {
    return {
      handled_current_page: null,
      handled_start:null
    };
  },
  components: {},
  props:{
      current:{
          default:1,
          type:Number
      },
      start:{
          default:0,
          type:Number
      },
      length:{
          default:4,
          type:Number
      },
      total:{
          default:400,
          type:Number
      }
      ,
      handledPageParams:{
          type:Function
      }
  },
  methods: {
      handleFunc(v){
          this.handled_current_page = v
          this.handled_start = this.length*(v-1)
      },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.handleFunc(val)
      this.$emit('handledPageParams',this.handled_current_page,this.handled_start)
    },
  },
};
</script>

<style lang='less'>
#block{
    // padding-top: 20px;
    // padding-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}
</style>