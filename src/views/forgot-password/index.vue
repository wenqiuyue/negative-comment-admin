<template>
  <div class="forgot-password">
    <el-row>
      <el-col :span="15" :xs="24">
        <div class="forgot_main">
          <h1 class="main_head">
            <a v-if="site" :href="site.url" target="_blank">{{site.siteName}}</a>
          </h1>
          <h1 class="main_title">Reset Password</h1>
          <el-form :model="forgotForm" :rules="rules" ref="forgotForm" class="form" label-position="top" :hide-required-asterisk="true">
            <el-form-item prop="email" label="E-mail">
              <el-input v-model="forgotForm.email" placeholder="example@example.com">
              </el-input>
            </el-form-item>
            <el-button class="forgot_btn" type="primary" :loading="loading" @click="handleSend">Send Password Reset Link</el-button>
            <div class="register_tips">Already have an account? <a :href="pageUrl">Sign In</a></div>
            <div class="register_tips">Need an account? <a :href="`${pageUrl}/register`">Sign up</a></div>
          </el-form>
        </div>
      </el-col>
      <el-col :span="9" :xs="24" class="right_col">
        <login-reg-right></login-reg-right>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import type from '../../commons/type';
export default {
  data(){
    return{
      loading:false, //加载
      forgotForm:{
        email:null
      },
      automaticChecked:false, //自动登录
      rules: {
        email: [
          { required: true, message: 'Please input email', trigger: 'blur' },
          { type: 'email', message: 'Please enter the correct email address', trigger: ['blur', 'change'] }
        ],
      },
      token:null
    }
  },
  computed:{
    pageUrl(){
      return process.env.VUE_APP_PAGE_URL
    },
    site(){
      return this.$store.state.siteInfo;
    }
  },
  methods:{
    /**
     * 确认
     */
    handleSend(){
      this.loading=true;
      this.$apiHttp.siteForgotPassword({params:this.forgotForm}).then((resp)=>{
        if(resp.res==200){
          this.token=resp.data;
          this.sendEmail();
          localStorage.setItem(type.TOKEN,resp.data);
        }else{
          this.loading=false;
        }
      })
    },
    /**
     * 发送邮件
     */
    sendEmail(){
      const html=`<div style="min-height: 100vh;background: #000;display: flex;align-items: center;">
			<div style="margin:10px auto">
			<div style="margin:0 10px;max-width: 600px;background: #fff;padding: 50px;border-radius: 8px;">
			<p style="font-size: 20px; font-weight: 700; margin-bottom: 25px; text-align: center;">Hello!</p>
				<p style="word-break: break-all;margin: 10px 0;">You are receiving this email because we received a password reset
						request for your account.</p>
					<a style=" box-shadow: 0 3px 20px -3px rgba(0, 0, 0, 0.25);border-radius: 5px;font-size: 14px;width: 230px;height: 35px;background: #0e62fb;color: #fff;line-height: 35px;text-align: center;display: block;margin: 0 auto; margin-top: 20px;text-decoration: none;"
					 href="${this.pageUrl}/password-reset?email=${this.forgotForm.email}&token=${this.token}">Reset Button</a>
					<p style="word-break: break-all;margin: 10px 0;">This password reset link will expire in 60 minutes.</p>
					<p style="word-break: break-all;margin: 10px 0;">If you did not request a password reset, no further action is
						required.</p>
					<p style="margin-top:40px;word-break: break-all;margin: 10px 0;">Thank you for using our application!</p>
					<p style="word-break: break-all;margin: 10px 0;">Best Regards, <br> ${this.site.siteName}</p>			
				</div>
			</div>
		</div>`
      const data={
        toEmail:this.forgotForm.email,
        subject:`Reset Password Notification`,
        body:html,
        isHtml:true
      }
      this.$apiHttp.siteSendEmail(data).then((resp)=>{
        if(resp.res==200){
          this.$message({
            message: 'Email sent successfully',
            type: 'success'
          });
          this.$router.push({
            path:'/'
          })
        }
      }).finally(()=>{
        this.loading=false;
      })
    }
  }
}
</script>
<style lang="less" scoped>
.forgot-password,
.el-row,
.el-col
{
  height: 100%;
}
.el-col{
  position: relative;
}
.right_col{
  background: #040620;
}
.forgot-password{
  .forgot_main{
    height: 100%;
    width: 411px;
    margin: 0 auto;
    position: absolute;
    left: 25%;
    .main_head{
      margin-top: 95px;
      color: #0A1148;
      font-size: 19.8px;
      a{
        text-decoration: none;
        color: inherit;
      }
    }
    .main_title{
      color: #0B143E;
      font-size: 52px;
      margin-top: 81px;
    }
    .form{
      /deep/.el-form-item{
        margin-bottom: 0;
        margin-top: 26px;
      }
      /deep/.el-form-item__label{
        color: #05091D;
        line-height: 24px;
      }
      /deep/.el-input__inner{
        height: 52px;
        font-size: 15px;
        line-height: 52px;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1);
      }
      .forgot_btn{
        margin-top: 50px;
        width: 100%;
        background-color: #6cafff;
        background-image: linear-gradient(90deg, #6cafff 12%, #0a60ff 93%);
        box-shadow: 0 6px 20px -5px rgba(80,166,255,.7);
        height: 48px;
        font-size: 20px;
      }
      .register_tips{
        margin-top: 20px;
        text-align: center;
        color: #AEAECA;
        font-size: 14px;
        a{
          text-decoration: none;
          color: #428AFF;
        }
      }
      .register_tips:last-child{
        margin-top: 10px;
      }
    }
  }
}
@media all and (max-width: 1024px) {
  .forgot-password{
    .forgot_main{
      width: calc(100% - 50px);
      left: 0;
      padding-right: 25px;
      padding-left: 25px;
      .main_head{
        margin-top: 46px;
      }
      .main_title{
        margin-top: 40px;
        font-size: 38px;
      }
      .form{
        .forgot_btn{
          font-size: 18px;
        }
      }
    }
  }
}
</style>