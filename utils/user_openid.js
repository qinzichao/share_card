//引用公共函数文件
var common_fun = require("user_common.js");
var user_weixin_info_fun = require("user_weixin_info.js");

//对外公开的方法
module.exports.getOpenid = getOpenid;

//获取微信openid
function getOpenid(code) {

  console.log("getOpenid");

  //获取应用实例
  var app = getApp();

  var remote_api_url = app.globalData.API_Base_URL + '/user_auth.php';

  var remote_data = [];
  remote_data["code"] = code;

  common_fun.postData(remote_api_url, remote_data,
    function (res) {

      app.globalData.openid=res.data.data.openid;
      console.log("openid",app.globalData.openid);

      user_weixin_info_fun.getWeiXinInfo(res);
    }
  );

}

