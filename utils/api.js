
var config=require('config.js')
var util=require('util.js')

// login
function login() {
  wx.login({
    success: function (res) {
      if (res.code) {
        var code = res.code;

        wx.getUserInfo({
          success: function (res) { 
            var encryptedData = res.encryptedData;
            var iv = res.iv;
            getUID(encryptedData, iv, code, function(result){
              var obj = result.data;  
              console.log("obj-->"+JSON.stringify(obj));
              if(0 == obj.code){
                console.log("uid-->" + obj.uid);
                console.log("sign-->" + obj.sign);
                util.setUID(obj.uid);
                util.setSign(obj.sign);
                getUserStatus();
              }else{
                util.showModal('登录失败');               
              }              
            }); 
            wx.setStorageSync('userInfo', res.userInfo);
          }
        })
      }
    },
    fail: function () {
      util.showModal('登录失败');
    }
  })
}

// 获取uid
function getUID(encryptedData, iv, code, su){
  util.showLoading('请稍等');
  var url = config.api_get_one_uid;
  wx.request({
    url: url,
    method: 'GET',
    dataType: 'json',
    data: {
      encryptedData: encryptedData,
      iv: iv,
      code: code
    },
    success: su,
    fail: function () {
      util.showModal('登录失败');
    },
    complete: function () {
      util.hideLoading();
    }
  })
}

// 获取认证状态 erStatus eeStatus
function getUserStatus() {
  console.log("-->getUserStatus");
  var url = config.api_get_user_status;
  if(!util.getUID()){
    return;
  }
  wx.request({
    url: url,
    method: 'GET',
    dataType: 'json',
    data: {
      uid: util.getUID()
    },
    success: function(res){
      if(res.data.code == 0){
        var erStatus = res.data.erStatus;
        var eeStatus = res.data.eeStatus;
        util.setErStatus(erStatus);
        util.setEeStatus(eeStatus);
      }
    },
    fail: function () {
    },
    complete: function () {
    }
  })
}


// 获取店家信息
function getOneEmployer(su) {
  util.showLoading('请稍等');
  var url = config.api_get_one_employer;
  wx.request({
    url: url,
    method: 'GET',
    dataType: 'json',
    data: {
      uid: util.getUID()
    },
    success: su,
    fail: function () {
      util.showModal('网络异常');
    },
    complete: function () {
      util.hideLoading();
    }
  })
}

// 获取技师列表
function getAllEmployee(su){
  util.showLoading();
  var url = config.api_get_all_employee;
  wx.request({
    url: url,
    method: 'GET',
    data: {
      uid: util.getUID()
    },
    success: su,
    fail: function () {
      util.showFailModal();
    },
    complete: function () {
      util.hideLoading();
    }
  })
}

// 获取技师详情
function getEmployeeById(eeUid, su){
  util.showLoading('请稍等');
  var url = config.api_get_one_employee;
  wx.request({
    url: url,
    method: 'GET',
    data: {
      uid: eeUid
    },
    success: su,
    fail: function () {
      util.showModal('网络异常');
    },
    complete: function () {
      util.hideLoading();
    }
  })
}

// 店家信息
function commitEmployer(data, su){
  util.showLoading('提交中');
  var url = config.api_post_commit_employer;
  wx.request({
    url: url,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: data,
    success: su,
    fail: function () {
      util.showFailModal();
    },
    complete: function () {
      
    }
  })
}

// 认证技师
function authEmployee(data, su) {
  util.showLoading('提交中');
  var url = config.api_post_auth_employee;
  wx.request({
    url: url,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: data,
    success: su,
    fail: function () {
      util.showFailModal();
    },
    complete: function () {
      // util.hideLoading();
    }
  })
}

// 所有需求
function getAllDemand(su){
  util.showLoading();
  var url = config.api_get_all_demand;
  wx.request({
    url: url,
    method: 'GET',
    data: {
      uid: util.getUID()
    },
    success: su,
    fail: function () {
      util.showFailModal('请求失败');
    },
    complete: function () {
      util.hideLoading();
    }
  })
}

// 获取所有技能
function getAllSkill(su) {
  util.showLoading();
  var url = config.api_get_all_skill;
  wx.request({
    url: url,
    method: 'GET',
    data: {
      uid: util.getUID()
    },
    success: su,
    fail: function () {
      util.showFailModal('请求失败');
    },
    complete: function () {
      util.hideLoading();
    }
  })
}


// 提交技师技能
function chooseSkill(choosedStr, su) {
  util.showLoading('请稍等');
  var url = config.api_post_employee_skill;
  wx.request({
    url: url,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      uid: util.getUID(),
      choosedStr: choosedStr
    },
    success: su,
    fail: function () {
      util.showFailModal('网络异常');
    },
    complete: function () {
      util.hideLoading();
    }
  })
}


// 发布需求
function publishDemand(data, su) {
  util.showLoading('提交中');
  var url = config.api_post_publish_demand;
  wx.request({
    url: url,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: data,
    success: su,
    fail: function () {
      util.showFailModal();
    },
    complete: function () {
      // util.hideLoading();
    }
  })
}

// 预约
function yuyueOrder(data, su) {
  util.showLoading('提交中');
  var url = config.api_post_yuyue_order;
  wx.request({
    url: url,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: data,
    success: su,
    fail: function () {
      util.showFailModal();
    },
    complete: function () {
      // util.hideLoading();
    }
  })
}


// 点赞
function likeEmployee(data, su) {
  util.showLoading('提交中');
  var url = config.api_post_like_employee;
  wx.request({
    url: url,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: data,
    success: su,
    fail: function () {
      util.showFailModal();
    },
    complete: function () {
      // util.hideLoading();
    }
  })
}


// 获取详情
function getDemandById(id, su) {
  util.showLoading('请稍等');
  var url = config.api_get_one_demand;
  wx.request({
    url: url,
    method: 'GET',
    data: {
      id: id
    },
    success: su,
    fail: function () {
      util.showModal('网络异常');
    },
    complete: function () {
      util.hideLoading();
    }
  })
}

// 获取我的发布
function getMyPublish(su) {
  util.showLoading('请稍等');
  var url = config.api_get_my_publish;
  wx.request({
    url: url,
    method: 'GET',
    data: {
      uid: util.getUID()
    },
    success: su,
    fail: function () {
      util.showModal('网络异常');
    },
    complete: function () {
      util.hideLoading();
    }
  })
}

// 接单
function takeOrder(data, su) {
  util.showLoading('提交中');
  var url = config.api_post_take_order;
  wx.request({
    url: url,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: data,
    success: su,
    fail: function () {
      util.showFailModal();
    },
    complete: function () {
      // util.hideLoading();
    }
  })
}

/**
 * 发送pv
 */
function sendPv(id,su){
    var url=config.api_send_one_pv;
    wx.request({
      url: url,
      data: {
          pid:id
      },
      method: 'POST', 
      success: su
    })
}




module.exports={
  login: login,
  getUID: getUID,
  getUserStatus,
  getAllEmployee,
  getEmployeeById,
  getOneEmployer,
  commitEmployer,
  authEmployee,
  getAllSkill,
  chooseSkill,
  publishDemand,
  yuyueOrder,
  likeEmployee,
  getAllDemand,
  getDemandById,
  takeOrder,
  getMyPublish,

  sendPv:sendPv,
  // getAllBook:getAllBook,
  // cancelOneBook:cancelOneBook
}