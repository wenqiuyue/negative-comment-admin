<template>
  <div class="verification" v-loading="pLoading">
    <div class="ver_main" v-if="verificationData">
      <h1 class="main_title">{{verificationData.webSite}} verification</h1>
      <el-radio v-model="verForm.verification" :label="1">Verification option 1</el-radio>
      <div class="options">
        <p class="option_dec">The skin is the largest organ in the body. It defends against</p>
        <ul>
          <li>
            <p><strong>Copy meta tag below</strong> and paste it into your site's home page.</p>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="verificationData.meta">
            </el-input>
          </li>
          <li>
            <p><strong>Click Finish button</strong></p>
            <p class="normal_p">To stay verified, don't remove the meta tag, even after verification succeeds.</p>
          </li>
        </ul>
      </div>
      <el-radio v-model="verForm.verification" :label="2">Verification option 2</el-radio>
      <div class="options">
        <ul>
          <li>
            <p><strong>Download this txt</strong> <el-link type="primary" v-down="verificationData.fileUrl"> verification file</el-link></p>
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
      <el-button class="register_btn" type="primary" :loading="loading" @click="handleVer">Verification</el-button>
    </div>
  </div>
</template>
<script>
import type from '../../commons/type';
export default {
  data(){
    return{
      loading:false,
      verForm:{
        verification:1
      },
      verificationData:null, //验证需要的信息
      pLoading:false
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
    const id=this.$route.query.id;
    if(id){
      this.getGenerateCode(id);
    }else{
      this.verificationData = JSON.parse(localStorage.getItem(type.USER));
      if(this.verificationData && this.verificationData.fileUrl){
        this.verificationData.fileUrl = this.verificationData.fileUrl.split('/file/')[1];
      }
    }
  },
  methods:{
    /**
     * 获取两种验证方式的加密串和文件
     */
    getGenerateCode(id){
      this.pLoading=true;
      this.$apiHttp.businessGenerateCode({params:{id:id}}).then((resp)=>{
        if(resp.res==200){
          this.verificationData=resp.data;
          if(this.verificationData && this.verificationData.fileUrl){
            this.verificationData.fileUrl = this.verificationData.fileUrl.split('/file/')[1];
          }
        }
      }).finally(()=> this.pLoading=false);
    },
    /**
     * 验证
     */
    handleVer(){
      this.loading = true;
      const data={
        Option:this.verForm.verification,
        Id:this.verificationData.id
      }
      this.$apiHttp.businessVerificationCode(data).then((resp)=>{
        if(resp.res==200){
          //如果验证成功，就到登录界面
          this.$router.push({
            path: "/"
          });
        }
      }).finally(()=> this.loading=false);
    }
  }
}
</script>
<style lang="less" scoped>
.verification{
  padding: 0 40px;  
  .ver_main{
    width: 700px;
    margin: 0 auto;
    padding-bottom: 22px;
    .main_title{
      color: #0B143E;
      font-size: 38px;
      margin-top: 40px;
      margin-bottom: 20px;
    }
    /deep/.el-radio{
      margin-top: 20px;
    }
    .options{
      font-size: 14px;
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
    .register_btn{
      margin-top: 50px;
      width: 100%;
      background-color: #6cafff;
      background-image: linear-gradient(90deg, #6cafff 12%, #0a60ff 93%);
      box-shadow: 0 6px 20px -5px rgba(80,166,255,.7);
      height: 48px;
      font-size: 20px;
    }  
  }
}
@media all and (max-width: 1024px) {
  .verification{
    padding: 0 18px;
    width: calc(100% - 36px);  
    .ver_main{
      width: 100%;
      padding-bottom: 22px;
      .main_title{
        word-break: break-all;
        font-size: 23px;
      }
      .options{
        width: calc(100% - 24px);
      }
      .register_btn{
        margin-top: 24px;
      }  
    }
  }
}
</style>