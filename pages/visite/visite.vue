<template>
  <view class="visite">
    <!--    选项卡-->
    <view class="tabs">
      <text v-for="(tab,index) in tabs" :key="index" @click="tabHandle(tab.value)"
            :class="active === tab.value && 'tab-active'">
        {{ tab.label }}
      </text>
    </view>
    <!-- 搜索框 -->
    <view class="search">
      <tm-input :clear="true" :placeholder="active === 1 ? '搜索企业' : '搜索个人'" v-model="searchVal" @clear="onSearch"
                @keypress.enter.native="onSearch" confirm-type='search'>
        <template #rightBtn>
          <view class="search-btn" @click="onSearch">搜索</view>
        </template>
      </tm-input>
    </view>
    <!-- 公司列表 -->
    <view class="cell" v-if="active === 1">
      <tm-pullBottom :disabled="false" :finish="(companyList.length >= total || pageNum * 10 >= total)"
                     :loading.sync="loading" @refresh="onRefresh">
        <view class="cell-item" v-for="(company,i) in companyList" :key="i"
              @click="cellHandle(company.cname,company.ckey,company.unreadMessage)">
          <view class="cell-item-info">
            <view class="info-logo">{{ company.cname.substring(0, 1) }}</view>
            <view class="info-company">
              <view class="info-company-top">
                <view class="info-company-title">{{ company.cname }}</view>
                <view class="cell-item-date" v-if="company.unreadMessage">
                  {{ company.status > 0 ? formatTime(company.analyzeTime) : formatTime(company.investigateTime) }}
                </view>
              </view>
              <view class="info-company-message">
                <view class="info-company-message-tag" v-if="company.unreadMessage">新尽调</view>
                <view class="info-company-message-text">
                  <text v-if="!company.unreadMessage">
                    {{ company.status > 0 ? formatTime(company.analyzeTime) : formatTime(company.investigateTime) }}
                  </text>
                  {{ company.status > 0 ? "您有一条新的尽调报告请注意查收！" : "加入待尽调企业列表" }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </tm-pullBottom>
    </view>
	<!-- 个人列表-->
	<view class="cell2" v-if="active === 2">
	  <tm-pullBottom :disabled="false" :finish="(personList.length >= total || pageNum * 10 >= total)"
	                 :loading.sync="loading" @refresh="onRefresh">
	    <view class="cell-item" v-for="(company,i) in personList" :key="i"
	          @click="cellHandle(company.cname,company.ckey,company.unreadMessage)">
	      <view class="cell-item-info">
	        <view class="info-logo">{{ company.cname.substring(0, 1) }}</view>
	        <view class="info-company">
	          <view class="info-company-top">
	            <view class="info-company-title">{{ company.cname }}</view>
<!-- 	            <view class="cell-item-date" v-if="company.unreadMessage">
	              {{ company.status > 0 ? formatTime(company.analyzeTime) : formatTime(company.investigateTime) }}
	            </view> -->
				<view class="times">
					11:34
				</view>
	          </view>
	          <view class="info-company-message">
	            <view class="info-company-message-tag" v-if="i< 6">新尽调</view>
	            <view class="info-company-message-text">
	              <text v-if="!company.unreadMessage">
	              <!--  {{ company.status > 0 ? formatTime(company.analyzeTime) : formatTime(company.investigateTime) }} -->
				  {{company.status > 0 ? '刚刚' : '2022-02-22'}}
	              </text>
	              {{ company.status > 0 ? "加入了尽调列表！" : "进行了流水尽调" }}
	            </view>
	          </view>
	        </view>
	      </view>
	    </view>
	  </tm-pullBottom>
	</view>
	<!-- 个人尽调弹出层 -->
	<view class="ooprp" v-if="active === 2" @click="()=>{ooprpShow = true}">
		<image src="../../static/toPOP.png"></image>
	</view>
	<tm-dialog v-model="ooprpShow" :showCancel="false" :showConfirm="false">
		<template #title>
		 <view class="dialogTitle">
		 <text>添加个人尽调信息</text>
		 <image src="../../static/closeX.png" @click="()=>{ooprpShow = false}"></image> 
		 </view>
		</template>
		<template #default>
			<tm-form>
				<tm-input :border-bottom="false"  :vertical="true" name="title" border-color="grey-lighten-1" required title="姓名"  placeholder="请填写被尽调人姓名"v-model="personForm.name" ></tm-input>
				<tm-input :border-bottom="false"  :vertical="true"  name="title"  border-color="grey-lighten-1" required title="手机号" placeholder="请填写被尽调人手机号" v-model="personForm.phone"></tm-input>
				<tm-input :border-bottom="false"  :vertical="true"  name="title" border-color="grey-lighten-1" required title="身份证号" placeholder="请填写被尽调人身份证号" v-model="personForm.idcard"></tm-input> 
				<view class="btn_group">
					<view @click="()=>{ooprpShow = false}">
					取消
					</view>
					<view @click="()=>{ooprpShow = false}">
					确定
					</view>
				</view>
			</tm-form>
		</template>
	</tm-dialog>
  </view>
</template>

<script>
import { getInvestigateCompanyList, setMessageRead } from "../../api/kyc";

export default {
   name:"VisiteInfo",
  data() {
    return {
      timer: null,//定时器
      active: 1, //tab选中值
      loading: false,//触底刷新loading效果
      tabs: [
        { label: "企业", value: 1 },
        {label: "个人", value: 2},
      ],
      isSearchInput: false, //是否显示搜索输入框模块，默认false否
      searchVal: '', //搜索的值
      companyList: [],
      pageNum: 1,//请求页数
      pageSize: 10,//每次请求条数
      total: 0,//总数据条数
	  personList:[
		{
			analyzeTime: 'null',
			ckey: '91c1adfaf21a45419db2a76baf9fb57f',
			cname: '刘成鑫',
			status: 1,
			createTime: '2022-12-02 11:47:28',
			investigateTime: '2022-12-02 11:47:29',
		},
		{
			analyzeTime: '2023-01-06 18:14:04',
			ckey: '91c1adfaf21a45419db2a76baf9fb57f',
			cname: '李承铉',
			status: 1,
		},
		{
			analyzeTime: '2023-01-04 10:10:07',
			ckey: '91c1adfaf21a45419db2a76baf9fb57f',
			cname: '赖昌星',
			status: 1,
		}, 
		{
			analyzeTime: '2023-01-04 10:10:07',
			ckey: '91c1adfaf21a45419db2a76baf9fb57f',
			cname: '林超贤',
			status: 1,
		},  
		{
			analyzeTime: '2023-01-04 10:10:07',
			ckey: '91c1adfaf21a45419db2a76baf9fb57f',
			cname: '李崇禧',
			status: 1,
		},  
		{
			analyzeTime: '2023-01-04 10:10:07',
			ckey: '91c1adfaf21a45419db2a76baf9fb57f',
			cname: '林场',
			status: 1,
		}, 
		 {
		 	analyzeTime: '2023-01-04 10:10:07',
		 	ckey: '91c1adfaf21a45419db2a76baf9fb57f',
		 	cname: 'Martin',
		 	status: 0,
		 },  
	  ],
	  ooprpShow:false,
	  personForm:{
		  name:"",
		  phone:"",
		  idcard:""
	  }
    }
  },
  onShow() {
    this.getList();
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.loading) return;
      this.pageNum = 1;
      this.pageSize = this.companyList.length;
      this.getList();
    }, 6000)
  },
  //页面隐藏时
  onHide() {
    clearInterval(this.timer);
  },
  methods: {
    tabHandle(value) {
      this.active = value
    },
    /*
     *企业列表点击
     * */
    cellHandle(companyName, ckey, unRead) {
      if (unRead) {
        setMessageRead({ ckey });
      }
	  if(this.active == 1){
      uni.navigateTo({
        url: `/pages/enterpriseDueDiligence/EnterpriseDueDiligence?companyName=${companyName}&ckey=${ckey}`
      })		  
	  }else{
		uni.navigateTo({
		  url: `/pages/personDueDiligence/personDueDiligence?companyName=${companyName}&ckey=${ckey}`
		})	  
	  }

    },
	
    /*
     * 搜索
     * */
    onSearch() {
      this.pageNum = 1;
      this.total = 0
      this.companyList = [];
      this.loading = true;
      this.getList();
    },
    /*
     * 上拉加载更多数据
     * */
    onRefresh(e) {
      if (e === 'bottom') {
        if (this.pageNum * 10 < this.total) {
          this.loading = true;
          this.pageNum++
          this.getList();
        } else {
          this.loading = false;
        }
        console.log("触底刷新")
      }
    },
    //获取待尽调企业列表
    getList() {
      let params = {
        cname: this.searchVal,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      getInvestigateCompanyList(params).then(res => {
        if (res.code === 200) {
          let { list, total } = res.data;
          this.total = total;
          if (params.pageNum === 1) {
            this.companyList = list || [];
          } else {
            this.companyList = this.companyList.concat(list);
          }
        }
        this.loading = false;
      }).catch(() => this.loading = false)
    },
    //格式化时间返回上午下午晚上
    formatTime(time) {
      time = time ? time.replace(/\s/g, "T").replace(/\//g, "-") : time;
      let toDay = new Date();
      let toDayDay = toDay.getDate();
      let date = new Date(time);
      let dateDay = date.getDate();
      if (toDayDay == dateDay) {
        let hour = date.getHours();
        let minute = date.getMinutes();
        minute = minute < 10 ? "0" + minute : minute;
        return `${hour}:${minute}`;
      } else {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return `${year}年${month}月${day}日`;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
uni-page-body {
  height: calc(100vh - 172rpx);
}

::v-deep .tm-pullBottom-sroll {
  height: calc(100vh - 420rpx) !important;
  //border: 1px solid #000000;
}
::v-deep .px-50{
	padding-left: 0 !important;
	padding-right: 0 !important;
} 
.visite{
	position: relative;
}
.btn_group{
	display: flex;
	padding: 30rpx 30rpx 0 30rpx;
	view{
	font-size: 30rpx;
	height: 88rpx;
	line-height: 88rpx;
	border-radius: 44rpx;
	text-align: center;
	&:first-child{
		flex: 1.2;
		background-color: #EBF2FF;
		color: #3662EC;
		margin-right: 20rpx;
	}
	&:last-child{
		flex: 3;
		background-color: #3662EC;
		color: #ffffff;
	}
	}
}
.dialogTitle{
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 30px;
	font-family: $uni-ffzh;
	font-weight: normal;
	color: #333333;
	line-height: 35px;
	image{
		width: 30rpx;
		height: 30rpx;
	}
}
.ooprp{
	position: absolute;
	top: 86%;
	right: 5%;
	width: 120rpx;
	height: 120rpx;
	border-radius: 60rpx;
	image{
		width: 100%;
		height: 100%;
	}
	
}
.tabs {
  padding: 24rpx 30rpx;
  background: #FFFFFF;

  text {
    font-size: 28rpx;
    color: rgba(0, 0, 0, 0.6);
    line-height: 33rpx;
    margin-right: 40rpx;

    &:last-child {
      margin-right: 0;
    }
  }

  .tab-active {
    font-size: 34rpx;
    font-size: 600;
    color: #3662EC;
    line-height: 40rpx;
  }
}

.search {
  position: relative;
  padding: 20px 0;
  background: #FFFFFF;

  ::v-deep .tm-input {
    height: 80rpx !important;
    margin: 0 30rpx;
    border-radius: 90rpx !important;
    padding: 0 30rpx;
    border: 2rpx solid rgba(0, 0, 0, 0.1);

    .py-12 {
      padding: 0;
      height: 100%;

      .flex-between {
        height: 100% !important;
      }
    }

    .border-grey-lighten-4-b-1 {
      border: 0;
    }

    input {
      height: 80rpx;
    }

    .icon-times-circle-fill {
      color: #B3B3B3;
    }
  }

  &-btn {
    font-size: 30rpx;
    color: #3662EC;
    line-height: 35rpx;
  }
}

.cell ,.cell2{
  background: #ffffff;

  &-item {
    font-size: 24rpx;
    padding: 0 30rpx 40rpx;

    &:last-child {
      padding-bottom: 60rpx;
    }

    &-info {
      display: flex;

      .info-logo {
        width: 60rpx;
        height: 60rpx;
        background-color: #2888e8;
        border-radius: 4rpx;
        color: #ffffff;
        margin-right: 20rpx;
        text-align: center;
        font-size: 32rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .info-company {
        flex: 1;

        &-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        &-title {
          width: 410rpx;
          max-width: 480rpx;
          font-size: 28rpx;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.85);
          line-height: 40rpx;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        &-message {
          color: rgba(0, 0, 0, 0.6);
          line-height: 36rpx;
          display: flex;
          align-items: center;
          margin-top: 12rpx;

          &-tag {
            font-size: 20rpx;
            color: #3662EC;
            padding: 4rpx 14rpx;
            border-radius: 18rpx;
            margin-right: 14rpx;
            background: rgba(54, 98, 236, 0.1);
          }

          &-text {
            //flex: 1;
          }
        }
      }
    }

    &-date {
      margin-left: 10rpx;
      color: rgba(0, 0, 0, 0.4);
    }
  }
}
// 个人列表
.cell2{
	 .info-logo{
		 width: 88rpx;
		 height: 88rpx;
		 border-radius: 44rpx;
	 }
	 .times{
		font-family: PingFangSC-Regular;
		font-size: 24rpx;
		font-weight: normal;
		letter-spacing: 0rpx;
		color: rgba(0, 0, 0, 0.4); 
	 }
}
</style>
