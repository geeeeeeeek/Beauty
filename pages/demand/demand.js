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

    // 登录 
    if (!util.getUID()) {
      util.checkUserInfoAuth(function () {
        api.login();
      })
    } 
  },

  onShow: function(){
    this.loadData(); 
  },

  loadData: function(){
    var that = this;
    api.getAllDemand(function (res) {
      console.log(res.data)
      that.setData({
        demands: res.data.demands
      })
    })
  },

  //单条点击
  bindItemClick: function (e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../demandDetail/demandDetail?id='+ds.id
    })
  }, 

  bindTakeOrderClick: function (e) {
    var ds = e.currentTarget.dataset;
    this.showConfirmDialog(ds.id);
  },

  showConfirmDialog: function(id){
    var that = this;
    wx.showModal({
      title: '提示',
      showCancel: 'true',
      content: '确认接单？',
      success: function(res){
        if (res.confirm) {
          that.takeOrder(id);
        }
      }
    })
  },

  takeOrder: function(id){
    var that = this;
    var uid = util.getUID();
    var data = new Array();
    data.id = id;
    data.uid = util.getUID();
    data.sign = util.getSign();
    api.takeOrder(data, function (res) {
      if (res.data.code == 0) {
        util.showToast('接单成功');
        that.loadData();
      } else {
        util.showToast('接单失败');
      }
    })
  },

  bindTapPublish: function(){
    if (!util.getUID()) {
      util.checkUserInfoAuth(function () {
        api.login();
      })
    }else{
      var erStatus = util.getErStatus();
      if(erStatus == '3'){
        wx.navigateTo({
          url: '../demandEdit/demandEdit',
        })
      }else{
        util.showModal('请先认证为店家');
      }
    }
  }
 
})