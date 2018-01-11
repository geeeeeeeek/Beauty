// var appPath='https://beauty.wxfont.com';
var appPath='http://localhost:8080';

//图片资源
var baseAvatar = appPath+'/upload/avatar/';
var baseWorksUrl = appPath+'/upload/works/';
var img220=appPath+'/upload/img_220';
var img800=appPath+'/upload/img_800';

//api请求
var api_get_all_employee=appPath+'/api/employee/all';
var api_get_one_employee = appPath + '/api/employee/one';
var api_get_one_uid = appPath + '/api/uid/one';

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

// 上传图像
var api_upload_file = appPath + '/api/file/one';


module.exports = { 
    baseAvatar: baseAvatar,
    baseWorksUrl: baseWorksUrl,
    img220:img220,
    img800:img800,

    api_get_all_employee,
    api_get_one_employee,
    api_get_one_uid,

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

    api_upload_file,
    
    // 后台用户名
    mid:'100'
}