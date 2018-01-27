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
    api.getMyOrder(function (res) {
      console.log(res.data)
      if (res.data.code == 0) {
        that.setData({
          orders: res.data.orders
        })
      }
    });
  }, 

  showReplyDialog: function(e){
    var ds = e.currentTarget.dataset;
    var id = ds.id;
    this.showModal(id);
  },

  showModal: function (id) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认取消？',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          var data = new Array();
          data.id = id;
          data.uid = util.getUID();
          data.sign = util.getSign();
          api.cancelOrder(data, function (res) {
            if (res.data.code == 0) {
              that.loadData();
            } else {
              util.showModal('取消失败');
            }
          })
        }
      }
    })
  }, 

})