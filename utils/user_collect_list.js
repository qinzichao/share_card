//引用公共函数文件
var common_fun = require("user_common.js");

//对外公开的方法
module.exports.getUserColletList = getUserColletList;


//获取名片夹列表
function getUserColletList(cb) {

   //获取应用实例
  var app = getApp();

  var remote_api_url = app.globalData.API_Base_URL + '/user_collect_list.php';

  var remote_data = [];
  remote_data["openid"] = app.globalData.openid;

  common_fun.postData(remote_api_url, remote_data,
    function (res) {
     cb(res);
    }
  );
  
}

