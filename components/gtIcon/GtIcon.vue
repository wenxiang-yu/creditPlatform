<template>
  <img :src="icon[type]" @click="showTips" :class="type" alt="" srcset="" />
</template>

<script>
export default {
  name: "GtIcon",
  props: {
    type: {
      type: String,
      default: "wildCard",
    },
    tips: {
      type: String,
      default: "提示",
    },
  },
  data() {
    return {
      icon: {
        wildCard: "./static/icon/wildCard.png",
        zhibiaoshang: "./static/icon/zhibiaoshang.png",
        zhibiaoxia: "./static/icon/zhibiaoxia.png",
        clear: "./static/icon/clear.png",
      },
    };
  },
  methods: {
    showTips() {
      if (this.type === "wildCard") {
        uni.showModal({
          title: "提示",
          content: this.tips,
          showCancel: false,
          success: function (res) {},
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.wildCard,
.zhibiaoshang,
.zhibiaoxia {
  margin: 0 6rpx;
}
.wildCard {
  width: 24rpx;
  height: 24rpx;
}
.zhibiaoshang,
.zhibiaoxia {
  width: 20rpx;
  height: 20rpx;
}
.zhibiaoshang {
  transform: rotate(318deg);
}
.zhibiaoxia {
  transform: rotate(140deg);
}
.clear{
  width: 28rpx;
  height: 28rpx;
}
</style>
