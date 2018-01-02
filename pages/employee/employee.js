var api=require('../../utils/api.js')
var config=require('../../utils/config.js')
var util=require('../../utils/util.js')

Page({
    data:{
        version:null,
        employees:null
    },

    onLoad:function(){
        var that=this;

        this.init();

        var uid = 'haha';

        api.getAllEmployee(uid, function(res){ 
          util.printObj("employee", res.data); 
          that.setData({
            employees: res.data.employees
          })
        })
    },

    init:function(){
        var v=new Date().getTime();
        this.setData({
            version:v
        })
    },

    //单条点击
    itemClick: function (e) {
      var ds = e.currentTarget.dataset;
      wx.navigateTo({
        url: '../eeDetail/eeDetail'
      })
    },

    //去预约页面
    yyClick(e){ 
      wx.navigateTo({
        url: '../yuyueEdit/yuyueEdit'
      })
    }
})