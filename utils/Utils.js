/*
 * @Date: 2022-05-16 13:00:56
 * @LastEditors: 大濕兄
 * @LastEditTime: 2022-12-02 14:42:55
 * @name: 
 * @FilePath: /monitoringh5/utils/Utils.js
 */
import {getToken} from './auth.js'
const env = process.env.NODE_ENV === 'development' ? "/apidgt/map-api" : "/map-api"
// const env = process.env.NODE_ENV === 'development' ? "/dev-api" : "/map-api"
/**
 * @name: request
 * @msg: 
 * @param {*} url
 * @param {*} type
 * @param {*} data
 * @param {*} bl
 * @return {*}
 */
const request = function(url, type, data, bl = false, yyq = false) {
	let urls = `${!bl ? env : ''}${url}`
	let promise = new Promise(function(resolve, reject) {
		// let token = uni.getStorageSync("Token")
		uni.request({
			url: urls,
			method: type,
			dataType: "json",
			data: data,
			header: {
				'Authorization': getToken(), //自定义请求头信息
				"content-type": "application/json; charset=UTF-8",
				"X-AUTH-TOKEN": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzY1MTYzODI4MyIsImlhdCI6MTYzODkzMDAzNSwiZXhwIjoxNjcwNDY2MDM1fQ.uu92aeIq405rcP7ejLRfzt3dxlfh0r8l1qcKIYJ0PDcO8aKTF15J6U8IRlmgRI3WLis36wkrGCiaB-P_Wx-L9g",
				"X-TYCID": "11c8626057cd11ec94bf110a48ceecfb",
			},
			success: (res) => {
				switch (res.data.code) {
					case 200:
						resolve(res.data)
						break;
					case 500:
						uni.showToast({
							icon: "error",
							title: res.data.message
						})
						reject(500)
						break;
					case 502:
						uni.showToast({
							icon: "error",
							title: 502
						})
						reject(500)
						break;

					default:
						resolve(res.data)
						break;
				}

			},
			fail: (err) => {
				reject(err)
			}
		});
	})
	return promise
}
export default request
