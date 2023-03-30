<!--
 * @Date: 2022-06-02 11:10:56
 * @LastEditors: 大濕兄
 * @LastEditTime: 2022-12-01 10:52:36
 * @name: 
 * @FilePath: /monitoringh5/pages/mdfz/components/box.vue
-->
<template>
  <gt-box class="tree">
    <view class="Btitle">{{ data.title }}<!-- <gt-icon :tips="data.titleTips" /> --></view>
    <view
      ><span class="blueb">{{ data.home }}</span>
    </view>
    <view>
      <span>{{ data.tag1.title }}</span>
      <gt-icon :type="getNum(data.tag1.num)>0?'zhibiaoshang':'zhibiaoxia'" />
      <span :class="getNum(data.tag1.num)>0?'redb':'greenb'">{{  getNum(data.tag1.num) }}%</span>
    </view>
    <view v-if="data.tag2">
      <span>{{ data.tag2.title }}</span>
      <gt-icon :type="getNum(data.tag2.num)>0?'zhibiaoshang':'zhibiaoxia'" />
      <span :class="getNum(data.tag2.num)>0?'redb':'greenb'">{{ getNum(data.tag2.num) }}%</span>
    </view>
  </gt-box>
</template>

<script>
import GtBox from "@/components/gtBox/GtBox.vue";
import GtIcon from "@/components/gtIcon/GtIcon.vue";

export default {
  name: "box",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    GtBox,
    GtIcon,
  },
  computed: {
    getNum(){
      return (st)=>{
        let num=st.split("%")

        return num[0]?Number(num[0]):0
      }
    }
  }
};
</script>

<style lang="less" scoped>
.tree {
  padding: 10rpx;
  margin: 10rpx 0 20rpx 0;
  color: rgba(0,0,0,0.6);
  position: relative;
  text-align: center;
//   width: 178rpx;
  flex-shrink: 0;
  > view:nth-of-type(1) {
    font-size: 20rpx;
    font-weight: 500;
    display: flex;
    align-items: center;
	justify-content: center;
  }
  > view:nth-of-type(2) {
    font-weight: 500;
    color: #ffd138;
    margin: 10rpx 0;
    display: flex;
    align-items: center;
	justify-content: center;
    > span:nth-of-type(1) {
      font-size: 28rpx;
    }
    > span:nth-of-type(2) {
      color: #ffffff;
      font-size: 20rpx;
    }
  }
  > view:nth-of-type(3),
  > view:nth-of-type(4) {
    font-size: 19rpx;
    font-weight: 400;
  }
  .blueb {
    color: #3662EC;
	font-size: 40rpx !important;
  }
  .redb {
    color: #ff3b3b;
  }
  .greenb {
    color: #6dd400;
  }
  .Btitle{
	  font-size: 26rpx !important;
	  color: #1D2129 !important;
  }
	  &::before{
		  position: absolute;
		  right: -8rpx;
		  top: 50%;
		  transform: translateY(-50%);
		  content:"";
		  display: inline-block;
		  width: 1rpx;
		  height: 120rpx;
		  background: rgba(0,0,0,0.08)
  }
}
</style>
