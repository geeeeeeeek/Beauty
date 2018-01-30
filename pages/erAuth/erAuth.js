var util = require('../../utils/util.js')
var config = require('../../utils/config.js')
var api = require('../../utils/api.js')

Page({
  data: {
    page: '',
    baseLicenseUrl: config.baseLicenseUrl,
    baseStoreUrl: config.baseStoreUrl,
    employer: {
      region: ['广东省', '广州市', '天河区']
    },
    licenseClass:'',
    submitText:'提交'
  },

  // 页面分为edit/auth edit页面不能编辑执照
  onLoad: function (options) {
    var page = options.page; // page--> edit/auth
    var that = this;
    
    if (page == 'auth'){
      that.setData({
        page: page,
        submitText: '提交审核'
      })
      wx.setNavigationBarTitle({
        title: '门店认证'
      })
    } else if (page == 'edit'){
      that.setData({
        page: page,
        submitText: '提交',
        licenseClass: 'hide'
      })
      wx.setNavigationBarTitle({
        title: '门店资料'
      })
    }else{
      util.showModal('Type不能为空');
    }

    console.log("-->" + util.getUID());

    this.loadData();
  },

  onHide: function(){
    api.getUserStatus();
  },

  loadData: function(){
    var that = this;
    var data = new Array();
    data.uid = util.getUID();
    data.sign = util.getSign();
    data.erUid = util.getUID();
    api.getOneEmployer(data, function (res) {
      // get data
      var employer = res.data.employer;
      // 如果为空,返回
      if (Object.keys(employer).length === 0) {
        return;
      }

      // string转数组
      if (employer.region && employer.region.length > 0) {
        var regionStr = employer.region;
        employer.region = regionStr.split(",");
      } else {
        employer.region = new Array('广东省', '广州市', '天河区');
      }

      that.setData({
        employer: employer
      })
    })
  },

  // ------------失去焦点时存值------------
  storeNameChange: function(e){
    var employer = this.data.employer;
    employer.storeName = e.detail.value;
    this.setData({
      employer: employer
    }) 
  },

  contactChange: function (e) {
    var employer = this.data.employer;
    employer.contact = e.detail.value;
    this.setData({
      employer: employer
    })
  },

  phoneChange: function (e) {
    var employer = this.data.employer;
    employer.phone = e.detail.value;
    this.setData({
      employer: employer
    })
  },

  addressChange: function (e) {
    var employer = this.data.employer;
    employer.address = e.detail.value;
    this.setData({
      employer: employer
    })
  },

  introduceChange: function (e) {
    var employer = this.data.employer;
    employer.introduce = e.detail.value;
    this.setData({
      employer: employer
    })
  },

  bindRegionPickerChange: function (e) {
    var employer = this.data.employer;
    employer.region = e.detail.value;
    this.setData({
      employer: employer
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
    // start commit
    var employer = that.data.employer;
    // 数组转string
    formData.regionStr = employer.region.join(",");
    // 设置form的主键 
    formData.uid = util.getUID();
    formData.type = that.data.page;
    
    api.commitEmployer(formData, function(res){
        console.log(res.data)
        if(res.data.code == 0){
          util.showToast('提交成功');
          wx.navigateBack();
        }else{
          util.showModal('提交失败');
        }
    });

  }, 

  isValid: function (formData) {
    var employer = this.data.employer;
    if (formData.storeName == '') {
      util.showModal("请输入门店名称");
      return false;
    } else if (formData.contact == '') {
      util.showModal("请输入联系人");
      return false;
    } else if (formData.phone == '') {
      util.showModal("请输入手机号");
      return false;
    } else if (formData.address == '') {
      util.showModal("请输入详细地址");
      return false;
    }

    if(!employer.license){
      util.showModal("请上传营业执照");
      return false;
    }else if(!employer.storePhoto){
      util.showModal("请上传门店照片");
      return false;
    }
    return true;
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