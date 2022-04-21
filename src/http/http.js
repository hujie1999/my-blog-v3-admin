/****   http.js   ****/
import request from './request'
const http ={
    
    get(url){
        let config = {
            method: 'get',
            url:url,
        }
        return request(config)
    },
    post(url,params,headers){
        let config = {
            method: 'post',
            url:url,    
        }
        if(params)
        config.data = params
        if(headers)
        config.headers = headers
        return request(config)
    }
}
export default http