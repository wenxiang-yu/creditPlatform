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
        <text>{{baseInfo.cname.substring(0,1)}}</text>
      </view>
      <view class="title">
        <view class="head">
          <view>{{baseInfo.cname}}</view>
         <view class="userinfo">
			 <view >
			 	手机号：<text>17701342462</text>
			 </view>
			 <view>
			  身份证号：<text>130388573293857281</text> 	
			 </view>
         </view>
        </view>
      </view>
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
      width: 88rpx;
      height: 88rpx;
      border-radius: 88rpx;
      background-color: #2888e8;
      margin-right: 20rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 32rpx;
    }
    > .title {
      width: calc(100% - 80rpx);
      > .head {
        font-size: 30rpx;
        font-weight: normal;
        color: #262626;
        line-height: 35rpx;
		.userinfo{
			view{
			font-family: PingFangSC-Regular;
			font-size: 24rpx;
			font-weight: normal;
			letter-spacing: 0rpx;
			color: #9E9E9E;
			margin-top: 10rpx;
			text{
				color: rgba(0, 0, 0, 0.85);
			}
			}
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
