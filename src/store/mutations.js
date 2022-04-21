//更新 admin 信息
export const modifyAdminInfo = (state, obj) => {
    state.AdminInfo = obj 
}
//重置 admin 信息
export const resetAdminInfo = (state) => {
    state.AdminInfo.islogin= false
    state.AdminInfo.token= ''
    state.AdminInfo.nickname= ''
    state.AdminInfo.role= ''
    state.AdminInfo.account= ''
    state.AdminInfo.uniqueid= ''
}
//更新admin token
export const modifyToken = (state, token) => {
    state.AdminInfo.token = token 
}

