<template>
	<view class="registerWrap">
		<view class="reg">
			<view class="logo">
			<!-- <image src="../../static/gutu.png"></image> -->
			</view>
			<view class="perfectInformation">
				信息完善
			</view>
			<view class="formWrap">
				<tm-form ref="formData">
			    <tm-input :border-bottom="false" bg-color="grey-lighten-5" border-color="grey-lighten-3"  placeholder="请输入您的名称（必填）" v-model="registerForm.userName" ruleMessage="请输入您的名称" required ref="valueName"></tm-input>
				<tm-input :border-bottom="false" bg-color="grey-lighten-5" border-color="grey-lighten-3" placeholder="请输入您所属的企业名称（必填）" required ruleMessage="请输入您所属的企业名称" v-model="registerForm.enterpriseName" ref="valueEnterprise"></tm-input>
				<tm-input :border-bottom="false" bg-color="grey-lighten-5" border-color="grey-lighten-3" placeholder="请输入您的邮箱（必填）" required ruleMessage="请输入您的邮箱" v-model="registerForm.email" ref="valueEmail" customCheck= "email" @changeEmailstate="(flag)=>{emailFormat = flag }" input-type="email"></tm-input>
				<tm-pickers  :list="industryList" @confirm="selectIndustry">
				<view class="industry">
				<text :style="{color:registerForm.industryType ? '#0a0a0a' : '#B3B3C2'}">{{registerForm.industryType ? registerForm.industryType : '请选择行业（选填）'}}</text>
				<view class="arrow">
				</view>
				</view>					
				</tm-pickers>
				<tm-pickers :list="sizeTheList" @confirm="selectEnterprise">
				<view class="proportion">
				<text :style="{color:registerForm.enterpriseSize ? '#0a0a0a' : '#B3B3C2'}">{{registerForm.enterpriseSize ? registerForm.enterpriseSize  :'选择规模（选填）'}}</text>
				<view class="arrow">
				</view>
				</view>					
				</tm-pickers>
				<view class="submit_btn" @click.stop="submit">
				提交并登录	
				</view>
				</tm-form>
			</view>
		</view>
		<tm-message ref="toast"></tm-message>
	</view>
</template>

<script>
	import {InformationSubmit,getPersonInfo} from '@/api/login.js'
	export default {
		name:"registers",
		data() {
			return {
				// 注册表单
				registerForm:{
				userName: null,
				enterpriseName: null,
				email: null,
				industryType: null,
				enterpriseSize: null,
				},
				emailFormat:true,
				// 行业列表
				industryList: [
				"银行",
				"政府",
				"租赁",
				"保理",
				"担保",
				"基金",
				"征信",
				"小贷",
				"投融资服务机构",
				"私募股权投资机构",
				"其他"
			],
			// 规模列表
			sizeTheList:[
				"1～10人（默认）",
				"10～50人",
				"50～100人",
				"100～500人",
				"500人以上",
			]
			}
		},
		methods: {
			async submit(){
			if(!this.registerForm.userName || !this.registerForm.enterpriseName || !this.registerForm.email || !this.emailFormat){
			this.$refs.valueName.verifyInput()
			this.$refs.valueEnterprise.verifyInput()
			this.$refs.valueEmail.verifyInput()
			this.$refs.valueEmail.cuCheck()
			return
			}
			try{
			const {code} = await InformationSubmit(this.registerForm)	
			if(code === 200){
			this.$refs.toast.show({ model: 'success', label: '提交信息成功' })
			// 延时跳转
			setTimeout(()=>{
			uni.switchTab({
			url: '/pages/home/home',
			complete:()=> {
				getPersonInfo().then((res) => {
					uni.setStorageSync('USERINFO', JSON.stringify(res.user))
				})
			}
			})				
			},800)
			}else{
			this.$refs.toast.show({ model: 'error', label: '提交信息失败' })
			}
			}catch(e){
			this.$refs.toast.show({ model: 'error', label: '提交信息失败' })
			return Promise.reject(e)
			}
			},
			//选择行业
			selectIndustry(val){
			this.registerForm.industryType = val[0].data
			},
			//选择行业
			selectEnterprise(val){
			this.registerForm.enterpriseSize = val[0].data
			}
		}
	}
</script>
v-if="!hasButton('email:button:hidden')"
<style lang="scss" scoped>
	::v-deep .px-32{
		padding-left: 0;
		padding-right: 0;
	}
	::v-deep .text-grey-lighten-1{
		font-size: 24rpx;
	}
	::v-deep .py-12{
		margin-top: 8rpx;
	}
	::v-deep .tm-input .tm-input-center .tm-input-center-input {
		height: 84rpx !important;
	}
	::v-deep .border-grey-lighten-3-a-1{
		border: none;
	}
.registerWrap{
	height: 100%;
	background-color: #fff;
	padding: 85rpx;
	.reg{
			margin-top: 200rpx;
		::v-deep .d-inline-block{
			display: block;
		}
		.logo{
			image{
			height: 60rpx;
			width:270rpx;					
			}
			margin-bottom: 30rpx;
		}
		.perfectInformation{
			font-size: 36rpx;
			font-family: $uni-ffzh;
			font-weight: normal;
			color: rgba(0,0,0,0.85);
			line-height: 42rpx;
		}
		.formWrap{
			margin-top: 50rpx;
		}
		.proportion,.industry{
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			background-color: #fafafa;
			color: #B3B3C2;
			margin-top: 20rpx;
			padding: 0 16rpx;
			height: 88rpx;
			line-height: 88rpx;
			border-radius: 8rpx;
			font-size: 24rpx;
			font-family: $uni-ffcg;
			font-weight: normal;
			.arrow{
				width: 80rpx;
				height: 63rpx;
				background: url("/static/tiAr.png") no-repeat;
				background-size: 100% 100%;
			}
		}
		.proportion{
			margin-top: 30rpx;
			margin-bottom: 30rpx;
		}
		.submit_btn{
			height: 88rpx;
			background-color: #3662EC;
			font-size: 26rpx;
			line-height: 88rpx;
			text-align: center;
			font-family: $uni-ffzh;
			font-weight: normal;
			color: #FFFFFF;
			border-radius: 8rpx;
		}
	}
}
</style>
