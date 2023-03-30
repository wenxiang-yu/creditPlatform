export default {
 data(){
	 return {
		//折线图
		  singleLine: {
		      eopts: {
		          tooltip: {
		              trigger: 'axis',
		              // axisPointer: {
		              //     type: 'shadow'
		              // },
		              formatter: (params)=>{
						  return `${params[0].name}\n${params[0].data === "None" ? '-' : params[0].data}`
					  }
		          },
		          color: ["#165DFF"],
		          legend: {
					  show:false,
		              itemWidth: this.rpxToPx(20), //图例宽
		              itemHeight: this.rpxToPx(20), //图例高
		              textStyle: {
		                  color: "#191C31", //图例文字颜色
									fontSize:11,
		              },
		              left: 0,
		              top: 0,
		              data: [
		                  "总员工数"
		              ],
		              // selectedMode: false, //取消图例上的点击事件
		
		          },
		          grid: {
		              top: "10%",
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
		                  data: [],
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
		                      formatter: (value)=>{
								  if(value !== 0){
									  return value + '%'
								  }else{
									  return value
								  }
							  },
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
		                  data: [],
		              }
		          ],
		      },
		  }, 
		// 复合折线图
		complexLine: {
		    eopts: {
		        tooltip: {
		            trigger: 'axis',
					confine:true,
		            // axisPointer: {
		            //     type: 'shadow'
		            // },
		            formatter: (params)=>{
						return `${params[0].name}\n新开店数占比：${params[0].data}%\n关店数占比：${params[1].data}%\n净增店数占比：${params[2].data}%`
					}
		        },
		        color: ["#165DFF","#14C9C9","#F7BA1E"],
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
		                "新开店数占比",
						"关店数占比",
						"净增店数占比"
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
		                data: [],
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
		                    formatter: (value)=>{
										  if(value !== 0){
											  return value + '%'
										  }else{
											  return value
										  }
									  },
		                },
		            },
		        ],
		    },
		    chartData: {
		        series: [
		            {
		                name: "新开店数占比",
		                type: "line",
		                smooth: true, //平滑线条
		                showSymbol: false, //隐藏圆点
		                areaStyle: {
		                    opacity: 0.3
		                },
		                data: [],
		            },
					{
					    name: "关店数占比",
					    type: "line",
					    smooth: true, //平滑线条
					    showSymbol: false, //隐藏圆点
					    areaStyle: {
					        opacity: 0.3
					    },
					    data: [],
					},
					{
					    name: "净增店数占比",
					    type: "line",
					    smooth: true, //平滑线条
					    showSymbol: false, //隐藏圆点
					    areaStyle: {
					        opacity: 0.3
					    },
					    data: [],
					}
		        ],
		    },
		},
		// 双线条
		DoubleLine: {
		    eopts: {
		        tooltip: {
		            trigger: 'axis',
					confine:true,
		            // axisPointer: {
		            //     type: 'shadow'
		            // },
		            formatter: (params)=>{
						return `${params[0].name}\n新增：${params[0].data === 'None' ? '-' : params[0].data}\n关闭：${params[1].data === 'None' ? '-' : params[1].data}`
					}
		        },
		        color: ["#165DFF","#14C9C9"],
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
		                "新增",
						"关闭",
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
		                data: [],
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
		                    formatter: (value)=>{
								return value
									  },
		                },
		            },
		        ],
		    },
		    chartData: {
		        series: [
		            {
		                name: "新增",
		                type: "line",
		                smooth: true, //平滑线条
		                showSymbol: false, //隐藏圆点
		                areaStyle: {
		                    opacity: 0.3
		                },
		                data: [],
		            },
					{
					    name: "关闭",
					    type: "line",
					    smooth: true, //平滑线条
					    showSymbol: false, //隐藏圆点
					    areaStyle: {
					        opacity: 0.3
					    },
					    data: [],
					},
		        ],
		    },
		}, 
	 }
 }
}		 
		  