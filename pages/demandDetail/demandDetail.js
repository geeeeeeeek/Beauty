var api = require('../../utils/api.js')
var config = require('../../utils/config.js')
var util = require('../../utils/util.js')

Page({
  data:{
    baseStoreUrl: config.baseStoreUrl,
    demand:null
  },

  onLoad: function(options){
    var id = options.id;
    if (id && id.length > 0) {
      this.setData({
        id: id
      })
    }else {
      util.showToast('id不能为空');
    }

    // load data
    this.loadData();
  },

  loadData: function(){
    var that = this;
    var id = that.data.id;
    if (id && id.length > 0) {
      api.getDemandById(id, function (res) {
        if (res.data.code == 0) {
          that.setData({
            demand: res.data.demand
          })
        }
      })
    }  
  },

  bindTakeOrderClick: function(e){
    var that = this;
    var ds = e.currentTarget.dataset;
    var id = ds.id;
    var uid = util.getUID();
    var data = new Array();
    data.id = id;
    data.uid = util.getUID();
    data.sign = util.getSign();
    api.takeOrder(data, function(res){
      if(res.data.code == 0){
        util.showToast('接单成功');
      }else{
        util.showToast('接单失败');        
      }
    })
  }
})