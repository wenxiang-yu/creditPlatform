<template>
	<view class="brandDetail">
		<view class="banner">
				<view class="top">
					<view class="left">
					<view
						    style="
						      width: 88rpx;
						      height: 88rpx;
						      background-color: #2888e8;
						      border-radius: 8rpx;
						      color: #ffffff;
						      margin: 0 10rpx;
						      text-align: center;
						      font-size: 32rpx;
						      display: flex;
						      align-items: center;
						    "
						  >
						    {{barndTitle ? barndTitle.substring(0, 4) : "" }}
					</view>
				</view>
				<view class="right">
					<view class="title">
						{{barndTitle}}
					</view>
					<view class="prompt">
						<span>更新：2022-11-03  13:56</span>
						<span v-show="false">浏览：999万+</span>
					</view>
				</view>
				</view>
				<view class="introductionToThe">
					<span>简介：</span>无
				</view>
		        <view class="legalStaff">
			     <view class="options" v-for="(val,index) in legalStaffList2" :key="index">
				<span>{{val.title}}</span>
				<span>{{baseInfoObj[val.title]}}</span>
			     </view>
		</view>
		</view>
		<!-- 评分排名 -->
		<view class="scoreRank">
		<view class="scoreWrap">
			<view class="options" v-for="(par,index) in scoreRankList" :key="index">
				 <view class="num">
				 	{{baseInfoObj[par.title]}}
				 </view>
				 <view class="title">
				 	{{par.title}}
				 </view>
			</view>			
		</view>
		</view>
		<!-- tab栏 -->
		<view class="tabs">
		<tm-tabs  v-model="tabsActive" :list="tabsList" range-key="title" align="left" font-color="#3662EC" ></tm-tabs>
		</view>
		<view class="main_content">
		<!-- 品牌信息模块 -->
		<BrandInfo v-if= "tabsActive === 0" :option="options" :barndTitle="barndTitle"/>
		<!-- 产品运营模块 -->
		<ProductOperation v-if= "tabsActive === 1" :option="options" ref="PO"/>
		<!-- 门店运营模块 -->
		<StoreOperations v-if= "tabsActive === 2" ref="SO"/>
		<!-- 发展趋势模块 -->
		<DevelopmentTrend v-if= "tabsActive === 3" ref="DT"/>
		<!-- 品牌价值模块 -->
		<BrandValue v-if= "tabsActive === 4" ref="BV"/>
		</view>
	</view>
</template>

<script>
	import {getinfo,getMainAndBase,publicOpinionNews} from '@/api/search/brandDetail.js'
	// 品牌信息模块
	import BrandInfo from "@/components/brandTabs/BrandInformation/BrandInformation.vue"
	// 产品运营模块
	import ProductOperation from "@/components/brandTabs/ProductOperation/ProductOperation.vue"
	// 门店运营模块
	import StoreOperations from "@/components/brandTabs/StoreOperations/StoreOperations.vue"
	// 发展趋势模块
	import DevelopmentTrend from "@/components/brandTabs/DevelopmentTrend/DevelopmentTrend.vue"
	// 品牌价值模块
	import BrandValue from "@/components/brandTabs/BrandValue/BrandValue.vue"
	export default {
		name:"BRANDS",
		components: {
			BrandInfo,
			ProductOperation,
			StoreOperations,
			DevelopmentTrend,
			BrandValue
		},
		data() {
			return {
				barndTitle:"", //品牌名称
				tabsActive:0, //tabs栏选中
				baseInfoObj:{}, //基础信息集合
				headerNewsList:[],//头部展示
				tabsList:[],  //tab列表
				options:[], //传递过来的值
				legalStaffList2:[
					{
						title:"行业"
					},
					{
						title:"业态"
					},
					{
						title:"品类"
					},
				],
			scoreRankList:[
				{
					title:"品牌评分"
				},
				{
					title:"品牌评级"
				},
				{
					title:"行业排名"
				},
				{
					title:"业态排名"
				},
				{
					title:"品类排名"
				},
			],
			// tabs栏列表
				tabsList:[
					{
						title:"品牌信息"
					},
					{
						title:"产品运营"
					},
					{
						title:"门店运营"
					},
					{
						title:"发展趋势"
					},
					{
						title:"品牌价值"
					}
				],

			}
		},
		onLoad(option) {
			this.barndTitle = option.brand_name
			this.toGetinfo(option)
			this.options = option
			// tab触发
			// this.toGetMainAndBase(option)
			// this.getPublicNews(option)
		},
		watch: {
			tabsActive(val) {
				if(val === 1){
					this.$nextTick(()=>{
					this.$refs.PO.getProduct(this.options)
					})	
				}else if(val === 2){
					this.$nextTick(()=>{
					this.$refs.SO.getStoreOperation(this.options)
					})						
				}else if(val === 3) {
					this.$nextTick(()=>{
					this.$refs.DT.getDevelopmentTrend(this.options)
					this.$refs.DT.brandname = this.options
					this.$refs.DT.getSurvival(this.baseInfoObj["行业"])
					this.$refs.DT.getCategroy(this.baseInfoObj["行业"],this.baseInfoObj["业态"])
					this.$refs.DT.getFormat(this.baseInfoObj["行业"],this.baseInfoObj["业态"],this.baseInfoObj["品类"])
					})						
				}else if(val === 4){
					this.$nextTick(()=>{
					this.$refs.BV.getRadar(this.options)
					this.$refs.BV.brandname = this.options
					})	
				}
			}
		},
		methods: {
			async toGetinfo(par){
			uni.showLoading({
				title:"加载中..."
			})
			try{
			const {data} = await getinfo(par)
			this.baseInfoObj = data
			this.tabsList = this.tabsList.map(item=>{
				return {
					title:`${item.title}(${this.baseInfoObj[item.title]}分)`
				}
			})
			}catch(e){
				//TODO handle the exception
			return Promise.reject(e)
			}
			// 关闭加载
			uni.hideLoading()
			},
			
		},
		onReachBottom() {
		 uni.$emit('onReachBottom');
		}
	}
</script>

<style lang="scss" scoped>
.brandDetail{
	// background-color: #f9f9f9;
	.banner{
		padding: 30rpx 30rpx 0 30rpx;
		justify-content: space-between;
		background-color: #fff;
		.top{
		display: flex;
		.left{
		 flex: 1;
		 margin-right: 20rpx;
		  image{
			 width: 88rpx;
			 height: 88rpx;
			 border-radius: 4rpx 4rpx 4rpx 4rpx;
			 opacity: 1 
		  }
		}
		.right{
			flex: 7;
			.title{
				font-size: 32rpx;
				font-family: $uni-ffzh;
				font-weight: normal;
				color: rgba(0,0,0,0.85);
				line-height: 45rpx;
			}
			.prompt{
				span{
					&:first-child{
						font-size: 24rpx;
						font-family: $uni-ffcg;
						font-weight: normal;
						color: rgba(0,0,0,0.6);
						line-height: 34rpx;
						margin-right: 40rpx;
					}
					&:last-child{
						font-size: 24rpx;
						font-family: $uni-ffcg;
						font-weight: normal;
						color: rgba(0,0,0,0.6);
						line-height: 34rpx;
						
					}
				}
			}
		}
		}
		.introductionToThe{
			margin-top: 32rpx;
			font-size: 24rpx;
			font-family: $uni-ffcg;
			font-weight: normal;
			line-height: 36rpx;
			color:#000000 ;
			span{
				color: rgba(0,0,0,0.6);
			}
		}
		.legalStaff{
		  margin-top: 24rpx;
		  display: flex;
		  justify-content: space-around;
		  // border-bottom:1rpx solid  rgba(0,0,0,0.08);
		  padding-bottom: 20rpx;
		  .options{
			  display: flex;
			  flex-direction: column;
			  align-items: center;
			  span{
				  font-family: PingFangSC-Regular, sans-serif;
				  font-weight: normal;
				  &:first-child{
					font-size: 22rpx;
					color: #9E9E9E;  
				  }
				  &:last-child{
					  margin-top: 8rpx;
					  font-size: 24rpx;
					  color: rgba(0,0,0,0.85);
				  }
			  }
		  }
		}
	}
	// 评分排名
	.scoreRank{
		padding: 20rpx 0rpx 20rpx 30rpx;
		width: 750rpx;
		overflow-y: hidden;
		overflow-x: auto;
	 .scoreWrap{
		height: 145rpx;
		width: 890rpx;
		.options{
			display: inline-block;
			text-align: center;
			margin-right: 20rpx;
			width: 158rpx;
			height: 145rpx;
			background: #FFFFFF;
			font-weight: normal;
			.num{
				margin-top: 20rpx;
				font-size: 40rpx;
				font-family: $uni-ffzh;
				color: #3662EC;
				line-height: 56rpx;
			}
			.title{
				display: block;
				font-size: 28rpx;
				font-family: $uni-ffcg;
				color: #181818;
				line-height: 39rpx;
			}
			
		}		 
	 }

	}
	// 主体内容区域
	.main_content{
		background-color: #f5f5f5;
		padding: 30rpx;
	}
}
</style>
