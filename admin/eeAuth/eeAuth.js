var util = require('../../utils/util.js')
var config = require('../../utils/config.js')
var api = require('../../utils/api.js')

Page({
  data: {
    baseCardPUrl: config.baseCardPUrl,
    baseCardNUrl: config.baseCardNUrl,
    baseAvatarUrl: config.baseAvatarUrl,
    baseCertificateUrl: config.baseCertificateUrl,
    baseWorkUrl: config.baseWorkUrl,
    sexArray: ['女', '男'],
    heightArray: [],
    weightArray: [],
    authClass: '',
    editClass: 'hide',
    submitText: '提交',
    employee: {
      region: ['广东省', '广州市', '天河区'],
      sex: 0,
      height: 160,
      weight: 50
    }
  },

  onLoad: function (options) {
    var that = this;
    this.initHeightArray();
    this.initWeightArray(); 
  
    // ---------------------getEmployee-----------------------
    var eeUid = options.id;
    api.getEmployeeById(eeUid, function (res) {
      var employee = res.data.employee;
      if (Object.keys(employee).length === 0) {
        util.showModal('没有数据');
        return;
      }

      // init region
      if (employee.region && employee.region.length > 0) {
        var regionStr = employee.region;
        employee.region = regionStr.split(",");
      } else {
        employee.region = new Array('广东省', '广州市', '天河区');
      }

      // init sex
      if (!employee.sex) {
        employee.sex = 0;
      }

      // init height
      if (!employee.height) {
        employee.height = 160;
      }

      // init weight
      if (!employee.weight) {
        employee.weight = 50;
      }

      that.setData({
        employee: employee
      })
    })
  },

  // 相当于onResume
  onShow: function () {
    var app = getApp();
    // after choose skill
    if (app.cache.skillStr && app.cache.skillStr.length > 0) {
      var employee = this.data.employee;
      employee.skill = app.cache.skillStr;
      this.setData({
        employee: employee
      })
    }
  },
 

  // ----------------init data-------------------
  initHeightArray: function () {
    var arr = new Array();
    for (var i = 0; i <= 200; i++) {
      arr.push(i);
    }
    var employee = this.data.employee;
    employee.height = 160;
    this.setData({
      heightArray: arr,
      employee: employee
    })
  },

  initWeightArray: function () {
    var arr = new Array();
    for (var i = 0; i <= 100; i++) {
      arr.push(i);
    }
    var employee = this.data.employee;
    employee.weight = 50;
    this.setData({
      weightArray: arr,
      employee: employee
    })
  },


  itemPass: function (e) {
    var ds = e.currentTarget.dataset;
    var data = new Array();
    data.eeUid = ds.id;
    data.uid = util.getUID();
    data.sign = util.getSign();
    data.status = '3';
    api.verifyEmployee(data, function (res) {
      if (res.data.code == 0) {
        wx.navigateBack();
      } else {
        util.showModal(res.data.msg);
      }
    })
  },

  itemRefuse: function (e) {
    var ds = e.currentTarget.dataset;
    var data = new Array();
    data.eeUid = ds.id;
    data.uid = util.getUID();
    data.sign = util.getSign();
    data.status = '2';
    api.verifyEmployee(data, function (res) {
      if (res.data.code == 0) {
        wx.navigateBack();
      } else {
        util.showModal(res.data.msg);
      }
    })
  }



})