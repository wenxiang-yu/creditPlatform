<template>
  <view class="mdfz">
    <!-- 选择年份 -->
    <view class="date">
      <view
        :class="active == key ? 'active' : ''"
        @click="dateClick(key)"
        v-for="(item, key, index) in formData"
        :key="`index${index}`"
        >{{ key }}</view
      >
    </view>
    <!-- 总店数 -->
    <view class="zds">
      <!-- 总店数 -->
      <view >
        <gt-line title="企业总数" type="title"/>
        <view class="companyAll">
        <gt-box class="current" :clickable="true" v-for="(item,index) in activeData[3].total" :key="index">
          <view @tap.stop="type(0)"
            > 
			<text class="Btitle">{{ item.index_name }}</text>
            <!-- <gt-icon :tips="item.title" /> -->
            <view class="blueb">{{ item.store_num }}</view>
          </view>
          <view @tap.stop="type(0)">
            <view >
              <span>月同比</span>
              <gt-icon
                :type="
                  item.year_on_year > 0
                    ? 'zhibiaoshang'
                    : 'zhibiaoxia'
                "
              />
              <span
                :class="
                  item.year_on_year > 0 ? 'redb' : 'greenb'
                "
                >{{ item.year_on_year }}%</span
              >
            </view>
            <view>
              <span>月环比</span>
              <gt-icon
                :type="
                 item.month_on_month > 0
                    ? 'zhibiaoshang'
                    : 'zhibiaoxia'
                "
              />
              <span
                :class="
                 item.month_on_month > 0 ? 'redb' : 'greenb'
                "
                >{{item.month_on_month }}%</span
              >
            </view>
          </view>
        </gt-box>	        	
        </view>
		
      </view>
      <!-- 月份 -->
      <view>
        <gt-line type="title" :title="activeData[0].month[0].name" />
        <view class="box">
          <view @tap.stop="type(1)">
            <box
              :data="{
                title: activeData[0].month[1].index_name,
                titleTips: activeData[0].month[1].title,
                home: activeData[0].month[1].store_num,
                tag1: {
                  title: '月同比',
                  num: activeData[0].month[1].year_on_year + '%',
                },
                tag2: {
                  title: '月环比',
                  num: activeData[0].month[1].month_on_month + '%',
                },
              }"
            />
          </view>
          <view @tap.stop="type(2)">
            <box
              :data="{
                title: activeData[0].month[2].index_name,
                titleTips: activeData[0].month[2].title,
                home: activeData[0].month[2].store_num,
                tag1: {
                  title: '月同比',
                  num: activeData[0].month[2].year_on_year + '%',
                },
                tag2: {
                  title: '月环比',
                  num: activeData[0].month[2].month_on_month + '%',
                },
              }"
            />
          </view>
          <view @tap.stop="type(3)">
            <box
              :data="{
                title: activeData[0].month[3].index_name,
                titleTips: activeData[0].month[3].title,
                home: activeData[0].month[3].store_num,
                tag1: {
                  title: '月同比',
                  num: activeData[0].month[3].year_on_year + '%',
                },
                tag2: {
                  title: '月环比',
                  num: activeData[0].month[3].month_on_month + '%',
                },
              }"
            />
          </view>
        </view>
      </view>
      <!-- 年积累 -->
      <view>
        <gt-line type="title" :title="activeData[1].year[0].name" />
        <view class="box">
          <view @tap.stop="type(1)">
            <box
              :data="{
                title: activeData[1].year[1].index_name,
                titleTips: activeData[1].year[1].title,
                home: activeData[1].year[1].store_num,
                tag1: {
                  title: '年同比',
                  num: activeData[1].year[1].year_on_year + '%',
                },
              }"
            />
          </view>
          <view @tap.stop="type(2)">
            <box
              :data="{
                title: activeData[1].year[2].index_name,
                titleTips: activeData[1].year[2].title,
                home: activeData[1].year[2].store_num,
                tag1: {
                  title: '年同比',
                  num: activeData[1].year[2].year_on_year + '%',
                },
              }"
            />
          </view>
          <view @tap.stop="type(3)">
            <box
              :data="{
                title: activeData[1].year[3].index_name,
                titleTips: activeData[1].year[3].title,
                home: activeData[1].year[3].store_num,
                tag1: {
                  title: '年同比',
                  num: activeData[1].year[3].year_on_year + '%',
                },
              }"
            />
          </view>
        </view>
      </view>
      <!-- TTM -->
      <view>
        <gt-line type="title" :title="activeData[2].ttm[0].name" />
        <view class="box">
          <view @tap.stop="type(1)">
            <box
              :data="{
                title: activeData[2].ttm[1].index_name,
                titleTips: activeData[2].ttm[1].title,
                home: activeData[2].ttm[1].store_num,
                tag1: {
                  title: '年同比',
                  num: activeData[2].ttm[1].year_on_year + '%',
                },
              }"
            />
          </view>
          <view @tap.stop="type(2)">
            <box
              :data="{
                title: activeData[2].ttm[2].index_name,
                titleTips: activeData[2].ttm[2].title,
                home: activeData[2].ttm[2].store_num,
                tag1: {
                  title: '年同比',
                  num: activeData[2].ttm[2].year_on_year + '%',
                },
              }"
            />
          </view>
          <view @tap.stop="type(3)">
            <box
              @click="type(3)"
              :data="{
                title: activeData[2].ttm[3].index_name,
                titleTips: activeData[2].ttm[3].title,
                home: activeData[2].ttm[3].store_num,
                tag1: {
                  title: '年同比',
                  num: activeData[2].ttm[3].year_on_year + '%',
                },
              }"
            />
          </view>
        </view>
      </view>

      <!-- 开关店占比趋势 -->
      <gt-box type="twoBorder" class="twoBorder">
        <gt-line title="开关企业占比趋势" />
        <gt-ucharts
          :width="630"
          :height="408"
          :options="get_survival"
          canvasId="accountedFor"
        />

        <gt-ucharts
          :width="630"
          :height="408"
          :options="get_survivals"
          canvasId="accountedFor1"
        />
        <!-- <gt-echarts
          :options="accountedForY"
          :width="630"
          :height="408"
          canvasId="accountedFor"
        />
        <gt-echarts
          :options="accountedForY"
          :width="630"
          :height="408"
          canvasId="accountedForY"
        /> -->
      </gt-box>
      <gt-box type="twoBorder" class="twoBorderTwo">
        <gt-line title="企业总数趋势" />
        <gt-ucharts
          :width="630"
          :height="408"
          :options="get_total"
          canvasId="storesTotal"
        />
		<view style="height:30rpx">
		</view>
        <gt-ucharts
          :width="630"
          :height="408"
          :options="get_totaly"
          canvasId="storesTotalY"
        />

        <!-- <gt-echarts
          :options="storesTotal"
          :width="630"
          :height="408"
          canvasId="storesTotal"
        /> -->
        <!-- <gt-echarts
          :options="storesTotal"
          :width="630"
          :height="408"
          canvasId="storesTotalT"
        /> -->
      </gt-box>
    </view>
  </view>
</template>

<script>
import GtLine from "@/components/gtLine/GtLine.vue";
import GtBox from "@/components/gtBox/GtBox.vue";
import GtIcon from "@/components/gtIcon/GtIcon.vue";
import box from "./components/box.vue";
import GtUcharts from "@/components/gtUcharts/GtUcharts.vue";
import {
  getDetails,
  getSurvival,
  getSurvivals,
  getTotal,
} from "@/api/index.js";

// import echarts from "@/components/echarts-uniapp/echarts-uniapp.vue";
import mixin from "./mixin.js";
import {mapMutations} from 'vuex'
export default {
  name: "mdfz",
  mixins: [mixin],
  components: {
    GtLine, //表头分割线
    GtBox, //2种样式的盒子
    GtIcon, //icon
    box, //二次分装盒子
    GtUcharts, //区域图
  },
  data() {
    const date = [
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
      "2022",
      "2022",
      "2022",
      "2022",
      "2022",
    ];
    return {
      date: date, //时间滚动轴
      active: "2022", //默认第一次展示的时间
      formData: {}, //所有数据
      survival: {}, //开关店占比
      survivals: {}, //开关店占比 月
      total: {}, //门店趋势
      totaly: {}, //门店趋势
      loading: 0,
    };
  },
  computed: {
    setFormData: {
      get() {
        return this.$store.state.FormData;
      },
      set(newV) {
        this.$store.commit("setFormData", newV);
      },
    },
    get_survival() {
      return this.survival;
    },
    get_survivals() {
      return this.survivals;
    },
    get_total() {
      return this.total;
    },
    get_totaly() {
	  console.log(this.totaly,'this.totaly');
      return this.totaly;
    },
    getTimeOption() {
      return this.$store.state.timeOption;
    },
  },
  watch: {
    "$store.state.FormData": {
      handler(newV) {
		  console.log(newV,'newVnewVnewVnewVnewV')
        // this.$setNewV(newV);
        uni.showLoading({
          title: "加载中",
          mask: true,
        });
        this.getDetails(newV);
        this.getSurvival(newV);
        this.getSurvivals(newV);
        this.getTotal(newV);
      },
      immediate: true, // 立即执行
    },
    loading(newV) {
      if (newV === 4) {
        uni.hideLoading();
        this.loading = 0;
      }
    },
  },
  created() {
    //   设置datalist
    this.$store.commit("setDataList", this.dataList);
    this.setFormData = { target: "总店数" };

    // this.getDetails();
    // this.getSurvival();
  },
  methods: {
    type(num) {
      switch (num) {
        case 0:
          this.setFormData = { target: "总店数" };
          console.log("总店数");
          break;
        case 1:
          this.setFormData = { target: "净增店数" };

          console.log("净增店数");
          break;
        case 2:
          this.setFormData = { target: "新开店数" };
          console.log("新开店数");

          break;
        case 3:
          this.setFormData = { target: "关店数" };

          console.log("关店数");
          break;
      }
    },
    /**
     * @name: getDetails
     * @msg: 门店总览详情
     * @param {*}
     * @return {*}
     */
    getDetails(newV) {
      getDetails(newV).then((res) => {
        let data = res.replace(/'/g, `"`);

        this.switchStores(JSON.parse(data).data);
      });
    },
    /**
     * @name: getSurvival
     * @msg: 开关店占比
     * @param {*}
     * @return {*}
     */
    getSurvival(newV) {
      getSurvival(newV).then((res) => {
        res.data.sort(function (a, b) {
          return a.year > b.year ? 1 : -1; //升序  < 降序
        });
        let xAxis = []; //x轴文案
        let add_zhanbi = []; //开店占比
        let close_zhanbi = []; //关店占比
        let jz_zhanbi = []; //净增占比
        res.data.forEach((item) => {
          xAxis.push(item.year);
          add_zhanbi.push(item.add_zhanbi);
          close_zhanbi.push(item.close_zhanbi);
          jz_zhanbi.push(item.jz_zhanbi);
        });
        this.accountedFor.eopts.xAxis[0].data = xAxis;
        this.accountedFor.chartData.series[0].data = add_zhanbi;
        this.accountedFor.chartData.series[1].data = close_zhanbi;
        this.accountedFor.chartData.series[2].data = jz_zhanbi;
        this.survival = this.accountedFor;

        this.loading++;
      });
    },
    /**
     * @name: getSurvivals
     * @msg: 开关店占比 月
     * @param {*} newV
     * @return {*}
     */
    getSurvivals(newV) {
      getSurvivals(newV).then((res) => {
        res.data.sort(function (a, b) {
          return a.year > b.year ? 1 : -1; //升序  < 降序
        });
        let xAxis = []; //x轴文案
        let add_zhanbi = []; //开店占比
        let close_zhanbi = []; //关店占比
        let jz_zhanbi = []; //净增占比
        res.data.forEach((item) => {
          xAxis.push(item.year);
          add_zhanbi.push(item.add_zhanbi);
          close_zhanbi.push(item.close_zhanbi);
          jz_zhanbi.push(item.jz_zhanbi);
        });
        this.$set(this.accountedForY.eopts.xAxis[0], "data", xAxis);
        this.$set(this.accountedForY.chartData.series[0], "data", add_zhanbi);
        this.$set(this.accountedForY.chartData.series[1], "data", close_zhanbi);
        this.$set(this.accountedForY.chartData.series[2], "data", jz_zhanbi);
        this.survivals = this.accountedForY;
        this.loading++;
      });
    },
    /**
     * @name: getTotal
     * @msg: 门店趋势
     * @param {*} newV
     * @return {*}
     */
    getTotal(newV) {
		let opti = newV
		if(newV.time === "2022-01"){
			opti = {...newV,time:"2022"}
		}
      getTotal(opti).then((res) => {
        let data = JSON.parse(res.replace(/'/g, `"`));
        let xAxis = []; //x轴文案
        let store_num = []; //门店数
        let year_on_year = []; //同比

        let xAxisY = []; //月 x轴文案
        let store_numY = []; //月 门店数
        let month_on_month = []; //月 同比
        let month_ring_rate = []; //月 环比
        data.data.year.forEach((item) => {
          // console.log(this.$formatNum(item.value.store_num));
          xAxis.push(item.year);
          store_num.push(item.value.store_num);
          year_on_year.push(item.value.year_on_year);
        });
        data.data.month.forEach((item) => {
          xAxisY.push(item.year);
          store_numY.push(item.store_num);
          month_on_month.push(item.month_on_month);
          month_ring_rate.push(item.month_ring_rate);
        });
		let copystoresTotalY = this.$Clone(this.storesTotalY)
		let copystoresTotal = this.$Clone(this.storesTotal)
        this.$set(copystoresTotal.eopts.xAxis[0], "data", xAxis);
        this.$set(copystoresTotal.chartData.series[0], "data", store_num);
        this.$set(copystoresTotal.chartData.series[1], "data", year_on_year);
        this.$set(copystoresTotalY.eopts.xAxis[0], "data", xAxisY);
        this.$set(copystoresTotalY.chartData.series[0], "data", store_numY);
        this.$set(
          copystoresTotalY.chartData.series[1],
          "data",
          month_on_month
        );
        this.$set(
          copystoresTotalY.chartData.series[2],
          "data",
          month_ring_rate
        );
        this.total = copystoresTotal;
        this.totaly = copystoresTotalY;
        this.loading++;
      });
    },
    switchStores(data) {
      let obj = {};
      data.forEach((item) => {
        obj[item.year] = item.value;
      });

      this.$set(this, "formData", obj);
      this.dateClick(data[data.length - 1].year);
      this.loading++;
    },
    /**
     * @name: dateClick
     * @msg: 点击确定active
     * @param {*} item
     * @return {*}
     */
    dateClick(key) {
	 // this.setFormData = { time: key};
      this.active = key; //当前选中项
      this.$set(this, "activeData", this.formData[key]);
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
.mdfz {
  width: 100vw;
  padding: 10rpx;
}
.date {
  margin:30rpx 20rpx 20rpx 20rpx;
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
.zds {
  padding: 20rpx;
  .companyAll{
	  display: flex;
	  justify-content: space-around;
	  height: 200rpx;
	  text-align: center;
	  position: relative;
		  &::before{
			 position: absolute;
			 right: -8rpx;
			 top: 50%;
			 left:50%;
			 transform: translateY(-50%);
			 content:"";
			 display: inline-block;
			 width: 1rpx;
			 height: 120rpx;
			 background: rgba(0,0,0,0.08)  
		  }
  }
  > view {
    background: #ffffff;
    border-radius: 12px;
    margin-bottom: 20px;
  }
  .current {
    height: 106rpx;
    // display: flex;
    padding: 0 20rpx;
    margin: 20rpx 0;
    > view:nth-of-type(1) {
      // display: flex;
      // align-items: center;
      font-size: 20rpx;
      font-weight: 500;
	  color: rgba(0, 0, 0, 0.6);
    }
    > view:nth-of-type(2) {
      // display: flex;
      // flex-direction: column;
      // justify-content: center;
      font-size: 20rpx;
	  margin: 10rpx 0;
      font-weight: 400;
      > view {
        // display: flex;
        // align-items: center;
      }
    }
  }
  .box {
    display: flex;
    width: 100%;
	overflow: hidden;
    > view {
      flex-shrink: 0;
      width: calc(33.3% - 5rpx);
    }
    view:nth-of-type(2) {
      margin-left: 10rpx;
      margin-right: 10rpx;
    }
  }
  .twoBorder {
    padding: 20rpx;
    overflow-x: auto;
    margin-top: 20rpx;
  }
  .twoBorderTwo {
    margin-top: 40rpx;
  }
}
.blueb {
  font-size: 40rpx;
  color: #3662ec;
  margin-top: 14rpx;
}
.redb {
  color: #ff3b3b;
}
.greenb {
  color: #6dd400;
}
.Btitle{
 font-size: 26rpx;	
 color: #1D2129;
}
</style>
