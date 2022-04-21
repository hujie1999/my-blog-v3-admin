<template>
  <div id="role-datails">
    <h4>sidebar展示权限</h4>
    <el-tree 
    :data="sidebar" 
    :props="previewProps"
    ref="sidebartree"
    :highlight-current="true"
	  node-key="idx"
	  :default-expanded-keys="sidebarDefaultShowNodes"
    >
    </el-tree>
    <h4>后台接口访问权限</h4>
    <!-- <el-tree
      :data="sidebarData"
      :props="defaultProps"
      show-checkbox
      node-key="idx"
      ref="tree"
			@check-change="handleCheckChange"
    >
    </el-tree>

    <p>{{saver}}</p>
    <p>{{show}}</p> -->

  </div>
</template>

<script>
import qs from 'qs'
import { alltablistAPI } from '../../../http/api'
export default {
  name: "RoleDetails",
  data() {
    return {
      previewProps:{
        children: "child",
        label: "title",
      },
      //默认展开数组
      sidebarDefaultShowNodes:[],
      sidebarData:[],

      // defaultProps: {
      //   children: "child",
      //   label: "title",
      // },
      // saver:[],
      // show:[]
    };
  },
  props:{
    sidebar:[]
  },
  methods: {
   

    // handleCheckChange(data, checked, indeterminate) {
    //     // console.log(data, checked, indeterminate);
    //     // console.log(data)
    //       const whole = this.$refs.tree.getCheckedKeys();
    //       const half = this.$refs.tree.getHalfCheckedKeys();
    //       const result = whole.concat(half);

    //       this.saver = result
    //       let newtab = {}
    //       this.loopPush(this.sidebarData,newtab)
          
    //       setTimeout(()=>{
    //         console.log(newtab)
    //         this.show = Object.values(newtab)
    //         console.log(qs.stringify(Object.values(newtab)))
    //       },0)
          
    //   },
    //   loopPush(sidebar,newtab){
    //     for(let i=0;i<sidebar.length;i++){
    //       if(this.saver.includes(sidebar[i].idx)){
    //         let obj = {
    //           idx:sidebar[i].idx,
    //           title:sidebar[i].title,
    //           class:sidebar[i].class,
    //           path:sidebar[i].path
    //         }
    //         newtab[i]=Object.assign(obj)
    //         if(sidebar[i].child){
    //           this.loopPush(sidebar[i].child,newtab[i].child={})
    //         }
    //       }
    //     }
    //   }
  },
  mounted(){
    // alltablistAPI().then(res=>{
    //   let temp = Object.values(res.data)[0].Tab_List
    //   this.sidebarData = Object.values(qs.parse(temp))
    // }).catch(err=>{console.log(err)})
  },
  watch:{
    sidebar:{
      handler(oldVal,newVal){
        this.sidebar.map(v=>{
          this.sidebarDefaultShowNodes.push(v.idx)
        })
      }
    }
  }
};
</script>

<style lang="less" scoped>
#role-datails {
  height: auto;
  width: auto;

}
</style>