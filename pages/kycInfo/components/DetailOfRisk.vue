<!--
 * @Date: 2022-12-16 16:06:35
 * @LastEditors: 大濕兄
 * @LastEditTime: 2022-12-16 17:23:18
 * @name: 
 * @FilePath: /monitoringh5/pages/kycInfo/components/DetailOfRisk.vue
-->
<template>
  <view class="detailOfRisk">
    <view class="tips">
      Tips：未命中规则表格显示为空；风险等级数字越大危险程度越高，数字为零或负数代表中性、利好规则。
    </view>
    <template v-for="(item, key) in data">
      <Table
        v-if="getState(key)"
        :key="key"
        :tableDatas="getData(item, key)"
      ></Table>
    </template>
  </view>
</template>

<script>
import Table from "./Table.vue";
export default {
  components: {
    Table,
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    getState(key) {
      return [
        "codeLevelListqyzt",
        "codeLevelListjymx",
        "codeLevelListhgcd",
        "codeLevelListjyqk",
        "codeLevelListfzql",
      ].includes(key);
    },
    getData(item, key) {
      let data = JSON.parse(JSON.stringify(item));
      data.forEach((val) => {
        if (val.hitOrNot === 1) {
          val.hitOrNot = "是";
        } else {
          val.hitOrNot = "";
          val.level=""
        }
      });
      let name = "";
      switch (key) {
        case "codeLevelListqyzt":
          name = "企业主体";
          break;
        case "codeLevelListjymx":
          name = "经营环境";
          break;
        case "codeLevelListhgcd":
          name = "合规程度";
          break;
        case "codeLevelListjyqk":
          name = "经营情况";
          break;
        case "codeLevelListfzql":
          name = "发展潜力";
          break;
      }
      return {
        tableTitles: [
          { name: "序号", key: "index", options: { width: "100rpx" } },
          { name: name, key: "scoreGroup", options: { width: "290rpx" } },
          { name: "风险等级", key: "level", options: { width: "150rpx" } },
          { name: "命中", key: "hitOrNot", options: { width: "100rpx" } },
        ],
        tableData: data,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.detailOfRisk {
  padding: 30rpx;
  > .tips {
    font-size: 24rpx;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.6);
    line-height: 45rpx;
    margin-bottom: 30rpx;
  }
}
</style>
