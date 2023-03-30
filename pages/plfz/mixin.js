export default {
    data() {
        return {
            // 门店总数
            industry: {
                eopts: {
                    color: ["#5B8FF9", "#5AD8A6", "#5D7092", "#F6BD16", '#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'],
                    legend: {
                        show: false,
                        left: 0,
                        textStyle: {
                            color: "#86909C", //图例文字颜色
                            fontSize: this.rpxToPx(20)
                        },
                        icon: "circle", //图例样式
                        itemWidth: this.rpxToPx(20), //图例宽
                        itemHeight: this.rpxToPx(20), //图例高
                    },
                    tooltip: {
                        trigger: 'item',
                        // formatter: '{c}\n({d}%)',
                        formatter: (item)=>{
                            return `${item.name}\n${item.value.toLocaleString()}家\n${item.percent}%`
                        },
                    },

                },
                chartData: {
                    series: [
                        {
                            type: 'pie',
                            radius: ['40%', '50%'],
                            center: ['50%', '50%'],
                            // hoverAnimation: false,
                            // avoidLabelOverlap: false,
                            datasetIndex: 0,
                            label: {
                                show: true,
                                // position: 'inside',
                                // formatter: '{c}\n({d}%)',
                                formatter: (item)=>{
									// item.value.toLocaleString()
                                    return `${item.percent}%`
                                },
                                fontSize: this.rpxToPx(26),
                                // emphasis: {//中间文字显示
                                //     show: true,
                                // }
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: this.rpxToPx(20),
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: true
                            },
                            data: [
                                { value: 1048, name: '餐饮' },
                                { value: 735, name: '服务' },
                                { value: 580, name: '零食' },
                                { value: 484, name: '文体' },
                            ]
                        },
                        {
                            type: 'pie',
                            radius: ['0%', '0%'],
                            center: ['50%', '50%'],
                            datasetIndex: 1,
                            label: {
                                show: true,
                                color: "#86909C",
                                position: 'center',
                                formatter: '{c}',
                                fontSize: this.rpxToPx(26),
                                emphasis: {//中间文字显示
                                    show: true,
                                }
                            },
                            data: ["121"]
                        },

                    ],
                }
            },
            // 门店总数
            category: {
                eopts: {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        },
                        formatter: (item)=>{
                            return `${item[0].value}%\n${item[0].name.toLocaleString()}家`
                        },
                        // formatter: "{b}\n{c}家"
                    },
                    grid: {
                        top: "0%",
                        left: "0%",
                        right: `5%`,
                        bottom: "0%",
                        containLabel: true,
                    },
                    // dataZoom: [
                    //     {
                    //         type: "inside",
                    //         yAxisIndex: [0],
                    //         startValue: 0,
                    //         endValue: 5,
                    //     },
                    // ],
                    xAxis: [
                        {
                            type: "value",
							max:100,
							splitNumber:5,
                            axisLabel: {
                                show: true,
								formatter:(item)=>{
									return `${item}%`
								}
                            },
                            axisLine: {
                                show: false,
                                lineStyle: { color: "#86909C" }
                            },
							axisTick:{
								show:false
							},
                            splitLine: {
                                show: true, // 不显示网格线
								lineStyle:{
									type:"dotted",
									color:"#E5E6EB"
								}
							},
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
							axisTick:{
								show:false
							},
                            type: "category",
                            data: ["1", "2", "3", "4", "5", "6", "7"],
                        },
                    ],
                },
                chartData: {
                    series: [
                        {
                            name: "门店数量",
                            type: "bar",
                            label: {
                                show: false,
                                position: 'right',
                                color: "#86909C",
                                // formatter: "{b}\n{c}",
                                // formatter: (item)=>{
                                //     return `${item.value.toLocaleString()}\n${item.name}`
                                // },
                                fontSize: this.rpxToPx(15),
                            },
                            itemStyle: {
                                color: "#165DFF"
                            },
                            stack: 'total',
							barWidth : 25,//柱图宽度
                            data: [12, 13, 10, 13, 91, 23, 20],
                        },
                        // {
                        //     type: 'bar',
                        //     stack: 'total',
                        //     label: {
                        //         show: true,
                        //         formatter: "              {b}"
                        //     },
                        //     data: [{ value: 0, name: "12" }]
                        // },
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