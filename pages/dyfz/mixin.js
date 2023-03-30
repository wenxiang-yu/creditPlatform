export default {
    data() {
        return {
            // 门店总数
            map3: {
                eopts: {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
						formatter:(parmas)=>{
							return `${parmas[0].data.value.toLocaleString()}家\n${parmas[0].data.name}`
						}
                    },
                    grid: {
                        top: "0%",
                        left: "0%",
                        right: "15%",
                        bottom: "8%",
                        containLabel: true,
                    },
                    xAxis: [
                        {

                            type: "value",
                            axisLabel: {
                                show: true,
								rotate:-70 
                            },
                            axisLine: {
                                show: false,
                                lineStyle: { color: "#86909C" }
                            },
                            splitLine: {
                                show: true, // 不显示网格线
								lineStyle:{
									type:"dotted",
									color:"#E5E6EB"
								}
                            },
							axisTick:{
								show:false
							},

                        },
                    ],
                    yAxis: [
                        {
                            axisLabel: {
                                color: "#86909C",
                            },
                            axisLine: {
                                lineStyle: { color: "#86909C" }
                            },
                            axisTick: {
                                show: false,
                            },
                            type: "category",
                            data: ["", "2", "3", "4", "5", "6", "7"],
                        },
						{
						    axisLabel: {
						        color: "#86909C",
						    },
						    axisLine: {
								show:false,
						        lineStyle: { color: "#86909C" }
						    },
						    axisTick: {
						        show: false,
						    },
						    type: "category",
						    data: ["", "2", "3", "4", "5", "6", "7"],
						},
                    ],
                },
                chartData: {
                    series: [
                        {
                            name: "门店数量",
                            type: "bar",
                            label: {
								color:"#CBCBCB",
                                show: true,
                                position: ["5%","30%"],
                                color: "#CBCBCB",
								// \n${item.value.toLocaleString()}家
                                formatter:(item)=>{
                                    return `${item.value.toLocaleString()}`
                                },
                            },
                            itemStyle: {
                                color: "#165DFF"
                            },
                            stack: 'total',
                            data: [12, 13, 10, 13, 91, 23, 20],
                        },
       //                  {
       //                      type: 'bar',
							// name:"precet",
       //                      stack: 'total',
       //                      label: {
							// 	color: "#86909C",
							// 	position:"right",
       //                          show: true,
       //                          formatter: (item)=>{
       //                              return `${item.name}`
       //                          },
       //                      },
       //                      stack: 'total',
       //                      data: [{ value: 0, name: "12" }]
       //                  },

                    ],
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