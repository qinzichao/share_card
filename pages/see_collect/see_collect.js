
var see_collect_list_fun = require("../../utils/see_collect_list.js");

//获取应用实例
var app = getApp()

var allUserList = [];

var searchUserList2 = [];

Page({

  data: {
    searchUserList: {}
  },

  onShow: function () {

    wx.showToast({
      title: '加载数据中',
      icon: 'loading',
      duration: 10000
    })

    var that = this

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {

      see_collect_list_fun.getList(that.showData)

    });

  },

  //自定义显示
  showData: function (dataList) {

    allUserList = dataList.data.data;

    //更新数据
    this.setData({
      searchUserList: allUserList
    })

    wx.hideToast()
  },

  //查找名片
  searchData: function (e) {

    var value = e.detail.value;
    console.log(value);

    searchUserList2 = [];

    if (value == "") {
      searchUserList2 = allUserList;
    }
    else {
      for (var i = 0; i < allUserList.length; i++) {
        var item = allUserList[i];
        if (item.nickname.indexOf(value) > -1) {
          searchUserList2.push(item);
        }
        else if (item.company.indexOf(value) > -1) {
          searchUserList2.push(item);
        }
      }
    }

    //更新数据
    this.setData({
      searchUserList: searchUserList2
    })
  },

  //点击查看名片
  viewCard: function (event) {

    console.log(event);

    var openid = event.currentTarget.dataset.openid;

    console.log("点击的openid:", openid);

    wx.navigateTo({
      url: '/pages/other/other?openid=' + openid,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
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

   //打开我的名片
  openMyCard: function () {

     wx.switchTab({
          url: '/pages/my/my',
          success: function (res) {
            // success
          }
    });
    
  },

})
