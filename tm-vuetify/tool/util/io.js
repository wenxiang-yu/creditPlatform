/*
 * @Date: 2022-11-01 14:09:15
 * @LastEditors: 大濕兄
 * @LastEditTime: 2022-11-01 15:09:09
 * @name: 
 * @FilePath: /monitoringh5/tm-vuetify/tool/util/io.js
 */

// 导入
const fs = require('fs')
const path = require('path')
//1.读取data.json文件
let province = require("./area2.js")

let dir = path.join(__dirname, 'data2.json')

province.forEach(val => {
    // console.log(JSON.stringify(val),"/n");

    val.forEach(item => {
        item.unshift({ label: "请选择", value: "0" })
        console.log(item, '/n----');
        // item.forEach(vals => {


        // })
    })
    val.unshift([{ label: "请选择", value: "0" }])
    // val=val.reduce((arr, item) => {
    //     item.unshift([{ label: "请选择", value: "0" }])
    //     arr.push(item)
    //     return arr
    // }, [])
});
// console.log(province);
fs.writeFile(dir, JSON.stringify(province), 'utf8', (err) => {
    console.log('写入成功', err)
})