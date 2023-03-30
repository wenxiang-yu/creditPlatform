<!--
 * @Date: 2022-12-16 16:13:40
 * @LastEditors: 大濕兄
 * @LastEditTime: 2022-12-16 17:04:51
 * @name: 
 * @FilePath: /monitoringh5/pages/kycInfo/components/Table.vue
-->
<template>
  <view class="table">
    <!-- {{ tableDatas }} -->
    <uni-table border stripe emptyText="暂无更多数据">
      <!-- 表头行 -->
      <uni-tr>
        <uni-th
          align="center"
          v-for="(item, index) in tableDatas.tableTitles"
          :key="index"
          v-bind="item.options"
          >{{ item.name }}</uni-th
        >
      </uni-tr>
      <!-- 表格数据行 -->
      <uni-tr v-for="(item, index) in tableDatas.tableData" :key="index">
        <uni-td align="center" v-for="(val, i) in tableDatas.tableTitles" :key="i">{{
          val.key === "index" ? index+1 : item[val.key]
        }}</uni-td>
      </uni-tr>
    </uni-table>
  </view>
</template>

<script>
export default {
  props: {
    tableDatas: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.table {
  padding: 20rpx;
  background-color: #ffffff;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
  .uni-table-th,.uni-table-td{
    font-size: 26rpx;
  }
}
</style>
