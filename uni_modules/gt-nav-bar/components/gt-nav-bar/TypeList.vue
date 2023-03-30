<!--
 * @Date: 2022-05-31 10:21:47
 * @LastEditors: 大濕兄
 * @LastEditTime: 2022-12-01 16:53:28
 * @name: 悬浮按钮
 * @FilePath: /monitoringh5/uni_modules/gt-nav-bar/components/gt-nav-bar/TypeList.vue
-->
<template>
  <!-- <scroll-view scroll-x="true" style="height: 100rpx"> -->
    <!-- <view class="picker"> -->
<!--     <picker
        v-for="(item, index) in dataList"
        :key="index"
        :disabled="!item.options.length"
        @change="bindPickerChange(item, $event, item.name)"
        :value="item.index"
        :range="item.options"
        :range-key="'name'"
      >
        <view class="uni-input">
          {{
            item.index === null
              ? typeNmaes[item.name]
              : item.options[item.index]
          }}
          <span class="triangle"></span
        ></view>
      </picker> -->
	  <view class="Optionwrap">
	  	<view class="options">
	  		  		<tm-pickersCity  @confirm="dateSe" @resetA="resetArea" btn-color="bg-gradient-deep-purple-accent" :resetBtn="true" :default-value="areaList" ref="citys">
	  		  		   <tm-button theme="bg-gradient-deep-purple-accent" @click="areaOption">
	  		  		    <text :style="{color:sortActive=== true ? '#3662EC' : ''}">全部地区</text><image :src="sortActive===true ?'../../static/search/sortTop.png' :'../../static/search/sotrDown.png'"></image>						
	  		  			</tm-button>
	  		  		</tm-pickersCity>
	  		  	</view>
	  		  <!-- 全部行业筛选 -->
	  		  	<view class="options">
	  		  	<tm-pickers :default-value="industryList"  :list="allIndustryList" rang-key="label" children-key="children" @confirm="selectIndustry" :resetBtn="true" 
				@resetIndustry="resetIndustry" :defaultrest="1" ref="allIndusty">
	  		  	<tm-button theme="bg-gradient-amber-lighten"  @click="closeIns">
	  		  	<text :style="{color:sortActive2=== true ? '#3662EC' : ''}">全部行业</text><image :src="sortActive2===true ?'../../static/search/sortTop.png' :'../../static/search/sotrDown.png'"></image>	
	  		  	</tm-button>
	  		  	</tm-pickers>
	  		  	</view>
	  			<view class="options">
<tm-pickers :default-value="selected"  :list="['全量','个体','非个体']" :resetBtn="true" @confirm="employ" @resetIndustry="resetemplo" ref="allemplo" :defaultrest="1">
		<tm-button theme="bg-gradient-amber-lighten"  @click="allValue">
           	  	<text :style="{color:sortActive3=== true ? '#3662EC' : ''}">全量</text><image :src="sortActive3===true ?'../../static/search/sortTop.png' :'../../static/search/sotrDown.png'"></image>				
		</tm-button>

</tm-pickers>
	  			</view>
	  </view>
	  	    <!-- </view> -->
  <!-- </scroll-view> -->
</template>

<script>
import mapMixin from "@/components/mapMixin.js";
import mapMixin2 from "@/components/mapMixin2.js";
import {getIndustyList} from "@/api/dashboard.js"
import {getAllIndustry} from "@/api/search/search.js"
import {mapMutations} from 'vuex'
export default {
  name: "TypeList",
  data() {
    return {
	selected:["全量"],
	areaList:[], //地区列表
	industryList:[],// 行业列表
	allIndustryList:[], //获取行业列表
	sortActive:null, //排序筛选选中
	sortActive2:null, //排序筛选选中
	sortActive3:null, //排序筛选选中
      typeNmaes: {
        industry: "行业",
        category: "业态",
        format: "品类",
		employed:"全量",
        target: "指标",
        brand: "品牌",
      },
      dataList: [
        {
          name: "industry",
          index: null,
          options: [
            {
              name: "全部",
            },
            {
              name: "服务",
            },
            {
              name: "零售",
            },
            {
              name: "餐饮",
            },
            {
              name: "文体",
            },
          ],
        },
        {
          name: "category",
          index: null,
          options: [],
        },
        {
          name: "format",
          index: null,
          options: [],
        },
      ],
      route: null,
    };
  },
  created() {
  	// this.getIndustyList()
	this.toGetAllIndustry()
  },
  computed: {
    // setFormData: {
    //   get() {
    //     return this.$store.state.FormData;
    //   },
    //   set(newV) {
    //     this.$store.commit("setFormData", newV);
    //   },
    // },
  },
  watch: {
	  "$store.state.mapList":{
		  handler(val){
			  this.areaList = val.map(val=>{
				  return val.name
			  })
		  },
		  deep:true,
		  immediate:true
	  },
	  "$store.state.mapTypeActive":{
		  handler(){
			 this.selected = ["全量"] 
			 this.industryList = []
			 this.resetArea()
			this.resetIndustry()
			this.resetemplo()
		  }
	  },
  },
  methods: {
	...mapMutations(["setFormData"]),
	...mapMutations(["setMapList"]),
	// 获取行业业态品类列表
	async  getIndustyList(ids="",cate="",type=0){
	if(ids === "全部"){
		ids = ""
		this.$store.commit("setFormData",{industry:"",category:"",format:""})
		return
	}
	if(cate === "全部"){
		cate = ""
		this.$store.commit("setFormData",{category:"",format:""})
		return
	}
	const {data} = await  getIndustyList({
		industry:ids,
		category:cate,
	})
	let newData = JSON.parse(JSON.stringify(data))
	newData.unshift("全部")
	this.dataList[type].options = newData
	
	},
	//触发级联选择器
    bindPickerChange: function (item, e, name = null) {
      let num = null;
      if (typeof e === "number") {
        num = e;
      } else {
        num = e.detail.value;
      }
      if (num !== null) {
        switch (name) {
          case "industry":
            this.dataList[0].index = null;
            this.dataList[1].index = null;
            this.dataList[1].options = [];
            this.dataList[2].index = null;
            this.dataList[2].options = [];
			this.getIndustyList(item.options[num],"",1)
            this.setFormData = {
              industry:item.options[num] === "全部" ? "" : item.options[num],
              category: "",
              format: "",
              brand: "",
            };

            break;
          case "category":
          this.getIndustyList(this.$store.state.FormData.industry,item.options[num],2)
            this.setFormData = {
              category:
                item.options[num] === "全部" ? "" : item.options[num],
              format: "",
              brand: "",
            };
            this.dataList[2].index = null;
            break;
          case "format":
            this.setFormData = {
              format:
                item.options[num] === "全部" ? "" : item.options[num],
              brand: "",
            };
            break;

          default:
            this.setFormData = { [name]: item.options[num] };

            break;
        }
      }

      item.index = num;
    },
	// 筛选条件：获取全部行业列表
	async toGetAllIndustry(){
	const {data,code}= await getAllIndustry()
	if(code === 200){
		let newData = JSON.parse(JSON.stringify(data))
		newData.unshift({id:0,label:"全部",value:"全部",children:[{id:0,label:"全部",value:"全部",children:[{id:0,label:"全部",value:"全部"}]}]})
	   newData.forEach((val,index)=>{
		   if(index > 0){
			  newData[index].children.unshift({id:0,label:"全部",value:"全部",children:[{id:0,label:"全部",value:"全部"}]})
			  newData[index].children.forEach((item,ind)=>{
				  if(ind > 0){
					  newData[index].children[ind].children.unshift({id:0,label:"全部",value:"全部"})
				  }
			  })
			  
	   }}
	   )
	   console.log("此时的数组是什么",newData);
		this.allIndustryList = newData
	}
	},
	//地区筛选
	dateSe(val){
		this.sortActive = false
		let newData = JSON.parse(JSON.stringify(val))
		let cityArr = ["pro","city","country"]
		newData = newData.map((item,index)=>{
			if(item.name !== "请选择"){
			let copyCode = item.adcode
			if(item.adcode.length < 6){
				copyCode = item.adcode
				for(let i=0;i< 6 - Number(item.adcode.length);i++){
					copyCode = copyCode + "0"
				}
			}
				return {
				name:item.name,
				adcode:Number(copyCode),
				type:cityArr[index]
				}
			}
		})
		newData = newData.filter(val=>{
			return val
		})
		this.setMapList(newData)
		this.areaList = newData.map(val=>{
			return val.name
		})
		// this.setMapList()
		this.setFormData({
			pro:this.areaList[0] || "",
			city:this.areaList[1] || "",
			country:this.areaList[2] || ""
		})
	},
	// 重置地区
	resetArea(){
		this.$refs.citys.showpop = false
		this.sortActive = false
		this.setFormData({
			pro:"",
			city:"",
			country:""
		})
		this.setMapList([])
	},

	// 行业筛选
	selectIndustry(val){
		let newData = JSON.parse(JSON.stringify(val))
		 newData = newData.map(item=>{
			return item.data.value
		 })
		 this.industryList = newData
		 this.setFormData({
			 industry:newData[0] ==="全部" ? "" : newData[0],
			 category:newData[1] ==="全部" ? "" : newData[1],
			 format:newData[2] ==="全部" ? "" : newData[2]
		 })
		 this.sortActive2 = false
	},
	resetIndustry(){
		this.sortActive2 = false
		this.setFormData({
			industry:"",
			category:"",
			format:""
		})	
		this.industryList = []
		this.$refs.allIndusty.showpop =false
	},
	// 选择全量
	employ(val){
		this.sortActive3 = false
		this.selected = [val[0].data]
		this.setFormData({
			employed:val[0].data
		})
	},
	resetemplo(){
		this.$refs.allemplo.showpop = false
		this.sortActive3 = false
		this.selected = ["全量"]
		this.setFormData({
			employed:"全量"
		})
	},
	areaOption(){
		this.sortActive= !this.sortActive
	},
	closeIns(){
		this.sortActive2= !this.sortActive2
	},
	allValue(){
		this.sortActive3= !this.sortActive3
	}
  },
};
</script>

<style lang="less" scoped>
	::v-deep .border-grey-lighten-1-a-1{
		border: none!important;
	}
	::v-deep .shadow-primary-0{
		border: 2rpx solid rgba(0,0,0,0.1) ;
	}
	::v-deep .text-white{
		color: #b2b2b2 !important;
	}
	::v-deep .shadow-white-10{
		box-shadow: none;
	}
	
	::v-deep .tm-poup{
		top: 170rpx;
		z-index: 99 !important;
	}
	::v-deep .round-b-10 {
		border-bottom-left-radius: 0 !important;
		border-bottom-right-radius: 0 !important;
	}
	// 筛选栏样式
	::v-deep .tm-poup .tm-poup-wk.bottom{
		// bottom:600rpx;
		top:-470rpx;
		transform:none !important;
	}
	::v-deep .tm-poup .tm-poup-wk{
		height: 1150rpx !important;
	}
	::v-deep .tm-pickersView .tm-pickersBView-wk{
		height: 900rpx;
	}
	.Optionwrap{
		position: relative;
		display: flex;
		align-items: center;
		height: 100rpx;
		overflow: hidden;
		.options{
			position: relative;
			height: 100rpx;
			display: flex;
			align-items: center;
			margin-top: 100rpx;
			padding-bottom: 20rpx;
			border-bottom: 1rpx solid #D8D8D8;
			image{
				height: 40rpx;
				width: 40rpx;
				margin-right: 20rpx;
				top: 8rpx !important;
			}
			text{
				font-size: 26rpx !important;
				font-family: PingFangSC-Regular, sans-serif;
				font-weight: normal;
				color: #333333;
				line-height: 36rpx
			}
		}
	}
.picker {
  height: 100rpx;
  width: 680rpx;
  background-color: #ffffff;
  position: relative;
  display: flex;
  align-items: center;
  // padding: 0 30rpx;
  overflow-x: auto;
  z-index: 11;
  ::v-deep .uni-scroll-view-content {
    display: flex;
  }
  uni-picker {
    flex-shrink: 0 !important;
    display: flex;
    align-items: center;
  }
  .uni-input {
    font-size: 28rpx;
    font-weight: 400;
    color: #666666;
    line-height: 36rpx;
    display: flex;
    align-items: center;
    height: 60rpx;
    // background-color: rgba(185, 231, 252, 0.12);
    border-radius: 30rpx;
    // border: 1px solid #00ce9e;
    padding: 0 40rpx;
    margin: 0 10rpx;
    > .triangle {
      margin-left: 14rpx;
    }
  }
}
.triangle {
  display: block;
  height: 0;
  width: 0;
  border-top: 12rpx solid #666666;
  border-left: 9rpx solid rgba(0, 0, 0, 0);
  // border-bottom: 18rpx solid #863966;
  border-right: 9rpx solid rgba(0, 0, 0, 0);
  //   border-left: none;
}
</style>
