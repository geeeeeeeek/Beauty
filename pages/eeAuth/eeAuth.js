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
 
    // -----------------page---------------------
    var page = options.page; // page--> edit/auth  
     
    if (page == 'auth') {
      that.setData({
        page: page,
        submitText: '提交审核',
        editClass: 'hide'
      })
      wx.setNavigationBarTitle({
        title: '技师认证'
      })
    } else if (page == 'edit') {
      that.setData({
        page: page,
        submitText: '提交',
        authClass: 'hide'
      })
      wx.setNavigationBarTitle({
        title: '个人资料'
      })
    } else {
      util.showModal('Type不能为空');
    }

    console.log("-->" + util.getUID());
    // ---------------------getEmployee-----------------------
    api.getEmployeeById(function (res) { 
      var employee = res.data.employee; 
      if (Object.keys(employee).length === 0) {
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
      if(!employee.sex){
        employee.sex = 0;
      }

      // init height
      if(!employee.height){
        employee.height = 160;
      }

      // init weight
      if(!employee.weight){
        employee.weight = 50;
      }

      that.setData({
        employee: employee
      })
    })
  },

  // 相当于onResume
  onShow: function(){
    var app = getApp();
    // after choose skill
    if(app.cache.skillStr && app.cache.skillStr.length > 0){
      var employee = this.data.employee;
      employee.skill = app.cache.skillStr;
      this.setData({
        employee: employee
      })
    }
  },

  // --------------提交----------------
  formSubmit: function (e) {
    var that = this;

    // wxml自动填充formData
    var formData = e.detail.value;
    if (!that.isValid(formData)) {
      return;
    }
    // start commit
    var employee = that.data.employee;
    // 数组转string
    formData.regionStr = employee.region.join(",");
    // 设置form的主键 
    formData.uid = util.getUID();
    formData.sign = util.getSign();

    api.authEmployee(formData, function (res) {
      console.log(res.data)
      if (res.data.code == 0) {
        util.showToast('提交成功');
      } else {
        util.showModal('提交失败');
      }
    });

  }, 


  isValid: function (formData) {
    var employee = this.data.employee;
    if (formData.name == '') {
      util.showModal("请输入姓名");
      return false;
    } else if (formData.phone == '') {
      util.showModal("请输入手机号");
      return false;
    }  

    if (!employee.cardP) {
      util.showModal("请上传身份证正面");
      return false;
    } else if (!employee.cardN) {
      util.showModal("请上传身份证反面");
      return false;
    } else if (!employee.avatar) {
      util.showModal("请上传头像");
      return false;
    }
    return true;
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


  // ----------------blur------------------
  nameChange: function (e) {
    var employee = this.data.employee;
    employee.name = e.detail.value;
    this.setData({
      employee: employee
    })
  },

  nickNameChange: function (e) {
    var employee = this.data.employee;
    employee.nickName = e.detail.value;
    this.setData({
      employee: employee
    })
  },

  phoneChange: function (e) {
    var employee = this.data.employee;
    employee.phone = e.detail.value;
    this.setData({
      employee: employee
    })
  },

  ageChange: function (e) {
    var employee = this.data.employee;
    employee.age = e.detail.value;
    this.setData({
      employee: employee
    })
  },

  spareTimeChange: function (e) {
    var employee = this.data.employee;
    employee.spareTime = e.detail.value;
    this.setData({
      employee: employee
    })
  },

  introduceChange: function (e) {
    var employee = this.data.employee;
    employee.introduce = e.detail.value;
    this.setData({
      employee: employee
    })
  },

  cardChange: function (e) {
    var employee = this.data.employee;
    employee.card = e.detail.value;
    this.setData({
      employee: employee
    })
  },


  // ----------------picker-----------------
  bindSexPickerChange: function (e) {
    var employee = this.data.employee;
    employee.sex = e.detail.value;    
    this.setData({
      employee: employee
    })
  },

  bindHeightPickerChange: function (e) {
    var employee = this.data.employee;
    employee.height = e.detail.value;
    this.setData({
      employee: employee
    })
  },

  bindWeightPickerChange: function (e) {
    var employee = this.data.employee;
    employee.weight = e.detail.value;
    this.setData({
      employee: employee
    })
  },

  bindRegionPickerChange: function (e) {
    var employee = this.data.employee;
    employee.region = e.detail.value;
    this.setData({
      employee: employee
    })
  },


  // -------------------upload-----------------
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

  bindWorkOne: function (e) {
    var that = this;
    util.uploadFile(config.api_upload_workone, function (obj) {
      // update local
      var employee = that.data.employee;
      employee.workOneUrl = obj.workOneUrl;
      that.setData({
        employee: employee
      });
    })
  },

  bindWorkTwo: function (e) {
    var that = this;
    util.uploadFile(config.api_upload_worktwo, function (obj) {
      // update local
      var employee = that.data.employee;
      employee.workTwoUrl = obj.workTwoUrl;
      that.setData({
        employee: employee
      });
    })
  },

  bindWorkThree: function (e) {
    var that = this;
    util.uploadFile(config.api_upload_workthree, function (obj) {
      // update local
      var employee = that.data.employee;
      employee.workThreeUrl = obj.workThreeUrl;
      that.setData({
        employee: employee
      });
    })
  },

  // -------------------tap-----------------
  tapSkill: function(e){
    var employee = this.data.employee;
    wx.navigateTo({
      url: '../chooseSkill/chooseSkill?skillStr='+employee.skill,
    })
  }

})