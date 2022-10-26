import axios from 'axios'
import QS from 'qs'
import router from '../router'
import store from '../store/index'
import setting from '../setting'
const service = axios.create({
    baseURL: setting.apibaseurl,
    // timeout: 3 * 1000,
    // headers:{
    //     'Content-Type':'application/x-www-form-urlencoded'
    // }
})
service.interceptors.request.use(
    config=>{
        if(config.headers['Content-Type'] == 'multipart/form-data') {
            config.headers['Content-Type'] = 'multipart/form-data'
        }
        else{
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded'         
            // const payload = {
            //     uniqueid : store.getters.uniqueid,
            //     islogin : store.getters.islogin
            // }
            // if(config.method == 'post'){
            //     Object.assign(config.data,payload)
            // }
            // config.data = typeof config.data=='string'?config.data:QS.stringify(config.data) 

            config.data = typeof config.data=='string'?config.data:QS.stringify(config.data) 
        }
        let token = store.getters.token
        
        if(token!=''){
            // console.log(token)
            config.headers['Authorization'] = token
        }
        
        

        return config;
    },
    err=>{
        return Promise.reject(err)
    }
)


//响应拦截器
let locker = false
//refresh locker
let refresh_locker = false
//请求重试列表
let retry_list = []
service.interceptors.response.use(
    res=>{
        res.data = QS.parse(res.data)
        let code = res.data.code
        // console.log(code,'code+++++++++++++++++')
        //需重新登录
        if( code == 20001 ||
            code == 20002 ||
            code == 20003){
            let msg = res.data.msg
            
            if(!locker){
                locker = true
                store.commit('resetAdminInfo')
                window.localStorage.removeItem('AdminInfo')
                window.alert(msg)
                router.push({name:'login'})
            }
             
        }
        //不用重新登录（token 待刷新）
        else if(code==20004){
            // console.log(res.data)
            if(!refresh_locker){
                refresh_locker = true
                let conf = res.config
                return store.dispatch('actionRefeshToken').then(res=>{
                    if(res.data.code ==20002){
                        let msg = res.data.msg
                        store.commit('resetAdminInfo')
                        window.localStorage.removeItem('AdminInfo')
                        window.alert(msg)
                        router.push({name:'login'})
                        return
                    }
                    conf.headers.Authorization = store.getters.token
                    service(conf).then((res)=>{
                        try {
                            retry_list.forEach(v=>v(store.getters.token))
                        } catch (e) {
                            console.log(e)
                            router.go(0)
                        }
                        retry_list = []
                    }).catch(err=>{
                        console.log(err)
                        router.go(0)
                    })
                    
                }).catch(err=>{
                    // console.log(err)
                    store.commit('resetAdminInfo')
                    window.localStorage.removeItem('AdminInfo')
                    router.push('/login')
                }).finally(()=>{
                    refresh_locker = false
                })
                
                
            }
            else{
                return new Promise(resolve => {
                    retry_list.push(tk => {
                        res.config.headers.Authorization = tk
                         resolve(service.request(res.config));
                    });
                  });
            }
            
            
        }
        else{
            return res 
        }
        
    },
    err=>{

        return Promise.resolve(err.message)
    }
   
)

export default service
