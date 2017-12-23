var api = require('../../utils/api.js')
var config = require('../../utils/config.js')
var util = require('../../utils/util.js')


Page({
  data: {
    img220: config.img220
  },

  onLoad: function () {
    var that = this;

    this.init();
 

  },


  init: function () {

  },
  
  itemClick: function(){
    wx.navigateTo({
      url: '../demandEdit/demandEdit',
    })
  }



})