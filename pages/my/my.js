var api = require('../../utils/api.js')
var util = require('../../utils/util.js')

Page({
    data:{
        userInfo:null
    },

    onLoad:function(){
        var userInfo=wx.getStorageSync('userInfo');
        if(userInfo){
            this.setData({
                userInfo:userInfo
            })
        }

        // 登录 
        if (!util.getUID()) {
          util.checkUserInfoAuth(function () {
            api.login();
          })
        }
    },

    erInfoClick: function () {
      if (!util.getUID()) {
        util.checkUserInfoAuth(function () {
          api.login();
        })
      }else{
        wx.navigateTo({
          url: '../erAuth/erAuth?page=edit',
        })
      }
    },

    eeAuthClick: function(){
      if (!util.getUID()) {
        util.checkUserInfoAuth(function () {
          api.login();
        })
      }else{
        wx.navigateTo({
          url: '../eeAuth/eeAuth?page=auth'
        })
      }
    },

    eeInfoClick: function () {
      if (!util.getUID()) {
        util.checkUserInfoAuth(function () {
          api.login();
        })
      }else{
        wx.navigateTo({
          url: '../eeAuth/eeAuth?page=edit'
        })
      }
    },

    erAuthClick: function(){
      // 登录 
      if (!util.getUID()) {
        util.checkUserInfoAuth(function () {
          api.login();
        })
      }else{ 
        wx.navigateTo({
          url: '../erAuth/erAuth?page=auth',
        })
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
    }
})