import request from '../../utils/request.js'
const baseUrl = process.env.NODE_ENV === 'production' ? '/vm' : '/dev-api/vm'

// 查询公司搜索历史
export const getBaseInfo =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/getBaseInfo',
		method:"post",
		data
    })
}
//获取公司高管人员信息列表
export const getEmployees =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/employees',
		method:"post",
		data
    })
}
//获取股东人员列表
export const getholder =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/holderlistcount',
		method:"post",
		data
    })
}
// 获取分支机构
export const getBranch =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/branches',
		method:"post",
		data
    })
}
// 获取对外投资
export const getInvestment =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/investment',
		method:"post",
		data
    })
}
//获取招投标
export const getBid =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/bid',
		method:"post",
		data
    })
}
//获取网上备案
export const getIcpcount =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/icpcount',
		method:"post",
		data
    })
}
// 获取资质证书
export const getCertificate =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/certificate',
		method:"post",
		data
    })
}
//获取行政许可
export const getLicense =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/licensing',
		method:"post",
		data
    })
}
// 获取税务评级、
export const getTaxcredit =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/taxcredit',
		method:"post",
		data
    })
}
// 获取股权出质信息
export const getEquitycount =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/equitycount',
		method:"post",
		data
    })
}
// 获取变更记录统计
export const getCompanyBusSit =(data)=> {
    return request({
        url: baseUrl + '/vm-risk-value/companyData/getCompanyBusSit',
		method:"post",
		data
    })
}

// 获取企业变更记录明细
export const getChangerecords =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/changerecords',
		method:"post",
		data
    })
}

// 获取商标信息
export const getTminfo =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/tminfo',
		method:"post",
		data
    })
}
// 获取企业软件著作权信息
export const getCopyright =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/copyright',
		method:"post",
		data
    })
}

// 获取企业专利信息
export const getPatent =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/patent',
		method:"post",
		data
    })
}
// 获取企业作品著作权信息
export const getCopyrightworks =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/copyrightworks',
		method:"post",
		data
    })
}

// 获取经营异常 
export const getAbnormalcount =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/abnormalcount',
		method:"post",
		data
    })
}
// 获取税务异常
export const getTaxContravention =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/taxContravention',
		method:"post",
		data
    })
}
// 获取严重违法
export const getIllegal =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/illegal',
		method:"post",
		data
    })
}
//获取限制高消费
export const getRestrictedConsumer =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/restrictedConsumer',
		method:"post",
		data
    })
}
// 获取法院公告
export const getCourtnotice =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/courtnotice',
		method:"post",
		data
    })
}
// 获取行政处罚
export const getPunishment =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/punishment',
		method:"post",
		data
    })
}
//获取环保处罚
export const getEvirpenalcount =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/envirpenalcount',
		method:"post",
		data
    })
}
//获取企业立案
export const getCourtregister =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/courtregister',
		method:"post",
		data
    })
}
//获取开庭公告
export const getCourtanno =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/courtanno',
		method:"post",
		data
    })
}
//获取法律诉讼
export const getLawsuit =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/lawsuit',
		method:"post",
		data
    })
}
//获取失信被执行
export const getDishonest =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/dishonest',
		method:"post",
		data
    })
}
//获取失信执行人
export const getZhixing =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/zhixing',
		method:"post",
		data
    })
}
//获取企业欠税
export const getTaxcount =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/taxcount',
		method:"post",
		data
    })
}
//获取企业终本
export const getEndcase =(data)=> {
    return request({
        url: baseUrl + '/risk/companyData/detailsInfo/endcase',
		method:"post",
		data
    })
}
// 获取企业详情分页
export const getWorkflow = (cname)=> {
	return request({
		url: baseUrl + `/risk/companyData/getWorkflow?cname=${cname}`,
		method: 'post',
	})
}
// 获取舆情控制的接口
export const getNews = (data)=> {
	return request({
		url: baseUrl + `/monitoring/popularFeelings/companySentiment`,
		method: 'post',
		data
	})
}

// 添加尽调
export const addViste =(data)=> {
    return request({
        url: baseUrl + '/risk/rickInvestigate/addInvestigate',
		method:"post",
		data
    })
}
// 取消尽调
export const cancelViste =(data)=> {
    return request({
        url: baseUrl + '/risk/rickInvestigate/cancelInvestigate',
		method:"post",
		data
    })
}
// 添加监控
export const addMonitor =(data)=> {
    return request({
        url: baseUrl + '/monitoring/monitoringKycUser/addMonitoring',
		method:"post",
		data
    })
}
// 取消监控
export const cancelMonitor =(data)=> {
    return request({
        url: baseUrl + '/monitoring/monitoringKycUser/delete',
		method:"post",
		data
    })
}
