var api = require('../../utils/api.js')
var config = require('../../utils/config.js')
var util = require('../../utils/util.js')

Page({
  data:{
    baseAvatar: config.baseAvatar,
    baseWorkUrl: config.baseWorkUrl,
    version: new Date().getTime(),
    workCount: 0,
    employee:null
  },

  onLoad:function(options){
    var that = this;
    if(options.id){
      var uid = options.id;
      console.log("uid-->"+uid);
      api.getEmployeeById(uid,
        function(res){
          that.setData({
              employee: res.data.employee
          });
          //处理技能
          that.handleSkillTag();
          //处理作品数
          that.handlerWorkCount();
      })
    }
  },

  // 预约
  yuyueClick: function(e){
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../yuyueEdit/yuyueEdit?id=' + ds.id
    })
  },

  // 喜欢
  likeClick: function (e) {
    var ds = e.currentTarget.dataset;
    var eeUid = ds.id;
    var data = new Array();
    data.uid = util.getUID();
    data.sign = util.getSign();
    data.eeUid = eeUid;
    api.likeEmployee(data, function(res){
      if(res.data.code == 0){
        util.showToast('已赞');
      }else{
        util.showModal('点赞失败');
      }
    });
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

  // 处理作品
  handlerWorkCount: function(){
    var workCount = this.data.workCount;
    var employee = this.data.employee;
    if (employee) {
      if (employee.workOneUrl){
        workCount++;
      }
      if (employee.workTwoUrl) {
        workCount++;
      }
      if (employee.workThreeUrl) {
        workCount++;
      }
    };
    this.setData({
      workCount: workCount
    })
  }
})