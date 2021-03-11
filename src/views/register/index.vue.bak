<template>  
  <div class="register" v-loading="loading">
    <div class="card">
      <div class="l_c_top">
        Registered account number
      </div>
      <el-form :model="registerForm" :rules="rules" ref="registerForm" class="register_form">
        <el-form-item prop="acc" class="padding_item">
          <el-input v-model="registerForm.acc" placeholder="Mailbox">
            <svg-icon slot="prefix" value="icon-yonghuming"></svg-icon>
          </el-input>
        </el-form-item>
        <el-form-item prop="pwd" class="padding_item" style="margin-bottom:5px">
          <el-input v-model="registerForm.pwd" placeholder="Password">
            <svg-icon slot="prefix" value="icon-mima"></svg-icon>
            </el-input>
        </el-form-item>
        <el-form-item class="padding_item last_item">
          <el-checkbox v-model="isRead">You have read and agreed </el-checkbox>
          <span class="read" @click="handleNotice">《Terms of service》</span>
        </el-form-item>
        <el-form-item class="btn_item">
          <el-button class="register_btn" type="primary" @click="register">Sign Up</el-button>
        </el-form-item>
        <div class="register_tips">Existing account number? <span @click="handleLogin">Direct login</span></div>
      </el-form>
    </div>
    <Notice ref="notice"></Notice>
  </div>
</template>
<script>
import type from '../../commons/type';
export default {
  components:{
    Notice:()=> import('./notice')
  },
  data(){
    return{
      loading:false, //加载
      registerForm:{
        acc:null,
        pwd:null
      },
      isRead:false, //是否阅读
      rules: {
        acc: [
          { required: true, message: '请输入有效的用户名', trigger: 'blur' },
        ],
        pwd: [
          { required: true, message: '请输入有效的密码', trigger: 'blur' },
        ],
      }
    }
  },
   created() {
     this.handleCheckToken();
  },
  methods:{
    /**
     * 阅读服务
     */
    handleNotice(){
      this.$refs.notice.openDialog();
    },
    /**
     * 登录
     */
    handleLogin(){
      this.$router.push({
        path:'/'
      })
    },
    /**
     * 注册
     */
    register(){
      this.$refs.registerForm.validate((valid)=>{
        if(valid){
          this.backstageRegister();
        }else{
          return;
        }
      })
    },
    /**
     * 后台登录
     */
    backstageRegister(){
      this.loading=true;
          this.$apiHttp.getProcessDetails(this.registerForm).then((resp)=>{
            if(resp.res==200){
              localStorage.setItem(type.USER, JSON.stringify(resp.data));
            }
            this.loading=false;
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
.register{
  width: 100%;
  height: calc(100% - 40px);
  // background-color: #D7E2FE;
  background: url("~@/assets/img/bg.jpg") no-repeat;
  background-size:100% 100%;
  padding-top: 40px;
  .card{
    background: #ffffff;
    width: 500px;
    margin: 0 auto;
    border-radius: 10px;
    padding: 32px 28px;
    margin-top: 56px;
    box-shadow: 0 6px 20px -5px rgba(80,166,255,.7);
    .l_c_top{
    color: #2B7DF2;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    }
  }
  .register_form{
    margin-top: 40px;
    /deep/.padding_item{
      padding: 0 20px;
      .el-input__inner{
        height: 55px;
        line-height: 55px;
      }
    }
    /deep/.last_item{
      margin-bottom: 5px;
      margin-top: 26px;
      .read{
        color: #428AFF;
        cursor: pointer;
      }
    }
    /deep/.btn_item{
      padding: 0 20px;
      height: 55px;
      .el-form-item__content{
        height: 100%;
      }
      .el-button{
        width: 100%;
        height: 100%;
        font-size: 20px;
        background-color: #6cafff;
        background-image: linear-gradient(90deg, #6cafff 12%, #0a60ff 93%);
        box-shadow: 0 6px 20px -5px rgba(80,166,255,.7);
      }
    }
    .register_tips{
      text-align: center;
      margin-top: 30px;
      font-size: 14px;
      color: #606266;
      span{
        cursor: pointer;
        color: #428AFF;
      }
    }
  }
}
</style>