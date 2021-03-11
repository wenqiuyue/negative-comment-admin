<template>
  <div class="why-dialog" v-if="seeReviews">
    <el-dialog title="Why was the review reinstated?" :visible.sync="dialogWhy" width="615px">
      <div class="why_main">
        <h5>A response from our Content Integrity Team</h5>
        <p>Hi {{seeReviews.reportUser.name}},</p>
        <p>Thanks for your inquiry about the review by {{seeReviews.reviews.name}}, which you flagged for {{seeReviews.reportingReason}}{{seeReviews.content?`,${seeReviews.content}`:''}}.</p>
        <p>We've now read the review and concluded that the words or phrases you've identified don't contravene our guidelines, so we won't be taking further action.</p>
        <p>Please keep in mind that it's OK for a reviewer to name another company in their review, so long as they don't urge people to buy products or use services from that company.</p>
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
    seeReviews:{
      type:Object,
      default:null
    }
  },
  data(){
    return{
      dialogWhy:false,
    }
  },
  methods:{
    /**
     * 关闭按钮
     */
    handleClose(){
      this.dialogWhy=false;
    },
    /**
     * 打开弹窗
     */
    openDialog(){
      this.dialogWhy=true;
    },
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/dialog.less";
.why-dialog{
  .why_main{
    h5{
      font-size: 16px;
      font-weight: 500;
      color: #1B1B21;
      margin: 0px 0 10px 0;
    }
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