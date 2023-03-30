<!--
 * @Date: 2022-12-01 09:26:34
 * @LastEditors: 大濕兄
 * @LastEditTime: 2022-12-01 11:15:08
 * @name: 
 * @FilePath: /monitoringh5/components/gtBox/GtBox.vue
-->
<template>
  <view :class="type">
    <slot />
  </view>
</template>

<script>
export default {
  name: "GtBox",
  props: {
    // fourBorder四个包边，twoBorder两个斜对角包边
    type: {
      type: String,
      default: "fourBorder",
    },
  },
};
</script>

<style lang="less" scoped>
.fourBorder {
  position: relative;
  // > .s1,
  // > .s2,
  // > .s3,
  // > .s4 {
  //   display: block;
  //   width: 10rpx;
  //   height: 11rpx;
  //   border: 2rpx solid #b9e7fc;
  //   position: absolute;
  // }
  // > .s1 {
  //   top: 0;
  //   left: 0;
  //   border-right: none;
  //   border-bottom: none;
  // }
  // > .s2 {
  //   top: 0;
  //   right: 0;
  //   border-left: none;
  //   border-bottom: none;
  // }
  // > .s3 {
  //   left: 0;
  //   bottom: 0;
  //   border-right: none;
  //   border-top: none;
  // }
  // > .s4 {
  //   right: 0;
  //   bottom: 0;
  //   border-left: none;
  //   border-top: none;
  // }
}
.twoBorder {
  background: #ffffff;
  border-radius: 12px;
//   border: 1rpx solid;
//   box-sizing: border-box;
//   border-image: linear-gradient(
//       135deg,
//       rgba(222, 245, 254, 0.72),
//       rgba(202, 237, 253, 0),
//       rgba(192, 234, 253, 0),
//       rgba(185, 231, 252, 0.72)
//     )
//     1 1;
}
</style>
