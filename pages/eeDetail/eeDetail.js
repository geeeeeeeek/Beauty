var api = require('../../utils/api.js')
var config = require('../../utils/config.js')
var util = require('../../utils/util.js')

Page({
  data:{
    
  },

  onLoad:function(options){
    var that = this;
    if(options.id){
      var uid = options.id;
      api.getEmployeeById(uid,
          function(res){
            util.printObj("employee",res.data)
            that.setData({
               employee: res.data.employee
            })
          })
    }
  }
})