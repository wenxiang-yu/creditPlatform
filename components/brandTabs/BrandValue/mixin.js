export default {
	data(){
		return {
		// 雷达图
		 Radar:{
			 eopts: {
				  tooltip: {
					  confine:true,
					  formatter:(params)=>{
						  return `${params.name}\n品牌知名度：${params.value[0]}\n行业利润率：${params.value[1]}\n行业景气度：${params.value[2]}`
					  }
				  },
				  radar: {  
				    name: {
				      textStyle: {
				        color: "#333333",
				        fontSize: 14
				      },
				    },
				    indicator: [],
				    axisLine: {
				      lineStyle: {
				        color: "rgba(153, 209, 246, 0.5)" // 轴线颜色
				      }
				    },
				    splitArea: {
				      show: false,
				      areaStyle: {
				        color: "rgba(255,0,0,0)" // Rader图背景颜色
				      }
				    },
				    splitLine: {
				      show: true,
				      lineStyle: {
				        width: 2,
				        color: "rgba(153, 209, 246, 0.5)" // 网格分割线颜色
				      }
				    }
				  }, 
			 },
			 chartData: {
				   series: [
					{
					  type: 'radar',
					  data: [
						{
						  value: [],
						  areaStyle: {
							color: 'rgba(64, 158, 255, 0.2)'
						  },
						  symbol: 'none',
						  itemStyle: {
							normal: {
							  color: "#c8eeff",
							  borderColor: "#2cc1fa",
							}
						  },
						  lineStyle: {
							color: "#0098FA",
							width: 2
						  }
						}
					  ]
					}
				  ]
			 },
		 }
		}
	}
}