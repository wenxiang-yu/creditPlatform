import request from '../utils/request.js'
const baseUrl = process.env.NODE_ENV === 'production' ? '/vm' : '/dev-api/vm'

// 验证码登录发送短信验证码
export const sendLoginSms =(data)=> {
    return request({
        url: baseUrl + '/system/user/sendLoginSms',
        method: 'post',
        data: data
    })
}
// 用户验证码登录
export const verifyLogin =(data)=> {
    return request({
        url: baseUrl + '/system/user/verifyLogin',
        method: 'post',
        data: data
    })
}
// 查询个人信息
export const getPersonInfo =()=> {
    return request({
        url: baseUrl + '/system/user/getLoginInfo',
        method: 'get',
    })
}
//  完善企业信息提交
export const InformationSubmit = (data)=> {
	return request({
		url: baseUrl + '/system/userInfo/informationSubmit  ',
		method: 'post',
		data: data,
	})
}