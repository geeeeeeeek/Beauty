var util = require('../../utils/util.js')
var config = require('../../utils/config.js')
var api = require('../../utils/api.js')

Page({
 
  data: {
    name: '',
    phone: '',
    content: ''
  },
 
  onLoad: function (options) {
  
  },

  nameChange: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  phoneChange: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  contentChange: function (e) {
    this.setData({
      content: e.detail.value
    })
  },

  commit: function(){
    var that = this;
    setTimeout(function(){
      var name = that.data.name;
      var phone = that.data.phone;
      var content = that.data.content;
      if (content == '' || name == '' || phone == ''){
        util.showModal('不能为空');
        return;
      }
      var data = new Array();
      data.name = name;
      data.phone = phone;
      data.content = content;
      api.commitAdvise(data, function(res){
        if(res.data.code == 0){
          util.showToast('提交成功');
          wx.navigateBack();
        }else{
          util.showToast('提交失败');
        }
      });
    }, 300);
    
  }
})