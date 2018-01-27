
var config = require('config.js')
var util = require('util.js')
 

// 获取uid
function loginAdmin(data, su) {
  util.showLoading('请稍等');
  var url = config.api_post_admin_login;
  wx.request({
    url: url,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: data,
    success: su,
    fail: function () {
      util.showFailModal();
    },
    complete: function () {
      util.hideLoading();
    }
  })
} 


// 所有店家
function getAllEmployer(data, su) {
  util.showLoading('请稍等');
  var url = config.api_get_all_employer;
  wx.request({
    url: url,
    method: 'GET',
    data: data,
    success: su,
    fail: function () {
      util.showFailModal();
    },
    complete: function () {
      util.hideLoading();
    }
  })
} 

module.exports = {
  loginAdmin: loginAdmin,
  getAllEmployer: getAllEmployer
}