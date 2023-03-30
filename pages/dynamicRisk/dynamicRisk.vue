<template>
	<!-- 风险动态模块 -->
	<view>
		<!-- <Nav :tabName="{title:'搜索',flag:false}" @screen="screenData"/> -->
		<view class="dpra">
		 <view class="companyList" v-for="(item,index) in riskActiveList" :key="index" >
		 	<view class="title">
		 		<text>{{item.cname}}</text>
				<text class="tag" :class="{heightRisk:item.riskLevel == '1',middleRisk:item.riskLevel == '2',lowerRisk:item.riskLevel == '4'}">{{item.riskLevel | delLevel}}</text>
		 	</view>
			<view class="times">
			 <text>预警时间：</text>
			 <text>{{item.createTime | delTimer}}</text>
			</view>
			<view class="abstract">
				<text>摘要：</text><text>{{item.typeDescribe}}</text>
			</view>
			<view class="btn_group">
		       <view @click="skipRoute(item.ckey,item.cname)">历史风险</view>
			   <view @click="checkRisk(item.hitNo,item.typeName)">查看风险</view>
			</view>
		 </view>
		</view>
		<!-- 弹框 -->
<!-- 	    <tm-dialog v-model="show" title="查看风险" :showCancel="false" confirmText="关闭">
			<view #default class="toolForm" >
			  <view class="executor">被执行人详情</view>
             <view class="table">
             	<view v-for="(item,index) in list" :key="index" class="table_range" style="display: flex;align-items: center;">
             		<view style="flex: 3">
             			{{item.title}}
             		</view>
					<view style="flex: 7;">
						{{item.content}}
					</view>
             	</view>
				<view >
					
				</view>
             </view>
			</view>
		</tm-dialog> -->
		<tm-loadding :load="loading" v-show="loading"></tm-loadding>
	</view>
</template>

<script>
	import Nav from '../../components/Nav.vue'
	import {getRiskList,MtgDLookRisk} from '@/api/dynamicRisk.js'
	export default {
		name:"Dynamics",
		components: {
			Nav
		},
		data() {
			return {
				show:false, //控制弹框颜色
				loading:false, //控制加载
				formData:{
					category: "",
					city: "",
					cname:"",
					district:"",
					endTime:"",
					format:"",
					groupInfo:"",
					industryNew:"",
					pageNum:1,
					pageSize:7,
					province:"",
					riskLevel:"",
					startTime:""
				},
				riskActiveList:[], //风险动态列表
				riskTotal:0, //风险列表的总条数
				// listHeader:[
				// 	'被执行人',
				// 	'执行的标',
				// 	'立案日期',
				// 	'身份证号码/ 组织机构代码',
				// 	'执行法院',
				// 	'
				// ],
				list:[
					{
						title:"被执行人",
						content:"深圳市腾讯计算机系统有限公司"
					},
					{
						title:"执行的标",
						content:"22040元"
					},
					{
						title:"立案日期",
						content:"2022-06-21"
					},
					{
						title:"身份证号码/ 组织机构代码",
						content:"91100000000****2465"
					},
					{
						title:"执行法院",
						content:"南京市栖霞区人民法院"
					},
					{
						title:"案号",
						content:"(2022)苏0113执1952号"
					},
					
				]
			}
		},
		mounted() {
			this.$nextTick(()=>{
			this.toGetRiskList()	
			})
		},
		filters: {
			// 处理风险字段格式化
			delLevel: function(val) {
				if(val == '1'){
				 return "高风险";	
				}else if(val == '2'){
				 return "中风险";
				}else if(val == '4'){
				 return "低风险";
				}
			},
			// 处理时间格式化
			delTimer:function(val){
				let data = new Date()
				let y = data.getFullYear()
				let m = data.getMonth() + 1
				let d = data.getDate()
				let hours = data.getHours()
				let minutes = data.getMinutes()
				let secounds = data.getSeconds()
				return `${y}-${m}-${d}`
			}
		},
		methods: {
		// 获取风险列表
		async toGetRiskList(){
		uni.showLoading({
			title:'数据加载中....'
		})
		 const {data:res,code} = await getRiskList(this.formData)
		 if(code === 200){
			  const newList = res.list
		      this.riskTotal = res.total
			  this.riskActiveList.push(...newList)
			  uni.hideLoading()
		 }
		},
		//筛选数据
		screenData(val){
			this.riskActiveList = []
			this.formData = {...this.formData,...val}
			this.toGetRiskList()
		},
		// 查看风险
		 checkRisk(hitNo,typeName){
			 uni.navigateTo({
			 	url:`/pages/checkRisk/checkRisk?hitNo=${hitNo}&typeName=${typeName}`
			 })
		},
			
// 辅助函数模块------------------------------------------------------------------------------------------------------
			// 跳转页面
			skipRoute(key,name){
				uni.navigateTo({
					url:`/pages/historicalRisk/historicalRisk?ckey=${key}&cname=${name}`
				})
			}
		},
		//上拉触底
		onReachBottom() {
			let  allTotal = this.formData.pageNum * this.formData.pageSize
			if(allTotal < this.riskTotal){//当前条数小于总条数 则增加请求页数
			    this.loading = true
				this.formData.pageNum ++;
				this.toGetRiskList()         //调用加载数据方法
			}else{
				this.loading = false
				console.log('已加载全部数据')
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.riskActiveList = []
			this.formData.pageNum = 1
			    //调用获取数据方法
			    this.toGetRiskList()
			    setTimeout(() => {
			        //结束下拉刷新
			      uni.stopPullDownRefresh ();
			    }, 1000)
		}

	}
</script>

<style scoped lang="scss">
	.hightRisk,.lowerRisk,.middleRisk{
		display: inline-block;
		padding: 4rpx 10rpx;
		font-size: 20rpx;
	}
	.hightRisk{
		background-color: #feeded;
		color: #FA5151 !important;
	}
	.middleRisk{
		background-color: #fff3e8;
		color: #FF8F1F !important;
	}
	.lowerRisk {
		background-color:#e5f8f1;
		color: #00B578 !important;
	}
	// 表格样式
	.toolForm{
		border-bottom: 1rpx solid rgba(0,0,0,0.08);
	}
	.executor{
		display: flex;
		justify-content: flex-start;
		margin-bottom: 16rpx;
	}
	.table_range{
	border-left: 1rpx solid rgba(0,0,0,0.08);
	border-top: 1rpx solid rgba(0,0,0,0.08);
	border-right: 1rpx solid rgba(0,0,0,0.08);
	view{
		display: flex;
		align-items: center;
	    justify-content: center;
		min-height: 60rpx;
		min-width: 35%;
		height: 100%;
	    font-size: 24rpx;
		&:first-child{
			background-color: #f8faff;
			font-family: PingFangSC-Medium, sans-serif;
			font-weight: 600;
			color: rgba(0,0,0,0.85);
		}
	}
	}
.dpra{
	padding:0 30rpx ;
	.companyList{
		background-color: #fff;
		padding:30rpx;
		margin-top: 20rpx;
		.title{
			display: flex;
			justify-content: space-between;
			text{
				font-size: 26rpx;
				font-family: PingFangSC-Medium, sans-serif;
				font-weight: normal;
				color: #262626;
			}
		}
		.times{
			text{
				line-height: 34rpx;
				font-size: 24rpx;
				font-weight: normal;
				color: rgba(0,0,0,0.6);
				&:last-child{
				color: rgba(0,0,0,0.85);
				}
			}
		}
		.abstract{
			line-height: 34rpx;
			padding-left: 40rpx;
		  font-size: 24rpx;
		  color: rgba(0,0,0,0.6);
		  text {  
			  &:frist-child{
				 color: rgba(0,0,0,0.85);
			  }
		  }
		}
		.btn_group{
			display: flex;
			justify-content: flex-end;
			margin-top: 30rpx;
			font-size: 26rpx;
			view{
				padding: 20rpx 30rpx;
				display: inline-block;
				border-radius: 40rpx;
				&:first-child{
					background-color : rgba(255,143,31,0.1);
					color: #FF8F1F;
				}
				&:last-child{
					margin-left: 20rpx;
					color: #FFFFFF;
					background-color : #2888E8;
				}
			}
			
		}
	}
	
}
</style>
