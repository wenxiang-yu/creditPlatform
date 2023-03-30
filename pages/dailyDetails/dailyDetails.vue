<!-- 日报详情页面 -->
<template>
  <view>
    <Nav :deliver="deliver" :tabName="{ title: '日报详情', flag: true }" />
    <!-- 公司列表模块 -->
    <view class="companyWrap">
      <view class="companyList">
        <view class="C_list" v-for="(item, i) in listData" :key="i">
          <view style="display: flex">
            <view class="left">
              <view
                style="
                  width: 88rpx;
                  height: 88rpx;
                  background-color: #2888e8;
                  border-radius: 6rpx;
                  color: #ffffff;
                  margin: 0 5rpx;
                  text-align: center;
                "
              >
                {{ item.cname.slice(0, 4) }}
              </view>
            </view>
            <view class="right">
              <view class="title" @click="activeEvent(i)">
                <text>{{ item.cname }}</text>
                <image
                  src="../../static/arrowDowm.png"
                  class="img_arrow"
                  :style="{ transform: active === i ? '' : 'rotate(-90deg)' }"
                ></image>
              </view>
              <view
                class="right_content"
                :style="{
                  ...getData(item.tacticHitList),
                }"
                v-show="active !== i"
              >
                <view v-for="(val, index) in item.tacticHitList" :key="index">
                  {{ val.matchRule }}({{ val.levelAmount }})
                </view>
              </view>
              <view
                v-show="active === i"
                style="
                  margin-top: 18rpx;
                  color: rgba(0, 0, 0, 0.6);
                  font-size: 24rpx;
                "
              >
                发生了<text style="color: #fa5151">{{
                  item.tacticHitList.length
                }}</text
                >条动态
              </view>
            </view>
          </view>

          <view class="tabsEvent" v-show="active === i">
            <tm-tabs
              v-model="activeIndex"
              :list="['新增事件', '事件诊断']"
            ></tm-tabs>
            <!-- 新增时间 -->
            <view class="addEvent" v-show="activeIndex === 0">
              <view v-for="(tabs, ti) in tables" :key="ti">
                <view class="text-size-n pa-24 text-blue">{{
                  tabs.title
                }}</view>
                <tm-table :list="tabs"></tm-table>
              </view>
            </view>
            <!-- 事件诊断 -->
            <view class="eventDiagnosis" v-show="activeIndex === 1">
              <view class="hitRules">
                企业命中的规则:
                <text style="color: #fa5151">{{ details.length }}</text
                >条
              </view>
              <view
                class="riskLevel"
                v-for="(item, index) in details"
                v-show="[1, 2, 4].includes(item.riskLevel)"
                :key="index"
              >
                <view class="title">
                  <text>{{ item.typeName }}</text
                  ><text
                    :class="{
                      height: item.riskLevel === 1,
                      middle: item.riskLevel === 2,
                      lower: item.riskLevel === 4,
                    }"
                    >{{ item.riskLevel | riskState }}</text
                  >
                </view>
                <view class="content">
                  {{ item.tacticsMatchRule
                  }}<text>({{ item.tacticNoCount }}条)</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Nav from "../../components/Nav.vue";
import {
  getAllUserHit,
  get_risk_type_table_title_list,
  getMetamodel,
  getBaseHit,
  selectEventDiagnosis,
} from "@/api/dynamicRisk.js";
export default {
  components: {
    Nav,
  },
  data() {
    return {
      nums: {},
      flag: false,
      active: 0,
      activeIndex: 0,
      pages: {
        pageNum: 0,
        pageSize: 10,
      },
      listData: [],
      titles: {},
      tables: [],
      details: [],
      deliver: null,
    };
  },
  filters: {
    riskState: function (val) {
      if (val === 1) {
        return "高风险";
      } else if (val === 2) {
        return "中风险";
      } else if (val === 4) {
        return "低风险";
      }
    },
  },
  created() {
    this.deliver = JSON.parse(this.$route.query.deliver);
    this.init();
  },
  onLoad(option) {
    console.log("传递的值时", JSON.parse(option.deliver));
  },
  methods: {
    init() {
      this.get_risk_type_table_title_list();
      this.getAllUserHit();
    },
    activeEvent(i) {
      if (this.active === i) {
        this.active = null;
      } else {
        this.active = i;
        this.flag != this.flag;
        this.getMetamodel();
        this.selectEventDiagnosis();
      }
    },
    selectEventDiagnosis() {
      let data = this.listData[this.active];
      console.log(data);
      selectEventDiagnosis({
        ckey: data.ckey,
        create_time: data.hitTime,
      }).then((res) => {
        this.details = res.data.eventDiagnosisVO.list;
      });
    },
    getAllUserHit() {
      getAllUserHit({
        hitTime: this.deliver.hitTime || 1666627200000,
        ...this.pages,
      }).then((res) => {
        this.listData = res.data.list;
        this.getMetamodel();
        this.selectEventDiagnosis();
      });
    },
    getData(data) {
      let datas = {
        hit: [],
        mid: [],
        low: [],
      };
      data.forEach((item, index) => {
        switch (item.riskLevel) {
          case 1:
            datas.hit.push(item);
            break;
          case 2:
            datas.mid.push(item);
            break;
          case 4:
            datas.low.push(item);
            break;
        }
      });
      if (datas.hit.length) {
        return {
          color: "#FA5151",
          backgroundColor: "fff8f8",
        };
      } else if (datas.mid.length) {
        return {
          color: "#FF8F1F",
          backgroundColor: "fffbf6",
        };
      } else {
        return {
          color: "#3662EC",
          backgroundColor: "f7f9fe",
        };
      }
    },
    get_risk_type_table_title_list() {
      get_risk_type_table_title_list().then((res) => {
        let data = res.data;
        let obj = {};
        data.forEach((item) => {
          if (obj[item.dictLabel] != undefined) {
            obj[item.dictLabel].push({
              text: JSON.parse(item.dictValue).title,
              key: JSON.parse(item.dictValue).fieldName,
              grid: 10,
            });
          } else {
            obj[item.dictLabel] = [];
            obj[item.dictLabel].push({
              text: JSON.parse(item.dictValue).title,
              key: JSON.parse(item.dictValue).fieldName,
              grid: 10,
            });
          }
        });
        this.titles = obj;
      });
    },
    getMetamodel() {
      uni.showLoading({
        title: "加载中",
        mask: true,
      });
      let data = this.listData[this.active];
      getMetamodel({ hitTime: data.hitTime, ckey: data.ckey }).then((res) => {
        let resData = res.data;
        this.tables = [];
        resData.forEach((item, index) => {
          this.tables.push({
            title: item.typeName,
            header: this.titles[item.metaModel],
            col: [],
          });
          this.getBaseHit(index, item);
        });
      });
    },
    getBaseHit(index, data) {
      getBaseHit({
        hitTime: data.hitTime,
        ckey: data.ckey,
        metaModel: data.metaModel,
        typeNo: data.typeNo,
      }).then((res) => {
        res.data.list.forEach((item) => {
          let list = [];

          this.tables[index].header.forEach((val) => {
            list.push({
              text: item[val.key] || "_",
              key: val.key,
            });
          });
          this.tables[index].col.push(list);
        });
        uni.hideLoading();
      });
    },
  },
};
</script>

<style scoped lang="scss">
.height,
.middle,
.lower {
  display: inline-block;
  margin-left: 23rpx;
  padding: 4rpx 8rpx;
}
.height {
  background-color: #fae9e9;
  color: #fa5151;
}
.middle {
  background-color: #faefe4;
  color: #ff8f1f;
}
.lower {
  background-color: #e6ebf9;
  color: #3662ec;
}
::v-deep .tm-tabs .tm-tabs-con .tm-tabs-wk {
  display: flex;
  justify-content: space-around;
  background-color: #fafafa;
  font-size: 28px;
  font-family: PingFangSC-Regular, sans-serif;
  font-weight: normal;
  color: #666666;
}
// 图片大小
.imgStyle {
  width: 88rpx;
  height: 88rpx;
  border-radius: 6rpx 6rpx 6rpx 6rpx;
}
.companyWrap {
  padding: 20rpx 30rpx;
  .companyList {
    background-color: #fff;
    padding: 30rpx;
    .C_list {
      padding: 30rpx 0;
      border-bottom: 1rpx solid rgba(0, 0, 0, 0.08);
      &:last-child {
        border-bottom: 0;
      }
      .left {
        margin-right: 20rpx;
      }
      .right {
        .title {
          display: flex;
          justify-content: space-between;
          font-size: 28rpx;
          font-weight: normal;
          color: #262626;
          line-height: 36rpx;
          width: 540rpx;
        }
        .right_content {
          margin-top: 16rpx;
          padding: 16rpx 0 16rpx 16rpx;
          font-size: 20rpx;
          line-height: 38rpx;
          background-color: #fff8f8;
          color: #fa5151;
        }
      }
      .tabsEvent {
        margin-top: 20rpx;
        background-color: #fafafa;
        ::v-deep .shadow-white-3 {
          box-shadow: 0 !important;
        }
        // 新增事件样式
        .addEvent {
          .title {
            font-size: 26rpx;
            font-family: PingFangSC-Medium, sans-serif;
            font-weight: normal;
            color: #191c31;
            line-height: 0rpx;
          }
          .seriousIllegal {
            margin-bottom: 16rpx;
            view {
              padding: 20rpx 0;
              &:nth-child(n + 3) {
                border-top: 1rpx solid #d8d8d8;
              }
            }
          }
          background-color: #fafafa;
          padding: 20rpx;
          font-size: 24rpx;
          font-family: PingFangSC-Regular, sans-serif;
          font-weight: normal;
          color: rgba(0, 0, 0, 0.85);
          line-height: 36rpx;
        }
        // 事件诊断
        .eventDiagnosis {
          padding: 20rpx;
          .hitRules {
            font-size: 24rpx;
            font-family: PingFangSC-Regular, sans-serif;
            font-weight: normal;
            color: #191c31;
            line-height: 34rpx;
            margin-bottom: 24rpx;
          }
          .riskLevel {
            margin-top: 30rpx;
            font-size: 26rpx;
            font-family: PingFangSC-Medium, sans-serif;
            font-weight: normal;
            color: #191c31;
            line-height: 36rpx;
            .title {
              margin-bottom: 12rpx;
            }
            .content {
              font-size: 24rpx;
              font-family: PingFangSC-Regular, sans-serif;
              font-weight: normal;
              color: rgba(0, 0, 0, 0.6);
              line-height: 36rpx;
            }
          }
        }
      }
    }
  }
}
</style>
