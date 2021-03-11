<template>
  <div id="app" v-loading="loading">
    <router-view v-if="!loading" />
  </div>
</template>
<script>
import type from './commons/type';
export default {
  data(){
    return{
      loading:false,
    }
  },
  mounted(){
    this.getSite();
  },
  methods:{
    /**
     * 获取site信息
     */
    getSite(){
      this.loading=true;
      this.$apiHttp.siteWebSiteInfo({params:{domain:document.domain}}).then((resp)=>{
        if(resp.res==200){
          this.$store.dispatch("getSite", resp.data);
        }
      }).finally(()=> this.loading=false);
    }
  }
}
</script>

<style lang="less">
body,html{
  margin: 0;
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
