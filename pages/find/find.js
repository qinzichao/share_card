var find_func = require("../../utils/find.js");


//获取应用实例
var app = getApp()

Page({

  data: {
    selectedTemplate: "",
    userInfo: {}
  },


  reloadUserInfoBack: function (info) {

    this.setData({
      selectedTemplate: info.data.data.template,
      userInfo: info.data.data
    })

    wx.hideToast();

  },

  onShow: function () {

    var that = this
    // //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //查找下一个名片
      that.findNextCard();
    });

  },


  // 查找下一个
  findNextCard: function () {

    wx.showToast({
      title: '加载数据中',
      icon: 'loading',
      duration: 10000
    })

    find_func.getList(this.reloadUserInfoBack);
  },

  //喜欢
  loveCard: function (event) {
    var openid = event.target.dataset.openid;
    find_func.updateUserLoveAdd(openid, this.loveCardCallBack);
  },

  //喜欢后处理
  loveCardCallBack: function (res) {

    if (res.data.code == 1) {
      wx.showToast({
        title: '谢谢您的点赞！',
        icon: 'success',
        duration: 3000
      })
    } else {
      wx.showToast({
        title: '不需要重复点赞！',
        icon: 'success',
        duration: 3000
      })
    }
  },

formSubmit: function (e) {
    console.log('openid：', e.detail.value.openid)
    console.log('form发生了submit事件，携带数据为：', e.detail.formId);

    var formid = e.detail.formId;
    var openid = e.detail.value.openid;

    find_func.updateUserCollectAdd(openid, formid,this.collectCardCallBack);

  },



  //收藏后处理
  collectCardCallBack: function (res) {

    if (res.data.code == 1) {
      wx.showToast({
        title: '已放到名片夹！',
        icon: 'success',
        duration: 3000
      })
    } else {
      wx.showToast({
        title: '不需要重复收藏！',
        icon: 'success',
        duration: 3000
      })
    }

  },


  //通知完成
  sendNotifyCallBack: function (res) {
   
  },





})
