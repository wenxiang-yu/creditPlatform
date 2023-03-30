<template>
	<view>
	<!-- 分支机构 -->
	<Block>
	<view class="factorySHOW">
		分支机构({{total}})
	</view>
		<view class="holderList">
			<view class="options" v-for="(item,index) in BranchList" :key="index">
			<view class="top">
			<view class="left">
				<view
				  style="
				    width: 82rpx;
				    height: 82rpx;
				    background-color: #eaeffd;
				    border-radius: 4rpx;
				    color: #3662EC;
				    margin: 0 10rpx;
				    text-align: center;
				    font-size: 40rpx;
				    display: flex;
				    align-items: center;
					justify-content: center;
				  "
				>
				{{item.brancheName ? item.brancheName.slice(0,1) : ''}}
				</view>
			</view>
			<view class="right">
				<view>{{item.brancheName}}</view>
<!-- 				<view class="inOffice">
				  法定代表人
				</view> -->
			</view>						
		</view>
		<view class="bottom">
			<view class="renList" v-for="(val,ind) in execuInfoList" :key="ind">
				<view class="title">
					{{val.title}}
				</view>
				<view class="cms">
					{{item[val.content] || "-"}}
				</view>
			</view>
		</view>
		</view>
		</view>
	</Block>
	<view class="NOdata" v-if="!BranchList.length">
		<image src="../../../static/nodata.png" class="nodataImg"></image>
		<text>暂无数据</text>
	</view>
	</view>
</template>

<script>
	import Block from '@/components/Block.vue'
	export default {
		components: {
			Block,
		},
		props: {
			BranchList: {
				type: Array,
				default: ()=>[]
			},
			total:{
				type:Number,
				default:0
			},
		},
		data() {
			return {
				execuInfoList:[
					{title:"成立时间",content:"startDate"},
					{title:"状态",content:"regStatus"},
					{title:"法定代表人",content:"operName"},
				]
			}
		},
		onLoad() {
			// 获取用户工商信息
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	/* 页面无数据公共样式 */
	.NOdata{
		margin-top: 30%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.nodataImg{
			flex-shrink: 0;
			height: 200rpx;
			width: 200rpx;
		}
		text{
			font-size: 24rpx;
			color: rgba(0,0,0,0.4);
		}
	}
		.factorySHOW{
			font-size: 30rpx;
			font-weight: normal;
			color: rgba(0,0,0,0.85);
			line-height: 44rpx;
			margin-bottom: 30rpx;
		}
		.holderList{
			.options{
				border-bottom: 1rpx solid rgba(0,0,0,0.08);
				padding-bottom: 30rpx;
				margin-bottom: 30rpx;
				&:last-child{
					margin-bottom: 0;
				}
				.top{
				display: flex;
				margin-bottom:30rpx ;
				.left{
					margin-right: 15rpx;
				}
				.right{
					&>view{
						font-size: 28rpx;
						font-family: $uni-ffzh;
						font-weight: normal;
						color: rgba(0,0,0,0.85);
						line-height: 35rpx;
					}
					.inOffice{
						display: inline-block;
						margin-top: 10rpx;
						font-size: 20rpx;
						padding: 2rpx 10rpx;
						font-family: $uni-ffcg;
						border-radius: 6rpx;
						font-weight: normal;
						background-color: #eaeffd;
						color: #3662EC;
					}
				}					
				}
				.bottom{
					display: flex;
					.renList{
						flex: 1;
						font-family: $uni-ffcg;
						font-weight: normal;
						padding: 0  0 0 15rpx;
						border-right: 1rpx solid rgba(0,0,0,0.08);
						&:last-child{
						border-right:none;	
						}
						.title{
						font-size: 24rpx;
						color: rgba(0,0,0,0.6);
						line-height: 28rpx;	
						margin-bottom: 10rpx;
						}
						.cms{
						font-size: 26rpx;
						color: rgba(0,0,0,0.85);
						line-height: 30rpx;	
						}
					}
				}
			}
		}
</style>
