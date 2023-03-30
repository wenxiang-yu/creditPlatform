<template>
  <view class="Header">
    <!-- 固定导航 -->
    <view class="nav" v-if="!tabName.flag">
		<text v-for="(item,index) in ['仪表盘','风险动态','监测日报']" :key="index" @click="toIndex(index)" :style="{color:dashboardActive === index ? '#3662EC':'',fontSize:dashboardActive === index ? '34rpx':''}">{{item}}</text>
    </view>
    <!-- tab栏列-->
    <view
      class="tabs"
      v-if="tabName.title !== '空白' && tabName.title !== '日报详情'"
    >
      <!-- 搜索栏 -->
      <view class="search" v-if="tabName.title === '搜索' && !showRight">
        <image
          src="../static/search2.png"
          style="width: 37rpx; height: 37rpx"
        ></image>
        <tm-input
          clear
          :padding="[0, 0]"
          confirm-type="search"
          @confirm="searchList"
          v-model="dynamicRiskData.cname"
          @clear="
            () => {
              searchList();
            }
          "
          style="width: 92%; background-color: transparent !important"
        ></tm-input>
      </view>
      <!-- 文字栏 -->
      <view
        class="left"
        v-if="tabName.title !== '搜索' && tabName.title !== '监测日报'"
      >
        <text v-for="(item,index) in tabName.title" style="margin-right:30rpx" :class="{active:mianTabsActive === index}" @click="mianTabsActive = index">{{ item }}</text>  
      </view>
      <view class="right">
        <image
          src="../static/poop.png"
          v-if="tabName.title !== '监测日报' && showRight == false"
          @click="
            () => {
              if (!showLeft) {
                showRight = true;
                position = 'right';
              }
            }
          "
        ></image>
        <image
          src="../static/x.png"
          style="width: 44rpx; height: 44rpx"
          v-if="
            tabName.title !== '监测日报' &&
            position !== 'left' &&
            showRight == true
          "
          @click="
            () => {
              if (!showLeft) {
                showRight = false;
                position = 'right';
              }
            }
          "
        ></image>
      </view>
      <!-- 监测日报栏 -->
      <view class="monitorDai" v-if="tabName.title === '监测日报'">
        <tm-tabs v-model="activeIndex" :list="tabList"></tm-tabs>
      </view>
    </view>
    <!-- 日报详情的头部 -->
    <view class="dailyDetails" v-if="tabName.title === '日报详情'">
      <view class="dynamic">
        <view class="left"> 今天日报 </view>
        <view class="right">
          有<text style="color: #3662ec">{{ deliver.firNumber || 0 }}</text
          >家公司
          <!-- ，共发生了<text style="color: #ff8f1f">{{
            deliver.firNumber || 0
          }}</text
          >条动态 -->
        </view>
      </view>
      <view class="riskLevel">
        <view>
          <text>高风险</text>
          <text style="color:#FA5151;margin-left:5rpx">{{ deliver.highHit || 0 }}</text>
        </view>
        <view>
          <text>中风险</text>
          <text style="color:#FF8F1F;margin-left:5rpx">{{ deliver.middleHit || 0 }}</text>
        </view>
        <view>
          <text>低风险</text>
          <text style="color:#3662EC;margin-left:5rpx">{{ deliver.lowHit || 0 }}</text>
        </view>
        <view>
          <text>利好风险</text>
          <text style="color:#00B578;margin-left:5rpx">{{ deliver.goodHit || 0 }}</text>
        </view>
      </view>
    </view>
    <!-- 出现弹框 -->
    <!-- 右侧的弹框 -->
    <tm-poup
      v-model="showRight"
      :position="position"
      width="100vw"
      :over-close="false"
      v-show="showRight"
    >
      <view class="select_tooltip" v-show="position === 'right'">
        <tm-form>
          <!-- 风险动态弹框---------------------------------------------------------------------------------------------------------------------------------- -->
          <view v-if="tabName.title === '搜索'">
            <view class="options">
              <view class="topic"> 预警时间 </view>
              <view class="blocks">
                <view
                  v-for="(item, index) in [
                    '全部',
                    '昨天',
                    '最近7天',
                    '最近30天',
                  ]"
                  :key="index"
                  style="margin-right: 30rpx"
                  @click="selectTime(index, item)"
                  :class="{ activeColor: warnActive === index }"
                >
                  {{ item }}
                </view>
              </view>
            </view>
            <view class="options">
              <view class="topic"> 风险等级 </view>
              <view class="blocks">
                <view
                  v-for="(item, index) in [
                    '全部',
                    '高风险',
                    '中风险',
                    '低风险',
                  ]"
                  :key="index"
                  style="margin-right: 30rpx"
                  @click="riskLevel(index)"
                  :class="{ activeColor: riskActive === index }"
                >
                  {{ item }}
                </view>
              </view>
            </view>
            <tm-pickers
              rang-key="modelName"
              children-key="tacticTypeVOList"
              :list="rankList"
              @confirm="confirmTacticOption"
            >
              <view class="options">
                <view class="topic"> 风险维度 </view>
                <button>
                  <text>{{
                    dimensionList.length === 2
                      ? `${dimensionList[0].modelName}/${dimensionList[1].modelName}`
                      : "请选择"
                  }}</text>
                  <image
                    src="../static/arrowDowm.png"
                    style="width: 36rpx; height: 36rpx"
                  ></image>
                </button>
              </view>
            </tm-pickers>
            <tm-pickers
              rang-key="modelName"
              :list="groupsList"
              @confirm="confirmGroupOption"
            >
              <view class="options">
                <view class="topic"> 监控分组 </view>
                <button>
                  <text>{{
                    dynamicRiskData.groupInfo
                      ? dynamicRiskData.groupInfo 
                      : "请选择"
                  }}</text>
                  <image
                    src="../static/arrowDowm.png"
                    style="width: 36rpx; height: 36rpx"
                  ></image>
                </button>
              </view>
            </tm-pickers>
            <view class="options">
              <view class="topic"> 行业业态品类 </view>
              <view class="blocks2">
                <tm-pickers :list="industryList" @confirm="confirmIndustry">
                  <view >{{
                    dynamicRiskData.industryNew
                      ? dynamicRiskData.industryNew
                      : "行业"
                  }}</view>
                </tm-pickers>
                —
                <tm-pickers :list="categoryList" @confirm="confirmFormat">
                  <view>{{
                    dynamicRiskData.category ? dynamicRiskData.category : "业态"
                  }}</view>
                </tm-pickers>
                —
                <tm-pickers :list="formatsList" @confirm="confirmCategory">
                  <view>{{
                    dynamicRiskData.format ? dynamicRiskData.format : "品类"
                  }}</view>
                </tm-pickers>
              </view>
            </view>
          </view>
          <!-- ------------------------------------------------------------------------------------------------------------------------- -->
          <!-- 智能监测仪表弹框 -------------------------------------------------------------------------------------------------------------->
          <view v-else>
            <tm-pickers
              rang-key="检测范围"
              @confirm="
                (data) => {	
                  confirmSwitch(data, 'public');
                }
              "
              :list="['公有池', '私有池']"
              :default-value="[publics.data]"
            >
              <view class="options">
                <view class="topic"> 检测范围 </view>
                <button>
                  <text>{{ publics.data }}</text>
                  <image
                    src="../static/arrowDowm.png"
                    style="width: 36rpx; height: 36rpx"
                  ></image>
                </button>
              </view>
            </tm-pickers>
            <tm-pickers
              rang-key="title"
              :list="dashboardOptions.timeScope"
              :default-value="[dashboardFormData.weekName]"
              @confirm="
                (data) => {
                  confirmSwitch(data, 'weekName');
                }
              "
            >
              <view class="options">
                <view class="topic"> 时间 </view>
                <button>
                  <text>{{ dashboardFormData.weekName }}</text>
                  <image
                    src="../static/arrowDowm.png"
                    style="width: 36rpx; height: 36rpx"
                  ></image>
                </button>
              </view>
            </tm-pickers>
            <view class="pickersbox">
              <view class="topic"> 行业业态品类 </view>
              <view>
                <tm-pickers
                  rang-key="title"
                @confirm="
                    (data) => {
                      change(data, 1);
                    }
                  "
                  :list="dashboardOptions.industryNewOptions"
                  :default-value="industrySelected"
                >
                  <view class="options">
                    <view class="blocks">
                      <view>{{ dashboardFormData.industryNew }}</view>
                    </view>
                  </view>
                </tm-pickers>
                <tm-pickers
                  rang-key="title"
                  @confirm="
                    (data) => {
                      change(data, 2);
                    }
                  "
                  :list="dashboardOptions.categoryOptions"
                  :default-value="categorySelected"
                >
                  <view class="options">
                    <view class="blocks">
                      <view>{{ dashboardFormData.category }}</view>
                    </view>
                  </view>
                </tm-pickers>
                <tm-pickers
                  rang-key="title"
                  @confirm="
                    (data) => {
                      change(data, 3);
                    }
                  "
                  :list="dashboardOptions.formatOptions"
                  :default-value="formatSelected"
                >
                  <view class="options">
                    <view class="blocks">
                      <view>{{ dashboardFormData.format }}</view>
                    </view>
                  </view>
                </tm-pickers>
              </view>
            </view>
            <tm-pickersCity
              rang-key="title"
              :default-value="citySelected"
              @confirm="
                (data) => {
                  confirmSwitch(data, 'city');
                }
              "
              v-if="tabName.title !== '预警企业风险增长排行'"
            >
              <view class="options">
                <view class="topic"> 省市区 </view>
                <view class="blocks">
                  <view>
                    {{
                      !dashboardFormData.province &&
                      !dashboardFormData.city &&
                      !dashboardFormData.district
                        ? "+添加地区"
                        : ""
                    }}
                    <text>{{ dashboardFormData.province }}</text>
                    <text>{{ dashboardFormData.city }}</text>
                    <text>{{ dashboardFormData.district }}</text>
                  </view>
                </view>
              </view>
            </tm-pickersCity>
          </view>
          <!-- --------------------------------------------------------------------------------------------------------------------- -->
        </tm-form>
        <!-- 按钮组区域 -->
       <view class="btn_wrap">
          <view @click="reset"> 重置 </view>
          <view @click="screen"> 确定 </view>
        </view>
      </view>
    </tm-poup>
        </view>
      </tm-poup>
    </view>
  </view>
</template>

<script>
import { mapMutations ,mapState} from "vuex";
import { formatQuickTime } from "@/utils/tool.js"; //处理时间转换
import {
  risksMenu,
  monitoringGroup,
  getIndustyList,
} from "@/api/dynamicRisk.js";
import store from "../store";
export default {
  name: "Navs",
  props: {
    tabName: {
      type: Object,
      required: true,
    },
    deliver: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showLeft: false,
      showRight: false,
      position: "right",
      active: null,
      activeIndex: 0, //这是监测日报tab栏
      warnActive: 0, //预警切换按钮
      riskActive: 0, //风险等级切换
	  mianTabsActive:0,
	  dashboardActive:0,
      dynamicRiskData: {
        //风险动态弹框
        startTime: null, //开始时间
        endTime: null, //结束时间
        riskLevel: null, //风险等级
        modelNo: null, //风险维度一级
        typeNo: null, //风险维度二级
        groupInfo: null, //监控分组
        industryNew: null, //行业
        category: null, //业态
        format: null, //品类
        cname: "", //公司名称
        pageNum: 1,
      },
	  mainTabsList:[
		{
			title:"仪表盘"
		},
		{
			title:"风险动态"
		},{
			title:"监测日报"
		}
	  ],
      topticList: [
        {
          title: "年份",
          list: ["2017年", "2018年", "2019年", "2020年", "2021年", "2022年"],
        },
        {
          title: "月份",
          list: ["1月", "2月", "3月", "4月"],
        },
        {
          title: "周",
          list: ["1周", "2周"],
        },
      ],
      // 风险维度
      rankList: [],
      dimensionList: [], //、进行字符串拼接
      // 监控分组列表
      groupsList: [],
      // 行业列表
      industryList: [],
      // 业态列表
      categoryList: [],
      // 品类列表
      formatsList: [],
      tabList: ["全部日报"],
      reqData: {
        chexing: 0,
      },
      //
      dashboardOptions: {
        timeScope: [], //时间范围
        industryNewOptions: [], //行业
        categoryOptions: [], //业态
        formatOptions: [], //品类
      },
      publics: {
        index: 1,
        data: "公有池"
      },
      industrySelected: [],
      categorySelected: [],
      formatSelected: [],
      citySelected: [],
      dashboardFormData: {
        weekName: null, //页面展示周
        industryNew: "请选择", //行业
        category: "请选择", //业态
        format: "请选择", //品类
        province: null,
        city: null,
        district: null,
      },
    };
  },
  watch: {
    showRight(val) {
      // 打开弹框
      if (val) {
        // 监测动态的弹框
        if (this.tabName.title === "搜索") {
          this.getRiskDimensions();
          this.getMonitoringGroup();
          this.TogetIndustyList();
        }
      }

      // else{
      // 	// 关闭弹框条件置空
      // 	this.dynamicRiskData = {    //风险动态弹框
      // 	  startTime:null, //开始时间
      // 	  endTime:null,   //结束时间
      // 	  riskLevel:null,  //风险等级
      // 	  modelNo:null,    //风险维度一级
      // 	  typeNo:null,     //风险维度二级
      // 	  groupInfo:null,  //监控分组
      // 	  industryNew:null, //行业
      // 	  category:null,    //业态
      // 	  format:null      //品类
      //   }
      //   this.riskActive = 0
      //   this.warnActive = 0
      //   this.dimensionList = [] //风险维度字符串列表清空
      // }
    },
	mianTabsActive(val){
		if(val === 0){
			this.publics.data="公有池"
		}else{
			this.publics.data="私有池"
		}
		 this.$emit("searchFormData", this.dashboardFormData);
	},
    dashboardFormData: {
      handler(newV) {
        console.log("-=-=-=-");
        this.$emit("searchFormData", newV);
      },
      deep: true,
      //   immediate: true,
    },
  },
  methods: {
    ...mapMutations(["clearToken"]),
	...mapMutations(["changeDashboardActive"]),
    change(data, type) {
      switch (type) {
        case 1:
          this.industrySelected = [data[0].data.id];
          this.dashboardFormData.industryNew =
            this.dashboardOptions.industryNewOptions[data[0].data.id].title;
          break;
        case 2:
          this.categorySelected = [data[0].data.id];
          this.dashboardFormData.category =
            this.dashboardOptions.categoryOptions[data[0].data.id].title;
          break;
        case 3:
          this.formatSelected = [data[0].data.id];
          this.dashboardFormData.format =
            this.dashboardOptions.formatOptions[data[0].data.id].title;
          break;
      }
      if (type >= 3) return;
      this.$emit("search", type);
    },
    confirmSwitch(data, type) {
      switch (type) {
        case "public":
          this.publics = data[0];
		  if(data[0].data === '公有池'){
			  this.mianTabsActive = 0
		  }else{
			 this.mianTabsActive = 1 
		  }
          this.$emit("searchFormData", this.dashboardFormData);
          break;
        case "weekName":
          this.dashboardFormData.weekName = data[0].data;
          break;
        case "city":
          this.citySelected = data;
          if (data[0].name != "请选择") {
            this.dashboardFormData.province = data[0].name;
          } else {
            this.dashboardFormData.province = null;
          }
          if (data[1].name != "请选择") {
            this.dashboardFormData.city = data[1].name;
          } else {
            this.dashboardFormData.city = null;
          }
          if (data[2].name != "请选择") {
            this.dashboardFormData.district = data[2].name;
          } else {
            this.dashboardFormData.district = null;
          }
      }
      //
    },
    // 获取风险维度菜单
    async getRiskDimensions() {
      const { data } = await risksMenu();
      this.rankList = data.map((item) => {
        let children = item.tacticTypeVOList.map((val) => {
          return {
            modelNo: val.typeNo,
            modelName: val.typeName,
          };
        });
        return { ...item, tacticTypeVOList: children };
      });
	  this.rankList.unshift({modelName:"全部",modelNo:null,tacticTypeVOList:[{modelName:"全部",modelNo:null}]})
    },
    // 获取监控分组的接口
    async getMonitoringGroup() {
      const { data: res } = await monitoringGroup();
      this.groupsList = res.list;
	  this.groupsList.unshift("全部")
    },
    // 获取行业业态品类列表
    async TogetIndustyList() {
      const { data } = await getIndustyList();
      this.industryList = data;
	  this.industryList.unshift("全部")
    },
    // ------------------------------------------------------------辅助函数--------------------------------------------------------------------
    // 确定风险维度
    confirmTacticOption(val) {
      this.dimensionList = val.map((item) => {
        return {
          modelNo: item.data.modelNo,
          modelName: item.data.modelName,
        };
      });
      this.dynamicRiskData.modelNo = this.dimensionList[0].modelNo;
      this.dynamicRiskData.typeNo = this.dimensionList[1].modelNo;
    },
    // 监控分组确定选项
    confirmGroupOption(val) {
	 if(val[0].data === '全部'){
		  this.dynamicRiskData.groupInfo ="";
	 }else{
		this.dynamicRiskData.groupInfo = val[0].data; 
	 }
    },
    // 确定行业选项
    async confirmIndustry(val) {
	if(val[0].data === "全部"){
		this.dynamicRiskData.industryNew = null
	}else{
		this.dynamicRiskData.industryNew = val[0].data;
	}
	this.dynamicRiskData.category = null
	this.dynamicRiskData.format = null
	this.categoryList = []
	this.formatsList = []
      const { data } = await getIndustyList({
        industry: this.dynamicRiskData.industryNew,
        category: "",
      });
      this.categoryList = data;
	  this.categoryList.unshift("全部")
    },
    // 确定业态列表
    async confirmFormat(val) {
		if(val[0].data === "全部"){
			this.dynamicRiskData.category = null
		}else{
			this.dynamicRiskData.category = val[0].data;
		}
		// 清除后面两级
		this.dynamicRiskData.format = null
		this.formatsList = []
      const { data } = await getIndustyList({
        industry: this.dynamicRiskData.industryNew,
        category: this.dynamicRiskData.category,
      });
      this.formatsList = data;
	  this.formatsList.unshift("全部")
    },
    //确定品类列表
    async confirmCategory(val) {
		if(val[0].data === "全部"){
			this.dynamicRiskData.format = null
		}else{
			this.dynamicRiskData.format = val[0].data;
		}
    },
    // 选择预警时间
    selectTime(index, val) {
      this.warnActive = index;
      if (index === 0) {
        this.dynamicRiskData.startTime = "";
        this.dynamicRiskData.endTime = "";
      }
      const dates = formatQuickTime(val);
      this.dynamicRiskData.startTime = dates[0];
      this.dynamicRiskData.endTime = dates[1];
    },
    // 判断风险等级
    riskLevel(index) {
      this.riskActive = index;
      if (index === 0) {
        this.dynamicRiskData.riskLevel = "";
      } else if (index === 1) {
        this.dynamicRiskData.riskLevel = 1;
      } else if (index === 2) {
        this.dynamicRiskData.riskLevel = 2;
      } else {
        this.dynamicRiskData.riskLevel = 4;
      }
    },
    // 搜索列表 与清空搜索列表
    searchList() {
      this.$emit("screen", this.dynamicRiskData);
    },
    // 表单筛选
    screen() {
      this.$emit("screen", this.dynamicRiskData);
      //   this.$emit("searchFormData", this.dashboardFormData);
      this.showRight = false;
    },
    // 表单重置
    reset() {
      this.industrySelected = [];
      this.categorySelected = [];
      this.formatSelected = [];
      this.citySelected = [];
      this.publics = {
        index: 1,
        data: "公有池",
      };
      this.dashboardFormData = {
        weekName: this.dashboardOptions.timeScope[0], //页面展示周
        industryNew: "请选择", //行业
        category: "请选择", //业态
        format: "请选择", //品类
        province: null,
        city: null,
        district: null,
      };
      // 关闭弹框条件置空
      this.dynamicRiskData = {
        //风险动态弹框
        startTime: null, //开始时间
        endTime: null, //结束时间
        riskLevel: null, //风险等级
        modelNo: null, //风险维度一级
        typeNo: null, //风险维度二级
        groupInfo: null, //监控分组
        industryNew: null, //行业
        category: null, //业态
        format: null, //品类
      };
      this.riskActive = 0;
      this.warnActive = 0;
      this.dimensionList = []; //风险维度字符串列表清空
    },
    // 返回上一个页面
    back() {
      uni.navigateBack({
	   delta: 1,
	  });
    },
    // 点击主跳转路由
	toIndex(index){
	this.dashboardActive = index
	this.$emit("selectActive",this.dashboardActive)
	},
    //退出登录
    exit() {
	  uni.showModal({
	  	title:"确认退出登录吗？",
		success:(res)=>{
			if (res.confirm) {
				this.clearToken();
				store.commit("changeButtonList",[])
				uni.redirectTo({
				  url: "/pages/login/login",
				});
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
		}
	  })

    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .shadow-white-3{
	box-shadow: none;
}
::v-deep .shadow-primary-4{
	box-shadow: none;
}

.topic {
  margin-top: 20rpx;
  font-size: 30rpx;
  flex-shrink: 0;
  font-weight: 500;
}
.pickersbox {
  display: flex;
  flex-direction: column;
  > view:nth-of-type(2) {
    display: flex;
    align-items: center;
  }
}
.pickersbox {
  display: flex;
}
//控制导航弹框选项选中
.activeColor {
  background-color: #2888e8 !important;
  color: #fff;
}
.no_active {
  width: 12rpx;
  height: 16rpx;
}
.yes_active {
  width: 16rpx;
  height: 12rpx;
}
.le_title {
  padding: 0 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100rpx;
}
.level2 {
  background-color: #f7fafe;
}
.Header {
  // 头部固定栏
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: #fff;
  box-shadow: 2rpx 2rpx 20rpx #eee;
  .nav {
	  font-size: 28rpx;
	  padding: 0 30rpx;
    height: 88rpx;
	display: flex;
	align-items: center;
	text{
		display: inline-block;
		height: 60rpx;
		line-height: 60rpx;
		margin-right: 40rpx;
	}
  }
  .tabs {
    position: relative;
    display: flex;
    align-items: center;
    height: 88rpx;
    .search {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 558rpx;
      height: 78rpx;
      background-color: #fafafa;
      margin-left: 30rpx;
      margin-bottom: 19rpx;
      border-radius: 39rpx;
      padding: 0 20rpx;
      input {
        width: 92%;
        height: 100%;
      }
    }
    .left {
      font-size: 30rpx;
      font-family: PingFangSC-Medium, sans-serif;
      font-weight: normal;
      height: 88rpx;
      line-height: 88rpx;
      position: absolute;
      left: 30rpx;
	  text{
		display:inline-block;
		height: 100%;
	  }
    }
    .active {
      color: #3662EC;
      border-bottom: 4rpx solid #3662EC;
    }
    .right {
      width: 44rpx;
      height: 36rpx;
      position: absolute;
      right: 30rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .monitorDai {
      width: 100%;
      ::v-deep .tm-tabs .tm-tabs-con .tm-tabs-wk {
        display: flex;
        justify-content: flex-start;
      }
      ::v-deep .text-primary {
        color: #2888e8;
      }
      ::v-deep .primary {
        background-color: #2888e8 !important;
      }
    }
  }
  .dailyDetails {
    height: 176rpx;
    background-color: #fff;
    padding: 30rpx;
    .dynamic {
      display: flex;
      justify-content: space-between;
      .left {
        font-size: 30rpx;
        font-family: PingFangSC-Medium, sans-serif;
        font-weight: normal;
        color: rgba(0, 0, 0, 0.85);
        line-height: 42rpx;
      }
      .right {
        font-size: 24rpx;
        font-family: PingFangSC-Regular, sans-serif;
        font-weight: normal;
        color: rgba(0, 0, 0, 0.5);
        line-height: 34rpx;
      }
    }
    .riskLevel {
      margin-top: 20rpx;
      height: 72rpx;
      background-color: #fafafa;
      display: flex;
      justify-content: space-between;
      view {
        display: inline-block;
        flex: 1;
        text-align: center;
        line-height: 72rpx;
        border-right: 1px solid rgba(0, 0, 0, 0.08);
        &:last-child {
          border-right: 0;
        }
        text {
          display: inline-block;
          font-size: 22rpx;
          font-family: PingFangSC-Regular, sans-serif;
          font-weight: normal;
          color: rgba(0, 0, 0, 0.6);
          line-height: 32rpx;
        }
      }
    }
  }
  ::v-deep .tm-poup.blur {
    height: 90%;
	z-index: 9;
  }
  ::v-deep .tm-poup {
    top: 175rpx;
    min-height: 90%;
  }
  .left_poup {
    ::v-deep .tm-poup {
      top: 88rpx;
      min-height: 90%;
    }
  }
  .select_tooltip {
    position: relative;
    height: 100vh;
    padding: 0 20rpx;
    ::v-deep .tm-poup.blur {
      height: 100%;
    }
    ::v-deep .tm-poup {
      top: -178rpx;
      min-height: 100%;
    }
    ::v-deep uni-button:after {
      border: 0;
    }

    .btn_wrap {
      position: absolute;
      display: flex;
      bottom: 210rpx;
      left: 52%;
      transform: translateX(-50%);
      height: 76rpx;
      width: 100%;
      font-family: PingFangSC-Medium, sans-serif;
      font-size: 26rpx;
      font-weight: normal;
      view {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 48%;
        &:first-child {
          background: rgba(40, 136, 232, 0.1);
          color: #2888e8;
          border-radius: 38rpx 0 0 38rpx;
        }
        &:last-child {
          background: #2888e8;
          color: #fff;
          border-radius: 0 38rpx 38rpx 0;
        }
      }
    }
  }
  .options {
    font-family: PingFangSC-Medium, sans-serif;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.85);

    button {
      margin-top: 20rpx;
      margin-bottom: 10rpx;
      font-size: 30rpx;
      border-radius: 35rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .blocks {
      margin-top: 20rpx;
      font-size: 26rpx;
      display: flex;
      align-items: center;
      //   justify-content: center;
      view {
        padding: 17rpx 27rpx;
        border-radius: 40rpx;
        background: rgba(0, 0, 0, 0.04);
      }
    }
	.blocks2 {
	  margin-top: 20rpx;
	  font-size: 26rpx;
	  display: flex;
	  align-items: center;
	  //   justify-content: center;
	  view {
		text-align: center;
	    height: 100rpx;
		line-height: 100rpx;
	    border-radius: 40rpx;
	    background: rgba(0, 0, 0, 0.02);
	  }
	}
  }
}
</style>
