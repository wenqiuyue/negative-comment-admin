<template>
  <div class="report-dialog">
    <el-dialog :title="page==1?'Before you start':'Why are you flagging this review'" :visible.sync="dialogReport" width="615px" @open="open">
      <div class="page_one" v-if="page==1">
        <div class="one_step">
          <div>1</div>
          <div>You can flag reviews that breach <span>our guidelines</span></div>
        </div>
        <div class="one_step">
          <div>2</div>
          <div>An overview of <span>your flagging activities</span> will be <strong>publicly available.</strong></div>
        </div>
        <h5>If you disagree width a riview</h5>
        <p>We recommend writing a <span>public reply</span>. It's an opportunity to demonstrate how much you care about your customer's opinions (even the ones you might disagree width). </p>
      </div>
      <div class="page_two" v-else>
        <h5>Please explain why you are reporting this review</h5>
        <el-form class="form" ref="form" :model="twoForm" label-width="80px" label-position="top">
          <el-form-item label="Select a reason">
            <el-select v-model="twoForm.twoSel" placeholder="select a reason">
              <el-option
                v-for="item in selOption"
                :key="item.id"
                :label="item.content"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              type="textarea"
              :autosize="{ minRows: 7}"
              placeholder="Please enter an explanation."
              v-model="twoForm.reason">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-checkbox v-if="page==1" v-model="oneChecked">Don't show this message again.</el-checkbox>
        <el-button v-else plain @click="backBtn">Back</el-button>
        <el-button type="primary" @click="confirmBtn" :loading="loading">{{page==1?'Continue':'Submit'}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props:{
    comId:{
      type:Number,
      default:null,
    },
    selOption:{
      type:Array,
      default:[]
    },
  },
  data(){
    return{
      dialogReport:false,
      loading:false, //加载
      page:1, //当前步骤页
      twoForm:{
        twoSel:1, //步骤二举报原因单选
        reason:''
      },
      oneChecked:false
    }
  },
  mounted(){
  },
  methods:{
    /**
     * 打开弹窗回调
     */
    open(){
      if(this.oneChecked){
        this.page=2;
      }
    },
    /**
     * 打开弹窗
     */
    openDialog(){
      this.page=1;
      this.dialogReport=true;
    },
    /**
     * 确认按钮
     */
    confirmBtn(){
      if(this.page==1){
        this.page=2;
      }else{
        this.loading=true;
        const data={
          commentId:this.comId,
          reportingReasonId:this.twoForm.twoSel,
          content:this.twoForm.reason
        }
        this.$apiHttp.sitePostReport(data).then((resp)=>{
          if(resp.res==200){
            this.$message({
              message: 'Successful report',
              type: 'success'
            });
            this.dialogReport = false;
            this.$emit('success');
          }
        }).finally(()=> this.loading=false);
      }
    },
    /**
     * 步骤二返回按钮
     */
    backBtn(){
      this.page=1;
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/dialog.less";
.report-dialog{
  .page_one{
    .one_step{
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 18px;
      div:first-child{
        flex-shrink: 0;
        width: 58px;
        height: 58px;
        border-radius: 50%;
        background: #EAF3FB;
        text-align: center;
        line-height: 58px;
        color: #1A66FF;
        font-size: 28px;
        font-weight: bold;
      }
      div:last-child{
        margin-left: 18px;
        span{
          color: #276FFF;
        }
      }
    }
    h5{
      font-size: 16px;
      font-weight: normal;
      color: #1B1B21;
      margin: 20px 0 10px 0;
    }
    p{
      line-height: 22px;
      margin-top: 0;
    }
  }
  .page_two{
    h5{
      font-size: 16px;
      font-weight: normal;
      color: #1B1B21;
      margin: 0;
    }
    p{
      margin: 22px 0 10px;
    }
    .form{
      margin-top: 10px;
      /deep/.el-form-item{
        margin-bottom: 10px;
        .el-form-item__label{
          padding-bottom: 0;
        }
        .el-select{
          width: 100%;
        }
      }
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
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>