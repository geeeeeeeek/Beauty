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
 

      console.log("erStatus-->" + util.getErStatus());
      console.log("eeStatus-->"+util.getEeStatus());
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