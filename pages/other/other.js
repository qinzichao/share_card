//引用公共函数文件
var user_other_fun = require("../../utils/user_other.js");
var user_view_fun = require("../../utils/user_view.js");
var user_love_fun = require("../../utils/user_love.js");
var user_collect_fun = require("../../utils/user_collect.js");


//获取应用实例
var app = getApp()

Page({
  data: {
    userInfo: {},
    config: {
      showLove: 1,
      showCollect: 1,
      openid: null
    }
  },


  onLoad: function (options) {
    //console.log(options);

    //console.log('onLoad')
    var that = this

    this.setData({
      'config.openid': "oL60Z0XXgqIYrStaVFoy8OUECHWM",
    });

    // if (options.openid != "") {
    //   this.setData({
    //     'config.openid': options.openid,
    //   })
    // }


  },

  onShow: function () {

    var that = this;

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      console.log("我的数据", userInfo)

      //获取他人的数据
      if (that.data.config.openid != "") {

        user_other_fun.getRemoteOtherUserInfo(that.data.config.openid, that.dataLoadCallback)

      }
    })



  },


  dataLoadCallback: function (res) {

    console.log("其他用户数据:", res);

    var other_user = res.data.data;

    this.setData({
      userInfo: other_user,
      "config.showLove": other_user.can_love,
      "config.showCollect": other_user.can_collect
    })

    //设置标题
    wx.setNavigationBarTitle({
      title: other_user.nickname + " 的名片"
    })

  },

  //打开我的名片
  openMyCard: function () {
    wx.switchTab({
      url: '/pages/my/my',
      success: function (res) {
        // success
      },

    })
  },

  //打电话
  callPhone: function (event) {
    var phone = event.target.dataset.phone;
    if (phone != "") {
      wx.makePhoneCall({
        phoneNumber: phone,
        success: function (res) {
          // success
        }
      })
    }
  },

  //喜欢
  loveCard: function (event) {
    var openid = event.target.dataset.openid;
    user_love_fun.updateUserLoveAdd(openid, this.saveCallBack);
  },

  //取消喜欢
  cancelLoveCard: function (event) {
    var openid = event.target.dataset.openid;
    user_love_fun.updateUserLoveDrop(openid, this.saveCallBack);

  },

  //收藏名片
  collectCard: function (event) {
    var openid = event.target.dataset.openid;
    user_collect_fun.updateUserCollectAdd(openid, this.saveCallBack);

  },

  //取消收藏名片
  cancelCollectCard: function (event) {
    var openid = event.target.dataset.openid;
    user_collect_fun.updateUserCollectDrop(openid, this.saveCallBack);

  },

  //保存后处理
  saveCallBack: function (res) {

    //获取数据
    user_other_fun.getRemoteOtherUserInfo(this.data.config.openid, this.dataLoadCallback)


  }

})
