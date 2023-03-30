/*
 * @Date: 2022-11-01 15:41:25
 * @LastEditors: 大濕兄
 * @LastEditTime: 2022-11-02 15:12:24
 * @name: 
 * @FilePath: /monitoringh5/api/dynamicRisk.js
 */
import request from '../utils/request.js'
const baseUrl = process.env.NODE_ENV === 'production' ? '/vm' : '/dev-api/vm'

// 获取风险动态列表
export const getRiskList = (data) => {
    const { pageNum, pageSize } = data;
    return request({
        url: baseUrl + `/monitoring/tacticHit/dynamicRiskPrivate?pageNum=${pageNum}&pageSize=${pageSize}`,
        method: 'post',
        data: data
    })
}

// 风险维度菜单
export const risksMenu = () => {
    return request({
        url: baseUrl + `/monitoring/tacticHit/tacticModelAndTacticType`,
        method: 'GET',
    })
}
// 监控分组
export const monitoringGroup = () => {
    return request({
        url: baseUrl + `/monitoring/tacticHit/getGroupInfoListPrivate`,
        method: 'GET',
    })
}
// 获取行业业态品类列表
export const getIndustyList = (data) => {
    const formData = new FormData()
    for (const key in data) {
        formData.append(key, data[key])
    }
    return request({
        url: baseUrl + `/risk/keyValuesAllNew/getNewIndustry`,
        method: 'POST',
        data: formData,
    })
}

// 根据日期查询当前用户命中的企业信息和风险信息
export const getAllUserHit = (data) => {
    return request({
        url: baseUrl + `/monitoring/monitoringKycUser/allUserHit`,
        method: 'GET',
        params: data
    })
}
// =
export const getBaseHit = (data) => {
    return request({
        url: baseUrl + `/monitoring/tacticHit/baseHit?pageNum=1&pageSize=5`,
        method: 'GET',
        params: data
    })
}
// 
// =
export const getMetamodel = (data) => {
    return request({
        url: baseUrl + `/monitoring/tacticHit/metamodel`,
        method: 'GET',
        params: data
    })
}
// 
export const get_risk_type_table_title_list = (data) => {
    return request({
        url: baseUrl + `/system/dict/data/type/risk_type_table_title_list`,
        method: 'GET',
    })
}
//
export const selectEventDiagnosis = (data) => {
    const formData = new FormData()
    for (const key in data) {
        formData.append(key, data[key])
    }
    return request({
        url: baseUrl + `/monitoring/tacticHit/selectEventDiagnosis?pageNum=1&pageSize=10`,
        method: "post",
        data: formData
    });
};
// 监控动态查看风险
export const MtgDLookRisk = (params) => {
  return request({
    url: baseUrl + "/monitoring/tacticHit/baseUserHit",
    method: "get",
    params,
  });
};

// 字典获取监测日报新增风险事件模块表格标题
export const getRiskTableTitle = () => {
  return request({
    url: baseUrl + `/system/dict/data/type/risk_type_table_title_list`,
    method: "get",
  });
};