<!--
 * @Date: 2022-12-14 10:00:25
 * @LastEditors: 大濕兄
 * @LastEditTime: 2022-12-14 12:00:25
 * @name: 
 * @FilePath: /monitoringh5/pages/demonstration.vue
-->
<template>
  <view>
    <RadarAndBar width="750" :options="getOptions"></RadarAndBar>
    <RadarAndBar width="750" :options="getOptions2"></RadarAndBar>
    <RadarAndBar width="750" :options="getOptions3"></RadarAndBar>
  </view>
</template>

<script>
import RadarAndBar from "@/components/RadarAndBar.vue";
export default {
  components: {
    RadarAndBar,
  },
  computed: {
    getOptions() {
      return {
        eopts: {
          radar: {
            // shape: 'circle',
            indicator: [
              { name: "企业主体", max: 6500 },
              { name: "疑似诈骗", max: 16000 },
              { name: "股东实力", max: 30000 },
              { name: "企业类型", max: 38000 },
            ],
          },
        },
        chartData: {
          series: [
            {
              name: "Budget vs spending",
              type: "radar",
              data: [
                {
                  value: [4200, 3000, 20000, 35000],
                  name: "企业主体",
                  areaStyle: {
                    color: "#2B7BF1",
                  },
                  lineStyle: {
                    color: "#2B7BF1",
                  },
                },
              ],
            },
          ],
        },
      };
    },
    getOptions2() {
      return {
        eopts: {
          tooltip: {
            trigger: "axis",
            // formatter:
            //   "年份：{b}\n新开企业数占比：{c}%\n关闭企业数占比：{c1}%\n净增企业数占比：{c2}%",
          },
          color: ["#165DFF", "#F7BA1E"],
          grid: {
            top: "15%",
            left: "2%",
            right: "0%",
            bottom: "0%",
            containLabel: true,
          },
          xAxis: [
            {
              axisLabel: {
                color: "#86909C",
              },

              axisLine: {
                show: false,
                lineStyle: { color: "#F2F3F5" },
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
                formatter: "{value}%",
              },
            },
          ],
        },
        chartData: {
          series: [
            {
              name: "新开企业数占比",
              type: "bar",
              stack: "one",
              data: [12, 13, 10, 13, 91, 23, 20],
            },
            {
              name: "关闭企业数占比",
              type: "bar",
              stack: "one",
              data: [-52, 14, 17, 13, 41, 23, 80],
            },
          ],
        },
      };
    },
    getOptions3() {
      return {
        eopts: {
          tooltip: {
            trigger: "axis",
            // formatter:
            //   "年份：{b}\n新开企业数占比：{c}%\n关闭企业数占比：{c1}%\n净增企业数占比：{c2}%",
          },
          color: ["#165DFF"],
          grid: {
            top: "15%",
            left: "2%",
            right: "0%",
            bottom: "0%",
            containLabel: true,
          },
          xAxis: [
            {
              axisLabel: {
                color: "#86909C",
              },

              axisLine: {
                show: false,
                lineStyle: { color: "#F2F3F5" },
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
                formatter: "{value}%",
              },
            },
          ],
        },
        chartData: {
          series: [
            {
              name: "新开企业数占比",
              type: "bar",
              data: [12, 13, 10, 13, 91, 23, 20],
            },
          ],
        },
      };
    },
  },
  methods: {},
};
</script>

<style></style>
