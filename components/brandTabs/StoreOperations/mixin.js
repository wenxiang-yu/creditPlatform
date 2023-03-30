export default {
  data(){
	  return {
		  pine: {
		      eopts: {
		          color: ["#d91ad9","#F7BA1E","#3491FA","#14C9C9","#165DFF","#722ED1"],
		          legend: {
		              show: false,
		              left: 0,
		              textStyle: {
		                  color: "#86909C", //图例文字颜色
		                  fontSize: 20
		              },
		              icon: "circle", //图例样式
		              itemWidth: this.rpxToPx(20), //图例宽
		              itemHeight: this.rpxToPx(20), //图例高
		          },
		          tooltip: {
		              trigger: 'item',
		              // formatter: '{c}\n({d}%)',
		              // formatter: (item)=>{
		              //     return `${item.name}\n${item.value.toLocaleString()}家\n${item.percent}%`
		              // },
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
		                          return `${item.data.value}%`
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
		  //折线图
            line: {
                eopts: {
                    tooltip: {
                        trigger: 'axis',
						confine:true,
                        // axisPointer: {
                        //     type: 'shadow'
                        // },
      //                   formatter: (params)=>{
						// 	console.log("params",params);
						// }
                    },
                    color: ["#165DFF", "#14C9C9", "#722ED1","#F7BA1E"],
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
                            "总员工数", "活跃企业人均雇员数", "历史总企业数","活跃企业数"
                        ],
                        // selectedMode: false, //取消图例上的点击事件

                    },
                    grid: {
                        top: "25%",
                        left: "2%",
                        right: "0%",
                        bottom: "0%",
                        containLabel: true,
                    },
                    dataZoom: [

                        // {
                        //     type: "inside",
                        //     xAxisIndex: [0],
                        //     start: 20,
                        //     end: 100,
                        // },
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
                                // formatter: '{value}',
                            },
                        },
                    ],
                },
                chartData: {
                    series: [
                        {
                            name: "总员工数",
                            type: "line",
                            smooth: true, //平滑线条
                            showSymbol: false, //隐藏圆点
                            areaStyle: {
                                opacity: 0.3
                            },
                            data: [12, 13, 10, 13, 91, 23, 20],
                        },
                        {
                            name: "活跃企业人均雇员数",
                            type: "line",
                            smooth: true, //平滑线条
                            showSymbol: false, //隐藏圆点
                            areaStyle: { opacity: 0.3 },
                            data: [52, 14, 17, 13, 41, 23, 80],
                        },
                        {
                            name: "历史总企业数",
                            type: "line",
                            smooth: true, //平滑线条
                            showSymbol: false, //隐藏圆点
                            areaStyle: { opacity: 0.3 },
                            data: [34, 78, 12, 76, 23, 34, 54],
                        },
						{
						    name: "活跃企业数",
						    type: "line",
						    smooth: true, //平滑线条
						    showSymbol: false, //隐藏圆点
						    areaStyle: { opacity: 0.3 },
						    data: [34, 78, 12, 76, 23, 34, 54],
						},
                    ],
                },
            },
	  }
  }
}