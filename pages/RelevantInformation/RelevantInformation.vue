<template>
	<view>
	 <view class="tabs">
	 	<view class="options" v-for="(item,index) in tabsList" :key="index" :class="{activeIndex : active === index}" @click="active = index">
	 		{{item}}
	 	</view>
		<!-- 卡片主体区域 -->
	 </view>
	 <view class="main">
	 	<Mode :list="regList" :info="item" v-for="(item,index) in copyLisrt" :key="index">	
	 	</Mode>
	 </view>
	</view>
</template>

<script>
	import Mode from '@/components/allCinfo/components/infoModel.vue'
	import {getDevelopmentTrend,getRadar} from "@/api/brandTab.js"
	export default {
		components: {
			Mode
		},
		data() {
			return {
				newTaList:[], //新的数组列表
				copyLisrt:[],//优化长列表数据
				pageNum:1,
				// 发展趋势的枚举strat
				rongzi:[
				{
					title:"披露日期：",
					content:"融资情况_披露日期"
				},
				{
					title:"交易金额：",
					content:"融资情况_交易金额"
				},
				{
					title:"融资轮次：",
					content:"融资情况_融资轮次"
				},
				{
					title:"估值：",
					content:"融资情况_估值"
				},
				{
					title:"比例：",
					content:"融资情况_比例"
				},
				{
					title:"投资方：",
					content:"融资情况_投资方"
				},
				{
					title:"新闻来源：",
					content:"融资情况_新闻来源"
				}
				],
				gudong:[
					{
						title:"股东：",
						content:"股东背景_股东"
					},
					{
						title:"持股比例：",
						content:"股东背景_持股比例"
					},
					
					{
						title:"最终受益股份：",
						content:"股东背景_最终收益股份"
					},
					{
						title:"认缴出资额：",
						content:"股东背景_认缴出资额"
					},
					{
						title:"认缴出资日期：",
						content:"股东背景_认缴出资日期"
					},
				],
				touzi:[
					{
						title:"被投资企业名：",
						content:"对外投资_被投资企业名"
					},
					{
						title:"法定代表人：",
						content:"对外投资_法定代表人"
					},
					{
						title:"成立日期：",
						content:"对外投资_成立日期"
					},
					{
						title:"投资数额：",
						content:"对外投资_投资数额"
					},
					{
						title:"投资比例：",
						content:"对外投资_投资比例"
					},
					{
						title:"经营状态：",
						content:"对外投资_营业状态"
					},
					{
						title:"关联产品：",
						content:"对外投资_关联产品"
					},
					{
						title:"关联机构：",
						content:"对外投资_关联机构"
					}
					
				],
				// 发展趋势end
				// 品牌价值start
				brand:[
				{
					title:"商标名称：",
					content:"商标名称"
				},
				{
					title:"商标状态：",
					content:"商标状态"
				},
				{
					title:"国际分类：",
					content:"国际分类"
				},
				{
					title:"注册号：",
					content:"注册号"
				},
				{
					title:"注册日期：",
					content:"注册日期"
				},
				{
					title:"申请日期：",
					content:"申请日期"
				},
				],
				website:[
				{
					title:"审核日期：",
					content:"审核日期"
				},
				{
					title:"网站名称：",
					content:"网站名称"
				},
				{
					title:"网站首页：",
					content:"网站首页"
				},
				{
					title:"域名：",
					content:"域名"
				},
				{
					title:"网站备案：",
					content:"网站备案"
				},
				{
					title:"公安备案：",
					content:"公安备案"
				},
				],
				copyright:[
				{
					title:"登记批准日期：",
					content:"登记批准日期"
				},	
				{
					title:"软著全称：",
					content:"软著全称"
				},	
				{
					title:"软著简称：",
					content:"软著简称"
				},	
				{
					title:"登记号：",
					content:"登记号"
				},	
				{
					title:"分类号：",
					content:"分类号"
				},
				{
					title:"版本号：",
					content:"版本号"
				},	
				{
					title:"首次发表日期：",
					content:"首次发表日期"
				},
				],
				confine:[
				{
					title:"开庭时间：",
					content:"开庭时间"
				},
				{
					title:"案号：",
					content:"案号"
				},	
				{
					title:"案由：",
					content:"案由"
				},	
				{
					title:"案件身份：",
					content:"案件身份"
				},
				{
					title:"审理法院：",
					content:"审理法院"
				},	
				],
				flag:null, //区分值
				// 品牌价值end
				tabsList:[],
				active:null,
				mune1:[],
				mune2:[],
				mune3:[],
				mune4:[] 
			}
		},
		onLoad(option) {
			let params = JSON.parse(decodeURIComponent(option.deliver))
			console.log("url传递的值是什么",params);
			this.flag = params.name
			this.active = params.select
			if(params.name === 'DT'){
				this.tabsList = ["融资情况","股东信息","对外投资"]
				this.getDevelopmentTrend(params.brandName)
			}
			if(params.name === 'BV'){
				this.tabsList = ["品牌商标","网站信息","软著信息","争议和诉讼"]
				this.getRadar(params.brandName)
			}

		},
		mounted() {
		},
		computed: {
			regList() {
				if(this.flag === 'DT'){
					switch(this.active){
						case 0:
						return this.rongzi
						case 1:
						return this.gudong
						case 2:
						return this.touzi
					}
				}
				if(this.flag === 'BV'){
					switch(this.active){
						case 0:
						return this.brand
						case 1:
						return this.website
						case 2:
						return this.copyright
						case 3:
						return this.confine
					}
				}
			},
		},
		watch: {
			active(val){
				switch(val){
					case 0:
					this.newTaList = this.mune1
					break;
					case 1:
					this.newTaList = this.mune2
					break;
					case 2:
					this.newTaList = this.mune3
					break;
					case 3:
					this.newTaList = this.mune4
					break;
				}
			},
			newTaList:{
				handler(val){
					if(val.length < 10){
						this.copyLisrt = val.slice(0,val.length)
					}else{
						this.copyLisrt = val.slice(0,10)
					}
				},
				deep:true,
				immediate:true
			}
		},
		methods: {
		// 发展趋势数据
		 async getDevelopmentTrend(val){
		 const {code,data} = await getDevelopmentTrend(val)
		 if(code === 200){
			 for(let key in data) {
			 	// 融资情况列表
			 	if(key.slice(0,4) === "融资情况"){
			 	this.mune1.push(data[key])	
			 	}					
			 	// 股东列表数据
			 	if(key.slice(0,4) === "股东背景"){
			 	this.mune2.push(data[key])	
			 	}
			 	// 对外投资列表
			 	if(key.slice(0,4) === "对外投资"){
			 	this.mune3.push(data[key])	
			 	}					
			 }
		 }
		 },
		 // 获取品牌价值的数据
		 async getRadar(val){
		 const {code,data} = await getRadar(val)
		 if(code === 200){
			for(let key in data) {
				// 品牌商标列表
				if(key.slice(0,4) === "品牌商标"){
				this.mune1.push(data[key])	
				}					
				// 网站信息数据
				if(key.slice(0,4) === "网站信息"){
				this.mune2.push(data[key])	
				}
				// 软著信息列表
				if(key.slice(0,4) === "软著信息"){
				this.mune3.push(data[key])	
				}
				// 争议和诉讼列表
				if(key.slice(0,4) === "争议和诉讼"){
				this.mune4.push(data[key])	
				}	
			}
		 }
		 }
		},
		onReachBottom() {
			if(this.copyLisrt.length < this.newTaList.length){
				this.copyLisrt.push(...this.newTaList.slice(this.copyLisrt.length,this.copyLisrt.length + 10))
			}
		}
	}
</script>

<style lang="scss" scoped>
.activeIndex{
	border-bottom: 4rpx solid #3662EC;
	color: #3662EC;
}
 .tabs{
	 position: sticky;
	 top: 0;
	 z-index: 999;
	 display: flex;
	 justify-content: space-around;
	 height: 88rpx;
	 background: #FFFFFF;
	 border-radius: 0rpx 0rpx 0rpx 0rpx;
	 opacity: 1;
	 font-size: 28rpx;
	 font-family: $uni-ffzh;
	 font-weight: normal;
	 color: rgba(0,0,0,0.6);
	 line-height: 88rpx;
 }
 .main{
	 padding: 30rpx;
	 background-color: #f5f5f5;
 }
</style>
