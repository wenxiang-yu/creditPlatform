/*
 * @Date: 2022-12-13 10:06:42
 * @LastEditors: 大濕兄
 * @LastEditTime: 2022-12-13 14:03:53
 * @name: 
 * @FilePath: /monitoringh5/api/enterpriseDueDiligence/index.js
 */
import request from '@/utils/request.js'
const url = process.env.NODE_ENV === 'production' ? '/vm' : '/dev-api/vm'

export const getCompanyDetail = (params) => {
    return request({
        url: url + `/risk/riskCompany/getCompanyDetail`,
        method: "get",
        params,
    });
};
export const addInvestigate = (data) => {
    return request({
        url: url + `/risk/rickInvestigate/addInvestigate`,
        method: "post",
        data,
    });
};
export const downloadReport = (data) => {
    return request({
        url: url + `/risk/kyc/downloadReport`,
        method: "post",
        data,
    });
};
export const queryInvestigateResult = (data) => {
    return request({
        url: url + `/risk/companyInvestigate/queryInvestigateResult`,
        method: "post",
        data,
    });
};
//尽调会话编号-企业基本信息
export function investigate_chat_type(params) {
    return request({
        url: url + "/ruoyi-system/dict/data/type/investigate_chat_type",
        method: "get",
        params,
    });
}