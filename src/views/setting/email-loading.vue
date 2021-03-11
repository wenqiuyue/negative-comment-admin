<template>
  <div class="email-loading" v-loading="loading" element-loading-text="Under revision"></div>
</template>
<script>
export default {
  data(){
    return{
      loading:false
    }
  },
  mounted(){
    this.handleChangeEmail();
  },
  methods:{
    handleChangeEmail(){
      this.loading=true;
      this.$apiHttp.siteProfileWorkEmailConfirm({params:{tokenBus:this.$route.query.tokenBus}}).then((resp)=>{
        if(resp.res==200){
          this.$store.dispatch("logout");
          this.$message({
            message: 'Modified successfully',
            type: 'success'
          });
          this.$router.push({
            path:'/'
          })
        }
      }).finally(()=> this.loading=false);
    }
  }
}
</script>
<style lang="less" scoped>
.email-loading{
  height: 100%;
}
</style>