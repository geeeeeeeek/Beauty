var api = require('../../utils/api.js')
var config = require('../../utils/config.js')
var util = require('../../utils/util.js')

Page({
  data:{
    baseAvatar: config.baseAvatar,
    baseWorksUrl: config.baseWorksUrl,
    version: new Date().getTime(),
    employee:null
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
          });
          //处理技能
          that.handleSkillTag();
          //处理作品图
          that.handlerWorksUrl();
      })

     
    }
  },

  // 处理技能tag  
  handleSkillTag: function () {
    var employee = this.data.employee;
    if (employee) {
      var skill = employee.skill;
      employee.skill = skill.split(",");
    };
    this.setData({
      employee: employee
    })
  },

  // 处理作品图
  handlerWorksUrl: function(){
    var employee = this.data.employee;
    if (employee) {
      var worksUrl = employee.worksUrl;
      employee.worksUrl = worksUrl.split(",");
    };
    this.setData({
      employee: employee
    })
  }
})