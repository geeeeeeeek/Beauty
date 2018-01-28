var api = require('../../utils/api.js')
var util = require('../../utils/util.js')

Page({
    data:{
        userInfo: null,
        erStatus: null,
        eeStatus: null
    },

    onLoad:function(){
        var userInfo=wx.getStorageSync('userInfo');
        if(userInfo){
            this.setData({
                userInfo:userInfo
            })
        }
    },

    onShow: function(){
      var that = this;
      // 登录 
      if (!util.getUID()) {
        util.checkUserInfoAuth(function () {
          api.login();
        })
      } else {
        api.getUserStatus();
      }
 
      that.setData({
        erStatus: util.getErStatus(),
        eeStatus: util.getEeStatus()
      })

      console.log("erStatus-->" + util.getErStatus());
      console.log("eeStatus-->" + util.getEeStatus());
    }, 

    // 店家认证/编辑
    erAuthClick: function () {
      var erStatus = this.data.erStatus;
      // 登录 
      if (!util.getUID()) {
        util.checkUserInfoAuth(function () {
          api.login();
        })
      } else {
        if (erStatus == '0') {
          wx.navigateTo({
            url: '../erAuth/erAuth?page=auth',
          })
        } else if (erStatus == '1') {
          util.showToast('正在认证中');
        } else if (erStatus == '2') {
          wx.navigateTo({
            url: '../erAuth/erAuth?page=auth',
          })
        } else if (erStatus == '3') {
          wx.navigateTo({
            url: '../erAuth/erAuth?page=edit',
          })
        }
      }
    },

    // 技师认证/编辑
    eeAuthClick: function(){
      var eeStatus = this.data.eeStatus;
      if (!util.getUID()) {
        util.checkUserInfoAuth(function () {
          api.login();
        })
      }else{
        if (eeStatus == '0') {
          wx.navigateTo({
            url: '../eeAuth/eeAuth?page=auth'
          })
        } else if (eeStatus == '1') {
          util.showToast('正在认证中');
        } else if (eeStatus == '2') {
          wx.navigateTo({
            url: '../eeAuth/eeAuth?page=auth'
          })
        } else if (eeStatus == '3') {
          wx.navigateTo({
            url: '../eeAuth/eeAuth?page=edit'
          })
        } 
      }
    },


    myPublishClick: function(){
      wx.navigateTo({
        url: '../myPublish/myPublish',
      })
    },

    myYuyueClick: function(){
      wx.navigateTo({
        url: '../myYuyue/myYuyue',
      })
    },

    myOrderClick: function(){
      wx.navigateTo({
        url: '../myOrder/myOrder',
      })
    },

    myHelpClick: function(){
      wx.navigateTo({
        url: '../help/help',
      })
    }
})