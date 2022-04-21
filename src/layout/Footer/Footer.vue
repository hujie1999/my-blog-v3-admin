<template>
  <div id="footer">
     <div class="explain-block">
       <p>Copyright &copy; 2022 HJ.AllRightsReserved.</p>
       <p>Email.1256215927@qq.com</p>
       <p>
         <a href="https://beian.miit.gov.cn/" target="_blank">
           蜀ICP备2022003545号-1
         </a>
      </p>
     </div>
  </div>
</template>
<script>
export default {
  name:'Footer'
};
</script>
<style scoped>
#footer{
  background:#374046;
  width: 100vw !important;
  height: 60px;
  /* border-radius: 4px 4px 0 0 ; */
  font-size: 14px;
  line-height: 8px;
  /* color:#efebe9; */
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
}
.explain-block{
  height: auto;
  width: auto;
}
.explain-block p,a{
  color: rgb(170, 170, 170);
  font-size: 12px;
}
</style>
