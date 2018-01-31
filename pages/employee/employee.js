var api=require('../../utils/api.js')
var config=require('../../utils/config.js')
var util=require('../../utils/util.js')

Page({
    data:{
      baseAvatar:config.baseAvatar,
      employees:null
    },

    onLoad:function(){ 
       
    },

    onShow: function(){
      var that = this;
      that.loadData();
      // 登录 
      if (!util.getUID()) {
        util.checkUserInfoAuth(function () {
          api.login();
        })
      }
    },

    loadData: function(){
      var that = this;
      api.getAllEmployee(function (res) {
        console.log(res.data)
        if(res.data.code == 0){
          that.setData({
            employees: res.data.employees
          })
        }

        // 处理skill数据
        that.handleSkillTag();
      })
    },
 

    // 处理技能tag  
    handleSkillTag: function(){
      var employees = this.data.employees;
      if(employees){
        for(var i = 0;i < employees.length; i++){
            var skill = employees[i].skill; 
            if(skill){
               employees[i].skill = skill.split(",");
            }
        }
      };
      this.setData({
        employees:employees
      })
    },

    //单条点击
    itemClick: function (e) {
      var ds = e.currentTarget.dataset;
      wx.navigateTo({
        url: '../eeDetail/eeDetail?id='+ds.id
      })
    },

    //去预约页面
    yyClick(e){ 
      var ds = e.currentTarget.dataset;      
      wx.navigateTo({
        url: '../yuyueEdit/yuyueEdit?id='+ds.id
      })
    }
})