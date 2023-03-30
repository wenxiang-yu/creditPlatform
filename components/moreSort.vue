<!-- 更多模块筛选 -->
 <template>
	 <view class="moreSortWrap">
		 <!-- 企业地址 -->
		 <view class="conditions">
		 		<view class="title">
		 			{{moreSortList[0].title}}
		 		</view>
		 		<view class="contentwe">
		 		<view class="tags" v-for="(val,num) in moreSortList[0].content" :key="num" :style="{backgroundColor:num === innerActive1 ? '#e6ecfc' : '',color:num === innerActive1 ? '#3662EC' : ''}" @click="moreSort(0,num)">
		 		 {{val.dictLabel}}
		 		</view>
		 		</view>
		 	</view>
		 <!-- 注册资本 -->
		 <view class="conditions">
		 	<view class="title">
		 		{{moreSortList[1].title}}
		 	</view>
		 	<view class="contentwe">
		 		<view class="tags" v-for="(val,num) in moreSortList[1].content" :key="num" :style="{backgroundColor:num === innerActive2 ? '#e6ecfc' : '',color:num === innerActive2 ? '#3662EC' : ''}" @click="moreSort(1,num)">
		 		 {{val.dictLabel}}
		 		</view>
		 	</view>
		 </view>
		 <!-- 成立年限 -->	
		 <view class="conditions">
		 	<view class="title">
		 		{{moreSortList[2].title}}
		 	</view>
		 	<view class="contentwe">
		 		<view class="tags" v-for="(val,num) in moreSortList[2].content" :key="num" :style="{backgroundColor:num === innerActive3 ? '#e6ecfc' : '',color:num === innerActive3 ? '#3662EC' : ''}" @click="moreSort(2,num)">
		 		 {{val.dictLabel}}
		 		</view>
	        </view>
			</view>
			<!-- 企业状态 -->
			<view class="conditions">
				<view class="title">
					{{moreSortList[3].title}}
				</view>
				<view class="contentwe">
					<view class="tags" v-for="(val,num) in moreSortList[3].content" :key="num" :style="{backgroundColor:num === innerActive4 ? '#e6ecfc' : '',color:num === innerActive4 ? '#3662EC' : ''}" @click="moreSort(3,num)">
					 {{val.dictLabel}}
					</view>
			   </view>
						</view>
						<!-- 参保人数 -->
						<view class="conditions">
							<view class="title">
								{{moreSortList[4].title}}
							</view>
							<view class="contentwe">
								<view class="tags" v-for="(val,num) in moreSortList[4].content" :key="num" :style="{backgroundColor:num === innerActive5 ? '#e6ecfc' : '',color:num === innerActive5 ? '#3662EC' : ''}" @click="moreSort(4,num)">
								 {{val.dictLabel}}
								</view>
						   </view>
									</view>
									<!-- 电话号码 -->
									<view class="conditions">
										<view class="title">
											{{moreSortList[5].title}}
										</view>
										<view class="contentwe">
											<view class="tags" v-for="(val,num) in moreSortList[5].content" :key="num" :style="{backgroundColor:num === innerActive6 ? '#e6ecfc' : '',color:num === innerActive6 ? '#3662EC' : ''}" @click="moreSort(5,num)">
											 {{val.dictLabel}}
											</view>
									   </view>
												</view>
												<!-- 邮箱地址 -->
												<view class="conditions">
													<view class="title">
														{{moreSortList[6].title}}
													</view>
													<view class="contentwe">
														<view class="tags" v-for="(val,num) in moreSortList[6].content" :key="num" :style="{backgroundColor:num === innerActive7 ? '#e6ecfc' : '',color:num === innerActive7 ? '#3662EC' : ''}" @click="moreSort(6,num)">
														 {{val.dictLabel}}
														</view>
												   </view>
									</view>
									<!-- 企业地址 -->
											<view class="conditions">
													<view class="title">
														{{moreSortList[7].title}}
													</view>
													<view class="contentwe">
														<view class="tags" v-for="(val,num) in moreSortList[7].content" :key="num" :style="{backgroundColor:num === innerActive8 ? '#e6ecfc' : '',color:num === innerActive8 ? '#3662EC' : ''}" @click="moreSort(7,num)">
														 {{val.dictLabel}}
														</view>
												   </view>
									</view>
									<!-- 企业网站 -->
											<view class="conditions">
													<view class="title">
														{{moreSortList[8].title}}
													</view>
													<view class="contentwe">
														<view class="tags" v-for="(val,num) in moreSortList[8].content" :key="num" :style="{backgroundColor:num === innerActive9 ? '#e6ecfc' : '',color:num === innerActive9 ? '#3662EC' : ''}" @click="moreSort(8,num)">
														 {{val.dictLabel}}
														</view>
												   </view>
									</view>
			</view>
</template>

<script>

 	export default {
		props: {
			moreSortList: {
				type: Array,
				default: ()=>[]
			},
		},
		data() {
			return {
				innerActive1:0, //企业类型颜色
				innerActive2:0, //注册资本颜色
				innerActive3:0, //成立年限颜色
				innerActive4:0, //企业状态颜色
				innerActive5:0, //参保人数颜色
				innerActive6:0, //电话号码颜色
				innerActive7:0, //邮箱地址颜色
				innerActive8:0, //企业地址颜色
				innerActive9:0, //网站地址颜色
			}
		},
		methods: {
		//更多筛选
		moreSort(dig,inner){
			let item = this.moreSortList[dig].content[inner].dictValue
			switch (dig){
				case 0:
				this.innerActive1 = inner
				this.$emit("deliverMoreSort",{enterpriseType:item})
				break;
				case 1:
				this.innerActive2 = inner
				this.$emit("deliverMoreSort",{registCapi:item === ""? []:[item]})
				break;
				case 2:
				this.innerActive3 = inner
				this.$emit("deliverMoreSort",{startDate:item === ""? []:[item]})
				break;
				case 3:
				this.innerActive4 = inner
				this.$emit("deliverMoreSort",{operatingState:item === ""? []:[item]})
				break;
				case 4:
				this.innerActive5 = inner
				this.$emit("deliverMoreSort",{insuredQuantityStr:item === ""? []:[item]})
				break;
				case 5:
				this.innerActive6 = inner
				this.$emit("deliverMoreSort",{phoneNumber:item})
				break;
				case 6:
				this.innerActive7 = inner
				this.$emit("deliverMoreSort",{emailAddress:item})
				break;
				case 7:
				this.innerActive8 = inner
				this.$emit("deliverMoreSort",{enterpriseAddress:item})
				break;
				case 8:
				this.innerActive9 = inner
				this.$emit("deliverMoreSort",{enterpriseWebsite:item})
				break;
			}
		},
		},
	}
</script>

<style lang="scss" scoped>
	.moreSortWrap{
		// 更多筛选的条件的样式
		.conditions{ 
					 .title{
						font-size: 26rpx;
						font-family:$uni-ffcg;
						font-weight: normal;
						color: rgba(0,0,0,0.6);
						line-height: 36px; 
					 }
					 .contentwe{
						margin: 30rpx 0;
						 .tags{
							display: inline-block;
							padding: 16rpx 30rpx;
							border-radius: 12rpx 12rpx 12rpx 12rpx;
							border: 1px solid rgba(0,0,0,0.08);
							margin: 0  0 20rpx 19rpx;
						 }
					 }
		}
	}
</style>