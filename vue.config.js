module.exports = {
  lintOnSave: false,
  devServer:{
    host : "0.0.0.0",
    open: true,
    port: 8080,
    https: false,
    proxy: {//配置跨域
      '/site': {
        target: 'http://47.90.207.195:60601',//这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true,//允许跨域
        // pathRewrite: {
        // '^/api': '/'//请求的时候使用这个api就可以
        // }
      },
      '/api': {
        target: 'http://120.25.67.116:5251',//这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true,//允许跨域
        // pathRewrite: {
        // '^/api': ''//请求的时候使用这个api就可以
        // }
      },
    }

  }
};
