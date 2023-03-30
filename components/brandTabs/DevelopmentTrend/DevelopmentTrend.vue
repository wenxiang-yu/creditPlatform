<template>
	<view>
		<Card>
		<template #title>
			行业利润趋势
		</template>
	    <view class="chart">
	    	<GtUcharts
	    	:width="630"
	    	:height="408"
	    	:options="ProfitTrends"
	    	 canvasId="ProfitTrends"
	    	/>
	    </view>
		</Card>
		<Card>
		<template #title>
			行业景气度
		</template>	
		<view class="chart">
			<GtUcharts
			:width="630"
			:height="408"
			:options="Boom"
			 canvasId="Boom"
			/>
		</view>
		</Card>
		<Card>
		<template #title>
			行业趋势
		</template>	
		<view class="chart">
			<GtUcharts
			:width="630"
			:height="408"
			:options="industryExtend"
			 canvasId="industryExtend"
			/>
		</view>
		</Card>
		<Card>
		<template #title>
			业态趋势
		</template>	
		<view class="chart">
			<GtUcharts
			:width="630"
			:height="408"
			:options="categoryExtend"
			 canvasId="categoryExtend"
			/>
		</view>
		</Card>
		<Card>
		<template #title>
			品类趋势
		</template>	
		<view class="chart">
			<GtUcharts
			:width="630"
			:height="408"
			:options="formatExtend"
			 canvasId="formatExtend"
			/>
		</view>
		</Card>
		<Card>
		<template #title>
			相关信息
		</template>	
		<view class="tabs">
			<view class="options" v-for="(item,index) in tabList" :key="index" @click="tabsActive = index" :class="{active : tabsActive === index}">
				{{item}}
			</view>
		</view>
		<view class="relativeWrap">
			<view class="options" v-for="(val,par) in optionList" :key="par">
			 <view class="list" v-for="(item,index) in (tabsActive === 0 ? rongzi : tabsActive === 1 ? gudong : tabsActive === 2 ? touzi : [])" :key="index">
			 	<view>
			 		{{item.title}}
			 	</view>
				<view>
					{{val[item.content]}}
				</view>
			 </view>
			</view>
			<view class="seeMore" v-show="optionList.length === 3" @click="toSeeMore">
			 查看更多
			</view>	
		</view>
		<view class="NOdata">
			暂无数据
		</view>
		</Card>
		<Card>
		<template #title>
			新增和关闭企业趋势
		</template>	
		<view class="chart">
			<GtUcharts
			:width="630"
			:height="408"
			:options="BusinessTrend"
			 canvasId="BusinessTrend"
			/>
		</view>
		</Card>
		<Card>
		<template #title>
			企业总数趋势
		</template>
			<view class="chart">
				<GtUcharts
				:width="630"
				:height="408"
				:options="TotalNumberTrend"
				 canvasId="TotalNumberTrend"
				/>
			</view>
		</Card>
		<Card>
		<template #title>
			开店率
		</template>	
		<view class="chart">
			<GtUcharts
			:width="630"
			:height="408"
			:options="OpenShopRate"
			 canvasId="OpenShopRate"
			/>
		</view>
		</Card>
		<Card>
		<template #title>
			关店率
		</template>	
		<view class="chart">
			<GtUcharts
			:width="630"
			:height="408"
			:options="ShuttersRate"
			 canvasId="ShuttersRate"
			/>
		</view>
		</Card>		
	</view>
</template>

<script>
	import Card from '../components/Card.vue'
	import GtUcharts from "@/components/gtUcharts/GtUcharts.vue";
	import {getDevelopmentTrend,getSurvival,getformatAndCate} from "@/api/brandTab.js"
	import mixin from './mixin.js'
	export default {
		mixins:[mixin],
		components: {
			Card,
			GtUcharts
		},
		data() {
			return {
				brandname:{},
				tabList:["融资情况","股东背景","对外投资"],
				tabsActive:0,
				financList:[], //融资列表
				ShareholdersList:[], //股东列表
				InvestmentList:[], //对外投资列表
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
				ProfitTrends:null, //利润趋势
				Boom:null, //景气
				BusinessTrend:null, //新增和关闭企业趋势
				TotalNumberTrend:null, //总数趋势
				OpenShopRate:null, //开店率
				ShuttersRate:null, //关店率
				industryExtend:null, //行业趋势
				categoryExtend:null, //业态趋势
				formatExtend:null, //品类趋势
			}
		},
		computed: {
			optionList() {
				if(this.tabsActive === 0) {
					return this.financList.slice(0,3)
				}else if(this.tabsActive === 1){
					return this.ShareholdersList.slice(0,3)
				}else if(this.tabsActive === 2){
					return this.InvestmentList.slice(0,3)
				}
			}
		},
		methods: {
			async getDevelopmentTrend(val) {
			const {code,data} = await getDevelopmentTrend(val)
			if(code === 200){
				console.log("dssdsdddd",data);
				this.ProfitTrends = this.$Clone(this.singleLine)
				this.Boom = this.$Clone(this.singleLine)
				this.BusinessTrend = this.$Clone(this.DoubleLine)
				this.TotalNumberTrend = this.$Clone(this.singleLine)
				this.OpenShopRate = this.$Clone(this.singleLine)
				this.ShuttersRate = this.$Clone(this.singleLine)
				this.ProfitTrends.eopts.xAxis[0].data =Object.keys(data["行业利润趋势"])
				this.ProfitTrends.chartData.series[0].data = Object.values(data["行业利润趋势"])
				this.Boom.eopts.xAxis[0].data = Object.keys(data["行业景气趋势"])
				this.Boom.eopts.color = ["#14C9C9"]
				this.Boom.chartData.series[0].data = Object.values(data["行业景气趋势"])
				this.BusinessTrend.eopts.xAxis[0].data = Object.keys(data["关闭"])
				this.BusinessTrend.chartData.series[0].data = Object.values(data["新增"])
				this.BusinessTrend.chartData.series[1].data = Object.values(data["关闭"])	
				this.TotalNumberTrend.eopts.xAxis[0].data = Object.keys(data["企业总数趋势"])
				this.TotalNumberTrend.eopts.yAxis[0].axisLabel.formatter = (value)=>value
				this.TotalNumberTrend.chartData.series[0].data = Object.values(data["企业总数趋势"])
				this.OpenShopRate.eopts.xAxis[0].data = Object.keys(data["开店率"])
				this.OpenShopRate.chartData.series[0].data = Object.values(data["开店率"])
				// this.OpenShopRate.eopts.yAxis[0].axisLabel.formatter = (value)=>value
				this.OpenShopRate.eopts.yAxis[0].max=100
				this.ShuttersRate.eopts.xAxis[0].data = Object.keys(data["关店率"])
				this.ShuttersRate.chartData.series[0].data = Object.values(data["关店率"])
				// this.ShuttersRate.eopts.yAxis[0].axisLabel.formatter = (value)=>value
				this.ShuttersRate.eopts.yAxis[0].max=100
				for(let key in data) {
					// 融资情况列表
					if(key.slice(0,4) === "融资情况"){
					this.financList.push(data[key])	
					}					
					// 股东列表数据
					if(key.slice(0,4) === "股东背景"){
					this.ShareholdersList.push(data[key])	
					}
					// 对外投资列表
					if(key.slice(0,4) === "对外投资"){
					this.InvestmentList.push(data[key])	
					}					
				}
				
			}
			},
			// 获取行业趋势
			async getSurvival(val){
				let obj = {
					brand_name: "",
					category: "",
					city: "",
					country: "",
					employed: "全量",
					format: "",
					industry: "",
					pro: "",
					target: "总店数",
					targets: "门店数量排行榜",
					time: "2022-01"
				}
			const {code,data}= await getSurvival({...obj,industry:val})
			if(code === 200){
				this.industryExtend = this.$Clone(this.complexLine)
				let newData = JSON.parse(JSON.stringify(data))
				for (let i = 0; i < newData.length - 1; i++) {
				  for (let j = 0; j < newData.length - 1 - i; j++) {
					if (newData[j].year > newData[j + 1].year) {
					  let temp = newData[j];
					  newData[j] = newData[j + 1];
					  newData[j + 1] = temp;
					}
				  }
				}
				this.industryExtend.eopts.xAxis[0].data = newData.map(val=>{
					return val.year
				})
				this.industryExtend.chartData.series[0].data = newData.map(val=>{
					return val.add_zhanbi
				})
				this.industryExtend.chartData.series[1].data = newData.map(val=>{
					return val.close_zhanbi
				})
				this.industryExtend.chartData.series[2].data = newData.map(val=>{
					return val.jz_zhanbi
				})
			}
			},
			// 获取业态
			async getCategroy(han,yt){
			let obj = {
				brand_name: "",
				category: "",
				city: "",
				country: "",
				employed: "全量",
				format: "",
				industry: "",
				pro: "",
				target: "总店数",
				targets: "门店数量排行榜",
				time: "2022-01"
			}
			const {code,data} =  await getformatAndCate({...obj,industry:han,category:yt})
			if(code === 200){
			this.categoryExtend = this.$Clone(this.complexLine)
			let newData = JSON.parse(JSON.stringify(data))
			for (let i = 0; i < newData.length - 1; i++) {
			  for (let j = 0; j < newData.length - 1 - i; j++) {
				if (newData[j].year > newData[j + 1].year) {
				  let temp = newData[j];
				  newData[j] = newData[j + 1];
				  newData[j + 1] = temp;
				}
			  }
			}
			this.categoryExtend.eopts.xAxis[0].axisLabel.rotate = -60
			this.categoryExtend.eopts.grid.bottom = '10%'
			this.categoryExtend.eopts.grid.right = '6%'
			this.categoryExtend.eopts.xAxis[0].data = newData.map(val=>{
				return val.year
			})
			this.categoryExtend.chartData.series[0].data = newData.map(val=>{
				return val.add_zhanbi
			})
			this.categoryExtend.chartData.series[1].data = newData.map(val=>{
				return val.close_zhanbi
			})
			this.categoryExtend.chartData.series[2].data = newData.map(val=>{
				return val.jz_zhanbi
			})
			}
			},
			// 获取品类
			async getFormat(han,yt,pl){
				let obj = {
					brand_name: "",
					category: "",
					city: "",
					country: "",
					employed: "全量",
					format: "",
					industry: "",
					pro: "",
					target: "总店数",
					targets: "门店数量排行榜",
					time: "2022-01"
				}
			const {code,data} = await getformatAndCate({...obj,industry:han,category:yt,format:pl})
			if(code === 200){
			this.formatExtend = this.$Clone(this.complexLine)
			let newData = JSON.parse(JSON.stringify(data))
			for (let i = 0; i < newData.length - 1; i++) {
			  for (let j = 0; j < newData.length - 1 - i; j++) {
				if (newData[j].year > newData[j + 1].year) {
				  let temp = newData[j];
				  newData[j] = newData[j + 1];
				  newData[j + 1] = temp;
				}
			  }
			}
			this.formatExtend.eopts.xAxis[0].axisLabel.rotate = -60
			this.formatExtend.eopts.grid.bottom = '10%'
			this.formatExtend.eopts.grid.right = '6%'
			this.formatExtend.eopts.xAxis[0].data = newData.map(val=>{
				return val.year
			})
			this.formatExtend.chartData.series[0].data = newData.map(val=>{
				return val.add_zhanbi
			})
			this.formatExtend.chartData.series[1].data = newData.map(val=>{
				return val.close_zhanbi
			})
			this.formatExtend.chartData.series[2].data = newData.map(val=>{
				return val.jz_zhanbi
			})	
			}
			},
			rpxToPx(rpx) {
			  let scale = window.screen.width / 750;
			  return scale * rpx;
			},
		 // 跳转相关信息
		 toSeeMore(){
			 let obj = encodeURIComponent(
			 JSON.stringify({
				 name:"DT",
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
	.tabs{
		display: flex;
		padding: 6rpx;
		align-items: center;
		margin:30rpx auto 0rpx;
		width: 464rpx;
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

	}
	.NOdata{
		margin-top: 30rpx;
		background-color: #fafafa;
		text-align: center;
		padding: 30rpx;
		border-radius: 10rpx;
		font-size: 26rpx;
	}
</style>