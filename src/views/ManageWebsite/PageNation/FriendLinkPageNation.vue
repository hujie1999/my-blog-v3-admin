<template>
  <div id="friend-link-pagenation">
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
    name:'FriendLinkPageNation',
    data(){
        return{
            handled_current_page: null,
            handled_start:null
        }
    },
    props:{
      current:{
          default:1,
          type:Number
      },
    //   start:{
    //       default:0,
    //       type:Number
    //   },
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
}
</script>

<style lang='less' scoped>
#friend-link-pagenation{
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
    // padding-top: 20px;
    // padding-bottom: 20px;
    // margin: 20px 0px;
}
</style>