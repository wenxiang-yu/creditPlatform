<template>
  <view class="pppm">
    <gt-box type="twoBorder" class="twoBorder">
      <view class="bar">
        <view
          v-for="(item, index) in bar"
          :key="index"
          :class="active === index ? 'active' : ''"
          @click="actived(index)"
          >{{ item }}
		</view>
      </view>
	  <view class="select">
	  	<view class="options" v-for="(item,index) in selectL" @click="selectBrand(index)"  :class="brandActive === index ? 'active' : ''">
	  		{{item}}
	  	</view>
	  </view>
      <!-- {{topData}} -->
      <gt-ucharts
        v-if="show"
        :width="630"
        :height="3000"
        :options="getTopData"
        canvasId="map3"
      />
      <gt-no-data v-else />
    </gt-box>
    <view class="pie" v-if="false">
      <text>门店占比</text>
      <gt-ucharts
        v-if="show"
        :width="100"
        :height="100"
        :options="pie"
        canvasId="pie"
      />
      <!-- <gt-no-data v-else /> -->
    </view>
	<view style="height: 40rpx;">
		
	</view>
  </view>
</template>

<script>
import GtBox from "@/components/gtBox/GtBox.vue";
import GtUcharts from "@/components/gtUcharts/GtUcharts.vue";
import { getTop } from "@/api/index.js";
import {mapMutations} from 'vuex'
import mixin from "./mixin.js";

export default {
  name: "pppm",
  mixins: [mixin],
  components: {
    GtBox,
    GtUcharts,
  },
  data() {
    return {
      active: 0,
	  brandActive:0,
      bar: ["TOP0-50", "TPO50-100", "TPO100-150"],
	  selectL:["门店数量排行榜","门店运营排行榜","品牌综合排行榜","品牌信息排行榜","产品运营排行榜","发展趋势排行榜","品牌价值排行榜"],
      loading: 0, //loading
      topData: [[], [], []], //地域发展数据
      topObject: {}, //echarts展示数据
      tLength: 0, //map3高度
      show: true,
    };
  },
  watch: {
    "$store.state.FormData": {
      handler(newV) {
        // this.$setNewV(newV);
        this.getTop(newV);
      },
      immediate: true, // 立即执行
    },
  },
  computed: {
    getTopData() {
      return this.topObject;
    },
  },
  created() {
    //   设置datalist
    this.$store.commit("setDataList", this.dataList);
  },
  methods: {
    /**
     * @name: getTop
     * @msg: 地域发展
     * @param {*}
     * @return {*}
     */
	...mapMutations(["setFormData"]),
    getTop(newV) {
      uni.showLoading({
        title: "加载中",
        mask: true,
      });
      this.show = false;
      getTop(newV).then((res) => {
        if (!res.data.length && !res.datas.length) {
          this.topData = [[], [], []];
          uni.hideLoading();
          return;
        }
		
        this.pie.chartData.series[0].data =  res.datas.length >0  ? [
          res.datas[0].nums,
          res.datas[0].len,
        ] : [];
        this.pie.chartData.series[1].data =res.datas.length >0 ? [res.datas[0].zb] : [0];
        let t1 = [];
        let t2 = [];
        let t3 = [];
        res.data.forEach((item, index) => {
          if (index < 50) {
            t1.push(item);
          } else if (index < 100) {
            t2.push(item);
          } else {
            t3.push(item);
          }
        });

        this.topData = [t1, t2, t3];
        this.topData.forEach((item) => {
          item.sort(function (a, b) {
            return a.value > b.value ? 1 : -1; //升序  < 降序
          });
        });
        this.toProcess(this.topData[this.active]);
        this.show = true;
        uni.hideLoading();
      });
    },
    toProcess(list) {
      let data =this.$Clone(this.top);
      let ky = [];
      let ky1 = [];
      let yAxis = [];
      list.forEach((item, index) => {
        yAxis.push("");
        ky.push({ value: 0, name: item.key });
        ky1.push({ value: item.value, name: item.key });
      });
	  let copkey = ky.map(val=>{
		  return {
			  value:val.name
		  }
	  })
      data.eopts.yAxis[0].data = copkey;
      data.chartData.series[0].data = ky;
      data.chartData.series[1].data = ky1;
      this.topObject = data;
    },
    actived(index) {
      this.toProcess(this.topData[index]);
      this.active = index;
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
	selectBrand(index){
		this.brandActive = index
		this.setFormData({
			targets:this.selectL[index]
		})
	}
  },
};
</script>
<style lang="less" scoped>
.pppm {
  // width: 100vw;
  padding: 30rpx;
  .twoBorder {
    padding: 20rpx;
  }
}
.bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 14rpx;
  > text {
    display: block;
    font-size: 26rpx;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.64);
    padding-bottom: 20rpx;
  }
  > .active {
    font-size: 28rpx;
    font-weight: 500;
    color: #3662EC;
    border-bottom: 6rpx solid #3662EC;
  }
}
.select{
	height: 71rpx;
	background: rgba(0,0,0,0.04);
	border-radius: 36rpx 36rpx 36rpx 36rpx;
	opacity: 1;
	display:flex;
	justify-content: flex-start;
	align-items:center;
	font-size: 24rpx;
	font-weight: normal;
	line-height: 34rpx;
	margin-bottom:30rpx;
	overflow-x: auto;
	overflow-y: hidden;
	>.options{
	flex-shrink: 0;
	margin: 0 10rpx;
	height: 55rpx;
	border-radius: 28rpx 28rpx 28rpx 28rpx;
	line-height: 55rpx;
	padding:0 15rpx;
	}
	>.active{
		background: #FFFFFF;
		color: #3662EC;
	}
}
.pie {
  display: flex;
  align-items: center;
}
</style>
