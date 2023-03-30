/*
 * 处理雷达图的数据传参
 * numArr 数据数组
 * nameArr 对应文字数组
 * title 雷达图name
 * bol 是否为多个，默认false
 * */
export const setChartData = (numArr, nameArr, title, bol = false) => {
    let { data, max } = bol ? setMoreSeriesData(numArr, title) : setSeriesData(numArr, title);
    return {
        eopts: {
            tooltip: {
                confine: true,//是否将 tooltip 框限制在图表的区域内
                formatter: (params) => {
                    let tips = params.value.reduce((st, item, index) => {
                        if (nameArr[index] !== undefined) {
                            st += `\n${nameArr[index].replace(/\n/g, '')}：${item}`
                        }
                        return st
                    }, '')
                    return `${params.name}(%)${tips}`
                }
            },
            radar: {
                radius: 80,
                indicator: setIndicator(nameArr, max),
            },
        },
        chartData: {
            series: [
                {
                    type: "radar",

                    data
                },
            ],
        }
    }
}

/*
 * 处理柱状图的数据传参
 * xAxis: x轴的值
 * yAxios: y轴的值
 * * title 柱状图name
 * */
export const setBarData = (xAxis, yAxios, title) => {
    return {
        eopts: {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                confine: true,//是否将 tooltip 框限制在图表的区域内
                formatter: (params) => {
                    let [{ name, data }] = [...params];
                    return `${name}：${data}`
                }
            },
            color: ["#165DFF", "#F7BA1E"],
            grid: {
                top: "15%",
                left: "5%",
                right: "5%",
                bottom: "10%",
                containLabel: true,
            },
            dataZoom: [
                {
                    type: "inside",
                    start: 0,
                    end: 40
                },
                {
                    type: 'slider',
                    showDetail: false
                }
            ],
            xAxis: [
                {
                    axisLabel: {
                        color: "#86909C",
                        interval: 0,
                        rotate: 35,
                        fontSize: 10,
                        formatter: function (params) {
                            var val = ''
                            if (String(params).length > 8) {
                                val = String(params.toLocaleString()).slice(0, 8) + '...'
                                return val
                            } else {
                                return String(params.toLocaleString())
                            }
                        },
                    },
                    axisLine: {
                        show: false,
                        lineStyle: { color: "#F2F3F5" },
                    },
                    // boundaryGap: true,
                    data: xAxis,
                },
            ],
            yAxis: [
                {
                    type: "value",
                    axisLine: {
                        show: false,
                        lineStyle: { color: "#F2F3F5" },
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ["#F2F3F5"],
                            type: "solid",
                        },
                    },
                    axisLabel: {
                        color: "#86909C",
                        // y轴加单位%
                        // formatter: "{value}%",
                    },
                },
            ],
        },
        chartData: {
            series: [
                {
                    name: title,
                    type: "bar",
                    data: yAxios,
                    itemStyle: {
                        normal: {
                            color: function (params) { //根据数值大小设置相关颜色
                                if (params.value > 0) {
                                    return '#165DFF'
                                } else {
                                    return '#F7BA1E'
                                }
                            }
                        }
                    }
                },
            ],
        },
    };
}


/*
 * 转换数组中的数字
 * */
export const setNum = (arr) => {
    return arr.map(item => {
        return Number((item * 100).toFixed(2))
    })
}

/*
 * 处理Indicator 的值
 * */
export const setIndicator = (nameArr, max) => {
    return nameArr.map(item => {
        return {
            color: "#000000",
            name: item,
            max
        }
    })
}
/*
 * 处理多个series的data
 * */
export const setMoreSeriesData = (values, titles) => {
    let data, max, color = ['#2f66de', '#61e527', '#eadd36'];
    data = values.map((item, index) => {
        max = setMax(item);
        return {
            value: item,
            name: titles[index],
            lineStyle: {
                color: color[index],
            },
        }
    })
    return { data, max };
}
/*
 * 处理一个series的data
 * */
export const setSeriesData = (values, title) => {
    let data, max;
    max = setMax(values);
    data = [{
        value: values,
        name: title,
        areaStyle: {
            color: "#2B7BF1",
        },
        lineStyle: {
            color: "#2B7BF1",
        },
    }]
    return { data, max }
}
/*
 * 计算最大值
 * */
export const setMax = (numArr) => {
    return numArr.reduce((num, item) => {
        if (item > num) {
            num = item
        }
        return num;
    }, 0)
}