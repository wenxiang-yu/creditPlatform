<!--
 * @Date: 2022-12-13 10:16:15
 * @LastEditors: 大濕兄
 * @LastEditTime: 2022-12-16 13:54:30
 * @name: 
 * @FilePath: /monitoringh5/pages/enterpriseDueDiligence/components/Card.vue
-->
<template>
  <div class="Card">
    <view class="box_top">
      <view class="avatar">
        <text>{{ baseInfo.cname.slice(0, 2) }}</text>
        <text>{{ baseInfo.cname.slice(2, 4) }}</text>
      </view>
      <view class="title">
        <view class="head">
          <view @click="to(baseInfo.cname)">{{ baseInfo.cname }}</view>
          <view>{{ baseInfo.regStatus }}</view>
        </view>
        <view class="box">
          <view>
            <text>营收预测</text>
            <text class="blueFont">1.6亿</text>
          </view>
          <view>
            <text>利润预测</text>
            <text class="blueFont">9999万</text>
          </view>
          <view>
            <text>利润率</text>
            <text class="blueFont">99.99%</text>
          </view>
          <view>
            <text>价值分析 </text>
            <text class="redFont">999+条</text>
          </view>
          <view>
            <text>风险分析</text>
            <text class="redFont">999+条</text>
          </view>
        </view>
      </view>
    </view>
    <view class="box_center">
      <view>
        <text>法定代表人</text>
        <text>{{ baseInfo.operName }}</text>
      </view>
      <view>
        <text>注册资本</text>
        <text>{{ baseInfo.registCapi }}</text>
      </view>
      <view>
        <text>成立日期</text>
        <text>{{ baseInfo.startDate }}</text>
      </view>
    </view>
    <view class="box_bottom">
      <view class="line"></view>
      <view class="left">
        <!-- <view @click="addInvestigate">
          <image
            src="/static/kyc/plus.png"
            style="width: 24rpx; height: 24rpx"
          ></image>
          尽调</view
        >
        <view>
          <image
            src="/static/kyc/eye.png"
            style="width: 24rpx; height: 20rpx"
          ></image
          >监控</view
        > -->
      </view>
      <view class="right">
        <view @click="showModal('地址', baseInfo.address)">地址</view>
        <view @click="showModal('官网', baseInfo.link)">官网</view>
        <view @click="showModal('电话', baseInfo.contactNumber)">电话</view>
      </view>
    </view>
  </div>
</template>

<script>
import { addInvestigate } from "@/api/enterpriseDueDiligence/index.js";
export default {
  props: ["baseInfo"],
  methods: {
    to(cname) {
      uni.navigateTo({
        url: `/pages/companyDetails/companyDetails?option=${JSON.stringify({
          cname: cname,
        })}`,
      });
    },
    async addInvestigate() {
      await addInvestigate({
        cname: this.$route.query.companyName,
      });
    },
    showModal(title, text) {
      uni.showModal({
        title: title,
        content: text,
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log("用户点击确定");
          }
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.redFont {
  color: #00b578;
}
.blueFont {
  color: #3662ec;
}
.Card {
  background: #ffffff;
  border-radius: 6rpx;
  padding: 20rpx;
  position: relative;
  margin-top: -20rpx;
  > .box_top {
    display: flex;
    > .avatar {
      width: 60rpx;
      height: 60rpx;
      border-radius: 4rpx;
      background-color: #2888e8;
      margin-right: 20rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 16rpx;
    }
    > .title {
      width: calc(100% - 80rpx);
      > .head {
        font-size: 30rpx;
        font-weight: normal;
        color: #262626;
        line-height: 35rpx;
        display: flex;
        justify-content: space-between;
        > view:nth-of-type(1) {
          width: calc(100% - 60rpx);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        > view:nth-of-type(2) {
          text-align: center;
          line-height: 36rpx;
          width: 60rpx;
          height: 36rpx;
          background: rgba(0, 181, 120, 0.1);
          border-radius: 2rpx;
          font-size: 20rpx;
          font-weight: normal;
          color: #00b578;
        }
      }
      > .box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 90rpx;
        background: rgba(0, 0, 0, 0.02);
        padding: 12rpx;
        margin-top: 10rpx;
        > view {
          display: flex;
          flex-direction: column;
          align-items: center;

          > text:nth-of-type(1) {
            font-size: 22rpx;
            font-weight: normal;
            color: rgba(0, 0, 0, 0.6);
            line-height: 26rpx;
          }
          > text:nth-of-type(2) {
            font-size: 22rpx;
            font-weight: normal;
            line-height: 26rpx;
            margin-top: 4rpx;
            filter: blur(3px);
          }
        }
      }
    }
  }
  > .box_center {
    display: flex;
    justify-content: space-around;
    margin-top: 24rpx;
    > view {
      display: flex;
      flex-direction: column;
      align-items: center;
      > text:nth-of-type(1) {
        font-size: 22rpx;
        font-weight: normal;
        color: #9e9e9e;
        line-height: 26rpx;
      }
      > text:nth-of-type(2) {
        margin-top: 8rpx;
        font-size: 24rpx;
        font-weight: normal;
        color: rgba(0, 0, 0, 0.85);
        line-height: 28rpx;
      }
    }
  }
  > .box_bottom {
    margin-top: 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 85rpx;

    > .line {
      position: absolute;
      bottom: 105rpx;
      left: 0;
      height: 1rpx;
      width: 100%;
      background: rgba(0, 0, 0, 0.08);
    }
    > view {
      display: flex;
      > view {
        height: 45rpx;
        background: #ffffff;
        border-radius: 28rpx;
        padding: 0 14rpx;
        line-height: 45rpx;
        font-size: 24rpx;
        font-weight: normal;
        color: #3662ec;
      }
    }
    > .left {
      > view {
        border: 2rpx solid #3662ec !important;
        margin-right: 16rpx;
        display: flex;
        align-items: center;
        > image {
          margin-right: 4rpx;
        }
      }
    }
    > .right {
      > view {
        background: rgba(54, 98, 236, 0.1);
        margin-left: 16rpx;
      }
    }
  }
}
</style>
