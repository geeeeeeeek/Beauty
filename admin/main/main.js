var api = require('../../utils/admin.js')
var config = require('../../utils/config.js')
var util = require('../../utils/util.js')

Page({
 
  data: {
    loginVisible: ''
  }, 

  onLoad: function (options) {
    this.checkLogin();
  }, 

  checkLogin: function(){
    var adminLogined = util.getAdminLogined();
    if (adminLogined && adminLogined == '1') {
      this.setData({
        loginVisible: 'hide'
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

  item1Click: function () {
    wx.navigateTo({
      url: '../employer/employer.js',
    })
  },

  item2Click: function () {

  },

  item3Click: function () {

  },

})