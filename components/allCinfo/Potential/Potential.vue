<!-- 行政许可 -->
<template>
	<view>
		<Model :list="flag === '舆情控制' ? list1 : flag === '商标' ? list2 : flag === '软件著作权' ? list3 :flag === '专利' ?  list4 : flag === '作品著作权' ? list5 : []" 
		:info="item" v-for="(item,index) in regList" :key="index">
			<template #title>
				{{
				flag === '舆情控制' ? item.title :
				flag === '商标' ? item.tmName : 
				flag === '软件著作权' ? item.fullname :
				flag === '作品著作权' ? item.worksName : ""
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
		data() {
			return {
				list1:[
					{title:"来源：",content:"source"},
					{title:"发布时间：",content:"date"},
				],
				list2:[
					{title:"注册号：",content:"tmRegiNo"},
					{title:"国际分类：",content:"tmSort"},
					{title:"商标状态：",content:"tmStatus"},
					{title:"申请日期：",content:"appliDate"},
					{title:"注册公告日期：",content:"regiAnnoDate"},
					
				],
				list3:[
					{title:"软件简称：",content:"simplename"},
					{title:"登记号：",content:"regnum"},
					{title:"分类号：",content:"catnum"},
					{title:"版本号：",content:"version"},
					{title:"登记批准日期：",content:"regtime"},
					{title:"首次发布日期：",content:"publishtime"}
				],
				list4:[
					{title:"专利名称：",content:"name"},
					{title:"申请号：",content:"applynum"},
					{title:"申请公布号：",content:"publishnum"},
					{title:"专利类型：",content:"type"},
					{title:"申请发布日：",content:"applyDate"},
					{title:"发明者：",content:"inventor"},
					{title:"专利状态：",content:"legalStatus"},
				],
				list5:[
					{title:"登记号：",content:"regNo"},
					{title:"作品类别：",content:"worksType"},
					{title:"创作完成日期：",content:"finishDate"},
					{title:"登记日期：",content:"regDate"},
					{title:"首次发表日期：",content:"firstPublishDate"},
				],
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