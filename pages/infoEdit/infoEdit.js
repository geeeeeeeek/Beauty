var util = require('../../utils/util.js')
var config = require('../../utils/config.js')

Page({
  data: {
    userInfo: null,
    sexArray: ['女', '男'],
    sexIndex: 0,
    heightArray: [],
    heightIndex: 0,
    weightArray: [],
    weightIndex: 0,
    region: ['广东省', '广州市', '天河区'],
    avatarUrl:null
  },

  onLoad: function () {
    this.initHeightArray();
    this.initWeightArray();
  },

  // 初始化身高数组
  initHeightArray: function () {
    var arr = new Array();
    for (var i = 140; i <= 200; i++) {
      arr.push(i);
    }
    this.setData({
      heightArray: arr,
      heightIndex: 20
    })
  },

  // 初始化体重数组
  initWeightArray: function () {
    var arr = new Array();
    for (var i = 30; i <= 100; i++) {
      arr.push(i);
    }
    this.setData({
      weightArray: arr,
      weightIndex: 20
    })
  },


  bindSexPickerChange: function (e) {
    this.setData({
      sexIndex: e.detail.value
    })
  },

  bindHeightPickerChange: function (e) {
    this.setData({
      heightIndex: e.detail.value
    })
  },

  bindWeightPickerChange: function (e) {
    this.setData({
      weightIndex: e.detail.value
    })
  },

  bindRegionPickerChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },

  bindUploadAvatar: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 原图/压缩图
      sourceType: ['album', 'camera'],
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        if (tempFilePaths && tempFilePaths.length > 0) {
          util.showLoading("上传中...");
          var localPath = tempFilePaths[0];
          wx.uploadFile({
            url: config.api_upload_file,
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              'user': 'test'
            },
            success: function (res) {
              util.hideLoading();
              if (res.statusCode == 200) {
                console.log("upload success")
                util.showToast("上传成功");
                var data = res.data;
                //do something
                that.setData({
                  avatarUrl: localPath
                });
              } else {
                util.showToast("上传失败");
              }
            },
            fail: function () {
              console.log("upload failed")
              util.hideLoading();
              util.showToast("上传失败");
            }
          })
        }

      }
    })
  }

})