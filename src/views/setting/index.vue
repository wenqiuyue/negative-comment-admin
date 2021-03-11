<template>
  <div class="setting" v-loading="loading">
    <div class="form_card">
      <div class="form_title">Basic info</div>
      <el-divider></el-divider>
      <el-form label-position="top" ref="form" label-width="80px" :model="form" class="form" :rules="rules">
        <el-form-item label="First Name" prop="firstName">
          <el-input v-model="form.firstName" placeholder="Enter first name"></el-input>
        </el-form-item>
        <el-form-item label="Surname" prop="surname">
          <el-input v-model="form.surname" placeholder="Enter surname"></el-input>
        </el-form-item>
        <el-form-item prop="country" label="Country">
          <el-select v-model="form.country" placeholder="Please select">
            <el-option
              v-for="item in countryOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="city" label="City">
          <el-input v-model="form.city" placeholder="Enter city">
          </el-input>
        </el-form-item>
        <el-form-item prop="phoneNumber" label="Phone number">
          <el-input v-model="form.phoneNumber" placeholder="Enter phone number">
            <template slot="prepend">{{countryOptions && form.country?countryOptions.find((val)=> val.id==form.country).areaCode:''}}</template>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-top:18px">
          <el-button @click="handleSave" :loading="bLoading">Save changes</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form_card">
      <div class="form_title">Security settings</div>
      <el-divider></el-divider>
      <div class="d_form">
        <p class="d_f_lable">Email</p>
        <div class="d_f_input">
          <el-input v-model="eamil" placeholder="Enter Email"></el-input>
          <el-button @click="handleChangeEmail" :loading="eLoading" :disabled="changeEmailDis">Change email</el-button>
        </div>
        <p class="d_f_tips">We won't change this email until we've received your confirmation.</p>
      </div>
      <div class="password">
        <div class="p_lable">Password</div>
        <el-button @click="handleChangePass">Change password</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      loading:false, //页面加载
      bLoading:false, //Basic info保存按钮加载
      eLoading:false, //修改email按钮加载
      countryOptions:null, //国家选项
      eamil:null, //修改的邮箱
      oldEmail:null, //原密码
      changeEmailDis:false,
      form:{
        firstName:null,
        surname:null,
        phoneNumber:null,
        country:null,
        city:null
      },
      rules:{
         firstName: [
          { required: true, message: 'First name is required.', trigger: 'blur' },
        ],
        surname: [
          { required: true, message: 'The Surname is required.', trigger: 'blur' },
        ],
        phoneNumber: [
          { required: true, message: 'Phone number is required.', trigger: 'blur' },
        ],
        city: [
          { required: true, message: 'City is required.', trigger: 'blur' },
        ],
      },
    }
  },
  watch:{
    eamil(){
      if(!this.eamil || this.eamil == this.oldEmail){
        this.changeEmailDis=true;
      }else{
        this.changeEmailDis=false;
      }
    }
  },
  mounted(){
    this.getBusinessInfo();
  },
  methods:{
    /**
     * 获取商家基本信息
     */
    getBusinessInfo(){
      this.loading=true;
      Promise.all([
        this.$apiHttp.siteProfileBasic(),
        this.$apiHttp.siteCountry()
      ]).then((resp)=>{
        if(resp[0].res==200){
          Object.keys(resp[0].data).forEach((k)=>{
            if(k=='workEmail'){
              this.eamil=resp[0].data.workEmail;
              this.oldEmail=resp[0].data.workEmail;
            }
            Object.keys(this.form).forEach((j)=>{
              if(k==j){
                this.form[j]=resp[0].data[k];
              }
            })
          })
        }
        if(resp[1].res==200){
          this.countryOptions=resp[1].data;
        }
      }).finally(()=> this.loading=false);
    },
    /**
     * 修改邮件
     */
    handleChangeEmail(){
      if(!this.eamil){
        this.$message({
          message: 'Please input email',
          type: 'warning'
        });
        return;
      }
      this.eLoading=true;
      this.$apiHttp.siteProfileWorkEmail({workEmail:this.eamil}).then((resp)=>{
        if(resp.res==200){
          this.$message({
            message: 'Email sent successfully',
            type: 'success'
          });
        }
      }).finally(()=> this.eLoading=false);
    },
    /**
     * 修改密码
     */
    handleChangePass(){
      this.$router.replace({
        path: "/password-reset",
        query:{
          email:this.oldEmail
        }

      });
    },
    /**
     * 保存基本信息
     */
    handleSave(){
      this.$refs.form.validate((vali)=>{
        if(vali){
          this.bLoading=true;
          this.$apiHttp.siteEditProfileBasic(this.form).then((resp)=>{
            if(resp.res==200){
              this.$message({
                message: 'Modified successfully',
                type: 'success'
              });
            }
          }).finally(()=> this.bLoading=false);
        }else{
          return;
        }
      })
    },
  }
}
</script>
<style lang="less" scoped>
.setting{
  padding:16px;
  background: #F9F9F9;
  .form_card{
    padding: 16px 24px;
    border-radius: 3px;
    border: 1px solid rgb(220, 220, 230);
    background: #ffffff;
    width: 840px;
    margin-bottom: 12px;
    .form_title{
      color: rgb(27, 27, 33);
    }
    .el-divider--horizontal{
      margin: 14px 0;
    }
    .form{
      /deep/.el-form-item{
        margin-bottom: 18px;
        .el-form-item__label{
          line-height: 20px;
          padding: 0 0 3px;
          color: rgb(27, 27, 33);
        }
        .el-select{
          width: 100%;
        }
      }
    }
    .d_form{
      margin-bottom: 30px;
      .d_f_lable{
        font-weight: bold;
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 8px;
      }
      .d_f_input{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .el-input{
          width: 65%;
        }
      }
      .d_f_tips{
        color: rgb(111, 111, 135);
        font-size: 13px;
      }
    }
    .password{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .p_lable{
        font-weight: bold;
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 8px;
      }
    }
  }
}
@media all and (max-width: 1024px) {
  .setting{
    .form_card{
      width: calc(100% - 48px);
    }
  }
}
</style>