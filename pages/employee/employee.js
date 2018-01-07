var api=require('../../utils/api.js')
var config=require('../../utils/config.js')
var util=require('../../utils/util.js')

Page({
    data:{
      baseAvatar:config.baseAvatar,
      version: new Date().getTime(),
      employees:null
    },

    onLoad:function(){
        var that=this;

        var uid = 'haha';

        api.getAllEmployee(uid, function(res){ 
          util.printObj("employees", res.data); 

          that.setData({
            employees: res.data.employees
          })

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
               console.log(skill)
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
      wx.navigateTo({
        url: '../yuyueEdit/yuyueEdit'
      })
    }
})