<template>
	<view>
	<!-- 联系信息 -->
	<Block>
	<view class="factorySHOW">
		联系信息
	</view>
	<view class="contentls">
	 <view class="options">
	 	<view class="tt">
	 		联系电话（{{phoneList.length}}）
	 	</view>
		<view class="tp">
			<text v-for="(item,index) in phoneList" :key="index">{{item}}</text>
		</view>
	 </view>
	 <view class="options">
	 	<view class="tt">
	 	联系邮箱（{{emailList.length}}）
	 	</view>
	 		<view class="tp">
	 			<text v-for="(item,index) in emailList" :key="index">{{item}}</text>
	 		</view>
	 </view>
	 <view class="options">
	 	<view class="tt">
	 	公司网址
	 	</view>
		<view class="tw">
			{{businessObj.link || "-"}}
		</view>
	 </view>
	 <view class="options">
	 	<view class="tt">
	 	经营地址
	 	</view>
		<view class="tw">
			{{businessObj.registAddress || "-"}}
		</view>
	 </view>
	</view>
	</Block>
	<view class="NOdata" v-if="!businessObj">
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
			businessObj: {
				type: Object,
				default: ()=>{}
			},
		},
		data() {
			return {
				phoneList:[], //电话列表
				emailList:[],//邮箱列表
				linkList:[
				{title:"联系电话",content:"contactNumber"},	
				{title:"联系邮箱",content:"email"},
				{title:"公司网址",content:"link"},
				{title:"经营地址",content:"registAddress"},
				]
			}
		},
		watch: {
			businessObj:{
				handler(val){
					let copyVal = JSON.parse(JSON.stringify(val))
					if(copyVal.contactNumber){
					 this.phoneList = copyVal.contactNumber.split(" ")
					}
					if(copyVal.email){
						this.emailList = copyVal.email.split(" ")
					}
				},
				deep:true,
				immediate:true
			}
		},
		methods: {
			clickTab(val){
				console.log("此时点击的时什么",val);
			}
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
		.contentls{
			.options{
				font-family: $uni-ffcg;
				font-weight: normal;
				margin-bottom: 30rpx;
				.tt{
					font-size: 24rpx;
					color: rgba(0,0,0,0.6);
					line-height: 28rpx;
					margin-bottom: 10rpx;
				}
				.tp{
				 color: #3662EC; 
				 font-size: 26rpx;
				 color: #3662EC;
				 line-height: 30rpx;
				 text{
					 position: relative;
					 display: inline-block;
					 padding: 0 10rpx;
					 border-right: 1rpx solid #262626;
					 &:last-child{
						 border-right: none;
					 }
					 &:first-child{
						 padding-left: 0;
					 }
				 }
				}
				.tw{
				font-size: 26rpx;
				font-family: $uni-ffcg;
				font-weight: normal;
				color: rgba(0,0,0,0.85);
				line-height: 42rpx;	
				}
			}
		}
</style>
