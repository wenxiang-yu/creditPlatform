export default {
    data() {
        return {
            // 门店总数
            top: {
                eopts: {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',

                        },
                        // formatter: "{b} {c1}"
                        formatter:(item)=>{
                            return `${item[1].name}\n${item[1].value.toLocaleString()}家`
                        },
                    },
                    grid: {
                        top: "0%",
                        left: "0%",
                        right: "7%",
                        bottom: "3%",
                        containLabel: true,
                    },
                    xAxis: [
                        {
                            type: "value",
                            axisLabel: {
                                show: true,
								rotate:-70
                            },
							splitLine: {
							    show: true, // 不显示网格线
								lineStyle:{
									type:"dotted",
									color:"#E5E6EB"
								}
							},
                            axisLine: {
                                show: false,
                                lineStyle: { color: "#86909C" }
                            },
                            // splitLine: {
                            //     show: false // 不显示网格线
                            // },

                        },
                    ],
                    yAxis: [
                        {
                            axisLabel: {
                                color: "#86909C",
                            },
                            axisLine: {
                                lineStyle: { color: "#C9CDD4" }
                            },
                            axisTick: {
                                show: false
                            },
                            type: "category",
                            data: ["", "2", "3", "4", "5", "6", "7"],
                        },
                    ],
                },
                chartData: {
                    series: [
                        {
                            type: 'bar',
                            label: {
                                show: false,
                                formatter: "{b}",
                                position: 'right',
                                color: "#86909C"
                            },
                            data: [{ value: 0, name: "12" }]
                        },
                        {
                            name: "门店数量",
                            type: "bar",
                            label: {
                                show: true,
                                position: ['0%','30%'],
                                color: "#CBCBCB",
                                formatter:(item)=>{
                                    return `${item.value.toLocaleString()}`
                                },
                            },
                            itemStyle: {
                                color: "#165DFF",
								
                            },
							barWidth : 20,//柱图宽度
                            stack: 'total',
                            data: [12, 13, 10, 13, 91, 23, 20],
                        },

                    ],
                }
            },
            pie: {
                eopts: {
                    color: ["#73DEB3", "#73A0FA"],
                },
                chartData: {
                    series: [
                        {
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                                position: 'center',
                                emphasis: {//中间文字显示
                                    show: true,
                                }
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '40',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: [
                                { value: 1048, name: 'Search Engine' },
                                { value: 735, name: 'Direct' },
                            ]
                        },
                        {
                            type: 'pie',
                            radius: ['0%', '0%'],
                            datasetIndex: 1,
                            label: {
                                show: true,
                                color: "#86909C",
                                position: 'center',
                                formatter: '{c}%',
                                emphasis: {//中间文字显示
                                    show: true,
                                }
                            },
                            data: [""]
                        },
                    ]
                },
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