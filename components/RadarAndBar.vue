<!--
 * @Date: 2022-05-16 13:00:56
 * @LastEditors: 大濕兄
 * @LastEditTime: 2022-12-15 13:35:49
 * @name: 
 * @FilePath: /monitoringh5/components/RadarAndBar.vue
-->
<template>
  <view>
    <view class="charts-box" :style="`width:100%;height:${height}rpx`">
      <qiun-data-charts
        :canvasId="getCanvasId"
        :chartData="chartData"
        :echartsH5="true"
        :echartsApp="true"
        background="none"
        :eopts="eopts"
      />
    </view>
  </view>
</template>

<script>
export default {
  name: "GtUcharts",
  props: {
    width: {
      type: [Number, String],
      default: 670,
    },
    height: {
      type: [Number, String],
      default: 670,
    },

    options: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chartData: {},
      eopts: {},
    };
  },
  computed: {
    getCanvasId() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
    // getChartData() {
    //   return this.options.chartData;
    // },
    // getEopts() {
    //   return this.options.eopts;
    // },
  },
  watch: {
    options: {
      handler(newV) {
        setTimeout(() => {
          this.$set(this, "chartData", newV.chartData);
          this.$set(this, "eopts", newV.eopts);
        }, 500);
      },
      deep: true,
      immediate: true, // 立即执行
    },
  },
};
</script>

<style scoped lang="less">
.charts-box {
  margin-top: 20rpx;
}
</style>
