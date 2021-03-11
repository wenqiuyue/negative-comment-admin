<template>
  <div class="login">
    <el-row>
      <el-col :span="15" :xs="24">
        <div class="login_main">
          <h1 class="main_head">
            <a v-if="site" :href="site.url" target="_blank">{{site.siteName}}</a>
          </h1>
          <h1 class="main_title">Login</h1>
          <el-form :model="loginForm" :rules="rules" ref="loginForm" class="form" label-position="top" :hide-required-asterisk="true">
            <el-form-item prop="account" label="E-mail">
              <el-input v-model="loginForm.account" placeholder="E-mail">
              </el-input>
            </el-form-item>
            <el-form-item prop="password" label="Password">
              <el-input v-model="loginForm.password" placeholder="Password" show-password>
              </el-input>
            </el-form-item>
             <el-form-item class="check_item">
              <!-- <el-checkbox v-model="automaticChecked">Remember me</el-checkbox> -->
              <a :href="`${pageUrl}/forgot-password`" class="forget">Forgot Your Password?</a>
            </el-form-item>
            <el-button class="login_btn" type="primary" :loading="loading" @click="handleLogin">Login</el-button>
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
      loginForm:{
        account:null,
        password:null,
        SiteId:null
      },
      automaticChecked:true, //自动登录
      rules: {
        account: [
          { required: true, message: 'Please input email', trigger: 'blur' },
          { type: 'email', message: 'Please enter the correct email address', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: 'Please enter a valid password', trigger: 'blur' },
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
  created(){
    // this.handleCheckToken();
  },
  methods:{
    /**
     * 登录
     */
    handleLogin(){
      this.$refs.loginForm.validate((valid)=>{
        if(valid){
          this.loading=true;
          this.loginForm.SiteId=this.site.id;
          this.$apiHttp.login(this.loginForm).then((resp)=>{
            if(resp.res==200){
              if(resp.data.status){
                this.$store.dispatch("login", resp.data.token);
                localStorage.setItem(type.USER, JSON.stringify(resp.data));
                this.$router.push({
                  path: "/home"
                });
              }else{
                localStorage.setItem(type.USER, JSON.stringify(resp.data));
                this.$router.push({
                  path:'/Verification'
                })
              }
              // this.$store.dispatch("login", resp.data);
            }
          }).finally(()=> this.loading=false);
        }else{
          return;
        }
      })
    },
    /**
     * 后台验证Token
     */
    handleCheckToken() {
      if (localStorage.getItem(type.TOKEN) && localStorage.getItem(type.USER)) {
        this.$router.push({
          path: "/home"
        })
      }
    },
  }
}
</script>
<style lang="less" scoped>
.login,
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
.login{
  .login_main{
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
      .check_item{
        margin-top: 10px;
        .forget{
          float: right;
          text-decoration: none;
          color: #787D97;
        }
        .el-checkbox{
          color: #787D97;
        }
      }
      .login_btn{
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
    }
  }
}
@media all and (max-width: 1024px) {
  .login{
    .login_main{
      width: calc(100% - 50px);
      left: 0;
      padding-right: 25px;
      padding-left: 25px;
      .main_head{
        margin-top: 46px;
      }
      .main_title{
        margin-top: 40px;
      }
    }
  }
}
</style>