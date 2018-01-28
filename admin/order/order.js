var api = require('../../utils/api.js')
var config = require('../../utils/config.js')
var util = require('../../utils/util.js')


Page({
  data: {
    baseStoreUrl: config.baseStoreUrl,
    orders: []
  },

  onLoad: function () {
    var that = this;
    this.loadData();
  },

  loadData: function () {
    var that = this;
    var data = new Array();
    data.uid = util.getUID();
    data.sign = util.getSign(); 
    api.getAllOrder(data, function (res) {
      console.log(res.data)
      if (res.data.code == 0) {
        that.setData({
          orders: res.data.orders
        })
      }
    });
  },
 

})