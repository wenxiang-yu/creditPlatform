<template>
  <view class="plfz">
    <gt-box type="twoBorder" class="twoBorder">
      <gt-ucharts
        v-if="show"
        :width="630"
        :height="mLength * 80"
        :options="getMap3Data"
        canvasId="map3"
      />
      <gt-no-data v-else />
    </gt-box>
	<view style="height: 40rpx;">
		
	</view>
  </view>
</template>

<script>
import GtBox from "@/components/gtBox/GtBox.vue";
import GtUcharts from "@/components/gtUcharts/GtUcharts.vue";
import { getMap3 } from "@/api/index.js";

import mixin from "./mixin.js";

export default {
  name: "dyfz",
  mixins: [mixin],
  components: {
    GtBox,
    GtUcharts,
  },
  data() {
    return {
      loading: 0, //loading
      map3Data: {}, //地域发展数据
      mLength: 0, //map3高度
      show: true,
    };
  },
  watch: {
    "$store.state.FormData": {
      handler(newV) {
        // this.$setNewV(newV);

        this.getMap3(newV);
      },
      immediate: true, // 立即执行
    },
  },
  computed: {
    getMap3Data() {
      return this.map3Data;
    },
  },
  created() {
    //   设置datalist
    this.$store.commit("setDataList", this.dataList);
  },
  methods: {
    /**
     * @name: getMap3
     * @msg: 地域发展
     * @param {*}
     * @return {*}
     */
    getMap3(newV) {
      uni.showLoading({
        title: "加载中",
        mask: true,
      });
      this.show = false;
      getMap3(newV).then((res) => {
        
        this.mLength = res.data[0].key.length;
        let data = {...this.map3};
        let ky = [];
        let ky2 = [];
        let yAxis = [];
        // data.chartData.series[1].data = res.data[0].value;
        res.data[0].key.forEach((item, index) => {
          yAxis.push("");
          ky2.push({
            value: res.data[0].value[index],
            name: res.data[0].percentage[index] + "%",
            city: item,
          });
        });
        data.eopts.yAxis[0].data = yAxis;
        ky2.sort(function (a, b) {
          return a.value > b.value ? 1 : -1; //升序  < 降序
        });
        ky2.forEach((item) => {
          ky.push({value: item.city });
        });
		let ky3 = ky2.map(val=>{
			return {
				value:val.name
			}
		})
        data.eopts.yAxis[0].data  = ky; //名称
		data.eopts.yAxis[1].data  = ky3; //名称
        data.chartData.series[0].data = ky2;
        this.$set(this, "map3Data", {});
        setTimeout(() => {
          this.$set(this, "map3Data", data);
        }, 500);
        this.show = true;
        uni.hideLoading();
      });
    },
    /**
     * @name: rpxToPx
     * @msg: rpx转px
     * @param {*} rpx
     * @return {*}
     */
    rpxToPx(rpx) {
      let scale = window.screen.width / 750;
      return scale * rpx;
    },
  },
};
</script>
<style lang="less" scoped>
.plfz {
  // width: 100vw;
  padding: 30rpx;
  .twoBorder {
    padding: 20rpx;
  }
}
</style>
