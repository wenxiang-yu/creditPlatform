<!-- 资质证书-->
<template>
	<view>
		<Model :list="list" :info="item" v-for="(item,index) in regList" :key="index">
			<template #title>
			</template>
		</Model>
		<view class="NOdata" v-if="!regList.length">
			<image src="../../../static/nodata.png" class="nodataImg"></image>
			<text>暂无数据</text>
		</view>
	</view>
</template>
<script>
	import Model from '@/components/allCinfo/components/infoModel.vue'
	export default {
		props: {
			regList: {
				type: Array,
				default: ()=>[]
			},
			total:{
				type:Number,
				default:0
			},
		},
		components: {
			Model
		},
		data() {
			return {
				list:[
					{title:"证书名称：",content:"cpmcjdy"},
					{title:"证书类型：",content:"zslx"},
					{title:"证书编号：",content:"zsbh"},
					{title:"发布日期：",content:"fzrq"},
					{title:"截止日期：",content:"jzrq"},
				]
			}
		},
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
</style>