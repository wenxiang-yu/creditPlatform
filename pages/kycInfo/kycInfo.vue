<template>
  <view>
    <Loading v-if="loading"/>

    <view class="kyc" v-else>
      <!-- 选项卡 -->
      <tm-tabs
          v-model="activeIndex"
          :list="list"
          range-key="title"
          @change="tabChange"
      />
      <!-- 整体概要 -->
      <view class="kyc-card" v-if="activeIndex === 0">
        <view class="second--title">{{ list[activeIndex].title }}</view>
        <view class="score-rating">
          <view class="total-score">
            <view class="score-rating-title">
              <image src="../../static/icon/score.png"/>
              总分
            </view>
            <view class="score-rating-num">
              <text>{{
                  reportData.companyRuleNewVO && reportData.companyRuleNewVO.score
                }}
              </text>
              分
            </view>
            <!--            <view class="score-rating-date">更新：2022-09-13 00:00</view>-->
          </view>
          <view class="credit-rating">
            <view class="score-rating-title">
              <image src="../../static/icon/rating.png" class="rating-icon"/>
              信用等级
            </view>
            <view
                class="score-rating-grade"
                :style="`color:${gradeActiveObj.activeColor}`"
            >
              {{ gradeActive }}
            </view>
            <!--            <view class="score-rating-date">更新：2022-09-13 00:00</view>-->
          </view>
        </view>
        <view class="grade-rules">
          <view
              class="grade-rules-item"
              :class="gradeActive === grade.value && 'grade-rules-item-active'"
              :style="`background:${grade.color};${
              gradeActive === grade.value && 'background:' + grade.activeColor
            };`"
              v-for="(grade, index) in gradeList"
              :key="index"
          >
            <view>{{ grade.label }}</view>
            <view>{{ grade.value }}</view>
            <view
                class="arrow-active"
                :style="`borderBottomColor:${grade.activeColor}`"
                v-if="gradeActive === grade.value"
            ></view>
          </view>
        </view>
      </view>
      <!-- 图表 -->
      <view class="kyc-card" v-if="list[activeIndex].title !== '风险明细'">
        <view class="chart-info" v-if="activeIndex === 0">
          <view class="chart-info-item" v-for="(info, i) in chartInfo" :key="i">
            <view class="chart-info-item-title">{{ info.label }}</view>
            <view class="chart-info-item-num">{{ info.num }}</view>
            <view class="chart-info-item-base">基准分:{{ info.base }}</view>
          </view>
        </view>
        <view class="capsule-title">
          <view class="second--title" v-if="activeIndex !== 0"
          >{{ list[activeIndex].title }}
          </view>
          <CapsuleTab
              v-if="activeIndex !== 0 && activeIndex !== 6"
              :tabs="markTab"
              :default-active="markActive"
              @click="markClick"
          />
        </view>
        <RadarAndBar
            :options="radarData"
            :key="markActive"
            v-if="markActive === 0 && radarData"
        />
        <RadarAndBar
            :options="barData"
            :key="markActive"
            v-if="markActive === 1 && barData"
        />
      </view>
      <!-- 策略解析 -->
      <view class="kyc-card" v-if="list[activeIndex].title !== '风险明细'">
        <view class="capsule-title">
          <view class="second--title">策略解析</view>
          <CapsuleTab
              v-if="activeIndex === 0"
              :tabs="capsuleTab"
              :default-active="capsuleActive"
              @click="tacticsClick"
          />
        </view>
        <view class="capsule-describe">{{ describeText }}</view>
        <view class="capsule-target">
          企业规则命中结果：{{ targetNum }}条
        </view>
        <view class="capsule-card" v-if="riskData.length">
          <view
              class="capsule-card-item"
              v-for="(risk, riskIndex) in riskData"
              :key="riskIndex"
          >
            <view class="capsule-card-item-list">
              <view class="list-label">序号：</view>
              <view class="list-value">{{ riskIndex + 1 }}</view>
            </view>
            <view class="capsule-card-item-list">
              <view class="list-label">风险类型：</view>
              <view class="list-value">{{ risk.scoreGroup }}</view>
            </view>
            <view class="capsule-card-item-list">
              <view class="list-label">风险描述：</view>
              <view class="list-value">{{ risk.content }}</view>
            </view>
            <view class="capsule-card-item-list">
              <view class="list-label">风险等级：</view>
              <view class="list-value">{{ risk.level }}</view>
            </view>
          </view>
        </view>
      </view>
      <view v-if="list[activeIndex].title === '风险明细'">
        <DetailOfRisk :data="reportData.rdeModelDecisionCodeLevelClassVOAll"/>
      </view>
    </view>
  </view>
</template>

<script>
import Loading from "../../components/Loading";
import CapsuleTab from "../../components/CapsuleTab";
import RadarAndBar from "../../components/RadarAndBar";
import DetailOfRisk from "./components/DetailOfRisk.vue";
import { parsingReportFormat } from "../../api/kyc";
import { setChartData, setBarData, setNum } from "./index";

let headTab = [
  { title: "整体概要" },
  { title: "企业主体" },
  { title: "合规程度" },
  { title: "发展潜力" },
  { title: "经营情况" },
  { title: "经营环境" },
  { title: "企业司法纠纷" },
  { title: "风险明细" },
]
export default {
  components: { Loading, CapsuleTab, RadarAndBar, DetailOfRisk },
  data() {
    return {
      loading: true,
      activeIndex: 0,
      // 选项卡
      list: headTab,
      //等级
      gradeList: [
        { label: "最差", value: "E", color: "#D98E8C", activeColor: "#B21D19" },
        { label: "较差", value: "D", color: "#ED9D9D", activeColor: "#DC3C3C" },
        {
          label: "中等",
          value: "C",
          color: "#FB9A99",
          activeColor: "#F73634",
        },
        { label: "一般", value: "B", color: "#FCB39A", activeColor: "#F96835" },
        { label: "尚可", value: "BB", color: "#FBC69A", activeColor: "#F88D36" },
        {
          label: "较好",
          value: "BBB",
          color: "#FDD599",
          activeColor: "#FCAC34",
        },
        {
          label: "良好",
          value: "A",
          color: "#cdd87c",
          activeColor: "#AEC20F",
        },
        { label: "优质", value: "AA", color: "#C3E282", activeColor: "#87C506" },
        {
          label: "特优",
          value: "AA+",
          color: "#80E98A",
          activeColor: "#00D416",
        },
        {
          label: "最优",
          value: "AAA",
          color: "#83E28C",
          activeColor: "#08C51A",
        },
      ],
      gradeActive: "",
      gradeActiveObj: {}, //选中的等级---对应数据
      chartInfo: [
        { label: "企业主体", num: 0, base: 0 },
        { label: "经营环境", num: 0, base: 0 },
        { label: "经营情况", num: 0, base: 0 },
        { label: "发展潜力", num: 0, base: 0 },
        { label: "合规程度", num: 0, base: 0 },
      ],
      radarData: undefined, //图表数据----雷达图
      barData: undefined, //图表数据----柱状图
      //评分明细、评分详情
      markActive: 0,
      //评分选项
      markTab: [
        { label: "评分明细", value: 0 },
        { label: "评分详情", value: 1 },
      ],
      describeText: "", //策略解析描述
      targetNum: 0, //命中条数
      //策略解析选项卡，默认选中大型企业
      capsuleActive: "largeEnterprises",
      capsuleTab: [
        { label: "大型企业", value: "largeEnterprises" },
        { label: "中小企业", value: "smallMediumSizedEnterprises" },
      ],
      riskData: [],
      reportData: {},
    };
  },
  mounted() {
    let that = this;
    this.loading = true;
    parsingReportFormat({
      ckey: this.$route.query.ckey,
      createTime: this.$route.query.createTime,
    })
        .then((res) => {
          this.reportData = res;
          if (res.rdeModelDecisionCodeLevelClassVOAll) {
            this.list = headTab.slice(0, headTab.length)
          } else {
            this.list = headTab.slice(0, headTab.length - 1)
          }
          if (res.companyRuleNewVO) {
            this.setChartInfo(res.companyRuleNewVO);
            this.setGradeActive(res.companyRuleNewVO.grade);
            that.setRadarData();

            this.setDescribeText();
          }
          this.loading = false;
        })
        .catch(() => (this.loading = false));
  },
  methods: {
    //选项卡切换
    tabChange(e) {
      if (this.list[e].title == "风险明细") return;
      let that = this;
      this.capsuleActive = "largeEnterprises";
      if (e === 0 || e === 6) {
        this.markActive = 0;
      }
      this.setRadarData();
      this.setDescribeText();
    },
    //设置gradeActive的数据
    setGradeActive(val) {
      this.gradeActive = val;
      let arr = this.gradeList.filter((item) => {
        return item.value === this.gradeActive;
      });
      this.gradeActiveObj = arr.length ? arr[0] : {};
    },
    //设置chartInfo的数据
    setChartInfo(data) {
      let {
        ztScore,
        qyztzf,
        jyhjScore,
        jyhjzf,
        jyqkScore,
        jyqkzf,
        fzqlScore,
        fzqlzf,
        hgScore,
        hgcdzf,
      } = data;
      this.chartInfo[0].num = ztScore;
      this.chartInfo[0].base = qyztzf;
      this.chartInfo[1].num = jyhjScore;
      this.chartInfo[1].base = jyhjzf;
      this.chartInfo[2].num = jyqkScore;
      this.chartInfo[2].base = jyqkzf;
      this.chartInfo[3].num = fzqlScore;
      this.chartInfo[3].base = fzqlzf;
      this.chartInfo[4].num = hgScore;
      this.chartInfo[4].base = hgcdzf;
    },
    /*
     * 评分明细、评分详情点击切换
     * */
    markClick(e) {
      this.markActive = e;
      this.setRadarData();
    },
    //设置策略解析描述、命中条数、命中的卡片数据展示
    setDescribeText() {
      let {
        companyRuleNewVO,
        codeEntity,
        rdeModelDecisionCodeLevelClassVO,
        codeLevelListVO,
      } = this.reportData;
      if (this.activeIndex === 0) {
        this.describeText = companyRuleNewVO[this.capsuleActive];
        this.targetNum = companyRuleNewVO.ruleCount;
        this.riskData = codeLevelListVO;
      } else if (this.activeIndex === 1) {
        this.describeText = codeEntity.dimensionOne;
        this.targetNum = rdeModelDecisionCodeLevelClassVO.qyztCount;
        this.riskData = rdeModelDecisionCodeLevelClassVO.codeLevelListqyzt;
      } else if (this.activeIndex === 2) {
        this.describeText = codeEntity.dimensionTwo;
        this.targetNum = rdeModelDecisionCodeLevelClassVO.hgcdCount;
        this.riskData = rdeModelDecisionCodeLevelClassVO.codeLevelListhgcd;
      } else if (this.activeIndex === 3) {
        this.describeText = codeEntity.dimensionThree;
        this.targetNum = rdeModelDecisionCodeLevelClassVO.fzqlCount;
        this.riskData = rdeModelDecisionCodeLevelClassVO.codeLevelListfzql;
      } else if (this.activeIndex === 4) {
        this.describeText = codeEntity.dimensionFive;
        this.targetNum = rdeModelDecisionCodeLevelClassVO.jyqkCount;
        this.riskData = rdeModelDecisionCodeLevelClassVO.codeLevelListjyqk;
      } else if (this.activeIndex === 5) {
        this.describeText = codeEntity.dimensionFour;
        this.targetNum = rdeModelDecisionCodeLevelClassVO.jyhjCount;
        this.riskData = rdeModelDecisionCodeLevelClassVO.codeLevelListjymx;
      } else if (this.activeIndex === 6) {
        this.describeText = codeEntity.thematicAnalysis;
        this.targetNum =
            rdeModelDecisionCodeLevelClassVO.codeLevelListztfx.length;
        this.riskData = rdeModelDecisionCodeLevelClassVO.codeLevelListztfx;
      }
    },
    //策略解析tab切换
    tacticsClick(e) {
      this.capsuleActive = e;
      this.setDescribeText();
    },
    //处理图表的展示数据
    setRadarData() {
      let {
        companyMainVO,
        complianceDegreeVO,
        developmentPotentialVO,
        opeSituationVO,
        opeEnvironmentVO,
      } = this.reportData.reportDTO;
      let {
        qyztScorePro,
        jyhjScorePro,
        jyqkScorePro,
        fzqlScorePro,
        hgcdScorePro,
      } = this.reportData.companyRuleNewVO;
      let { companyRuleNewVO } = this.reportData;
      let chartValue, chartName, title, xBar, yBarData;
      if (this.activeIndex === 0) {
        //整体概要
        title = "整体概要";
        chartValue = setNum([
          qyztScorePro,
          jyhjScorePro,
          jyqkScorePro,
          fzqlScorePro,
          hgcdScorePro,
        ]);
        chartName = [
          "企业主体",
          "经营环境",
          "经营情况",
          "发展潜力",
          "合规程度",
        ];
      } else if (this.activeIndex === 1) {
        // 企业主体
        title = "企业主体";
        chartValue = setNum([
          companyMainVO.jyqkL,
          companyMainVO.yszpL,
          companyMainVO.qylxL,
          companyMainVO.gdslL,
        ]);
        chartName = ["企业主体", "疑似诈骗", "企业类型", "股东实力"];
        xBar = [
          "注册地区准入",
          "所在行业准入",
          "经营诈骗",
          "空壳公司",
          "区域诈骗",
          "企业类型准入",
          "优质股东背景准入",
          "注册资本准入",
          "自然人股东占股准入",
          "法人占股准入",
          "经营状态",
          "经营年限准入",
        ];
        yBarData = [
          companyMainVO.zcdqzr,
          companyMainVO.szhyzr,
          companyMainVO.jyzp,
          companyMainVO.kkgs,
          companyMainVO.qyzp,
          companyMainVO.qylxzr,
          companyMainVO.yzgdzr,
          companyMainVO.zczbzr,
          companyMainVO.zrrgdzgzr,
          companyMainVO.frzgzr,
          companyMainVO.jyzt,
          companyMainVO.jynxzr,
        ];
      } else if (this.activeIndex === 2) {
        // 合规程度
        title = "合规程度";
        chartValue = setNum([
          complianceDegreeVO.jyycL,
          complianceDegreeVO.xzhbcfL,
          complianceDegreeVO.sfsszxL,
          complianceDegreeVO.jrswsxL,
        ]);
        chartName = [
          "经营异常",
          "行政、\n环保处罚",
          "司法诉讼及执行",
          "金融、\n税务失信",
        ];
        xBar = [
          "经营异常",
          "环保处罚",
          "行政处罚",
          "司法诉讼",
          "被执行",
          "金融失信",
          "税务失信",
        ];
        yBarData = [
          complianceDegreeVO.jyyc,
          complianceDegreeVO.hbcf,
          complianceDegreeVO.xzcf,
          complianceDegreeVO.sfss,
          complianceDegreeVO.bzx,
          complianceDegreeVO.jrsx,
          complianceDegreeVO.swsx,
        ];
      } else if (this.activeIndex === 3) {
        // 发展潜力
        title = "发展潜力";
        chartValue = setNum([
          developmentPotentialVO.cbryL,
          developmentPotentialVO.dwtzL,
          developmentPotentialVO.glspL,
          developmentPotentialVO.rzlcL,
          developmentPotentialVO.scjzlL,
        ]);
        chartName = [
          "参保人员",
          "对外投资",
          "管理水平",
          "融资历程",
          "市场竞争力",
        ];
        xBar = [
          "参保人员规模准入",
          "对外投资（撤出投资）",
          "对外投资风险（投资非主业）",
          "对外投资风险（投资主业）",
          "管理水平风险",
          "企业融资历程（加分项）",
          "市场竞争力与产品优势",
        ];
        yBarData = [
          developmentPotentialVO.cbrygmzr,
          developmentPotentialVO.cctz,
          developmentPotentialVO.tzfzy,
          developmentPotentialVO.tzzy,
          developmentPotentialVO.glspfx,
          developmentPotentialVO.qyrzlcjf,
          developmentPotentialVO.scjzlcpys,
        ];
      } else if (this.activeIndex === 4) {
        // 经营情况
        title = "经营情况";
        chartValue = setNum([
          opeSituationVO.jyfzL,
          opeSituationVO.glcwdxL,
          opeSituationVO.gqwdxL,
          opeSituationVO.jywdxL,
        ]);

        chartName = [
          "经营发展",
          "管理层\n稳定性",
          "股权稳定性",
          "经营\n稳定性",
        ];
        xBar = [
          "工商变更-市场主体或企业类型变更",
          "工商变更-投资人变更（新增机构投资）",
          "法人变更日期准入",
          "工商变更-高管变更",
          "工商变更-公司章程变更次数",
          "工商变更-投资人变更（机构退出）",
          "工商变更-投资人变更（机构退出）",
          "自然人股东人数分散度",
          "工商变更-注册资本变更",
          "实缴比例",
          "工商变更-公司名称变更",
          "工商变更-企业经营范围变更",
          "工商变更-住所变更",
        ];
        yBarData = [
          opeSituationVO.scztqylxbg,
          opeSituationVO.xzjgtz,
          opeSituationVO.frbgrqzr,
          opeSituationVO.ggbg,
          opeSituationVO.gszcbgcs,
          opeSituationVO.jgtc,
          opeSituationVO.qyzcdyczqk,
          opeSituationVO.zrrgdrsfsd,
          opeSituationVO.zczbbg,
          opeSituationVO.sjbl,
          opeSituationVO.gsmcbg,
          opeSituationVO.qyjyfwbg,
          opeSituationVO.zsbg,
        ];
      } else if (this.activeIndex === 5) {
        // 经营环境
        title = "经营环境";
        chartValue = setNum([
          opeEnvironmentVO.qyfxL,
          opeEnvironmentVO.hyjqfxL,
          opeEnvironmentVO.hylrfxL,
          opeEnvironmentVO.jywdxL,
        ]);
        chartName = ["区域风险", "行业景气\n风险", "行业利润\n风险"];
        xBar = ["区域风险", "行业景气风险", "行业利润风险"];
        yBarData = [
          opeEnvironmentVO.qyfx,
          opeEnvironmentVO.hyjqfx,
          opeEnvironmentVO.hylrfx,
        ];
      } else if (this.activeIndex === 6) {
        // 企业司法纠纷
        title = ["三年前", "近1-3年", "近1年"];
        let num1 = setNum([
          companyRuleNewVO.sifasanPro,
          companyRuleNewVO.sifasanFPro,
          companyRuleNewVO.sifasanQPro,
          companyRuleNewVO.sifasanLPro,
        ]);
        let num2 = setNum([
          companyRuleNewVO.sifaerPro,
          companyRuleNewVO.sifaerFPro,
          companyRuleNewVO.sifaerQPro,
          companyRuleNewVO.sifaerLPro,
        ]);
        let num3 = setNum([
          companyRuleNewVO.sifaYiPro,
          companyRuleNewVO.sifaYiFPro,
          companyRuleNewVO.sifaYiQPro,
          companyRuleNewVO.sifaYiLPro,
        ]);
        chartValue = [num1, num2, num3];
        chartName = [
          "被金融机构诉讼占比",
          "被非金融\n机构诉讼\n占比",
          "起诉他人占比",
          "涉及的立\n案信息占\n比",
        ];
      }
      if (this.markActive === 1) {
        //  评分详情
        this.radarData = undefined;
        this.barData = setBarData(xBar, yBarData, title);
      } else {
        //评分明细
        this.barData = undefined;
        if (this.activeIndex === 6) {
          this.radarData = setChartData(chartValue, chartName, title, true);
        } else {
          this.radarData = setChartData(chartValue, chartName, title);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.uni-app--maxwidth {
  height: 100vh;
}

uni-page-body {
  padding-bottom: 20rpx;
  overflow-y: auto;
}

::v-deep .tm-tabs {
  height: 88rpx;
  box-shadow: none;
  background: #fff !important;
  position: fixed !important;
  top: 0;
  z-index: 9999;

  &-con {
    .tm-tabs-wk {
      position: fixed !important;
      background: #fff;
      z-index: 10;
      overflow-x: auto;
    }

    &-item-text {
      font-size: 28rpx !important;
      color: rgba(0, 0, 0, 0.6);
    }

    &-item-border {
      display: none;
    }
  }

  .text-primary {
    font-size: 30rpx !important;
    font-weight: 500;
    color: #3662ec;
    position: relative;

    &::after {
      content: "";
      display: block;
      position: absolute;
      bottom: 14rpx;
      left: 50%;
      margin-left: -30rpx;
      width: 60rpx;
      height: 4rpx;
      background: #3662ec;
      border-radius: 118rpx;
      animation: moveBox 0.2s;
    }
  }
}

.kyc {
  background: #f9f9f9;
  padding-top: 88rpx;

  &-card {
    padding: 20rpx;
    margin: 30rpx 30rpx 0;
    border-radius: 15rpx;
    background: #ffffff;
    //整体概要
    .score-rating {
      display: flex;
      justify-content: space-between;
      margin-top: 20rpx;
      color: rgba(0, 0, 0, 0.85);

      .total-score,
      .credit-rating {
        flex: 1;
        padding: 16rpx 20rpx 20rpx;
        border-radius: 6rpx;
        background: rgba(0, 0, 0, 0.02);
      }

      .credit-rating {
        margin-left: 20rpx;
      }

      &-title {
        display: flex;
        align-items: center;
        font-size: 28rpx;
        line-height: 40rpx;
        margin-bottom: 14rpx;

        image {
          width: 30rpx;
          height: 30rpx;
          margin-right: 14rpx;
        }

        .rating-icon {
          height: 34rpx;
        }
      }

      &-num {
        font-size: 26rpx;
        line-height: 42rpx;

        text {
          font-size: 36rpx;
          color: #3662ec;
        }
      }

      &-grade {
        font-size: 36rpx;
        line-height: 42rpx;
      }

      &-date {
        font-size: 22rpx;
        line-height: 26rpx;
        color: rgba(0, 0, 0, 0.3);
        margin-top: 20rpx;
      }
    }

    .grade-rules {
      display: flex;
      align-items: flex-end;
      color: #ffffff;
      font-size: 20rpx;
      margin-top: 20rpx;
      padding-bottom: 26rpx;

      &-item {
        position: relative;
        flex: 1;
        padding: 6rpx 0 9rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;

        &-active {
          height: 102rpx;
        }

        .arrow-active {
          position: absolute;
          bottom: -26rpx;
          width: 0;
          height: 0;
          border: 16rpx solid transparent;
          border-left-width: 10rpx;
          border-right-width: 10rpx;
        }
      }
    }

    //图表
    .chart-info {
      display: flex;

      &-item {
        position: relative;
        flex: 1;
        text-align: center;
        //border: 1px solid #000;
        &::after {
          position: absolute;
          top: 30rpx;
          right: 0;
          content: "";
          display: inline-block;
          width: 1rpx;
          height: 60rpx;
          background: rgba(0, 0, 0, 0.08);
        }

        &:last-child {
          &::after {
            display: none;
          }
        }

        &-title {
          font-size: 26rpx;
          color: rgba(0, 0, 0, 0.6);
          line-height: 30rpx;
        }

        &-num {
          font-size: 40rpx;
          color: #3662ec;
          line-height: 47rpx;
          margin-top: 14rpx;
          margin-bottom: 4rpx;
        }

        &-base {
          font-size: 22rpx;
          color: rgba(0, 0, 0, 0.4);
          line-height: 26rpx;
        }
      }
    }

    //策略解析
    .capsule-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .capsule-describe {
      font-size: 26rpx;
      line-height: 40rpx;
      color: rgba(0, 0, 0, 0.85);
      margin: 30rpx 0;
    }

    .capsule-target {
      font-size: 26rpx;
      color: #2b8df1;
      line-height: 30rpx;
    }

    .capsule-card {
      &-item {
        padding: 20rpx;
        border-radius: 6rpx;
        background: rgba(0, 0, 0, 0.02);
        margin-top: 20rpx;

        &-list {
          font-size: 26rpx;
          line-height: 30rpx;
          color: rgba(0, 0, 0, 0.6);
          display: flex;
          margin-top: 20rpx;

          &:first-child {
            margin-top: 0;
          }

          .list-label {
            width: 130rpx;
            text-align: right;
          }

          .list-value {
            flex: 1;
            color: rgba(0, 0, 0, 0.85);
          }
        }
      }
    }
  }
}

@keyframes moveBox {
  0% {
    left: 50%;
    margin-left: -60rpx;
    opacity: 0;
  }

  100% {
    left: 50%;
    margin-left: -30rpx;
    opacity: 1;
  }
}
</style>
