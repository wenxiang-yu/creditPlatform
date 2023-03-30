/*
 * @Date: 2022-12-01 09:15:52
 * @LastEditors: 大濕兄
 * @LastEditTime: 2022-12-01 09:25:16
 * @name: 
 * @FilePath: /monitoringh5/store/index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 引入本地存储
import {setToken,getToken,removeToken,getCname,setCname} from '../utils/auth.js'
const store = new Vuex.Store({
	state:{
		token:getToken() || "",
		dashboardActive:0, //仪表盘切换栏
		comtoDetail:false, //公司详情页返回列表页
		companyName:getCname() || "", //获取企业详情的公司信息
		 dataList: [],// 导航下的分类数据
		 mapTypeActive:"mdfz", //地图切换tab变化
		 //分类
		 FormData: {
			 target: "总店数",//指标，默认总店数（总店数，净增店数，新开店数，关店数）
			 targets:"门店数量排行榜",
			 employed: "全量",//数据范围，默认非个体（全量，个体，非个体）
			 category: "",//业态
			 city: "",//城市
			 country: "",//地区
			 format: "",//品类
			 industry: "",//行业
			 pro: "",//省份
			 time: "",//时间
			 brand:"",//品牌
		 },
		 mapList: [],//地图选中数据
		 timeOption: [],//时间
		 typeList:[],
		 buttonList:uni.getStorageSync("premissionBs") ? uni.getStorageSync("premissionBs") : [] //权限标识按钮
	},
	mutations:{
		// 添加token
		addToken(state,data){
		setToken(data)
		state.token = data
		},
		// 清除token
		clearToken(state){
		state.token = ""
		removeToken()
		},
		changeDashboardActive(state,data){
			state.dashboardActive = data
		},
		setTypeList(state, data) {
            state.typeList = data
        },
        //地图数据
        setMapList(state, data) {
            state.mapList = data
			console.log("345",data);
        },
        //时间
        setTimeOption(state, data) {
            state.timeOption = data
        },
        //设置分类
        setFormData(state, data) {
            console.log(data, '--------');
            state.FormData = { ...state.FormData, ...data }
        },
        // 设置导航下的分类数据
        setDataList(state, data) {
            state.dataList = data;
        },
		changeMapTypeActive(state,data){
			state.mapTypeActive = data
		},
		// 改变详情页面返回列表页面
		changeComtoDetail(state,data){
			state.comtoDetail = data
		},
		// 保存详情页名
		changeCname(state,data){
			setCname(data)
			state.companyName = data
		},
		// 添加全局按钮标识
		changeButtonList(state,data){
			state.buttonList = data
			uni.setStorageSync("premissionBs",data)
		}
	},
	actions:{
		
	},
	getters:{
		
	}
})
export default store