
function getUID(){
  return wx.getStorageSync("uid");
}

function setUID(uid){
  wx.setStorageSync("uid", uid);
}

function checkLogin(){
  var uid = getUID();
  if(!uid){
    login();
  }
}

function login(){
  wx.login({
    success: function (res) {
      if(res.code){
        console.log("code-->" + res.code);

        wx.getUserInfo({
          success: function (res) {
            console.log("globalData====" + JSON.stringify(res));

            console.log("encryptedData-->" + res.encryptedData);
            console.log("iv-->" + res.iv);
            // api.getUID();
            wx.setStorageSync('userInfo', res.userInfo);
          }
        })
      }
    },
    fail: function(){

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
  var day = d.getDay();
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
  checkLogin: checkLogin,
  login: login,
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
