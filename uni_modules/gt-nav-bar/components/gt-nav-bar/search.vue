<!--
 * @Date: 2022-05-19 18:34:03
 * @LastEditors: 大濕兄
 * @LastEditTime: 2022-12-01 15:50:32
 * @name: 
 * @FilePath: /monitoringh5/uni_modules/gt-nav-bar/components/gt-nav-bar/search.vue
-->
<template>
  <view class="box">
    <view class="head">
      <view class="search">
        <icon type="search" :size="rpxToPx(24)" />
        <input
          type="text"
          v-model="ipt"
          placeholder="请输入品牌名"
          confirm-type="search"
          @confirm="confirm"
        />
      </view>
      <span @click="cancel"> 取消 </span>
    </view>
    <view class="line"></view>
  </view>
</template>

<script>
import GtIcon from "@/components/gtIcon/GtIcon.vue";

export default {
  name: "search",
  components: {
    GtIcon,
  },
  data() {
    return {
      ipt: null,
    };
    // content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0
  },

  watch: {
    "$store.state.FormData.brand": {
      handler(newV) {
        this.ipt = newV;
      },
      deep: true,
      immediate: true, // 立即执行
    },
  },
  created() {
    this.setViewport(
      `width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0`
    );
  },
  methods: {
    confirm() {
      this.$store.commit("setFormData", { brand: "" });
      this.setViewport(`width=device-width, initial-scale=1.0`);
      this.$emit("search", this.ipt);
    },
    cancel() {
      this.setViewport(`width=device-width, initial-scale=1.0`);
      this.$emit("searchCancel");
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
    setViewport(content) {
      const meta = document.querySelector("meta[name=viewport]");
      if (!meta) return;
      meta.setAttribute("content", content);
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #ffffff;

  z-index: 12;
  padding: 0 40rpx;
  > .head {
    width: 670rpx;
    height: 90rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > .search {
      width: 536rpx;
      height: 60rpx;
      background: #ffffff;
      border-radius: 36rpx;
      border: 1rpx solid #00ce9e;
      display: flex;
      align-items: center;
      padding: 0 20rpx;

      > input {
        font-size: 26rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #9cc8dc;
        line-height: 37rpx;
        width: 100%;
      }
    }
    > span {
      font-size: 30rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      // color: #ffffff;
      line-height: 42rpx;
    }
  }
  .line {
    width: 750rpx;
    height: 1rpx;
    background-color: #b9e7fc;
    position: absolute;
    left: 0;
  }
}
</style>
