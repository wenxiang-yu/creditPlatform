<template>
	<view class="personalCenter">
		<view class="banner">
			<view class="user">
				<view class="left">
				<view
					    style="
					      width: 80rpx;
					      height: 80rpx;
					      background-color: #2888e8;
					      border-radius: 80rpx;
					      color: #ffffff;
					      margin: 0 10rpx;
					      text-align: center;
					      font-size: 32rpx;
					      display: flex;
					      align-items: center;
						  justify-content: center;
						  overflow: hidden;
					    "
					  >
					 <image :src="this.info.avatar"  v-if="this.info.avatar" style="width: 100%;height: 100%;"></image>
					 <text v-else>{{this.info.nickName && this.info.nickName.slice(0,1)}}</text> 
				</view>
				</view>
				<view class="center">
					<view class="name">
						<text>{{this.info.nickName || "游客"}}</text>
						<image :src="this.info.sex === '0' ? require('../../static/userCenter/sex.png') : require('../../static/userCenter/femeal.png')" v-if="this.info.sex"></image>
					</view>
					<view class="information">
						<text style="margin-right: 30rpx;">{{this.info.phonenumber || "无"}}</text>
						<text>资料完善度：<text style="color: #FF8F1F;">30%</text></text>
						<image src="../../static/userCenter/arrowRight.png"></image>
					</view>
				</view>
				<view class="right">
					<image src="../../static/userCenter/settings.png"></image>
				</view>
			</view>
			<view class="prompt">
				<view class="options" v-for="(item,index) in infoList" :key="index">
					<text>{{item.num}}</text>
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
		<view class="body">
			<!-- 基本信息模块-->
			<view class="basicInformation">
				<view class="title">
					基本信息
				</view>
				<view class="contenter">
					<view class="rows" v-for="(item,index) in baseInfoList" :key="index">
						<view class="left">
							<image :src="item.img"></image>
							<text>{{item.title}}</text>
						</view>
						<view class="right">
							<text :class="{confrim:item.confirm === 0,noComform:item.confirm === 1}" v-show="item.confirm || item.confirm === 0">
								{{item.confirm === 0 ? "已认证" :"未认证"}}
							</text>
							<image src="../../static/userCenter/arrow.png"></image>
						</view>
					</view>
				</view>
			</view>
			<!-- 常用功能 -->
			<view class="commonlyUsedFunctions">
				<view class="title">
					常用功能
				</view>
				<view class="contenter">
					<view class="options" v-for="(item,index) in featureList" :key="index">
						<image :src="item.img"></image>
						<span>{{item.title}}</span>
					</view>
				</view>
			</view>
			<!-- 电话号码 -->
			<view class="phone">
				客服电话：400-7471818
			</view>
		</view>
		<!-- 退出登录 -->
		<view class="exitLogin" @click="exitLogin">
			退出登录
		</view>
 <tm-dialog v-model="Loginshow" content="是否退出登录？" @confirm="exit" title=""></tm-dialog>
	</view>
</template>

<script>
	import {removeToken} from '@/utils/auth.js'
	export default {
		name:"Mycenter",
		data() {
			return {
				Loginshow:false,
				info:{}, //用户信息
				infoList:[
					{
						num:23,
						title:"消息"
					},
					{
						num:23,
						title:"关注"
					},
					{
						num:23,
						title:"尽调"
					},{
						num:23,
						title:"监控"
					}
				],
				baseInfoList:[
					{
						img:require("../../static/userCenter/user.png"),
						title:"个人认证",
						confirm:0
					},
					{
						img:require("../../static/userCenter/building.png"),
						title:"企业认证",
						confirm:1
					},
					// {
					// 	img:require("../../static/userCenter/lock.png"),
					// 	title:"修改密码",
					// },
				],
				// 常用功能列表
			   featureList:[
				   {
					   img:require("../../static/userCenter/kyc.png"),
					   title:"KYC尽调"
				   },
				   {
					   img:require("../../static/userCenter/flow.png"),
					   title:"流水尽调"
				   },
				   {
					   img:require("../../static/userCenter/visite.png"),
					   title:"财务尽调"
				   },
				   {
					   img:require("../../static/userCenter/al.png"),
					   title:"AI尽调"
				   }
			   ]
			}
		},
		onLoad() {
		this.info = JSON.parse(uni.getStorageSync("USERINFO"))
		},
		methods: {
			// 退出登录
			exitLogin(){
			this.Loginshow = true	
			},
			exit(){
				uni.redirectTo({
					url:"/pages/login/login",
					success(e) {
					let page = getCurrentPages().pop()
					if(page === undefined || page == null) return
					try{
					page.onLoad()
					}catch(e){
						return console.log(e);
					}
					},
					complete() {
					removeToken()
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

.personalCenter{
	height: 100vh;
	.banner{
		position: relative;
		height: 296rpx;
		padding: 30rpx;
		background: url("../../static/userCenter/banner.png") no-repeat 38% 73%;
		background-size: 400% 400%;
		.user{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left{
				width: 88rpx;
				height: 88rpx;
				border-radius: 298rpx 298rpx 298rpx 298rpx;
				opacity: 1;	
				image{
					width: 100%;
					height: 100%;
				}
			}
			.center{
				width: 76%;
				.name{
					text{
					font-size: 36rpx;
					font-family: $uni-ffzh;
					font-weight: normal;
					color: rgba(0,0,0,0.85);
					line-height: 40rpx;	
					}
					image{
						margin-left: 14rpx;
						width: 23rpx;
						height: 23rpx;
					}
				}
				.information{
					margin-top: 14rpx;
					font-size: 24rpx;
					font-family: $uni-ffzh;
					font-weight: normal;
					color: rgba(0,0,0,0.6);
					line-height: 34rpx;
					text-align: left;
					image{
						width: 24rpx;
						height: 24rpx;
						vertical-align: middle;
					}
				}
			}
			.right{
				display: flex;
				image{
					width: 44rpx;
					height: 44rpx;
				}
			}
		}
		.prompt{
			display: flex;
			justify-content: space-around;
			align-items: center;
			position: absolute;
			bottom: -30rpx;
			width: calc(100% - 60rpx);
			height: 147rpx;
			background: #FFFFFF;
			border-radius: 12rpx 12rpx 12rpx 12rpx;
			opacity: 1;
			.options{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				text{
					&:first-child{
						font-size: 36rpx;
						font-family: $uni-ffzh;
						font-weight: normal;
						color: rgba(0,0,0,0.85);
						line-height: 50rpx;
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
	.body{
		padding: 0 30rpx;
	    .basicInformation{
		margin-top: 50rpx;
		background: #FFFFFF;
		padding: 20rpx 30rpx;
		border-radius: 12rpx 12rpx 12rpx 12rpx;
		.title{
			font-size: 30rpx;
			font-family:$uni-ffzh;
			font-weight: normal;
			color: rgba(0,0,0,0.85);
			line-height: 42rpx;
		}
		.contenter{
			.rows{
			padding: 35rpx 0;
			display: flex;
			justify-content: space-between;	
			border-bottom: 1rpx solid  rgba(0,0,0,0.04);
			.left{
				font-size: 28rpx;
				font-family: $uni-ffcg;
				font-weight: normal;
				color: rgba(0,0,0,0.85);
				line-height: 40rpx;
				image{
					height: 36rpx;
					width: 36rpx;
					vertical-align: middle;
					margin-right: 14rpx;
				}
			}
			.right{
				.confrim{
					padding: 6rpx 16rpx ;
					font-size: 22rpx;
					font-family: $uni-ffcg;
					font-weight: normal;
					line-height: 32rpx;
					color: #00B578;
					background: #e5f8f1;
					border-radius: 4rpx 4rpx 4rpx 4rpx;
				}
				.noComform{
				padding: 6rpx 16rpx ;
				font-size: 22rpx;
				font-family: $uni-ffcg;
				font-weight: normal;
				line-height: 32rpx;
				color: #FA5151;
				background: #feeeee;
				border-radius: 4rpx 4rpx 4rpx 4rpx;	
				}
				image{
					height: 32rpx;
					width: 32rpx;
					vertical-align: middle;
				}
			}
			}
			
		}
	}
	.commonlyUsedFunctions{
		margin-top: 20rpx;
		background: #FFFFFF;
		padding: 20rpx 30rpx;
		border-radius: 12rpx 12rpx 12rpx 12rpx;
		.title{
			font-size: 30rpx;
			font-family:$uni-ffzh;
			font-weight: normal;
			color: rgba(0,0,0,0.85);
			line-height: 42rpx;
		}
		.contenter{
			margin-top: 25rpx;
			display: flex;
			justify-content: space-around;
			.options{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 24rpx;
				font-family: $uni-ffcg;
				font-weight: normal;
				color: rgba(0,0,0,0.85);
				line-height: 34rpx;
				image{
					margin-bottom: 20rpx;
					width: 68rpx;
					height: 68rpx;
				}
			}
		}
	}
	.phone{
		margin-top: 30rpx;
		margin-bottom: 70rpx;
		text-align: center;
		font-size: 26rpx;
		font-family: $uni-ffcg;
		font-weight: normal;
		color: rgba(0,0,0,0.3);
		line-height: 36rpx;
	}
	}
	.exitLogin{
		margin: 0 30rpx;
		width: calc(100% - 60rpx);
		text-align: center;
		height: 104rpx;
		background: #FFFFFF;
		border-radius: 12rpx 12rpx 12rpx 12rpx;
		opacity: 1;
		font-size: 28rpx;
		font-family:$uni-ffzh;
		font-weight: normal;
		color: #3662EC;
		line-height: 104rpx;
	}
}
</style>
