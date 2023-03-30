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
	export default {
		name: "index",
		components: {
			mdfz, //门店发展
			plfz, //品类发展
			dyfz, //地域发展
			pppm, //品牌排名
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
				this.dataList = newV;
			},
		},
		created() {
			const value = this.$getURLParams().type
			if (value) {
				this.active = value;
			}
		},
		methods: {
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
		height: 100vh;
	}
</style>
