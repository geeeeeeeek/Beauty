
// 登录后的uid
function getUID(){
  return wx.getStorageSync("uid");
}

function setUID(uid){
  wx.setStorageSync("uid", uid);
}

// sign签名
function getSign() {
  return wx.getStorageSync("sign");
}

function setSign(sign) {
  wx.setStorageSync("sign", sign);
}

// 用户认证状态
function getErStatus(){
  return wx.getStorageSync("erStatus");
}

function setErStatus(erStatus){
  wx.setStorageSync("erStatus", erStatus);
}

function getEeStatus() {
  return wx.getStorageSync("eeStatus");
}

function setEeStatus(eeStatus) {
  wx.setStorageSync("eeStatus", eeStatus);
}

// 用户状态授权
function checkUserInfoAuth(su){ 
  wx.authorize({
    scope: 'scope.userInfo',
    success: su,
    fail: function(){
      console.log("-->auth fail");
      wx.openSetting({
        success: function(res){ 
          res.authSetting = {
            "scope.userInfo": true,
            "scope.userLocation": true
          }
        }
      })
    }
  })
}

// 上传文件
function uploadFile(url, su){
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'], // 原图/压缩图
    sourceType: ['album', 'camera'],
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths;
      if (tempFilePaths && tempFilePaths.length > 0) {
        showLoading("上传中...");
        var localPath = tempFilePaths[0];
        wx.uploadFile({
          url: url,
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'uid': getUID()
          },
          success: function (res) {
            hideLoading();
            console.log("res-->" + JSON.stringify(res));
            if (res.statusCode == 200) {
              var obj = JSON.parse(res.data);

              if (obj.code == 0) {
                su(obj);
              } else {
                showModal(obj.msg);
              }

            } else {
              showToast("上传失败");
            }
          },
          fail: function () {
            console.log("upload failed")
            hideLoading();
            showToast("上传失败");
          }
        })
      }

    }
  })
}


function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatTime2(date){
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function showLoading(title){
  console.log("showloading-----");
  wx.showLoading({
    title: title
  })
}

function hideLoading(){
  wx.hideLoading();
}

function showToast(text){
  wx.showToast({
    title: text
  })
}


function showModal(text){
   wx.showModal({
      title: '提示',
      content: text,
      showCancel:false,
      success: function(res) {
        if (res.confirm) {
           
        }
      }
   })
}

function showFailModal(){
  wx.showModal({
    title: '提示',
    content: '网络异常，请检查网络',
    success: function(res) {
      if (res.confirm) {
        console.log('用户点击确定')
      }
    }
  })
}

function printObj(tag, data){
  console.log(tag + "-->" + JSON.stringify(data));
}

function getProductNameById(id){
  var products=wx.getStorageSync('products');
  for(var i=0;i<products.length;i++){
    var product=products[i]; 
    if(product.p_id==id){
      return product.p_title;
    }
  }
}

function getProductById(id){
  var products=wx.getStorageSync('products');
  for(var i=0;i<products.length;i++){
    var product=products[i]; 
    if(product.p_id==id){
      return product;
    }
  }
}
 

// 2018-01-10 格式的
function getCurrentDate(){
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  if(month < 10){
    month = "0" + month;
  }
  if(day < 10){
    day = "0" + day;
  }
  return year + "-" + month + "-" + day;
}

function su(){

}

function com(){

}

module.exports = {
  getUID: getUID,
  setUID: setUID,
  getSign: getSign,
  setSign: setSign,
  getErStatus: getErStatus,
  setErStatus: setErStatus,
  getEeStatus: getEeStatus,
  setEeStatus: setEeStatus,
  checkUserInfoAuth: checkUserInfoAuth,
  uploadFile: uploadFile,
  formatTime: formatTime,
  formatTime2: formatTime2,
  printObj: printObj,
  showLoading:showLoading,
  hideLoading:hideLoading,
  showToast:showToast,
  showFailModal:showFailModal,
  getProductNameById:getProductNameById,
  getProductById:getProductById,
  showModal:showModal,
  getCurrentDate,
  su:su,
  com:com
}
