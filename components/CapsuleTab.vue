<template>
  <view class="capsule-tab">
    <view class="capsule-tab-item" :class="active === tab.value && 'capsule-tab-item-active'"
          v-for="(tab,index) in tabs" :key="index" @click="tabClick(tab.value)">
      {{ tab.label }}
    </view>
  </view>
</template>

<script>
export default {
  name: "capsuleTab",
  props: {
    //选项
    tabs: {type: Array},
    //默认选中项
    defaultActive: {type: String | Number}
  },
  data() {
    return {
      active: this.defaultActive,
    }
  },
  watch: {
    defaultActive(cur) {
      this.active = cur;
    }
  },
  methods: {
    tabClick(e) {
      this.active = e;
      this.$emit("click", e)
    },
  }
}
</script>

<style lang="scss" scoped>
.capsule-tab {
  padding: 6rpx;
  border-radius: 36rpx;
  background: rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;

  &-item {
    padding: 6rpx 18rpx;
    font-size: 22rpx;
    color: rgba(0, 0, 0, 0.6);
    line-height: 30rpx;

    &-active {
      background: #ffffff;
      border-radius: 28rpx;
      color: #165DFF;
    }
  }
}
</style>