<!--
 * @Date: 2022-12-13 09:31:03
 * @LastEditors: 大濕兄
 * @LastEditTime: 2022-12-16 15:31:58
 * @name: 
 * @FilePath: /monitoringh5/pages/enterpriseDueDiligence/EnterpriseDueDiligence.vue
-->
<template>
  <view class="kyc">
    <view class="search_sort">
      <view
          class="option"
          @click="clickEv(item)"
          v-for="(item, index) in searchList"
          :key="index"
      >
        <image class="img" :src="item.img" mode=""></image>
        <span>{{ item.title }}</span>
      </view>
    </view>
    <view class="time">2022-12-05 11:59</view>
    <view class="contents">
      <Card :baseInfo="baseInfo"></Card>
      <Messages ref="messages" class="Messages" v-if="messageShow"></Messages>
    </view>
    <!-- <view style="height:162rpx;background-color:#f5f5f5"></view> -->
    <view class="ipt">
      <view>消息回复正在开发中</view>
    </view>
  </view>
</template>

<script>
import {
  getCompanyDetail,
  downloadReport,
} from "@/api/enterpriseDueDiligence/index.js";
import Card from "./components/Card.vue";
import Messages from "./components/Messages.vue";

export default {
  components: {
    Card,
    Messages,
  },
  data() {
    return {
      baseInfo: { cname: "" },
      searchList: [
        {
          img: "/static/home/KYC.png",
          title: "企业KYC尽调",
          type: "kyc",
        },
        {
          img: "/static/home/flow.png",
          title: "银行流水尽调",
        },
        // {
        //   img: "/static/home/fiance.png",
        //   title: "财务尽调",
        // },
        {
          img: "/static/home/ai.png",
          title: "AI尽调",
        },
      ],
      messageShow: true,//是否显示消息组件
    };
  },
  onLoad(options) {
    this.getCompanyDetail(options);
  },
  onShow() {
    this.messageShow = true;
  },
  onHide() {
    this.messageShow = false;
  },
  methods: {
    clickEv(item) {
      let that = this;
      switch (item.type) {
        case "kyc":
          uni.showModal({
            title: "提示",
            content: "开始生成KYC报告，请稍作等待",
            showCancel: false,
            success: function (res) {
              that.downloadReport();
            },
          });

          break;

        default:
          uni.showModal({
            title: "提示",
            content: "该功能正在开发中，完整版请到pc端体验",
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log("用户点击确定");
              }
            },
          });
          break;
      }
    },
    async getCompanyDetail(formData) {
      try {
        let { data } = await getCompanyDetail(formData);
        this.baseInfo = data.baseinfo;
      } catch (error) {
        this.baseInfo = { cname: "" };
      }
    },
    async downloadReport() {
      try {
        let email = JSON.parse(uni.getStorageSync("USERINFO"));
        await downloadReport({
          ckey: this.$route.query.ckey,
          cname: this.$route.query.companyName,
          email: email.email,
        });
        this.$refs.messages.queryInvestigateResult();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.kyc {
  > .search_sort {
    width: 100%;
    height: 138rpx;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-around;

    > .option {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 180rpx;

      > .img {
        height: 56rpx;
        width: 56rpx;
      }

      > span {
        font-size: 24rpx;
        font-weight: normal;
        color: rgba(0, 0, 0, 0.6);
        line-height: 28rpx;
        margin-top: 8rpx;
      }
    }
  }

  > .time {
    width: 100%;
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.4);
    line-height: 28rpx;
  }

  > .contents {
    padding: 30rpx;
    height: calc(100vh - 400rpx);
    box-sizing: border-box;
    overflow: hidden;

    .Messages {
      height: calc(100vh - 860rpx);
      overflow: hidden;
      z-index: 0;
    }
  }

  .ipt {
    // position: fixed;
    // bottom: 0;
    z-index: 99;
    width: 100%;
    height: 162rpx;
    background-color: #ffffff;
    padding: 20rpx 30rpx;

    > view {
      text-align: center;
      width: 100%;
      height: 80rpx;
      background: rgba(0, 0, 0, 0.04);
      border-radius: 12rpx;
      font-size: 24rpx;
      font-weight: normal;
      color: #9e9e9e;
      line-height: 80rpx;
    }
  }
}
</style>
