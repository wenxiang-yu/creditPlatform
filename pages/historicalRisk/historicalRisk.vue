<template>
  <view class="history_wrap">
    <!-- 如果title为空白的话，就让tab栏隐藏 -->
    <Nav :tabName="{ title: '空白', flag: true }" />
    <view class="introductionToThe">
      <view class="header">
        <view
          style="
            width: 88rpx;
            height: 88rpx;
            background-color: #2888e8;
            border-radius: 6rpx;
            color: #ffffff;
            margin: 0 10rpx;
            text-align: center;
            font-size: 32rpx;
            display: flex;
            align-items: center;
          "
        >
          {{ baseInfo.cname.slice(0, 4) }}
        </view>
        <view class="names">
          <view class="ming">
            <text> {{ baseInfo.cname }} </text>
            <view class="tag" style="background-color: #e9f3fc; color: #2888e8">
              {{ baseInfo.regStatus }}
            </view>
            <view>
              <view class="info">
                <text>{{ baseInfo.operName }}</text>
                <text>{{ baseInfo.paidinCapi }}</text>
                <text>{{ baseInfo.startDate }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 简介-->
      <view class="introduction">
        {{ baseInfo.info }}
        <view class="seeDetails" @click="show = true"> 查看详情 </view>
      </view>
    </view>
    <!-- 时间列表模块 -->
    <view class="time_wrap">
      <view class="listTime" v-for="(item, index) in listData" :key="index">
        <view class="T_list">
          <view
            class="header"
            @click="
              () => {
                if (active === index) {
                  active = null;
                } else {
                  active = index;
                }
              }
            "
          >
            <text>{{ formatTime(item.time, "yyyy-MM-dd") }}</text>
            <image src="../../static/arrow_right.png" class="img_arrow"></image>
          </view>
          <view v-show="active == index">
            <view class="main" v-for="(val, i) in item.arr" :key="i">
              <view class="main_title"> {{ val.typeName }} </view>
              <view class="main_body">
                {{ val.tacticsMatchRule }}({{ val.tacticNoCount }})
              </view>
            </view>
            <view class="packUp" @click="active = -1"> 收起展开 </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 出现弹框-->
    <tm-dialog
      v-model="show"
      :content="baseInfo.info"
      :showCancel="false"
      title="公司简介"
    ></tm-dialog>
  </view>
</template>

<script>
import {
  getAmounts,
  selectEventDiagnosis,
  getBaseInfo,
} from "@/api/dashboard.js";
import Nav from "../../components/Nav.vue";
export default {
  components: {
    Nav,
  },
  data() {
    return { show: false, active: -1, listData: [], baseInfo: {} };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getAmounts();
      this.getBaseInfo();
    },
    getBaseInfo() {
      let cname = this.$route.query.cname;
      getBaseInfo({ cname: cname }).then((res) => {
        this.baseInfo = res.data.baseinfo;
      });
    },
    getAmounts() {
      let ckey = this.$route.query.ckey;
      getAmounts({ ckey: ckey }).then((res) => {
        //   getAmounts().then((res) => {
        res.data.list.forEach((item) => {
          let list = {
            time: item.createTime,
            arr: [],
          };
          selectEventDiagnosis({
            ckey: ckey,
            create_time: item.createTime,
            pageNum: 1,
            pageSize: 999,
          }).then((res) => {
            list.arr = res.data.eventDiagnosisVO.list;
            this.listData.push(list);
            console.log(res.data.eventDiagnosisVO, "-=-=-=");
          });
        });
      });
    },
    /**
     * @param {date} time 需要转换的时间
     * @param {String} fmt 需要转换的格式 如 yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
     */
    formatTime(time, fmt) {
      if (!time) return "";
      else {
        const date = new Date(time);
        const o = {
          "M+": date.getMonth() + 1,
          "d+": date.getDate(),
          "H+": date.getHours(),
          "m+": date.getMinutes(),
          "s+": date.getSeconds(),
          "q+": Math.floor((date.getMonth() + 3) / 3),
          S: date.getMilliseconds(),
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        for (const k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length === 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
          }
        }
        return fmt;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.history_wrap {
  .introductionToThe {
    background-color: #ffffff;
    padding: 30rpx;
    .header {
      display: flex;
      .names {
        margin-left: 20rpx;
        .ming {
          font-size: 26rpx;
          font-family: PingFangSC-Medium, sans-serif;
          font-weight: normal;
          color: #262626;

          .tag {
            display: inline-block;
            margin-left: 20rpx;
            padding: 4rpx 9rpx;
          }
        }
        .info {
          font-size: 22rpx;
          font-family: PingFangSC-Regular, sans-serif;
          font-weight: normal;
          color: rgba(0, 0, 0, 0.6);
          margin-top: 8rpx;
          text {
            margin-right: 20rpx;
          }
        }
      }
    }
    .introduction {
      height: 180rpx;
      font-size: 24rpx;
      position: relative;
      margin-top: 27rpx;
      line-height: 30rpx;
      background: #ffffff;
      border-radius: 6px 6px 6px 6px;
      overflow: hidden;
      .seeDetails {
        background-color: rgba(255, 255, 255, 0.95);
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 87rpx;
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        font-size: 22rpx;
        font-weight: normal;
        color: #2888e8;
        line-height: 31px;
      }
    }
  }
  .time_wrap {
    padding: 0 30rpx;
    overflow: hidden;
    background-color: #f5f5f5;
    font-family: PingFangSC-Medium, sans-serif;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.85);
    // 时间列表模块样式
    .listTime {
      margin-top: 30rpx;
      background-color: #ffffff;
      padding: 30rpx;
      .T_list {
        background-color: #ffffff;
        .header {
          display: flex;
          justify-content: space-between;
          font-size: 28rpx;
          font-family: PingFangSC-Medium, sans-serif;
          font-weight: normal;
          color: rgba(0, 0, 0, 0.85);
        }
        .main {
          margin-top: 20rpx;
          padding: 20rpx;
          font-size: 24rpx;
          line-height: 36rpx;
          background-color: #f5f5f5;
          .main_title {
            font-size: 26rpx;
            margin-bottom: 12rpx;
          }
        }
        .packUp {
          display: flex;
          margin-top: 20rpx;
          justify-content: center;
          align-items: center;
          font-size: 22rpx;
          font-family: PingFangSC-Regular, sans-serif;
          font-weight: normal;
          color: #2888e8;
        }
      }
    }
  }
}
</style>
