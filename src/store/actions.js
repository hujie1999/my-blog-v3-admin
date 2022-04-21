import http from '../http/http';


//刷新Token
export const actionRefeshToken = (context) =>{
    return new Promise((resolve, reject) => {
        http.post('refeshtoken').then(res=>{
            if(res.data.code==20005){
                console.log('生成新token成功')
                context.commit('modifyToken',res.data.new_token)
                let old_admininfo = JSON.parse(window.localStorage.getItem("AdminInfo"))
                old_admininfo.token = res.data.new_token
                window.localStorage.setItem('AdminInfo',JSON.stringify(old_admininfo))
                return resolve(res)
            }
        }).catch(err=>{
            reject(err)
        })
    })
      
}

