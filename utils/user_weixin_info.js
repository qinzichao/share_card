//引用公共函数文件
var user_remote_info_fun = require("user_remote_info.js");

//对外公开的方法
module.exports.getWeiXinInfo = getWeiXinInfo;
module.exports.getWeiXinInfo_Back = getWeiXinInfo_Back;

//获取授权后数据
function getWeiXinInfo() {

  wx.getUserInfo({
    success: function (res) {

      console.log("授权的数据:", res.userInfo);

      module.exports.getWeiXinInfo_Back(res);
    }
  });

}

//数据回调
function getWeiXinInfo_Back(res) {

  //获取应用实例
  var app = getApp();

  app.globalData.userInfo["nickname"] = res.userInfo["nickName"];
  app.globalData.userInfo["sex"] = res.userInfo["gender"];
  app.globalData.userInfo["country"] = res.userInfo["country"];
  app.globalData.userInfo["city"] = res.userInfo["city"];
  app.globalData.userInfo["province"] = res.userInfo["province"];
  app.globalData.userInfo["language"] = res.userInfo["language"];
  app.globalData.userInfo["headimgurl"] = res.userInfo["avatarUrl"];

  user_remote_info_fun.getRemoteUserInfo();

}


