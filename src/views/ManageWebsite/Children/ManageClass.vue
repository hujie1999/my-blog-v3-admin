<template>
  <div id="manage-class">
    <h3>博客分类</h3>
    <div class="tag-class-block">
      <el-tabs type="card">
      <el-tab-pane 
      v-for="(item,index) in classlist"
      :key="index"
      :label="item" 
      :name="item">
      </el-tab-pane>
      
    </el-tabs>
    </div>
    <h3>添加或修改</h3>
    <div class="new-class-list-block">
      <el-tag
        class="new-tag-style"
        v-for="(tag,index) in presend"
        :key="index"
        effect="plain"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-class"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Class</el-button>
    </div>
    <div class="submit-bth-block">
      <el-button
      type="primary"
      size="medium"
      @click="submitUpdate"
      >
        提交修改
      </el-button>
    </div>
  </div>
</template>

<script>
import {  allclasslistAPI,
          updateclasslistAPI 
        } from '../../../http/api'
export default {
  name: 'ManageClass',
  data(){
    return {
      classlist:[],
      presend:[],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods:{
    handleClose(tag) {
        this.presend.splice(this.presend.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.presend.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
        // console.log(this.presend)
      },
      submitUpdate(){
        updateclasslistAPI({Class_List:this.presend.toString()})
        .then(res=>{
          this.$notify({
            title: '成功',
            message: '操作成功成功!',
            type: 'success'
          });
          this.initFunc()
        })
        .catch(err=>{
          console.log(err)
          this.$notify({
            title: '失败',
            message: '操作失败!',
            type: 'error'
          });
          this.initFunc()
        })
      },
      initFunc(){
        allclasslistAPI()
          .then(res=>{
            // console.log(res.data)
            this.classlist =  Object.values(res.data)
            this.presend =  Object.values(res.data)
          })
          .catch(err=>{
            console.log(err)
          })
      }
  },
  mounted(){
    this.initFunc()
  }
}
</script>

<style lang="less" scoped>
#manage-class{
  height: 80vh;
  width: auto;
  margin: 0px 5px;
  padding: 5px 10px;
  overflow: auto;
  // .tag-class-block{

  // }
  .new-class-list-block{
    padding: 20px 0px;
    min-height: 280px;
    width: 650px;
    background: blanchedalmond;
    .new-tag-style{
      margin-left: 8px;
    }
    .input-new-class{
      width: 120px !important;
    }
  }
  .submit-bth-block{
    margin: 20px 5px;
  }
  
  
}
</style>
