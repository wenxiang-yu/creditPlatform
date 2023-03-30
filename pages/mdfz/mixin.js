import { vShow } from "vue"

export default {
    data() {
        return {
            boxData: {
                title: "当月新店数",
                titleTips: "当前时期下的门店存活总数",
                home: "147,754,489",
                tag1: {
                    title: "月同比",
                    num: "0.946%",
                },
                tag2: {
                    title: "月环比",
                    num: "0.946%",
                },
            },

            // 开关店占比趋势
            accountedFor: {
                eopts: {
                    tooltip: {
                        trigger: 'axis',
                        // axisPointer: {
                        //     type: 'shadow'
                        // },
                        formatter: "年份：{b}\n新开企业数占比：{c}%\n关闭企业数占比：{c1}%\n净增企业数占比：{c2}%"
                    },
                    color: ["#165DFF", "#14C9C9", "#F7BA1E"],
                    legend: {
                        icon: "circle", //图例样式
                        itemWidth: this.rpxToPx(20), //图例宽
                        itemHeight: this.rpxToPx(20), //图例高
                        textStyle: {
                            color: "#191C31", //图例文字颜色
							fontSize:11,
                        },
                        left: 0,
                        top: 0,
                        data: [
                            "新开企业数占比", "关闭企业数占比", "净增企业数占比"
                        ],
                        // selectedMode: false, //取消图例上的点击事件

                    },
                    grid: {
                        top: "15%",
                        left: "2%",
                        right: "0%",
                        bottom: "0%",
                        containLabel: true,
                    },
                    dataZoom: [

                        {
                            type: "inside",
                            xAxisIndex: [0],
                            start: 20,
                            end: 100,
                        },
                    ],
                    xAxis: [
                        {
                            axisLabel: {
                                color: "#86909C"
                            },

                            axisLine: {
                                show: false,
                                lineStyle: { color: "#F2F3F5" }
                            },
                            boundaryGap: true,
                            data: ["1", "2", "3", "4", "5", "6", "7"],
                        },
                    ],
                    yAxis: [
                        {
                            type: "value",
                            axisLine: {
                                show: false,
                                lineStyle: { color: "#F2F3F5" }
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: ['#F2F3F5'],
                                    type: 'dotted'
                                }
                            },
                            axisLabel: {
                                color: "#86909C",
                                // y轴加单位%
                                formatter: '{value}%',
                            },
                        },
                    ],
                },
                chartData: {
                    series: [
                        {
                            name: "新开企业数占比",
                            type: "line",
                            smooth: true, //平滑线条
                            showSymbol: false, //隐藏圆点
                            areaStyle: {
                                opacity: 0.3
                            },
                            data: [12, 13, 10, 13, 91, 23, 20],
                        },
                        {
                            name: "关闭企业数占比",
                            type: "line",
                            smooth: true, //平滑线条
                            showSymbol: false, //隐藏圆点
                            areaStyle: { opacity: 0.3 },
                            data: [52, 14, 17, 13, 41, 23, 80],
                        },
                        {
                            name: "净增企业数占比",
                            type: "line",
                            smooth: true, //平滑线条
                            showSymbol: false, //隐藏圆点
                            areaStyle: { opacity: 0.3 },
                            data: [34, 78, 12, 76, 23, 34, 54],
                        },
                    ],
                },
            },
            // 开关店占比趋势
            accountedForY: {
                eopts: {
                    tooltip: {
                        trigger: 'axis',
                        // axisPointer: {
                        //     type: 'shadow'
                        // },
                        formatter: "年份：{b}\n新开企业数占比：{c}%\n关闭企业数占比：{c1}%\n净增企业数占比：{c2}%"
                    },
                   color: ["#165DFF", "#14C9C9", "#F7BA1E"],
                    legend: {
                       icon: "circle", //图例样式
                       itemWidth: this.rpxToPx(20), //图例宽
                       itemHeight: this.rpxToPx(20), //图例高
                       textStyle: {
                           color: "#191C31", //图例文字颜色
                       	fontSize:11,
                       },
                       left: 0,
                       top: 0,
                       data: [
                           "新开企业数占比", "关闭企业数占比", "净增企业数占比"
                       ],
                    },
                    grid: {
                        top: "15%",
                        left: "2%",
                        right: "0%",
                        bottom: "0%",
                        containLabel: true,
                    },
                    dataZoom: [
                        {
                            type: "inside",
                            xAxisIndex: [0],
                            start: 40,
                            end: 100,
                        },
                    ],
                    xAxis: [
                        {
                            axisLabel: {
                                color: "#86909C"
                            },
                            axisLine: {
                                show: false,
                                lineStyle: { color: "#F2F3F5" }
                            },
                            boundaryGap: true,
                            data: ["1", "2", "3", "4", "5", "6", "7"],
                        },
                    ],
                    yAxis: [
                        {
                            type: "value",
                            axisLine: {
                                show: false,
                                lineStyle: { color: "#F2F3F5" }
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: ['#F2F3F5'],
                                    type: 'dotted'
                                }
                            },
                            axisLabel: {
                                color: "#86909C",
                                // y轴加单位%
                                formatter: '{value}%'

                            },
                        },
                    ],
                },
                chartData: {
                    series: [
                        {
                            name: "新开企业数占比",
                            type: "line",
                            smooth: true, //平滑线条
                            showSymbol: false, //隐藏圆点
                            areaStyle: {
                                opacity: 0.3
                            },
                            data: [12, 13, 10, 13, 91, 23, 20],
                        },
                        {
                            name: "关闭企业数占比",
                            type: "line",
                            smooth: true, //平滑线条
                            showSymbol: false, //隐藏圆点
                            areaStyle: { opacity: 0.3 },
                            data: [52, 14, 17, 13, 41, 23, 80],
                        },
                        {
                            name: "净增企业数占比",
                            type: "line",
                            smooth: true, //平滑线条
                            showSymbol: false, //隐藏圆点
                            areaStyle: { opacity: 0.3 },
                            data: [34, 78, 12, 76, 23, 34, 54],
                        },
                    ],
                },
            },
            // 门店总数
            storesTotal: {
                eopts: {
                    tooltip: {
                        trigger: 'axis',
						confine:true,
                        axisPointer: {
                            type: 'shadow'
                        },
                        // formatter: "门店：{c}家\n同比：{c1}%\n年份：{b}"
                        formatter: function(item){
					return `${item[0].name}\n${item[0].seriesName}：${item[0].data.toLocaleString()}\n${item[1].seriesName}：${item[1].data}%`
						}
                    },
                    color: ["#4E7FDC", "#F6BD16"],
                    legend: {
						icon:"circle",
                        // selectedMode: false, //取消图例上的点击事件
						itemHeight: 12,
                        textStyle: {
                            color: "#191C31", //图例文字颜色
							fontSize:11,
                        },
                        itemStyle: {
                            // color: "#86909C",
                        },
                        left: 0,
                        data: [
                            {
                                name: "企业数量",
                                icon: "circle", //图例样式
                                itemWidth: this.rpxToPx(20), //图例宽
                                itemHeight: this.rpxToPx(20), //图例高
                            }, "同比"
                        ],
                    },
                    grid: {
                        top: "15%",
                        left: "2%",
                        right: "2%",
                        bottom: "10%",
                        containLabel: true,
                    },
                    xAxis: [
                        {
                            type: "category",
                            // boundaryGap: false,
                            axisLabel: {
                                color: "#86909C",
								rotate:-45,
                            },
                            data: ["1", "2", "3", "4", "5", "6", "7"],
                        },
                    ],
                    yAxis: [
                        {
                            type: "value",
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: ['#F2F3F5'],
                                    type: 'dotted'
                                }
                            },
                            axisLine:{
                                show:false
                            },
                            axisLabel: {
                                color: "#86909C",
                                // // y轴加单位%
                                // formatter: function (value, index) {
                                //     return value + "%";
                                // },
                            },
							axisTick:{
								show:false,
							}
							
                        },
                        {
							show:false,
                            type: 'value',
						     axisLine:{
						     show:false
						},
                            axisLabel: {
                                show: true,
								color: "#86909C",
								// y轴加单位%
								formatter: '{value}%'
                            },
                            splitLine: {
                                show: false
                            }
                        }
                    ],
                },
                chartData: {
                    series: [
                        {
                            name: "企业数量",
                            type: "bar",
                            data: [12, 13, 10, 13, 91, 23, 20],
                        },
                        {
                            name: "同比",
                            type: "line",
                            smooth: false, //平滑线条
                            yAxisIndex: 1,
                            showSymbol: false, //隐藏圆点
                            data: [52, 14, 17, 13, 41, 23, 80],
                        },
                    ],
                },

            },
            // 门店总数
            storesTotalY: {
                eopts: {
                    color: ["#4E7FDC", "#F6BD16", "#E8684A"],
                    tooltip: {
                        trigger: 'axis',
						confine:true,
                        axisPointer: {
                            type: 'shadow'
                        },
                        // formatter: "门店：{c}家\n同比：{c1}%\n环比：{c2}%\n年份：{b}"
                        formatter: (item)=>{
							return `${item[0].name}\n${item[0].seriesName}：${item[0].data.toLocaleString()}\n${item[1].seriesName}：${item[1].data}%\n${item[2].seriesName}：${item[2].data}%`
					  }
                    },
                    legend: {
						 show:true,
						 icon: "circle",
						 itemHeight: 12,
                        // selectedMode: false, //取消图例上的点击事件
                        textStyle: {
                            color: "#191C31", //图例文字颜色
							fontSize:11,
                        },
                        itemStyle: {
                            // color: "#86909C",
							// borderType:"dashed",
                        },
                        left: 0,
                        data: [
                            {
                                name: "企业数量",
                                icon: "circle", //图例样式
                                itemWidth: this.rpxToPx(20), //图例宽
                                itemHeight: this.rpxToPx(20), //图例高
                            }, "同比", '环比'
                        ],
                    },
                    grid: {
                        top: "15%",
                        left: "2%",
                        right: "0%",
                        bottom: "10%",
                        containLabel: true,
                    },
                    xAxis: [
                        {
                            type: "category",
                            // boundaryGap: false,
                            axisLabel: {
                                color: "#86909C",
								rotate:-55,
                            },
                            data: ["1", "2", "3", "4", "5", "6", "7"],
                        },
                    ],
                    yAxis: [
                        {
                            type: "value",
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: ['#F2F3F5'],
                                    type: 'dotted'
                                }
                            },
                            axisLine:{
                                show:false,
                            },
                            axisLabel: {
                                color: "#86909C",
                                // // y轴加单位%
                                // formatter: function (value, index) {
                                //     return value + "%";
                                // },
                            },
							axisTick:{
								show:false,
							}

                        },
                        {
							show:false,
                            type: 'value',
                            axisLabel: {
                                show: true,
								color: "#86909C",
								formatter:"{value}%"
                            },
                            splitLine: {
                                show: false
                            }
                        }
                    ],
                },
                chartData: {
                    series: [
                        {
                            name: "企业数量",
                            type: "bar",
                            data: [12, 13, 10, 13, 91, 23, 20],
                        },
                        {
                            name: "同比",
                            type: "line",
                            smooth: false, //平滑线条
                            yAxisIndex: 1,
                            showSymbol: false, //隐藏圆点
                            data: [52, 14, 17, 13, 41, 23, 80],
                        },
                        {
                            name: "环比",
                            type: "line",
                            smooth: false, //平滑线条
                            yAxisIndex: 1,
                            showSymbol: false, //隐藏圆点
                            data: [52, 14, 17, 13, 41, 23, 80],
                        },
                    ],
                },

            },
            activeData: [
                {
                    month: [
                        {
                            index_name: null,
                            month_on_month: null,
                            store_num: null,
                            title: null,
                            year_on_year: null,
                        },
                        {
                            index_name: null,
                            month_on_month: null,
                            store_num: null,
                            title: null,
                            year_on_year: null,
                        },
                        {
                            index_name: null,
                            month_on_month: null,
                            store_num: null,
                            title: null,
                            year_on_year: null,
                        },
                        {
                            index_name: null,
                            month_on_month: null,
                            store_num: null,
                            title: null,
                            year_on_year: null,
                        },
                    ],
                },
                {
                    year: [
                        {
                            index_name: null,
                            month_on_month: null,
                            store_num: null,
                            title: null,
                            year_on_year: null,
                        },
                        {
                            index_name: null,
                            month_on_month: null,
                            store_num: null,
                            title: null,
                            year_on_year: null,
                        },
                        {
                            index_name: null,
                            month_on_month: null,
                            store_num: null,
                            title: null,
                            year_on_year: null,
                        },
                        {
                            index_name: null,
                            month_on_month: null,
                            store_num: null,
                            title: null,
                            year_on_year: null,
                        },
                    ],
                },
                {
                    ttm: [
                        {
                            index_name: null,
                            month_on_month: null,
                            store_num: null,
                            title: null,
                            year_on_year: null,
                        },
                        {
                            index_name: null,
                            month_on_month: null,
                            store_num: null,
                            title: null,
                            year_on_year: null,
                        },
                        {
                            index_name: null,
                            month_on_month: null,
                            store_num: null,
                            title: null,
                            year_on_year: null,
                        },
                        {
                            index_name: null,
                            month_on_month: null,
                            store_num: null,
                            title: null,
                            year_on_year: null,
                        },
                    ],
                },
                {
                    total: [
                        {
                            index_name: null,
                            month_on_month: null,
                            store_num: null,
                            title: null,
                            year_on_year: null,
                        },
                        {
                            index_name: null,
                            month_on_month: null,
                            store_num: null,
                            title: null,
                            year_on_year: null,
                        },
                    ],
                },
            ], //选中数据

            
            dataList: [
				{
				    name: "employed",
				    index: null,
				    options: [
				        {
				            name: "全量",
				        },
				        {
				            name: "个体",
				        },
				        {
				            name: "非个体",
				        },
				    ],
				},
            ],
        }
    },
    watch: {

    }
}


// // 开关店占比趋势
// accountedFor: {
//     chartData: {
//         categories: [
//             "2016",
//             "2017",
//             "2018",
//             "2019",
//             "2020",
//             "2021",
//             "2022",
//             "2023",
//             "2024",
//             "2025",
//             "2026",
//             "2027",
//         ],
//         series: [
//             {
//                 name: "成交量A",
//                 data: [35, 8, 25, 37, 4, 20, 35, 8, 25, 37, 4, 20],
//                 legendShape: "rect",
//             },
//             {
//                 name: "成交量B",
//                 data: [70, 40, 65, 100, 44, 68, 35, 8, 25, 37, 4, 20],
//                 legendShape: "rect",
//             },
//             {
//                 name: "成交量C",
//                 data: [100, 80, 95, 150, 112, 132, 35, 8, 25, 37, 4, 20],
//                 legendShape: "rect",
//             },
//         ],
//     },
//     //您可以通过修改 config-ucharts.js 文件中下标为 ['area'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
//     opts: {
//         width: this.width,
//         height: this.height,
//         disableScroll: true, //在图表上滑动时禁止页面滚动。开启后，触摸图表时将会禁止屏幕滚动以及下拉刷新
//         enableScroll: true, //开启图表可拖拽滚动
//         dataLabel: false, //是否显示图表区域内数据点上方的数据文案
//         dataPointShape: false, //是否显示数据点的图形标识
//         padding: [15, 0, 0, 0],
//         legend: {
//             position: "top", //图例相对画布的显示位置
//             float: "left", //图例位置对齐方向
//         },
//         xAxis: {
//             disableGrid: true, //不绘制纵向网格(即默认绘制网格)
//             // scrollShow: true, //是否显示滚动条，配合拖拽滚动使用
//             scrollAlign: "left", //滚动条初始位置
//             boundaryGap: "center", //折线图、区域图起画点结束点方法
//             itemCount: 5, //单屏数据密度即图表可视区域内显示的X轴数据点数量，仅在启用enableScroll时有效
//             calibration: true,
//         },
//         yAxis: {
//             gridType: "dash",
//             dashLength: 2,
//             data: [
//                 {
//                     // format: (val) => {
//                     //   return val.toFixed(0) + "%";
//                     // },
//                     unit: "%",
//                     fontColor: "#666666",
//                 },
//             ],
//         },
//         extra: {
//             area: {
//                 type: "curve",
//                 opacity: 0.2,
//                 addLine: true,
//                 width: 2,
//                 gradient: true,
//             },
//         },
//     },
// },