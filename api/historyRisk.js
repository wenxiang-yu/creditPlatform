import request from '../utils/request.js'
const baseUrl = process.env.NODE_ENV === 'production' ? '/vm' : '/dev-api/vm'
// 查询当前用户命中的企业数量和风险数量命中日期
export const getUserDateInfo = (data) => {
  return request({
    url: baseUrl + "/monitoring/monitoringKycUser/amount",
    method: "get",
    params: data,
  });
};
