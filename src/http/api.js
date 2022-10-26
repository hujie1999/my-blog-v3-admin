import http from './http'


//登录
export function adminloginAPI(params){
    return http.post('/adminlogin',params)
}

//刷新 token
export function refeshtokenAPI(params){
    return http.post('/refeshtoken',params)
}


//获取正常状态博客列表
export function activeblogslistAPI(params){
    return http.post('/activeblogslist',params)
}
//获取正常状态博客条数
export function activeblogscountAPI(){
    return http.get('/activeblogscount')
}
//获取冻结状态博客列表
export function frozenblogslistAPI(params){
    return http.post('/frozenblogslist',params)
}
//获取冻结状态博客条数
export function frozenblogscountAPI(){
    return http.get('/frozenblogscount')
}

//获取草稿状态博客列表
export function draftblogslistAPI(params){
    return http.post('/draftblogslist',params)
}
//获取草稿状态博客条数
export function draftblogscountAPI(){
    return http.get('/draftblogscount')
}


//根据id查询一条博客
export function takeablogAPI(params){
    return http.post('/takeablog',params)
}
//所有标签列表
export function alltagslistAPI(){
    return http.get('/alltagslist')
}
//所有分类列表
export function allclasslistAPI(){
    return http.get('/allclasslist')
}
//上传图片
export function uploadimgAPI(params,headers){
    return http.post('/uploadimg',params,headers)
}
//最后一条博客Id
export function lastblogidAPI(){
    return http.get('/lastblogid')
}
//根据标识插入图片路径
export function updateimgpathAPI(params){
    return http.post('/updateimgpath',params)
}
//删除摘要和内容图片
export function deleteimgAPI(params){
    return http.post('/deleteimg',params)
}
//更新博客
export function updateblogAPI(params){
    return http.post('/updateblog',params)
}
//添加一条草稿状态的博客
export function addonedraftAPI(params){
    return http.post('/addonedraft',params)
}
//按条件发布博客
//condition:单词意为 条件
export function publishwithconditionAPI(params){
    return http.post('/publishwithcondition',params)
}
//按条件发布草稿状态博客
export function savedraftwithconditionAPI(params){
    return http.post('/savedraftwithcondition',params)
}
//发布保存的草稿
//传Blog_Id，让Status = 1 
export function publishdraftsAPI(params){
    return http.post('/publishdrafts',params)
}
//冻结博客
export function frozenblogAPI(params){
    return http.post('/frozenblog',params)
}
//解冻博客
export function unfrozenblogAPI(params){
    return http.post('/unfrozenblog',params)
}
//删除博客
export function deleteblogAPI(params){
    return http.post('/deleteblog',params)
}


  //***********评论
//获取正常 过审 状态博客评论列表
export function activeblogcommentslistAPI(params){
    return http.post('/activeblogcommentslist',params)
}
//获取正常 过审 状态博客评论数量
export function activeblogcommentscountAPI(){
    return http.get('/activeblogcommentscount')
}
//获取冻结 过审 状态博客评论列表
export function frozenblogcommentslistAPI(params){
    return http.post('/frozenblogcommentslist',params)
}
//获取冻结 过审 状态博客评论数量
export function frozenblogcommentscountAPI(){
    return http.get('/frozenblogcommentscount')
}

//获取正常 过审 状态留言板评论列表
export function activemessagecommentslistAPI(params){
    return http.post('/activemessagecommentslist',params)
}
//获取正常 过审 状态留言板评论数量
export function activemessagecommentscountAPI(){
    return http.get('/activemessagecommentscount')
}
//获取冻结 过审 状态留言板评论列表
export function frozenmessagecommentslistAPI(params){
    return http.post('/frozenmessagecommentslist',params)
}
//获取冻结 过审 状态留言板评论数量
export function frozenmessagecommentscountAPI(){
    return http.get('/frozenmessagecommentscount')
}
//冻结博客评论
export function frozenblogcommentAPI(params){
    return http.post('/frozenblogcomment',params)
}
// 解冻 博客评论
export function unfrozenblogcommentAPI(params){
    return http.post('/unfrozenblogcomment',params)
}
//删除 博客评论
export function deleteblogcommentAPI(params){
    return http.post('/deleteblogcomment',params)
}

//冻结留言板回复
export function frozenmessagecommentAPI(params){
    return http.post('/frozenmessagecomment',params)
}
// 解冻留言板回复
export function unfrozenmessagecommentAPI(params){
    return http.post('/unfrozenmessagecomment',params)
}
// 删除留言板回复
export function deletemessagecommentAPI(params){
    return http.post('/deletemessagecomment',params)
}


//获取预审 Comment_Exmined=0 状态博客评论列表
export function preexminedblogcommentlistAPI(params){
    return http.post('/preexminedblogcommentlist',params)
}
//获取预审 Comment_Exmined=0 状态留言板列表
export function preexminedmessagecommentlistAPI(params){
    return http.post('/preexminedmessagecommentlist',params)
}

//获取预审 Comment_Exmined=0 状态博客评论count
export function preexminedblogcommentcountAPI(){
    return http.get('/preexminedblogcommentcount')
}

//获取预审 Comment_Exmined=0 状态留言板count
export function preexminedmessagecommentcountAPI(){
    return http.get('/preexminedmessagecommentcount')
}


//获取未过审 Comment_Exmined=2 状态博客评论列表
export function fallenblogcommentlistAPI(params){
    return http.post('/fallenblogcommentlist',params)
}
//获取未过审 Comment_Exmined=2 状态留言板列表
export function fallenmessagecommentlistAPI(params){
    return http.post('/fallenmessagecommentlist',params)
}

//获取未过审 Comment_Exmined=2 状态博客评论count
export function fallenblogcommentcountAPI(){
    return http.get('/fallenblogcommentcount')
}


//获取未过审 Comment_Exmined=2 状态留言板count
export function fallenmessagecommentcountAPI(){
    return http.get('/fallenmessagecommentcount')
}

//博客评论通过审核
export function exmineadmitblogcommentAPI(params){
    return http.post('/exmineadmitblogcomment',params)
}
//博客评论  不通过审核
export function exminerefuseblogcommentAPI(params){
    return http.post('/exminerefuseblogcomment',params)
}
//留言板留言通过审核
export function exmineadmitmessagecommentAPI(params){
    return http.post('/exmineadmitmessagecomment',params)
}
//留言板留言  不通过审核
export function exminerefusemessagecommentAPI(params){
    return http.post('/exminerefusemessagecomment',params)
}

//博客评论 或留言板 通过审核（多选）
export function multiexmineadmitcommentAPI(params){
    return http.post('/multi/exmineadmitcomment',params)
}

//博客评论 或留言板 不通过审核（多选）
export function multiexminerefusecommentAPI(params){
    return http.post('/multi/exminerefusecomment',params)
}

            //****用户管理 */



//获取所有正常 审核成功状态用户列表User_Status=1 User_Examined=2
export function activeuserlistAPI(params){
    return http.post('/activeuserlist',params)
}
//count
export function activeusercountAPI(){
    return http.get('/activeusercount')
}
//获取所有冻结 审核成功状态用户列表User_Status=2 User_Examined=2
export function frozenuserlistAPI(params){
    return http.post('/frozenuserlist',params)
}
//count
export function frozenusercountAPI(){
    return http.get('/frozenusercount')
}
//冻结账户 
export function frozenuserAPI(params){
    return http.post('/frozenuser',params)
}
//解冻账户 
export function unfrozenuserAPI(params){
    return http.post('/unfrozenuser',params)
}
//注销账户
export function deleteuserAPI(params){
    return http.post('/deleteuser',params)
}
//修改用户信息
export function updateuserinfoAPI(params){
    return http.post('/updateuserinfo',params)
}



//获取所有正常 审核成功状态一般管理员列表User_Status=1 User_Examined=2
export function activeadminuserlistAPI(params){
    return http.post('/activeadminuserlist',params)
}
//count
export function activeadminusercountAPI(){
    return http.get('/activeadminusercount')
}
//获取所有冻结 审核成功状态一般管理员列表User_Status=2 User_Examined=2
export function frozenadminuserlistAPI(params){
    return http.post('/frozenadminuserlist',params)
}
//count
export function frozenadminusercountAPI(){
    return http.get('/frozenadminusercount')
}
//冻结管理员账户
export function frozenadminuserAPI(params){
    return http.post('/frozenadminuser',params)
}
//解冻管理员账户 
export function unfrozenadminuserAPI(params){
    return http.post('/unfrozenadminuser',params)
}
//注销管理员账户
export function deleteadminuserAPI(params){
    return http.post('/deleteadminuser',params)
}
//修改管理员信息
export function updateadmininfoAPI(params){
    return http.post('/updateadmininfo',params)
}







//用户 管理员审核

//获取所有预审状态 用户注册列表
export function preexamineduserlistAPI(params){
    return http.post('/preexamineduserlist',params)
}
//count
export function preexaminedusercountAPI(){
    return http.get('/preexaminedusercount')
}
//未过审 用户注册列表
export function fallenexamineduserlistAPI(params){
    return http.post('/fallenexamineduserlist',params)
}
//未过审count
export function fallenexaminedusercountAPI(){
    return http.get('/fallenexaminedusercount')
}
//同意过审
export function examineadmituserAPI(params){
    return http.post('/examineadmituser',params)
}
//拒绝过审
export function examinerefuseuserAPI(params){
    return http.post('/examinerefuseuser',params)
}




//获取所有预审状态 管理员注册列表
export function preexaminedadminlistAPI(params){
    return http.post('/preexaminedadminlist',params)
}
//count
export function preexaminedadmincountAPI(){
    return http.get('/preexaminedadmincount')
}
//未过审 管理员注册列表
export function fallenexaminedadminlistAPI(params){
    return http.post('/fallenexaminedadminlist',params)
}
//未过审count
export function fallenexaminedadmincountAPI(){
    return http.get('/fallenexaminedadmincount')
}
//同意过审
export function examineadmitadminAPI(params){
    return http.post('/examineadmitadmin',params)
}
//拒绝过审
export function examinerefuseadminAPI(params){
    return http.post('/examinerefuseadmin',params)
}


//添加用户
export function addoneuserAPI(params){
    return http.post('/addoneuser',params)
}
//添加管理员
export function addoneadminAPI(params){
    return http.post('/addoneadmin',params)
}



            //网站管理
//更新 修改tags
export function updatetaglistAPI(params){
    return http.post('/updatetaglist',params)
}
//
//更新 修改class
export function updateclasslistAPI(params){
    return http.post('/updateclasslist',params)
}


//获取about表 所有内容
export function allaboutpageAPI(){
    return http.get('/allaboutpage')
}
//修改 更新about表(不含图片)
export function updateaboutAPI(params){
    return http.post('/updateabout',params)
}


//about message background 共用上传图片
export function uploadwebsiteimgAPI(params,headers){
    return http.post('/uploadwebsiteimg',params,headers)
}
//上传图片后
//更新对应图片路径(共用)
export function updatewebsiteimgpathAPI(params){
    return http.post('/updatewebsiteimgpath',params)
}
//更新图片地址 
//并删除服务器图片(共用)
export function deletewebsiteimgAPI(params){
    return http.post('/deletewebsiteimg',params)
}


//获取message表 所有内容
export function allmessagepageAPI(){
    return http.get('/allmessagepage')
}
//修改 更新message表(不含图片)
export function updatemessageAPI(params){
    return http.post('/updatemessage',params)
}
//获取网站背景图
export function getbackgroundimgAPI(){
    return http.get('/getbackgroundimg')
}

//获取所有头像
export function getavatarsAPI(){
    return http.get('/getavatars')
}

//获取广告页面
export function getadvertisementAPI(){
    return http.get('/getadvertisement')
}
//更新广告页面
export function updateadvertisementAPI(params){
    return http.post('/updateadvertisement',params)
}











//权限

//获取所有角色列表
export function allrolenamelistAPI(){
    return http.get('/allrolenamelist')
}

//获取所有admin角色权限列表（表：admin_table_right）
export function adminrolelistAPI(params){
    return http.post('/adminrolelist',params)
}
//获取所有admin角色权限列表 count
export function adminrolelistcountAPI(){
    return http.get('/adminrolelistcount')
}

//获取所有Tab_List
export function alltablistAPI(){
    return http.get('/alltablist')
}
//根据 Role 获取对应身份的 Tab_List (side bar)
export function gettablistbyroleAPI(params){
    return http.post('/gettablistbyrole',params)
}

//停用某角色
export function stoproleAPI(params){
    return http.post('/stoprole',params)
}
//启用某角色
export function startroleAPI(params){
    return http.post('/startrole',params)
}
//删除某角色
export function deleteroleAPI(params){
    return http.post('/deleterole',params)
}


/**
 * 友链
 * hujie
 * 2022.05.12
 */

//获取全部友链 
export function getallfriendlinkAPI(params){
    return http.post('/getallfriendlink',params)
}
//全部友链条数 
export function getallfriendlinkcountAPI(){
    return http.get('/getallfriendlinkcount')
}

//获取一条友链 
export function getfriendlinkAPI(params){
    return http.post('/getfriendlink',params)
}
//添加友链 
export function addfriendlinkAPI(params){
    return http.post('/addfriendlink',params)
}
//删除友链
export function deletefriendlinkAPI(params){
    return http.post('/deletefriendlink',params)
}
//更新友链
export function updatefriendlinkAPI(params){
    return http.post('/updatefriendlink',params)
}



//访问量查询

export function getOneYearViewData(params){
    return http.post('/getOneYearViewData',params)
}

export function getYesterdayViewData(){
    return http.get('getYesterdayViewData')
}

//更新版本记录
//添加一条记录
export function addversionrecordAPI(params){
    return http.post('/addversionrecord',params)
}
//获取所有记录
export function getversionrecordsAPI(){
    return http.get('getversionrecords')
}
//更新记录
export function updateversionrecordAPI(params){
    return http.post('/updateversionrecord',params)
}

