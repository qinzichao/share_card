//引用公共函数文件
var user_openid_fun = require("utils/user_openid.js");

//app.js
App({

  //共享数据
  globalData: {
    out_callback: null,//全局化的外部回调函数
    userInfo: null,//用户数据
    selectedTemplate: "",//用户已选中的模版
    openid: "", //用户微信的openid
    API_Base_URL: "https://mp.87apk.com",//API地址
  },

  
  //获取用户信息
  getUserInfo: function (cb) {
    var that = this

    if (this.globalData.userInfo) {

      typeof cb == "function" && cb(this.globalData.userInfo)

    }
    else {

      //调用登录接口
      wx.login({
        success: function (res) {
          var code = res.code;

          console.log("获得的code:", code);

          that.globalData.userInfo = {};

          that.globalData.out_callback = cb;

          //获取openid
          user_openid_fun.getOpenid(code);
        }
      })
    }

  },



})