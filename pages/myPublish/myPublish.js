var api = require('../../utils/api.js')
var config = require('../../utils/config.js')
var util = require('../../utils/util.js')


Page({
  data: {
     orders: []
  },

  onLoad: function () {
    var that = this; 

    api.getMyPublish(function(res){
      if(res.data.code == 0){
        that.setData({
          orders: res.data.orders
        })
      }
    });

  },

 
  
  itemClick: function(){
    wx.navigateTo({
      url: '../demandEdit/demandEdit',
    })
  }



})