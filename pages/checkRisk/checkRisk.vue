<!-- 查看风险页面 -->
<template>
	<view>
		<Nav :tabName="{title:'空白',flag:true}"/>
		<view class="riskWrap">
			<view class="riskOption" v-for="(item,index) in CriskList" :key="index">
				<view class="typename">
					{{typeName}}
				</view>
				<view class="riskRow" v-for="(header,par) in tableColumn">
					<view class="left">
						{{header.label}}
					</view>
					<view class="right">
						{{ header.label === "变更时间" ? deltime(item[header.prop]) :item[header.prop] }}
					</view>
				</view>
			</view>
		</view>
		<tm-loadding :load="loading" :success="touchBottom"  :label="touchBottom ? '别拉了，已经到底了' : '加载中'" v-show="loading"></tm-loadding>
	</view>
</template>

<script>
	import Nav from '../../components/Nav.vue'
	import {MtgDLookRisk,getRiskTableTitle} from '@/api/dynamicRisk.js'
	
	export default {
		name:"seeMore",
		components: {
			Nav
		},
		data() {
			return {
				loading:false,
				touchBottom:false,
				hitNo:null,
				typeName:null,
				pageNum:1,
				pageSize:5,
				CriskList:[] ,//风险列表
				total:0,        //总数 
				headTitle:[],
				tableColumn: [], // 表格列配置
				keyword:"",
			}
		},
		onLoad(option) {
			this.hitNo = option.hitNo
			this.typeName = option.typeName
			this.getCriskList()
			// this.getRiskTitle()
		},
		methods: {
			// 时间格式化
		 deltime(value){
				let data = new Date()
				let y = data.getFullYear()
				let m = data.getMonth() + 1
				let d = data.getDate()
				let hours = data.getHours()
				let minutes = data.getMinutes()
				let secounds = data.getSeconds()
				return `${y}-${m}-${d}`
			},
			// 获取风险列表
		   async getCriskList(){
			try{
			uni.showLoading({
				title:"列表加载中..."
			})
			 const {data:res,msg,code} = await MtgDLookRisk(
			 {
				hitNo:this.hitNo,
				pageNum:this.pageNum,
				pageSize:this.pageSize 
			}
			)
			this.CriskList.push(...res.list) 
			this.total = res.total
			this.getRiskTitle(msg);	
			uni.hideLoading()
			}catch(e){
				uni.hideLoading()
				//TODO handle the exception
			}

			},
			// 获取头部标题字典
			async getRiskTitle(metaModel){
			 const {code,data} = await getRiskTableTitle()
			  if(code == 200 && data){
				  this.headTitle = data.map(({ dictLabel: metaModel, dictValue: info, dictSort: sort, cssClass }) => ({
				          metaModel,
				          sort,
				          info: JSON.parse(info),
				          style: cssClass && JSON.parse(cssClass),
				}))
			  }  
		     const filterTabelCols = this.headTitle.filter((i) => i.metaModel == metaModel).sort(
		        (a, b) => a.sort - b.sort
		      );
		      this.tableColumn = filterTabelCols.map(
		        ({ info: { title: label, fieldName: prop }, style }) => {
		          const result = {
		            label,
		            prop,
		          };
		          if (style && Object.prototype.toString.call(style) == "[object Object]") {
		            for (const key in style) {
		              result[key] = style[key];
		            }
		          }
		          return result;
		        }
		      );
			}
		},
		// 上拉触底
		onReachBottom() {
			let  allTotal = this.pageNum * this.pageSize
					    if(allTotal < this.total){
			                //当前条数小于总条数 则增加请求页数
							this.loading = true
					        this.pageNum ++;
							this.getCriskList() //调用加载数据方法
					    }else{
							this.loading = false
							this.touchBottom = true
					        console.log('已加载全部数据')
					 }
		}
	}
</script>

<style lang="scss" scoped>
.riskWrap{
	background-color: #f5f5f5 ;
	padding: 30rpx;
	.riskOption{
	 padding: 30rpx;
	 background-color: #fff;
	 margin-bottom: 20rpx;
	 .typename{
	 			font-size: 24rpx;
	 			font-family: PingFangSC-Medium, sans-serif;
	 			font-weight: normal;
	 			color: #333333;
	 			line-height: 34rpx; 
	 			padding: 10rpx 0;
	 }
	 .riskRow{
		 // margin: 10rpx 0;
		 border-top:1px solid rgba(0,0,0,0.08); 
		 border-right: 1px solid rgba(0,0,0,0.08);
		 border-left: 1px solid rgba(0,0,0,0.08);
		 &:last-child{
			 border-bottom: 1px solid rgba(0,0,0,0.08);
		 }
		 display:flex;

		 .left{
			 display: flex;
			 align-items: center;
			 width: 30%;
			 font-size: 24rpx;
			 background-color:#f8faff;
			 padding: 10rpx;
		 }
		 .right{
			display: flex;
			align-items: center;
			width: 70%;
			padding:0 10rpx ;
			font-size: 24rpx;
			font-weight: normal;
			color: rgba(0,0,0,0.85);
		 }
	 }
	}
}
</style>
