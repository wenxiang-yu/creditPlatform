<template>
  <view class="home_wrap">
    <view :class="{scrollBanner:!controlBanner,banner:controlBanner}">
<!--      <view class="titleBar">
        <image src="../../static/home/logo.png"></image>
      </view> -->
      <!-- 搜索模块 -->
      <view class="search">
        <view class="tabs" v-show="controlBanner">
          <view
            class="option"
            v-for="item in tabsList"
            :key="item.id"
            :style="{
              backgroundColor: item.id === active ? '#fff' : '',
              color: item.id === active ? '#2888E8' : '#fff',
            }"
            @click="active = item.id"
          >
            <view class="arrrow" v-show="active === item.id"></view>
            {{ item.title }}
          </view>
        </view>
		<view class="slectOp"  v-show="!controlBanner">
			<view class="vlaue" @click="comand = !comand">
				<text>{{active === 1 ? '企业' : '品牌'}}</text>
						<image src="/static/arrow-up-s-fill.png"></image>
			</view>
					<view class="optionWrap" v-if="comand">
						<view class="option" v-for="(item,index) in ['企业','品牌']" :key="index" @click="()=>{comand = false;active = index + 1}" :style="{color:active == index+1 ? '#3662EC' : '#666666'}">
						 {{item}}
						</view>
					</view>
		</view>
        <view class="serach_input" @click="toSearch(active)">
          <image src="../../static/search.png"  v-show="controlBanner"></image>
          <span>
            {{ `请输入${active === 1 ? "企业" : "品牌"}名称、人名等关键词` }}
          </span>
		  <image class="tight" src="/static/searchblue.png"  v-show="!controlBanner"></image>
        </view>
        <view class="hot" v-show="controlBanner">
          <!-- <image src="/static/home/hot_wrod.png"></image> -->
          <view class="right">
            <tm-tabs
              color="white"
              active-border-color="transprent"
              v-model="activeHot"
              :list="list2"
              range-key="title"
              align="left"
              bg-color="transprent"
              font-color="white"
              @change="hotChange"
            ></tm-tabs>
          </view>
        </view>
        <view class="search_sort" v-show="controlBanner">
          <view
            class="option"
            v-for="(item, index) in searchList"
            :key="index"
          >
            <image :src="item.img"></image>
            <span>{{ item.title }}</span>
          </view>
        </view>
      </view>
	  <view class="tabs2" v-if="false">
	    <tm-tabs
	      v-model="recomActive"
	      :list="recomList"
	      range-key="title"
	      align="left"
	    ></tm-tabs>
	  </view>
    </view>
    <!-- 推荐列表模块 -->
    <view class="recommendedList" v-if="false">
      <view class="list_wrap">
        <Options :companyOrbrand="2" :list="recomBrandList" :total="total" />
        <tm-loadding v-show="loadding" :load="loadding"></tm-loadding>
      </view>
    </view>
  </view>
</template>

<script>
import Options from "@/components/Card.vue";
import NavBar from "@/components/navBar.vue";
import { recomBrandList } from "@/api/search/brandDetail.js";
export default {
  name: "homePage",
  components: {
    Options,
    NavBar,
  },
  data() {
    return {
      active: 1,
      activeHot: 0, //热词横向滚动
      recomActive: 0, //头部tabs
      loadding: false,
      loadOver: false, //是否加载完毕
	  controlBanner:true,
	  comand:false, //控制品牌切换
      searchForm: {
        industry: "",
        category: "",
        format: "",
        pro: "",
        city: "",
        country: "",
        target: "品牌信息排行榜",
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      recomBrandList: [], //推荐品牌列表
      enum: {
        //枚举
        brand_name: "品牌",
        industry: "行业",
        category: "业态",
        format: "品类",
        company: "主企业",
        logo: "logo",
      },
      tabsList: [
        {
          id: 1,
          title: "查企业",
        },
        // {
        //   id: 2,
        //   title: "查品牌",
        // },
      ],
      searchList: [
        {
          img: require("../../static/home/hightest.png"),
          router: "",
          title: "高级搜索",
        },
        // {
        //   img: require("../../static/home/KYC.png"),
        //   title: "KYC尽调",
        //   router:
        //     "/pages/enterpriseDueDiligence/EnterpriseDueDiligence?companyName=支出宝（北京）信息技术有限公司&ckey=201816fe83be40f4a9437ef3f2c46055",
        // },
        // {
        //   img: require("../../static/home/flow.png"),
        //   title: "流水尽调",
        //   router: "",
        // },

        // {
        //   img: require("../../static/home/fiance.png"),
        //   title: "财务尽调",
        //   router: "",
        // },
      ],
      // 暂时隐藏
      recomList: [
        // {
        // 	title:"推荐企业"
        // },
        {
          title: "推荐品牌",
        },
        // {
        // 	title:"热点舆情"
        // }
      ],
      list2: [
        // {
        //   id: 1,
        //   title: "恒大集团",
        // },
        // {
        //   id: 2,
        //   title: "海底捞",
        // },
        // {
        //   id: 3,
        //   title: "绿地集团",
        // },
        // {
        //   id: 4,
        //   title: "京东",
        // },
      ],
    };
  },
  onLoad() {
    this.getRecomBrandList();
  },
// 监听页面滚动
 onPageScroll(res) {
	if(res.scrollTop > 0){
		this.controlBanner = false
	}else{
		this.controlBanner = true
	}
 },
  methods: {
    to(item) {
      if (!item.router !== "") {
        uni.navigateTo({
          url: item.router,
        });
      }
    },
    // 获取推荐品牌列表
    async getRecomBrandList() {
      try {
        this.loadding = true;
        const { data: res } = await recomBrandList(this.searchForm);
        let newData = JSON.parse(JSON.stringify(res.list));
        this.total = res.num;
        this.loadding = false;
        let enumObj = this.enum;
        let list = newData.reduce((arr, val) => {
          let objAll = {};
          for (let key in val) {
            objAll[enumObj[key]] = val[key];
          }
          arr.push(objAll);
          return arr;
        }, []);
        this.recomBrandList.push(...list);
        this.loadding = false;
      } catch (e) {
        this.loadding = false;
        //TODO handle the exception
      }
    },
    // 跳转到搜索页面
    toSearch(active) {
      uni.navigateTo({
        url: `/pages/searchIndex/searchIndex?select=${active}`,
      });
    },
    // 点击热搜推荐
    hotChange(val) {
      let params = this.list2[val].title;
      uni.navigateTo({
        url: `/pages/searchIndex/searchIndex?select=${this.active}&cname=${params}`,
      });
    },
  },
  //上拉触底
  onReachBottom() {
    let allTotal = this.searchForm.pageNum * this.searchForm.pageSize;
    if (allTotal < this.total) {
      //当前条数小于总条数 则增加请求页数
      this.searchForm.pageNum++;
      this.getRecomBrandList();
    } else {
      // console.log('已加载全部数据')
      this.loadOver = true;
    }
  },
};
</script>

<style lang="scss" scoped>
::v-deep .text-weight-b{
	font-weight: normal;
}
::v-deep .text-primary {
  color: #3662ec;
}
::v-deep .primary {
  background-color: #3662ec !important;
}
::v-deep .tm-tabs .tm-tabs-con .tm-tabs-con-item-border {
  height: 4rpx;
  width: 60rpx !important;
  transform: translateX(48rpx) !important;
}
::v-deep .tm-tabs .tm-tabs-con .tm-tabs-con-item-border {
  margin-top: -16rpx;
}
.home_wrap {
  padding-bottom: 170rpx;
  .banner,.scrollBanner {
	position: sticky;
	top: 0;
	z-index: 999;
    padding: 0 30rpx;
	padding-top: 60rpx;
	margin-bottom: 78rpx;
    height: 575rpx;
    background: url("@/static/home/home_bg.png") no-repeat;
    background-size: 100% 94%;
    .titleBar {
      height: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      image {
        height: 100%;
        width: 244rpx;
      }
    }
    .search {
      margin-top: 56rpx;
      .tabs {
        display: flex;
        justify-content: center;
        height: 71rpx;
        .option {
          position: relative;
          color: #fff;
          line-height: 71rpx;
          padding: 0 19rpx;
          height: 100%;
          border-radius: 10rpx;
          .arrrow {
            position: absolute;
            content: "";
            display: inline-block;
            width: 20rpx;
            height: 20rpx;
            transform: rotateZ(45deg);
            left: 45%;
            bottom: -10rpx;
            background-color: #fff;
          }
        }
      }
      .serach_input {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 20rpx;
        height: 98rpx;
        background: #ffffff;
        box-shadow: 0rpx 2rpx 12rpx 2rpx rgba(0, 0, 0, 0.12);
        border-radius: 90rpx 90rpx 90rpx 90rpx;
        span {
          margin-left: 10rpx;
          font-size: 26rpx;
          font-family: PingFangSC-Regular, sans-serif;
          font-weight: normal;
          color: #9e9e9e;
        }
        image {
          margin-left: 30rpx;
          height: 44rpx;
          width: 44rpx;
        }
      }
      .hot {
		height: 30rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #ffffff;
        line-height: 30rpx;
        image {
          height: 30rpx;
          width: 84rpx;
        }
        .right {
          width: 87%;
        }
      }
      .search_sort {
        height: 182rpx;
        background: #ffffff;
        border-radius: 16rpx 16rpx 16rpx 16rpx;
        display: flex;
		justify-content: flex-start;
		padding-left: 30rpx;
        .option {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          font-size: 24rpx;
          font-family: PingFangSC-Regular, sans-serif;
          font-weight: normal;
          color: rgba(0, 0, 0, 0.85);
          image {
            width: 68rpx;
            height: 68rpx;
            margin-bottom: 20rpx;
          }
        }
      }
    }
	.tabs2 {
	  // margin: 0 30rpx;
	  margin-top: 20rpx;
	  height: 88rpx;
	  background: #ffffff;
	  border-radius: 16rpx 16rpx 16rpx 16rpx;
	  ::v-deep .white {
	    border-radius: 20rpx;
	  }
	}
  }
  .scrollBanner{
	  padding: 50rpx 0rpx;
  	  height: 320rpx;
	  background: url("@/static/home/banner_bg.png") no-repeat;
	  background-size: 100% 94%;
	  .search{
	position: relative;
	  .slectOp{
	 position: absolute;
	 top: 50%;
	 transform: translateY(-50%);
	 left: 3%;
	  height: 50%;
	  border-right: 1rpx solid rgba(0,0,0,0.08);
	  z-index: 6;
	 .vlaue{
		padding: 0 13rpx 0 30rpx;
		height: 100%;
		display: flex;
		align-items: center;
		align-content: center;
		text{
			font-size: 26rpx;
			font-weight: normal;
			color: #9E9E9E;
			line-height: 30rpx;	 
			 }
			image{
				 height: 28rpx;
				 width: 28rpx;
				 margin-left: 0;
				 }
				 } 
		 .optionWrap{
			position: absolute;
			padding:20rpx 0;
			top: 40rpx;
			left: 18rpx;
			z-index: 10;
			width: 150rpx;
			// padding:30rpx;
			background: url("/static/dialog.png") no-repeat;
			background-size: 100% 100%;
			.option{
				position: relative;
				height: 90rpx;
				text-align: center;
				font-size: 26rpx;
				font-weight: normal;
				color: #3662EC;
				line-height: 90rpx;
				&:first-child{
					&::after{
						position: absolute;
						top: 100%;
						left: 23%;
						content:"";
						background-color: rgba(0,0,0,0.08);
						height:2rpx;
						width: 80rpx;
						display: inline-block;
					}
				}
			}
		 }
		  }
		  .serach_input{
			  position: relative;
			  margin: 0 30rpx;
			  height: 85rpx;
			  span{
				  margin-left: 140rpx;
			  }
			  .tight{
				  position: absolute;
				  right: 50rpx;
				 width: 36rpx;
				  height: 36rpx;
			  }
		  }
	  } 
	  
	  .tabs2{
		  margin-top: 35rpx;
		  border-radius: 0rpx;
		  ::v-deep .white {
		    border-radius: 0rpx;
		  }
	  }
  }
  // 推荐列表模块
  .recommendedList {
    background-color: #f5f5f5;
    margin-top: 50rpx;
    .list_wrap {
      margin-top: 189rpx;
    }
  }
}
</style>
