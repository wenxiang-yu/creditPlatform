<template>
	<view class="tabwrap">
	<view class="displacement">
	<view class="tabs" v-for="(item,index) in itemList" @click="selectTab(index)">
	<view class="items" :class="{items_active : active === index}">{{item}}</view>
	</view>				
	</view>
	</view>
</template>

<script>
	export default{
	props:{
		itemList:{
		type:Array,
		default:()=>[]	
	}
		},
		data() {
			return {
				active:0
			}
		},
		methods:{
			selectTab(index){
				this.active = index
				this.$emit("change",this.active)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabwrap{
		background-color: #fff;
		width: 100%;
		overflow-y: hidden;
		overflow-x: auto;
		.displacement{
		height: 88rpx;
		display: flex;
		align-items: center;
		.tabs{
		flex-shrink: 0;
		margin: 0 27rpx;
		.items{
		font-size: 28rpx;
		font-weight: normal;
		color: rgba(0,0,0,0.6);
		padding: 9rpx;
		}
		.items_active{
			border-bottom: 4rpx solid #3662EC;
			color: #3662EC;
		}
		}			
		}


	}
</style>