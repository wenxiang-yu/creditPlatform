<!-- 卡片组件 -->
<template>
	<view class="card">
		<view class="title">
			<slot name="title"></slot>
		</view>
		<view class="wrap">
			<slot></slot>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.card{
		background-color: #fff;
		border-radius: 10rpx;
		padding: 30rpx;
		margin-bottom: 30rpx;
		.title{
			font-size: 30rpx;
			font-family: $uni-ffcg;
			font-weight: normal;
			color: rgba(0,0,0,0.85);
			line-height: 35rpx;
			margin-bottom: 30rpx;
		}
	}
</style>