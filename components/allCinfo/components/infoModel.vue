<!-- card卡片样式 -->
<template>
<view class="infoModel">
 <view class="title">
	 <slot name="title">
	 </slot> 
 <view class="list">
 	<view class="options" v-for="(item,index) in list" :key="index">
 		<view class="left">
			{{item.title}}
 		</view>
		<view class="right">
			<text>
				{{info[item.content] || "-"}}
			</text>
		</view>
 	</view>
 </view>
 </view>
</view>
</template>
<script>
	export default {
		props: {
			list: {
				type: Array,
				default: ()=>[]
			},
			info:{
				type:Object,
				default:()=>{}
			},
			total:{
				type:Number,
				default:0
			},
		},
		data() {
			return {
			}
		},
		
	}
</script>

<style lang="scss" scoped>
.infoModel{
	padding: 30rpx;
	background-color: #fff;
	border-radius: 10rpx;
	margin-bottom: 30rpx;
	.title{
		font-size: 30rpx;
		font-family: $uni-ffzh;
		font-weight: normal;
		color: rgba(0,0,0,0.85);
		line-height: 46rpx;
	}
	.list{
		margin-top: 10rpx;
		.options{
			display: flex;
			// justify-content: space-between;
			align-items: center;
			font-size: 26rpx;
			font-family: $uni-ffcg;
			font-weight: normal;
			line-height: 30rpx;
			margin-top: 20rpx;
			.left{
				// white-space: nowrap;
				max-width: 50%;
				color: rgba(0,0,0,0.6);
			}
			.right{
				color: rgba(0,0,0,0.85);
				word-break: break-all;
			}
		}
	}
}	
</style>