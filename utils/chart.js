//饼形图
export const pineOption = {
	title: {
		text: '预警企业风险概览',
		left: 'left'
	},
	tooltip: {
		trigger: 'item',
		// formatter: '{a} <br/>{b}:({d}%)',
	},

	legend: {
		show: false,
		bottom: 0,
		icon: 'rect',
		data: [
			'工商变更',
			'司法诉讼',
			'经营风险',
			'经营状况',
			'股权质押',
			'政府约谈',
			'警告',
			'提示',
			'其他',
		],
	},
	color: [
		'#fc8251',
		'#5470c6',
		'#91cd77',
		'#ef6567',
		'#f9c956',
		'#75bedc',
	],
	series: [
		{
			name: '风险等级',
			type: 'pie',
			selectedMode: 'single',
			radius: [0, '30%'],
			label: {
				show:false,
				position: 'inner',
				fontSize: 14,
				color: '#fff',
				formatter: '{b}\n   {d}%',
			},
			labelLine: {
				show: false,
			},

			data: [
				{ value: 35, name: '高风险' },
				{ value: 35, name: '中风险' },
				{ value: 30, name: '低风险' },
			],
		},
		{
			name: '风险类别',
			type: 'pie',
			radius: ['40%', '45%'],
			labelLine: {
				length: 10,
			},
			label: {
				alignTo: 'edge',
				minMargin: 5,
				edgeDistance: 10,
				lineHeight: 15,
				formatter: '{b}\n{d}% {c}   ',
			},
			// labelLayout: function (params) {
			// 	const isLeft = params.labelRect.x < myChart.getWidth() / 2
			// 	const points = params.labelLinePoints
			// 	// Update the end point.
			// 	points[2][0] = isLeft
			// 		? params.labelRect.x
			// 		: params.labelRect.x + params.labelRect.width
			// 	return {
			// 		labelLinePoints: points,
			// 	}
			// },
			data: [
				{ value: 1048, name: '工商变更' },
				{ value: 335, name: '司法诉讼' },
				{ value: 310, name: '经营风险' },
				{ value: 251, name: '经营状况' },
				{ value: 251, name: '股权质押' },
				{ value: 251, name: '政府约谈' },
			],
		},
	],
};
// 折现图
export const polyLine = {
	title: {
		text: '预警企业风险趋势',
		left: 'left'
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'cross',
			label: {
				backgroundColor: '#6a7985',
			},
		},
	},
	legend: {
		data: ['高风险', '中风险', '低风险'],
		bottom: '0%',
		icon: 'rect',
	},
	color: ['#FA5151', '#FF8F1F', '#2888e8'],
	toolbox: {
		feature: {
			saveAsImage: {},
		},
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '12%',
		containLabel: true,
	},
	xAxis: [
		{
			type: 'category',
			boundaryGap: false,
			data: ['08-01', '08-02', '08-03', '08-04', '08-05', '08-06', '08-07'],
		},
	],
	yAxis: [
		{
			type: 'value',
		},
	],
	series: [
		{
			name: '高风险',
			type: 'line',
			stack: 'Total',
			showSymbol: false,
			smooth: true,
			areaStyle: {},
			emphasis: {
				focus: 'series',
			},
			data: [120, 132, 101, 134, 90, 230, 210],
		},
		{
			name: '中风险',
			type: 'line',
			stack: 'Total',
			showSymbol: false,
			smooth: true,
			areaStyle: {},
			emphasis: {
				focus: 'series',
			},
			data: [220, 182, 191, 234, 290, 330, 310],
		},
		{
			name: '低风险',
			showSymbol: false,
			smooth: true,
			type: 'line',
			stack: 'Total',
			areaStyle: {},
			emphasis: {
				focus: 'series',
			},
			data: [150, 232, 201, 154, 190, 330, 410],
		},
	],
}
//倒柱形图
export const barOption = {
	title: {
		text: '预警企业风险排行',
		left: 'left'
	},
	color: ['#FA5151', '#FF8F1F', '#2888e8'],
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	legend: {
		data: ['高风险', '中风险', '低风险'],
		bottom: 2,
	},
	grid: {
		top: '17%',
		left: '3%',
		right: '4%',
		bottom: '8%',
		containLabel: true,
	},
	xAxis: {
		type: 'value',
	},
	yAxis: {
		type: 'category',
		data: [
		],
		axisLabel: {
			margin: 8,
			formatter: function (params) {
				var val = ''
				if (params.length > 4) {
					val = params.substr(0, 4) + '...'
					return val
				} else {
					return params
				}
			},
		},
	},
	series: [
		{
			name: '高风险',
			type: 'bar',
			stack: '风险',
			label: {
				show: true,
				position: 'inside',
				formatter: (params) => {
					if (params.value) {
						return params.value
					} else {
						return ""
					}
				}
			},
			data: [320, 302, 301, 334, 390, 330, 320],
		},
		{
			name: '中风险',
			type: 'bar',
			stack: '风险',
			label: {
				show: true,
				position: 'inside',
				formatter: (params) => {
					if (params.value) {
						return params.value
					} else {
						return ""
					}
				}
			},
			data: [120, 132, 101, 134, 90, 230, 210],
		},
		{
			name: '低风险',
			type: 'bar',
			stack: '风险',
			label: {
				show: true,
				position: 'inside',
				formatter: (params) => {
					if (params.value) {
						return params.value
					} else {
						return ""
					}
				}
			},
			data: [220, 182, 191, 234, 290, 330, 310],
		},
	],
}
export const mapOption = {
	tooltip: {
		show: true,
		// trigger: 'item',
		// axisPointer: {
		// 	type: 'none',
		// 	textStyle: {
		// 		color: '#000000',
		// 	},
		// },
	},
	series: [
		{
			name: '香港18区人口密度',
			type: 'map',
			map: 'china',
			label: {
				show: true
			},
		}
	],
}
