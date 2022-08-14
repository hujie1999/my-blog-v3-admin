<template>
  <div id="manage-adv">
      <el-form ref="form"  label-width="100px">
      <el-form-item label="原广告标题">
        <h3 v-text="adv_info.Adv_Tittle"></h3>
      </el-form-item>
      <el-form-item label="新广告标题">
        <el-input
          ref="input"
          v-model="presend.Adv_Tittle"
          maxlength="30"
          style="width: 350px"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="原广告介绍">
        <p v-text="adv_info.Adv_Introduction"></p>
      </el-form-item>
      <el-form-item label="新广告介绍">   
        <el-input
          ref="input"
          v-model="presend.Adv_Introduction"
          maxlength="500"
          style="width: 500px"
          :autosize="{ minRows: 4, maxRows: 6}"
          type="textarea"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="广告图片">
        <div class="adv-img-block">
            <!-- <span v-text="adv_info.Adv_Img_Link"></span> -->
            <div
            class="img-control"
            v-for="item in adv_list"
            :key="item.Adv_Img_Url"
            >
            <!-- <span>{{item}}</span> -->
            <a :href="item.Adv_Img_Link">
                <img :src="item.Adv_Img_Url" :alt="item">
            </a>
            </div>
        </div>
      </el-form-item>
      <el-form-item>
        <span style="font-size:12px;color:red">须知：图片链接和跳转链接用 * 分隔，每个广告用 , 分隔</span>
      </el-form-item>
      
      <el-form-item label="添加广告图片链接和广告跳转链接">
        <el-input
            ref="input"
            v-model="presend.Adv_Img_Link_Url"
            maxlength="500"
            :autosize="{ minRows: 8, maxRows: 10}"
          type="textarea"
            style="width: 500px"
            show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="update-btn">
          <el-button
          type="primary"
          size="medium"
          @click="submitUpdate"
          >
          提交
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { 
    getadvertisementAPI,
    updateadvertisementAPI
 } from '../../../http/api'
export default {
    name:'manageadvertisement',
    data(){
        return{
            adv_info:{},
            //广告列表  
            adv_list:[],
            presend:{
                Adv_Tittle:'',
                Adv_Introduction:'',
                Adv_Img_Link_Url:''
            },
        }
    },
    computed:{
    },
    methods:{
        //获取广告信息
        getAdvertisement(){
            getadvertisementAPI().then(res=>{
                // console.log(Object.values(res.data)[0])
                let temp = Object.values(res.data)[0]
                this.adv_info.Adv_Tittle = temp.Adv_Tittle
                this.adv_info.Adv_Introduction = temp.Adv_Introduction
                this.presend = temp
                let mix =  temp.Adv_Img_Link_Url.split(',')

                
                if(mix.length==1){
                    let obj = {}
                    let item = mix[0].split('*')
                    obj.Adv_Img_Url = item[0]
                    obj.Adv_Img_Link = item[1]
                    this.adv_list.push(obj)
                }else if(mix.length>1){
                    mix.map(v=>{
                        let obj = {}
                        let item = v.split('*')
                        obj.Adv_Img_Url = item[0]
                        obj.Adv_Img_Link = item[1]
                        this.adv_list.push(obj)                   
                    })
                }
            }).catch(err=>{console.log(err)})
        },
        //提交
        submitUpdate(){
            
            let send = {}
            send.Adv_Tittle = this.presend.Adv_Tittle
            send.Adv_Introduction = this.presend.Adv_Introduction
            send.Adv_Img_Link_Url = this.presend.Adv_Img_Link_Url,
            updateadvertisementAPI({information:send}).then(res=>{
                this.$message({
                    showClose: true,
                    message: '执行成功！',
                    type: 'success',
                });
                setTimeout(()=>{
                    this.$router.go(0)
                },2000)
            }).catch(err=>{console.log(err)})
        }
    },
    created(){
        this.getAdvertisement()
    }
}
</script>

<style>
#manage-adv{
    height: auto;
    width: auto;
    padding: 0;
    margin: 0;
}
.adv-img-block{
    height: 400px;
    width: 250px;
    border: 1px solid #eee;
    overflow: auto;
    padding: 5px 0px 0px 5px;
}

.img-control img{
    height: auto;
    width: 200px;
}
</style>