//引用公共函数文件
var user_template_fun = require("../../utils/user_template.js");


//获取应用实例
var app = getApp()

//模版列表数据
var alltemplates = [
  {
    "isSelected": 0,
    "template": "back-white"
  },
  {
    "isSelected": 0,
    "template": "back-gray"
  },
  {
    "isSelected": 0,
    "template": "back-blue"
  },
  {
    "isSelected": 0,
    "template": "back-red"
  },
  {
    "isSelected": 0,
    "template": "back-pink"
  },
  {
    "isSelected": 0,
    "template": "back-green"
  },
];

Page({

  data: {
    templates: []
  },

  onLoad: function () {
    this.setData({
      "templates": alltemplates
    })
  },

  //选择模版
  selecteTemplate: function (event) {

    var template = event.target.dataset.template;
    var index = event.target.dataset.index;

    for (var i = 0; i < alltemplates.length; i++) {
      alltemplates[i].isSelected = 0;
    }
    alltemplates[index].isSelected = 1;

    //console.log(alltemplates);

    this.setData({
      "templates": alltemplates
    })

    app.globalData.selectedTemplate = template;

    user_template_fun.updateTemplate(template,this.saveCallBack);

  },

  saveCallBack: function (res) {
    wx.switchTab({
      url: '/pages/my/my',
    })
  },

  //清除模版
  clearTemplate: function (event) {

    app.globalData.selectedTemplate = "";

    for (var i = 0; i < alltemplates.length; i++) {
      alltemplates[i].isSelected = 0;
    }

    this.setData({
      "templates": alltemplates
    })

      var data = [];
    data["template"] = "";

    user_template_fun.updateTemplate("", this.saveCallBack);

    
  }

})
