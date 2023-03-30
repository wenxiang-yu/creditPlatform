<template>
	<view>
	 <Card>
		 <template #title>
		 	市场
		 </template>
		 <view class="wrap">
		  <view class="num">
		  	<view>
		  	<text>行业利润率</text>
			<view>
				<text>{{ProfitMargin}}</text>%
			</view>
		  	</view>
			<view>
			<text>行业景气度</text>
			<view>
				<text>{{GoodDegrees}}</text>
			</view>
			</view>
		  </view>
		  <view class="chart">
		  	<GtUcharts
		  	:width="630"
		  	:height="408"
		  	:options="Radarchart1"
		  	 canvasId="Radarchart1"
		  	/>
		  </view>
		 </view>
	 </Card>
	 <Card>
		 <template #title>
			稳定性
		 </template>
		 <view class="wrap">
		  <view class="num">
		  	<view style="border-right: 0;">
		  	<text>品牌年龄</text>
		 			<view>
		 				<text>{{brangAge || '-'}}</text>
		 			</view>
		  	</view>
		  </view>
		 <view class="chart">
		 	<GtUcharts
		 	:width="630"
		 	:height="408"
		 	:options="Radarchart2"
		 	 canvasId="Radarchart2"
		 	/>
		 </view>
		 </view>

	 </Card>
	 <Card>
		 <template #title>
			领导力
		 </template>
		 <view class="chart">
		 	<GtUcharts
		 	:width="630"
		 	:height="408"
		 	:options="Radarchart3"
		 	 canvasId="Radarchart3"
		 	/>
		 </view>
	 </Card>
	 <Card>
		 <template #title>
			品牌信息
		 </template>
		<view class="tabs">
			<view class="options" v-for="(item,index) in tabList" :key="index" @click="tabsActive = index" :class="{active : tabsActive === index}">
				{{item}}
			</view>
		</view>
		<view class="relativeWrap">
			<view class="options" v-for="(val,par) in optionList" :key="par">
			 <view class="list" v-for="(item,index) in (tabsActive === 0 ? brand : tabsActive === 1 ? website : tabsActive === 2 ? copyright : tabsActive === 3 ? confine : [])" :key="index">
			 	<view>
			 		{{item.title}}
			 	</view>
				<view>
					{{val[item.content] || '-'}}
				</view>
			 </view>
			</view>
			<view class="seeMore" v-show="optionList.length === 3" @click="toSeeMore">
			 查看更多
			</view>
			<view v-if="!optionList.length" class="NOdata">
				暂无数据
			</view>
		</view>
	 </Card>
	</view>
</template>

<script>
	import Card from '../components/Card.vue'
	import GtUcharts from "@/components/gtUcharts/GtUcharts.vue";
	import mixin from './mixin.js'
	import {getRadar} from '@/api/brandTab.js'
	export default {
		mixins:[mixin],
		components: {
			Card,
			GtUcharts
		},
		data() {
			return {
			brandname:{},
			tabList:["品牌商标","网站信息","软著信息","争议和诉讼"],
			tabsActive:0,
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
			brandList:[], //品牌商标列表
			websiteList:[], //网站信息列表
			copyRightList:[], //软著信息列表
			DisputesLitigation:[], //争议与诉讼列表
			ProfitMargin:null, //利润率
			GoodDegrees:null, //景气度
			brangAge:null,//品牌年龄
			readerList: [
				{ name: '品牌知名度' },
				{ name: '行业利润率' },
				{ name: '行业景气度' },
			],
			readerList2: [
				{ name: '品牌年龄' },
				{ name: '售后服务' },
				{ name: '经济繁荣影响' },
				{ name: '经济衰退影响' },
			],
			readerList3: [
				{ name: '价格弹性' },
				{ name: '利润率水平' },
				{ name: '品牌层次' },
				{ name: '增长潜力' },
				{ name: '市场容量' },
				{ name: '技术含量' },
				{ name: '进入壁垒' },
			],
			Radarchart1: null,
			Radarchart2: null,
			Radarchart3: null,
			}
		},
		computed: {
			optionList(){
				if(this.tabsActive === 0) {
					return this.brandList.slice(0,3)
				}else if(this.tabsActive === 1){
					return this.websiteList.slice(0,3)
				}else if(this.tabsActive === 2){
					return this.copyRightList.slice(0,3)
				}else if(this.tabsActive === 3){
					return this.DisputesLitigation.slice(0,3)
				}
			}
		},
		methods: {
			async getRadar(val) {
			const {code,data} = await getRadar(val)
			if(code === 200 ){
			console.log("deny",data);
			this.ProfitMargin = data["行业利润率"]
			this.GoodDegrees =  data["行业景气度"]
			this.brangAge = data["品牌年龄"]
			 this.Radarchart1 = this.$Clone(this.Radar)
			 this.Radarchart2 = this.$Clone(this.Radar)
			 this.Radarchart3 = this.$Clone(this.Radar)
			this.Radarchart1.eopts.radar.indicator = this.readerList
			this.Radarchart1.eopts.radar['radius'] = 70
			this.Radarchart1.eopts.radar['center'] = ['50%','60%'],
			this.Radarchart1.eopts.tooltip.formatter = (params)=>{
			return `${params.name}\n品牌知名度：${params.value[0] == -5 ? params.value[0]*1 + 5 : params.value[0]}\n行业利润率：${params.value[1] == -5 ? params.value[1]*1 + 5 : params.value[1]}\n行业景气度：${params.value[2] == -5 ? params.value[2]*1 + 5 :params.value[2]}`
			} 
			this.Radarchart1.chartData.series[0].data[0]['name']="市场"
			this.Radarchart1.chartData.series[0].data[0].value = [
				data['市场_品牌知名度'] == 0 ? data['市场_品牌知名度'] -5 : data['市场_品牌知名度'],
				data['市场_行业利润率'] == 0 ?data['市场_行业利润率'] -5 : data['市场_行业利润率'],
				data['市场_行业景气度'] == 0 ?data['市场_行业景气度'] -5 : data['市场_行业景气度'],
			]
			this.Radarchart2.eopts.radar.indicator = this.readerList2
			this.Radarchart2.eopts.radar['radius'] = 65
			this.Radarchart2.eopts.tooltip.formatter = (params)=>{
			return `${params.name}\n品牌年龄：${params.value[0] == -5 ? params.value[0]*1 + 5 : params.value[0]}\n售后服务：${params.value[1] == -5 ? params.value[1]*1 + 5 : params.value[1]}\n经济繁荣影响：${params.value[2] == -5 ? params.value[2]*1 + 5 :params.value[2]}\n经济衰退影响：${params.value[3] == -5 ? params.value[3]*1 + 5 :params.value[3]}`
			}
			this.Radarchart2.chartData.series[0].data[0]['name']="稳定性"
			this.Radarchart2.chartData.series[0].data[0].value = [
				data['稳定性_品牌年龄'] == 0 ? data['稳定性_品牌年龄'] -5 : data['稳定性_品牌年龄'],
				data['稳定性_售后服务'] == 0 ? data['稳定性_售后服务'] -5 : data['稳定性_售后服务'],
				data['稳定性_经济繁荣影响'] == 0 ? data['稳定性_经济繁荣影响']-5 : data['稳定性_经济繁荣影响'] ,
				data['稳定性_经济衰退影响'] == 0 ? data['稳定性_经济衰退影响'] -5 : data['稳定性_经济衰退影响'],
			]
			this.Radarchart3.eopts.radar.indicator = this.readerList3
			this.Radarchart3.eopts.radar['radius'] = 70
			this.Radarchart3.eopts.tooltip.formatter = (params)=>{
			return `${params.name}\n价格弹性：${params.value[0] == -5 ? params.value[0]*1 + 5 : params.value[0]}\n利润率水平：${params.value[1] == -5 ? params.value[1]*1 + 5 : params.value[1]}\n品牌层次：${params.value[2] == -5 ? params.value[2]*1 + 5 :params.value[2]}\n增长潜力：${params.value[3] == -5 ? params.value[3]*1 + 5 :params.value[3]}\n市场容量：${params.value[4] == -5 ? params.value[4]*1 + 5 :params.value[4]}\n技术含量：${params.value[5] == -5 ? params.value[5]*1 + 5 :params.value[5]}\n进入壁垒：${params.value[6] == -5 ? params.value[6]*1 + 5 :params.value[6]}
			`
			}
			this.Radarchart3.chartData.series[0].data[0]['name']="领导力"
			this.Radarchart3.chartData.series[0].data[0].value = [
				data['领导力_价格弹性'] == 0 ? data['领导力_价格弹性'] -5 : data['领导力_价格弹性'],
				data['领导力_利润率水平'] == 0 ? data['领导力_利润率水平'] -5 : data['领导力_利润率水平'] ,
				data['领导力_品牌层次'] == 0 ? data['领导力_品牌层次'] -5 : data['领导力_品牌层次'],
				data['领导力_增长潜力'] == 0 ? data['领导力_增长潜力'] -5 : data['领导力_增长潜力'],
				data['领导力_市场容量'] == 0 ? data['领导力_市场容量'] -5 : data['领导力_市场容量'],
				data['领导力_技术含量'] == 0 ? data['领导力_技术含量'] -5 : data['领导力_技术含量'],
				data['领导力_进入壁垒'] == 0 ? data['领导力_进入壁垒'] -5 : data['领导力_进入壁垒'], 
			]
			for(let key in data) {
				// 品牌商标列表
				if(key.slice(0,4) === "品牌商标"){
				this.brandList.push(data[key])	
				}					
				// 网站信息数据
				if(key.slice(0,4) === "网站信息"){
				this.websiteList.push(data[key])	
				}
				// 软著信息列表
				if(key.slice(0,4) === "软著信息"){
				this.copyRightList.push(data[key])	
				}
				// 争议和诉讼列表
				if(key.slice(0,4) === "争议和诉讼"){
				this.DisputesLitigation.push(data[key])	
				}	
			}
			}
			},
			// 查看更多
			toSeeMore(){
			 let obj = encodeURIComponent(
			 JSON.stringify({
				 name:"BV",
				 brandName:this.brandname,
				 select:this.tabsActive
			 }) 			 
			 ) 
			 uni.navigateTo({
			 	url:`/pages/RelevantInformation/RelevantInformation?deliver=${obj}`
			 })
			}
		},
	}
</script>

<style lang="scss" scoped>
	.active{
		background-color: #fff;
		color: #165DFF;
	}
	.wrap{
		.num{
			display: flex;
			&>view{
				flex: 1;
				text-align: center;
				&:first-child{
				border-right: 1rpx solid rgba(0,0,0,0.08);	
				}
				&>text{
					font-size: 26rpx;
					font-family: $uni-ffcg;
					font-weight: normal;
					color: rgba(0,0,0,0.6);
					line-height: 30rpx;
				}
				&>view{
					margin-top: 14rpx;
					font-size: 24rpx;
					color: #262626;
					text{
						color: #3662EC;
						font-size: 34rpx;
					}
				}
			}
		}
	}
	.tabs{
		display: flex;
		padding: 6rpx;
		align-items: center;
		margin:30rpx auto 0rpx;
		width: 523rpx;
		height: 54rpx;
		background: rgba(0,0,0,0.04);
		border-radius: 36rpx 36rpx 36rpx 36rpx;
		font-size: 22rpx;
		font-family: $uni-ffcg;
		font-weight: normal;
		line-height: 30rpx;
		color: #666666;
		.options{
			height: 100%;
			line-height: 42rpx;
			flex: 1;
			text-align: center;
			border-radius: 54rpx;
		}
	}
	.relativeWrap{
		.options{
			background-color: #fafafa;
			border-radius: 10rpx;
			padding: 30rpx;
			margin-top: 30rpx;
			.list{
				display: flex;
				margin-bottom: 20rpx;
				font-size: 26rpx;
				font-family: $uni-ffcg;
				font-weight: normal;
				color: rgba(0,0,0,0.6);
				line-height: 30rpx;
				view{
					&:nth-child(2){
						color: rgba(0,0,0,0.85);
					}
				}
			}
		}
		.seeMore{
			margin-top: 30rpx;
			text-align: center;
			font-size: 26rpx;
			font-family: $uni-ffcg;
			font-weight: normal;
			color: #3662EC;
			line-height: 40rpx;
		}
		.NOdata{
			margin-top: 30rpx;
			background-color: #fafafa;
			text-align: center;
			padding: 30rpx;
			border-radius: 10rpx;
			font-size: 26rpx;
		}
	}
</style>