<template>
	<view>
		<Card>
			<template #title>
				门店管理
			</template>
			<view class="wrap">
				<view class="Statistical">
					<view class="options" v-for="(item,index) in StatisList" :key="index">
						<view>
							{{item.title}}
						</view>
						<view>
							{{StatisObj[item.content].toLocaleString() || '-'}}<text>{{index === 0 ? '家' : '个'}}</text>
						</view>
					</view>
				</view>
				<view class="tabs">
					<view class="options" v-for="(item,index) in tabList" :key="index" @click="tabsActive = index" :class="{active : tabsActive === index}">
						{{item}}
					</view>
				</view>
				<view class="chartWrap">
				<view class="chart" :style="{position:tabsActive === 0 ? 'relative' : 'absolute',left:tabsActive === 0 ? '0rpx' : '1500rpx'}">
					<GtUcharts
					:width="630"
					:height="408"
					:options="pineOptions1"
					 canvasId="pineOptions1"
					/>
				<view class="legal">
					<view class="options" v-for="(item,index) in pineOptions1.chartData.series[0].data" :key="index">
						<view class="left">
						<text class="git" :style="{background:pineOptions1.eopts.color[index]}"></text> <text>{{item.name}}</text>	
						</view>
						<view class="right">
							{{item.value.toLocaleString()}}%
						</view>
					</view>
				</view>
				</view>
				<view class="chart" :style="{position:tabsActive === 1 ? 'relative' : 'absolute',left:tabsActive === 1 ? '0rpx' : '1500rpx'}">
					<GtUcharts
					:width="630"
					:height="408"
					:options="pineOptions2"
					 canvasId="pineOptions2"
					/>
					<view class="legal">
						<view class="options" v-for="(item,index) in pineOptions2.chartData.series[0].data" :key="index">
							<view class="left">
							<text class="git" :style="{background:pineOptions2.eopts.color[index]}"></text> <text>{{item.name}}</text>	
							</view>
							<view class="right">
								{{item.value.toLocaleString()}}%
							</view>
						</view>
					</view>
				</view>					
				</view>
			</view>
		</Card>
		<!-- 门店管理-->
		<Card>
			<template #title>
				门店管理
			</template>
			<view class="NumberStatistical">
				<view class="options" v-for="(item,index) in storeList" :key="index">
					<view>
						{{item.index}}
					</view>
					<view class="num">
						{{item.value.toLocaleString() || '-'}}<text>{{index < 2  ? '人' : '家'}}</text>
					</view>
				</view>
			</view>
			<view class="chart">
				<GtUcharts
				:width="630"
				:height="408"
				:options="line"
				 canvasId="line"
				/>
			</view>
		</Card>
	</view>
</template>

<script>
	import Card from '../components/Card.vue'
	import GtUcharts from "@/components/gtUcharts/GtUcharts.vue";
	import {getStoreOperation} from '@/api/brandTab.js'
	import mixin from './mixin.js'
	export default {
		mixins:[mixin],
		components: {
			Card,
			GtUcharts
		},
		data() {
			return {
				StatisList:[{title:"门店管理",content:"门店数量"},{title:"覆盖省份",content:"覆盖省份数"},{title:"覆盖城市",content:"覆盖城市数"}],
				tabList:["覆盖省份","覆盖城市"],
				storeList:[
				],
				tabsActive:0,
				StatisObj:{},
				pineOptions1:{},
				pineOptions2:{}
			}
		},
		methods: {
			async getStoreOperation(val) {
			try{
			const {code,data} = await getStoreOperation(val)
			if(code == 200 ){
				// console.log("fdsfdsafdsa",data);
				this.StatisObj = data[0]
				let Propines = data[1].province.map(val=>{
					return {
						name:val.province,
						value:val.value
					}
				})
				let Citypine = data[1].city.map(val=>{
					return {
						name:val.city,
						value:val.value
					}
				})
				this.pineOptions1 = this.$Clone(this.pine)
				this.pineOptions2 = this.$Clone(this.pine)
				this.pineOptions1.chartData.series[0].data = Propines
				this.pineOptions1.chartData.series[1].data =["覆盖省份"]
				this.pineOptions2.chartData.series[0].data = Citypine
				this.pineOptions2.chartData.series[1].data =["覆盖城市"]
                this.storeList = data[3]["经营管理"]
				this.line.eopts.xAxis[0].data = data[2]["历史总企业数"].map(val=>{
					return val.year
				})
				this.line.chartData.series[0].data =  data[2]["总员工数"].map(val=>{
					return val.value
				})
				this.line.chartData.series[1].data =  data[2]["活跃企业人均雇员数"].map(val=>{
					return val.value
				})
				this.line.chartData.series[2].data =  data[2]["历史总企业数"].map(val=>{
					return val.value
				})
				this.line.chartData.series[3].data =  data[2]["活跃企业数"].map(val=>{
					return val.value
				})
				
			}				
			}catch(e){
				//TODO handle the exception
				return Promise.reject(e)
			}

			},
			rpxToPx(rpx) {
			  let scale = window.screen.width / 750;
			  return scale * rpx;
			},
		},
	}
</script>

<style lang="scss" scoped>
	.active{
		background-color: #fff;
		color: #165DFF;
	}
	.wrap{
		.Statistical{
			display: flex;
			justify-content: space-between;
			.options{
				display: flex;
				flex: 1;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-size: 26rpx;
				font-family: $uni-ffcg;
				font-weight: normal;
				color: rgba(0,0,0,0.6);
				line-height: 30rpx;
				border-right: 1rpx solid rgba(0,0,0,0.08);
				&:last-child{
					border-right: none;
				}
				view{
					&:nth-child(2){
						margin-top: 14rpx;
						font-size: 34rpx;
						font-family: $uni-ffzh;
						font-weight: normal;
						color: #3662EC;
						line-height: 40rpx;
						text{
							font-size: 24rpx;
							color: #262626;
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
			width: 264rpx;
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
		.chartWrap{
			position: relative;
			overflow: hidden;
		}
	}
	.legal{ 
		     display: flex;
			 flex-wrap: wrap;
			 .options{
				 display: flex;
				 width: 40%;
				 justify-content: space-between;
				 align-items: center;
				 margin-bottom: 19rpx;
				&:nth-child(odd){
					margin-right: 10%;
				}
				 .left{
					 display: flex;
					 align-items: center;
					 font-size: 26rpx;
					 color: #4E5969;
					 .git{
						display: inline-block;
						width: 6rpx;
						height: 29rpx;
						background: #D91AD9;
						border-radius: 100rpx 100rpx 100rpx 100rpx;
						opacity: 1; 
						margin-right: 18rpx;
					 }
				 }
				 .right{
					 color: #1D2129;
					 font-size: 26rpx;
					 font-weight: normal;
					 color: #1D2129;
				 }
			 } 
	}
	.NumberStatistical{
		display: flex;
		flex-wrap: wrap;
		text-align: center;
		.options{
		width: 50%;
		font-size: 26rpx;
		font-family: $uni-ffcg;
		font-weight: normal;
		color: rgba(0,0,0,0.6);
		line-height: 30rpx;
		&:nth-child(n+2){
			margin-bottom: 30rpx;
		}
		.num{
			margin-top: 14rpx;
			font-size: 34rpx;
			font-family: $uni-ffcg;
			font-weight: normal;
			color: #3662EC;
			line-height: 40rpx;
			text{
				color: #262626;
				font-size: 24rpx;
			}
		}
		}
	}
</style>