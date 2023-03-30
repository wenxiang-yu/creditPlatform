<template>
<view class="block">
	<slot>
		
	</slot>
</view>
</template>
<script>
	
</script>

<style lang="scss" scoped>
.block{
	background: #fff;
	padding: 30rpx;
	width: 100%;
	border-radius: 10rpx;
	margin-bottom: 30rpx;
	&:last-child{
		margin-bottom: 0;
	}
}
</style>