var api=require('utils/api.js')
var config=require('utils/config.js')
var util=require('utils/util.js')

App({
  cache: {
    skillStr: ''
  },
  
  onLaunch: function (options) {
     
  },

  onShow: function (options){
    api.getUserStatus();
  }
})