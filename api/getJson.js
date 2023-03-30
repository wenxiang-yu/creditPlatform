/*
 * @Date: 2022-12-01 09:29:07
 * @LastEditors: 大濕兄
 * @LastEditTime: 2022-12-02 15:25:41
 * @name: 
 * @FilePath: /monitoringh5/api/getJson.js
 */
import request from "../utils/Utils";
export function getMap(name, data) {
    return request(`/static/map/${name}.json`, "GET", data, true)
}
// export function getMap(data) {
//     return request("/static/map/city/110000.json", "GET", data, true)
// }