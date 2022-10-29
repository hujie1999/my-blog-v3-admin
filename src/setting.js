//环境
const env = process.env.NODE_ENV
//后台域名
const domainName = 'https://www.xiaohai-learn.pub'


export default {

    //api 路径
    apibaseurl:env=='development'
    ?'/admin':env=='production'
    ?`${domainName}/api/admin`:'unkonw env!!!',
    // apibaseurl : '/admin',
    // apibaseurl : 'https://www.xiaohai-learn.pub/api/admin',


    //图片基础路径
    userimgbaseurl:env=='development'
    ?'http://localhost:8889':env=='production'
    ?`${domainName}/image`:'unkonw env!!!',
    // userimgbaseurl :'http://localhost:8889',
    // userimgbaseurl :'https://www.xiaohai-learn.pub/image',
    
    //summary图片只规定上传一张，重复上传为替换
   

    //content上传图片最大数量
    contentimgmaxcount:30,

    //about page 图片上传最大数量
    aboutimgsmaxcount:30,
    //message page 图片上传最大数量
    messageimgsmaxcount:30,

    //backgroundimg上传数量（因为数据库结构限制，固定为一张）
    backgroundimgmaxcount:1,
    

    //博客评论管理 留言管理 评论审核 列表行数量
    //也就是 分页查询 length 长度
    commenttablelength:8,

    //用户 admin 管理 分页长度
    manageusertablelength:8,

    //权限表 管理员 分页长度
    managepriviligetablelength:8,

    //友链表 分页长度
    friendlinktablelength:8
}