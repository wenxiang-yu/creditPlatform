           export default {
			   data(){
				   return {
					// 产品水平   
					storesTotal: {
					      eopts: {
					          tooltip: {
								show:false,
					            trigger: 'axis',
					  			// confine:true,
					              axisPointer: {
					                  type: 'shadow'
					              },
					          },
					          color: ["#165DFF"],
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
					              bottom: '-1%',
					              data: [
					                  {
					                      name: "家",
					                      icon: "circle", //图例样式
					                      itemWidth: 18, //图例宽
					                      itemHeight: 18,  //图例高
					                  }, "同比"
					              ],
					          },
					          grid: {
					              top: "15%",
					              left: "2%",
					              right: "2%",
					              bottom: "13%",
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
									  axisLine:{
										  lineStyle:{
											  color:"#C9CDD4"
										  }
									  },
									  axisTick:{
										  show:false
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
					                  name: "家",
					                  type: "bar",
					                  data: [12, 13, 10, 13, 91, 23, 50],
					              },
					          ],
					      },
					  
					  },
					  // 营运能力
				    ability1:{
						eopts: {
						    tooltip: {
														show:false,
						      trigger: 'axis',
											  			// confine:true,
						        axisPointer: {
						            type: 'shadow'
						        },
						    },
						    color: ["#165DFF","#F7BA1E"],
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
						                name: "开店",
						                icon: "circle", //图例样式
						                itemWidth: 18, //图例宽
						                itemHeight: 18,  //图例高
						            },
									{
									    name: "关店",
									    icon: "circle", //图例样式
									    itemWidth: 18, //图例宽
									    itemHeight: 18,  //图例高
									},
						        ],
						    },
						    grid: {
						        top: "15%",
						        left: "2%",
						        right: "2%",
						        bottom: "13%",
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
															  axisLine:{
																  lineStyle:{
																	  color:"#C9CDD4"
																  }
															  },
															  axisTick:{
																  show:false
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
						            name: "开店",
						            type: "bar",
									stack: 'total',
						            data: [12, 13, 10, 13, 91, 23, 50],
						        },
								{
								    name: "关店",
								    type: "bar",
									stack: 'total',
								    data: [12, 13, 10, 13, 91, 23, 50],
								},
						    ],
						},
					},
					// 运营能力二
					ability2:{
						eopts: {
						    tooltip: {
														show:false,
						      trigger: 'axis',
											  			// confine:true,
						        axisPointer: {
						            type: 'shadow'
						        },
						    },
						    color: ["#165DFF","#F7BA1E"],
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
						                name: "占比",
						                icon: "circle", //图例样式
						                itemWidth: 18, //图例宽
						                itemHeight: 18,  //图例高
						            },
									{
									    name: "活跃度",
									    icon: "circle", //图例样式
									    itemWidth: 18, //图例宽
									    itemHeight: 18,  //图例高
									},
						        ],
						    },
						    grid: {
						        top: "15%",
						        left: "2%",
						        right: "2%",
						        bottom: "13%",
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
															  axisLine:{
																  lineStyle:{
																	  color:"#C9CDD4"
																  }
															  },
															  axisTick:{
																  show:false
															  },
						            data: ["1", "2", "3", "4", "5", "6", "7"],
						        },
						    ],
						    yAxis: [
						        {
						            type: "value",
									max:100,
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
						                // y轴加单位%
						                formatter: function (value, index) {
											if(value !== 0){
												return value + "%";
											}else{
												return value
											}
						                },
						            },
											  				axisTick:{
											  					show:false,
											  				},
											  				
						        },
						    ],
						},
						chartData: {
						    series: [
						        {
						            name: "占比",
						            type: "bar",
						            data: [12, 13, 10, 13, 91, 23, 50],
						        },
								{
								    name: "活跃度",
								    type: "line",
									showSymbol:false,
									smooth:true,
								    data: [12, 13, 10, 13, 91, 23, 50],
								},
						    ],
						},
					},
				   }
			   }
		   }
			