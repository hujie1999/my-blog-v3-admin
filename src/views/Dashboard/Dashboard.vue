<template>
  <div class="dashboard">
    <!-- <h2>this is DashBoard page</h2> -->
    
    <div class="left-area">
      <div class="opre-div">
        <div class="tips">
        <span>
          * 数据于每日24:00:00更新
        </span>
      </div>
        <div>
          <el-date-picker
          v-model="now_year"
          type="year"
          size="mini"
          style="width:150px !important;"
          placeholder="选择查询年份"
          @change="dealYear"
          >
         </el-date-picker>
        </div>
      </div>
      <div class="chart-div">
        <CustomECharts
        :option='option'
        :width='width'
        :height='height'
        :replace='replace_name'
        @transClick='dealClick'
        @transDataZoom='dealDataZoom'
        />
      </div>

      

    </div>
    <div class="right-area">
      <!--昨日数据  -->
      <div class="card-area">
        <div class="data-block"
        v-for="(item,index) in data_block"
        :key="index"
        :style="item.style"
        >
          <div class="title-div">
            <span>{{item.title}}</span>
          </div>
          <div class="number-div">
            <span>{{item.number}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomECharts from '@/components/Charts/CustomECharts.vue'
import { getOneYearViewData,
        getYesterdayViewData
} from '@/http/api.js'


export default {
  name: 'DashBoard',
  components:{
    CustomECharts
  },
  data(){
    return {
      //chart 
      width:'100%',
      height:'90%',
      // renderType:'svg',
      replace_name:['series'],

      //选择年份
      picked_year : new Date(),
      //当前年份
      now_year : new Date(),
      //chart data
      total_view:[],
      user_view:[],
      tourist_view:[],

      //昨日数据
      yes_total : 0,
      yes_user : 0,
      yes_tourist : 0,
      web_total_view : 0,
      data_block:[
        {
          title:'昨日总浏览量',
          style:{
            color: '#039be5'
          },
          number: 0
        },
        {
          title:'昨日用户浏览量',
          style:{
            color: 'orange'
          },
          number: 0
        },
        {
          title:'昨日游客浏览量',
          style:{
            color: 'green'
          },
          number: 0
        },
        {
          title:'网站总浏览量',
          style:{
            color: '#ef5350'
          },
          number: 0
        }
      ]
    }
  },
  computed:{
    option() {
      return {
        tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        position: function (pt) {
            return [pt[0], '1%'];
          },
        extraCssText: 'width: 170px'
      },
      
        title: {
          left: '20',

          text:  `${new Date(this.picked_year).getFullYear()}年网站访问统计`
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: ['总访问量', '用户访问量','游客访问量'],
          right: 120
        },
        xAxis: {
          type: 'time',
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 20
          },
          {
            start: 0,
            end: 20
          }
        ],
        series: [

          {
            name: '总访问量',
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: this.total_view
          },
          {
            name: '用户访问量',
            type: 'line',
            symbol: 'none',
            smooth: true,
            data: this.user_view
          },
          {
            name: '游客访问量',
            type: 'line',
            symbol: 'none',
            smooth: true,
            data: this.tourist_view
          },
        ]
  
      }
    }
  },
  created(){
    this.oneYearViewData(new Date(this.now_year).getFullYear())
    this.yesterdayViewData()
  },
  methods:{
    dealClick(e){
      console.log(e);
    },
    dealDataZoom(e){
      console.log(e)
    },
    dealYear(e){
      // console.log(e);
      const year = new Date(e).getFullYear(); //picker选择的年份
      this.total_view = []
      this.user_view = []
      this.tourist_view = []

      this.picked_year = e
      this.oneYearViewData(year)
      
    },
    oneYearViewData(y){
      getOneYearViewData({year:y})
      .then(res=>{
        console.log(res.data);
        if(res.data.data.length==0){
          this.$message({
            message: '无数据！',
            type: 'warning'
          });
        }else{
          this.total_view = res.data.data.total_view
          this.user_view = res.data.data.user_view
          this.tourist_view = res.data.data.tourist_view
        }        

      })
      .catch(err=>{
        this.$message({
            message: '出错了！',
            type: 'error'
          });
          console.log(err);
      })
    },
    yesterdayViewData(){
      getYesterdayViewData().then(res=>{
        this.data_block[0].number = res.data[0].total_view
        this.data_block[1].number = res.data[0].user_view
        this.data_block[2].number = res.data[0].tourist_view
        this.data_block[3].number = res.data[1].count
      })
      .catch(err=>{console.log(err);})
    }
  },

}
</script>

<style>
.dashboard{
  display: flex;
  justify-content: space-evenly;
}
.left-area{
  width: 49%;
  height: calc(100vh - 190px);
  margin-top: 10px;
  border-radius: 5px;
  /* background: floralwhite; */
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 20px;

  
}
.opre-div{
  padding: 10px;
  height: auto;
  width: 100%;
  box-sizing: border-box;
  /* background: gold; */
  display: flex;
  justify-content: space-between;
}
.chart-div{
  width: auto;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tips span{
   color:red;
   margin-left:10px;
   font-weight:bold;
   font-size: 12px;
}
.right-area{
  width: 49%;
  height: calc(100vh - 190px);
  margin-top: 10px;
  border-radius: 5px;
  /* box-shadow: rgb(0 0 0 / 10%) 0px 0px 20px; */

  
}
.data-block{
  display: flex;
  flex-direction: column;
  justify-content:space-evenly;
  align-items: center;
}
.card-area{
  box-sizing: border-box;
  width: 100%;
  height: auto;
  /* background: violet; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.card-area .title-div{
  font-size: 18px;
  font-weight: bold;
}
.card-area .number-div{
  font-size: 48px;
  font-weight: bold;
}
.data-block{
  height: 160px;
  width: 32%;
  border-radius: 5px;
  color: #000;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 20px;
  
}
.data-block:nth-child(4){
  margin-top: 20px;
}
</style>
