<template>
	<view>
	<view class="search_wrap">
		<view class="searchOrsort">
		<view :style="{width:isSearch ? '90%' : '100%'}">
		<tm-input  border-color="grey-lighten-1" :bg-round="10" :height="88" :padding="[0,0]" v-model="searchForm.cname" :auto-focus="true">
			<template #rightBtn>
			<view style="padding: 0 20rpx 0 0;color: #3662EC;" @click="searchResult" v-show="!isSearch">搜索</view>
			<view style="padding: 0 20rpx 0 0;color: #3662EC;" @click="clear" v-show="isSearch">
				<image src="../../static/search/x.png" style="width: 30rpx;height: 30rpx;"></image>
			</view>
			</template>
		</tm-input>				
		</view>
		<image src="../../static/search/sliders.png" v-show="isSearch"  @click="torank"></image>
		</view>
		<view class="tabs">
			<view v-for="(item,index) in list" :key="index" class="options" @click="activeIndex = index" :style="{color:activeIndex === index ? '#3662EC': '#666666',borderBottom:activeIndex === index ? '2rpx solid #3662EC' : ''}">
				{{item.title}}
			</view>
		</view>
		<!-- 筛选导航 -->
		<view class="sort" @touchmove.stop.prevent="{}" v-if="isSearch && searchList.length > 0">
		<!-- 全国地区筛选 -->
			<view class="options">
				<tm-pickersCity  @confirm="dateSe" @resetA="resetArea" btn-color="bg-gradient-deep-purple-accent" :resetBtn="true" :default-value="searchForm.areaList[0]" ref="pCity">
					<tm-button theme="bg-gradient-deep-purple-accent" @click="areaOption">
				    <text :style="{color:sortActive=== true ? '#3662EC' : ''}">全国</text><image :src="sortActive===true ?'../../static/search/sortTop.png' :'../../static/search/sotrDown.png'"></image>						
					</tm-button>
				</tm-pickersCity>
			</view>
		<!-- 全部行业筛选 -->
			<view class="options">
			<tm-pickers :default-value="searchForm.industryList[0]"  :list="allIndustryList" rang-key="label" children-key="children" @confirm="selectIndustry" :resetBtn="true" @resetIndustry="resetIndustry" :defaultrest="1" ref="allIndusty">
			<tm-button theme="bg-gradient-amber-lighten"  @click="closeIns">
			<text :style="{color:sortActive2=== true ? '#3662EC' : ''}">全部行业</text><image :src="sortActive2===true ?'../../static/search/sortTop.png' :'../../static/search/sotrDown.png'"></image>	
			</tm-button>
			</tm-pickers>
			</view>
			<!-- 更多筛选 -->
			<view class="options">
			<tm-pickers @confirm="muchSort" :resetBtn="true"  :hiddenCascade="false" @restMore="restMore" :defaultrest="2">
			<template #otherContent>
			<view class="moreWrap">
				<MoreSort :moreSortList="moreSortList" @deliverMoreSort="deliverMoreSort"></MoreSort>
			</view>
			</template>
				<tm-button theme="bg-gradient-amber-lighten" @click="closemore">
			<text :style="{color:sortActive3===true ? '#3662EC' : ''}">全部筛选</text><image :src="sortActive3===true ?'../../static/search/sortTop.png' :'../../static/search/sotrDown.png'"></image>	
			</tm-button>
			</tm-pickers>	
			</view>
		</view>
		<!-- 搜索列表数量记录-->
		<view class="searchRecords" v-if="isSearch && searchList.length > 0">
				<view class="left">
					搜索到<text>{{total}}</text>个结果  <text v-show="false">导出数据</text>
				</view>
			<view class="right">
				第{{searchForm.pageNum}}/{{Math.ceil(total/10)}}页
			</view>
		</view>
	</view>
	<view class="main_wrap">
		<!-- 模糊搜索历史页面-->
		<view class="fuzzySearch"  v-if="this.istopSearch">
			<view class="title">
				猜你想找
			</view>
			<view class="contentsl">
			<view class="loadding" v-show="topLoading">
				<tm-loadding :load="topLoading" ></tm-loadding>
			</view>
			<view class="options" v-for="(item,index) in NewToplist" :key="index" @click="toTopSee(item)" v-show="!topLoading">
			<view
				    style="
				      width: 62rpx;
				      height: 62rpx;
				      background-color: #2888e8;
				      border-radius: 8rpx;
				      color: #ffffff;
				      margin: 0 10rpx;
				      text-align: center;
				      font-size: 16rpx;
				      display: flex;
				      align-items: center;
				    "
				  >
				  <span v-if="activeIndex === 0">{{item.baseinfo.cname ? item.baseinfo.cname.substring(0, 4) : ""}}</span>
				  <span v-else>{{item["品牌"] ? item["品牌"].substring(0, 4) : ''}}</span>
			</view>
			<view>
			<text>{{item.start}}</text>
			<text style="color: red;">{{item.middle}}</text>
			<text>{{item.end}}</text>				
			</view>
			</view>	
			</view>
		</view>
		<!-- 初始化空页面推荐 -->
		<view class="emptyRecom"  v-if="!isSearch && !this.istopSearch">
		<view class="historySearch">
			<view class="title">
			 <text>历史搜索</text>
			 <image src="../../static/search/delete.png" @click="deletesHistorySearch"></image>
			</view>
			<view class="contention">
				<tm-more iconColor="grey" :maxHeight="180">
								<template v-slot:default>
									<view class="text-size-n pa-24">
										<view class="historyBlock" v-for="(item,index) in historyBlockList" :key="index" @click="historyClick(item)">
											{{item}}
										</view>
									</view>
								</template>
								<template v-slot:more="{ data }" >
									<text class="text-white">{{ data ? '收起' : '查看更多' }}</text><image style="width: 30rpx;height: 30rpx;" :src="data? '../../static/search/arrowTop.png' :'../../static/search/arrowBottom.png'" class="arrow"></image>
								</template>
							</tm-more>
			</view>
		</view>
		<view class="historySee">
			<view class="title">
			 <text>历史查看</text>
			 <image src="../../static/search/delete.png" @click="deletesHistorySee"></image>
			</view>
			<view class="contention">
				<tm-more iconColor="grey" :maxHeight="500">
								<template v-slot:default>
									<view class="text-size-n pa-24">
										<view class="historySeeList" v-for="item in historySeeList" :key="item.id" @click="tohistorySee(item.cname )">
											<view
												    style="
												      width: 62rpx;
												      height: 62rpx;
												      background-color: #2888e8;
												      border-radius: 8rpx;
												      color: #ffffff;
												      margin: 0 10rpx;
												      text-align: center;
												      font-size: 16rpx;
												      display: flex;
												      align-items: center;
													  flex-shrink: 0;
													  justify-content: center;
												    "
												  >
												    {{item.cname ? item.cname.substring(0, 1) : "" }}
											</view>
											<text>{{item.cname}}</text>
										</view>
									</view>
								</template>
								<template v-slot:more="{ data }">
									<text class="text-white">{{ data ? '收起' : '查看更多' }}</text><image style="width: 30rpx;height: 30rpx;" :src="data? '../../static/search/arrowTop.png' :'../../static/search/arrowBottom.png'" class="arrow"></image>
								</template>
							</tm-more>
			</view>
		</view>
	</view>
	<!-- 数据加载层 -->
	<tm-loadding v-if="mainLoadding"></tm-loadding>
	<!-- 列表渲染层 -->
	<view v-else>
		<!-- 搜索有数据的状态 -->
		<view class="thereAreData" v-if="isSearch && searchList.length > 0">
		  <!-- 企业列表 -->
		 <CompanyList :companyOrbrand="1" :list="searchList" :total="total" v-if="activeIndex === 0" @toBestThe="refresh" :keyWord="searchForm.cname"/>
		 <!-- 品牌列表 -->
		 <CompanyList :companyOrbrand="2" :list="searchList" :total="total" v-if="activeIndex === 1" :keyWord="searchForm.cname"/>
		</view>
		<!-- 搜索无数据的状态 -->
		<view class="thereIsNoData" v-if="isSearch && searchList.length === 0 && !loadding">
			<view class="emptyStatus">
				<image src="../../static/search/empty.png"></image>
				<view class="b">
					抱歉，没有找到相关企业
				</view>
				<view class="p">
					输入更准确的关键词，重新搜索
				</view>
			</view>
		</view>
		<tm-loadding v-show="loadding"></tm-loadding>
	</view>
	</view >
		<!-- 筛选弹出层 -->
		<view v-show="popShow" @touchmove.stop.prevent="{}" class="ouops">
			<tm-poup v-model="popShow" :position="position" @touchmove.stop.prevent="{}" :height="294" >
				<view class="board">
				<view class="rows" v-for="(item,index) in panelList" :key="index" @click="rankList(index)">
					<text>{{item}}</text> <image src="../../static/search/check.png" v-show="index === sortSelect"></image>
				</view>	 
				</view>
			</tm-poup>
		</view>
	</view>
	</view>
</template>

<script>
	import CompanyList from "../../components/Card.vue"
	import MoreSort from '../../components/moreSort.vue'
	import {querySearchBHistory,querySearchCHistory,querySeeCHistory,querySeeBHistory,saveCHistory,saveBHistory,companyRiskSearch,brandRiskSearch,deleteCHistory,deleteBHistory,deleteCsee,deleteBsee,getAllIndustry,saveCompanyRecord,saveSelectBrandRecord} from "@/api/search/search.js"
	import {EnterpriseType,registeredCapital,FixedNumberYear,enterpriseState,contributorsIn,phoneNumber,emailAddress,businessAddress,corporateWebSite} from "@/api/search/dictionary.js"
	export default {
		name:"SearchCorB",
		components: {
			CompanyList,
			MoreSort
		},
		data() {
			return {
				sortActive:null, //排序筛选选中
				sortActive2:null, //排序筛选选中
				sortActive3:null, //排序筛选选中
				popShow:false,   //弹框展示
				position:"top", //弹框弹出的方向
				isSearch:false,
				activeIndex:0,	
				sortSelect:0, //排序选择
				historyBlockList:[], //企业与品牌搜索记录
				historySeeList:[], //企业与品牌查看记录
				searchList:[],//搜索列表
				allIndustryList:[], //全部行业列表
				loadOver:false, //列表是否已经加载完毕
				topList:[], //热搜企业品牌列表
				NewToplist:[], //处理后的企业品牌列表
				istopSearch:false, //是否展示热搜列表
				topLoading:false, //控制热搜列表的加载
				searchForm:{
					cname:"", //搜索词
					pageNum:1,
					pageSize:10,
					searchOrder:"0", //排序
					areaList:[], //地区
					emailAddress:"",//邮件地址
					enterpriseAddress:"",
					enterpriseType:"",
					enterpriseWebsite:"",
					fStartDate:"",
					industryList:[], //行业列表
					insuredQuantityStr:[],
					operatingState:[],
					phoneNumber:"",
					registCapi:[],
					ruleCategory:"",
					ruleFormat:"",
					ruleIndustry:"",
					sStartDate:"",
					startDate:[]
				},
				total:0, //搜索列表总页数
				loadding:false, //下来加载
				mainLoadding:false, //页面加载
				// -------------------------------以下结构渲染数据-------------------------------------------------
				list:[
				{   
					title:"企业"
				},
				// {
				// 	title:"品牌"
				// }
				],
				sortList:[
					{
					title:"全国",
					},
					{
						title:"行业"
					},
					{
						title:"更多筛选"
					}
				],
				moreSortList:[
					{
						title:"企业类型",
						content:[]
					},
					{
						title:"注册资本",
						content:[]
					},
					{
						title:"成立年限",
						content:[]
					},
					{
						title:"企业状态",
						content:[]
					},
					{
						title:"参保人数",
						content:[]
					},
					{
						title:"电话号码",
						content:[]
					},
					{
						title:"邮箱地址",
						content:[]
					},
					{
						title:"企业地址",
						content:[]
					},
					{
						title:"网站地址",
						content:[]
					},
				],
				// 面板列表
				panelList:[
				 "智能排序",
				 "注册资本从高到低",
				 "注册资本从低到高"
				],
			}
		},
		onLoad(option) {
			this.activeIndex = Number(option.select) -1 //首页的查企业&查品牌
			if(option.cname){
				this.searchForm.cname = option.cname
				this.isSearch = true
				this.homeSkipindex()
				// this.getSearchList(true,this.activeIndex)
			}
			this.getSCHistory()
			this.ChistorySee()
			this.toGetAllIndustry()
			this.getMoreSortList()
		},
		onShow() {
			this.$store.commit("changeCname","")
			if(this.$store.state.comtoDetail){
				this.getSearchList(true,0)
			}
		},
		watch: {
			// 企业与品牌切换进行监听数据的变化
			activeIndex(val){
				if(this.isSearch){
					this.searchList=[]
					this.searchForm.pageNum = 1
					this.getSearchList(true,val)
				}
				if(this.istopSearch){
					if(this.activeIndex === 0){
						this.fdSearch('c')
					}else{
						this.fdSearch('b')
					}
				}
				this.getSCHistory(val)
				this.ChistorySee(val)
			},
			isSearch(val){
				if(val){
						this.istopSearch = false
						this.$store.commit("changeComtoDetail",false)
				}
			},
			"searchForm.cname":{
				handler(val){
				if(!val){
				// 搜索记录置空时,搜索列表清空
				this.topList = []
				this.isSearch = false	
				this.istopSearch = false
				}else{
				if(this.activeIndex === 0){
					this.fdSearch('c')
				}else{
					this.fdSearch('b')
				}
				}
				},
				deep:true
			},
			topList:{
				handler(val){
					this.NewToplist = JSON.parse(JSON.stringify(val))
					this.NewToplist.map((item,index)=>{
						if(this.activeIndex === 0){
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
		methods: {
		// 企业搜索记录以及品牌搜索记录
		async getSCHistory(val=0){
		try{
			if(val === 0){
				const {code,data:res} = await querySearchCHistory()
				if(code === 200){
					this.historyBlockList = res ? res.tagStr.split("#") : ""
				}
				
			}else{
				const {code,data} = await querySearchBHistory()
				if(code === 200){
					this.historyBlockList = data ? data.tagStr.split("#") :""
				}
			}
		}catch(e){
			//TODO handle the exception
			return Promise.reject(e)
		}
		},
		// 企业历史查看
		async ChistorySee(val=0){
			try{
			if(val === 0){
			const {code,data:res} = await querySeeCHistory()
			if(code === 200){
			this.historySeeList = res	
			}
			}else{
			const {code,data:res} = await querySeeBHistory()
			if(code === 200){
			let newData = res.map(val=>{
				return {
					...val,cname:val.bname
				}
			})
			console.log("newData",newData);
			this.historySeeList = newData
			}
		}
			}catch(e){
			return Promise.reject(e)
			}
		},
		//点击搜索按钮
		searchResult(){
		this.mainLoadding = true
		if(this.searchForm.cname){
		this.isSearch = true	
		// 调用企业搜索列表
		if(this.activeIndex===0){
		// 保存企业历史搜索记录
		saveCHistory({tagStr:this.searchForm.cname})
		// 企业搜索
		this.getSearchList(false,0)
		}else{
		// 保存品牌历史搜索记录
		saveBHistory({tagStr:this.searchForm.cname})
		// 品牌搜索
		this.getSearchList(true,1)
		}
		}
		},
		// 企业与品牌搜索列表 flag为0表示企业搜索，1表示品牌搜索
		getSearchList(val=true,flag){
			if(flag === 0){
			this.loadding = true
			if(this.$store.state.comtoDetail){
				this.searchList = []
				this.searchForm.pageNum = 1
			}
			companyRiskSearch(this.searchForm).then(({code,data:res})=>{
				if(code === 200 && res.list.length){
					this.searchList.push(...res.list)  
					this.total = res.total
					if(val){
					this.loadding = false
					}else{
					this.loadding = false
					this.mainLoadding = false
					}
				}else{
					this.loadding = false
					this.mainLoadding = false
				}
				this.$store.commit("changeComtoDetail",false)
			})	
			}else{
				this.loadding = true
				brandRiskSearch({brand_name:this.searchForm.cname,page_index:1}).then(({code,data:res})=>{
					if(code === 200 && res.length){
						let brandList = res.slice(0,res.length-2)
						this.total = Number(res[res.length - 1].num) 
						// this.searchForm.pageNum = Number(res.at(-2).page_num)
						this.searchList.push(...brandList)
						if(val){
						this.loadding = false	
						}
						this.loadding = false
						this.mainLoadding = false
					}else{
						this.loadding = false
						this.mainLoadding = false
					}
				})	
			}

		},
		// 搜索推荐列表获取
		topSearch(cOrb){
			if(cOrb === "c"){
				companyRiskSearch(this.searchForm).then(({code,data:res})=>{
					if(code === 200 && res.list.length){
						this.topList = res.list
					}
					this.topLoading = false
				}).catch(err=>{
					this.topLoading = false
					return Promise.reject(err)
				})
			}
			if(cOrb === "b"){
				brandRiskSearch({brand_name:this.searchForm.cname,page_index:1}).then(({code,data:res})=>{
					if(code === 200 && res.length){
						let brandList = res.slice(0,res.length-2)
						this.topList = brandList
					}
					this.topLoading = false
				}).catch(err=>{
					this.topLoading = false
					return Promise.reject(err)
				})
			}
		},
		// 筛选条件：获取全部行业列表
		async toGetAllIndustry(){
		const {data,code}= await getAllIndustry()
		if(code === 200){
			let newData = JSON.parse(JSON.stringify(data))
			newData.unshift({id:0,label:"全部",value:"全部",children:[{id:0,label:"全部",value:"全部",children:[{id:0,label:"全部",value:"全部"}]}]})
			this.allIndustryList = newData
			console.log("此时的数据是",this.allIndustryList);
		}
		},
		// 清空搜索框
		clear(){
			// 重置筛选框
			this.sortActive = false
			this.sortActive2 = false
			this.sortActive3 = false
			this.searchForm = {
					cname:"", //搜索词
					pageNum:1,
					pageSize:10,
					searchOrder:"0", //排序
					areaList:[], //地区
					emailAddress:"",//邮件地址
					enterpriseAddress:"",
					enterpriseType:"",
					enterpriseWebsite:"",
					fStartDate:"",
					industryList:[], //行业列表
					insuredQuantityStr:[],
					operatingState:[],
					phoneNumber:"",
					registCapi:[],
					ruleCategory:"",
					ruleFormat:"",
					ruleIndustry:"",
					sStartDate:"",
					startDate:[]
				}
			this.loadding = false
			this.mainLoadding = false
			this.total = 0
			this.searchList = []
			// 重新加载列表
			if(this.activeIndex === 0){
				this.getSCHistory(0)
				this.ChistorySee()
			}else{
				this.getSCHistory(1)
				this.ChistorySee(1)
			}
		},
		sortcondiction(index){
			this.sortActive=index
		},
		//确定筛选
		confirm(){
			
		},
		// 显示排序弹框
		torank(){
			this.popShow= true
		},
		//地区筛选
		dateSe(val){
			this.sortActive = false
			let newData = JSON.parse(JSON.stringify(val))
			newData.forEach((item,index)=>{
				if(item === "请选择"){
					newData[index] = null
				}
			})
			this.searchForm.areaList.push(newData)
			this.searchList = []
			if(this.activeIndex === 0){
				this.getSearchList(true,0)
			} else{
				this.getSearchList(true,1)
			}
		},
		// 重置地区
		resetArea(){
			this.sortActive = false
			this.searchForm.areaList = []
			this.searchList = []
			if(this.activeIndex === 0){
				this.getSearchList(true,0)
			}else{
				this.getSearchList(true,1)
			}
		},
		//行业筛选
		selectIndustry(val){
		this.sortActive2 = false
		let newData = JSON.parse(JSON.stringify(val))
		 newData = newData.map(item=>{
			return item.data.value
		 })
		 this.searchForm.industryList.push(newData)
		 this.searchList = []
		 if(this.activeIndex === 0){
			 this.getSearchList(true,0)
		 }else{
			this.getSearchList(true,1)
		 }
		},
		// 重置行业
		resetIndustry(){
			this.sortActive2 = false
			this.searchForm.industryList = []
			this.searchList = []
			if(this.activeIndex === 0){
						 this.getSearchList(true,0)
			}else{
						this.getSearchList(true,1)
			}
		},
		// 更多筛选
		muchSort(val){
			this.sortActive3 = false
			this.searchList = []
			if(this.activeIndex === 0){
			this.getSearchList(true,0)
			}else{
			this.getSearchList(true,1)
			}
		},
		// 重置更多筛选
		restMore(){
			this.sortActive3 = false
			this.searchForm.enterpriseType=""
			this.searchForm.registCapi=[]
			this.searchForm.startDate=[]
			this.searchForm.operatingState=[]
			this.searchForm.insuredQuantityStr=[]
			this.searchForm.phoneNumber=""
			this.searchForm.emailAddress=""
			this.searchForm.enterpriseAddress=""
			this.searchForm.enterpriseWebsite=""
		},
		// 删除历史搜索
		deletesHistorySearch(){
			if(this.activeIndex === 0){
				deleteCHistory()  //公司
				this.getSCHistory(0)
			}else{
				deleteBHistory() //品牌
				this.getSCHistory(1)
			}
		},
		//删除历史查看
		deletesHistorySee(){
			if(this.activeIndex === 0){
				deleteCsee()  //公司
				this.ChistorySee()
			}else{
				deleteBsee() //品牌
				this.ChistorySee(1)
			}	
		},
		// 点击历史记录搜索
		historyClick(val){
			this.searchForm.cname = val
			this.searchResult()
		},
		//点击历史查看
		tohistorySee(val){
		this.searchForm.cname = val
		this.searchResult()	
		},
		toTopSee(val){
			if(this.activeIndex === 0){
				this.searchForm.cname = val.baseinfo.cname
				// 保存企业查看历史记录
				saveCompanyRecord(val.baseinfo)
			}
			if(this.activeIndex === 1){
				this.searchForm.cname = val["品牌"]
				saveSelectBrandRecord({bname:val["品牌"],ckey:val.c_ckey})
			}
			this.searchResult()	
		},
		// 条件排序
		rankList(index){
		this.sortSelect = index
		this.searchForm.searchOrder = index+""
		this.searchList = []
		this.popShow = false
		this.getSearchList(false,this.activeIndex)
		},
		// 获取更多筛选lei
		getMoreSortList() {
			// 获取企业类型
			EnterpriseType().then(({code,data})=>{
				if(code === 200){
					let newData = data.map(val=>{
						return {
							dictLabel:val.dictLabel,
							dictValue:val.dictValue
						}
					})
					newData.unshift({
						    dictLabel:"全部",
							dictValue:"",
					})
					 this.moreSortList[0].content = newData
				}
			}).catch((Error)=>{
				Promise.reject(Error)
			})
			// 获取注册资本
			registeredCapital().then(({code,data})=>{
				if(code === 200){
					let newData = data.map(val=>{
						return {
							dictLabel:val.dictLabel,
							dictValue:val.dictValue
						}
					})
					newData.unshift({
						    dictLabel:"全部",
							dictValue:"",
					})
					 this.moreSortList[1].content = newData
				}
			}).catch((Error)=>{
				Promise.reject(Error)
			})
			// 获取成立年限
			FixedNumberYear().then(({code,data})=>{
				if(code === 200){
					let newData = data.map(val=>{
						return {
							dictLabel:val.dictLabel,
							dictValue:val.dictValue
						}
					})
					 this.moreSortList[2].content = newData
				}
			}).catch((Error)=>{
				Promise.reject(Error)
			})
			// 获取企业状态
			enterpriseState().then(({code,data})=>{
				if(code === 200){
					let newData = data.map(val=>{
						return {
							dictLabel:val.dictLabel,
							dictValue:val.dictValue
						}
					})
					newData.unshift({
						    dictLabel:"全部",
							dictValue:"",
					})
					 this.moreSortList[3].content = newData
				}
			}).catch((Error)=>{
				Promise.reject(Error)
			})
			// 获取参保人数
			contributorsIn().then(({code,data})=>{
				if(code === 200){
					let newData = data.map(val=>{
						return {
							dictLabel:val.dictLabel,
							dictValue:val.dictValue
						}
					})
					newData.unshift({
						    dictLabel:"全部",
							dictValue:"",
					})
					 this.moreSortList[4].content = newData
				}
			}).catch((Error)=>{
				Promise.reject(Error)
			})
			// 获取电话号码
			phoneNumber().then(({code,data})=>{
				if(code === 200){
					let newData = data.map(val=>{
						return {
							dictLabel:val.dictLabel,
							dictValue:val.dictValue
						}
					})
					 this.moreSortList[5].content = newData
				}
			}).catch((Error)=>{
				Promise.reject(Error)
			})
			// 获取邮箱地址
			emailAddress().then(({code,data})=>{
				if(code === 200){
				let newData = data.map(val=>{
					return {
						dictLabel:val.dictLabel,
						dictValue:val.dictValue
					}
				})
				newData.unshift({
					    dictLabel:"全部",
						dictValue:"",
				})
					 this.moreSortList[6].content = newData
				}
			}).catch((Error)=>{
				Promise.reject(Error)
			})
			// 获取企业地址
			businessAddress().then(({code,data})=>{
				if(code === 200){
					let newData = data.map(val=>{
						return {
							dictLabel:val.dictLabel,
							dictValue:val.dictValue
						}
					})
					newData.unshift({
						    dictLabel:"全部",
							dictValue:"",
					})
					 this.moreSortList[7].content = newData
				}
			}).catch((Error)=>{
				Promise.reject(Error)
			})
			// 获取企业网址
			corporateWebSite().then(({code,data})=>{
				if(code === 200){
					let newData = data.map(val=>{
						return {
							dictLabel:val.dictLabel,
							dictValue:val.dictValue
						}
					})
					newData.unshift({
						    dictLabel:"全部",
							dictValue:"",
					})
					 this.moreSortList[8].content = newData
				}
			}).catch((Error)=>{
				Promise.reject(Error)
			})
		},
		// 控制显示隐藏组
		areaOption(){
			this.sortActive= !this.sortActive
		},
		closeIns(){
			this.sortActive2= !this.sortActive2
		},
		closemore(){
			this.sortActive3 = !this.sortActive3
		},
		//更多筛选传递值
		deliverMoreSort(val){
			if(Object.values(val) === "") return
			this.searchForm = {...this.searchForm,...val}
		},
		// 重新刷新列表
		refresh(val,flag){
		this.searchList = this.searchList.map((item,index)=>{
				if(index === val){
					if(flag === 0){
						item.monitored = !item.monitored
					}else{
						item.investigated = !item.investigated
					}
				}
				return item
			})
		},
		// 数据框防抖处理
		fdSearch(val) {
		      clearTimeout(this.timer);
			  this.topLoading = true
		      this.timer = setTimeout(() => {
				this.topSearch(val)
				if(this.searchForm.cname !== "" && !this.isSearch){
					this.istopSearch = true
				}
		      }, 1000); // 设置时间
		    },
			// 关键词标红
			signKeyword (val,index) {
					let keyword = this.searchForm.cname  //搜索的值
					if (val.indexOf(keyword) !== -1) {
						// 包含字符前面的下标
						let pre = val.indexOf(keyword)
						// 包含字符的长度
						let end = keyword.length
						this.NewToplist[index].contain = true
						// 截取之前的字符
						this.NewToplist[index].start = val.slice(0,pre)
						// 中间包含
						this.NewToplist[index].middle = keyword
						// 截取之后的字符（包含字符前面的下标+包含字符的长度 = 包含字符之后的下标）
						this.NewToplist[index].end = val.substr(pre+end)
					} else {
						this.NewToplist[index].contain = false
						this.Newlist[index].start = val
					}
			},
			// 首页搜索跳转
			homeSkipindex(){
				if(this.activeIndex === 0){
				this.searchList=[]
				this.searchForm.pageNum = 1
				this.getSearchList(true,this.activeIndex)					
				}

			}
		},

	//上拉触底
	  onReachBottom(){
				// console.log(this.searchForm.pageNum,'--=---==-==',this.searchForm.pageSize);
				let allTotal = this.searchForm.pageNum * this.searchForm.pageSize
			    if(allTotal < this.total){
	                //当前条数小于总条数 则增加请求页数
			        this.searchForm.pageNum ++;
					if(this.activeIndex === 0){
						this.getSearchList(true,0) //调用加载数据方法
					}else{
						this.getSearchList(true,1) 
					}
			    }else{
			        // console.log('已加载全部数据')
					this.loadOver = true
			    }
		},
	}
</script>

<style lang="scss" scoped>
::v-deep .border-grey-lighten-1-a-1{
	border: none!important;
}
::v-deep .shadow-primary-0{
	border: 2rpx solid rgba(0,0,0,0.1) ;
}
::v-deep .text-white{
	color: #b2b2b2 !important;
}
::v-deep .shadow-white-10{
	box-shadow: none;
}

::v-deep .tm-poup{
	top: 300rpx;
	z-index: 999;
}
::v-deep .round-b-10 {
	border-bottom-left-radius: 0 !important;
	border-bottom-right-radius: 0 !important;
}
// 筛选栏样式
::v-deep .tm-poup .tm-poup-wk.bottom{
	// bottom:600rpx;
	top:-490rpx;
	transform:none !important;
}
::v-deep .tm-poup .tm-poup-wk{
	height: 1150rpx !important;
}
::v-deep .tm-pickersView .tm-pickersBView-wk{
	height: 900rpx;
}
.moreWrap{
	height: 540rpx;
	overflow-y: auto;
	overflow-x: hidden;
	margin-top:370rpx;
	padding: 30rpx
}
.search_wrap{
	position: sticky;
	top: 0;
	z-index: 999;
	background-color: #fff;
	padding:30rpx 0 0 0;
	.searchOrsort{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		image{
			width: 44rpx;
			height: 44rpx;
		}
	}
	.tabs{
		display: flex;
		justify-content: flex-start;
		margin-top: 30rpx;
		height: 63rpx;
		border-bottom: 1rpx solid rgba(0,0,0,0.08);
		margin:30px 40rpx 0 40rpx;
		.options{
			position: relative;
			font-size: 30rpx;
			font-family: PingFangSC-Medium, sans-serif;
			font-weight: normal;
			color: #3662EC;
			height: 100%;
			padding: 0 32rpx;
			line-height: 63rpx;
		}
	}
	.sort{
		display: flex;
		justify-content: space-around;
		background-color: #fff;
		height: 88rpx;
		font-size: 28rpx;
		font-family:$uni-ffcg;
		font-weight: normal;
		color: rgba(0,0,0,0.6);
		.options{
			display: flex;
			align-items: center;
			image{
				height: 28rpx;
				width: 28rpx;
			}
		 // 更多筛选的条件的样式
		 .conditions{ 
			 .title{
				font-size: 26rpx;
				font-family:$uni-ffcg;
				font-weight: normal;
				color: rgba(0,0,0,0.6);
				line-height: 36px; 
			 }
			 .contention{
				margin: 30rpx 0;
				 .tags{
					display: inline-block;
					padding: 16rpx 30rpx;
					border-radius: 12rpx 12rpx 12rpx 12rpx;
					border: 1px solid rgba(0,0,0,0.08);
					margin: 0  0 20rpx 19rpx;
				 }
			 }
		 }
		}
	}
	.searchRecords{
		font-size: 24rpx;
		font-family: $uni-ffcg;
		font-weight: normal;
		color: rgba(0,0,0,0.6);
		line-height: 60rpx;
		box-shadow: 2rpx 1rpx 2rpx rgba(0,0,0,0.1);
		height: 60rpx;
		background-color:#f5f5f5 ;
		margin-top: 25rpx;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		.left{
			text{
				&:first-child{
					color: #FA5151;
				}
				&:last-child{
					margin-left: 20rpx;
					color: #3662EC;
				}
			}
		}
	}
}
	.main_wrap{
		background-color: #f5f5f5;
		
		// 模糊搜索样式
		.fuzzySearch{
			padding: 30rpx;
			height: calc(100vh - 220rpx);
			background-color: #ffffff;
		.title{
			font-size: 26rpx;
			font-weight: normal;
			color: #333333;
			line-height: 30rpx;
		}	
		.contentsl{
			position: relative;
			height: 100%;
			.loadding{
				position: absolute;
				top: 30%;
				left: 50%;
				transform: translate(-50%,-50%);
			}
			.options{
				display: flex;
				align-items: center;
				margin-top: 20rpx;
				padding-bottom: 20rpx;
				border-bottom: 1rpx solid #D8D8D8;
				image{
					height: 52rpx;
					width: 52rpx;
					margin-right: 20rpx;
				}
				text{
					font-size: 26rpx;
					font-family: PingFangSC-Regular, sans-serif;
					font-weight: normal;
					color: #333333;
					line-height: 36rpx
				}
			}
		}
		}
		.emptyRecom{
			.historySearch{
			background-color: #fff;
			padding: 30rpx;
			.title{
				display: flex;
				justify-content: space-between;
				image{
					width: 30rpx;
					height: 30rpx;
				}
			}
			.contention{
				.historyBlock{
					display: inline-block;
					background: rgba(0,0,0,0.04);
					border-radius: 2rpx 2rpx 2rpx 2rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, sans-serif;
					font-weight: normal;
					color: rgba(0,0,0,0.6);
					padding: 14rpx;
					margin: 0 20rpx 10px 0;
				}
			}
		}
		.historySee{
			margin-top: 40rpx;
			padding: 30rpx;
			background-color: #fff;
			.title{
				display: flex;
				justify-content: space-between;
				image{
					width: 30rpx;
					height: 30rpx;
				}
			}
			.contention{
				.historySeeList{
					display: flex;
					align-items: center;
					margin-top: 20rpx;
					padding-bottom: 20rpx;
					border-bottom: 1rpx solid #D8D8D8;
					image{
						height: 52rpx;
						width: 52rpx;
						margin-right: 20rpx;
					}
					text{
						font-size: 26rpx;
						font-family: PingFangSC-Regular, sans-serif;
						font-weight: normal;
						color: #333333;
						line-height: 36rpx
					}
				}
			}
		}
		}
		// 搜索有数据
		.thereAreData{
	
		}
		//搜索无数据
		.thereIsNoData{
			height: 600rpx;
			display: flex;
			justify-content: center;
			margin-top: 189rpx;
			.emptyStatus{
				text-align: center;
				image{
					width: 317rpx;
					height: 160rpx;
				}
				.b{
					margin-top: 5rpx;
					font-size: 30rpx;
					font-family: $uni-ffzh;
					color: #333333;
					font-weight: normal;
					line-height: 42rpx;
				}
				.p{
					font-size: 26rpx;
					margin-top: 5rpx;
					font-family: $uni-ffcg;
					font-weight: normal;
					color: #999999;
					line-height: 36rpx;
				}
			}
	
		}
	}
	.ouops{
		::v-deep .tm-poup{
		  top: 150rpx;
		}
		::v-deep .tm-poup .tm-poup-wk{
			height: 324rpx !important;
		}
		.board{
			
			.rows{
			padding: 30rpx;
			display: flex;
			justify-content: space-between;
			text{
			font-size: 26rpx;
			font-family: Source Han Sans CN-Regular, Source Han Sans CN;
			font-weight: 400;
			color: rgba(0,0,0,0.85);
			line-height: 38rpx;				
			}

			image{
				width: 38rpx;
				height: 38rpx;
			}				
			}

		}
	}
</style>
