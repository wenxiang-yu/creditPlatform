import request from '../../utils/request.js'
const baseUrl = process.env.NODE_ENV === 'production' ? '/vm' : '/dev-api/vm'
const baseUrl2 = process.env.NODE_ENV ===  'production' ? "/map-api" : "/dev-api/map-api"
const baseUrl3 = process.env.NODE_ENV ===  'production' ? "/" : "/dev-api"

// 查询公司搜索历史
export const getinfo =(data)=> {
    return request({
        url: baseUrl2 + '/tops',
		method:"post",
		data
    })
}

// 获取主体信息与基本信息
export const getMainAndBase =(data)=> {
    return request({
        url: baseUrl2 + '/principal',
		method:"post",
		data
    })
}

// 获取舆情新闻模块
export const publicOpinionNews =(data)=> {
    return request({
        url: baseUrl + '/monitoring/popularFeelings/brandSentiment',
		method:"post",
		data
    })
}

// 获取推荐品牌列表
export const recomBrandList=(data)=> {
    return request({
        url: baseUrl + '/monitoring/popularFeelings/brandRecommend',
		method:"post",
		data
    })
}