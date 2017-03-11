//引用公共函数文件
var common_fun = require("../../utils/user_common.js");

//获取应用实例
var app = getApp()

Page({
  data: {
    userInfo: {}
  },
  
  onLoad: function () {

    var that = this

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {

      //更新数据
      that.setData({
        userInfo: userInfo
      })

      //设置标题
      wx.setNavigationBarTitle({
        title: userInfo.nickname + " 的名片"
      })
    })

  },
  formSubmit: function (e) {

    var remote_data = e.detail.value;

    remote_data["openid"] = app.globalData.openid;
    remote_data["sex"] = app.globalData.userInfo["sex"];
    remote_data["country"] = app.globalData.userInfo["country"];
    remote_data["city"] = app.globalData.userInfo["city"];
    remote_data["province"] = app.globalData.userInfo["province"];
    remote_data["language"] = app.globalData.userInfo["language"];

    remote_data["headimgurl"] = this.data.userInfo["headimgurl"];
 
 
var remote_api_url=app.globalData.API_Base_URL + '/user_save.php';
    common_fun.postData(remote_api_url, remote_data, this.saveCallBack);

    //补充回一些参数
    remote_data["views"] = app.globalData.userInfo["views"];
    remote_data["loves"] = app.globalData.userInfo["loves"];
    remote_data["collects"] = app.globalData.userInfo["collects"];
    app.globalData.userInfo = remote_data;

  },
  saveCallBack: function (res) {
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 5000,
      success: function () {

        wx.switchTab({
          url: '/pages/my/my',
          success: function (res) {
            // success
          }
        });

      }
    })
  }
})
