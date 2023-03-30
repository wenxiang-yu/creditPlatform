<template>
	<view>
		<Card>
			<template #title>
				产品水平
			</template>
			<view>
				<view class="Business">
				 <view class="left">
				 	<view>
				 		预估营业收入
				 	</view>
					<view>
						<text>{{baseObj["预估营业收入"]  ? (baseObj["预估营业收入"] / 10000).toLocaleString() : '-'}}</text>万元
					</view>
				 </view>
				 <view class="right">
				 	<view>
				 		预估营业利润
				 	</view>	
				 <view>
					<text>{{baseObj["预估营业利润"] ? (baseObj["预估营业利润"] /10000).toLocaleString() : '-'}}</text>万元
				</view>
				 </view>
				</view>
				<view class="Location">
					<view v-for="(item,index) in localList" :key="index">
						<view>{{item.title}}</view>
						<view>
							{{baseObj[item.content] || '-'}} 
						</view>
					</view>
				</view>
				<!-- 图表区域 -->
				<view class="charts">
					<GtUcharts
					:width="630"
					:height="408"
					:options="storesTotal"
					 canvasId="storesTotal"
					/>
				</view>
			</view>
		</Card>
		<Card>
			<template #title>
				运营能力
			</template>
			<view class="charts">
				<GtUcharts
				:width="630"
				:height="408"
				:options="ability1"
				 canvasId="ability1"
				/>
			</view>
			<view class="charts">
				<GtUcharts
				:width="630"
				:height="408"
				:options="ability2"
				 canvasId="ability2"
				/>
			</view>
		</Card>
	</view>
</template>

<script>
import Card from '../components/Card.vue'
import GtUcharts from "@/components/gtUcharts/GtUcharts.vue";
import {getProductOperation} from '@/api/brandTab.js'
import mixin from './mixin.js'
export default {
	mixins:[mixin],
	components: {
		Card,
		GtUcharts
	},
	data() {
		return {
			baseObj:{},
			localList:[{title:"产品定位",content:"产品定位"},{title:"目标客户群",content:"目标客户群"},{title:"渠道深度",content:"渠道深度"}]
		}
	},
	mounted() {
		console.log("此时的值是什么");
	},
	methods: {
		// 获取产品运营的信息
		async getProduct(val){
			try{
			const {code,data} = await getProductOperation(val)
			if(code === 200){
				this.baseObj = data
				console.log("deny",this.baseObj);
				let xList = ["大城市","大中城市","中型城市","小城市","乡镇"]
				this.storesTotal.eopts.xAxis[0].data = xList
				this.ability1.eopts.xAxis[0].data = xList
				this.ability2.eopts.xAxis[0].data = xList
				this.storesTotal.chartData.series[0].data = []
				xList.forEach(val=>{
					this.storesTotal.chartData.series[0].data.push(this.baseObj[val])
				})
				this.ability1.chartData.series[0].data = [
				  this.baseObj['运营能力_开店_大城市'],
				  this.baseObj['运营能力_开店_大中城市'],
				  this.baseObj['运营能力_开店_中型城市'],
				  this.baseObj['运营能力_开店_小城市'],
				  this.baseObj['运营能力_开店_乡镇'],
				]
				this.ability1.chartData.series[1].data = [
				   this.baseObj['运营能力_闭店_大城市'],
				   this.baseObj['运营能力_闭店_大中城市'],
				   this.baseObj['运营能力_闭店_中型城市'],
				   this.baseObj['运营能力_闭店_小城市'],
				   this.baseObj['运营能力_闭店_乡镇'],
				]
				this.ability2.chartData.series[0].data = [
				  this.baseObj['运营能力_开店_大城市_占比'],
				  this.baseObj['运营能力_开店_大中城市_占比'],
				  this.baseObj['运营能力_开店_中型城市_占比'],
				  this.baseObj['运营能力_开店_小城市_占比'],
				  this.baseObj['运营能力_开店_乡镇_占比'],
				]
				this.ability2.chartData.series[1].data = [
				   this.baseObj['运营能力_开店_大城市'],
				   this.baseObj['运营能力_开店_大中城市'],
				   this.baseObj['运营能力_开店_中型城市'],
				   this.baseObj['运营能力_开店_小城市'],
				   this.baseObj['运营能力_开店_乡镇'],
				]
			}				
			}catch(e){
				return Promise.reject(e)
			}

		}
	},
}
</script>

<style lang="scss" scoped>
	.Business{
		display: flex;
		.left,.right{
			flex: 1;
			view{
				text-align: center;
				&:nth-child(1){
					font-size: 26rpx;
					font-family: $uni-ffcg;
					font-weight: normal;
					color: rgba(0,0,0,0.6);
					line-height: 30rpx;
					margin-bottom: 14rpx;
				}
				&:nth-child(2){
					font-size: 24rpx;
					font-family: $uni-ffzh;
					font-weight: normal;
					color: #262626;
					line-height: 40rpx;
					text{
						font-size: 34rpx;
						color: #3662EC;
					}
				}
			}
		}
		.left{
			border-right: 1rpx solid #ebebeb;
		}
	}
	.Location{
		display: flex;
		margin-top: 30rpx;
		height: 160rpx;
		justify-content: space-between;
		view{
			flex: 1;
			background-color: #fafafa;
			margin-right: 30rpx;
			border-radius: 10rpx;
			text-align: center;
			&:last-child{
				margin-right: 0;
				&>view{
					&:nth-child(2){
						background: linear-gradient(315deg, #3662EC 0%, #2888E8 100%);
						color: #FFFFFF;
					}
				}
			}
			&:nth-child(2){
				&>view{
					&:nth-child(2){
						background: linear-gradient(315deg, #3662EC 0%, #2888E8 100%);
						color: #FFFFFF;
					}
				}
			}
			&>view{
				font-size: 26rpx;
				&:nth-child(1){
					margin: 30rpx 0 25rpx 0;
					font-family: $uni-ffcg;
					font-weight: normal;
					color: rgba(0,0,0,0.6);
					line-height: 30rpx;
				}
				&:nth-child(2){
					display: inline-block;
					margin: 0 auto;
					background: linear-gradient(315deg, #1F2120 0%, rgba(25,20,17,0.7) 100%);
					box-shadow: 0px 3rpx 8rpx 0px rgba(0,0,0,0.16);
					border-radius: 6rpx 6rpx 6rpx 6rpx;
					color: #E5AD79;
					padding:8rpx 14rpx;
				}
			}
		}
	}
</style>