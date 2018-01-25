var api = require('../../utils/api.js')
var config = require('../../utils/config.js')
var util = require('../../utils/util.js')


Page({
  data: {
     orders: []
  },

  onLoad: function () {
    var that = this; 
    this.loadData(); 
  },

  loadData: function(){
    var that = this;
    api.getMyPublish(function (res) {
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

  showModal: function(id){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认取消发布？',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          var data = new Array();
          data.id = id;
          data.uid = util.getUID();
          data.sign = util.getSign();
          api.cancelPublish(data, function(res){
            if(res.data.code == 0){
              that.loadData();
            }else{
              util.showModal('取消失败');
            }
          })
        }
      }
    })
  },

  eeClick: function(e){
    var ds = e.currentTarget.dataset;
    var eeUid = ds.id;
    wx.navigateTo({
      url: '../eeDetail/eeDetail?id='+eeUid
    })    
  }
  
  // itemClick: function(){
  //   wx.navigateTo({
  //     url: '../demandEdit/demandEdit',
  //   })
  // }



})