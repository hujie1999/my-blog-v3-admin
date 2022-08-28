<template>
<!-- 自定义echarts -->
  <div
    :id="id"
    ref="custum_echarts"
    :style="style"
  >
  </div>
</template>

<script>

const randomId = ()=>{
  return new Date().getTime()
}

export default {
  name: "CustomECharts",
  data(){
    return {
      id: randomId(),
      myChart: null,
      //预设 替换 键名 （部分替换时会使用到）
      preset_replace_key:['xAxis', 'yAxis', 'series'],
      //事件名列表，用于收集绑定的事件，在组件销毁时集中销毁监听
      event_name_list:[]
    }
  },
  props: {
    renderType:{
      type: String,
      default: 'canvas'
    },
    //  （默认）[]为全部删除，传参['xAxis', 'yAxis', 'series']至少一项为部分删除该项
    replace:{
      type: Array,
      default: ()=>[]
    },
    height: {
      type: String,
      default: '400px'
    },
    width: {
      type: String,
      default: '600px'
    },
    option:{
      type: Object,
      required: true
    },
    transClick:{
      type: Function
    },
    transDataZoom:{
      type: Function
    }
  },
  computed: {
    style() {
      return {
        height: this.$props.height,
        width: this.$props.width
      }
    }
  },
   methods:{
    init(){
      return new Promise((resolve,reject)=>{
        try{
          this.myChart = this.$echarts.init(this.$refs.custum_echarts,null,{renderer:this.$props.renderType});
          this.myChart.setOption(this.option);
          resolve()
        }catch(e){
          reject(e)
        }
      })
    },
    //判断替换类型
    judgeReplace(){
      if(this.$props.replace.length==0){
        return true
      }
      return false
    },
    //封装 注册事件函数
    registeEvent(name,fn){
      this.event_name_list.includes(name)?'':this.event_name_list.push(name)
      this.myChart.on(name,(e)=>{fn(e)})
    },
    //点击事件
    handleClick(e){ this.$emit('transClick',e) },
    //区域缩放事件
    handleDataZoom(e){ this.$emit('transDataZoom',e)}
  },
  mounted () {  
    this.init()
      .then(()=>{
        //Events
        this.registeEvent('click',this.handleClick)
        this.registeEvent('datazoom',this.handleDataZoom)
      })
      .catch(err=>{
        throw err
      })
    
  },
  updated () {
    // console.log(this.event_name_list)
  },
  beforeDestroy() {
    let mc = this.myChart
    if(mc){
      //销毁监听事件
      this.event_name_list.forEach(v=>mc.off(v))
      //销毁实例，销毁后实例无法再被使用。
      mc.dispose()
      /* dispose 会释放内部占用的一些资源和事件绑定，但是解除实例的引用我们是做不到的，所以需要重新赋值为null */
      mc = null
      return
    }
    return
  },
  //响应式自适应
  watch: {
    height: {
      handler (newVal,oldVal){
        this.$nextTick(()=>{
          this.myChart && this.myChart.resize({
            animation: {
              duration: 500
            }
          })
        })
      }
    },
    width: {
      handler (newVal,oldVal){
          this.$nextTick(()=>{
            this.myChart && this.myChart.resize({
              animation: {
                duration: 500
              }
            })
        })
        
      }
    },
    /**
     * 删除所有：使用 notMerge: true，则所有组件都被删除。
      删除部分：使用 replaceMerge: [...]，被指定的组件类型，会根据 replaceMerge 的规则：如果 id 匹配就合并（ merge ），否则旧组件被删除，新组件被创建。
      “部分删除” 有助于，在删除该删除的组件时，保留其他组件的状态（如高亮、动画、选中状态）。
     */
    option: {
      handler(newVal,oldVal) {
        const result = this.judgeReplace()
        let opt = {}
        if(result){
          opt = {notMerge: true}
        }
        else{
          let replace_name = []
          this.$props.replace.forEach(v=>{
            this.preset_replace_key.includes(v)?replace_name.push(v):''
          })
          opt = {replaceMerge: replace_name}
        }
        this.$nextTick(()=>{
          this.myChart.setOption(newVal,opt)
        })
      },
      deep: true
    },
  }
};
</script>

<style>

</style>
