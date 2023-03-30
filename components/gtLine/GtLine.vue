<!--
 * @Date: 2022-12-01 09:26:34
 * @LastEditors: 大濕兄
 * @LastEditTime: 2022-12-02 13:55:24
 * @name: 
 * @FilePath: /monitoringh5/components/gtLine/GtLine.vue
-->
<template>
  <view :class="type">
    <!-- <span></span> -->
	<view class="wraps">
	<view class="left">
	<image :src="`/static/icon/${enmu[title]}.png`" class="img" v-if="Object.keys(enmu).includes(title)"></image>
    {{ title }}					
	</view>
	<view class="right" v-if="Object.keys(enmu).includes(title)">
		单位：家
	</view>
	</view>
  </view>
</template>

<script>
export default {
  name: "GtLine",
  props: {
    // line默认样式，title渐变样式
    type: {
      type: String,
      default: "line",
    },
    title: {
      type: String,
      default: "",
    },
  },
  data(){
	  return {
		  enmu:{
			  "企业总数":'allStore',
			  "6月":'month',
			  "年累计":'year',
			  "TTM":'ttm'
			  }
	  }
  }
};
</script>

<style lang="less" scoped>
.wraps{
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-right:20rpx ;
	font-size: 26rpx;
	font-weight: normal;
	color: rgba(0,0,0,0.85);
	.left{
	 display: flex;
	 align-items: center;
	.img{
		width: 44rpx;
		height: 44rpx;
		margin-right: 14rpx;
	}		
	}

}
.line {
  font-size: 30rpx;
  font-weight: 500;
  // color: #ffffff;
  line-height: 50rpx;
  display: flex;
  align-items: center;
  > span {
    display: block;
    width: 6rpx;
    height: 36rpx;
    background: #00ce9e;
    border-radius: 3rpx;
    margin-right: 13rpx;
  }
}
.title {
  width: 100%;
  height: 87rpx;
  padding-left: 20rpx;
  background: linear-gradient(
    90deg,
    rgba(54, 98, 236, 0.06) 0%,
    rgba(53, 97, 235, 0) 100%
  );
  display: flex;
  align-items: center;
  font-size: 30rpx;
  font-weight: 500;
  color: #333333;
  line-height: 42rpx;
  border-radius: 12rpx 0 0 0;
}
</style>
