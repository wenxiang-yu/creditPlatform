<!-- 合规信息 -->
<template>
	<view>
		<Model :list="newList" :info="item" v-for="(item,index) in regList" :key="index">
			<template #title>
				{{
					flag === "税务违法" ? item.taxpayerName : 
					flag === "限制高消费" ? item.caseCode :
					flag === "法院公告" ? item.caseno:
					flag === "行政处罚" ? item.punishNumber:
					flag === "环保处罚" ? item.punishNumber:
					flag === "企业立案" ? item.caseNo:
					flag === "开庭公告" ? item.caseNo:
					flag === "法院诉讼" ? item.caseNo:
					flag === "失信被执行" ? item.caseCode:
					flag === "失信被执行人" ? item.caseNo:
					flag === "企业欠税" ? item.taxIdNumber:
					flag === "企业终本" ? item.caseCode :""
				}}
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
		},
		mounted() {
			this.delList()
		},
		methods: {
			delList() {
			this.pontenTitle.forEach((val,index)=>{
				if(val === this.flag){
					this.newList = this.listGroup[index]
				}
			})
			}
		},
		data() {
			return {
				newList:[], //新数组
				pontenTitle:["经营异常","税务违法","严重违法","限制高消费","法院公告","行政处罚","环保处罚","企业立案","开庭公告","法院诉讼","失信被执行","失信被执行人","企业欠税","企业终本"],
				listGroup:[
				[
					{title:"作品名称列入经营异常名录原因：",content:"abnormalReason"},
					{title:"作出机决定关：",content:"deciUnit"},
					{title:"移出日期：",content:"removeTime"},
					{title:"移出经营异常名录原因：",content:"removeReason"},
					{title:"列入日期：",content:"putTime"}
				],
				[
					{title:"纳税人识别号：",content:"taxpayerName"},
					{title:"注册地址：",content:"address"},
					{title:"案件性质：",content:"caseType"},
					{title:"税务机关：",content:"department"},
					{title:"主要违法事件：",content:"legalBasis"},
					{title:"根据法律依据及税务处理处罚情况：",content:"lllegalFacts"},
					{title:"法定代表人或负责人：",content:"legalPersonName"},
					{title:"发布日期：",content:"publishDate"},
					
				],
				[
					{title:"违法原因：",content:"putReason"},
					{title:"列入决定机关：",content:"putDeciUnit"},
					{title:"列入时间：",content:"putDate"},
					{title:"移出违法原因：",content:"removeReason"},
					{title:"移出机关：",content:"removeDeciUnit"},
					{title:"移出时间：",content:"removeDate"},
				],
				[
					{title:"被限制消费姓名：",content:"cname"},
					{title:"关联企业：",content:"putDate"},
					{title:"申请执行人：",content:"removeReason"},
					{title:"立案日期：",content:"caseCreateTime"},
					{title:"发布日期：",content:"caseFinalTime"},
				],
				[
					{title:"案由：",content:"reason"},
					{title:"上诉方：",content:"appellant"},
					{title:"被上诉方：",content:"appellee"},
					{title:"公告类型：",content:"annoType"},
					{title:"法院：",content:"court"},
					{title:"发布日期：",content:"publishDate"},
				],
				[
					{title:"处罚事由/违法行为类型：",content:"type"},
					{title:"出发结果/内容：",content:"content"},
					{title:"处罚单位：",content:"cname"},
					{title:"处罚日期：",content:"decisionDate"},
				],
				[
					{title:"处罚事由：",content:"punishReason"},
					{title:"处罚结果：",content:"punishContent"},
					{title:"处罚单位：",content:"punishDepartment"},
					{title:"处罚日期：",content:"publishTime"},
				],
				[
					{title:"上诉人：",content:"plaintiff"},
					{title:"被上诉人：",content:"defendant"},
					{title:"法院：",content:"court"},
					{title:"立案日期：",content:"filingDate"},
				],
				[
					{title:"上诉人：",content:"plaintiff"},
					{title:"被上诉人：",content:"defendant"},
					{title:"开庭日期：",content:"courtDate"},
					{title:"案由：",content:"caseReason"},
					{title:"法庭：",content:"courtroom"},
				],
				[
					{title:"案件名称：",content:"caseName"},
					{title:"案由：",content:"caseReason"},
					{title:"案件原告：",content:"plaintiff"},
					{title:"案件被告：",content:"defendant"},
					{title:"发布日期：",content:"publishDate"},
					{title:"判决结果：",content:"judgeResult"},
					{title:"案件金额：",content:"caseAmount"},
				],
				[
					{title:"执行法院：",content:"courtName"},
					{title:"履行情况：",content:"performance"},
					{title:"执行依据文号：",content:"gistId"},
					{title:"立案日期：",content:"regDate"},
					{title:"发布日期：",content:"publishDate"},
				],
				[
					{title:"执行标的：",content:"subject"},
					{title:"执行法院：",content:"court"},
					{title:"立案日期：",content:"recordDate"},
				],
				[
					{title:"欠税税种：",content:"taxCategory"},
					{title:"当前新发生的欠税余额：",content:"newOwnTaxBalance"},
					{title:"欠税余额：",content:"ownTaxBalance"},
					{title:"税务机关：",content:"department"},
					{title:"发布日期：",content:"publishDate"},
				],
				[
					{title:"执行法院：",content:"execCourtName"},
					{title:"未履行金额：",content:"noExecMoney"},
					{title:"被执行人姓名：",content:"zname"},
					{title:"立案日期：",content:"caseCreateTime"},
					{title:"终本日期：",content:"caseFinalTime"},
				]
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