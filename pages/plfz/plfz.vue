<template>
  <view class="plfz">
    <gt-box type="twoBorder" class="twoBorder">
      <!-- <gt-line title="行业" /> -->
      <!-- :style="`width:${getDataList.length * 500}rpx`" -->
      <view class="pieOne roll1">
        <view class="titleRow" :style="`width:${getDataList.length * 500}rpx`" v-if="false">
          <view v-for="(item, index) in titleRow" :key="index">
            <view
              class="circle"
              :style="`background-color:${industry.eopts.color[index]};`"
            ></view>
            {{ item }}
          </view>
        </view>
        <view class="pies">
		<text class="chartTitle">行业</text>
		 <!-- 下拉选择图表 -->
		 <view class="selectPine">
		 	<view class="value" @click="isShow = !isShow">
				<span>{{industryTime[selectActive]}}</span> <image src="../../static/arrowDowns.png"></image>
		 	</view>
			<view class="select" v-show="isShow">
				<view class="option" v-for="(item,index) in industryTime" :key="index" @click.stop="()=>{selectActive = index;isShow=false}" :style="{color:selectActive === index ? '#3662EC' : 'rgba(0,0,0,0.6)'}">
					{{item}}
				</view>
			</view>
		 </view>
          <gt-ucharts
            :key="`id_${selectActive}`"
            :width="650"
            :height="650"
            :options="getDataList[selectActive]"
            :canvasId="`industry_${selectActive}`"
          />
		  <view class="leagel">
		  	<view class="options" v-for="(item,index) in legalList[selectActive]" :key="index">
		  		<view class="left">
		  		<text class="git" :style="{background:industry.eopts.color[index]}"></text> <text>{{item.name}}</text>	
		  		</view>
				<view class="right">
					{{item.value.toLocaleString()}}家
				</view>
		  	</view>
		  </view>
        </view>
      </view>
    </gt-box>
    <gt-box type="twoBorder" class="twoBorder">
		<view class="Utitle">
		 <span>业态</span>
		 <!-- 下拉选择图表 -->
		 <view class="selectPine2">
		 	<view class="value" @click="isShow2 = !isShow2">
		 				<span>{{industryTime[selectActive2]}}</span> <image src="../../static/arrowDowns.png"></image>
		 	</view>
		 			<view class="select" v-show="isShow2">
		 				<view class="option" v-for="(item,index) in industryTime" :key="index" @click.stop="()=>{selectActive2 = index;isShow2=false}" :style="{color:selectActive2 === index ? '#3662EC' : 'rgba(0,0,0,0.6)'}">
		 					{{item}}
		 				</view>
		 			</view>
		 </view>
		</view>
      <view class="pie roll2">
        <view
          class="category"
        >
          <gt-ucharts
            :width="600"
            :height="cLength < 7 ? cLength * 100 : cLength * 40"
            :options="getCategorys[selectActive2]"
            :canvasId="`category${selectActive2}`"
          />
        </view>
      </view>
    </gt-box>
    <gt-box type="twoBorder" class="twoBorder">
		<view class="Utitle">
		 <span>品类</span>
		 <!-- 下拉选择图表 -->
		 <view class="selectPine3">
		 	<view class="value" @click="isShow3 = !isShow3">
		 				<span>{{industryTime[selectActive3]}}</span> <image src="../../static/arrowDowns.png"></image>
		 	</view>
		 	<view class="select" v-show="isShow3">
		 	<view class="option" v-for="(item,index) in industryTime" :key="index" @click.stop="()=>{selectActive3 = index;isShow3=false}" :style="{color:selectActive3 === index ? '#3662EC' : 'rgba(0,0,0,0.6)'}">
		 					{{item}}
		 	</view>
		 	</view>
		 </view>
		</view>
      <view class="pie roll3">
        <view
          class="format"
        >
<!--          <view>{{ item.name }}</view> -->
          <gt-ucharts
            :width="600"
            :height="fLength < 7 ? fLength * 100 : fLength * 40"
            :options="getFormats[selectActive3]"
            :canvasId="`format${selectActive3}`"
          />
        </view>
      </view>
    </gt-box>
  </view>
</template>

<script>
import GtBox from "@/components/gtBox/GtBox.vue";
import GtLine from "@/components/gtLine/GtLine.vue";
import GtUcharts from "@/components/gtUcharts/GtUcharts.vue";
import cfe from "@/uni_modules/qiun-data-charts/js_sdk/u-charts/config-echarts.js";
import mixin from "./mixin.js";
import { getIndustry, getCategory, getFormat } from "@/api/index.js";
export default {
  name: "plfz",
  mixins: [mixin],
  components: {
    GtBox,
    GtLine,
    GtUcharts,
  },
  data() {
    return {
      dataArr: [], //行业数据
      categorys: [], //业态数据
      cLength: 0, //业态高度
      formats: [], //品类数据
      fLength: 0, //品类高度
      loading: 0, //loading
      titleRow: [], //饼图图例
      one: true, //是否是第一次进来
	  industryTime:[], //行业时间列表
	  selectActive:0, //行业选中
	  selectActive2:0, //业态选中
	  selectActive3:0, //品类选中
	  isShow:false,  //行业下拉
	  isShow2:false, //业态下拉
	  isShow3:false, //品类下拉
	  legalList:[] //图例列表
    };
  },
  computed: {
    getDataList() {
      return this.dataArr;
    },
    getCategorys() {
      return this.categorys;
    },
    getFormats() {
      return this.formats;
    },
    setFormData: {
      get() {
        return this.$store.state.FormData;
      },
      set(newV) {
        this.$store.commit("setFormData", newV);
      },
    },
  },
  created() {
    //   设置datalist
    this.$store.commit("setDataList", this.dataList);
  },
  watch: {
    "$store.state.FormData": {
      handler(newV) {
        // this.$setNewV(newV);

        uni.showLoading({
          title: "加载中",
          mask: true,
        });
        this.getIndustry(newV);
        this.getCategory(newV);
        this.getFormat(newV);
      },
      immediate: true, // 立即执行
    },
    loading(newV) {
      if (newV === 3) {
        uni.hideLoading();
        this.loading = 0;
      }
    },
  },
  methods: {
    getFormat(newV) {
      getFormat(newV).then((res) => {
        let num = 0;
        this.loading++;
        // 根据年份排序
        res.data.sort(function (a, b) {
          return a.year > b.year ? 1 : -1; //升序  < 降序
        });
        // 遍历每个图表
        let data = res.data.reduce((arr, item, i) => {
          let obj = this.$Clone(this.category);
          if (num <= item.key.length) {
            num = item.key.length;
          }
          // 数据放到一起进行排序
          let arrs = item.percentage
            .reduce((list, val, index) => {
              list.push({
                value: val,
                name: item.value[index],
                key: item.key[index],
              });
              return list;
            }, [])
            .sort(function (a, b) {
              return a.value > b.value ? 1 : -1; //升序  < 降序
            });
          // 排序完成 设置对应的数据
		  let newArrs = arrs.slice(-5)
          let keys = [],
            datas = [];
          newArrs.forEach((vals) => {
            keys.push(vals.key);
            datas.push({ ...vals });
          });
          obj.eopts.yAxis[0].data = keys;
          obj.chartData.series[0].data = datas;
			obj.chartData.series[0].itemStyle.color="#14C9C9"
          obj["name"] = item.year;
          arr.push(obj);
          return arr;
        }, []);
        this.fLength = 5;
        this.$set(this, "formats", []);
		data.reverse()
        setTimeout(() => {
          this.$set(this, "formats", data);
        }, 500);
        let roll3 = document.querySelector(".roll3");
        setTimeout(() => {
          roll3.scrollLeft = roll3.scrollWidth;
        }, 500);
      });
    },
    /**
     * @name: getCategory
     * @msg: 业态
     * @param {*}
     * @return {*}
     */
    getCategory(newV) {
      getCategory(newV).then((res) => {
        let num = 0;
        this.loading++;
        // 根据年份排序
        res.data.sort(function (a, b) {
          return a.year > b.year ? 1 : -1; //升序  < 降序
        });

        // 遍历每个图表
        let data = res.data.reduce((arr, item, i) => {
          let obj = this.$Clone(this.category);
          if (num <= item.key.length) {
            num = item.key.length;
          }
          // 数据放到一起进行排序
          let arrs = item.percentage
            .reduce((list, val, index) => {
              list.push({
                value:val,
                name: item.value[index],
                key: item.key[index],
              });
              return list;
            }, [])
            .sort(function (a, b) {
              return a.value > b.value ? 1 : -1; //升序  < 降序
            });
		 let newArrs = arrs.slice(-5) 
          // 排序完成 设置对应的数据
          let keys = [],
            datas = [];
          newArrs.forEach((vals) => {
            keys.push(vals.key);
            datas.push({ ...vals });
          });
          obj.eopts.yAxis[0].data = keys;
          obj.chartData.series[0].data = datas;
          obj["name"] = item.year;
          arr.push(obj);
          return arr;
        }, []);
        this.cLength = 5;
        this.$set(this, "categorys", []);
		data.reverse()
        setTimeout(() => {
          this.$set(this, "categorys", data);
        }, 500);
        let roll2 = document.querySelector(".roll2");
        setTimeout(() => {
          roll2.scrollLeft = roll2.scrollWidth;
        }, 500);
      });
    },
    /**
     * @name: getIndustry
     * @msg: 行业
     * @param {*}
     * @return {*}
     */
    getIndustry(newV) {
      getIndustry(newV).then((res) => {
        this.loading++;
        res.data.sort(function (a, b) {
          return a.year > b.year ? 1 : -1; //升序  < 降序
        });
        this.titleRow = [];
		this.industryTime = []
        let data = res.data.reduce((arr, item, i) => {
		  // 获取年份数据
		  this.industryTime.unshift(item.year)
          let obj = this.$Clone(this.industry);
		  let newArr =  item.key.map((val,i)=>{
			return {
				value: item.value[i],
				key: val,
				year: item.year,
			}
		  })
		let sum = item.value.reduce((prev,curr)=>{
			return prev + curr
		})
		let sortArr =  newArr.sort(this.compare('value'))
		let precent = sortArr.length >= 5 ? sortArr.slice(0, 5) : sortArr
		let add = []
		precent.forEach((val) => {
			add.push(val.value)
		})
		 let prenctDefault = add.reduce((prev, curr) => {
			return prev + curr
		})
		 let addValue =  sum - prenctDefault
		 precent.push({
			 value:addValue,
			 key:"其他",
			 year: item.year
		 })
		 let newItem = {
			 key:[],
			 value:[],
			 year:item.year
		 }
		 
		 precent.forEach(val=>{
			 newItem.key.push(val.key)
			 newItem.value.push(val.value)
		 })
          obj.chartData.series[0].data = newItem.key.reduce((list, val, index) => {
            list.push({
              name: val,
              year: newItem.year,
              value: newItem.value[index],
            });
            if (!i) {
              this.titleRow.push(val);
            }
			this.legalList = list
            return list;
          }, []);
          obj.chartData.series[1].data = [newItem.year];
          arr.push(obj);
          return arr;
        }, []);
		data.reverse()
        this.$set(this, "dataArr", data);
		this.legalList = this.dataArr.map(val=>{
			return val.chartData.series[0].data
		})
        if (this.one) {
          this.one = false;
          this.statar();
        }

        let roll1 = document.querySelector(".roll1");
        setTimeout(() => {
          roll1.scrollLeft = roll1.scrollWidth;
        }, 500);
      });
    },
    statar() {
	 return
      try {
        this.getDataList.forEach((item, index) => {
          cfe.instance[`"industry_${index}"`].on("click", this.echartsClick);
        });
      } catch (error) {
        setTimeout(() => {
          this.statar();
        }, 500);
      }
    },
    echartsClick(item) {
      console.log(item, "-=-=--");
      if (!item.name) return;
      if (!this.setFormData.industry) {
        this.setFormData = { industry: item.name, time: item.data.year };
      } else if (!this.setFormData.category) {
        this.setFormData = { category: item.name, time: item.data.year };
      } else if (!this.setFormData.format) {
        this.setFormData = { format: item.name, time: item.data.year };
      }
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
	// 排序函数
	compare(property) {
		return (a, b) => {
			let val1 = a[property]
			let val2 = b[property]
			return val2 - val1
		}
		}
  }
}
</script>
<style lang="less" scoped>
.chartTitle{
	position: absolute;
	top: 12rpx;
	left: 0;
	font-size: 30rpx;
	font-weight: normal;
	color: #1D2129;
}
.plfz {
  // width: 100vw;
  padding: 30rpx;

  .pieOne {
    display: flex;
    flex-direction: column;
    overflow-x: auto;

    .titleRow {
      display: flex;
      flex-direction: row-reverse;
      > view {
        display: flex;
        align-items: center;
        font-size: 22rpx;
        margin-right: 10rpx;
        flex-shrink: 0;
      }
      .circle {
        margin-right: 5rpx;
        width: 22rpx;
        height: 22rpx;
        background: rgba(91, 143, 249, 0.85);
        border-radius: 50%;
      }
    }
    .pies {
	 position: relative;
      margin-top: 0rpx;
      // display: flex;
	  .leagel{
		 .options{
			 display: flex;
			 justify-content: space-between;
			 align-items: center;
			 margin-bottom: 19rpx;
			 .left{
				 display: flex;
				 align-items: center;
				 font-size: 26rpx;
				 color: #4E5969;
				 .git{
					display: inline-block;
					width: 6rpx;
					height: 29rpx;
					background: #D91AD9;
					border-radius: 100rpx 100rpx 100rpx 100rpx;
					opacity: 1; 
					margin-right: 18rpx;
				 }
			 }
			 .right{
				 color: #1D2129;
				 font-size: 26rpx;
				 font-weight: normal;
				 color: #1D2129;
			 }
		 } 
	  }
    }
  }
  .twoBorder {
    padding: 20rpx;
    margin-bottom: 40rpx;
    position: relative;
  }
  .pie {
    margin-top: 16rpx;
    display: flex;
    overflow-x: auto;
  }
  .category,
  .format {
	margin-top: 50rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 50rpx;
    > text {
      font-size: 26rpx;
      font-weight: 500;
      color: #ffffff;
    }
  }
  .dw {
    position: absolute;
    right: 20rpx;
    top: 40rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: #ffffff;
  }
  .selectPine ,.selectPine2,.selectPine3{
  		  z-index: 2;
  		  position: absolute;
  		  right: 3rpx;
  		  font-size: 26rpx;
  		  font-weight: normal;
  		  background-color: #ffffff;
  		  color: #3662EC;
  		  width: 195rpx;
  		  text-align: center;
  		  .value{
  			  display: flex;
  			  justify-content: center;
  			  align-items: center;
  			   height: 70rpx;
  			   line-height: 70rpx;
  			   image{
  				   margin-left: 10rpx;
  				   width: 30rpx;
  				   height: 30rpx;
  			   }
  		  }
  		  .select{
  			position: relative;
  			 padding: 0 20rpx;
  			 box-shadow: 0 0 5rpx rgba(0, 0, 0, .3);
  			  .option{
  				  color: rgba(0,0,0,0.6);
  				  height: 70rpx; 
  				  line-height: 70rpx;
  				  border-bottom: 1rpx solid rgba(0,0,0,0.08);
  			  }
  			  &::before{
  				  position: absolute;
  				  top: -10rpx;
  				  content: "";
  				  display: inline-block;
  				  width: 30rpx;
  				  height: 30rpx;
  				  background-color: #ffffff;
  				  transform: rotateZ(45deg);
  				  box-shadow: -2rpx -3rpx 5rpx rgba(0, 0, 0, .1);
  			  }
  			  &::after{
  				  position: absolute;
  				  top: 0rpx;
  				  transform: translateX(-30%);
  				  content: "";
  				  display: inline-block;
  				  width: 60rpx;
  				  height: 20rpx;
  				  background-color: #ffffff;
  			  }
  		  }
  }
  .selectPine2,.selectPine3{
	  top: 10rpx;
	  right: 30rpx;
  }
}
</style>
