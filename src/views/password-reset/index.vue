<template>
  <div class="password-reset">
      <div class="left_col">
        <div class="reset_main">
          <h1 class="main_head">
             <a v-if="site" :href="site.url" target="_blank">{{site.siteName}}</a>
          </h1>
          <h1 class="main_title">Reset Password</h1>
          <el-form :model="resetForm" :rules="rules" ref="resetForm" class="form" label-position="top" :hide-required-asterisk="true">
            <el-form-item prop="email" label="E-mail">
              <el-input v-model="resetForm.email" placeholder="example@example.com" disabled>
              </el-input>
            </el-form-item>
            <el-form-item prop="pass" label="Password">
              <el-input v-model="resetForm.pass" placeholder="Enter Password" show-password>
              </el-input>
            </el-form-item>
            <el-form-item prop="confirmPass" label="Confirm Password">
              <el-input v-model="resetForm.confirmPass" placeholder="Confirm Password" show-password>
              </el-input>
            </el-form-item>
            <el-button class="reset_btn" type="primary" :loading="loading" @click="handleSend">Reset password</el-button>
            <div class="register_tips">Already have an account? <a :href="pageUrl">Sign In</a></div>
            <div class="register_tips">Need an account? <a :href="`${pageUrl}/register`">Sign up</a></div>
          </el-form>
        </div>
      </div>
      <div class="right_col">
        <login-reg-right></login-reg-right>
      </div>
  </div>
</template>
<script>
import type from '../../commons/type';
export default {
  data(){
    var checkPass = (rule, value, callback) => {
      if(value != this.resetForm.pass){
        callback(new Error('Please enter the correct password'));
      }else{
        callback();
      }
    };
    return{
      loading:false, //加载
      resetForm:{
        email:null,
        pass:null,
        confirmPass:null
      },
      automaticChecked:false, //自动登录
      rules: {
        email: [
          { required: true, message: 'Please input email', trigger: 'blur' },
        ],
        pass: [
          { required: true, message: 'Please input password', trigger: 'blur' },
        ],
        confirmPass: [
          { required: true, message: 'Please input confirm password', trigger: 'blur' },
          { validator: checkPass, trigger: 'blur' }
        ],
      }
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
  mounted(){
    const token=this.$route.query.token;
    if(token){
      localStorage.setItem(type.TOKEN,token);
    }
    this.resetForm.email=this.$route.query.email;
  },
  methods:{
    /**
     * 修改密码
     */
    handleSend(){
      this.$refs.resetForm.validate((valid)=>{
        if(valid){
          this.loading=true;
          const data={
            email:this.resetForm.email,
            password:this.resetForm.pass
          }
          this.$apiHttp.siteResetPassword(data).then((resp)=>{
            if(resp.res==200){
              this.$store.dispatch("logout");
              this.$router.push({
                path:'/'
              })
            }
          }).finally(()=> this.loading=false);
        }else{
          return;
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.password-reset{
  display: table;
  flex-direction: row;
  .right_col{
    width: 40%;
    display:table-cell;
    background: #040620;
  }
  .left_col{
    width: 60%;
    display:table-cell;
    .reset_main{
      width: 411px;
      margin: 0 auto;
      padding-bottom: 22px;
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
        .reset_btn{
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
}
@media all and (max-width: 1024px) {
  .password-reset{
    display: flex;
    flex-direction: column;
    .right_col{
      width: 100%;
    }
    .left_col{
      padding: 0 25px;
      width: calc(100% - 50px);
      .reset_main{
        width: 100%;
        .main_head{
          margin-top: 38px;
        }
        .main_title{
          font-size: 38px;
          margin-top: 61px;
        }
        .form{
          .reset_btn{
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>