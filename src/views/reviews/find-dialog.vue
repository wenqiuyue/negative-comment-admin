<template>
  <div class="find-dialog">
    <el-dialog title="Contact the reviewer" :visible.sync="dialogFind" width="615px" @closed="close" v-if="selReviews && site">
      <div class="find_main">
        <h5>How it works</h5>
        <p>We'll let the reviewer know you'd like more information to help you identify them and their experience with {{selReviews.companyName}}. It's up to them whether they choose to share their full name, email, order ID, phone number, or all of the above with you.</p>
        <p>They'll have 3 days to reply.</p>
        <h5><i class="el-icon-message icon"></i> Here's the email we'll send to {{selReviews.name}}:</h5>
        <p>(We'll translate this message to match {{selReviews.name}}'s own language)</p>
        <div class="email" v-if="!isSeeMore">
          <p>{{site.siteName}}</p>
          <h5>{{selReviews.companyName}} would like some information regarding your review</h5>
          <div class="one_row">Hi {{selReviews.name}}, Thanks for your review on {{site.siteName}}. Based on your review {{selReviews.companyName}} would like a little more information</div>
          <el-link type="primary" @click="isSeeMore=true">See more</el-link>
        </div>
        <div class="email_more" v-else>
          <el-form ref="form" label-width="80px">
            <el-form-item label="From:">
              {{site.siteName}}
            </el-form-item>
            <el-form-item label="To:">
              {{selReviews.name}}
            </el-form-item>
            <el-form-item label="Subject:">
              <div>{{selReviews.companyName}} would like some information regarding your review</div>
            </el-form-item>
          </el-form>
          <div class="email_con">
            <p>Hi {{selReviews.name}},</p>
            <p>Thanks for your review on {{site.siteName}}.</p>
            <p>Based on your review, {{selReviews.companyName}} would like a little more information about your experience. This will help them write a more useful reply to you. It'll also help them verify that you've had a genuine experience with their business.</p>
            <p>Of course, it's totally up to you what you share.</p>
            <!-- <p class="more_info">Provide more information</p> -->
            <p>Thanks for helping {{selReviews.companyName}} connect the dots!</p>
            <p>The {{site.siteName}} Team</p>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button plain @click="handleCancle">Cancel</el-button>
        <el-button type="primary" @click="saveFindReviewer" icon="el-icon-position" :loading="loading">Send Request</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {isMobile} from "../../commons";
export default {
  props:{
    selReviews:{
      type:Object,
      default:null
    }
  },
  data(){
    return{
      dialogFind:false,
      isSeeMore:false, //是否查看更多
      loading:false
    }
  },
  computed:{
    site(){
      return this.$store.state.siteInfo;
    }
  },
  methods:{
    isMobile,
    /**
     * 弹窗关闭回调
     */
    close(){
      this.isSeeMore=false;
    },
    /**
     * 取消按钮
     */
    handleCancle(){
      this.dialogFind=false;
    },
    /**
     * 打开弹窗
     */
    openDialog(){
      this.dialogFind=true;
    },
    /**
     * 确认按钮
     */
    confirmBtn(fdata){  
      const html=`
      <div style="min-height: 100vh;background: #000;display: flex;align-items: center;">
        <div style="margin:10px auto">
        <div style="margin:0 20px;max-width: 600px;background: #fff;padding: 50px;border-radius: 8px;color: #333;">
          <p style="font-size: 20px;
        font-weight: 700;
        margin-bottom: 25px;
        text-align: center;">Hi ${this.selReviews.name},</p>
          <p style="word-break: break-all;margin: 10px 0;">Thanks for your review on ${this.site.siteName}.</p>
          <p style="word-break: break-all;margin: 10px 0;">Based on your review, ${this.selReviews.companyName} would like a
            little more information about your experience. This will help them write a more useful reply to you. It'll also
            help them verify that you've had a genuine experience with their business.</p>
          <p style="word-break: break-all;margin: 10px 0;">Of course, it's totally up to you what you share.</p>
          <a href="${this.site.url}/activate?${fdata}" style=" box-shadow: 0 3px 20px -3px rgba(0, 0, 0, 0.25);border-radius: 5px;font-size: 14px;width: 230px;height: 35px;background: #0e62fb;color: #fff;line-height: 35px;text-align: center;display: block;margin: 0 auto; margin-top: 20px;text-decoration: none;">Provide more information</a>
          <p style="word-break: break-all;margin: 10px 0;">Please note: This is a direct link to your ${this.site.siteName}
            account.</p>
          <p style="word-break: break-all;margin: 10px 0;">Please don't share it width other.</p>
          <p style="margin-top:40px;word-break: break-all;margin: 10px 0;">Thank you for using our application!</p>
          <p>Best Regards, <br> ${this.site.siteName}</p>
        </div>
        </div>
      </div>`
      const data={
        toEmail:this.selReviews.email,
        subject:`${this.selReviews.companyName} would like some information regarding your review`,
        body:html,
        isHtml:true
      }
      this.$apiHttp.siteSendEmail(data).then((resp)=>{
        if(resp.res==200){
          this.$message({
            message: 'Your request for information has been sent',
            type: 'success'
          });
          this.dialogFind = false;
          this.$emit('success');
        }
      }).finally(()=> this.loading=false);
    },
    /**
     * 保存FindReviewer发送的信息
     */
    saveFindReviewer(){
      this.loading=true;
      this.$apiHttp.siteFindReviewers({params:{commentId:this.selReviews.id}}).then((resp)=>{
        if(resp.res==200){
          this.confirmBtn(resp.data);
        }else{
          this.loading=false;
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/dialog.less"; 
.find-dialog{
  .find_main{
    h5{
      font-size: 16px;
      font-weight: 500;
      color: #1B1B21;
      margin: 0px 0 10px 0;
      .icon{
        font-size:20px;
        vertical-align: bottom;
      }
    }
    p{
      line-height: 22px;
      margin-top: 0;
    }
    .email{
      border: 1px solid #c5c5d6;
      border-radius: 4px;
      padding: 16px;
      p{
        margin-bottom: 3px;
      }
      .one_row{
        display: -webkit-box;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
      }
    }
    .email_more{
      border: 1px solid #c5c5d6;
      border-radius: 4px;
      padding: 16px;
      .el-form{
        padding-bottom: 16px;
        /deep/.el-form-item{
          margin-bottom: 0;
          .el-form-item__content{
            line-height: 30px;
            font-size: 16px;
            color: #222222;
          }
          .el-form-item__label{
            line-height: 30px;
            font-size: 16px;
          }
        }
      }
      .email_con{
        padding-top: 16px;
        border-top: 1px solid #dcdce6;
        p{
          color: #1b1b21;
          margin-bottom: 12px;
        }
        .more_info{
          color: #1a66ff;
          display: inline-block;
          margin-bottom: 9px;
          text-decoration: underline;
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
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>