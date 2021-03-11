<template>
  <div class="read-dialog" v-if="site">
    <el-dialog :title="`Message from ${site.siteName} Content Integrity`" :visible.sync="dialogRead" width="550px" v-if="selReport">
      <div class="read_main">
        <p>Hi {{selReport.companyName}},</p>
        <p>Thanks for your inquiry about the review by {{selReport.name}}, which you flagged as {{selReport.reportingReason}}.</p>
        <p>We've assessed the review and concluded it doesn't contain {{selReport.reportingReason}},{{selReport.content}}. Therefore, we won't be taking any further action, and you won't be able to flag the review again for any of these reasons. You can read more about the types of content we consider to be harmful or illegal here.</p>
        <p>The review has now been reinstated.</p>
        <p>If you have any questions, you can reply to this email in the next 7 days, or you can always contact us via our Support Center.</p>
        <p>Thanks</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">Close</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props:{
    selReport:{
      type:Object,
      default:null
    }
  },
  data(){
    return{
      dialogRead:false,
    }
  },
  computed:{
    site(){
      return this.$store.state.siteInfo;
    }
  },
  methods:{
    /**
     * 关闭按钮
     */
    handleClose(){
      this.dialogRead=false;
    },
    /**
     * 打开弹窗
     */
    openDialog(){
      this.dialogRead=true;
    },
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/dialog.less";
.read-dialog{
  .read_main{
    p{
      line-height: 22px;
      margin-top: 0;
    }
  }
  /deep/.el-dialog__header{
    padding: 18px 20px;
  }
  /deep/.el-dialog__body{
    border-top: 1px solid #E4E4EC;
    padding:22px;
  }
  /deep/.el-dialog__footer{
    border-top: 1px solid #E4E4EC;
    background: #F9F9FA;
    padding: 15px 20px;
    .dialog-footer{
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>