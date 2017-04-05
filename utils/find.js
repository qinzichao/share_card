//引用公共函数文件
var common_fun = require("user_common.js");

//对外公开的方法
module.exports.getList = getList;
module.exports.updateUserCollectAdd = updateUserCollectAdd;
module.exports.updateUserLoveAdd = updateUserLoveAdd;
module.exports.sendNotify = sendNotify;


//获取列表
function getList(cb) {

  //获取应用实例
  var app = getApp();

  var remote_api_url = app.globalData.API_Base_URL + '/find.php';

  var remote_data = [];
  remote_data["openid"] = app.globalData.openid;

  common_fun.postData(remote_api_url, remote_data,
    function (res) {
      cb(res);
    }
  );

}

//收藏添加
function updateUserCollectAdd(other_openid, form_id, cb) {

  //获取应用实例
  var app = getApp();

  var remote_api_url = app.globalData.API_Base_URL + '/user_collect_add2.php';

  var remote_data = [];
  remote_data["openid"] = app.globalData.openid;
  remote_data["openid2"] = other_openid;
  remote_data["form_id"] = form_id;

  common_fun.postData(remote_api_url, remote_data, cb);

}

//喜欢
function updateUserLoveAdd(other_openid, cb) {

  //获取应用实例
  var app = getApp();

  var remote_api_url = app.globalData.API_Base_URL + '/user_love_add.php';

  var remote_data = [];
  remote_data["openid"] = app.globalData.openid;
  remote_data["openid2"] = other_openid;

  common_fun.postData(remote_api_url, remote_data, cb);

}

//给接收者发送通知
function sendNotify(form_id, cb) {

  //获取应用实例
  var app = getApp();

  var remote_api_url = app.globalData.API_Base_URL + '/test.php';

  var remote_data = [];
  remote_data["form_id"] = form_id;

  common_fun.postData(remote_api_url, remote_data, cb);
}

