<!--
 * @Date: 2022-05-16 13:00:56
 * @LastEditors: 大濕兄
 * @LastEditTime: 2022-12-14 10:58:00
 * @name: 
 * @FilePath: /monitoringh5/components/gtUcharts/GtUcharts2.vue
-->
<template>
  <view>
    <view class="charts-box" :style="`width:${width}rpx;height:${height}rpx`">
      <qiun-data-charts
        :canvasId="canvasId"
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
      type: Number,
      default: 670,
    },
    height: {
      type: Number,
      default: 670,
    },
    canvasId: {
      type: String,
      required: true,
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
  computed: {},
};
</script>

<style scoped lang="less">
.charts-box {
  margin-top: 20rpx;
}
</style>
