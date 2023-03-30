import request from '../utils/request.js'
const baseUrl = process.env.NODE_ENV ===  'production' ? "/map-api" : "/dev-api/map-api"
// 产品运营接口
export const getProductOperation = (data) => {
    return request({
        url: baseUrl + `/top/prodectOperation`,
        method: "post",
        data,
    });
};
// 门店运营接口
export const getStoreOperation = (data) => {
    return request({
        url: baseUrl + `/store_operation`,
        method: "post",
        data,
    });
};
// 发展趋势接口
export const getDevelopmentTrend = (data) => {
    return request({
        url: baseUrl + `/top/developmentTrend`,
        method: "post",
        data,
    });
};
// 获取行业趋势
export const getSurvival = (data) => {
    return request({
        url: baseUrl + `/store/survival`,
        method: "post",
        data,
    });
};
// 获取业态与品类
export const getformatAndCate = (data) => {
    return request({
        url: baseUrl + `/store/survivals`,
        method: "post",
        data,
    });
};
// 获取雷达图数据
export const getRadar = (data) => {
    return request({
        url: baseUrl + `/top/brandValue`,
        method: "post",
        data,
    });
};


