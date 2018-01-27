var api = require('../../utils/admin.js')
var config = require('../../utils/config.js')
var util = require('../../utils/util.js')

Page({
 
  data: {
    employers: []
  },

  onShow: function (){
    this.loadData();
  },

  loadData: function(){
    var that = this;
    var data = new Array();
    data.uid = util.getUID();
    data.sign = util.getSign();
    api.getAllEmployer(data, function(res){
      if(res.data.code == 0){
        that.setData({
          employers: res.data.employers
        })
      }else{
        util.showToast('暂无数据');
      }
    })
  },

  itemClick: function(e){
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../erAuth/erAuth?id=' + ds.id
    })
  }
})