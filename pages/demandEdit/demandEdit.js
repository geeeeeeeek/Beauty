var util = require('../../utils/util.js')
var api = require('../../utils/api.js')

Page({
  data: {
    userInfo: null,
    start_date: '2017-12-10',
    time: '09:00'
  },

  onLoad: function () { 
    this.initDateAndTime();
  }, 
 
  // 初始化日期时间
  initDateAndTime:function(){
    var d = new Date()
    var start_date = util.getCurrentDate();
    this.setData({
      start_date:start_date,
      time: '09:00'
    })
  },


  bindDateChange: function (e) {
    console.log('selected date-->', e.detail.value)
    this.setData({
      start_date: e.detail.value
    })
  },

  bindTimeChange: function (e) {
    console.log('selected time-->', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },

  formSubmit: function(e){
    var that = this;
    var formData = e.detail.value;
    if (!that.isValid(formData)) {
      return;
    }
    // 设置form的主键 
    formData.uid = util.getUID();
    formData.sign = util.getSign();
    formData.startTime = that.data.start_date + ' ' + that.data.time;

    // publish
    api.publishDemand(formData, function(res){
      if(res.data.code == 0){
        util.showToast('发布成功');
        wx.navigateBack();
      }else{
        util.showToast('发布失败')        
      }
    })
  },


  isValid: function (formData) {
    var employee = this.data.employee;
    if (formData.title == '') {
      util.showModal("请输入名称");
      return false;
    } else if (formData.phone == '') {
      util.showModal("请输入联系方式");
      return false;
    } else if (formData.duration == '') {
      util.showModal("请输入时长");
      return false;
    } else if (formData.price == '') {
      util.showModal("请输入价格");
      return false;
    } 
    return true;
  },

})