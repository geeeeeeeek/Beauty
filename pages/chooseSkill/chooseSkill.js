var util = require('../../utils/util.js')
var config = require('../../utils/config.js')
var api = require('../../utils/api.js')

Page({
  data:{
    skills: []
  },

  onLoad: function(options){
    var that = this;
    // -------load all skill--------
    api.getAllSkill(function(res){
      if(res.data.code == 0){
        console.log('所有技能-->'+JSON.stringify(res.data.skills));
        that.setData({
          skills: res.data.skills
        })
        // filter 
        var skillStr = options.skillStr;
        // var skillStr = 'hh,面膜'
        that.filter(skillStr);
      }
    });

  },

  // 本地过滤
  filter: function(skillStr){
    if (skillStr && skillStr.length > 0) {
      var skillArr = skillStr.split(",");
      var skills = this.data.skills;
      for(var i = 0;i < skills.length; i++){
        if(skillArr.indexOf(skills[i].skillName) >= 0){
          skills[i].checked = 'true';
        }
      }
      
      this.setData({
        skills: skills
      })
    }
  },

  checkboxChange: function (e) {
    console.log('checkbox选择后-->'+ e.detail.value);
    var checkedArr = e.detail.value;
    var skills = this.data.skills;
    for (var i = 0; i < skills.length; i++) {
      skills[i].checked = '';
      if (checkedArr.indexOf(skills[i].skillName) >= 0) {
        skills[i].checked = 'true';
      }
    }
    this.setData({
      skills: skills
    })
  },

  // 提交
  commit: function(){
    var skills = this.data.skills;
    var choosedSkills = new Array();
    for(var i = 0; i < skills.length; i++){
      if(skills[i].checked == 'true'){
        choosedSkills.push(skills[i].skillName);
      }
    }
    var choosedSkillStr = choosedSkills.join(',');
    if(choosedSkillStr && choosedSkillStr.length > 0){
      // save to cache
      var app = getApp();
      app.cache.skillStr = choosedSkillStr; 
      wx.navigateBack();
      // api.chooseSkill(choosedSkillStr, function(res){
      //   if(res.data.code === 0){
      //     // save to cache
      //     var app = getApp();
      //     app.cache.skillStr = choosedSkillStr; 
      //     wx.navigateBack();
      //   }else{
      //     util.showModal('提交失败');
      //   }
      // })
    }else{
      util.showModal('请至少选择一项')
    }
  }

})