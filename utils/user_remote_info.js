//引用公共函数文件
var common_fun = require("user_common.js");

//对外公开的方法
module.exports.getRemoteUserInfo = getRemoteUserInfo;
module.exports.getRemoteUserInfo_Back = getRemoteUserInfo_Back;


//获取用户信息
function getRemoteUserInfo() {

  //获取应用实例
  var app = getApp();

  var remote_api_url = app.globalData.API_Base_URL + '/user_get.php';

  var remote_data = [];
  remote_data["openid"] = app.globalData.openid;

  common_fun.postData(remote_api_url, remote_data,
    function (res) {
      module.exports.getRemoteUserInfo_Back(res);
    }
  );

}


//回调
function getRemoteUserInfo_Back(res) {

  //获取应用实例
  var app = getApp();

  var data = res.data.data;
  if (data) {

    if (app.globalData.userInfo["nickname"] != "" && app.globalData.userInfo["nickname"] != data.nickname) {
      app.globalData.userInfo["nickname"] = data.nickname;
    }

    app.globalData.userInfo["mobile"] = data.mobile;
    app.globalData.userInfo["company"] = data.company;
    app.globalData.userInfo["job"] = data.job;
    app.globalData.userInfo["email"] = data.email;
    app.globalData.userInfo["more_info"] = data.more_info;
    app.globalData.userInfo["views"] = data.views;
    app.globalData.userInfo["loves"] = data.loves;
    app.globalData.userInfo["collects"] = data.collects;
    app.globalData.selectedTemplate = data.template;
  } else {
    app.globalData.userInfo["views"] = 0;
    app.globalData.userInfo["loves"] = 0;
    app.globalData.userInfo["collects"] = 0;

    //第一次保存我的信息
    var remote_data = app.globalData.userInfo;
    remote_data["openid"] = app.globalData.openid;

    var remote_api_url = app.globalData.API_Base_URL + '/user_save.php';

    common_fun.postData(remote_api_url, app.globalData.userInfo, null);

  }

  if (app.globalData.out_callback && typeof app.globalData.out_callback == "function") {
    app.globalData.out_callback(app.globalData.userInfo)
  }

}