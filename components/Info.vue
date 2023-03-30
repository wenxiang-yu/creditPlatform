<template>
	<view class="card">
		<view class="title">
			<slot></slot>
		</view>
		<view class="contentop">
			<view class="rows" 
			 v-for="(item,index) in (
			 listRange === 1 ? baseInfoList :
			 listRange === 2 ? businessEnvironmentList :
			 listRange === 3 ? operatingConditionList :
			 listRange === 4 ? developmentPotentialList :
			 listRange === 5 ? complianceInformationList :
			 [])"
			 :key="index">
			<view class="option" v-for="(val,index) in item" :key="index" @click="toCompanyDetail(val.title)">
				<image :src="val.img"></image>
				<span>{{val.title}}</span>
				<span class="hode" v-show='val.title === "变更记录明细"'>(敬请期待)</span>
			</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"Info",
		props: {
			listRange: {
				type: Number,
				default:1 
			},
		},
		data() {
			return {
				// 基本信息
				baseInfoList:[
					[
					{
						img: require("../static/companyDetail/logo/base1.png"),
						title:"工商信息"
					},
					{
						img: require("../static/companyDetail/logo/base2.png"),
						title:"联系信息"
					},
					{
						img: require("../static/companyDetail/logo/base3.png"),
						title:"股东信息"
					},
					{
						img: require("../static/companyDetail/logo/base4.png"),
						title:"高管信息"
					}
					],
					[
					{
						img: require("../static/companyDetail/logo/base5.png"),
						title:"对外投资"
					},
					{
						img: require("../static/companyDetail/logo/base6.png"),
						title:"分支机构"
					},	
					]	
				
				],
				// 经营环境
				businessEnvironmentList:[
				[
				{
					img: require("../static/companyDetail/logo/be1.png"),
					title:"招投标"
				},
				{
					img: require("../static/companyDetail/logo/be2.png"),
					title:"网站备案"
				},
				{
					img: require("../static/companyDetail/logo/be3.png"),
					title:"资质证书"
				},
				{
					img: require("../static/companyDetail/logo/be4.png"),
					title:"行政许可"
				}
					]
		
				],
				// 经营情况
				operatingConditionList:[
					[
					{
						img: require("../static/companyDetail/logo/oc1.png"),
						title:"税务评级"
					},
					{
						img: require("../static/companyDetail/logo/oc2.png"),
						title:"股权出质"
					},
					{
						img: require("../static/companyDetail/logo/oc3.png"),
						title:"变更记录统计"
					},
					{
						img: require("../static/companyDetail/logo/oc4.png"),
						title:"变更记录明细"
					}
					]
	
				],
				// 发展潜力
				developmentPotentialList:[
					[
					// {
					// 	img: require("../static/companyDetail/logo/dp1.png"),
					// 	title:"舆情控制"
					// },
					{
						img: require("../static/companyDetail/logo/dp2.png"),
						title:"商标"
					},
					{
						img: require("../static/companyDetail/logo/dp3.png"),
						title:"软件著作权"
					},
					{
						img: require("../static/companyDetail/logo/dp4.png"),
						title:"专利"
					},
					{
						img: require("../static/companyDetail/logo/dp5.png"),
						title:"作品著作权"
					}
					],

				],
				//合规信息
				complianceInformationList:[
					[
					{
						img: require("../static/companyDetail/logo/ci1.png"),
						title:"经营异常"
					},
					{
						img: require("../static/companyDetail/logo/ci2.png"),
						title:"税务违法"
					},
					{
						img: require("../static/companyDetail/logo/ci3.png"),
						title:"严重违法"
					},
					{
						img: require("../static/companyDetail/logo/ci4.png"),
						title:"限制高消费"
					}	
					],
					[
					{
						img: require("../static/companyDetail/logo/ci5.png"),
						title:"法院公告"
					},
					{
						img: require("../static/companyDetail/logo/ci6.png"),
						title:"行政处罚"
					},
					{
						img: require("../static/companyDetail/logo/ci7.png"),
						title:"环保处罚"
					},
					{
						img: require("../static/companyDetail/logo/ci8.png"),
						title:"企业立案"
					}		
					],
					[
					{
						img: require("../static/companyDetail/logo/ci9.png"),
						title:"开庭公告"
					},
					{
						img: require("../static/companyDetail/logo/ci10.png"),
						title:"法院诉讼"
					},
					{
						img: require("../static/companyDetail/logo/ci11.png"),
						title:"失信被执行"
					},
					{
						img: require("../static/companyDetail/logo/ci12.png"),
						title:"失信被执行人"
					}		
					],
					[
					{
						img: require("../static/companyDetail/logo/ci13.png"),
						title:"企业欠税"
					},
					{
						img: require("../static/companyDetail/logo/ci14.png"),
						title:"企业终本"
					}	
					]
				]
			};
		},
		methods: {
			toCompanyDetail(val) {
				if(val === "变更记录明细") return
				uni.navigateTo({
					url:`/pages/companyInfo/companyInfo?skip=${val}`
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
.card{
	padding:0 30rpx 30rpx 30rpx;
	margin-top: 20rpx;
	background-color: #fff;
	.title{
		height: 105rpx;
		font-size: 32rpx;
		font-family:$uni-ffzh;
		font-weight: normal;
		color: rgba(0,0,0,0.85);
		line-height: 105rpx;
		border-bottom: 1rpx solid rgba(0,0,0,0.04);
	}
	.contentop{
		.rows{
		display: flex;
		flex-wrap: wrap;
		border-bottom: 1rpx solid rgba(0,0,0,0.04);
		&:last-child{
			border-bottom: none;
		}
		.option{
			position: relative;
			height: 158rpx;
			width: 25%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26rpx;
			font-family: $uni-ffcg;
			font-weight: normal;
			color: rgba(0,0,0,0.85);
			line-height: 38rpx;
			position: relative;
			&::after{
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
				content: "";
				display: inline-block;
				width: 1rpx;
				height: 60rpx;
				background: rgba(0,0,0,0.04);
				opacity: 1;
			}
			image{
				width: 44rpx;
				height: 44rpx;
			}
			.hode{
				position: absolute;
				bottom: 0;
				font-size: 16rpx;
				color: gray;
			}
		}
	}
	}
}
</style>