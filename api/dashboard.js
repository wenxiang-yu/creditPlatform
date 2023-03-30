/*
 * @Date: 2022-10-31 17:36:03
 * @LastEditors: 大濕兄
 * @LastEditTime: 2022-11-01 17:58:36
 * @name: 
 * @FilePath: /monitoringh5/api/dashboard.js
 */
import request from '../utils/request.js'
const url = process.env.NODE_ENV === 'production' ? '/vm' : '/dev-api/vm'
// 监控仪表盘——预警企业风险概览
export const getTacticHitRisk = (num, data) => {
    return request({
        url: url + `/monitoring/tacticHit/risk/${num === 1 ? "public" : "private"}`,
        method: "post",
        data,
    });
};
// 监控仪表盘——预警企业风险趋势
export const getTacticHitLine = (num, data) => {
    return request({
        url: url + `/monitoring/tacticHit/line/${num === 1 ? "public" : "private"}`,
        method: "post",
        data,
    });
};
//监控仪表盘——预警实时动态

export const getTacticHitDynamic = (num, data) => {
    return request({
        url: url + `/monitoring/tacticHit/${num === 1 ? 'publicDynamic' : 'privateDynamic'}`,
        method: "get",
        params: data
    });
};
//监控仪表盘——统计高中低风险数量

export const getTacticHitAmount = (num, data) => {
    return request({
        url: url + `/monitoring/tacticHit/${num === 1 ? 'publicAmount' : 'privateAmount'}`,
        method: "get",
        params: data
    });
};
//监控仪表盘——更多-企业风险排行页面功能描述

export const getTacticHitMapHit = (num, data) => {
    return request({
        url: url + `/monitoring/tacticHit/${num === 1 ? 'publicMapHit' : 'privateUserHit'}`,
        method: "get",
        params: data
    });
};
//监控仪表盘——根据筛选条件得出公司风险排行

export const getRanking = (num, data) => {
    return request({
        url: url + `/monitoring/tacticHit/${num === 1 ? 'publicMapRanking' : 'privateUserRanking'}`,
        method: "get",
        params: data
    });
};
//监控仪表盘——预警企业区域分布

export const getDistrict = (num, data) => {
    return request({
        url: url + `/monitoring/tacticHit/district/${num === 1 ? 'public' : 'private'}`,
        method: "post",
        data
    });
};

export const getBaseInfo = (data) => {
    return request({
        url: url + `/risk/companyData/getBaseInfo`,
        method: "post",
        data
    });
};
// 查询当前用户命中的企业数量和风险数量命中日期
export const getAmounts = (data) => {
    return request({
        url: url + `/monitoring/monitoringKycUser/amount?pageNum=1&pageSize=999`,
        method: "get",
        params: data
    });
};
//
export const selectEventDiagnosis = (data) => {
    const formData = new FormData()
    for (const key in data) {
        formData.append(key, data[key])
    }
    return request({
        url: url + `/monitoring/tacticHit/selectEventDiagnosis`,
        method: "post",
        data: formData
    });
};
//  5. 年筛选base_week列表接口
export const getAmount = (data) => {
    return request({
        url: url + `/monitoring/baseWeek/queryYearScope`,
        method: "get",
        params: data
    });
};
// 获取行业\业态\品类
export function getIndustyList(data) {
    const formData = new FormData()
    for (const key in data) {
        formData.append(key, data[key])
    }
    return request({
        url: url + '/risk/keyValuesAllNew/getNewIndustry',
        method: 'post',
        data: formData,
    })
}
