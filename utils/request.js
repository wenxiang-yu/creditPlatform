import axios from 'axios';
import {getToken} from './auth.js'
const http = axios.create({
	baseURL: process.env.VUE_APP_URL,
	timeout: 30000
})
//请求拦截，在每个请求发出去之前，针对每个域名做不同的配置
http.interceptors.request.use(config => {
	if(getToken()){
		config.headers.Authorization = getToken()
	}
	return config
}, error => Promise.error(error))

// 响应拦截器
http.interceptors.response.use(res=>{
	if(res.data.code == 401){
		uni.redirectTo({
			url:"/pages/login/login"
		})
	} 
	return res.data
},error=>{
	return Promise.reject((error))
}
);
export default http;

