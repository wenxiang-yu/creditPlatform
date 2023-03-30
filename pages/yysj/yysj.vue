<template>
  <view class="yysj">
    <!-- 选择年份 -->
    <view class="date" ref="date">
      <view
        :class="active == item ? 'active' : ''"
        @click="dateClick(item)"
        v-for="(item, index) in getTime"
        :key="`index${index}`"
        >{{ item }}</view
      >
    </view>

    <view class="title">
<!--      <gt-line title="运营期" />
      <gt-icon :tips="'所选择的时间节点企业是存活状态的企业的运营时间'" /> -->
    </view>

    <gt-box type="twoBorder" class="twoBorder">
	 <view class="headStore">
	 	<view class="left">
	 		运营期
	 	</view>
		<view class="right">
			<view v-for="(item,index) in ['运营数量','运营占比']" :style="{color:openStore === index ? '#165DFF':'#1D2129',background:openStore === index ? '#fff' : ''}"  @click="openStore = index">
			{{item}}
			</view>
		</view>
	 </view>
      <view class="text">
		  <view class="left">
		  <text>平均(个月)</text>
		  <text>{{ Math.trunc(formData.avg) || 0 }}</text>	
		  </view>
		  <view class="right">
			 <text>门店数量(家)</text>
		  	 <text>{{ Math.trunc(formData.mendian).toLocaleString() || 0 }}</text>
		  </view>
      </view>
	  <view :class="{transfrom :openStore === 1}">
      <gt-ucharts
        :width="680"
        :height="600"
        :options="getOption1"
        canvasId="barOption1"
      />	  	
	  </view>

      <!-- <view class="dw">月</view> -->
		<view :class="{transfrom :openStore === 0}">
		<gt-ucharts
		:width="680"
		:height="500"
		:options="getPieOption1"
		canvasId="getPieOption1"
		/>	
		</view>

      <!-- <gt-no-data v-else /> -->
    </gt-box>
    <view class="title">
    </view>

    <gt-box type="twoBorder" class="twoBorder">
		<view class="headStore">
			<view class="left">
				闭店期
			</view>
				<view class="right">
					<view v-for="(item,index) in ['运营数量','运营占比']" :style="{color:closeStore === index ? '#165DFF':'#1D2129',background:closeStore === index ? '#fff' : ''}"  @click="closeStore = index">
					{{item}}
					</view>
				</view>
		</view>
      <view class="text">
		  <view class="left">
			  <text>平均(个月)</text>
		 <text>{{ Math.trunc(formData2.avg) || 0 }}</text>
		  </view>
		  <view class="right">
			  <text>门店数量(家)</text>
		  	<text>{{
		  	  Math.trunc(formData2.mendian).toLocaleString() || 0
		  	}}</text>
		  </view>
      </view>
		<view :class="{transfrom :closeStore === 1}">
		<gt-ucharts
        :width="680"
        :height="600"
        :options="getOption2"
        canvasId="getOption2"
        />
		  </view>
      <view :class="{transfrom :closeStore === 0}">
        <gt-ucharts
        :width="680"
        :height="500"
        :options="getPieOption2"
        canvasId="getPieOption2"
      /> 	
      <!-- <view class="dw">月</view> -->
	  </view>
 
      <!-- <gt-no-data v-else /> -->
    </gt-box>

    
    <view class="box">
      <view class="title">
      <gt-line title="同比店存活率" />
<!--      <gt-icon
        :tips="'根据固定时间维度，统计当前时间的新开店数，依次计算这一批新开店数在各个时间维度的存续和关闭门店数量的占比'"
      /> -->
    </view>
      <gt-ucharts
        :width="680"
        :height="550"
        :options="getOption3"
        canvasId="getOption3"
      />
    </view>

    <view class="box">
      <view class="title">
        <gt-line title="平均生存期" />
        <!-- <gt-icon :tips="'平均运营期/平均闭店期'" /> -->
      </view>
      <gt-ucharts
        :width="680"
        :height="550"
        :options="getOption4"
        canvasId="getOption4"
      />
    </view>
   <br />
   <!-- <br /> -->
    <!-- <br /> -->
  </view>
</template>

<script>
import GtBox from "@/components/gtBox/GtBox.vue";
import GtUcharts from "@/components/gtUcharts/GtUcharts.vue";
import {
  getOperation,
  getOperationDown,
  getAvg_rate,
  getAvg_operation,
  getBrand,
} from "@/api/index.js";
import GtLine from "@/components/gtLine/GtLine.vue";
import GtIcon from "@/components/gtIcon/GtIcon.vue";

import mixin from "./mixin.js";

export default {
  name: "yysj",
  mixins: [mixin],
  components: {
    GtBox,
    GtUcharts,
    GtLine,
    GtIcon,
  },
  data() {
    return {
      date: [], //时间滚动轴
      active: null, //默认第一次展示的时间
      loading: 0, //loading
      formData: {}, //返回回来的数据开店期
      formData2: {}, //返回回来的数据b闭店期
      barOption1: {},
      barOption2: {},
      barOption3: {},
      barOption4: {},
      pieOption1: {},
      pieOption2: {},
      show: true,
	  closeStore:0, //闭店期
	  openStore:0 //运营期
    };
  },
  watch: {
    // active(newV) {
    //   this.setFormData = { time: newV };
    // },
    // "$store.state.timeOption": {
    //   handler(newV) {
    //     this.active = newV[newV.length - 1];
    //   },
    //   immediate: true, // 立即执行
    // },
    "$store.state.FormData": {
      handler(newV) {
        if (this.loading) return;
        // this.$setNewV(newV);

        uni.showLoading({
          title: "加载中",
          mask: true,
        });
        this.active = newV.time;
        let bl = false;
        if (newV.brand) {
          bl = true;
        } else {
          this.dataList[0].index = null;
          this.$store.commit("setDataList", this.dataList);
        }
        if (newV.time) {
          this.getOperation(newV, bl);
          this.getOperationDown(newV, bl);
          this.getAvg_rate(newV, bl);
          this.getAvg_operation(newV, bl);
          this.getBrand(newV);
        }
      },
      immediate: true, // 立即执行
    },
    loading(newV) {
      if (newV === 5) {
        uni.hideLoading();
        this.loading = 0;
      }
    },
  },
  computed: {
    getPieOption1() {
      return this.pieOption1;
    },
    getPieOption2() {
      return this.pieOption2;
    },
    getOption1() {
      return this.barOption1;
    },
    getOption2() {
      return this.barOption2;
    },
    getOption3() {
      return this.barOption3;
    },
    getOption4() {
      return this.barOption4;
    },
    setFormData: {
      get() {
        return this.$store.state.FormData;
      },
      set(newV) {
        this.$store.commit("setFormData", newV);
      },
    },
    getTime: {
      get() {
        return this.$store.state.timeOption;
      },
      //   set(newV) {
      //     this.$store.commit("setFormData", newV);
      //   },
    },
  },
  created() {
    // let timeOption = this.$store.state.timeOption;
    // if (timeOption) {
    //   this.setFormData = { time: timeOption[timeOption.length - 4] };
    // }
    // this.getBrand(this.$store.state.FormData);
  },
  mounted() {
    setTimeout(() => {
      this.scrollBottom();
    }, 500);
  },
  beforeDestroy() {
    this.setFormData = {
      brand: "",
    };
  },
  methods: {
    scrollBottom() {
      let date = document.querySelector(".date");
      if (!date) return;
      date.scrollLeft = date.scrollWidth;
    },
    /**
     * @name: getBrand
     * @msg: 获取运营期_top20品牌
     * @param {*} newV
     * @return {*}
     */
    getBrand(newV) {
      getBrand(newV).then((res) => {
        this.dataList[0].options = JSON.parse(
          res.data[0]["品牌"].replace(/'/g, '"')
        ).reduce((arr, item, index) => {
          arr.push({ name: item });
          return arr;
        }, []);
        this.dataList[0].options.unshift({ name: "全部" });
        this.$store.commit("setDataList", this.dataList);
        this.loading++;
      });
    },
    /**
     * @name: getAvg_operation
     * @msg: 生存期
     * @param undefined
     * @return {*}
     */
    getAvg_operation(newV, bl = false) {
      getAvg_operation(newV, bl)
        .then((res) => {
          let option = this.$Clone(this.operation3);

          let formData = res.data;
          let formDatas = res.datas;
          let xAxis = [];
          let series1 = [];
          let series2 = [];
          formData.forEach((item, index) => {
            xAxis.push(item.time || item.times);
            series1.push(item.avg);
            series2.push(formDatas[index].avg);
          });
          option.eopts.xAxis[0].data = xAxis;
          console.log(option.eopts.xAxis);
          option.chartData.series[0].data = series1;
          option.chartData.series[1].data = series2;
          this.$set(this, "barOption4", option);
          this.loading++;
        })
        .catch(() => {
          this.loading++;
        });
    },
    /**
     * @name: getAvg_rate
     * @msg: 存活率
     * @param undefined
     * @return {*}
     */
    getAvg_rate(newV, bl = false) {
      getAvg_rate(newV, bl)
        .then((res) => {
          let formData = res.data[0];
          let option = this.$Clone(this.operation2);
          option.eopts.xAxis.data = eval(formData["时间月份"]);
          option.chartData.series[0].data = eval(formData["存活比率"]).reduce(
            (arr, item, index) => {
              arr.push({
                name: eval(formData["数量存活"])[index],
                value: item.split("%")[0],
              });
              return arr;
            },
            []
          );
          option.chartData.series[1].data = eval(formData["闭店比率"]).reduce(
            (arr, item, index) => {
              arr.push({
                name: String(eval(formData["数量闭店"])[index]),
                value: item.split("%")[0],
              });
              console.log({
                name: String(eval(formData["数量闭店"])[index]),
                value: item.split("%")[0],
              });
              return arr;
            },
            []
          );
          // console.log(eval(formData["存活比率"]));
          this.$set(this, "barOption3", option);
          this.loading++;
        })
        .catch(() => {
          this.loading++;
        });
    },
    /**
     * @name: getOperationDown
     * @msg: 闭店期
     * @param undefined
     * @return {*}
     */
    getOperationDown(newV, bl = false) {
      getOperationDown(newV, bl)
        .then((res) => {
          this.formData2 = res.data[0];
          let option = this.$Clone(this.operation);
          let pieOption = this.$Clone(this.pieOption);

          option.eopts.xAxis.data = eval(this.formData2.plot_x_axis).reduce(
            (arr, item) => {
              arr.push(String(item));
              return arr;
            },
            []
          );
          option.chartData.series[0].data = eval(this.formData2.polt_y_axis);
          pieOption.chartData.series[0].data = eval(
            this.formData2.bintu_key
          ).reduce((arr, item, index) => {
            arr.push({
              name: eval(this.formData2.bintu_qujian)[index],
              value: eval(this.formData2.bintu_shuzhi)[index],
            });
            return arr;
          }, []);
          this.$set(this, "barOption2", option);
          this.$set(this, "pieOption2", pieOption);
          this.loading++;
        })
        .catch(() => {
          this.loading++;
        });
    },
    /**
     * @name: getOperation
     * @msg: 运营期
     * @param undefined
     * @return {*}
     */
    getOperation(newV, bl = false) {
      getOperation(newV, bl)
        .then((res) => {
          this.formData = res.data[0];
		  console.log("dsdkai",this.formData);
          let option = this.$Clone(this.operation);
          let pieOption = this.$Clone(this.pieOption);
          option.eopts.xAxis.data = eval(this.formData.plot_x_axis).reduce(
            (arr, item) => {
              arr.push(String(item));
              return arr;
            },
            []
          );
          option.chartData.series[0].data = eval(this.formData.polt_y_axis);
          pieOption.chartData.series[0].data = eval(
            this.formData.bintu_key
          ).reduce((arr, item, index) => {
            arr.push({
              name: eval(this.formData.bintu_qujian)[index],
              value: eval(this.formData.bintu_shuzhi)[index],
            });
            return arr;
          }, []);
          this.$set(this, "barOption1", option);
          this.$set(this, "pieOption1", pieOption);
          this.loading++;
        })
        .catch(() => {
          this.loading++;
        });
    },

    /**
     * @name: dateClick
     * @msg: 点击确定active
     * @param {*} item
     * @return {*}
     */
    dateClick(key) {
      this.active = key; //当前选中项
      this.setFormData = { time: key };
      // this.$set(this, "activeData", this.formData[key]);
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
.yysj {
  // width: 100vw;
  padding: 30rpx;

  .twoBorder {
	  margin-top: 30rpx;
    padding: 20rpx;
    position: relative;
    // >.dw{
    //   position: absolute;
    //   right: 20rpx;
    //   top: 570rpx;
    // }
	.headStore{
		display: flex;
		justify-content: space-between;
		margin-bottom: 30rpx;
		.left{
		font-size: 30rpx;
		font-weight: normal;
		color: #1D2129;	
		}
		.right{
		width: 264rpx;
		height: 54rpx;
		padding: 6rpx;
		background: rgba(0,0,0,0.04);
		border-radius: 36rpx 36rpx 36rpx 36rpx;
		opacity: 1;	
		font-size: 22rpx;
		font-weight: normal;	
        color: rgba(0,0,0,0.6);
		display: flex;
		align-items: center;
		view{
			flex: 1;
			height: 42rpx;
			border-radius: 28rpx 28rpx 28rpx 28rpx;
			opacity: 1;
			line-height: 42rpx;
			text-align: center;
		}
		}
	}
  }
}

.box {
  margin-top: 30rpx;
  background: #ffffff;
  border-radius: 12rpx;
  padding: 30rpx;
}

.title {
  display: flex;
  align-items: center;
}

.text {
  display: flex;
  font-size: 26rpx;
  font-weight: 400;
  color: rgba(0,0,0,0.6);
  line-height: 32rpx;
  .left ,.right{
	  width: 50%;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	text {
	&:first-child{
	font-size: 26rpx;
	font-weight: normal;
	color: rgba(0,0,0,0.6);
	}
	&:last-child{
	margin-top: 14rpx;
	font-size: 48rpx;
    font-weight: 500;
    color: #3662EC;
    line-height: 68rpx;
    margin: 0 10rpx;	
		}
  }
  }
  .left{
	  border-right: 1rpx solid  rgba(0,0,0,0.08);
  }

}

.date {
  display: flex;
  align-items: center;
  overflow-x: auto;
  background: #ffffff;
  border-radius: 12rpx;
  > view {
    flex-shrink: 0;
    margin: 0 20rpx;
    height: 80rpx;
    line-height: 80rpx;
    box-sizing: border-box;
    font-size: 26rpx;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
  }
  > .active {
    font-size: 30rpx;
    font-weight: 500;
    color: #3662ec;
    border-bottom: 4rpx solid #3662ec;
  }
}

.bottomBox {
  margin-top: 40rpx;
  padding: 20rpx;
  width: 680rpx;
}
.transfrom{
	position: absolute;
	left: 1800rpx;
	transition: all 0.3s;
}
</style>
