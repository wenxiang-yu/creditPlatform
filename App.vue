<!--
 * @Date: 2022-12-01 09:15:52
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-12-14 14:05:28
 * @name: 
 * @FilePath: \gogogoc:\Users\Administrator\Desktop\smart-value\monitoringh5\App.vue
-->
<script>
export default {
	onLaunch: function () {
		console.log('App Launch',this.$permissionsBs("map:router:show"))
		// 设置tabbar的权限控制
		// 1.对决策地图的模块的权限控制
		uni.setTabBarItem({
			index:1,
			// visible:this.$permissionsBs("map:router:show")
		})
		
	},
	onShow: function () {},
	onHide: function () {
	},
	methods: {
		// app.vue中动态获取设备信息，主要是将设备参数计算好，存储在globalData中便于组件直接获取
		initBounding() {
			const { windowWidth, windowHeight, statusBarHeight } =
				uni.getSystemInfoSync()

			let menuGap = 7
			let menuWidth = 0
			let menuHeight = 32
			let statusHeight = 7

			// #ifdef MP
			const { top, left, right, width, height } =
				uni.getMenuButtonBoundingClientRect()
			menuGap = windowWidth - right
			menuWidth = width
			menuHeight = height
			statusHeight = top - menuGap
			// #endif

			// #ifdef APP-PLUS
			statusHeight = statusBarHeight
			// #endif

			this.globalData.windowWidth = windowWidth
			this.globalData.windowHeight = windowHeight
			this.globalData.statusHeight = statusHeight
			this.globalData.menuGap = menuGap
			this.globalData.menuWidth = menuWidth
			this.globalData.menuHeight = menuHeight
			console.log('=============>>>initBounding', this.globalData)
		},
	},
}
</script>

<style>
/*每个页面公共css */
@import './tm-vuetify/mian.min.css';
@import './tm-vuetify/scss/theme.css';
* {
	box-sizing: border-box;
}
.img_arrow {
	height: 32rpx;
	width: 32rpx;
}
.dpra {
	background-color: #f5f5f5;
}
uni-page-wrapper {
	background-color: #f5f5f5 !important;
}
/*每个页面公共css */
page {
	height: 100%;
	/* background-color: #525c60; */
	/* color: #ffffff; */
}
.content {
	/* margin-top: 163rpx; */
	height: calc(100vh - 60rpx);
	overflow-y: auto;
	z-index: 0 !important;
	position: relative;
}
uni-tabbar .uni-tabbar__bd,
uni-tabbar .uni-tabbar__item {
	height: 172rpx;
	justify-content: flex-start;
	padding-top: 12rpx;
}
/* 公共标题样式 */
.second--title {
	font-size: 30rpx;
	font-weight: 500;
	color: #131314;
	line-height: 35rpx;
}

</style>
