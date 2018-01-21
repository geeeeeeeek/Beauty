var util = require('../../utils/util.js')
var api = require('../../utils/api.js')
var config = require('../../utils/config.js')


Page({
  data: {
    userInfo: null,
    start_date: '2017-12-10',
    time: '09:00',
    eeUid: ''
  },

  onLoad: function (options) {
    var eeUid = options.id;
    if (eeUid && eeUid.length > 0){
      this.setData({
        eeUid: eeUid
      })
    }else{
      util.showModal('参数为空')
    }
    this.initDateAndTime();
  },

  // 初始化日期时间
  initDateAndTime: function () {
    var d = new Date()
    var start_date = util.getCurrentDate();
    this.setData({
      start_date: start_date,
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

  // --------------提交----------------
  formSubmit: function (e) {
    var that = this;

    // wxml自动填充formData
    var formData = e.detail.value;
    if (!that.isValid(formData)) {
      return;
    } 
    // 设置form的主键 
    formData.eeUid = that.data.eeUid;
    formData.uid = util.getUID();
    formData.sign = util.getSign();
    formData.startTime = that.data.start_date + ' ' + that.data.time;

    api.yuyueOrder(formData, function (res) {
      console.log(res.data)
      if (res.data.code == 0) {
        util.showToast('预约成功');
        wx.navigateBack();
      } else {
        util.showModal('预约失败');
      }
    });

  }, 


  isValid: function (formData) { 
    if (formData.title == '') {
      util.showModal("请输入项目");
      return false;
    } else if (formData.duration == '') {
      util.showModal("请输入时长");
      return false;
    } else if(formData.price == ''){
      util.showModal('请输入价格');
      return false;
    }
 
    return true;
  }

})