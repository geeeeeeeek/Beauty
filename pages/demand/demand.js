var api = require('../../utils/api.js')
var config = require('../../utils/config.js')
var util = require('../../utils/util.js')

Page({
  data: {
 
  },

  onLoad: function () {
    var that = this;
 
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
  }
 
})