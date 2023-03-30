<template>
	<view class="main_wrap">
		<view class="mainInformation">
			<view class="title">
				主体信息
			</view>
			<view class="contentwr">
				<view class="rows" v-for="(item,index) in mianInfoList" :key="index">
				<view class="left">
					{{item.title}} :
				</view>
				<view class="right">
					{{item.name || "无"}}
				</view>	
				</view>
	
			</view>
		</view> 
		<view class="baseInformation">
			<view class="title">
				基本信息
			</view>
			<view class="contentwr">
				<view class="rows" v-for="(item,index) in baseInfoList" :key="index">
				<view class="left">
					{{item.title}} :
				</view>
				<view class="right">
					{{item.name || "无"}}
				</view>	
				</view>
		
			</view>
		</view> 
		<!-- 舆情新闻 -->
		<view class="expectedNews">
			<view class="title">
				舆情新闻
			</view>
			<view class="contentwr" >
				<view class="options" v-for="(item,index) in (seeMore ? headerNewsList : newsList)" :key="index">
					<view class="headline">
						<view>
							{{item.title}}
						</view>
						<view :class="{Hrisk:item.entiment === 'negative',Mrisk:item.entiment === 'None',Lrisk:item.entiment === 'positive'}" v-show="item.entiment">
						{{item.entiment === "negative" ? "负面" : item.entiment === "positive" ? "正面" : "中性"}}
						</view>
					</view>
					<view class="browse">
						<span>{{item.date || "暂无"}}</span>
						<span>来源：{{item.source || "未知"}}</span>
						<!-- <span>浏览量：100万次浏览</span> -->
					</view>
					<view class="relatedEnterprises">
						相关企业：<span style="color: #3662EC;">{{item.company ? (item.company === "None" ? "暂无" : item.company) : "暂无"}}</span>
					</view>
				</view>
				<view class="seeMore" @click="seeMore= false" v-if="seeMore && newsList.length > 3">
					查看更多<image src="/static/search/arrowBottom.png" ></image>
				</view>
				<tm-loadding :load="loading" v-show="!seeMore && loading"></tm-loadding>
			</view>
		</view>
	</view>
</template>

<script>
	import {getMainAndBase,publicOpinionNews} from '@/api/search/brandDetail.js'
	export default {
		props: {
			option: {
				type: Object,
				default: ()=>{}
			},
			barndTitle:{
				type:String,
				default:""
			}
		},
		data() {
			return {
				page_index:1, //新闻页数
				total:0, //新闻总条数
				newsList:[], //舆情新闻列表
				loading:false, //列表下来加载更多
				isReachBottom:false, //已经到底了
				seeMore:true, //控制查看更多按钮的显示
				headerNewsList:[],
				mianInfoList:[
					{
						title:"主体企业",
						name:""
					},
					{
						title:"联系人",
						name:""
					},
					{
						title:"联系电话",
						name:""
					},
					{
						title:"注册资本",
						name:""
					},
					{
						title:"品牌简介",
						name:""
					},
				],
				baseInfoList:[
				{
					title:"品牌名",
					name:""
				},
				{
					title:"成立时间",
					name:""
				},
				{
					title:"品牌年龄",
					name:""
				},
				{
					title:"业态品类",
					name:""
				},
				{
					title:"地址",
					name:""
				},
				]
			}
		},
		mounted() {
			this.toGetMainAndBase(this.option)
			this.getPublicNews(this.option)
			 uni.$on('onReachBottom',(data)=>{  
						 this.reachBottom()
					});   
		},
		methods: {
			//获取主体信息与基本信息
			async toGetMainAndBase(par){
			const {data:res} = await getMainAndBase(par)
			 let main = res[0]
			 let base = res[1]
			 for(let key in main){
				this.mianInfoList.forEach(val=>{
					if(main[key] && val.title === key){
						val.name = main[key]
					}
				}) 
			 }
			 for(let key in base){
				this.baseInfoList.forEach(val=>{
					if(base[key] && val.title === key){
						val.name = base[key]
					}
				}) 
			 }
			},
			// 获取舆情新闻模块
			async getPublicNews(par){
				try{
				const {data:res} = await publicOpinionNews({...par,page_index:this.page_index})
				console.log("此时的数据是什么",res);
				let newList = res.slice(0,res.length-2)
				this.total = Number(res[res.length -1] && res[res.length -1].num)
				this.newsList.push(...newList)
				this.headerNewsList = this.newsList.slice(0,3)
				this.loading = false
				}catch(e){
				//TODO handle the exception
				return Promise.reject(e)
				}
			},
		   reachBottom(){
			   let  allTotal = this.page_index * 10
			   if(allTotal < this.total && !this.seeMore){
			   	this.loading = true
			   	//当前条数小于总条数 则增加请求页数
			   	this.page_index ++;
			   	this.getPublicNews({brand_name:this.barndTitle}) //调用加载数据方法
			   }else{
			   	if(this.seeMore){
			   		return
			   	}
			   	this.loading = false
			   	this.isReachBottom = true
			   }
		   }
		},
		// 下拉加载新闻列表
		onReachBottom() {

		}
	}
</script>

<style lang="scss" scoped>
	// 动态控制样式
	.Hrisk{
	background: rgba(250,81,81,0.1);
	color: #FA5151;
	}
	.Mrisk{
	color: #FF8F1F;	
	background: rgba(255,143,31,0.1);
	}
	.Lrisk{
	color: #3662EC;
	background: rgba(54,98,236,0.1);
	}
	.main_wrap{
		.mainInformation,.baseInformation{
			background-color: #fff;
			border-radius: 10rpx;
			padding: 30rpx;
			margin-bottom: 30rpx;
			.title{
				font-size: 30rpx;
				font-family: $uni-ffzh;
				font-weight: normal;
				color: rgba(0,0,0,0.85);
				line-height: 42rpx;
			}
			.contentwr{
				.rows{
					display: flex;
					font-size: 26rpx;
					font-family: $uni-ffcg;
					font-weight: normal;
					line-height: 36rpx;
					margin-top: 20rpx;
					.left{
						flex-shrink: 0;
						color: rgba(0,0,0,0.6);
						margin-right: 10rpx;
						min-width: 120rpx;
						text-align: right;
					}
					.right{
						color: rgba(0,0,0,0.85);
					}
				}
			}
		}
		// 舆情新闻
		.expectedNews{
			background-color: #fff;
			border-radius: 10rpx;
			padding: 30rpx;
			.title{
				font-size: 30rpx;
				font-family: $uni-ffzh;
				font-weight: normal;
				color: rgba(0,0,0,0.85);
				line-height: 42rpx;
			}
			.contentwr{
				.options{
					padding: 30rpx 0;
					border-bottom: 1rpx solid rgba(0,0,0,0.08);
					&:nth-last-child(2){
						border-bottom: none;
					}
					.headline{
						display: flex;
						justify-content: space-between;
						view{
							&:first-child{
								width: 80%;
								font-size: 26rpx;
								font-family: $uni-ffcg;
								font-weight: normal;
								color: rgba(0,0,0,0.85);
								/*强制文本在一行内显示*/
								 white-space: nowrap; 
								 overflow: hidden;
								 text-overflow: ellipsis;
	
							}
							&:last-child{
								width: 15%;
								font-size: 20rpx;
								font-family: $uni-ffcg;
								font-weight: normal;
								line-height: 30rpx;
								padding: 5rpx 5rpx;
								text-align: center;
							}
						}
					}
					.browse{
						margin-top: 20rpx;
						font-size: 22rpx;
						font-family: $uni-ffcg;
						font-weight: normal;
						color: rgba(0,0,0,0.6);
						line-height: 40rpx;
						span{
							margin-right: 40rpx;
						}
					}
					.relatedEnterprises{
						margin-top: 10rpx;
						padding: 20rpx;
						border-radius: 8rpx;
						font-family: $uni-ffcg;
						font-weight: normal;
						color: rgba(0,0,0,0.6);
						background: rgba(0,0,0,0.02);
						line-height: 34rpx;
						font-size: 22rpx;
					}
				}
				// 查看更多
				.seeMore{
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 24rpx;
					font-family: $uni-ffcg;
					font-weight: normal;
					color: rgba(0,0,0,0.3);
					image{
						width: 24rpx;
						height: 24rpx;
					}
					
				}
			}
		}
	}
</style>