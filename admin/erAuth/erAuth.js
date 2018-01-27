var util = require('../../utils/util.js')
var config = require('../../utils/config.js')
var api = require('../../utils/api.js')

Page({
  data: {
    baseLicenseUrl: config.baseLicenseUrl,
    baseStoreUrl: config.baseStoreUrl,
    employer: {
      region: ['广东省', '广州市', '天河区']
    },
    licenseClass: '',
    submitText: '提交'
  },
 
  onLoad: function (options) {
    var id = options.id;
    if(!id){
      util.showModal('id不能为空');
    }
    var that = this; 

    var data = new Array();
    data.uid = util.getUID();
    data.sign = util.getSign();
    data.erUid = id;
    api.getOneEmployer(data, function (res) {
      // get data
      var employer = res.data.employer;
      // 如果为空,返回
      if (Object.keys(employer).length === 0) {
        return;
      }

      // string转数组
      if (employer.region && employer.region.length > 0) {
        var regionStr = employer.region;
        employer.region = regionStr.split(",");
      } else {
        employer.region = new Array('广东省', '广州市', '天河区');
      }

      that.setData({
        employer: employer
      })
    })
  },
 
 itemPass: function(e){
    var ds = e.currentTarget.dataset;
    var data = new Array();
    data.erUid = ds.id;
    data.uid = util.getUID();
    data.sign = util.getSign();
    data.status = '3';
    api.verifyEmployer(data, function(res){
      if(res.data.code == 0){
        wx.navigateBack();
      }else{
        util.showModal(res.data.msg);
      }
    })
 },

 itemRefuse: function(e){
   var ds = e.currentTarget.dataset;
   var data = new Array();
   data.erUid = ds.id;
   data.uid = util.getUID();
   data.sign = util.getSign();
   data.status = '2';
   api.verifyEmployer(data, function (res) {
     if (res.data.code == 0) {
       wx.navigateBack();
     } else {
       util.showModal(res.data.msg);
     }
   })
 }
 

})