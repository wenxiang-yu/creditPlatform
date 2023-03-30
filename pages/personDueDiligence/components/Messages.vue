<!--
 * @Date: 2022-12-13 11:25:21
 * @LastEditors: 大濕兄
 * @LastEditTime: 2022-12-16 13:50:45
 * @name: 
 * @FilePath: /monitoringh5/pages/enterpriseDueDiligence/components/Messages.vue
-->
<template>
  <view class="messages">
    <scroll-view
      scroll-y="true"
      class="scroll"
      @scroll="scrollEv"
      @scrolltolower="scrolltolowerEv"
      :scroll-top="scrollTop"
      ref="scroll"
    >
      <view class="bubble" v-for="i in 2" :key="i">
        <image
          style="width: 60rpx; height: 60rpx"
          src="/static/index/robot.png"
        ></image>
		<view v-show="i=== 1">个体KYC尽调报告正在为您生成中。（个体KYC尽调报告生成时间为15-30分钟不等，生成时间较长，建议您稍后查看报告。如果您配置了邮箱信息，报告生成后会自动发送到您的邮箱！）</view>
        <view class="kycBtn" v-show="i === 2">
          <view>
            <image
              style="width: 72rpx; height: 72rpx"
              src="/static/home/KYC.png"
            ></image>
            您的个体KYC报告已生成
          </view>
          <button type="primary" class="btn">
            立即查看
          </button>
        </view>
        
      </view>
    </scroll-view>
  </view>
</template>

<script>
import {
  queryInvestigateResult,
  investigate_chat_type,
} from "@/api/enterpriseDueDiligence/index.js";
export default {
  data() {
    return {
      timer: null,
      messages: [],
      labelList: [],
      state: true,
      scrollTop: 0,
      default: true,
      cname: null,
    };
  },
  computed: {
    getLabelList() {
      return this.labelList.reduce((obj, item) => {
        obj["_" + item.dictLabel] = item.dictValue;
        return obj;
      }, {});
    },
  },
  created() {
    this.cname = this.$route.query.companyName;
    this.queryInvestigateResult();
    this.scrollTop = 500;
    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        this.queryInvestigateResult();
      }, 3000);
    }
    this.investigate_chat_type();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    to(type, item) {
      let date = this.$formatTime(
        new Date(item.createTime).getTime(),
        "yyyy-MM-dd HH:mm:ss"
      );

      switch (type) {
        case "kyc":
          uni.navigateTo({
            url: `/pages/kycInfo/kycInfo?ckey=${item.ckey}&createTime=${date}`,
          });
          break;

        default:
          break;
      }
    },
    async queryInvestigateResult() {
      let { data } = await queryInvestigateResult({
        ckey: this.$route.query.ckey,
      });
      this.messages = data.list.sort(this.f);
      let bubbles = document.querySelectorAll(".bubble");
      let num = 0;
      bubbles.forEach((item) => {
        num += item.clientHeight;
      });
      if (this.default) {
        this.$nextTick(function () {
          this.scrollTop = num;
        });
      } else if (this.state) {
        this.$nextTick(function () {
          this.scrollTop = num;
        });
      }
      this.default = false;
    },
    async investigate_chat_type() {
      let { data } = await investigate_chat_type();
      this.labelList = data;
    },
    scrollEv(ev) {
      if (ev.detail.deltaY > 0) {
        this.state = false;
      }
    },
    scrolltolowerEv(ev) {
      this.state = true;
    },
    getHTML(item) {
      let st = this.getLabelList[`_${item.type}_${item.status}`];
      try {
        if (st) {
          // 匹配替换公司
          st = st
            .replace("{company}", this.cname)
            .replace("{上传时间}", this.getTime(new Date(item.createTime)))
            .replace("{流水号}", item.reportNo);
        }
      } catch (error) {}
      // console.log(item.status);
      // 首先判断状态是否为0
      if (item.status) {
        // 匹配字典内容
        if (item.status === 2 && item.type === 2) {
          return { st: st, components: "aiUrlCopy", ckey: item.ckey };
        }
        if (item.status === 4 && item.type === 4) {
          return { st: st, components: "FlowingWaterTwo", ckey: item.ckey };
        }
        return { st: st, components: null, ckey: item.ckey };
      } else {
        if (item.type === 4) {
          if (item.remark) {
            return {
              st: `<div>${item.remark.replace(
                "{上传时间}",
                this.getTime(new Date(item.createTime))
              )}</div><div>您上传的文件错误过多。请您仔细检查后重新上传，<span class="lookMove" style="cursor: pointer;color:#2B78C0">查看更多></span></div>`,
              components: "FlowingWaterError",
              ckey: item.ckey,
            };
          } else {
            return { st: st, components: "FlowingWater", ckey: item.ckey };
          }
        }
        if (item.type === 1) {
          return {
            st: item.targetName || item.remark,
            components: "Kyc",
            ckey: item.ckey,
          };
        }
        if (item.type === 2) {
          if (item.targetName) {
            return {
              st: item.targetName || item.remark,
              components: "AiForm",
              ckey: item.ckey,
            };
          }
          if (item.reportNo) {
            return {
              st: item.targetName || item.remark,
              components: "Ai",
              ckey: item.ckey,
            };
          }
          return {
            st: item.targetName || item.remark,
            components: null,
            ckey: item.ckey,
          };
        }
        if (item.type === 8) {
          if (item.targetName) {
            return {
              st: item.targetName,
              components: "FinancialForm",
              ckey: item.ckey,
            };
          }
          if (item.remark.includes("【")) {
            return {
              st: item.remark,
              components: "FinancialCopy",
              ckey: item.ckey,
            };
          } else {
            return {
              st: item.remark,
              components: "Financial",
              ckey: item.ckey,
            };
          }
        }
        return {
          st: item.targetName || item.remark,
          components: null,
          ckey: item.ckey,
        };
      }
    },
    f(a, b) {
      //排序函数

      return a.id - b.id; //返回比较参数
    },
    getTime(time) {
      return this.$formatTime(time, "yyyy-MM-dd HH:mm:ss");
    },
  },
};
</script>
<style lang="less" scoped>
.scroll {
  height: 100%;
}
.bubble {
  display: flex;
  margin: 30rpx 0;
  border-radius: 16rpx;
  overflow: hidden;
  > image {
    flex-shrink: 0;
  }
  > view {
    background: #ffffff;
    margin-left: 14rpx;
    padding: 16rpx 20rpx;
  }
  > .kycBtn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #e4ecf7;
    > view:nth-of-type(1) {
      display: flex;
      align-items: center;
      font-size: 26rpx;
      font-weight: normal;
      color: rgba(0, 0, 0, 0.85);
      line-height: 44rpx;
      > image {
        margin-right: 20rpx;
      }
    }
    .btn {
      margin: 0 !important;
      height: 72rpx;
      background: #3662ec;
      font-size: 26rpx;
      font-weight: normal;
      color: #ffffff;
      line-height: 72rpx;
    }
  }
}
</style>
