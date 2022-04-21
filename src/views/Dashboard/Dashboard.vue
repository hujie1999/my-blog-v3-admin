<template>
  <div>
    <h2>this is DashBoard page</h2>
    <!-- 博客展示使用 :value    :show='true' -->
    <!-- 博客编辑使用 :content  :show='false' -->
    <!-- <markdown
      :value="content"
      :show="true"
    >
    </markdown> -->
    <!-- <markdown
      :content='axiosData'
      :show="false"
    >
    </markdown> -->
    
  </div>
</template>

<script>
export default {
  name: 'DashBoard',
  components:{
    
  },
  data(){
    return {
      content : ''
    }
  },
  methods:{
  }
}
</script>

<style>
</style>
