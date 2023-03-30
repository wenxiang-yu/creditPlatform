<template>
  <view class="rank">
    <Nav
      ref="navs"
      @search="getIndustyList"
      @searchFormData="searchFormData"
      :tabName="{ title: ['预警企业风险排行'], flag: true }"
    />
    <scroll-view :scroll-y="true" @scrolltolower="triggered" class="list_brand">
      <view class="companyInfo" v-for="(item, index) in listData" :key="index">
        <view
          class="companyTitle"
          @click="
            () => {
              if (isShow === index) {
                isShow = null;
              } else {
                isShow = index;
              }
            }
          "
        >
          <view class="left">
            <text style="margin-right: 5rpx;min-width:50rpx;text-align: center;">{{ index + 1 }}</text>
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
              {{ item.cname.slice(0, 4) }}
            </view>
            <view class="Cn">
              <view>{{ item.cname }}</view>
              <view
                >有<text>{{ item.sumAmount }}</text
                >条风险</view
              >
            </view>
          </view>
          <view class="right">
            <image src="../../static/arrow_right.png" class="img_arrow"></image>
          </view>
        </view>
        <view class="companyContent" v-show="isShow == index">
          <view
            class="riskList"
            v-show="getTacticHitList(1, item.tacticHitList).length"
          >
            <view
              class="tag"
              style="background-color: rgba(250, 81, 81, 0.1); color: #fa5151"
            >
              高风险
            </view>
            <view
              class="info"
              v-for="(val, i) in getTacticHitList(1, item.tacticHitList)"
              :key="i"
            >
              {{ val.matchRule
              }}<text style="color: #fa5151">({{ val.levelAmount }})</text>
            </view>
          </view>
          <view
            class="riskList"
            v-show="getTacticHitList(2, item.tacticHitList).length"
          >
            <view class="tag" style="background-color: #faefe4; color: #ff8f1f">
              中风险
            </view>
            <view
              class="info"
              v-for="(val, i) in getTacticHitList(2, item.tacticHitList)"
              :key="i"
            >
              {{ val.matchRule
              }}<text style="color: #fa5151">({{ val.levelAmount }})</text>
            </view>
          </view>
          <view
            class="riskList"
            v-show="getTacticHitList(4, item.tacticHitList).length"
          >
            <view class="tag" style="background-color: #e1f3ed; color: #00b578">
              低风险
            </view>
            <view
              class="info"
              v-show="val.riskLevel == 4"
              v-for="(val, i) in getTacticHitList(4, item.tacticHitList)"
              :key="i"
            >
              {{ val.matchRule
              }}<text style="color: #fa5151">({{ val.levelAmount }})</text>
            </view>
          </view>

          <!-- 查看历史风险 -->
          <!-- <view class="historyRisk" @click="toHistoryRisk(item)">
            历史风险>
          </view> -->
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import Nav from "../../components/Nav.vue";
import {
  getAmount,
  getIndustyList,
  getTacticHitMapHit,
} from "@/api/dashboard.js";
export default {
  components: {
    Nav,
  },
  data() {
    return {
      isShow: null,
      listData: [],
      pages: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getAmount();
      this.getIndustyList();
    },
    getTacticHitList(type, data) {
      let list = [];
      data.forEach((item) => {
        if (item.riskLevel === type) {
          list.push(item);
        }
      }, []);
      return list;
    },
    triggered() {
      let num = this.pages.pageNum * this.pages.pageSize;

      if (num < this.total) {
        console.log(num, this.pages, this.total);
        this.pages.pageSize = (this.pages.pageNum + 1) * this.pages.pageSize;
        this.searchFormData();
      }
    },
    searchFormData() {
      let data = this.$refs.navs.dashboardFormData;
      let num = this.$refs.navs.publics.data == "公有池" ? 1 : 2;
      let copyData = JSON.parse(
        JSON.stringify(data).replace(/"请选择"/g, null)
      );
      this.getTacticHitMapHit(num, copyData);
    },
    getTacticHitMapHit(num, data) {
      getTacticHitMapHit(num, { ...this.pages, ...data }).then((res) => {
        this.listData = res.data.list;
        this.total = res.data.total;
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
    // 跳转历史风险页面
    toHistoryRisk(data) {
      console.log(data);
      uni.navigateTo({
        url: `/pages/historicalRisk/historicalRisk?ckey=${data.ckey}&cname=${data.cname}`,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.rank {
  .list_brand {
    height: 100vh;
    padding: 30rpx;
    background-color: #f5f5f5;
    .companyInfo {
      margin-top: 2rpx;
      padding: 30rpx 20rpx;
      background-color: #fff;
      .companyTitle {
        display: flex;
        justify-content: space-between;
        .left {
          display: flex;
          align-items: center;
          image {
            margin: 0 24rpx;
          }
          .Cn {
            >view:nth-of-type(1){
              width: 450rpx;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            view {
              font-family: PingFangSC-Medium, sans-serif;
              font-weight: normal;
              &:frist-child {
                font-size: 28rpx;
                color: #262626;
              }
              &:last-child {
                margin-top: 18rpx;
                font-size: 24rpx;
                font-family: PingFangSC-Regular, sans-serif;
                color: rgba(0, 0, 0, 0.6);
                text {
                  color: #fa5151;
                }
              }
            }
          }
        }
      }
      .companyContent {
        font-family: PingFangSC-Regular, sans-serif;
        .historyRisk {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 30rpx;
          font-size: 24rpx;
          font-family: PingFangSC-Regular, sans-serif;
          font-weight: normal;
          color: #ff8f1f;
        }
        .riskList {
          margin-top: 20rpx;
          border-radius: 1%;
          background-color: #f5f5f5;
          padding: 20rpx;
          .tag {
            text-align: center;
            font-size: 20rpx;
            width: 78rpx;
            height: 36rpx;
          }
          .info {
            font-size: 24rpx;
            margin-top: 16rpx;
          }
        }
      }
    }
  }
}
</style>
