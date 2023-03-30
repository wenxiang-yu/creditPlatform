export default {
    data() {
        return {
            // 门店总数
            operation: {
                eopts: {
                    color: ["#165DFF"],
                    grid: {
                        top: "15%",
                        left: "4%",
                        right: `${this.rpxToPx(20)}%`,
                        bottom: "15%",
                        containLabel: true,
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                        formatter: (item) => {
                            return `${item[0].name}月\n${item[0].value.toLocaleString()}家`
                        }
                    },
                    xAxis: {
                        name: "月",
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisLabel: {
                            color: "#86909C"
                        },
                        axisLine: {
                            lineStyle: { color: "#86909C" }
                        },
                        // boundaryGap: false,
                    },
                    yAxis: {
                        name: "门店数量",
                        nameTextStyle: {
                            color: "#86909C"
                        },
                        type: 'value',
                        axisLabel: {
                            color: "#86909C"
                        },
                        axisLine: {
                            show: false
                        },
						axisTick:{
							  show:false // 不显示坐标轴刻度线
						},
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: ['#E5E6EB'],
                                type: 'dashed'
                            }
                        },
                    },
                    dataZoom: [
                        {
                            show: true,
                            realtime: true,
                            // dataBackground:{
                            //     lineStyle:{
                            //         color:"#2AB7F5"
                            //     },
                            //     areaStyle:{
                            //         color:"#2AB7F5"
                            //     }
                            // },
                            // backgroundColor: "#2AB7F5",
                            start: 0,
                            end: 50,
							fillerColor:'#bed5ff',
							backgroundColor:"#e8f3ff",
							dataBackground :{
								lineStyle:{
									color:"#6AA1FF",
									shadowColor:"#e8f3ff",
									width: 1 ,
								},						
								areaStyle:{
									color:"#e8f3ff",
								}
							},
							handleStyle:{
								color:'#6AA1FF',
								 shadowColor:'#6AA1FF',
								 
							},
                        },
                        {
                            type: "inside",
                            xAxisIndex: [0],
                            startValue: 0,
                            endValue: 4,
                        },
                    ],
                },
                chartData: {
                    series: [
                        {
                            data: [6, 5, 7, 6, 5, 4, 3],
                            type: 'bar',
                            stack: 'total',
                        }

                    ],
                }
            },
            operation2: {
                eopts: {
                    color: ["#165DFF", "#F7BA1E"],
                    tooltip: {
                        trigger: 'axis',
						// confine: true ,
                        axisPointer: {
                            type: 'shadow'
                        },
                        // formatter: "{b1}\n{c}%"
                        formatter: (item) => {
							console.log(typeof(item[1].name));
                            return `年份：${item[0].axisValue}\n存续企业数：${item[0].name.toLocaleString()}家\n关店企业数：${Number(item[1].name).toLocaleString()}家\n存续企业同比：${item[0].value}%\n关店企业同比：${item[1].value}%`
                        },
                    },
                    grid: {
                        top: "15%",
                        left: "4%",
                        right: "4%",
                        bottom: "10%",
                        containLabel: true,
                    },
                    legend: {
                        // selectedMode: false, //取消图例上的点击事件
                        textStyle: {
                            color: "#86909C", //图例文字颜色
                        },
                        itemStyle: {
                            // color: "#86909C",

                        },
                        itemWidth: this.rpxToPx(20), //图例宽
                        itemHeight: this.rpxToPx(20), //图例高
                        left: 0,
                        data: [
                            {
                                name: "企业数量",
                                icon: "circle"
                            },
                            {
                                name: '同比',
                                icon: "circle"
                            }
                        ],
                    },
                    xAxis: {
                        // name: "月",
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisLabel: {
                            color: "#86909C"
                        },
                        axisLine: {
                            lineStyle: { color: "#86909C" }
                        },
                        // boundaryGap: false,
                    },
                    yAxis: {
                        // name: "存活率：%",
                        nameTextStyle: {  // y轴name的样式调整
                            color: "#86909C",
                            lineHeight: this.rpxToPx(40),
                        },
                        type: 'value',
                        axisLabel: {
                            color: "#86909C",
                            formatter: (item) => {
                                return item + "%"
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: ['#E5E6EB'],
                                type: 'dashed'
                            }
                        },
					   axisTick:{
							  show:false // 不显示坐标轴刻度线
						},
                        axisLine: {
                            show: false
                        },
                    },
                    dataZoom: [
                        {
                            type: "inside",
                            xAxisIndex: [0],
                            startValue: 0,
                            endValue: 4,
							
                        },
                    ],
                },
                chartData: {
                    series: [
                        {
                            name: "企业数量",
                            data: [120, 200, 150, 80, 70, 110, 130],
                            type: 'bar',
                            stack: 'total',
                            label: {
                                show: false,
                                // formatter: '{c}%',
                                formatter: (item) => {
                                    // console.log(item);
                                    if (item.value==0) {
                                        return `${item.value}%\n\n`

                                    }
                                    return `${item.value}%`
                                },
                                color: "#86909C"
                            },
                        },
                        {
                            name: "同比",
                            data: [120, 200, 150, 80, 70, 110, 130],
                            type: 'bar',
                            stack: 'total',
                            label: {
                                show: false,
                                // formatter: '{b}',
                                formatter: (item) => {
                                    if (item.value==0) {
                                        return ``

                                    } else {
                                        return `${item.value}%`

                                    }

                                },
                                color: "#86909C",
                                // position: 'top'
                            },
                        }

                    ],
                }
            },
            operation3: {
                eopts: {
                    color: ["#165DFF", "#14C9C9"],
                    grid: {
                        top: "15%",
                        left: 0,
                        right: "5%",
                        bottom: "15%",
                        containLabel: true,
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                        formatter: (item) => {
                            return `年份：${item[0].name}\n运营期：${item[0].value.toLocaleString()}月\n闭店期：${item[1].value.toLocaleString()}月`
                        }
                    },
                    legend: {
                        itemStyle: {
                            // color: "#86909C",
                        },
                        textStyle: {
                            color: "#86909C", //图例文字颜色
                        },
						icon:"circle",
						itemWidth: this.rpxToPx(20), //图例宽
						itemHeight: this.rpxToPx(20), //图例高
						left: 0,
                        data: ["运营期", '闭店期'],
                    },
                    dataZoom: [
                        {
                            type: "slider",
                            xAxisIndex: [0],
                            startValue: 0,
                            endValue: 4,
							bottom:0,
							fillerColor:'#bed5ff', 
							backgroundColor:"#e8f3ff",
							dataBackground :{
								lineStyle:{
									color:"#6AA1FF",
									shadowColor:"#e8f3ff",
									width: 1 ,
								},						
								areaStyle:{
									color:"#e8f3ff",
								}
							},
							handleStyle:{
								color:'#6AA1FF',
								 shadowColor:'#6AA1FF',
								 
							},
                        },
						{
						    type: "inside",
						    xAxisIndex: [0],
						    startValue: 0,
						    endValue: 4,
						},
                    ],
                    xAxis: [
                        {

                            type: "category",
                            // boundaryGap: false,
                            axisLabel: {
                                color: "#86909C",
                            },
                            axisLine: {
                                lineStyle: { color: "#86909C" }
                            },
                            data: ["2017-12-31", "2", "3", "4", "5", "6", "7"],
                        }
                    ],
                    yAxis: [
                        {
                            type: "value",
                            axisLine: {
                                show: false
                            },

                            splitLine: {
                            show: true,
                            lineStyle: {
                                color: ['#E5E6EB'],
                                type: 'dashed'
                            }
                            },
                            axisLabel: {
                                color: "#86909C",
                            },
							axisTick:{
								  show:false // 不显示坐标轴刻度线
							},

                        },
                    ],
                },
                chartData: {
                    series: [
                        {
                            name: "运营期",
                            type: "line",
                            smooth: true, //平滑线条
                            showSymbol: false, //隐藏圆点
                            data: [52, 14, 17, 13, 41, 23, 80],
							areaStyle:{
							color:"#165DFF",
							opacity: 0.3 ,
							}
                        },
                        {
                            name: "闭店期",
                            type: "line",
                            smooth: true, //平滑线条
                            showSymbol: false, //隐藏圆点
                            data: [5, 14, 17, 13, 41, 23, 80],
							areaStyle:{
							color:"#14C9C9",
							opacity: 0.3 ,
							}
                        },

                    ],
                }
            },
            pieOption: {
                eopts: {
                    // title: {
                    //     text: '月',
                    // },
                    color: ["#f7ba1e","#3491fa","#722ed1","#165dff", "#14c9c9", ],
					grid: {
					    containLabel: true,
					},
                    title: {
                        text: '单位：月',
                        right: 10,
                        bottom: 20,
                        textStyle: {
                            color: '#ccc',
                            fontSize: this.rpxToPx(25)
                        }
                    },
                    legend: {
                        icon: "circle", //图例样式
                        orient: 'vertical',
                        right: "8%",
						top:"center",
                        itemWidth: this.rpxToPx(20), //图例宽
                        itemHeight: this.rpxToPx(20), //图例高
                        textStyle: {
                            color: "#86909C"
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        // formatter: '{c}\n({d}%)',
                        formatter: (item) => {
                            return `${item.name}\n${item.value.toLocaleString()}家\n${item.percent}%`
                        }
                    },

                },
                chartData: {
                    series: [
                        {
                            type: 'pie',
                            radius: '70%',
							center:['30%', '50%'],
							avoidLabelOverlap:true,
                            data: [
                                { value: 1048, name: '(0,12]' },
                                { value: 735, name: '(12,36]' },
                                { value: 580, name: '(36,60]' },
                                { value: 484, name: '(60,120]' },
                                { value: 300, name: '(120,∞)' }
                            ],
                    label: {
						position:"inside",
                        formatter: '{d}%',
                        color: "#fff",
						fontSize:12
                    },
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }
            },
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
    }
}