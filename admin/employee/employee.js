var api = require('../../utils/api.js')
var config = require('../../utils/config.js')
var util = require('../../utils/util.js')

Page({

  data: {
    employees: []
  },

  onShow: function () {
    this.loadData();
  },

  loadData: function () {
    var that = this;
    var data = new Array();
    data.uid = util.getUID();
    data.sign = util.getSign();
    api.getAllEmployee(data, function (res) {
      console.log(res.data);
      if (res.data.code == 0) {
        that.setData({
          employees: res.data.employees
        })
      } else {
        util.showToast('暂无数据');
      }
    })
  },

  itemClick: function (e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../eeAuth/eeAuth?id=' + ds.id
    })
  }
})