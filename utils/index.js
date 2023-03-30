/*
 * @Date: 2022-05-16 13:00:56
 * @LastEditors: 大濕兄
 * @LastEditTime: 2022-06-07 21:34:46
 * @name: 
 * @FilePath: /gutuProject/vm-data-screen-h5/utils/index.js
 */
import store from '../store'
export default function (newV, dataList) {
    if (newV.industry) {
        let industry = store.state.typeList.filter((res) => res.name === "industry");
        industry[0].options.forEach((item, index) => {
            if (item.name === newV.industry) {
                industry[0].index = index;
            }
        });
    }
    // if (newV.target) {
    //     let target = store.state.typeList.filter((res) => res.name === "target");
    //     if (target.length) {
    //         target[0].options.forEach((item, index) => {
    //             if (item.name === newV.target) {
    //                 target[0].index = index;
    //             }
    //         });
    //     } else {
    //         newV.target = "总店数"
    //     }

    // }
}