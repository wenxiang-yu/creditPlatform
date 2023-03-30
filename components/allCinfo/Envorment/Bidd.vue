<!-- 招投标 -->
<template>
	<view>
		<Model :list="list" :info="item" v-for="(item,index) in bidList" :key="index">
			<template #title>
				{{item.title}}
			</template>
		</Model>
		<view class="NOdata" v-if="!bidList.length">
			<image src="../../../static/nodata.png" class="nodataImg"></image>
			<text>暂无数据</text>
		</view>
	</view>
</template>
<script>
	import Model from '@/components/allCinfo/components/infoModel.vue'
	export default {
		props: {
			bidList: {
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
					{title:"招商类型：",content:"bidType"},
					{title:"采购人：",content:"procurePeople"},
					{title:"中标单位：",content:"winbidUnit"},
					{title:"中标金额：",content:"money"},
					{title:"发布日期：",content:"publishDate"},
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