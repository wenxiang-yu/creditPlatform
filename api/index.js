/*
 * @Date: 2022-05-16 13:00:55
 * @LastEditors: 大濕兄
 * @LastEditTime: 2022-05-31 21:20:19
 * @name: 
 * @FilePath: /gutuProject/vm-data-screen-h5/api/index.js
 */
import request from "../utils/Utils";
export function getMap2(data) {
    return request(`/map2`, "POST", data)
}
// 门店总览详情
export function getDetails(data) {
    return request(`/store/details`, "POST", data)
}
// 开关店占比
export function getSurvival(data) {
    return request(`/store/survival`, "POST", data)
}
// 开关店占比月
export function getSurvivals(data) {
    return request(`/store/survivals`, "POST", data)
}
// 开关店占比
export function getTotal(data) {
    return request(`/store/total`, "POST", data)
}




// 行业
export function getIndustry(data) {
    return request(`/category/industry`, "POST", data)
}
// 业态
export function getCategory(data) {
    return request(`/category/category`, "POST", data)
}
// 品类
export function getFormat(data) {
    return request(`/category/format`, "POST", data)
}



// 地域发展
export function getMap3(data) {
    return request(`/map3`, "POST", data)
}



// 地域发展
export function getTop(data) {
    return request(`/top`, "POST", data)
}


// 运营期
export function getOperation(data, bl = false) {
    return request(`/${bl ? 'yyq2' : 'yyq'}/operation  `, "POST", data)
}
// 闭店期
export function getOperationDown(data, bl = false) {
    return request(`/${bl ? 'yyq2' : 'yyq'}/operation_down  `, "POST", data)
}
// 生存期
export function getAvg_operation(data, bl = false) {
    return request(`/${bl ? 'yyq2' : 'yyq'}/avg_operation  `, "POST", data)
}
// 存活率
export function getAvg_rate(data, bl = false) {
    return request(`/${bl ? 'yyq2' : 'yyq'}/avg_rate  `, "POST", data)
}
// 运营期_top20品牌
export function getBrand(data, bl = false) {
    return request(`/${bl ? 'yyq2' : 'yyq'}/brand  `, "POST", data)
}