var api = require('../../utils/api.js')
var config = require('../../utils/config.js')
var util = require('../../utils/util.js')

Page({
  data: {
    baseStoreUrl: config.baseStoreUrl,
    demands:[]
  },

  onLoad: function () {
    var that = this;

    api.getAllDemand(function (res) { 
      console.log(res.data)
      that.setData({
        demands: res.data.demands
      }) 
    })

    // 登录 
    if (!util.getUID()) {
      util.checkUserInfoAuth(function () {
        api.login();
      })
    } 
  },

  //单条点击
  bindItemClick: function (e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../demandDetail/demandDetail'
    })
  },

  bindTakeOrder: function(e){
    var ds = e.currentTarget.dataset;
     util.showToast("接单成功")
  },

  bindTapPublish: function(){
    if (!util.getUID()) {
      util.checkUserInfoAuth(function () {
        api.login();
      })
    }else{
      wx.navigateTo({
        url: '../demandEdit/demandEdit',
      })
    }
  }
 
})