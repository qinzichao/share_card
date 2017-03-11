//引用公共函数文件
var common_fun = require("user_common.js");

//对外公开的方法
module.exports.updateTemplate = updateTemplate;

//更新模版
function updateTemplate(template, cb) {
  
  //获取应用实例
  var app = getApp();

  var remote_api_url = app.globalData.API_Base_URL + '/user_save.php';

  var remote_data = [];
  remote_data["openid"] = app.globalData.openid;
  remote_data["template"] = template;

  common_fun.postData(remote_api_url, remote_data, cb);

}


