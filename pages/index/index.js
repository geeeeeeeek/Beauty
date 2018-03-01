
var api=require('../../utils/api.js');
var config=require('../../utils/config.js');
var util=require('../../utils/util.js');
//获取应用实例
var app = getApp()
Page({
  data: {  
  }, 

  onShareAppMessage: function () {
    return {
      title: '丽人服务',
      path: '/pages/index/index'
    }
  },

  onLoad: function (options) {
    var that = this
 
  }, 
 
  clickTab1: function(){
    wx.switchTab({
      url: '../employee/employee'
    })
  },

  clickTab2: function(){
    wx.switchTab({
      url: '../demand/demand'
    })
  }

  
})

