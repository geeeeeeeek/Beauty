var util = require('../../utils/util.js')

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

})