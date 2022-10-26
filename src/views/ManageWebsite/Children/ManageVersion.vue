<template>
  <div id="manage-version">
    <!-- 添加数据操作区域 -->
    <div class="opr-block">
      <el-button size="small" type="primary" @click="dialogFormVisible = true">
        添加记录
      </el-button>
    </div>

    <!-- 添加更新记录dialog -->
    <el-dialog
      title="添加更新版本记录"
      :visible.sync="dialogFormVisible"
      :before-close="handleDiaClose"
    >
      <el-form>
        <el-form-item label="版本Title" :label-width="formLabelWidth">
          <el-input
            maxlength="50"
            type="textarea"
            v-model="add_title"
            :autosize="{ minRows: 2, maxRows: 2 }"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="版本详细说明" :label-width="formLabelWidth">
          <el-input
            ref="input"
            :autosize="{ minRows: 3, maxRows: 5 }"
            maxlength="2000"
            type="textarea"
            v-model="add_content"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="版本更新时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="add_date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addVersionRecord">提 交</el-button>
      </div>
    </el-dialog>
    <!-- 编辑更新记录的drawer -->
    <el-drawer  
                title="编辑更新版本记录"
                :visible.sync="drawer"
                :before-close="handleDrawerClose"
                size="35%">
                <div class="inner-content">
                    <el-form  >
                        <el-form-item label="版本Title" >
          <el-input
            maxlength="50"
            type="textarea"
            v-model="edi_title"
            :autosize="{ minRows: 2, maxRows: 2 }"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="版本详细说明" >
          <el-input
            ref="input"
            :autosize="{ minRows: 8 }"
            maxlength="2000"
            type="textarea"
            v-model="edi_content"
            show-word-limit
          ></el-input>
          <el-form-item label="显示状态">
             <el-switch
                v-model="edi_status"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
          </el-form-item>
        </el-form-item>
       
        <el-form-item label="版本更新时间" >
          <el-date-picker
            v-model="edi_date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
                        <el-form-item>
                            <el-button  type="success" 
                            @click="updateVersionRecord"
                            style="width:100px;height:35px;margin:30px 0px 20px 0px">提交修改</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-drawer>


    <!-- 数据展示区域 -->
    <div class="display-block">
      <el-timeline>
          
            <el-timeline-item
              v-for="(it, index) in records_list"
              :key="index"
              color="#82D8CF"
              placement='bottom'
              size='large'
              class="timeline-item"
              :timestamp="it.Description_CreateTime"
            >
              <div>
                <p class="record-title"
                @click="showEditDrawer(it)"
                :class="{'is-hide':it.Description_Status === 0}"
                >
                  {{it.Description_Title}}
                  <span style="fontSize:12px">
                    {{it.Description_Status === 0?'(不展示)':''}}
                  </span>
                </p>
              </div>
              <div class="record-item">
                <p>
                  {{ it.Description_Content }}
                </p>
              </div>
            </el-timeline-item>
          </el-timeline>
    </div>
  </div>
</template>

<script>
import { addversionrecordAPI, getversionrecordsAPI,updateversionrecordAPI } from "../../../http/api";
export default {
  name: "ManageVersion",
  data() {
    return {
      formLabelWidth: "",
      //dialog
      dialogFormVisible: false,
      drawer:false,
      //添加
      add_title: "",
      add_content: "",
      add_date: "",
      //编辑
      edi_id:null,
      edi_title:'',
      edi_content:'',
      edi_date:'',
      edi_status:null,
      //更新记录列表
      records_list: []
    };
  },
  computed: {
    
  },
  methods: {
    //关闭dialog
    handleDiaClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
//关闭drawer
        handleDrawerClose(done) {
            this.$confirm('确认取消编辑？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
    statusFomater(num) {
      if(num === 0) return false
      if(num === 1) return true
      
    },
    statusParse(bool){
      if(bool)return 1
      return 0
    },
    //添加一条更新记录
    addVersionRecord() {
      const presend = {
        p_id: this.$store.getters.uniqueid,
        p_name: this.$store.getters.nickname,
        p_acc: this.$store.getters.account,
        title: this.add_title,
        content: this.add_content,
        create_time: this.add_date
      };
      // console.log(presend)
      addversionrecordAPI({ ...presend })
        .then(res => {
          this.getVersionRecords();
          this.$message({
            type: "success",
            message: "添加成功!"
          });
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "添加失败!"
          });
          console.log(err);
        })
        .finally(() => {
          this.dialogFormVisible = false;
          this.add_title = "";
          this.add_content = "";
          this.add_date = "";
        });
    },
    //获取所有更新记录
    getVersionRecords() {
      getversionrecordsAPI()
        .then(res => {
          this.records_list = Object.values(res.data);
        })
        .catch(err => console.log(err));
    },
    //打开编辑修改drawer
    showEditDrawer(item){
      this.drawer = true
      const {
        id,
        Description_Title,
        Description_Content,
        Description_CreateTime,
        Description_Status
      } = item
      this.edi_id = id
      this.edi_title = Description_Title
      this.edi_content = Description_Content
      this.edi_date = Description_CreateTime
      this.edi_status = this.statusFomater(Description_Status)
      // console.log(item)
      
    },
    updateVersionRecord(){
      console.log('updateVersionRecord')
      
      const presend = {
          id: this.edi_id,
          title: this.edi_title,
          content: this.edi_content,
          create_time: this.edi_date,
          status: this.statusParse(this.edi_status)
      }
      updateversionrecordAPI({...presend})
      .then(res=>{
        this.drawer = false

        this.$message({
            type: "success",
            message: "更新成功!"
        });
        this.getVersionRecords();

      })
      .catch(err=>{
        this.$message({
            type: "error",
            message: "更新失败!"
        });
        console.log(err)
      })

    }
  },
  mounted() {
    this.getVersionRecords();
  }
};
</script>
<style>
.el-timeline-item__wrapper {
    padding-left: 58px !important;
}
</style>
<style lang="less" scoped>
#manage-version {
  height: auto;
  width: auto;
  overflow: hidden;

  .opr-block {
    margin: 10px;
  }
  //设置为不展示的记录标题颜色
  .is-hide{
    color: red ;
  }
  .display-block {
    box-sizing: border-box;
    width: auto;
    height: calc(100vh - 240px);
    // background: skyblue;
    border: 1px solid #eee;
    overflow: auto;
    padding: 50px 20px 20px 20px;
    margin: 10px 10px;
    color: #6d757a;
  }
  //timeline
  .timeline-item{
    
  }
  .record-title{
    font-size: 20px;
    font-weight: 700;
    // color: #6d757a;
    margin-top: 0px;
    margin-bottom: 0px;
    padding: 0px;
    cursor: pointer;
  }
  .record-title:hover:after{
    content: '点击编辑修改';
    font-size: 14px;
    font-weight: 200;
    padding: 8px;
    margin: 0px 0px 0px 5px;
    color: #fff;
    background: #000;
    border-radius: 5px;
  }
  .record-item{
    width: auto;
    p{
      width: 90%;
      padding: 0px;
      margin-top: 0px;
      margin-bottom: 0px;
      font-weight: 400;
      display: block;
      color: #6d757a;
      white-space: pre-line;
      word-wrap: break-word;
    }
    
  }
  // drawer
  .inner-content{
    padding: 0px 20px;
  }
  
}
</style>
