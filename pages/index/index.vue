<template>
  <view>
    <Nav
      ref="navs"
	  @selectActive="selectActive"
      @search="getIndustyList"
      @searchFormData="searchFormData"
		@screen="screenData"
      :tabName="tabName"
    ></Nav>
	<!-- 仪表盘 -->
    <view class="dashboard" v-show="modelAct === 0">
      <!-- 风险等级模块-->
      <view class="risk">
        <view v-for="(item, index) in riskTitle" :key="index" class="riskWrap">
          <view class="title">
            <image :src="item.img" mode="aspectFit"></image>
            <text>{{ item.title }}</text>
          </view>
          <view class="num">
            <text>{{ item.num ? item.num : 0 }}个</text>
          </view>
          <!-- <view class="time">
            <text>更新{{ item.time }}</text>
          </view> -->
        </view>
      </view>
      <!-- 地图模块 -->
      <view class="map">
        <view style="margin-bottom: 20rpx">
		<image
            style="width: 24rpx; height: 24rpx; margin-right: 10rpx"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAotJREFUSEu1lk9IFGEYxn/PWJqWLtihIHdHqUOX6mYp1aFDIfSHTnUwqKtedo2KhGIp8FC0K0RdO2RQJ4kCrYOHIMuOdelQ5KwGHUpQs/LfvrGzrm26u46Ic51v3t/3Pe/zPe+IdX5Uqr4l6mpBZ0EtwD7QNn+9+IbZe7A+sMfqGB0rVqcgwBJ1lajsKlgMtKX0Ie0nKMm4uhQf/rN07TKA3XUbmLWnSHvADOkF2CNm7A2/Rkb8AlXhMOVqwmgFjoKE2QfknFRseDgf8h/ALz5nr0B1GB9x5s8rOjpUUsY79QeQPUDsBhsF51A+ZBHgy4IzlN05A4xPnlZ8bCKIByxeW0Oouhc44p9kwmnMyfUPkHRvANf8nc9ONerK98kgxXNrfEhN9VD2JNxUzLue9QNgXTu2UlmW0W4zSjcVk8USkdcIUyx1sBDcMnI56UFgit/z9er8+iMLSITbkHMP0a+ol7FkwceSrvm7inlF7W3JSD/oGJZuV8fI/QVA5BnScWTnFE31rAnQHWnF9BCz5+pIncgCkpEUKMxsepcuj3xeE+BWeCcbnU9ASjHPXTiBO40oZ9yrUJyZNQHilBNypzFm1OFVrA6wQpN9NQoCkq4HRFaSKIhtrbBEwZocCFCwyd3hNiyATX2JJMW85uJ9WrCp0u2K5my6qotWHFD0omWtmhcVE5P7g+ZQoKjIdr9+EzXpd37YGQNMrDLsaqp7UYmw8yG33QY25MW16YIuDr9dVVzP6bAueV9y3ywfOBlIWd7AgZeIHoxBxlOj/oehSB2iednAmdep/OKLabp0h75cIetcl5GZD/NjvMo5Q1otSHsxtvvvc0PfsT5+pZ9kYrmYjCX/KoJcrJXW/AUE3GIomOL84AAAAABJRU5ErkJggg=="
          ></image>
          因屏幕大小限制，点击展示地区风险数量</view
        >
        <qiun-data-charts
          type="map"
          tooltipFormat="tooltipFun"
          :opts="opts"
          :chartData="chartData"
        />
        <view class="legend">
          <view>
            <view style="background-color: #7f1000"></view>
            5000以上
          </view>
          <view>
            <view style="background-color: #fa5151"></view>
            1000-5000
          </view>
          <view>
            <view style="background-color: #fcd29f"></view>
            0-999
          </view>
          <view>
            <view style="background-color: #ffffff"></view>
            0
          </view>
        </view>
      </view>
      <!-- 预警企业风险概览 -->
      <view class="anOverviewTheRisk">
        <tm-echarts
          ref="View"
          :echartsH5="true"
          @init="risk"
          height="600"
        ></tm-echarts>
      </view>
      <!-- 风险趋势 -->
      <view class="riskTrend">
        <tm-echarts ref="Trend" @init="risk" height="520"></tm-echarts>
      </view>
      <!-- 风险增长排行 -->
      <view class="growthRank">
        <text class="more" @click="viewMore">查看更多></text>
        <tm-echarts ref="Rank" @init="risk" height="700"></tm-echarts>
      </view>
    </view>
  <!-- 风险动态 -->
  <DynamicRisk v-show="modelAct === 1" ref="riskActive"/>
  <!-- 监测日报 -->
  <MonitorDai v-show="modelAct === 2" ref="detectDai"/>
  </view>
</template>

<script>
import Nav from "@/components/Nav.vue";
import { deepClone } from "@/utils/tool.js"; //深拷贝函数
import mapData from "@/static/china.json";
import uCharts from "@/uni_modules/qiun-data-charts/js_sdk/u-charts/config-ucharts.js"; //在uniapp 插件库下载下来就是这个路径 可以自己改
import DynamicRisk from "@/pages/dynamicRisk/dynamicRisk.vue" //风险动态
import MonitorDai from "@/pages/detectionDai/detectionDai.vue" //风险动态
import {
  getAmount,
  getIndustyList,
  getTacticHitAmount,
  getTacticHitRisk,
  getTacticHitLine,
  getRanking,
  getDistrict,
} from "@/api/dashboard.js";
import { pineOption, polyLine, barOption, mapOption } from "@/utils/chart.js"; //echarts图表配置项
export default {
  components: {
    Nav,		//头部导航
	DynamicRisk, //风险动态
	MonitorDai //监测日报
	
  },
  data() {
    return {
	  tabName:{ title: ['公有池','私有池'], flag: false }, //tab
	  modelAct:0, //导航栏选中
      riskTitle: [
        {
          img: require("../../static/dashboard/height_risk.png"),
          title: "高风险",
          num: 0,
          time: "2022-09-13 00:00",
        },
        {
          img: require("../../static/dashboard/middle_risk.png"),
          title: "中风险",
          num: 0,
          time: "2022-09-13 00:00",
        },
        {
          img: require("../../static/dashboard/lower_risk.png"),
          title: "低风险",
          num: 0,
          time: "2022-09-13 00:00",
        },
        // {
        //   img: require("../../static/dashboard/good_risk.png"),
        //   title: "利好",
        //   num: 150,
        //   time: "2022-09-13 00:00",
        // },
      ],
      chartData: {},
      opts: {
        color: [
          "#1890FF",
          "#91CB74",
          "#FAC858",
          "#EE6666",
          "#73C0DE",
          "#3CA272",
          "#FC8452",
          "#9A60B4",
          "#ea7ccc",
        ],
        padding: [0, 0, 0, 0],
        dataLabel: false,
        extra: {
          map: {
            border: true,
            borderWidth: 1,
            borderColor: "#DBDBDB",
            fillOpacity: 0.6,
            activeBorderColor: "#F04864",
            activeFillColor: "#FACC14",
            activeFillOpacity: 1,
            extra: true,
          },
        },
      },
    };
  },

  mounted() {
    //自定义格式化Tooltip显示内容
    uCharts.formatter.tooltipFun = (item, category, index, opts) => {
      console.log(item);
      let st;
      if (item.data) {
        st = `自定义1/地区:${item.name}/高风险:${item.data.highRisk}/中风险:${item.data.theRisk}/低风险:${item.data.lowRisk}`;
      } else {
        st = `自定义1/地区:${item.name}/高风险:0/中风险:0/低风险:0`;
      }
      return st;
    };
    // this.getServerData();
    this.init();
  },
  methods: {
    init() {
      this.getAmount();
      this.getIndustyList();
    },
    searchFormData(data) {
      let num = this.$refs.navs.publics.data == "公有池" ? 1 : 2;
      let copyData = JSON.parse(
        JSON.stringify(data).replace(/"请选择"/g, null)
      );
      this.getTacticHitAmount(num, copyData);
      this.getTacticHitRisk(num, copyData);
      this.getTacticHitLine(num, copyData);
      this.getRanking(num, copyData);
      this.getDistrict(num, copyData);
    },
    getRanking(num, formData) {
      getRanking(num, formData).then((res) => {
        this.rightCard2Show = true;

        let companys = [],
          hightHit = [],
          middleHit = [],
          lowHit = [];
        res.data
          .sort(function (a, b) {
            if (a.riskAmount > b.riskAmount)
              // 如果 a 大于 b,位置互换
              return 1;
            //否则，位置不变
            else return -1;
          })
          .forEach((item) => {
            companys.push(item.cname);
            hightHit.push(item.hightHit);
            middleHit.push(item.middleHit);
            lowHit.push(item.lowHit);
          });
        const Bar = deepClone(barOption);
        Bar.yAxis.data = companys;
        Bar.series[0].data = hightHit;
        Bar.series[1].data = middleHit;
        Bar.series[2].data = lowHit;
        this.$refs.Rank.setOption(Bar);
      });
    },
    getTacticHitLine(num, formData) {
      getTacticHitLine(num, formData).then((res) => {
        const Line = deepClone(polyLine);
		let xAxis = []
		if(res.data.dateList){
         xAxis = res.data.dateList.reduce((arr, item) => {
          let st = item.split("-");
          arr.push(st[1] + "-" + st[2]);
          return arr;
        }, []);
		}else{
		xAxis = []	
		}
		Line.series[0].data = res.data.highRisk;
		Line.series[1].data = res.data.theRisk;
		Line.series[2].data = res.data.lowRisk;
		Line.xAxis[0].data = xAxis;
		this.$refs.Trend.setOption(Line);	
      }).catch(err=>Promise.reject(err));
    },
    async getTacticHitRisk(num, data) {
      getTacticHitRisk(num, data).then((res) => {
        let nq = [];
        let wq = [];
        for (const key in res.data) {
          switch (key) {
            case "highRisk":
              if (res.data[key]) {
                nq.push({
                  name: "高风险",
                  itemStyle: {
                    color: "#E8684A",
                  },
                  value: res.data[key].typeNum,
                  typeProportion: res.data[key].typeProportion,
                });
              }
              break;
            case "theRisk":
              if (res.data[key]) {
                nq.push({
                  name: "中风险",
                  itemStyle: {
                    color: "#F6BD16",
                  },
                  value: res.data[key].typeNum,
                  typeProportion: res.data[key].typeProportion,
                });
              }
              break;
            case "lowRisk":
              if (res.data[key]) {
                nq.push({
                  name: "低风险",
                  itemStyle: {
                    color: "#5B8FF9",
                  },
                  value: res.data[key].typeNum,
                  typeProportion: res.data[key].typeProportion,
                });
              }

              break;
          }
        }
		if(res.data.dataList){
        res.data.dataList.forEach((item) => {
          wq.push({
            name: item.typeName,
            value: item.totalRisk,
            typeProportion: item.typeProportion,
          });
        });
		}else{
			wq=[]
		}
		const Pine = deepClone(pineOption);
		Pine.series[0].data = nq;
		Pine.legend.data = wq;
		Pine.series[1].data = wq;
        this.$refs.View.setOption(Pine);			
      });
    },

    async getTacticHitAmount(num, data) {
      let res = await getTacticHitAmount(num, data);
      this.riskTitle[0].num = res.data[0].highHit;
      this.riskTitle[1].num = res.data[0].middleHit;
      this.riskTitle[2].num = res.data[0].lowHit;
    },
    getServerData() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          series: mapData.features,
        };
        console.log(res);
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
    },
    getDistrict(num, data) {
      getDistrict(num, data).then((res) => {
        let map = mapData.features.reduce((arr, item) => {
          let nums = res.data.find((val) => {
            return val.province.includes(item.properties.name);
          });
          if (nums) {
            if (!nums.totalRisk) {
              item["color"] = "#ffffff";
            }
            if (nums.totalRisk > 0 && nums.totalRisk < 999) {
              item["color"] = "#FCD29F";
            }
            if (nums.totalRisk > 999 && nums.totalRisk < 5000) {
              item["color"] = "#FA5151";
            }
            if (nums.totalRisk > 5000) {
              item["color"] = "#7F1000";
            }
          } else {
            item["color"] = "#ffffff";
          }
          item["data"] = nums;
          arr.push(item);
          return arr;
        }, []);
        let ress = {
          series: map,
        };
        this.chartData = JSON.parse(JSON.stringify({ series: map }));
      });
    },
    getIndustyList(type = 0) {
      let data = this.$refs.navs.dashboardFormData;
      let formData = {};
      switch (type) {
        case 1:
          formData["industry"] = data.industryNew;
          break;
        case 2:
          formData["industry"] = data.industryNew;
          formData["category"] = data.category;
          break;
      }
      getIndustyList(formData).then((res) => {
        let options = [
          { title: "请选择", id: 0 },
          ...res.data.reduce((arr, item, index) => {
            arr.push({
              title: item,
              id: index + 1,
              children: [],
            });
            return arr;
          }, []),
        ];
        switch (type) {
          case 0:
            this.$refs.navs.dashboardOptions.industryNewOptions = options;

            break;
          case 1:
            this.$refs.navs.dashboardOptions.categoryOptions = options;
            this.$refs.navs.dashboardOptions.formatOptions = [];
            this.$refs.navs.categorySelected = [0];
            this.$refs.navs.formatSelected = [0];
            this.$refs.navs.dashboardFormData.category = "请选择";
            this.$refs.navs.dashboardFormData.format = "请选择";

            break;
          case 2:
            this.$refs.navs.dashboardOptions.formatOptions = options;
            this.$refs.navs.dashboardFormData.formatSelected = [0];
            this.$refs.navs.dashboardFormData.format = "请选择";
            break;
        }
      });
    },
    getAmount() {
      getAmount().then((res) => {
        this.$refs.navs.dashboardOptions.timeScope = res.data;
        if (res.data.length) {
          this.$refs.navs.dashboardFormData.weekName = res.data[0];
        }
      });
    },
    risk() {
      // const Pine = deepClone(pineOption);
      // const Line = deepClone(polyLine);
      // const Bar = deepClone(barOption);
      // this.$refs.View.setOption(Pine);
      // this.$refs.Trend.setOption(Line);
      // this.$refs.Rank.setOption(Bar);
    },
    // 查看更多
    viewMore() {
      uni.navigateTo({
        url: "/pages/growthRank/growthRank",
      });
    },
	// nav传递的值
	selectActive(val){
		this.modelAct = val
		if(this.modelAct === 0){
		this.tabName = { title: ['私有池','公有池'], flag: false }
		}else if(this.modelAct === 1){
		this.tabName = {title:'搜索',flag:false}
		// this.$refs.riskActive.toGetRiskList() 
		}else{
		this.tabName = {title: '监测日报', flag: false}
		// this.$refs.detectDai.getLoad()
		}
	},
	screenData(val){
			this.$refs.riskActive.screenData(val)
	}
  },
};
</script>

<style scoped lang="scss">
.dashboard {
  background-color: #f1f1f3;
  padding: 30rpx 30rpx 200rpx;
  margin-bottom: 100rpx;
  // 风险等级
  .risk {
    display: flex;
    flex-wrap: wrap;
    .riskWrap {
      width: 48.5%;
      padding: 20rpx;
      // height: 191rpx;
      border-radius: 6rpx 6rpx 6rpx 6rpx;
      background-color: #fff;
      font-family: PingFangSC-Medium, sans-serif;
      &:nth-child(2n) {
        margin-left: 20rpx;
      }
      &:nth-child(n + 3) {
        margin-top: 20rpx;
      }
      .title {
        display: flex;
        align-items: center;
        font-size: 28rpx;

        font-weight: normal;
        color: rgba(0, 0, 0, 0.85);
        image {
          width: 30rpx;
          height: 34rpx;
          margin-right: 14rpx;
        }
      }
      .num {
        margin: 15rpx 0 20rpx 0;
        font-size: 36rpx;
        font-weight: normal;
        color: rgba(0, 0, 0, 0.85);
      }
      .time {
        font-size: 22rpx;
        font-weight: normal;
        color: rgba(0, 0, 0, 0.3);
      }
    }
  }
  // 地图模块
  .map {
    // height: 508rpx;
    background-color: #fff;
    margin-top: 20rpx;
    border-radius: 6rpx 6rpx 6rpx 6rpx;
    padding: 20rpx;
    > view:nth-of-type(1) {
      width: 100%;
      height: 47rpx;
      background: rgba(255, 143, 31, 0.1);
      border-radius: 4rpx;
      text-align: center;
      font-size: 24rpx;
      font-family: PingFang SC-常规体, PingFang SC;
      font-weight: normal;
      color: rgba(0, 0, 0, 0.6);
      line-height: 34rpx;
      color: #ff8f1f;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    > .legend {
      display: flex;
      justify-content: center;
      > view {
        display: flex;
        align-items: center;
        font-size: 22rpx;
        font-family: PingFang SC-常规体, PingFang SC;
        font-weight: normal;
        color: rgba(0, 0, 0, 0.6);
        line-height: 31rpx;
        margin: 0 10rpx;
        > view {
          height: 22rpx;
          width: 22rpx;
          border: 1px solid #ebebeb;
          margin-right: 5rpx;
        }
      }
    }
  }
  //风险概览
  .anOverviewTheRisk {
    padding: 20rpx;
    margin-top: 20rpx;
    height: 618rpx;
    background: #ffffff;
    border-radius: 6rpx 6rpx 6rpx 6rpx;
  }
  //风险趋势
  .riskTrend {
    padding: 20rpx;
    margin-top: 20rpx;
    height: 555rpx;
    background: #ffffff;
    border-radius: 6rpx 6rpx 6rpx 6rpx;
  }
  //风险增长趋势
  .growthRank {
    position: relative;
    padding: 20rpx;
    margin-top: 20rpx;
    height: 777rpx;
    background: #ffffff;
    border-radius: 6rpx 6rpx 6rpx 6rpx;
    .more {
      z-index: 30;
      position: absolute;
      top: 20rpx;
      right: 31rpx;
      font-size: 22rpx;
      font-family: PingFangSC-Regular, sans-serif;
      font-weight: normal;
      color: #2888e8;
    }
  }
}
</style>
