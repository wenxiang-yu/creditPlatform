<template>
	<view class="companyDetail">
		<view class="banner">
			<view class="top">
				<view class="left">
				<view
				style="
				  width: 88rpx;
				  height: 88rpx;
				  background-color: #2888e8;
				  border-radius: 8rpx;
				  color: #ffffff;
				  margin: 0 10rpx;
				  text-align: center;
				  font-size: 32rpx;
				  display: flex;
				  align-items: center;
				"
				>
					{{companyInfo ? (companyInfo.cname ? companyInfo.cname.substring(0, 4) : '') : "" }}
				</view>
			    </view>
			<view class="right">
				<view class="title">
					{{companyInfo.cname || "暂无"}}
				</view>
				<view class="prompt">
					<text>{{companyInfo.regStatus}}</text>
					<text></text> <!-- 浏览：999万+ -->
				</view>
			</view>
			</view>
			<view class="introductionToThe">
				<text >简介：</text>{{companyInfo.info || "暂无"}} 
				<text @click="showInfo = true" v-show="companyInfo.info && companyInfo.info.length > 40">更多</text>
			</view>
	        <view class="legalStaff">
		     <view class="options" v-for="(val,index) in legalStaffList1" :key="index">
			<text>{{val.title}}</text>
			<text>{{companyInfo[val.content] || "暂无"}}</text>
		     </view>
	</view>
	<view class="updateTime">
		<view class="left">
			更新：2022-11-03  13:56
		</view>
		<view class="right">
			<view @click="address(companyInfo)">
			<image src="../../static/companyDetail/address.png" ></image>
				<text>地址</text>
			</view>
			<view @click="phone(companyInfo)">
				<image src="../../static/companyDetail/phone.png"></image>
			<text>电话</text>
			</view>
		</view>
	</view>
	</view>
	<!-- 股东信息 -->
	<view class="shareholders">
		<view class="info">
			<view class="title">
				股东信息 <text>{{holderlistcountList.length}}</text> 
			</view>
			<view class="cardList" v-for="ele in holderlistcountList" :key="ele.id">
				<view class="top">
					<view class="left">	
					<view
						    style="
						      width: 65rpx;
						      height: 65rpx;
						      background-color: #2888e8;
						      border-radius: 8rpx;
						      color: #ffffff;
						      margin: 0 10rpx;
						      text-align: center;
						      display: flex;
						      align-items: center;
							  font-size: 32rpx;
							  justify-content: center;
						    "
						  >
						    {{ele.name ? ele.name.substring(0, 1) : "" }}
					</view>
					</view>
					<view class="right">
					{{ele.name || "-"}}
					<view class="tags" v-show="ele.tag">
						<!-- ele.tag.substring(0,3) -->
					<view>
					{{ele.tag | changeTag}}	
					</view>
					</view>
					</view>
				</view>
				<view class="word">
					持股比例 <text style="margin-left: 10rpx;">{{ele.percent || '无'}}</text>
				</view>
				<view class="word">
					投资<text>-</text>家企业
				</view>
			</view>
		</view>
		<view class="member">
			<view class="title">
				重要人员
				<text>
					{{employeesList.length}}
				</text> 
			</view>
			<view class="cardList" v-for="val in employeesList" :key="val.id">
				<view class="top">
					<view class="left">	
					<view
						    style="
						      width: 65rpx;
						      height: 65rpx;
						      background-color: #2888e8;
						      border-radius: 8rpx;
						      color: #ffffff;
						      margin: 0 10rpx;
						      text-align: center;
						      display: flex;
						      align-items: center;
								font-size: 32rpx;
								justify-content: center;
						    "
						  >
						    {{val.name ? val.name.substring(0, 1) : "" }}
					</view>
					</view>
					<view class="right">
					{{val.name}}
					<view class="tags" v-show="val.job">
					<view>
					{{val.job | changeTag}}	
					</view>
						<!-- ele.tag.substring(0,3) -->
					</view>
					</view>
				</view>
				<view class="word">
					任职<text>{{val.companyNum}}</text>家企业
				</view>
			</view>
		</view>
	</view>
	<!-- 风险分析-->
	<view class="riskAnalysis" v-show="false">
	 <view class="title">
	 	风险分析
	 </view>
	 <view class="cardList" v-for="i in 8" :key="i">
	 	<view class="top">
		<text>自身风险</text>
		<text>999+</text>
	 	</view>
		<view class="contentew">
			<view >
				该企业有司法案件警示信息(9)
			</view>
			<view>
				其他（999+）
			</view>
		</view>
	 </view>
	</view>
	<!-- 卡片信息列表 -->
	<view class="cardArea">
	<Info :listRange="1">
	 基本信息
	</Info>
	<Info :listRange="2">
	 经营环境
	</Info>
	<Info :listRange="3">
	 经营情况
	</Info>
	<Info :listRange="4">
	 发展潜力
	</Info>
	<Info :listRange="5">
	 合规信息
	</Info>
	</view>
	<!-- 添加尽调模块 -->
	<view class="addAllThe">
		<view class="left">
<!-- 			<view>
				<image src="../../static/companyDetail/careful.png"></image>
				<view>
					关注
				</view>
			</view> -->
			<view>
				<image :src=" ismmoiter ? require('../../static/home/eyeactive.png') : require('../../static/companyDetail/see.png')"></image>
				<view @click="toAddMonitor(companyInfo)">
					{{ismmoiter ? '监控中' : '添加监控'}} 
				</view>
			</view>
		</view>
		<view class="right" @click="toAddViste(companyInfo)">
		{{isvisted ? '已尽调' : '添加尽调'}}	 
		</view>
	</view>
	<!-- 显示简介的内容 -->
	<tm-dialog v-model="showInfo" :content="companyInfo.info" title="简介" :showCancel="false"></tm-dialog>
		<tm-message ref="toast"></tm-message>
		<!-- 联系方式弹框 -->
		<tm-dialog v-model="showLink" :title="title" :showCancel="false" confirmText="我知道了">
			<view #default>
				<view class="outerOption" v-for="(item,index) in toastList" :key="index">
					{{item}}
				</view>
			</view>
		</tm-dialog>
	</view>
</template>

<script>
	import Info from "../../components/Info.vue"
	import {getBaseInfo,getEmployees,getholder,addViste,addMonitor,cancelViste,cancelMonitor} from "../../api/search/companyDetail.js"
	export default {
		name:"ComDetails",
		components: {
			Info
		},
		data() {
			return {
				isvisted:false,
				ismmoiter:false,
				companyInfo:{}, //公司详情信息
				employeesList:[], //高管人员列表
				holderlistcountList:[], //股东列表
				showInfo:false, //查看公司信息
				showLink:false, //查看公司联系方式
				toastList:[], //弹框信息
				title:"",
				employeesForm:{
					cname:"",
					pageNum:1,
					pageSize:10,
					type:""
				},
				legalStaffList1:[
					{
						title:"法定代表人",
						content:"operName"
					},
					{
						title:"注册资本",
						content:"registCapi"
					},
					{
						title:"成立日期",
						content:"startDate"
					},
				],
			}
		},
		onLoad(par) {
			let option = JSON.parse(par.option)
			// this.isvisted = option.viste
			// this.ismmoiter = option.monitor
			this.$store.commit("changeCname",option.cname)
			this.getBase({cname:option.cname})
			this.getholderList({cname:option.cname})
			this.getEmployeesList({cname:option.cname})
			//改变企业列表的值
			this.$store.commit("changeComtoDetail",true)
		},
		filters:{
			changeTag(val){
				let newTag = val.split(" ")
				return newTag[0]
			}
		},
		methods: {
			// 获取基础信息
			async getBase(par){
			uni.showLoading({
				title:"加载中"
			})
			const {data:res} = await getBaseInfo(par)
			this.companyInfo = res.baseinfo
			this.isvisted = res.investigated
			this.ismmoiter = res.monitored
			uni.hideLoading()
			},
			// 获取高管人员信息
			async getEmployeesList(par){
			const {data}= await getEmployees({...this.employeesForm,...par,type:"employees"})
			this.employeesList = data
			},
			// 获取股东信息
			async getholderList(par){
			const {data} = await getholder({...this.employeesForm,...par,type:"holderlistcount"})
			this.holderlistcountList = data
			},
			// 添加尽调
			async toAddViste(val){
				this.isvisted = !this.isvisted
				try{
				// 添加尽调
				if(this.isvisted){
					const {code,msg} =  await addViste({
					ckey:val.ckey,
					cname:val.cname
				})
				if(code === 200){
					this.$refs.toast.show({model:'success',label:"添加尽调成功！"})
				}else{
					this.$refs.toast.show({model:'error',label:`${msg}`})
				}
				}else{
					// 取消尽调
					const {code,msg} =  await cancelViste({
					ckey:val.ckey,
					cname:val.cname
				})
				if(code === 200){
					this.$refs.toast.show({model:'success',label:"取消尽调成功！"})
				}else{
					this.$refs.toast.show({model:'error',label:`${msg}`})
				}					
				}
			
				}catch(e){
					this.$refs.toast.show({model:'error',label:"尽调失败！"})
					//TODO handle the exception
				}
				
			},
			// 监控
			async toAddMonitor(val){
				this.ismmoiter = !this.ismmoiter
				try{
				if(this.ismmoiter){
				// 添加监控
				const {code,msg} =  await addMonitor({
					ckey:val.ckey,
					cname:val.cname
				})	
				if(code === 200){
					this.$refs.toast.show({model:'success',label:"添加监控成功！"})
				}else{
					this.$refs.toast.show({model:'error',label:`${msg}`})
				}					
				}else{
					// 取消监控
				const {code,msg} =  await cancelMonitor({
					ckey:val.ckey,
					cname:val.cname
				})	
				if(code === 200){
					this.$refs.toast.show({model:'success',label:"取消监控成功！"})
				}else{
					this.$refs.toast.show({model:'error',label:`${msg}`})
				}						
				}
			
				}catch(e){
					this.$refs.toast.show({model:'error',label:"监控失败！"})
					//TODO handle the exception
				}
			
			},
			// 点击地址
			address(val){
				this.toastList = []
				this.toastList.push(val.registAddress || 暂无)
				this.showLink = true
				this.title="地址"
				
			},
			// 点击号码
			phone(val){
				this.toastList = []
				const phone = val.contactNumber.split(" ")
				this.toastList.push(...phone || "暂无")
				this.showLink = true
				this.title="电话"
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .primary{
		background-color: transparent !important;
		color:#3662EC ;
		font-size: 28px;
		font-family: $uni-ffcg;
		font-weight: normal;
	}
	::v-deep .py-n12{
		padding-bottom: 30rpx !important;
	}
	.outerOption{
		font-size: 28rpx;
		font-family:$uni-ffcg;
		font-weight: normal;
		color: rgba(0,0,0,0.6);
		line-height: 45rpx;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid rgba(0,0,0,0.08);
	}
.companyDetail{
	.banner{
		padding: 30rpx 30rpx 0 30rpx;
		justify-content: space-between;
		background-color: #fff;
		.top{
		display: flex;
		.left{
		 flex: 1;
		 margin-right: 20rpx;
		  image{
			 width: 88rpx;
			 height: 88rpx;
			 border-radius: 4rpx 4rpx 4rpx 4rpx;
			 opacity: 1 
		  }
		}
		.right{
			flex: 7;
			.title{
				font-size: 32rpx;
				font-family: $uni-ffzh;
				font-weight: normal;
				color: rgba(0,0,0,0.85);
				line-height: 45rpx;
			}
			.prompt{
				text{
					&:first-child{
						margin-right: 30rpx;
						font-size: 20rpx;
						font-family: $uni-ffcg;
						font-weight: normal;
						color: #00B578;
						line-height: 28rpx;
						background: rgba(0,181,120,0.1);
						padding: 4rpx 10rpx;
					}
					&:last-child{
						font-size: 24rpx;
						font-family: $uni-ffcg;
						font-weight: normal;
						color: rgba(0,0,0,0.6);
						line-height: 34rpx;
						
					}
				}
			}
		}
		}
		.introductionToThe{
			position: relative;
			margin-top: 32rpx;
			font-size: 24rpx;
			font-family: $uni-ffcg;
			font-weight: normal;
			line-height: 36rpx;
			max-height: 70rpx;
		    overflow: hidden;
		    text-overflow: ellipsis;
		    display: -webkit-box;
		    -webkit-box-orient: vertical;
		    -webkit-line-clamp: 2;
			color:#000000 ;
			text{
				color: rgba(0,0,0,0.6);
				&:last-child{
					display: inline-block;
					background-color: #fff;
					width: 50rpx;
					text-align: right;
					position: absolute;
					bottom: 0;
					right: 0;
					color: #3662EC;
				}
			}
			
		}
		.legalStaff{
		  margin-top: 24rpx;
		  display: flex;
		  justify-content: space-around;
		  border-bottom:1rpx solid  rgba(0,0,0,0.08);
		  padding-bottom: 20rpx;
		  .options{
			  display: flex;
			  flex-direction: column;
			  align-items: center;
			  text{
				  font-family: PingFangSC-Regular, sans-serif;
				  font-weight: normal;
				  &:first-child{
					font-size: 22rpx;
					color: #9E9E9E;  
				  }
				  &:last-child{
					  margin-top: 8rpx;
					  font-size: 24rpx;
					  color: rgba(0,0,0,0.85);
				  }
			  }
		  }
		}
		.updateTime{
			height: 85rpx;
			display: flex;
			justify-content: space-between;
			align-content: center;
			.left{
			  font-size: 24rpx;
			  line-height: 85rpx;
			  font-family: $uni-ffcg;
			  font-weight: normal;
			  color: rgba(0,0,0,0.6);
			}
			.right{
				display: flex;
				align-items: center;
				view{
				display:flex;
				align-items: center;
				font-size: 24rpx;
				font-family: $uni-ffcg;
				font-weight: normal;
				padding: 5rpx 15rpx;
				color: #3662EC;
				width: 104rpx;
				height: 45rpx;
				background: rgba(54,98,236,0.1);
				border-radius: 228rpx 228rpx 228rpx 228rpx;
				&:first-child{
					margin-right: 16rpx;
				}
				image{
					width: 24rpx;
					height: 24rpx;
					margin-right: 5rpx;
				}
				}
			}
		}
	}
}
// 股东信息
.shareholders{
	display: flex;
	flex-direction: column;
	margin-top: 20rpx;
	background-color: #fff;
	padding: 30rpx;
	height: 419rpx;
	width: 750rpx;
	overflow-x: auto;
	overflow-y: hidden;
	.info,.member{
		flex: 1;
		display: flex;
		.title{
			flex-shrink:0;
			padding-top: 3rpx;
			width: 37rpx;
			height: 100%;
			background: rgba(54,98,236,0.1);
			border-radius: 4rpx 4rpx 4rpx 4rpx;
			font-size: 25rpx;
			font-family: $uni-ffcg;
			font-weight: normal;
			color: #3662EC;
			text-align: center;
			line-height: 34rpx;
			word-wrap: break-word;/*英文的时候需要加上这句，自动换行*/
			word-break:break-all;
			text{
				display:block;
			}
		}
		.cardList{
			flex-shrink:0;
			width: 260rpx;
			height: 178rpx;
			background: rgba(0,0,0,0.04);
			border-radius: 4rpx 4rpx 4rpx 4rpx;
			opacity: 1;
			margin-left: 16rpx;
			padding: 14rpx;
			.top{
				display: flex;
				margin-bottom: 10rpx;
				.left{
					flex-shrink: 0;
					width: 76rpx;
					height: 76rpx;
					margin-right: 14rpx;
					background: rgba(0,0,0,0.04);
					border-radius: 12rpx 12rpx 12rpx 12rpx;
					opacity: 1;	
				}
				.right{
						font-size: 24rpx;
						font-family: $uni-ffcg;
						font-weight: normal;
						color: #3662EC;
						line-height: 34rpx;
						overflow: hidden;
						text-overflow: ellipsis; //文本溢出显示省略号
						white-space: nowrap; //文本不会换行
					.tags{
						view{
						display: inline-block;
						text-align: center;
						font-size: 20rpx;
						max-width: 150rpx;
						padding: 4rpx 10rpx ;
						background-color: #FA5151;
						color: #fff;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						border-radius: 10rpx;							
						}

					}
				}
			}
			.word{
				font-size: 24rpx;
				font-family: $uni-ffcg;
				font-weight: normal;
				color: rgba(0,0,0,0.3);
				line-height: 34rpx;
				text{
					color: #3662EC;
				}
			}
		}
	}
	.info{
		margin-bottom: 10rpx;
	}
	.member{
		.cardList {
		.top{
			.right{
				color: rgba(0,0,0,0.85);
			}
		}
		.word{
			line-height: 100rpx;
		}
		}
		
	}
	}
.riskAnalysis{
	display: flex;
	width: 750rpx;
	overflow-x:auto;
	overflow-y: hidden;
	margin-top: 20rpx;
	background-color: #fff;
	padding: 30rpx;
	.title{
		flex-shrink:0;
		width: 37rpx;
		height: 167rpx;
		background: rgba(250,81,81,0.1);
		text-align: center;
		font-size: 24rpx;
		font-family: $uni-ffcg;
		font-weight: normal;
		color: #FA5151;
		line-height: 34rpx;
	}
	.cardList{
		flex-shrink:0;
		width: 227rpx;
		height: 167rpx;
		background: rgba(250,81,81,0.04);
		border-radius: 4rpx 4rpx 4rpx 4rpx;
		margin-left: 16rpx;
		padding: 14rpx;
		.top{
			display: flex;
			justify-content: space-between;
			text{
				&:first-child{
					font-size: 24rpx;
					font-family: $uni-ffcg;
					font-weight: normal;
					color: rgba(0,0,0,0.85);
					margin-right: 14rpx;
				}
				&:last-child{
					background: rgba(250,81,81,0.1);
					padding: 2rpx 10rpx;
					border-radius: 6rpx 6rpx 6rpx 6rpx;
					font-size: 20rpx;
					font-family:  $uni-ffcg;
					font-weight: normal;
					color: #FA5151;
				}
			}
		}
		.contentew{
			margin-top: 6rpx;
			font-size: 22rpx;
			font-family:$uni-ffcg;
			font-weight: normal;
			color: rgba(0,0,0,0.6);
		}
	}
	}
	.cardArea{
		background-color: #f9f9f9;
	}
	.addAllThe{
		border-top: 30rpx solid #f9f9f9;
		display: flex;
		justify-content: space-between;
		height: 172rpx;
		background-color: #fff;
		padding: 20rpx 30rpx;
		.left{
			display: flex;
			font-size: 24rpx;
			font-family:$uni-ffcg;
			font-weight: normal;
			color: rgba(0,0,0,0.5);
			line-height: 34rpx;
			view{
				display: flex;
				flex-direction: column;
				align-items: center;
				&:first-child{
					margin-right: 98rpx;
				}
				image{
					width: 48rpx;
					height: 44rpx;
				}
			}
		}
		.right{
			width: 267rpx;
			height: 88rpx;
			background: #3662EC;
			border-radius: 44rpx 44rpx 44rpx 44rpx;
			font-size: 30rpx;
			font-family: $uni-ffzh;
			font-weight: normal;
			color: #FFFFFF;
			text-align: center;
			line-height: 88rpx;
		}
	}
</style>
