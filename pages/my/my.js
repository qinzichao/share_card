var user_remote_info_fun = require("../../utils/user_remote_info.js");


//获取应用实例
var app = getApp()

Page({
  data: {
    selectedTemplate: '',
    userInfo: {}
  },


  reloadUserInfoBack: function (userInfo) {
    this.setData({
      selectedTemplate: app.globalData.selectedTemplate,
      userInfo: app.globalData.userInfo
    })

  },

  onShow: function () {
    var that = this
    // //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {

      console.log("用户数据：", userInfo);
      
      app.globalData.out_callback = that.reloadUserInfoBack;

      user_remote_info_fun.getRemoteUserInfo();
    });

  },


  //编辑名片
  editCard: function () {

    // wx.switchTab({
    //   url: '/pages/edit/edit'
    // })

    wx.navigateTo({
      url: '/pages/edit/edit'
    })
  },

  shareCard: function () {
    this.onShareAppMessage();
  },

  onShareAppMessage: function () {

    var share_path = 'pages/other/other?openid=' + app.globalData.openid + "&r=" + Math.random(100000);

    console.log("分享地址", share_path);

    return {
      title: '您有电子名片吗？',
      desc: '您有电子名片吗？查看对方名片，系统给您神秘礼物哦！',
      path: share_path,
    }
  },

  //查看访问记录
  seeViewLog: function () {

    wx.navigateTo({
      url: '/pages/see_view/see_view'
    })
  },

  //查看被喜欢记录
  seeLoveLog: function () {

    wx.navigateTo({
      url: '/pages/see_love/see_love'
    })
  },

  //查看访问记录
  seeCollectLog: function () {

    wx.navigateTo({
      url: '/pages/see_collect/see_collect'
    })
  },


})
