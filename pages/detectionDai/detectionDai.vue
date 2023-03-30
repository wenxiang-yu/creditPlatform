<!-- 监测日报页面 -->
<template>
  <view>
    <!-- <Nav :tabName="{ title: '监测日报', flag: false }" /> -->
    <view class="prompt">
      监控企业<text>{{ companyNum }}</text
      >家共<text>{{ timeData.total }}</text
      >封
      <!-- ，其中<text style="color: red;">0</text>封未读 -->
    </view>
    <!-- 日报 -->
    <view class="todayDai" v-for="(item, index) in HitDateList" :key="index">
      <view class="td_title">
        <view>{{ item.createTime | delTimer }}</view>
        <view
          >有<text>{{ item.firNumber }}</text
          >家公司发生了动态</view
        >
      </view>
      <!-- 风险等级模块 -->
      <view class="risk">
        <view class="card" v-for="(val, ind) in riskList" :key="ind">
          <view
            class="title"
            :style="{
              color:
                val.level == '高风险'
                  ? '#FA5151'
                  : val.level == '中风险'
                  ? '#FF8F1F'
                  : val.level == '低风险'
                  ? '#3662EC'
                  : val.level == '利好消息'
                  ? '#00B578'
                  : '',
            }"
          >
            {{ item[val.prop] }}
          </view>
          <view class="level">
            {{ val.level }}
          </view>
        </view>
      </view>
      <!-- 公司列表模块 -->
      <view
        class="corporationList"
        @click="
          toDailyDetails(
            item.createTime,
            item.firNumber,
            item.highHit,
            item.middleHit,
            item.lowHit,
            item.goodHit
          )
        "
      >
        <view
          class="C_list"
          v-for="(par, num) in seeAll === index && item.hitCompaniesList
            ? item.hitCompaniesList
            : deepClone(item.hitCompaniesList)"
          :key="num"
        >
          <view class="left">
            <view
              style="
                width: 88rpx;
                height: 88rpx;
                background-color: #2888e8;
                border-radius: 6rpx;
                color: #ffffff;
                margin: 0 10rpx;
                text-align: center;
                font-size: 32rpx;
                display: flex;
                align-items: center;
              "
            >
              {{ par.cname.slice(0, 4) }}
            </view>
          </view>
          <view class="right">
            <view class="title">
              {{ par.cname }}
            </view>
            <view class="right_content">
              <view
                v-for="(ele, xml) in par.tacticHitList"
                :key="xml"
                :class="{
                  heightRisk: ele.riskLevel === 1,
                  middleRisk: ele.riskLevel === 2,
                  lowerRisk: ele.riskLevel === 4,
                  goodRisk: ele.riskLevel === 16,
                }"
              >
                {{ ele.matchRule }}({{ ele.levelAmount }})
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="seeAll" @click="toSeeAll(index)" v-show="seeAll !== index">
        查看全部
      </view>
    </view>
    <tm-loadding :load="loading" v-show="loading"></tm-loadding>
  </view>
</template>

<script>
import { getMtgCCount, getUserDateInfo, getCRInfo } from "@/api/monitorDai.js";
import {formatDate} from '@/utils/tool.js'
import Nav from "../../components/Nav.vue";
export default {
  name: "DAILY",
  components: {
    Nav,
  },
  data() {
    return {
      loading: false,
      companyNum: 0, //企业数量
      HitDateList: [], //事件列表
      companyList: [], //企业列表
      timeData: {
        //时间列表
        pageNum: 1,
        pageSize: 5,
        total: 0,
      },
      companyData: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      seeAll: null, // 点击查看全部
      riskList: [
        {
          prop: "highHit",
          level: "高风险",
        },
        {
          prop: "middleHit",
          level: "中风险",
        },
        {
          prop: "lowHit",
          level: "低风险",
        },
        {
          prop: "goodHit",
          level: "利好消息",
        },
      ],
    };
  },
  mounted() {
	  this.$nextTick(()=>{
		 this.toGetMtgCCount();
		 this.toGetUserDateInfo(); 
	  })
  },
  filters: {
    // 处理时间格式化
    delTimer: function (val) {
		return 	formatDate(val)
      // let data = new Date();
      // let y = data.getFullYear();
      // let m = data.getMonth() + 1;
      // let d = data.getDate();
      // let hours = data.getHours();
      // let minutes = data.getMinutes();
      // let secounds = data.getSeconds();
      // return  `${y}-${m}-${d}`;
    },
  },
  methods: {
    // 获取监控企业数量
    async toGetMtgCCount() {
      const { data: res } = await getMtgCCount();
      this.companyNum = res.selectCount;
    },
    // 查询当前用户命中的企业数量和风险数量命中日期
    async toGetUserDateInfo() {
      try {
        uni.showLoading({
          title: "数据加载中...",
        });
        const { data: res } = await getUserDateInfo({
          pageNum: this.timeData.pageNum,
          pageSize: this.timeData.pageSize,
        });
        this.HitDateList.push(...res.list);
        this.timeData.total = res.total;
        this.HitDateList.forEach((val, index) => {
          this.toGetCRInfo(val.createTime, index);
        });
        uni.hideLoading();
      } catch (e) {
        //TODO handle the exception
        uni.hideLoading();
      }
    },
    // 根据日期查询当前用户命中的企业信息和风险信息
    async toGetCRInfo(hitTime, index) {
      try {
        const { data: res } = await getCRInfo({
          pageNum: this.companyData.pageNum,
          pageSize: this.companyData.pageSize,
          hitTime,
        });
        this.companyData.total = res.total;
        this.HitDateList.forEach((val, ind) => {
          this.companyList.push([]);
          if (ind === index) {
            this.companyList[index].push(...res.list);
            this.$set(val, "hitCompaniesList", this.companyList[index]);
          }
        });
        uni.hideLoading();
      } catch (e) {
        //TODO handle the exception
        uni.hideLoading();
      }
    },
    //跳转到日报详情页面
    toDailyDetails(hitTime, firNumber, highHit, middleHit, lowHit, goodHit) {
      let deliverData = JSON.stringify({
        hitTime,
        firNumber,
        highHit,
        middleHit,
        lowHit,
        goodHit,
      });

      uni.navigateTo({
        url: `/pages/dailyDetails/dailyDetails?deliver=${deliverData}`,
      });
    },
    // 点击查看全部
    toSeeAll(index) {
      this.seeAll = index;
    },
    deepClone(obj) {
      //可传入对象 或 数组
      if (obj) {
        const a = JSON.parse(JSON.stringify(obj)).splice(0, 3);
        return a;
      }
    },
  },
  // 上拉触底
  onReachBottom() {
    let allTotal = this.timeData.pageNum * this.timeData.pageSize;
    let allTotal2 = this.companyData.pageNum * this.companyData.pageSize;
    if (allTotal < this.timeData.total) {
      this.loading = true;
      //当前条数小于总条数 则增加请求页数
      this.timeData.pageNum++;
      this.toGetUserDateInfo(); //调用加载数据方法
    } else {
      this.loading = false;
      console.log("已加载全部时间数据");
    }
    if (allTotal2 < this.companyData.total) {
      this.companyData.pageNum++;
      this.toGetUserDateInfo(); //调用加载数据方法
    } else {
      console.log("已加载全部公司");
    }
  },
};
</script>

<style scoped lang="scss">
.heightRisk {
  background-color: #fff8f8;
  color: #fa5151;
}
.middleRisk {
  background-color: #fffbf6;
  color: #ff8f1f;
}
.lowerRisk {
  background-color: #f7f9fe;
  color: #3662ec;
}
.goodRisk {
  background-color: #f0f7f5;
  color: #00b578;
}
// 图片大小
.imgStyle {
  width: 88rpx;
  height: 88rpx;
  border-radius: 6rpx 6rpx 6rpx 6rpx;
}
.prompt {
  font-size: 24rpx;
  font-family: PingFangSC-Regular, sans-serif;
  font-weight: normal;
  color: rgba(0, 0, 0, 0.5);
  height: 74rpx;
  line-height: 74rpx;
  padding-left: 30rpx;
}
.todayDai {
  border-bottom: 30rpx solid #f5f5f5;
  padding: 30rpx;
  background-color: #fff;
  .td_title {
    display: flex;
    justify-content: space-between;
    font-size: 24rpx;
    font-family: PingFangSC-Regular, sans-serif;
    font-weight: normal;
    margin-bottom: 20rpx;
    color: rgba(0, 0, 0, 0.5);
    &:first-child {
      font-size: 30rpx;
      font-family: PingFangSC-Medium, sans-serif;
      font-weight: normal;
      color: rgba(0, 0, 0, 0.85);
    }
  }
  .risk {
    font-size: 24rpx;
    display: flex;
    height: 115rpx;
    .card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      background-color: #fafafa;
      margin-right: 20rpx;
      &:last-child {
        margin-right: 0;
      }
      .title {
        font-size: 26rpx;
        margin-bottom: 5rpx;
      }
    }
  }
  // 日报列表
  .corporationList {
    .C_list {
      display: flex;
      padding: 30rpx 0;
      border-bottom: 1rpx solid rgba(0, 0, 0, 0.08);
      &:last-child {
        border-bottom: 0;
      }
      .left {
        margin-right: 20rpx;
      }
      .right {
        width: 100%;
        .title {
          font-size: 28rpx;
          font-weight: normal;
          color: #262626;
          line-height: 36rpx;
        }
        .right_content {
          margin-top: 16rpx;
          padding: 16rpx 0 16rpx 16rpx;
          font-size: 20rpx;
          line-height: 38rpx;
        }
      }
    }
  }
  .seeAll {
    display: flex;
    height: 100rpx;
    justify-content: center;
    font-size: 24rpx;
    font-family: PingFangSC-Regular, sans-serif;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.3);
    line-height: 100rpx;
  }
}
</style>
