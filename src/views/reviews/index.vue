<template>
  <div class="reviews">
    <el-tabs v-model="activeName">
      <el-tab-pane label="Inbox" name="1">
        <Inbox v-if="activeName=='1'" :reportReasonOption="reportReasonOption"></Inbox>
      </el-tab-pane>
      <el-tab-pane label="Reporting activity" name="2">
        <Report v-if="activeName=='2'" :whoOption="whoOption" :reportReasonOption="reportReasonOption" :statusOption="reportAndReviweStatus"></Report>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  components:{
    Inbox:()=> import("./inbox"),
    Report:()=> import("./report"),
  },
  data(){
    return{
      activeName:'1',
      whoOption:[], //举报人选项
      reportReasonOption:[],
      reportAndReviweStatus:[],
    }
  },
  mounted(){
    this.getSelOption();
  },
  methods:{
    /**
     * 获取举报原因及举报人选项数据
     */
    getSelOption(){
      Promise.all([
        this.$apiHttp.siteUserWhoReported(),
        this.$apiHttp.siteReportingReason(),
        this.$apiHttp.siteReportAndReviweStatus(),
      ]).then((resp)=>{
        if(resp[0].res==200){
          this.whoOption=resp[0].data;
        }
        if(resp[1].res==200){
          this.reportReasonOption=resp[1].data;
        }
        if(resp[2].res==200){
          this.reportAndReviweStatus=resp[2].data;
        }
      })
    },
  }
}
</script>
<style lang="less" scoped>
.reviews{
  // background: #F9F9F9;
  height: 100%;
  overflow-y: scroll;
  .el-tabs{
    background: #ffffff;
    /deep/.el-tabs__header{
      margin: 0;
    }
    /deep/.el-tabs__nav-wrap{
      padding: 0 18px;
    }
  }
  
}
</style>
