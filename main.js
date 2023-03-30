/*
 * @Date: 2022-10-31 16:07:56
 * @LastEditors: 大濕兄
 * @LastEditTime: 2022-12-16 18:13:08
 * @name: 
 * @FilePath: /monitoringh5/main.js
 */
import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import store from './store/index.js'
Vue.prototype.$store = store
Vue.config.productionTip = false

import setNewV from "@/utils/index.js";
Vue.prototype.$setNewV = setNewV

import GtNoData from "@/components/gtNoData/GtNoData.vue";
Vue.component("GtNoData", GtNoData)

function checkType(any) {
	return Object.prototype.toString.call(any).slice(8, -1)
}

function clone(any) {
	if (checkType(any) === 'Object') { // 拷贝对象
		let o = {};
		for (let key in any) {
			o[key] = clone(any[key])
		}
		return o;
	} else if (checkType(any) === 'Array') { // 拷贝数组
		var arr = []
		for (let i = 0, leng = any.length; i < leng; i++) {
			arr[i] = clone(any[i])
		}
		return arr;
	} else if (checkType(any) === 'Function') { // 拷贝函数
		return new Function('return ' + any.toString()).call(this)
	} else if (checkType(any) === 'Date') { // 拷贝日期
		return new Date(any.valueOf())
	} else if (checkType(any) === 'RegExp') { // 拷贝正则
		return new RegExp(any)
	} else if (checkType(any) === 'Map') { // 拷贝Map 集合
		let m = new Map()
		any.forEach((v, k) => {
			m.set(k, clone(v))
		})
		return m
	} else if (checkType(any) === 'Set') { // 拷贝Set 集合
		let s = new Set()
		for (let val of any.values()) {
			s.add(clone(val))
		}
		return s
	}
	return any;
}
function permissionsBs(par){
   return store.state.buttonList.some(val=>{
	return par === val
	})
}
// 深copy
Vue.prototype.$Clone = clone
// 权限全局挂载
Vue.prototype.$permissionsBs = permissionsBs
import VConsole from 'vconsole';
//调试在只在本地调试的时候出现
if(process.env.NODE_ENV === "development"){
new VConsole();
}
Vue.prototype.$formatTime = function (time, fmt) {
	if (!time) return '';
	else {
		const date = new Date(time);
		const o = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'H+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds(),
			'q+': Math.floor((date.getMonth() + 3) / 3),
			S: date.getMilliseconds(),
		};
		if (/(y+)/.test(fmt))
			fmt = fmt.replace(
				RegExp.$1,
				(date.getFullYear() + '').substr(4 - RegExp.$1.length)
			);
		for (const k in o) {
			if (new RegExp('(' + k + ')').test(fmt)) {
				fmt = fmt.replace(
					RegExp.$1,
					RegExp.$1.length === 1
						? o[k]
						: ('00' + o[k]).substr(('' + o[k]).length)
				);
			}
		}
		return fmt;
	}
}
Vue.prototype.$getURLParams = function () {
	var url = window.location.href;
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {

		var str = url.split("?")[1];
		var strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
		}
	}
	console.log(theRequest)
	return theRequest
}
App.mpType = 'app'
const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif
import tmVuetify from "./tm-vuetify";
Vue.use(tmVuetify)
// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
