import request from '../utils/request.js';

const baseUrl = process.env.NODE_ENV === 'production' ? '/vm' : '/dev-api/vm';

export const parsingReportFormat = (data) => {
    return request({
        url: `${baseUrl}/risk/kyc/parsingReportFormat`,
        method: 'post',
        data
    })
}
/*
 * 获取待尽调企业列表
 * */
export const getInvestigateCompanyList = (params) => {
    return request({
        url: `${baseUrl}/risk/companyInvestigate/getInvestigateCompanyList`,
        method: "get",
        params
    })
}
/*
 * 读取新尽调
 * */
export const setMessageRead = (data) => {
    return request({
        url: `${baseUrl}/risk/rickInvestigate/messageRead`,
        method: "post",
        data
    })
}