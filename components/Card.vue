<!-- list的每一项 -->
<template>
	<view style="padding: 0 30rpx 20rpx 30rpx;">
	<view class="cardList" v-for="(item,index) in Newlist" :key="index">
		<view class="main">
		 <view class="exerciseValue">
		 	 <view class="left">
		 	 	  <view
		 	 	    style="
		 	 	      width: 60rpx;
		 	 	      height: 60rpx;
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
		 	 	    {{ companyOrbrand === 1 ? (item.baseinfo.cname && item.baseinfo.cname.slice(0, 1)) :(item["品牌"] ? item["品牌"].slice(0, 1) : '')}}
		 	 </view>
			 </view>
			 <view class="right">
			 	<view class="top">
			 		<view class="title">
						<view @click="checkDetails(item)">
						<span>{{item.start}}</span>
						<span style="color: red;">{{item.middle}}</span>
						<span>{{item.end}}</span>
							<!-- {{companyOrbrand === 1 ? item.baseinfo.cname :item["品牌"]}} -->
						</view>
			 			<view v-show="companyOrbrand === 1">
							{{companyOrbrand === 1 ? item.baseinfo.regStatus : ""}}
						</view>
			 		</view>
					<view class="analyze" >
						<view class="options" v-for="(item,index) in (companyOrbrand === 1 ? CompanyCardList : BrandCardList)" :key="index">
							<span>{{item.title}}</span>
	<span :style="{color:blueColorList.includes(item.title)? '#3662EC':greenColorList.includes(item.title)? '#00B578' : '#FA5151' }" style="filter: blur(10rpx);">{{item | delNum }}</span>
						</view>
					</view>
			 	</view>
			 </view>
		 </view>
		 <view class="legalStaff">
		 	<view class="options" v-for="(val,index) in (companyOrbrand===1 ? legalStaffList1 :legalStaffList2)" :key="index">
		 		<span>{{val.title}}</span>
				<span>{{companyOrbrand === 1 ? (val.title === '注册资本' && item.baseinfo[val.props] ? item.baseinfo[val.props]+ '万' :item.baseinfo[val.props] ? item.baseinfo[val.props] : '-' ) : item[val.title] }}</span>
		 	</view>
		 </view>
		</view>
		<view class="footer">
			<!-- 公司搜索底部 -->
			<view class="company" v-show="companyOrbrand === 1">
				<view class="footer_left">
					<span @click="address(item)">地址</span>
					<span @click="website(item)">官网</span>
					<span @click="phone(item)">电话</span>
				</view>
				<view class="footer_right">
					<!-- <view class="options">
					<image src="../static/home/star.png"></image>	<span>关注</span>
					</view> -->
					<view class="options"  @click="toAddViste(item,index)">
					<image :src="item.investigated ? require('../static/home/fileactive.png') : require('../static/home/file.png')">	<span>{{item.investigated ? '尽调中' : '尽调'}} </span>
					</view>
					<view class="options"  @click="toAddMonitor(item,index)">
					<image :src="item.monitored ? require('../static/home/eyeactive.png') : require('../static/home/eye.png')">	<span>{{item.monitored ? '监控中' : '监控' }}</span>
					</view>
				</view>
			</view>
			<!-- 品牌搜索底部 -->
			<view class="brand" v-show="companyOrbrand === 2" @click="skipToSearch(item['主企业'])">
				所属公司：<span>{{item["主企业"] === "None" ? "暂无" :item["主企业"]}}</span>
			</view>
		</view>
		</view>
		<tm-dialog v-model="show" :title="title" :showCancel="false" confirmText="我知道了">
			<view #default>
				<view class="outerOption" v-for="(item,index) in toastList" :key="index">
					{{item}}
				</view>
			</view>
		</tm-dialog>
		<tm-message ref="toast"></tm-message>
	</view>
</template>

<script>
	import {addViste,addMonitor,cancelViste,cancelMonitor} from "@/api/search/companyDetail.js"
	export default{
		name:"SearchList",
		props: {
			companyOrbrand: {
				type: Number,
				default:1 
			},
			list: {
				type: Array,
				default:()=>[]
			},
			total: {
				type: Number,
				default:0 
			},
			recom:{
				type:Boolean,
				default:true
			},
			keyWord:{
				type:String,
				default:""
			}
		},
		data(){
			return {
				show:false,
				title:"",
				Newlist:[], //新列表
				blueColorList:["营收预测","利润预测","利润率","门店数量","从业人数","利润率"],
				greenColorList:["价值分析","品牌评分","品牌评级"],
				enum:{				//枚举
					brand_name:"品牌",
					industry:"行业",
					category:"业态",
					format:"品类",
					company:"主企业",			
				},
				legalStaffList1:[
					{
						title:"法定代表人",
						props:"operName"
					},
					{
						title:"注册资本",
						props:"registCapi"
					},
					{
						title:"成立日期",
						props:"startDate"
					},
				],
				legalStaffList2:[
					{
						title:"行业",
						props:"industry"
					},
					{
						title:"业态",
						props:"category"
					},
					{
						title:"品类",
						props:"format"
						
					},
				],
				CompanyCardList:[
			    {
					title:"营收预测",
					num:1.6
				},
				{
					title:"利润预测",
					num:9999
				},
				{
					title:"利润率",
					num:99.99
				},
				{
					title:"价值分析",
					num:999
				},
				{
					title:"风险分析",
					num:999
				},
				],
				BrandCardList:[
				{
					title:"门店数量",
					num:1.6
				},
				{
					title:"从业人数",
					num:9999
				},
				{
					title:"利润率",
					num:99.99
				},
				{
					title:"品牌评分",
					num:999
				},
				{
					title:"品牌评级",
					num:"AAA"
				},
				],
				toastList:[
					
				]
			}
		},
		filters: {
			delNum: function(val) {
				switch (val.title){
					case "营收预测":
					return val.num + "亿"
					case "利润预测":
					return val.num + "万"
					case "利润率":
					return val.num + "%"
					case "价值分析":
					return val.num + "条"
					case "风险分析":
					return val.num + "条"
					case "门店数量":
					return val.num + "家"
					case "从业人数":
					return val.num + "人"
					case "品牌评分":
					return val.num + "分"
					case "品牌评级":
					return val.num
				}
			}
		},
		watch:{
			list:{
				handler(val){
					this.Newlist = JSON.parse(JSON.stringify(val))
					this.Newlist.map((item,index)=>{
						if(this.companyOrbrand === 1){
							this.signKeyword(item.baseinfo.cname,index)
						}else{
							this.signKeyword(item["品牌"],index)
						}		
					})
				},
				deep:true,
				immediate:true
			}
		},
		methods:{
			checkDetails(item){
				if(this.companyOrbrand === 1){
				let cname = item.baseinfo.cname
				let viste = item.investigated
				let monitor = item.monitored
				// 跳转公司详情
				let deliver = JSON.stringify({cname,viste,monitor})
				uni.navigateTo({
					url:`/pages/companyDetails/companyDetails?option=${deliver}`,
				})
				}else{
				let  deliver = null
				if(this.recom){
					deliver = item["品牌"]
				}else{
					deliver = item["brand_name"]
				}
					// 跳转品牌详情
				uni.navigateTo({
					url:`/pages/brandDetails/brandDetails?brand_name=${deliver}`
				})
				}
			
			},
			
			// 点击地址
			address(val){
				this.toastList = []
				this.toastList.push(val.baseinfo.registAddress || 暂无)
				this.show = true
				this.title="地址"
				
			},
			// 点击官网
			website(val){
				this.toastList = []
				this.toastList.push(val.baseinfo.link || "暂无")
				this.show = true
				this.title="官网"
			},
			// 点击号码
			phone(val){
				this.toastList = []
				let phone = val.baseinfo.contactNumber
				let phoneArr = phone.split(" ")
				this.toastList.push(...phoneArr || "暂无")
				this.show = true
				this.title="电话"
			},

			// 添加尽调
			async toAddViste(val,par){
				try{
				// 添加尽调
				if(!val.investigated){
					const {code,msg} =  await addViste({
					ckey:val.baseinfo.ckey,
					cname:val.baseinfo.cname
				})
				if(code === 200){
					this.$refs.toast.show({model:'success',label:"添加尽调成功！"})
					// 重新刷新列表
					this.$emit("toBestThe",par,1)
				}else{
					this.$refs.toast.show({model:'error',label:`${msg}`})
				}
				}else{
					// 取消尽调
					const {code,msg} =  await cancelViste({
					ckey:val.baseinfo.ckey,
					cname:val.baseinfo.cname
				})
				if(code === 200){
					this.$refs.toast.show({model:'success',label:"取消尽调成功！"})
					// 重新刷新列表
					this.$emit("toBestThe",par,1)
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
			async toAddMonitor(val,par){
				try{
				if(!val.monitored){
				// 添加监控
				const {code,msg} =  await addMonitor({
					ckey:val.baseinfo.ckey,
					cname:val.baseinfo.cname
				})	
				if(code === 200){
					this.$refs.toast.show({model:'success',label:"添加监控成功！"})
					// 重新刷新列表
					this.$emit("toBestThe",par,0)
				}else{
					this.$refs.toast.show({model:'error',label:`${msg}`})
				}					
				}else{
					// 取消监控
				const {code,msg} =  await cancelMonitor({
					ckey:val.baseinfo.ckey,
					cname:val.baseinfo.cname
				})	
				if(code === 200){
					this.$refs.toast.show({model:'success',label:"取消监控成功！"})
					// 重新刷新列表
					this.$emit("toBestThe",par,0)
				}else{
					this.$refs.toast.show({model:'error',label:`${msg}`})
				}						
				}

				}catch(e){
					this.$refs.toast.show({model:'error',label:"监控失败！"})
					//TODO handle the exception
				}
			},
			// 关键词标红
			signKeyword (val,index) {
					let keyword = this.keyWord  //搜索的值
					if (val.indexOf(keyword) !== -1) {
						// 包含字符前面的下标
						let pre = val.indexOf(keyword)
						// 包含字符的长度
						let end = keyword.length
						this.Newlist[index].contain = true
						// 截取之前的字符
						this.Newlist[index].start = val.slice(0,pre)
						// 中间包含
						this.Newlist[index].middle = keyword
						// 截取之后的字符（包含字符前面的下标+包含字符的长度 = 包含字符之后的下标）
						this.Newlist[index].end = val.substr(pre+end)
						
					} else {
						this.Newlist[index].contain = false
						this.Newlist[index].start = val
					}
			},
			skipToSearch(val){
				if(val){
					uni.navigateTo({
					  url: `/pages/searchIndex/searchIndex?select=1&cname=${val}`,
					});
				}
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
	.cardList{
		margin-top: 20rpx;
		padding: 20rpx 20rpx 0 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
		.main{
			background-color: #fff;
			height: 270rpx;
			border-bottom:1rpx solid rgba(0,0,0,0.08) ;
			.exerciseValue{
				display: flex;
				.left{
					width: 10%;
					margin-right: 20rpx;
				}
				.right{
					width: 90%;
					.top{
						.title{
							display: flex;
							justify-content: space-between;
							font-size: 30rpx;
							font-family: PingFangSC-Medium, sans-serif;
							font-weight: normal;
							color: #262626;
							view{
							&:first-child{
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							width:500rpx ;
							}
							&:last-child{
								display: block;
								font-size: 20rpx;
								font-family:$uni-ffcg;
								font-weight: normal;
								color: #00B578;
								line-height: 28rpx;
								background: rgba(0,181,120,0.1);
								padding: 4rpx 10rpx;
							}
								
							}
						}
						.analyze{
							font-size: 22rpx;
							display: flex;
							align-items: center;
							justify-content: space-between;
							margin-top: 10rpx;
							padding: 0 12rpx;
							height: 90rpx;
							background: rgba(0,0,0,0.02);
							.options{
								position: relative;
								display: flex;
								flex-direction: column;
								align-items: center;
								span{
									&:first-child{
										margin-bottom:4rpx ;
									}
								}
								&::after{
									position: absolute;
									right: -13rpx;
									top: 50%;
									transform: translateY(-50%);
									content: "";
									display: inline-block;
									height: 30rpx;
									width: 1rpx;
									background-color: rgba(0,0,0,0.08);
								}
								text-align: center;
							}
						}
					}
				}
			}
			.legalStaff{
			  margin-top: 24rpx;
			  display: flex;
			  justify-content: space-around;
			  .options{
				  display: flex;
				  flex-direction: column;
				  align-items: center;
				  span{
					  font-family: PingFangSC-Regular, sans-serif;
					  font-weight: normal;
					  &:first-child{
						font-size: 22rpx;
						color: #9E9E9E; 
						 margin-bottom: 8rpx;
					  }
					  &:last-child{
						  font-size: 24rpx;
						  color: rgba(0,0,0,0.85);
					  }
				  }
			  }
			}
		}
		.footer{
			.company{
			display: flex;
			align-items: center;
			height: 85rpx;
			.footer_left{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-right: 30rpx;
				span{
					flex-shrink: 0;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, sans-serif;
					font-weight: normal;
					color: #3662EC;
					display: inline-block;
					height: 45rpx;
				    padding: 5rpx 14rpx;
					background: rgba(54,98,236,0.1);
					border-radius: 45rpx;
					margin-left: 16rpx;
				}
			}
			.footer_right{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.options{
					margin-right: 16rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 5rpx 10rpx;
					height: 45rpx;
					background: #FFFFFF;
					border-radius: 228rpx 228rpx 228rpx 228rpx;
					opacity: 1;
					border: 1rpx solid #3662EC;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, sans-serif;
					font-weight: normal;
					color: #3662EC;
					image{
						margin-right: 5rpx;
						vertical-align: middle;
						height: 24rpx;
						width: 24rpx;
					}
				}
			}
			}
			.brand{
				display: flex;
				align-items: center;
				height: 74rpx;
				font-size: 24rpx;
				font-family: $uni-ffcg;
				font-weight: normal;
				color: rgba(0,0,0,0.6);
				line-height: 34rpx;
				span{
					color: #2888E8;
				}
			}
		}
	}
</style>