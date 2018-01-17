var util = require('../../utils/util.js')
var config = require('../../utils/config.js')

Page({
  data: {
    baseCardPUrl: config.baseCardPUrl,
    baseCardNUrl: config.baseCardNUrl,
    baseAvatarUrl: config.baseAvatarUrl,
    baseCertificateUrl: config.baseCertificateUrl,
    employee: {

    },
    sexArray: ['女', '男'],
    sexIndex: 0,
    heightArray: [],
    heightIndex: 0,
    weightArray: [],
    weightIndex: 0,
    region: ['广东省', '广州市', '天河区'],
    cardPicP: null,
    cardPicN: null
  },

  onLoad: function () {
    this.initHeightArray();
    this.initWeightArray();
  },

  // 初始化身高数组
  initHeightArray: function () {
    var arr = new Array();
    for (var i = 140; i <= 200; i++) {
      arr.push(i);
    }
    this.setData({
      heightArray: arr,
      heightIndex: 20
    })
  },

  // 初始化体重数组
  initWeightArray: function () {
    var arr = new Array();
    for (var i = 30; i <= 100; i++) {
      arr.push(i);
    }
    this.setData({
      weightArray: arr,
      weightIndex: 20
    })
  },


  bindSexPickerChange: function (e) {
    this.setData({
      sexIndex: e.detail.value
    })
  },

  bindHeightPickerChange: function (e) {
    this.setData({
      heightIndex: e.detail.value
    })
  },

  bindWeightPickerChange: function (e) {
    this.setData({
      weightIndex: e.detail.value
    })
  },

  bindRegionPickerChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },


  // 上传正面
  bindCardP: function (e) {
    var that = this;
    util.uploadFile(config.api_upload_cardP, function(obj){  
      // update local
      var employee = that.data.employee;
      employee.cardP = obj.cardP;
      that.setData({
        employee: employee
      });
    })
  },

  // 上传反面
  bindCardN: function (e) {
    var that = this;
    util.uploadFile(config.api_upload_cardN, function (obj) {
      // update local
      var employee = that.data.employee;
      employee.cardN = obj.cardN;
      that.setData({
        employee: employee
      });
    })
  },

  // 上传头像
  bindAvatar: function (e) {
    var that = this;
    util.uploadFile(config.api_upload_avatar, function (obj) {
      // update local
      var employee = that.data.employee;
      employee.avatar = obj.avatar;
      that.setData({
        employee: employee
      });
    })
  },

  // 上传证书
  bindCertificate: function (e) {
    var that = this;
    util.uploadFile(config.api_upload_certificate, function (obj) {
      // update local
      var employee = that.data.employee;
      employee.certificate = obj.certificate;
      that.setData({
        employee: employee
      });
    })
  },

})