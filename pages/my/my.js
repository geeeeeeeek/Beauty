
var util=require('../../utils/util.js')

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
    },

    eeInfoClick: function(){
      wx.navigateTo({
        url: '../eeInfoEdit/eeInfoEdit',
      })
    },

    erInfoClick: function () {
      wx.navigateTo({
        url: '../erInfoEdit/erInfoEdit',
      })
    },

    eeAuthClick: function(){
      wx.navigateTo({
        url: '../eeAuth/eeAuth',
      })
    },

    erAuthClick: function(){
      wx.navigateTo({
        url: '../erAuth/erAuth',
      })
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