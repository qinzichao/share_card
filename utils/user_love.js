//引用公共函数文件
var common_fun = require("user_common.js");

//对外公开的方法
module.exports.updateUserLoveAdd = updateUserLoveAdd;
module.exports.updateUserLoveDrop = updateUserLoveDrop;

//喜欢到远程服务器
function updateUserLoveAdd(other_openid, cb) {

 //获取应用实例
  var app = getApp();

  var remote_api_url = app.globalData.API_Base_URL + '/user_love_add.php';

  var remote_data = [];
  remote_data["openid"] = app.globalData.openid;
  remote_data["openid2"] = other_openid;

  common_fun.postData(remote_api_url, remote_data, cb);

}

//取消喜欢到远程服务器
function updateUserLoveDrop(other_openid, cb) {

 //获取应用实例
  var app = getApp();

  var remote_api_url = app.globalData.API_Base_URL + '/user_love_drop.php';

  var remote_data = [];
  remote_data["openid"] = app.globalData.openid;
  remote_data["openid2"] = other_openid;

 common_fun.postData(remote_api_url, remote_data, cb);

}



