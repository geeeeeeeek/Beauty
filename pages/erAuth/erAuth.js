var util = require('../../utils/util.js')
var config = require('../../utils/config.js')

Page({
  data: {
    userInfo: null,
    region: ['广东省', '广州市', '天河区'],
    cardPicP: null,
    cardPicN: null
  },

  onLoad: function () {
    
  },

  bindRegionPickerChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },

  bindLicensePic: function (e) {
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
                  cardPicP: localPath
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
  },

  bindStorePic: function (e) {
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
                  cardPicP: localPath
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