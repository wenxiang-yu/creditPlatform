<template>
	<view>
	<!-- 工商信息模块 -->
	<!-- one -->
	<Block>
		<view class="factorySHOW">
			工商信息
		</view>
		<view class="shareholders">
			<view class="left">
				<view
				  style="
				    width: 82rpx;
				    height: 82rpx;
				    background-color: #2888e8;
				    border-radius: 4rpx;
				    color: #ffffff;
				    margin: 0 10rpx;
				    text-align: center;
				    font-size: 32rpx;
				    display: flex;
				    align-items: center;
					justify-content: center;
				  "
				>
				{{businessObj.operName ? businessObj.operName.slice(0,1) : "-"}}
				</view>
			</view>
			<view class="right">
				<text>{{businessObj.operName}}</text>
				<view class="inOffice">
					任职<text style="color: #3662EC;">1</text>家企业
				</view>
			</view>
		</view>
		<view class="Bsinfo">
			<view class="options" v-for="(val,ind) in BsinfoList1" :key="ind">
				<view>{{val.title}}</view>
				<view>{{ val.title === '经营状态'? (businessObj[val.content] && businessObj[val.content].slice(0,2)): businessObj[val.content]}}</view>
			</view>
		</view>
	</Block>
	<!-- two -->
	<Block>
		<view class="Bsinfo">
			<view class="options" v-for="(val,ind) in BsinfoList2" :key="ind">
				<view>{{val.title}}</view>
				<view>{{businessObj[val.content] || "-"}}</view>
			</view>
		</view>
	</Block>
	<!-- three -->
	<Block>
		<view class="cty">
			<view>
				企业类型
			</view>
			<text>
				其他股份有限公司(非上市)
			</text>
		</view>
		<view class="Bsinfo">
			<view class="options" v-for="(val,ind) in BsinfoList3" :key="ind">
				<view>{{val.title}}</view>
				<view>{{businessObj[val.content] || "-"}}</view>
			</view>
		</view>
	</Block>
	<!-- four -->
	<Block>
		<view class="cty2" v-for="(item,index) in enameList" :key="index">
			<view>
				{{item.title}}
			</view>
			<text>
				{{businessObj[item.content] || "-"}}
			</text>
		</view>
	</Block>
	<!-- five -->
	<Block>
		<view class="cty2" v-for="(item,index) in regisList" :key="index">
			<view>
				{{item.title}}
			</view>
			<text>
				{{businessObj[item.content] || "-"}}
			</text>
		</view>
	</Block>
	</Block>
	<view class="NOdata" v-if="!businessObj">
		<image src="../../../static/nodata.png" class="nodataImg"></image>
		<text>暂无数据</text>
	</view>
	</view>
</template>

<script>
	import Block from '@/components/Block.vue'
	// import {getBaseInfo} from "@/api/search/companyDetail.js"
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
				BsinfoList1:[
					{title:"注册资本",content:"registCapi"},
					{title:"实缴资本",content:"paidinCapi"},
					{title:"成立日期",content:"startDate"},
					{title:"经营状态",content:"tags"},
					],
				BsinfoList2:[
					{title:"统一社会信用代码",content:"creditCode"},
					{title:"工商注册号",content:"no"},
					{title:"纳税人识别号",content:"taxpayIdentiNo"},
					{title:"纳税人资质",content:"taxpayerQual"},
					{title:"组织机构代码",content:"orgNo"},
					],
				BsinfoList3:[
					{title:"行业",content:"industry"},
					{title:"营业期限",content:"timeLimit"},
					{title:"人员规模",content:"staffSize"},
					{title:"参保人数",content:"insuredNum"},
					],
				// 英文名称
				enameList:[
				 {title:"英文名称",content:"englishName"},
				 {title:"曾用名",content:"originalName"},
				],
				// 登记信息
				regisList:[
					{title:"登记机关",content:"belongOrg"},
					{title:"核准日期",content:"approvalDate"},
					{title:"注册地址",content:"registAddress"},
					{title:"经营范围",content:"scope"},
				],
			}
		},
		// beforeMount() {
		// 	this.toGetBaseInfo()
		// },
		// methods: {
		// toGetBaseInfo(val) {
		// let keys = this.$store.state.companyName
		// getBaseInfo({cname:keys}).then(({code,data})=>{
		// 	if(code === 200){
		// 		this.businessObj = data.baseinfo
		// 	}
		// })
		// }
		// },
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
			margin-bottom: 20rpx;
		}
		.shareholders{
			display: flex;
			.left{
				margin-right: 15rpx;
			}
			.right{
				&>text{
					font-size: 28rpx;
					font-family: $uni-ffzh;
					font-weight: normal;
					color: rgba(0,0,0,0.85);
					line-height: 40rpx;
				}
				.inOffice{
					margin-top: 10rpx;
					font-size: 24rpx;
					font-family: $uni-ffcg;
					font-weight: normal;
					color: rgba(0,0,0,0.6);
					line-height: 28rpx;
				}
			}
		}
		.Bsinfo{
			display: flex;
			flex-wrap: wrap;
			.options{
			width: 48%;
			margin-top: 30rpx;
			view{
				font-family: $uni-ffcg;
				font-weight: normal;
				&:nth-child(1){
					font-size: 24rpx;	
					color: rgba(0,0,0,0.6);
					line-height: 28rpx;
					margin-bottom: 23rpx;
				}
				&:nth-child(2){
					font-size: 26rpx;
					color: rgba(0,0,0,0.85);
					line-height: 30rpx
				}
			}
			&:nth-child(odd){
				border-right: 1rpx solid rgba(0,0,0,0.08);
				margin-right: 4%;
			}
			}
		}
		.cty,.cty2{
			font-weight: normal;
			font-family: $uni-ffcg;
			view{
				font-size: 24rpx;
				color: rgba(0,0,0,0.6);
				margin-bottom: 10rpx;
			}
			text{
				font-size: 26rpx;
				color: rgba(0,0,0,0.85);
			}
			.link{
				
			}
		}
		.cty2{
			margin-bottom: 30rpx;
			&:last-child{
				margin-bottom: 0;
			}
		}
</style>
