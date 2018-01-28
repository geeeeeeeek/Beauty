var api = require('../../utils/api.js')
var config = require('../../utils/config.js')
var util = require('../../utils/util.js')

Page({
 
  data: {
    loginVisible: '',
    funcVisible: ''
  }, 

  onLoad: function (options) {
    this.checkLogin();
  }, 

  //后台是否登录
  checkLogin: function(){
    var adminLogined = util.getAdminLogined();
    if (adminLogined && adminLogined == '1') {
      this.setData({
        loginVisible: 'hide',
        funcVisible: ''
      })
    }else{
      this.setData({
        loginVisible: '',
        funcVisible: 'hide'
      })
    }
  },


  // --------------登录----------------
  formSubmit: function (e) {
    var that = this;

    // wxml自动填充formData
    var formData = e.detail.value;
    if (!that.isValid(formData)) {
      return;
    } 
    formData.uid = util.getUID();
    formData.sign = util.getSign(); 
    api.loginAdmin(formData, function (res) {
      console.log(res.data)
      if (res.data.code == 0) {
        util.showToast('登录成功'); 
        util.setAdminLogined('1');
        that.checkLogin();
      } else {
        util.showModal(res.data.msg);
      }
    });

  }, 


  isValid: function (formData) {
    if (formData.username == '') {
      util.showModal("请输入用户名");
      return false;
    } else if (formData.password == '') {
      util.showModal("请输入密码");
      return false;
    }
    return true;
  },

  logout: function(){
    util.setAdminLogined('0');
    this.checkLogin();
  },

  item1Click: function () {
    wx.navigateTo({
      url: '../employer/employer',
    })
  },

  item2Click: function () {
    wx.navigateTo({
      url: '../employee/employee',
    })
  },

  item3Click: function () {
    wx.navigateTo({
      url: '../order/order',
    })
  },

})