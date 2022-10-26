//获取Admin uniqueId
export const uniqueid = state => state.AdminInfo.uniqueid
//获取Admin token
export const token = state => state.AdminInfo.token
//获取Admin信息
export const admininfo = state => state.AdminInfo
//获取 Admin信息的登陆状态
export const islogin = state => state.AdminInfo.islogin

//获取 Admin nickname
export const nickname = state => state.AdminInfo.nickname
//获取 Admin account
export const account = state => state.AdminInfo.account