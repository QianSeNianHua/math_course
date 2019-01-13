export enum Eapi {
    quesRecordInit = 'FindQuestion/allquestion',    // 教师端的试题列表页面获取所有试题
    quesInfoOfQid = 'FindQuestion/lookboard',       // 画板界面根据试题id获取试题数据
    quesPushOfQid = 'FindQuestion/choose',           // 根据试题id更改试题推送状态
    paintsaveImage = 'KeepPhoto/base64_image_content'  // 保存画板为图片并上传到服务器
}
