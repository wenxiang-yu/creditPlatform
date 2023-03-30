<template>
	<view class="companyInfoW">
	<view class="infoContent">
	<!-- 基础信息模块  start-->
	<!-- 工商信息模块 -->
	<Business :businessObj="businessObj" v-if="showModel === '工商信息'"/>
	<!-- 联系信息模块 -->
	<Link :businessObj="businessObj" v-if="showModel === '联系信息'"/>
	<!-- 股东信息模块 -->
	<Holders :total="total" :ShareholdersList="ShareholdersList" v-if="showModel === '股东信息'"/>
	<!-- 高管信息模块-->
	<Executives :total="total" :EmployeesList="EmployeesList" v-if="showModel === '高管信息'"/>
	<!-- 对外投资模块 -->
	<Investment :total="total" :InvestmentList="InvestmentList" v-if="showModel === '对外投资'"/>
	<!-- 分支机构模块-->
	<BranchOffices  :total="total" :BranchList="BranchList" v-if="showModel === '分支机构'"/>
	<!-- 基础信息模块  end-->
	<!-- 经营环境模块 start -->
	<Bid :total="total" :bidList="bidList" v-if="showModel === '招投标'"/>
	<Register :total="total" :regList="icpList" v-if="showModel === '网站备案'"/>
	<Certificate  :total="total" :regList="certificateList" v-if="showModel === '资质证书'"/>
	<License  :total="total" :regList="LicenseList" v-if="showModel === '行政许可'"/>
	<!-- 经营环境模块 end -->
	<!-- 变更记录明细 start-->
	<Tax :regList="taxList"  :total="total" :flag="showModel" v-if="['税务评级','股权出质','变更记录统计','变更记录明细'].includes(showModel)"/>
	<!-- 变更记录明细 end -->
	<!-- 发展潜力-->
	<Potential :regList="pontentialList" :total="total" :flag="showModel" v-if="['舆情控制','商标','软件著作权','专利','作品著作权'].includes(showModel)"/>
<!-- 合规信息-->
	<ComplianceInfor :regList="ComplianceInforList"  :flag="showModel" v-if="pontenTitle.includes(showModel)"/>
	<tm-loadding :load="loading" v-show="loading"></tm-loadding>
	</view>
	</view>
</template>

<script>
	// 导入工商信息模块
	import Business from '@/components/allCinfo/CbaseInfo/BusinessInfo.vue'
	import Link from "@/components/allCinfo/CbaseInfo/link.vue"
	import Holders from "@/components/allCinfo/CbaseInfo/holder.vue"
	import Executives from "@/components/allCinfo/CbaseInfo/executives.vue"
	import BranchOffices from "@/components/allCinfo/CbaseInfo/branchOffices.vue"
	import Investment from "@/components/allCinfo/CbaseInfo/investment.vue"
	//经营环境
	import Bid from '@/components/allCinfo/Envorment/Bidd.vue'
	import Register from "@/components/allCinfo/Envorment/Registration.vue"
	import Certificate from "@/components/allCinfo/Envorment/License.vue"
	import License from "@/components/allCinfo/Envorment/AdministrativeLicens.vue"
	//税务
	import Tax from "@/components/allCinfo/Operation/tax.vue"
	//发展潜力
	import Potential from '@/components/allCinfo/Potential/Potential.vue'
	// 合规信息
	import ComplianceInfor from '@/components/allCinfo/ComplianceInfor/ComplianceInfor.vue'
	import {getBaseInfo,getholder,getEmployees,getBranch,getInvestment,getBid,getIcpcount,getCertificate,getLicense,getTaxcredit,getEquitycount,getCompanyBusSit,getChangerecords,getTminfo,getCopyright,getPatent,getCopyrightworks,getAbnormalcount,getTaxContravention,getIllegal,getRestrictedConsumer,getCourtnotice,getPunishment,getEvirpenalcount,getCourtregister,getCourtanno,getLawsuit,getDishonest,getZhixing,getTaxcount,getEndcase,getWorkflow,getNews} from "@/api/search/companyDetail.js"
	export default {
		components: {
			Business,
			Link,
			Holders,
			Executives,
			BranchOffices,
			Investment,
			Bid,
			Register,
			Certificate,
			License,
			Tax,
			Potential,
			ComplianceInfor
		},
		data() {
			return {
				showModel:"",
				loading:false, //列表加载
				total:0, //分页的页数是
				searchFrom:{
					cname:"",
					pageNum:1,
					pageSize:10,
					type: ""
				},
				newsPage:1, //舆情控制的页数
				// 枚举
				emun:{
					"基本信息":"countBaseinfo",
					"高管信息":"countEmployees",
					"股东信息":"countHolderlistcount",
					"对外投资":"countInvestment",
					"分支机构":"countBranches",
				 	"招投标":"countBid",
					"网站备案":"countIcpcount",
					"资质证书":"countCertificate",
					"行政许可":"countLicensing",
					"税务评级":"countTaxcredit",
					"股权出质":"countEquitycount",
					"变更明细":"countChangemaps",
					"商标":"countTminfo",
					"软件著作权":"countCopyright",
					"专利":"countPatent",
					"作品著作权":"countCopyrightworks",
					"经营异常":"countAbnormalcount",
					"税务违法":"countTaxContravention",
					"严重违法":"countIllegal",
					"限制高消费":"countRestrictedConsumer",
					"法院公告":"countCourtnotice",
					"行政处罚":"countPunishment",
					"环保处罚":"countEnvirpenalcount",
					"企业立案":"countCourtregister",
					"开庭公告":"countCourtanno",
					"法院诉讼":"countLawsuit",
					"失信被执行":"countDishonest",
					"失信被执行人":"countZhixing",
					"企业欠税":"countTaxcount",
					"企业终本":"countEndcase",	
				},
				pontenTitle:["经营异常","税务违法","严重违法","限制高消费","法院公告","行政处罚","环保处罚","企业立案","开庭公告","法院诉讼","失信被执行","失信被执行人","企业欠税","企业终本"], //列举合规信息名称
				businessObj:{}, //工商信息
				ShareholdersList:[], //股东信息列表
				EmployeesList:[], //高管信息列表
				InvestmentList:[], //对外投资列表
				BranchList:[] ,//分支机构列表
				bidList:[], //招投标列表
				icpList:[], //网站备案列表
				certificateList:[], //资质证书列表
				LicenseList:[], //行政许可列表
				taxList:[],	//税务列表集合
				pontentialList:[], //发展潜力列表
				ComplianceInforList:[] //合规信息列表
			}
		},
		onLoad(option) {
			this.showModel = option.skip
			uni.setNavigationBarTitle({
				title:option.skip
			})
		},
		beforeMount() {
			this.toGetBaseInfo(this.showModel)
		},
		methods: {
		toGetBaseInfo(val) {
		let keys = this.$store.state.companyName
		getWorkflow(keys).then(({code,data})=>{
			if(code === 200){
			for(let key in data){
				if(key === this.emun[val]){
					this.total = data[key]
				}
			}
			}
		})
		switch(val){
			case "工商信息":
		// 获取公司基本信息
		getBaseInfo({cname:keys}).then(({code,data})=>{
			if(code === 200){
				this.businessObj = data.baseinfo
			}
		})
		break;
		case "联系信息":
		// 获取公司基本信息
		getBaseInfo({cname:keys}).then(({code,data})=>{
			if(code === 200){
				this.businessObj = data.baseinfo
			}
		})
		break;
		case "股东信息":
		// 获取股东信息
		getholder({...this.searchFrom,cname:keys,type:"holderlistcount"}).then(({code,data})=>{
			if(code === 200){
				this.ShareholdersList.push(...data)
				this.ShareholdersList.sort((a,b)=>{
					let copyA = a.percent ? a.percent.substring(0,a.percent.length - 1) : 0
					let copyB = b.percent ? b.percent.substring(0,b.percent.length - 1) : 0
					return copyB - copyA
				})				
				this.loading = false
			}
		})
		break;
		case "高管信息":
		//获取高管信息列表
		getEmployees({...this.searchFrom,cname:keys,type:"employees"}).then(({code,data})=>{
			if(code === 200){
				this.EmployeesList.push(...data)
				// let employList = JSON.parse(JSON.stringify(this.EmployeesList))
				// employList.forEach((val,index)=>{
				// 	if(val.job === "董事长"){
				// 		employList[index].job = 5
				// 	}
					
				// 	if(val.job === "董事"){
				// 		employList[index].job = 4
				// 	}
				// 	if(val.job === "监事会主席"){
				// 		employList[index].job = 3
				// 	}
				// 	if(val.job === "监事"){
				// 		employList[index].job = 2
				// 	}
				// 	if(val.job === "经理"){
				// 		employList[index].job = 1
				// 	}
				// })
				this.loading = false
			}
		})		
		break;
		case "对外投资":
		//获取对外投资
		getInvestment({...this.searchFrom,cname:keys,type:"investment"}).then(({code,data})=>{
			if(code === 200){
				this.InvestmentList.push(...data)
				this.loading = false
			}
		})		
		break;
		case "分支机构":
		//获取分支机构
		getBranch({...this.searchFrom,cname:keys,type:"branches"}).then(({code,data})=>{
			if(code === 200){
				this.BranchList.push(...data)
				this.loading = false
			}
		})		
		break;
		case "招投标":
		getBid({...this.searchFrom,cname:keys,type:"bid"}).then(({code,data})=>{
			if(code === 200){
				this.bidList.push(...data)
				this.loading = false
			}
		})	
		break;
		case "网站备案":
		getIcpcount({...this.searchFrom,cname:keys,type:"icpcount"}).then(({code,data})=>{
			if(code === 200){
				this.icpList.push(...data)
				this.loading = false
			}
		})	
		break;
		case "资质证书":
		getCertificate({...this.searchFrom,cname:keys,type:"certificate"}).then(({code,data})=>{
			if(code === 200){
				this.certificateList.push(...data)
				this.loading = false
			}
		})	
		break;
		case "行政许可":
		getLicense({...this.searchFrom,cname:keys,type:"licensing"}).then(({code,data})=>{
			if(code === 200){
				this.LicenseList.push(...data)
				this.loading = false
			}
		})	
		break;
		case "税务评级":
		getTaxcredit({...this.searchFrom,cname:keys,type:"taxcredit"}).then(({code,data})=>{
			if(code === 200){
				this.taxList.push(...data)
				this.loading = false
			}
		})	
		break;
		case "股权出质":
		getEquitycount({...this.searchFrom,cname:keys,type:"equitycount"}).then(({code,data})=>{
			if(code === 200){
				this.taxList.push(...data)
				this.loading = false
			}
		})	
		break;
		case "变更记录统计":
		getCompanyBusSit({cname:keys}).then(({code,data})=>{
			if(code === 200){
				this.taxList.push(data.changecount)
				this.loading = false
			}
		})	
		break;
		case "变更记录明细":
		getChangerecords({...this.searchFrom,cname:keys,type:"changerecords"}).then(({code,data})=>{
			if(code === 200){
				this.taxList.push(...data)
				this.loading = false
			}
		})
		case "舆情控制":
		getNews({c_cname:keys,page_index: this.searchFrom.pageNum}).then(({code,data})=>{
			if(code === 200){
				let newData = data.slice(0,data.length - 2)
				this.pontentialList.push(...newData)
				this.total = data.length && Number(data[data.length -1].num) 
				this.loading = false
			}
		})
		break;
		case "商标":
		getTminfo({...this.searchFrom,cname:keys,type:"tminfo"}).then(({code,data})=>{
			if(code === 200){
				this.pontentialList.push(...data)
				this.loading = false
			}
		})	
		break;
		case "软件著作权":
		getCopyright({...this.searchFrom,cname:keys,type:"copyright"}).then(({code,data})=>{
			if(code === 200){
				this.pontentialList.push(...data)
				this.loading = false
			}
		})			
		break;
		case "专利":
		getPatent({...this.searchFrom,cname:keys,type:"patent"}).then(({code,data})=>{
			if(code === 200){
				this.pontentialList.push(...data)
				this.loading = false
			}
		})			
		break;
		case "作品著作权":
		getCopyrightworks({...this.searchFrom,cname:keys,type:"copyrightworks"}).then(({code,data})=>{
			if(code === 200){
				this.pontentialList.push(...data)
				this.loading = false
			}
		})			
		break;
		case "经营异常":
		getAbnormalcount({...this.searchFrom,cname:keys,type:"abnormalcount"}).then(({code,data})=>{
			if(code === 200){
				this.ComplianceInforList.push(...data)
				this.loading = false
			}
		})	
		break;
		case "税务违法":
		getTaxContravention({...this.searchFrom,cname:keys,type:"taxContravention"}).then(({code,data})=>{
			if(code === 200){
				this.ComplianceInforList.push(...data)
				this.loading = false
			}
		})	
		break;
		case "严重违法":
		getIllegal({...this.searchFrom,cname:keys,type:"illegal"}).then(({code,data})=>{
			if(code === 200){
				this.ComplianceInforList.push(...data)
				this.loading = false
			}
		})	
		break;
		case "限制高消费":
		getRestrictedConsumer({...this.searchFrom,cname:keys,type:"restrictedConsumer"}).then(({code,data})=>{
			if(code === 200){
				this.ComplianceInforList.push(...data)
				this.loading = false
			}
		})
		break;
		case "法院公告":
		getCourtnotice({...this.searchFrom,cname:keys,type:"courtnotice"}).then(({code,data})=>{
			if(code === 200){
				this.ComplianceInforList.push(...data)
				this.loading = false
			}
		})
		break;
		case "行政处罚":
		getPunishment({...this.searchFrom,cname:keys,type:"punishment"}).then(({code,data})=>{
			if(code === 200){
				this.ComplianceInforList.push(...data)
				this.loading = false
			}
		})
		break;
		case "环保处罚":
		getEvirpenalcount({...this.searchFrom,cname:keys,type:"envirpenalcount"}).then(({code,data})=>{
			if(code === 200){
				this.ComplianceInforList.push(...data)
				this.loading = false
			}
		})
		break;
		case "企业立案":
		getCourtregister({...this.searchFrom,cname:keys,type:"courtregister"}).then(({code,data})=>{
			if(code === 200){
				this.ComplianceInforList.push(...data)
				this.loading = false
			}
		})
		break;
		case "开庭公告":
		getCourtanno({...this.searchFrom,cname:keys,type:"courtanno"}).then(({code,data})=>{
			if(code === 200){
				this.ComplianceInforList.push(...data)
				this.loading = false
			}
		})
		break;
		case "法院诉讼":
		getLawsuit({...this.searchFrom,cname:keys,type:"lawsuit"}).then(({code,data})=>{
			if(code === 200){
			this.ComplianceInforList.push(...data)
			this.loading = false
			}
		})
		break;
		case "失信被执行":
		getDishonest({...this.searchFrom,cname:keys,type:"dishonest"}).then(({code,data})=>{
			if(code === 200){
				this.ComplianceInforList.push(...data)
				this.loading = false
			}
		})
		break;
		case "失信被执行人":
		getZhixing({...this.searchFrom,cname:keys,type:"zhixing"}).then(({code,data})=>{
			if(code === 200){
				this.ComplianceInforList.push(...data)
				this.loading = false
			}
		})
		break;
		case "企业欠税":
		getTaxcount({...this.searchFrom,cname:keys,type:"taxcount"}).then(({code,data})=>{
			if(code === 200){
				this.ComplianceInforList.push(...data)
				this.loading = false
			}
		})
		break;
		case "企业终本":
		getEndcase({...this.searchFrom,cname:keys,type:"endcase"}).then(({code,data})=>{
			if(code === 200){
				this.ComplianceInforList.push(...data)
				this.loading = false
			}
		})
		break;
		}
		}
		},
		onReachBottom() {
			let  allTotal = this.searchFrom.pageNum * this.searchFrom.pageSize
					    if(allTotal < this.total){
			                //当前条数小于总条数 则增加请求页数
							this.loading = true
					        this.searchFrom.pageNum ++;
							this.toGetBaseInfo(this.showModel)
					    }else{
							this.loading = false
					   }
		}
	}
</script>

<style lang="scss" scoped>
.companyInfoW{
	.infoContent{
		padding: 30rpx;
		background-color: #f5f5f5;
		
	}
}
</style>
