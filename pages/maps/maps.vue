<!--
 * @Date: 2022-12-01 09:15:52
 * @LastEditors: 大濕兄
 * @LastEditTime: 2022-12-01 09:34:23
 * @name: 
 * @FilePath: /monitoringh5/pages/maps/maps.vue
-->
<template>
	<view class="background">
		<gt-nav-bar :active="active" :dataList="dataList" @to="show">
			<component :is="active" />
		</gt-nav-bar>
	</view>
</template>

<script>
	import mdfz from "../mdfz/mdfz.vue";
	import plfz from "../plfz/plfz.vue";
	import dyfz from "../dyfz/dyfz.vue";
	import pppm from "../pppm/pppm.vue";
	import yysj from "../yysj/yysj.vue";
	import {mapMutations} from 'vuex'
	export default {
		name: "index",
		components: {
			mdfz, //生存趋势
			plfz, //行业发展
			dyfz, //地域发展
			pppm, //品牌地图
			yysj, //运营数据
		},
		data() {
			return {
				active: "mdfz", //当前展示的页面
				dataList: [],
			};
		},
		watch: {
			"$store.state.dataList"(newV) {
				this.setMapList([])
				this.setFormData({
					targets:"门店数量排行榜",
					pro: "",
					city: "",
					country: "" 
				})
				
				this.dataList = newV;
			},
			active(val){
				this.changeMapTypeActive(val)
				switch (val){
					case "yysj":
					this.setFormData({
						brand:"",
						category:"",
						city:"",
						country:"",
						employed:"全量",
						format:"",
						industry:"",
						pro:"",
						target:"总店数",
						targets:"门店数量排行榜",
						time:"2021"
					})
					break;
					default:
						this.setFormData({
							brand:"",
							category:"",
							city:"",
							country:"",
							employed:"全量",
							format:"",
							industry:"",
							pro:"",
							target:"总店数",
							targets:"门店数量排行榜",
							time:"2022-01"
						});
					break;	
				}
			}
			
		},
		created() {
			const value = this.$getURLParams().type
			if (value) {
				this.active = value;
			}
		},
		methods: {
			...mapMutations(["setFormData"]),
			...mapMutations(["setMapList"]),
			...mapMutations(["changeMapTypeActive"]),
			show(url) {
				uni.redirectTo({
					url: `../index/index?type=${url}`,
				});
				this.active = url;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.background {
		position: relative;
		height: 100vh;
	}
</style>
