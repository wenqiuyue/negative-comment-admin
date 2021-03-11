<template>
  <div class="register">
      <div class="r_left">
        <div class="register_main">
          <h1 class="main_title">Create a free account</h1>
          <el-form :model="registerForm" :rules="rules" ref="form-1" class="form" label-position="top" :hide-required-asterisk="true" v-if="step==1">
            <el-form-item prop="WebSite" label="Web site">
              <el-input v-model="registerForm.WebSite" placeholder="Enter web site" @blur="getSiteCompany(registerForm.WebSite)">
              </el-input>
            </el-form-item>
            <el-form-item prop="WorkEmail" label="Work email">
              <el-input v-model="registerForm.WorkEmail" placeholder="Enter work email">
              </el-input>
            </el-form-item>
            <div class="inline">
              <el-form-item prop="Pwd" label="Password">
                <el-input v-model="registerForm.Pwd" placeholder="Enter password" show-password>
                </el-input>
              </el-form-item>
              <el-form-item 
                prop="repeatPass" 
                label="Repeat password"
              >
                <el-input v-model="registerForm.repeatPass" placeholder="Repeat password" show-password>
                </el-input>
              </el-form-item>
            </div>
          </el-form>
          <el-form :model="registerForm" :rules="rules" ref="form-2" class="form" label-position="top" :hide-required-asterisk="true" v-if="step==2">
            <el-form-item prop="CompanyName" label="Company name">
              <el-input v-model="registerForm.CompanyName" placeholder="Enter company name">
              </el-input>
            </el-form-item>
            <div class="inline">
              <el-form-item prop="FirstName" label="First Name">
                <el-input v-model="registerForm.FirstName" placeholder="Enter first name">
                </el-input>
              </el-form-item>
              <el-form-item prop="Surname" label="Surname">
                <el-input v-model="registerForm.Surname" placeholder="Enter surname">
                </el-input>
              </el-form-item>
            </div>
            <div class="inline">
              <el-form-item prop="Country" label="Country">
                <el-select v-model="registerForm.Country">
                  <el-option
                    v-for="item in countryOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="City" label="City">
                <el-input v-model="registerForm.City" placeholder="Enter city">
                </el-input>
              </el-form-item>
            </div>
            <el-form-item prop="Phone" label="Phone number">
              <el-input v-model="registerForm.Phone" placeholder="Enter phone number">
                <template slot="prepend">{{countryOptions?countryOptions.find((val)=> val.id==registerForm.Country).areaCode:''}}</template>
              </el-input>
            </el-form-item>
          </el-form>
          <div class="verification" v-if="step==3">
                <el-radio v-model="verification" :label="1">Verification option 1</el-radio>
                  <div class="options">
                    <p class="option_dec">The skin is the largest organ in the body. It defends against</p>
                    <ul>
                      <li>
                        <p><strong>Copy meta tag below</strong> and paste it into your site's home page.</p>
                        <el-input
                          type="textarea"
                          :autosize="{ minRows: 2, maxRows: 4}"
                          placeholder="请输入内容"
                          v-model="meta">
                        </el-input>
                      </li>
                      <li>
                        <p><strong>Click Finish button</strong></p>
                        <p class="normal_p">To stay verified, don't remove the meta tag, even after verification succeeds.</p>
                      </li>
                    </ul>
                  </div>
                 <el-radio v-model="verification" :label="2">Verification option 2</el-radio>
                  <div class="options">
                    <ul>
                      <li>
                        <p><strong>Download this txt</strong> <el-link type="primary" v-down="codeFile"> verification file</el-link></p>
                      </li>
                      <li>
                        <p><strong>Upload the file to domain, root directory. (Example http://your-domain/verify_review.txt)</strong></p>
                      </li>
                      <li>
                        <p><strong>Click finish below.</strong></p>
                        <p class="normal_p">To stay verified, do not remove TXT verification file, from your root directory, even after verification succeeds.</p>
                      </li>
                    </ul>
                  </div>
          </div>
          <el-button class="register_btn" type="primary" :loading="loading" @click="handleNext" v-if="step==1 || step==3">{{step==3?'Finish':'Next'}}</el-button>
          <div class="two_btn" v-else>
            <el-button class="register_btn" type="primary" @click="handlePrevious">Previous</el-button>
            <el-button class="register_btn" type="primary" :loading="loading" @click="handleNext">Save</el-button>
          </div>
          <ul class="step">
            <li :class="step==1?'now_step':''"></li>
            <li :class="step==2?'now_step':''"></li>
            <li :class="step==3?'now_step':''"></li>
          </ul>
          <div class="register_tips">Already have an account? <a :href="pageUrl">Sign In</a></div>       
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
    var checkCompany = (rule, value, callback) => {
      if(this.step!=2){
        return;
      }
      const data={
        Url:this.registerForm.WebSite,
        Name:value
      }
      this.$apiHttp.businessVerificationCompany(data).then((resp)=>{
        if(resp.res==300){
          callback(new Error(resp.msg));
        }else{
          callback();
        }
      })
    };
    return{
      loading:false, //加载
      registerForm:{
        WebSite:null,
        WorkEmail:null,
        Pwd:null,
        CompanyName:null,
        FirstName:null,
        Surname:null,
        Phone:null,
        Country:1,
        City:null,
        repeatPass:null, //电话号码确认
      },
      verification:1, //验证方法
      automaticChecked:false, //自动登录
      step:1, //当前步骤
      countryOptions:null, //国家选项
      businessId:null, //商家id
      meta:null, // 验证方式一，meta标签
      codeFile:null, //验证方式二，下载的文件
      rules: {
        WebSite: [
          { required: true, message: 'The domain field is required.', trigger: 'blur' },
        ],
        WorkEmail: [
          { required: true, message: 'The email field is required.', trigger: 'blur' },
          { type: 'email', message: 'Please enter the correct email address', trigger: ['blur', 'change'] }
        ],
        Pwd: [
          { required: true, message: 'The password field is required.', trigger: 'blur' },
        ],
        repeatPass:[
          { required: true, message: 'The repeat password field is required.', trigger: 'blur' },
        ],
        CompanyName:[
          { required: true, message: 'The Company name is required.', trigger: 'blur' },
          // { validator: checkCompany, trigger: 'blur' }
        ],
        FirstName: [
          { required: true, message: 'First name is required.', trigger: 'blur' },
        ],
        Surname: [
          { required: true, message: 'The Surname is required.', trigger: 'blur' },
        ],
        Phone: [
          { required: true, message: 'Phone number is required.', trigger: 'blur' },
        ],
        City: [
          { required: true, message: 'City is required.', trigger: 'blur' },
        ],
      },
      siteId:null, //站点id
    }
  },
  computed:{
    url(){
      return process.env.VUE_APP_BASE_URL
    },
    pageUrl(){
      return process.env.VUE_APP_PAGE_URL
    },
    site(){
      return this.$store.state.siteInfo;
    }
  },
  directives: {
    /**
     * 文件下载
     */
    'down': {
      inserted(el, binding) {
        el.addEventListener('click', () => {
          let url = binding.value;
          const dic_url = `${process.env.VUE_APP_API_URL}/api/Business/DownLoadFile?file=${url}`;
          window.location.href=dic_url;
        })
      }
    }
  },
  mounted(){
    this.getCountry();
    this.siteId=this.site.id;
    //默认绑定网站地址及公司名字
    if(this.$route.query.url){
      this.registerForm.WebSite=this.$route.query.url;
    }
    if(this.$route.query.company){
      this.registerForm.CompanyName=this.$route.query.company;
    }
  },
  methods:{
    /**
    根据网址查询数据库中的公司信息
     */
     getSiteCompany(urlData){
       if(urlData){
        this.$apiHttp.apiGetSiteCompany({params:{url:urlData}}).then((resp)=>{
          if(resp.res==200 && resp.data){
            this.registerForm.CompanyName=resp.data.Name;
          }
        })
       }
     },
    /**
     * 商家验证失败获取验证数据
     */
    getVer(){
      const data={
        account:this.registerForm.WorkEmail,
        password:this.registerForm.Pwd,
        SiteId:this.siteId
      }
      this.$apiHttp.login(data).then((resp)=>{
        if(resp.res==200){
          if(resp.data.status){
            localStorage.setItem(type.USER, JSON.stringify(resp.data));
            this.$store.dispatch("login", resp.data.token);
            this.$router.push({
              path: "/home"
            });
          }else{
            localStorage.setItem(type.USER, JSON.stringify(resp.data));
            this.$router.push({
              path:'/Verification',
            })
          }
        }
      }).finally(()=> this.loading=false);
    },
    /**
     * 上一步
     */
    handlePrevious(){
      this.step--;
      this.$nextTick(()=>{
        this.$refs[`form-${this.step}`].validate();
      })
    },
    /**
     * 获取国家选项
     */
    getCountry(){
      this.$apiHttp.siteCountry().then((resp)=>{
        if(resp.res==200){
          this.countryOptions=resp.data;
        }
      })
    },
    /**
     * 下一步
     */
    handleNext(){
      //如果到达验证步骤
      if(this.step==3){
        this.loading=true;
        const data={
          Option:this.verification,
          Id:this.businessId
        }
        this.$apiHttp.businessVerificationCode(data).finally(()=> {
          this.getVer();
        });
        return;
      };
      this.$refs[`form-${this.step}`].validate((valid)=>{
        if(valid){
          if(this.step==2){
            this.saveBusiness();
          }else{
            this.step++;
          }
        }else{
          return;
        }
      })
    },
    /**
     * 保存商家信息
     */
    saveBusiness(){
      this.loading=true;
      this.registerForm.SiteId=this.siteId;
      this.$apiHttp.businessSaveBusiness(this.registerForm).then((resp)=>{
        if(resp.res==200){
          this.businessId=resp.data;
          this.getGenerateCode(resp.data)
        }else{
          this.loading=false;
        }
      })
    },
    /**
     * 获取两种验证方式的加密串和文件
     */
    getGenerateCode(id){
      this.$apiHttp.businessGenerateCode({params:{id:id}}).then((resp)=>{
        if(resp.res==200){
          this.meta=resp.data.meta;
          this.codeFile=resp.data.file;
          console.log(this.codeFile);
          this.step++;
        }
      }).finally(()=> this.loading=false);
    },
  }
}
</script>
<style lang="less" scoped>
.register{
  height: 100%;
  display: table;
  flex-direction: row;
  .r_left{
    width: 60%;
    display:table-cell;
  }
  .register_main{
    width: 475px;
    margin: 0 auto;
    padding-bottom: 22px;
    .main_title{
      color: #0B143E;
      font-size: 38px;
      margin-top: 81px;
    }
    .form{
      /deep/.el-form-item{
        margin-bottom: 0;
        margin-top: 28px;
      }
      /deep/.el-form-item__label{
        color: #05091D;
        line-height: 24px;
      }
      /deep/.el-input-group__prepend{
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1);
      }
      /deep/.el-input__inner{
        height: 52px;
        font-size: 15px;
        line-height: 52px;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1);
      }
      .inline{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .el-form-item{
          width: 48%;
        }
      }
    }
    .verification{
      font-size: 14px;
      /deep/.el-radio{
        margin-top: 14px;
      }
      .options{
      margin-left: 24px;
      width: 100%;
      .option{
        line-height: 16px;
      }
      .option_dec{
        color: #787D97;
        line-height: 26px;
        margin: 0;
        font-family: "Roboto-Regular", Arial, "Helvetica Neue", Helvetica, sans-serif;
      }
      ul{
        margin-top: 20px;
        padding-left: 20px;
        list-style-type: decimal;
        li{
          margin-bottom: 15px;
          .el-textarea{
            margin-top: 10px;
          }
          p{
            color: #191B3A;
            font-family: "Roboto-Regular", Arial, "Helvetica Neue", Helvetica, sans-serif;
            margin: 0;
            line-height: 20px;
          }
          .normal_p{
            margin: 0;
            word-break: break-all;
          }
          &::marker{
            color: #191B3A;
          }
        }
      }
    }
    }
    .register_btn{
        margin-top: 50px;
        width: 100%;
        background-color: #6cafff;
        background-image: linear-gradient(90deg, #6cafff 12%, #0a60ff 93%);
        box-shadow: 0 6px 20px -5px rgba(80,166,255,.7);
        height: 48px;
        font-size: 20px;
      }
      .two_btn{
        .register_btn{
          width: 48%;
        }
      }
      .step{
        display: flex;
        flex-direction: row;
        justify-content: center;
        list-style-type:none;
        padding: 0;
        margin-top: 38px;
        li{
          margin-right: 5px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #D8D8D8;
        }
        .now_step{
          background-color:#0a60ff;
        }
      }
      .register_tips{
        margin-top: 30px;
        text-align: center;
        color: #AEAECA;
        font-size: 14px;
        a{
          text-decoration: none;
          color: #428AFF;
        }
      }
  }
  .right_col{
    width: 40%;
    display:table-cell;
    background: #040620;
  }
}
@media all and (max-width: 1024px) {
  .register{
    height: 100%;
    display: flex;
    flex-direction: column;
    .r_left{
      width: calc(100% - 50px);
      padding: 0 25px;
    }
    .register_main{
      width: 100%;
      padding-bottom: 22px;
      .main_title{
        font-size: 30px;
        margin-top: 38px;
      }
      .verification{
        font-size: 14px;
        /deep/.el-radio{
          margin-top: 14px;
        }
        .options{
          margin-left: 24px;
          width: calc(100% - 24px);
        }
      }
      .register_btn{
          margin-top: 36px;
        }
    }
    .right_col{
      width: 100%;
    }
  }
}
</style>