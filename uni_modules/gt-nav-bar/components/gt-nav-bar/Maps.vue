<template>
	<!-- <echarts :option="option" ref="charts" class="charts"></echarts> -->
	<view class="box">
		<view class="nav">
			<view :class="!getMapList.length ? 'active' : ''" :style="`font-size:${rpxToPx(20)}px;`"
				@click="backMap('china')">
				<view>全国</view>
				<span class="right"></span>
			</view>
			<view v-for="(item, index) in getMapList" :key="index"
				:class="index === getMapList.length - 1 ? `active` : ''" :style="`font-size:${rpxToPx(20)}px;`"
				@click="backMap(item, index)">
				<span class="left1"></span>
				<span class="left2"></span>
				<view>{{ item.name }}</view>
				<span class="right"></span>
			</view>
		</view>

		<!-- @touchmove="touchMove" -->
		<view>
			<!-- <le-movable bgColor="#002131"> -->
			<qiun-data-charts type="map" ref="mapcharts" canvasId="mapcharts" :chartData="getMapCharts.chartData"
				:echartsH5="true" :echartsApp="true" background="none" :eopts="getMapCharts.eopts"
				style="width: 670rpx; height: 670rpx" />
			<!-- </le-movable> -->
		</view>
	</view>
</template>

<script>
	import {
		getMap
	} from "@/api/getJson.js";
	import {
		getMap2
	} from "@/api/index.js";
	import cfe from "@/uni_modules/qiun-data-charts/js_sdk/u-charts/config-echarts.js";
	// import Echarts from "@/components/echarts.vue";
	// import echarts from "@/static/echarts.js";
	export default {
		name:"ChinaMap",
		// 注册组件
		components: {},
		props: {
			canvasId: {
				type: String,
				default: "echartsMap",
			},
		},
		data() {
			return {
				opts: {},
				option: {
					notMerge: true,
					eopts: {
						visualMap: [{
							show: true,
							type: "piecewise",
							left: this.rpxToPx(50),
							itemWidth: this.rpxToPx(22),
							itemHeight: this.rpxToPx(22),
							inverse: true, //取反类型
							orient: "horizontal", //水平（'horizontal'）或者竖直（'vertical'）
							textStyle: {
								// color: "#ffffff", //文字的颜色。
								overflow: "break", //超出换行
								fontSize: this.rpxToPx(15),
							},
							splitNumber: 4,
							left: "center",
							pieces: [],
						}, ],
					},
					chartData: {},
				},
				el: null, //charts
				chart: null, //初始化后的echarts
				mapList: [{
					name: "全国",
					value: "china",
				}, ], //地图数据
				flagCap: false, //返回上一层
				lock: false,
				mapType: ["pro", "city", "country", "country"],
				state: false,
			};
		},
		computed: {
			getMapCharts() {
				return this.option;
			},
			getMapList: {
				get() {
					return this.$store.state.mapList;
				},
				set(newV) {
					this.$store.commit("setMapList", newV);
				},
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
		watch: {
			"$store.state.mapList": {
				handler(newV) {
					if (!newV.length) {
						console.log("-----");
						this.requestGetJson("china", "china");
						return;
					}
					let obj = newV[newV.length - 1];
					if (obj.type !== "country") {
						this.requestGetJson(obj.adcode, obj.type);
					} else {
						console.log(newV);
						let obj2 = newV[newV.length - 2];
						this.requestGetJson(obj2.adcode, obj2.type, newV[newV.length - 1]);
					}
				},
				deep: true,
			},
			"$store.state.FormData": {
				handler(newV) {
					this.requestGetJson(this.opts.name, this.opts.type, this.opts._number);
				},
				// immediate: true, // 立即执行
			},
		},
		created() {},
		mounted() {
			setTimeout(() => {
				this.init();
			}, 300);
		},
		methods: {
			init() {
				this.requestGetJson("china", "china");

				// this.el = document.querySelector(`#${this.canvasId}`);
				// this.chart = echarts.init(this.el);

				// ref.instance["mapcharts"].on("click", this.mapClick);
			},
			mapClick(data) {
				this.lock = true;
				let obj = {
					name: data.data.name,
					adcode: data.data.adcode,
					type: data.data.type,
				};
				switch (data.data.type) {
					case "pro":
						this.getMapList = [obj];
						this.setFormData = {
							pro: obj.name
						};
						break;
					case "city":
						this.getMapList = [this.getMapList[0], obj];
						this.setFormData = {
							city: obj.name
						};
						break;
					case "country":
						this.getMapList = [this.getMapList[0], this.getMapList[1], obj];
						this.setFormData = {
							country: obj.name
						};
						break;
				}
				// if (data.data.type !== "country") {
				//   this.requestGetJson(obj.adcode, obj.type);
				// }
			},

			/**
			 * @name: backMap
			 * @msg: 回到地图上一级
			 * @param {*} item
			 * @return {*}
			 */
			backMap(item, i = null) {
				if (item === "china" && this.getMapList.length) {
					this.getMapList = [];
					this.setFormData = {
						pro: "",
						city: "",
						country: ""
					};
					return;
				}
				switch (i) {
					case 0:
						this.getMapList = [item];
						this.setFormData = {
							city: "",
							country: ""
						};

						break;
					case 1:
						this.getMapList = [this.getMapList[0], item];
						this.setFormData = {
							country: ""
						};

						break;
					case 2:
						this.getMapList = [this.getMapList[0], this.getMapList[1], item];
				}
			},
			/**
			 * @name: getLayout
			 * @msg: 解决地图比例不是0.75导致显示不完整
			 * @param {*} name
			 * @return {*}
			 */
			getLayout(name) {
				let data = {
					center: null,
					size: null,
				};
				switch (String(name)) {
					case "china":
						data.center = ["50%", "60%"];
						data.size = this.rpxToPx(670);
						break;
					case "230000": // "黑龙江省"
						data.center = ["50%", "60%"];
						data.size = this.rpxToPx(500);
						break;
				}
				return {
					layoutCenter: data.center,
					layoutSize: data.size
				};
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

			//绘制地图
			requestGetJson(name, type = "", _number = false) {
				this.opts = {
					name,
					type,
					_number,
				};
				if (!name) return;
				getMap(type + "/" + name).then((res) => {
					getMap2(this.$store.state.FormData).then((val) => {
						let arr = [];
						let num = 0;
						for (let i = 0; i < res.features.length; i++) {
							if (num < val.data.num[res.features[i].properties.name]) {
								num = val.data.num[res.features[i].properties.name];
							}
							let obj = {
								name: res.features[i].properties.name,
								adcode: res.features[i].id || res.features[i].properties.adcode,
								value: val.data.num[res.features[i].properties.name] ? val.data.num[res.features[i].properties.name] : 0,
								type: this.getMapList.length ?
									this.mapType[this.getMapList.length] :
									"pro",
							};
							arr.push(obj);
						}
						console.log("此时的数据四什么",arr);
						// 动态渲染图例
						if (num < 10) {
							this.option.eopts.visualMap[0].pieces = [{
								label: `10家以下`,
								color: "#C1E8FE",
								symbol:"circle"
							}, ];
						} else {
							let num_75 = Math.trunc(num * 0.75),
								num_50 = Math.trunc(num * 0.5),
								num_25 = Math.trunc(num * 0.25);
							this.option.eopts.visualMap[0].pieces = [{
									min: num_75,
									label: `${
                  num_75 > 10000 ? Math.trunc(num_75 / 10000) + "万" : num_75
                }家以上`,
									color: "#28B2FF",
									symbol:"circle"
								},
								{
									max: num_75,
									min: num_50,
									label: `${
                  num_75 > 10000 ? Math.trunc(num_75 / 10000) + "万" : num_75
                }-${
                  num_50 > 10000 ? Math.trunc(num_50 / 10000) + "万" : num_50
                }家`,
									color: "#007DFF",
									symbol:"circle"
								},
								{
									max: num_50,
									min: num_25,
									label: `${
                  num_50 > 10000 ? Math.trunc(num_50 / 10000) + "万" : num_50
                }-${
                  num_25 > 10000 ? Math.trunc(num_25 / 10000) + "万" : num_25
                }家`,
									color: "#65C8FF",
									symbol:"circle"
								},
								{
									max: num_25,
									label: `${
                  num_25 > 10000 ? Math.trunc(num_25 / 10000) + "万" : num_25
                }家以下`,
									color: "#0297FF",
									symbol:"circle"
								},
							];
						}

						if (!window.echarts) {
							setTimeout(() => {
								this.requestGetJson(name, type, _number);
							}, 500);
							return;
						}
						window.echarts.registerMap(name, res);

						this.$set(
							this.option,
							"chartData",
							JSON.parse(
								JSON.stringify({
									series: [{
										zoom: 1,
										center: undefined,
										roam: false,
										label: {
											show: true, //是否显示标签。
											color: "#ffffff", //字体颜色
											fontSize: this.rpxToPx(10),
										},
										itemStyle: {
											areaColor: "#002F45", //区域颜色
										},
										type: "map",
										map: name,
										data: arr,
										...this.getLayout(name),
									}, ],
								})
							)
						);

						if (_number) {
							setTimeout(() => {
								cfe.instance['"mapcharts"'].dispatchAction({
									type: "downplay", // 高亮指定的数据图形。通过seriesName或者seriesIndex指定系列。如果要再指定某个数据可以再指定dataIndex或者name。
									seriesIndex: 0,
								});
								cfe.instance['"mapcharts"'].dispatchAction({
									type: "highlight", // 高亮指定的数据图形。通过seriesName或者seriesIndex指定系列。如果要再指定某个数据可以再指定dataIndex或者name。
									seriesIndex: 0,
									name: _number.name,
								});
							}, 0);
						}

						// 第一次进来给地图赋值上点击事件
						if (!this.state) {
							setTimeout(() => {
								cfe.instance['"mapcharts"'].on("click", this.mapClick);
								this.state = true;
							}, 500);
						}

						this.lock = false;
					});
				});
				this.flagCap = false;
			},
			touchStart(e) {
				console.log(e, "-----");
				// uni.showLoading({
				//   title: "加载中",
				//   mask: true,
				// });
			},
		},
	};
</script>
<style lang="less" scoped>
	.charts {
		position: relative;
		left: 50%;
		transform: translateX(-50%);
		width: 670rpx;
		height: 670rpx;
	}

	.box {
		position: relative;
		background-color: #ffffff;
		margin: 30rpx 30rpx 0 30rpx ;
		border-radius: 12rpx;
		padding: 20rpx;

		.nav {
			position: absolute;
			z-index: 9;
			left: 40rpx;
			top: 20rpx;
			display: flex;

			>view {
				position: relative;
				display: flex;
				align-items: center;
				height: 44rpx;
				margin-right: 34rpx;
				box-sizing: border-box;

				// overflow: hidden;
				>view {
					z-index: 9;
					line-height: 44rpx;
					background-color: #f5f5f5;
					padding: 0 10rpx;
					position: relative;
					border: 1rpx solid rgba(0, 0, 0, 0.16);
					border-right: none;
				}

				>.right {
					height: 31.5rpx;
					width: 31.5rpx;
					background-color: #f5f5f5;
					border: 1rpx solid rgba(0, 0, 0, 0.16);
					border-left: none;
					border-bottom: none;
					transform: rotate(45deg);
					position: absolute;
					right: -16rpx;
					z-index: 8;
					box-sizing: border-box;
				}

				>.left1,
				.left2 {
					width: 26rpx;
					height: 23.5rpx;
					background-color: #f5f5f5;
					border: 1rpx solid rgba(0, 0, 0, 0.16);
					left: -15rpx;
					transform: skew(45deg, 0deg);
					position: absolute;
					box-sizing: border-box;
				}

				>.left1 {
					top: -1rpx;

					border-right: none;
					border-bottom: none;
				}

				>.left2 {
					bottom: -1rpx;
					transform: skew(-45deg, 0deg);
					border-right: none;
					border-top: none;
				}
			}

			>.active {
				color: #3662ec;
				background-color: #ebeffd;
				border-color: #3662ec;

				>view {
					background-color: #ebeffd;
					border-color: #3662ec;
					border-left: none;
				}

				>.right {
					background-color: #ebeffd;
					border-color: #3662ec;
				}

				>.left1,
				.left2 {
					border-color: #3662ec;
					background-color: #ebeffd;
				}

				// > span:nth-of-type(1) {
				//   border: 22rpx solid;
				//   z-index: 8;
				//   border-color: #00ce9e transparent #00ce9e transparent;
				// }
				// > span:nth-of-type(2) {
				//   border-color: transparent transparent transparent #00ce9e;
				// }
			}

			>.active:nth-of-type(1) {
				>view {
					border-left: 1px solid #3662ec;
				}
			}
		}
	}
</style>
