<template>
  <div class="login-reg-right">
    <div class="about">
      <a :href="site.url" target="_blank">{{site.siteName}}</a>
    </div>
    <rate
      class="c_rate"
      :value="5"
      :isDisabled="true"
    >
    </rate>
    <p class="text_about">AI powered platform aimed to cater to all businesses that have an online presence.</p>
    <p class="text_about_company">Trusted by the world's smartest companies</p>
    <p class="text_about_footer">By signing up you agree to receive email communication about our products and services.</p>
  </div>
</template>
<script>
export default {
  name:'login-reg-right',
  computed:{
    site(){
      return this.$store.state.siteInfo;
    }
  }
}
</script>
<style lang="less" scoped>
.login-reg-right{
  // height: 100%;
  background: #040620;
  padding: 50px 95px 33px 94px;
  .about{
    a{
      color: #ffffff;
      font-size: 22px;
      font-weight: bold;
      text-decoration: none;
    }
  }
  .c_rate{
    margin-top: 120px;
    /deep/.icon-pingfendengjiRating4{
      font-size: 34px;
      margin-right: 3px;
    }
  }
  .text_about{
    margin-top: 54px;
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 600;
    word-break: break-all;
  }
  .text_about_company{
    margin-top: 116px;
    color: #FFFFFF;
    font-size: 15px;
    word-break: break-all;
    font-weight: 600;
  }
  .text_about_footer{
    margin-top: 120px;
    opacity: 0.5;
    color: #FFFFFF;
    font-size: 13px;
    line-height: 18px;
    font-weight: 600;
  }
}
@media all and (max-width: 1024px) {
  .login-reg-right{
    padding: 50px 45px 33px 45px;
    .c_rate{
      margin-top: 100px;
    }
  }
}
</style>