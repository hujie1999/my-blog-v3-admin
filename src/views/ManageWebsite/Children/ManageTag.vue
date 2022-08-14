<template>
  <div id="manage-tag">
    <h3>博客标签</h3>
    <div class="tag-list-block">
      <el-tag
        class="tag-style"
        v-for="(item,index) in taglist"
        :key="index"
        :type="randomcolor[Math.floor(Math.random()*4)]"
        effect="dark">
        {{ item }}
      </el-tag>
    </div>
    <h3>添加或修改</h3>
    <div class="new-tag-list-block">
      <el-tag
        class="new-tag-style"
        :type="randomcolor[Math.floor(Math.random()*4)]"
        v-for="(tag,index) in presend"
        :key="index"
        effect="plain"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
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
import {  alltagslistAPI,
          updatetaglistAPI 
        } from '../../../http/api'
export default {
  name: 'ManageTag',
  data(){
    return {
      randomcolor:['primary','success','danger','warning'],
      taglist:[],
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
        updatetaglistAPI({Tag_List:this.presend.toString()})
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
        alltagslistAPI()
          .then(res=>{
            // console.log(res.data)
            this.taglist =  Object.values(res.data)
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
#manage-tag{
  // height: 80vh;
  height: auto;
  width: auto;
  // border: 1px solid #e0e0e0;
  // border-radius: 15px;
  // margin: 0px 5px;
  padding: 5px 10px;
  overflow: auto;
  .tag-list-block{
    min-height: 200px;
    height: auto;
    width: 650px;
    padding: 10px 5px;
    // border-radius: 15px;
    background: #f5f5f5;
    line-height: 50px;
    overflow: auto;
    .tag-style{
      margin-right: 10px;
    }
  }
  .new-tag-list-block{
    min-height: 250px;
    height: auto;
    width: 650px;
    line-height: 50px;
    padding: 10px 5px;
    // border-radius: 15px;
    background: #f5f5f5;
    overflow: auto;
    .new-tag-style{
      margin-right: 8px;
    }
    .input-new-tag{
      width: 120px !important;
    }
  }
  .submit-bth-block{
    margin: 10px 0px;
  }
  
  
}
</style>
