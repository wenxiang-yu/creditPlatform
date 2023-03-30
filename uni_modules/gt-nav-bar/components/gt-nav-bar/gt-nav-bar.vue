<template>
  <view class="header" @touchmove.stop @touch.stop>
    <!-- 导航栏 -->
    <!-- <view class="navHead">
			<img
				class="img"
				src="../../../../static/index/navLogo.png"
				alt=""
				srcset=""
			/>
			<view class="select" @click="openPopup"
				><img src="../../../../static/index/select.png" alt="" srcset=""
			/></view>
		</view> -->
    <view class="nav">
      <view
        @click="toNav(item.url)"
        :class="active === item.url ? 'active' : ''"
        v-for="(item, index) in list"
        :key="index"
        >{{ item.name }}
      </view>
    </view>
    <view class="search" v-if="active === 'yysj' && false">
      <view>
        <icon type="search" :size="rpxToPx(27)" />
        <span @click="showIpt">{{ setFormData.brand || "请输入品牌名" }}</span>

        <view @click="remove"
          ><gt-icon v-if="setFormData.brand" type="clear"
        /></view>
      </view>
    </view>
    <!-- 悬浮分类 -->

    <view class="types">
      <type-list class="type"></type-list>
      <image class="img" @click="openPopup" src="/static/search/sliders.png" v-if="false"></image>
    </view>

    <!-- 右侧弹窗 -->
    <uni-popup ref="popup" class="popup">
      <view class="popup-content">
        <view class="time" v-if="false">
          <span>更新时间：2022-09-30</span>
          <view @click="clear"><gt-icon type="clear" /></view>
        </view>

        <view class="selected">
          年份
          <picker
            mode="selector"
            @change="bindPickerChange(time, $event, 'time')"
            :value="time.index"
            :range="time.options"
          >
            <view class="uni-input"
              > {{ time.options[time.index]}}<span class="triangle">
				  <image src="/static/tiAr.png" class="trangh" ></image>
				  </span
            ></view>
          </picker>
        </view>
        <view class="selected">
          省市县区
          <!-- {{region.options}} -->
          <uni-data-picker
            placeholder="请选择所在地区"
            popup-title="请选择所在地区"
            :localdata="region.options"
            v-model="region.index"
            @nodeclick="selectRegion"
            @popupclosed="onpopupclosed"
            ref="picker"
            :map="{
              text: 'name',
              value: 'adcode',
            }"
          >
          </uni-data-picker>
        </view>
        <view class="selected">
          类别
          <picker
            @change="bindPickerChange(type, $event, 'employed')"
            :value="type.index"
            :range="type.options"
          >
            <view class="uni-input"
              >{{ type.options[type.index] }}<span class="triangle">
				   <image src="/static/tiAr.png" class="trangh" ></image>
				  </span
            ></view>
          </picker>
        </view>
        <view class="btn">
          <button type="primary" @click="reset" >重置</button>
          <button type="primary" @click="finish">完成</button>
        </view>
        <!-- <button class="btnTc" @click="loginOut">退出登录</button> -->
      </view>
    </uni-popup>

    <scroll-view scroll-y="true" class="content">
      <Maps />
      <slot />
      <view>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
			</view>
    </scroll-view>
    <search
      v-if="showSearch"
      @searchCancel="showSearch = false"
      @search="search"
    />
  </view>
</template>

<script>
import mapJson from "../../../../static/mapJson/map.json";
import Maps from "./Maps.vue";
import search from "./search.vue";
import GtIcon from "@/components/gtIcon/GtIcon.vue";
import TypeList from "./TypeList";
import { getTime } from "@/api/time.js";
export default {
  name: "GtNavBar",
  components: {
    Maps,
    search,
    GtIcon,
    TypeList,
  },
  props: {
    //   导航选中状态
    active: [String],
    // 导航内部选项
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      formData: {
        time: "", //时间
        pro: "", //省
        city: "", //市
        country: "", //区
        employed: "全量", //类别
        brand: "",
      },
      tempClasses: "", // 临时存放vue值
      // list 导航目录
      list: [
        {
          name: "生存趋势",
          url: "mdfz",
        },
        {
          name: "行业发展",
          url: "plfz",
        },
        {
          name: "地域发展",
          url: "dyfz",
        },
        {
          name: "品牌地图",
          url: "pppm",
        },
        {
          name: "营运数据",
          url: "yysj",
        },
      ],
      //   年份
      time: {
        index: 0,
        options: [],
      },
      //   地区
      region: {
        index: null,
        options: mapJson,
      },
      // 类型
      type: {
        index: 0,
        options: ["全量", "非个体", "个体"],
      },
      mapList: [],
      showSearch: false,
    };
  },
  created() {
    let token = uni.getStorageSync("Token");
    if (!token) {
      uni.showToast({
        icon: "error",
        title: "请先登录！",
      });
      uni.redirectTo({
        url: "../login/Login",
      });
    }
    this.getTime(); //获取基础数据
  },
  watch: {
    "$store.state.FormData.time": {
      handler(newV) {
        this.time.options.forEach((item, index) => {
          if (item === newV) {
            this.time.index = index;
          }
        });
      },
      deep: true,
      immediate: true, // 立即执行
    },
    "$store.state.mapList"(newV) {
      this.mapList = newV;
      switch (newV.length) {
        case 0:
          this.formData.pro = "";
          this.formData.city = "";
          this.formData.country = "";
          this.region.index = "";
          break;
        case 1:
          this.formData.pro = newV[0].name;
          this.region.index = Number(newV[0].adcode);
          break;
        case 2:
          this.formData.pro = newV[0].name;
          this.formData.city = newV[1].name;
          this.region.index = Number(newV[1].adcode);
          break;
        case 3:
          this.formData.pro = newV[0].name;
          this.formData.city = newV[1].name;
          this.formData.country = newV[2].name;

          let dat = this.region.options
            .filter((res) => res.adcode === Number(newV[0].adcode))[0]
            .children.filter((res) => res.adcode === Number(newV[1].adcode))[0]
            .children.filter((res) => res.name === newV[2].name)[0];
          console.log(dat);
          this.region.index = dat.adcode;
          break;
      }
    },
  },
  computed: {
    setFormData: {
      get() {
        return this.$store.state.FormData;
      },
      set(newV) {
        this.$store.commit("setFormData", newV);
      },
    },
  },
  methods: {
    remove() {
      this.setFormData = { brand: "" };
    },
    search(brand) {
      this.showSearch = false;
      this.$store.commit("setFormData", { brand: brand });
    },
    showIpt() {
      this.showSearch = true;
    },
    /**
     * @name: getTime
     * @msg: 获取时间配置
     * @param {*}
     * @return {*}
     */
    getTime() {
      getTime(this.$store.state.FormData).then((res) => {
        this.time.options = this.time.options.concat(res.data[0].time);
		console.log("此时的数据是什么",this.time.options[0])
        this.$store.commit("setFormData", { time: this.time.options[0] });
        this.$store.commit("setTimeOption", this.time.options);
        this.setFormData = {
          time: res.data[0].time[res.data[0].time.length - 6],
        };
      });
    },
    /**
     * @name: reset
     * @msg: 重置数据
     * @param {*}
     * @return {*}
     */
    reset() {
      this.time.index = this.time.options.length - 1;
      this.region.index = 0;
      this.type.index = 0;
      this.formData = {
        time: this.time.options[this.time.options.length - 1], //时间
        pro: "", //省
        city: "", //市
        country: "", //区
        employed: "全量", //类别
      };
      this.mapList = [];
    },
    /**
     * @name: finish
     * @msg: 分类数据
     * @param {*}
     * @return {*}
     */
    finish() {
      if (this.region.index === "") {
        this.formData = {
          ...this.formData,
          pro: "", //省
          city: "", //市
          country: "", //区
        };
        this.mapList = [];
      }
      this.$store.commit("setFormData", this.formData);
      this.$store.commit(
        "setMapList",
        JSON.parse(JSON.stringify(this.mapList))
      );
      this.$refs.popup.close();
    },
    /**
     * @name: selectRegion
     * @msg: 选择省市县区
     * @param {*} data
     * @return {*}
     */
    selectRegion(data) {
      let obj = {
        name: data.name,
        adcode: data.adcode,
        type: data.type,
      };
      switch (data.type) {
        case "pro":
          this.mapList = [obj];
          this.formData.pro = data.name;
          this.formData.city = "";
          this.formData.country = "";
          break;
        case "city":
          this.mapList = [this.mapList[0], obj];
          this.formData.city = data.name;
          this.formData.country = "";
          break;
        case "country":
          this.mapList[2] = obj;
          this.formData.country = data.name;

          break;
      }
      this.tempClasses = data;
    },

    onpopupclosed() {
      this.region.index = this.tempClasses.adcode;
    },
    openPopup() {
      this.$refs.popup.open("right");
    },
    loginOut() {
      uni.redirectTo({
        url: "../login/Login",
      });
      uni.removeStorageSync("Token");
      uni.showToast({
        title: "退出成功！",
      });
    },
    /**
     * @name:toNav
     * @msg:路由跳转
     * @param {*} url//路由路径
     * @return {*}
     */
    toNav(url) {
      if (url === "yysj") {
        let timeOption = this.$store.state.timeOption;
        this.setFormData = { time: timeOption[timeOption.length - 4] };
      }
      this.$emit("to", url);
      //   uni.navigateTo({
      //     url: url,
      //   });
    },

    /**
     * @name: bindPickerChange
     * @msg: 下拉框选中项
     * @param {*} item
     * @param {*} e
     * @param {*} type
     * @param {*} name
     * @return {*}
     */
    bindPickerChange: function (item, e, type, name = null) {
      switch (type) {
        case "time":
          this.formData.time = item.options[e.detail.value];
          break;
        case "employed":
          this.formData.employed = item.options[e.detail.value];
          break;
        case "type":
          if (e.detail.value !== null) {
            this.setFormData = { [name]: item.options[e.detail.value].name };
          }

          break;
      }
      item.index = e.detail.value;
    },
    clear() {
      this.$refs.popup.close();
    },
    /**
     * @name: rpxToPx
     * @msg: rpx转px
     * @param {*} rpx
     * @return {*}
     */
    rpxToPx(rpx) {
      let scale = window.screen.width / 750;
      return scale * rpx;
    },
  },
};
</script>

<style lang="scss" scoped>

.popup{
	::v-deep  .uni-popup__wrapper{
		background-color: #ffffff !important;
	}
}
.types {
position: relative;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  > .type {
    width: 680rpx;
  }
  > .img {
	flex-shrink: 0;
    width: 40rpx !important;
    height: 33rpx !important;
	margin: 0 7rpx;
  }
}
// .content {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   z-index: 0;
//   //   padding-top: 75rpx;
//   margin-bottom: 75rpx;
//   // margin-top: -100rpx;
// }
.search {
  width: 750rpx;
  height: 88rpx;
  padding: 14rpx 25rpx;
  display: flex;
  // align-items: center;
  // justify-content: center;
  background-color: #ffffff;
  > view {
    width: 680rpx;
    height: 60rpx;
    // background: #163849;
    border-radius: 12rpx;
    border: 2rpx solid #3662ec;
    display: flex;
    align-items: center;
    padding: 0 25rpx;
    box-sizing: border-box;
    > span {
      font-size: 26rpx;
      font-weight: 400;
      color: #cccccc;
      line-height: 37rpx;
      width: 100%;
    }
  }
}
.header {
  width: 100vw;
  height: 100vh;
  // background-color: #002131;
  background-color: #f9f9f9;
  position: fixed;
  top: 0;
  > .navHead {
    // width: 100%;
    height: 89rpx;
    // border: 2rpx solid #b9e7fc;
    // border-right: none;
    // border-left: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40rpx;
  }
  .img {
    width: 576rpx;
    height: 52rpx;
  }
  .select {
    > img {
      width: 44rpx;
      height: 38rpx;
    }
  }
  .nav {
    padding: 0 3rpx;
    font-size: 28rpx;
    font-weight: 400;
    background-color: #ffffff;
    // color: rgba(255, 255, 255, 0.64);
    line-height: 24rpx;
    height: 75rpx;
    display: flex;
    // border-top: 1rpx solid #b8e6fc;
    box-sizing: border-box;
	overflow-x: scroll;
    > view {
      margin: 0 22rpx;
      line-height: 75rpx;
	  flex-shrink: 0;
    }
    > .active {
      color: #3662EC;
	  font-size: 34rpx;
      // border-bottom: 6rpx solid #00ce9e;
    }
  }
}
.popup-content {
  z-index: 9;
  width: 580rpx;
  padding: 40px;
  background-color: #ffffff;
  .time {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40rpx;
    > span {
      font-size: 24rpx;
      font-weight: 500;
      color: #ffd138;
      line-height: 33rpx;
    }
  }
  .selected {
    font-size: 28rpx;
    font-weight: 400;
    color: rgba(0,0,0,0.6);
    line-height: 40rpx;
    margin-bottom: 30rpx;
    .uni-input {
      margin-top: 24rpx;
      width: 470rpx;
      height: 76rpx;
    //   background: rgba(185, 231, 252, 0.12);
      border-radius: 6rpx;
      border: 1px solid rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30rpx;
    }
  }
}
.triangle {
	position: relative;
  // display: block;
  // height: 0;
  // width: 0;
  // border-top: 12rpx solid rgba(0, 0, 0, 1);
  // border-left: 9rpx solid rgba(0, 0, 0,1);
  // // border-bottom: 18rpx solid #863966;
  // border-right: 9rpx solid rgba(0, 0, 0,1);
  //   border-left: none;
  .trangh{
	  position: absolute;
	  right: -15rpx;
	  top: -32rpx;
  	height: 60rpx;
  	width: 60rpx;
  }
}
::v-deep .uni-data-tree-dialog {
  width: 100vw;
  left: auto;
  span {
    color: #000;
  }
}
// ::v-deep .uni-data-pickerview{
//   position: relative;
// }
// ::v-deep .tab-c {
//   position: absolute;
//   top: 80rpx;
//   left: 30rpx;
// }
::v-deep .input-value {
  margin-top: 24rpx;
  width: 470rpx;
  height: 76rpx;
  // background: rgba(185, 231, 252, 0.12);
  border-radius: 6rpx;
  border: 1px solid rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30rpx;
  .selected-area {
    > span {
      font-size: 28rpx;
      font-weight: 400;
      color: rgba(0,0,0,0.6);
      line-height: 40rpx;
    }
  }
  .uni-icons {
    font-size: 24rpx !important;
  }
  .selected-item {
    font-size: 28rpx;
    font-weight: 400;
    color: rgba(0,0,0,0.6);
    line-height: 40rpx;
  }
}
.btn {
  display: flex;
  > button:nth-of-type(1) {
    width: 150rpx;
    height: 90rpx;
    background: rgba(0,0,0,0.04);
    border-radius: 10rpx;
    // border: 1rpx solid rgba(0,0,0,0.04);
    font-size: 32rpx;
    font-weight: 500;
    color: rgba(0,0,0,0.85);
    line-height: 90rpx;
    margin-right: 10px;
  }
  > button:nth-of-type(2) {
    width: 350rpx;
    height: 90rpx;
    background: #3662EC;
    border-radius: 10rpx;
    font-size: 32rpx;
    font-weight: 500;
    color: #ffffff;
    line-height: 90rpx;
  }
}
.btnTc {
  //   width: 176rpx;
  height: 73rpx;
  background: #f56c6c;
  border-radius: 10rpx;
  border: 1px solid #a1cde1;
  font-size: 32rpx;
  font-weight: 400;
  color: #ffffff;
  line-height: 73rpx;
  position: absolute;
  bottom: 100rpx;
  left: 50%;
  transform: translateX(-50%);
}
</style>
