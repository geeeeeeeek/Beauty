var util = require('../../utils/util.js')
var config = require('../../utils/config.js')
var api = require('../../utils/api.js')

Page({
  data: {
    baseLicenseUrl: config.baseLicenseUrl,
    baseStoreUrl: config.baseStoreUrl,
    employer: {
      region: ['广东省', '广州市', '天河区']
    }
  },

  onLoad: function () {
    var that = this;
    console.log("-->" + util.getUID());
    api.getOneEmployer(function(res){
      // get data
      var employer = res.data.employer;
      if(!employer){
        return;
      }

      if(!employer.region){
        employer.region = new Array('广东省', '广州市','天河区');
      }

      that.setData({
        employer: employer
      })
    })
  },

  bindRegionPickerChange: function (e) {
    var employer = this.data.employer;
    employer.region = e.detail.value;
    this.setData({
      employer: employer
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
            url: config.api_upload_license,
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              'uid': util.getUID()
            },
            success: function (res) {
              util.hideLoading();
              console.log("res-->"+JSON.stringify(res));
              if (res.statusCode == 200) { 
                var obj = JSON.parse(res.data);  
                
                if (obj.code == 0){
                  console.log("upload success")
                  util.showToast("上传成功");
                  // update local
                  var license = obj.license;
                  var employer = that.data.employer;
                  employer.license = obj.license;
                  that.setData({
                     employer: employer
                  });
                }else{
                  util.showModal(obj.msg);
                } 
               
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
            url: config.api_upload_storePhoto,
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              'uid': util.getUID()
            },
            success: function (res) {
              util.hideLoading();
              if (res.statusCode == 200) {
                var obj = JSON.parse(res.data);

                if (obj.code == 0) {
                  console.log("upload success")
                  util.showToast("上传成功");
                  // update local
                  var storePhoto = obj.storePhoto;
                  var employer = that.data.employer;
                  employer.storePhoto = obj.storePhoto;
                  that.setData({
                    employer: employer
                  });
                } else {
                  util.showModal(obj.msg);
                }

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