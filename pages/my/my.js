
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

    infoClick: function(){
      wx.navigateTo({
        url: '../infoEdit/infoEdit',
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

    myOrderClick: function(){
      wx.navigateTo({
        url: '../myOrder/myOrder',
      })
    }
})