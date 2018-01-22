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
- status // 订单状态 0需求 1派人 2接单 3完成
- time