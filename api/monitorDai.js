//监测日报接口
import request from '../utils/request.js'
const baseUrl = process.env.NODE_ENV === 'production' ? '/vm' : '/dev-api/vm'
// 监测日报获取监控企业数量
export const getMtgCCount = () => {
	return request({
		url: baseUrl + `/monitoring/monitoringKycUser/monitoringCompanyNum`,
		method: 'get',
	})
}

// 查询当前用户命中的企业数量和风险数量命中日期
export const getUserDateInfo = (data) => {
	return request({
		url: baseUrl + '/monitoring/monitoringKycUser/amount',
		method: 'get',
		params: data,
	})
}
// 根据日期查询当前用户命中的企业信息和风险信息
export const getCRInfo = (data) => {
	return request({
		url: baseUrl + '/monitoring/monitoringKycUser/allUserHit',
		method: 'get',
		params: data,
	})
}