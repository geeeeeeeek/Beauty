# Beauty

#### mini program learning 
- winxin mini program
- study day by day
- https://mp.weixin.qq.com/debug/wxadoc/dev/api/

#### attention
- 测试/正式环境
- php.ini 上传文件大小
- DB定时拷贝
- 做好自测

#### 关键流程
- getUserStatus()调用地方: app.onShow(), login(), my.js
- 认证状态：0未认证  1认证中  2认证失败  3认证成功
- getUserStatus()可以获取用户状态，获取后存本地
- "我的" onShow()会调用getUserStatus()
- 我的页面必须登录后才能进来
- 登录后调用getUserStatus()

#### 表 employee
- uid
- nickName
- avatar
- age
- height
- region
- address
- skill // 技能--> 'aa,ab'
- score
- praiseCount // 好评数
- likeCount  // 获赞数
- worksCount // 作品数
- spareTime  // 闲暇时间
- introduce  // 寄语
- worksUrl   // 作品图片--> 'aa,ab'

#### user
- uid
- openId
- sign
- status // 0无 1技师 2店家 3都是 todo 
- time

#### employer
- uid
- storeName
- contact
- phone
- region
- address
- introduce
- license
- storePhoto

#### employee
- uid
- status 
- name
- nickName
- phone
- card 
- sex
- age
- height
- weight
- avatar
- cardP
- cardN
- certificate
- region
- address
- skill
- score
- praiseCount
- likeCount
- worksCount
- spareTime
- introduce
- worksUrl

#### order
- eeUid
- erUid
- title
- startTime
- duration
- price
- status // 订单状态 0需求 1派人 2接单 3完成 4已取消
- time