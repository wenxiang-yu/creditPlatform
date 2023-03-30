<!-- 行政许可 -->
<template>
	<view>
		<view v-if="flag !== '变更记录明细' && flag !== '变更记录统计'">
		<Model :list="flag === '税务评级' ? list1 : flag === '股权出质' ? list2 : []" :info="item" v-for="(item,index) in regList" :key="index">
			<template #title>		
			</template>
		</Model>			
		</view>

		<view class="recoder" v-if="flag === '变更记录明细'">
		<Block v-for="(item,index) in recordList" :key="index">
		<view class="header">
			<view class="left">
				{{item.projectName}}
			</view>
			<view class="right">
				{{item.changeDate}}
			</view>
		</view>
		<view class="contentls">
		 <view class="left">
		 	<view class="fp">
		 		变更前：
		 	</view>
			<view class="tt">
				 <!-- v-for="(val,par) in item.beforeContent" :key="par" -->
				<view class="options">
					{{item.beforeContent}}
				</view>
			</view>
		 </view>
		 <view class="right">
		 	<view class="fp">
		 		变更后：
		 	</view>
			<view class="tt">
				<!-- v-for="(val,par) in item.afterContent" :key="par" -->
				<view class="options" >
					{{item.afterContent}}
				</view>
			</view>
		 </view>
		</view>
		</Block>
		</view>
		<view class="ChangeRecordStatistics" v-if="flag === '变更记录统计'">
		<Block v-for="(item,index) in Blist3" :key="index">
			<view class="listWrao" v-for="(val,par) in item" :key="par">
					<view class="left">
						{{val.title}}
					</view>
					<view class="right">
						<text>
							{{(regList[0] ? regList[0][val.content] : "-") || "-"}}
						</text>
			       </view>
				    </view>
		</Block>
		</view>

		<view class="NOdata" v-if="!regList.length">
			<image src="../../../static/nodata.png" class="nodataImg"></image>
			<text>暂无数据</text>
		</view>
	</view>
</template>
<script>
	import Model from '@/components/allCinfo/components/infoModel.vue'
	import Block from "@/components/Block.vue"
  	export default {
		props: {
			regList: {
				type: Array,
				default: ()=>[]
			},
			flag:{
				type:String,
				default:""
			},
			total:{
				type:Number,
				default:0
			},
		},
		components: {
			Model,
			Block
		},
		data() {
			return {
				list1:[
					{title:"纳税人识别号：",content:"taxIdNumber"},
					{title:"评价年度：",content:"year"},
					{title:"信用级别：",content:"creditRate"},
					{title:"评价单位：",content:"unit"}
				],
				list2:[
					{title:"质权人：",content:"pledgee"},
					{title:"出质人：",content:"pledgor"},
					{title:"登记日期：",content:"regDate"},
					{title:"登记编号：",content:"regNumber"},
					{title:"出质股权数额：",content:"equityAmount"},
					{title:"状态：",content:"state"},
					
				],
				Blist3:[
				[
					{title:"负责人变更次数：",content:"value1"},
					{title:"市场主体变更次数：",content:"value3"},
					{title:"许可经营项目变更次数：",content:"value5"},
					{title:"章程修改次数：",content:"value7"},
					{title:"经营期限变更次数：",content:"value9"},
					{title:"注册资本变更次数：",content:"value11"},
					{title:"最近一次注册资本变更日期：",content:"value13"},
					{title:"近三年投资机构入股权变化率：",content:"value15"},					
				],
				[
					{title:"高管变更次数：",content:"value2"},
					{title:"投资人变更次数：",content:"value4"},
					{title:"一般经营项目变更次数：",content:"value6"},
					{title:"经营范围变更次数：",content:"value8"},
					{title:"注册地址变更次数：",content:"value10"},
					{title:"实收资本变更次数：",content:"value12"},
					{title:"最近一次注册资本变化率：",content:"value14"},
					{title:"近三年法入股权降低率：",content:"value16"},					
				]
				],
				recordList:[]
			}
		},
		watch: {
			regList:{
				handler(val){
					let newList = JSON.parse(JSON.stringify(val))
					this.recordList = newList.map(val=>{
						// let newAf = val.afterContent.split(",")
						// let newBf = val.beforeContent.split(",")
						return {
							...val,
							// afterContent:newAf,
							// beforeContent:newBf
						}
					})
				},
				deep:true
			}
		},
	}
</script>

<style lang="scss" scoped>
	.recoder{
		.header{
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-family:$uni-ffcg;
			font-weight: normal;
			.left{
				font-size: 30rpx;
				color: rgba(0,0,0,0.85);
				line-height: 35rpx;
			}
				
			.right{
				font-size: 26rpx;
				color: rgba(0,0,0,0.85);
				line-height: 30rpx;
			}
		}
		.contentls{
			display: flex;
			margin-top: 30rpx;
			.left,.right{
				flex: 1;
				background-color: rgba(0,0,0,0.02);
				border-radius: 5rpx;
				padding: 20rpx;
				font-family:$uni-ffcg;
				font-weight: normal;
				line-height: 30rpx;
				.fp{
					font-size: 26rpx;
					color: rgba(0,0,0,0.6);
				}
				.tt{
					margin-top: 12rpx;
					font-size: 26rpx;
					color: rgba(0,0,0,0.85);
				}
			}
			.left{
				margin-right: 20rpx;
			}
		}
	}
	.listWrao{
	display: flex;
	// justify-content: space-between;
	align-items: center;
	font-size: 26rpx;
	font-family: $uni-ffcg;
	font-weight: normal;
	line-height: 30rpx;
	margin-top: 20rpx;
	.left{
		// min-width: 50%;
		color: rgba(0,0,0,0.6);
	}
	.right{
		color: rgba(0,0,0,0.85);
		word-break: break-all;
	}
	
	}
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