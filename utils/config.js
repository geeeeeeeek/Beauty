var appPath='https://beauty.wxfont.com';
// var appPath='http://localhost:8080';

//图片资源
var baseAvatar = appPath+'/upload/avatar/';
var baseLicenseUrl = appPath+'/upload/license/';
var baseStoreUrl = appPath+'/upload/storePhoto/';
var baseCardPUrl = appPath+'/upload/cardP/';
var baseCardNUrl = appPath+'/upload/cardN/';
var baseAvatarUrl = appPath+'/upload/avatar/';
var baseCertificateUrl = appPath+'/upload/certificate/';
var baseWorkUrl = appPath+'/upload/works/';
var img220=appPath+'/upload/img_220';
var img800=appPath+'/upload/img_800';

//api请求
var api_get_all_employee=appPath+'/api/employee/all';
var api_get_one_employee = appPath + '/api/employee/one';
var api_get_one_uid = appPath + '/api/uid/one';
var api_get_user_status = appPath + '/api/uid/userStatus'
var api_get_one_employer = appPath + '/api/employer/one';
var api_post_commit_employer = appPath + '/api/employer/commit';
var api_post_auth_employee = appPath + '/api/employee/auth';
var api_get_all_skill = appPath + '/api/skill/all';
var api_post_employee_skill = appPath + '/api/employee/chooseSkill';
var api_post_publish_demand = appPath + '/api/order/publishDemand';
var api_post_yuyue_order = appPath + '/api/order/yuyue';
var api_post_like_employee = appPath + '/api/employee/like';
var api_get_all_demand = appPath + '/api/order/allDemand';
var api_get_one_demand = appPath + '/api/order/oneDemand';
var api_post_take_order = appPath + '/api/order/take'
var api_get_my_publish = appPath + '/api/order/myPublish';
var api_post_cancel_publish = appPath + '/api/order/cancelPublish';
var api_get_my_yuyue = appPath + '/api/order/myYuyue';
var api_get_my_order = appPath + '/api/order/myOrder';
var api_post_cancel_order = appPath + '/api/order/cancelOrder';
var api_post_admin_login = appPath + '/api/admin/login';
var api_get_all_employer = appPath + '/api/employer/all';
var api_post_verify_employer = appPath + '/api/employer/verify';
var api_post_verify_employee = appPath + '/api/employee/verify';
var api_get_all_order = appPath + '/api/order/allOrder';
var api_post_commit_advise = appPath + '/api/help/commitAdvise';

var api_get_all_product=appPath+'/api/product/all';
var api_get_hot_product=appPath+'/api/product/hot';
var api_get_mode_product=appPath+'/api/product/mode';
var api_get_recent_product=appPath+'/api/product/recent'
var api_get_one_product=appPath+'/api/product/one';
var api_get_all_staff=appPath+'/api/staff/all';
var api_get_one_staff=appPath+'/api/staff/one';
var api_post_one_book=appPath+'/api/book/one';
var api_send_one_pv=appPath+'/api/pv/one';
var api_get_all_book=appPath+'/api/book/all';
var api_cancel_one_book=appPath+'/api/book/cancel'

// api上传
var api_upload_license = appPath + '/api/file/uploadLicense';
var api_upload_storePhoto = appPath + '/api/file/uploadStorePhoto';
var api_upload_cardP = appPath + '/api/file/uploadCardP';
var api_upload_cardN = appPath + '/api/file/uploadCardN';
var api_upload_avatar = appPath + '/api/file/uploadAvatar';
var api_upload_certificate = appPath + '/api/file/uploadCertificate';
var api_upload_workone = appPath + '/api/file/uploadWorkOne';
var api_upload_worktwo = appPath + '/api/file/uploadWorkTwo';
var api_upload_workthree = appPath + '/api/file/uploadWorkThree';


module.exports = { 
    baseAvatar: baseAvatar,
    baseLicenseUrl: baseLicenseUrl,
    baseStoreUrl: baseStoreUrl,
    baseCardPUrl: baseCardPUrl,
    baseCardNUrl: baseCardNUrl,
    baseAvatarUrl: baseAvatarUrl,
    baseCertificateUrl: baseCertificateUrl,
    baseWorkUrl: baseWorkUrl,
    img220:img220,
    img800:img800,

    // ------------admin-------------
    api_post_admin_login,
    api_get_all_employer,

    api_get_all_employee,
    api_get_one_employee,
    api_get_one_uid,
    api_get_user_status,
    api_get_one_employer,
    api_post_commit_employer,
    api_post_auth_employee,
    api_get_all_skill,
    api_post_employee_skill,
    api_post_publish_demand,
    api_post_yuyue_order,
    api_post_like_employee,
    api_get_all_demand,
    api_get_one_demand,
    api_post_take_order,
    api_get_my_publish,
    api_post_verify_employer,
    api_post_verify_employee,
    api_get_all_order,
    api_post_commit_advise,

    api_get_all_product,
    api_get_hot_product,
    api_get_recent_product,
    api_get_mode_product,
    api_get_one_product,
    api_get_all_staff,
    api_get_one_staff,
    api_post_one_book,
    api_send_one_pv,
    api_get_all_book,
    api_cancel_one_book,
    api_post_cancel_publish,
    api_get_my_yuyue,
    api_get_my_order,
    api_post_cancel_order,
 
    api_upload_license,
    api_upload_storePhoto,
    api_upload_cardP,
    api_upload_cardN,
    api_upload_avatar,
    api_upload_certificate,
    api_upload_workone,
    api_upload_worktwo,
    api_upload_workthree,
    
    // 后台用户名
    mid:'100'
}