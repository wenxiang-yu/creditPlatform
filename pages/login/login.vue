<template>
	<view id="login_wrap">
		<view class="main">
			<view class="center">
			<view class="logo">
				<!-- <image src="../../static/gutu.png" mode="aspectFit"></image> -->
			</view>
			<view class="login">
				<view class="title">{{accountStatus === 0 ? '登录' : '注册'}}</view>
				<view class="refi" v-if="accountStatus === 1">
				  手机号注册
				</view>
				<tm-form ref="formData">
					<tm-input
						class="input"
						placeholder="请输入手机号"
						v-model="formData.phonenumber"
					></tm-input>
					<view class="verificationCode">
						<view class="model" v-if="timer < 60 && !captcha"> </view>
						<tm-input
							class="input"
							placeholder="请输入验证码"
							style="margin-right: 3px"
							v-model="formData.verifyCode"
							:maxlength="6"
						></tm-input>
						<tm-button
							style="margin-top: 19rpx"
							size="n"
							@click="getVerificationCode"
							:disabled="timer === 60 && captcha ? false : true"
							>{{ timer === 60 ? '获取验证码' : timer }}</tm-button
						>
					</view>
					<tm-button style="margin-top: 30rpx" block @click.stop="loginTo"
						>{{accountStatus === 0 ? '登录' : '免费注册'}}</tm-button
					>
				</tm-form>
				<view class="reading">
					<checkbox-group @change="checkboxChange">
						<checkbox :checked="checked" /><text
							>阅读并同意<a
								href="https://portal.valuemap.cn/sm-agreement/index.html"
								>《用户协议》</a
							>和<a
								href="https://portal.valuemap.cn/aivisit-agreement/private_agreement_v1.0_20211201.html"
								>《个人信息保护政策》</a
							></text
						>
					</checkbox-group>
				</view>
			<view class="acount_status">
				<text>{{accountStatus === 0 ? '没' : '已'}}有账号？</text>
				<text class="sts" @click="register">{{accountStatus === 0 ? '注册' : '登录'}}</text>
			</view>	
			</view>				
			</view>

		</view>
		<!-- 提示框-->
		<tm-message ref="toast"></tm-message>
	</view>
</template>

<script>
import { sendLoginSms, verifyLogin, getPersonInfo } from '@/api/login.js'
import { mapState, mapMutations } from 'vuex'
import store from '../../store'
import loginVue from './login.vue'
export default {
	name: 'LoginPage',
	data() {
		return {
			accountStatus:0, //账号状态
			captcha: true,
			checked: false,
			formData: {
				phonenumber: '', //手机号码
				verifyCode: '', //验证码
			},
			timer: 60,
		}
	},
	watch: {
		accountStatus(val) {
			//登录为0；注册为1
			let navtitle=""
			if(val=== 0){
			navtitle = "登录"
			}else{
			navtitle = "注册"
			}
			uni.setNavigationBarTitle({
				title: navtitle
			});
		}
	},
	methods: {
		...mapMutations(['addToken']),
		// 获取验证码
		getVerificationCode() {
			if (!this.captcha) return
			this.captcha = false
			this.countdown()
			let reg =
				/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
			if (this.formData.phonenumber === '')
				return this.$refs.toast.show({
					model: 'error',
					label: '手机号码不能为空',
				})
			if (!reg.test(this.formData.phonenumber)) {
				return this.$refs.toast.show({
					model: 'error',
					label: '手机号码格式不正确',
				})
			}
			sendLoginSms({ phonenumber: this.formData.phonenumber }).then((res) => {
				if (res.code === 200) {
					this.$refs.toast.show({ model: 'success', label: '发送验证码成功' })
				} else {
					this.$refs.toast.show({ model: 'error', label: '发送验证码失败' })
				}
			})
		},
		// 登录
		async loginTo() {
			let reg =
				/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
			if (this.formData.phonenumber === '')
				return this.$refs.toast.show({
					model: 'error',
					label: '手机号码不能为空',
				})
			if (!reg.test(this.formData.phonenumber))
				return this.$refs.toast.show({
					model: 'error',
					label: '手机号码格式不正确',
				})
			if (this.formData.verifyCode === '')
				return this.$refs.toast.show({
					model: 'error',
					label: '验证码不能为空',
				})
			if (!this.checked)
				return this.$refs.toast.show({
					model: 'error',
					label: '请先阅读并勾选协议',
				})
			const { code, data } = await verifyLogin(this.formData)
			switch (this.accountStatus){
				case 0:
				// 登录
				if (code == 200) {
					this.addToken(data.access_token)
					uni.switchTab({
					url: '/pages/home/home',
					complete: () => {
						this.$refs.toast.show({ model: 'success', label: '登录成功' })
						getPersonInfo().then((res) => {
							store.commit("changeButtonList",res.permissions);
							uni.setStorageSync('USERINFO', JSON.stringify(res.user))
						})
					},
					})
				} else {
					this.$refs.toast.show({ model: 'error', label: '登录失败' })
				}
				break;
				case 1:
				//注册
				// 已注册
				if(code === 200){
				 this.addToken(data.access_token)
				 uni.switchTab({
				 url: '/pages/home/home',
				 complete: () => {
				 	this.$refs.toast.show({ model: 'success', label: '登录成功' })
				 	getPersonInfo().then((res) => {
						// 存储按钮权限标识
						store.commit("changeButtonList",res.permissions);
						// 存储用户信息
				 		uni.setStorageSync('USERINFO', JSON.stringify(res.user))
				 	})
				 },
				 })
				 //未注册
				}else if(code === 601){
				    this.addToken(data.access_token)
					uni.navigateTo({
						url:"/pages/register/register"
					})
				}else{
					this.$refs.toast.show({ model: 'error', label: '登录失败' })
				}			
			}


		},
		// 以下辅助函数模块————————————————————————————————————————————————————————————————————————————
		// 倒计时效果
		countdown() {
			let times = setTimeout(() => {
				clearTimeout(times)
				this.timer = this.timer - 1
				if (this.timer === 0) {
					this.captcha = true
					return (this.timer = 60)
				}
				this.countdown()
			}, 1000)
		},
		// 复选框是否被选中,定义状态
		checkboxChange() {
			this.checked = !this.checked
		},
		//跳转注册页
		register(){
			if(this.accountStatus === 0){
				this.accountStatus = 1
			}else{
				this.accountStatus = 0
			}

		}
	},
}
</script>

<style scoped lang="scss">
#login_wrap {
	background-color: #fff;
	height: 100%;
	// 头部区域
	.headers {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 92rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, sans-serif;
		font-weight: normal;
		color: #000000;
		line-height: 45rpx;
	}
	// 主体区域
	.main {
		height: 100%;
		display: flex;
		align-items: center;
		// logo图标
		.center{
		padding: 0rpx 85rpx 30%;
		.logo {
			margin: 40rpx 0 30rpx 0;
			height: 60rpx;
			image {
				height: 60rpx;
				width: 270rpx;
			}
		}
		// 登录容器
		.login {
			.title {
				font-size: 36rpx;
				font-family: $uni-ffzh;
				font-weight: normal;
				color: rgba(0, 0, 0, 0.85);
				line-height: 50rpx;
				margin-bottom: 60rpx;
			}
			.refi{
				font-size: 24rpx;
				font-family: $uni-ffcg;
				font-weight: normal;
				color: rgba(0,0,0,0.6);
				line-height: 28rpx;
			}
			.input {
				margin-top: 30rpx;
				height: 88rpx;
				border-radius: 12rpx 12rpx 12rpx 12rpx !important;
				background-color: #f3f3f7 !important;
			}
			.verificationCode {
				position: relative;
				display: flex;
				::v-deep .tm-button .tm-button-btn uni-button .tm-button-label {
					color: #fff;
				}
				.model {
					position: absolute;
					z-index: 20;
					right: 10rpx;
					top: 28rpx;
					width: 240rpx;
					height: 88rpx;
					border-radius: 11rpx;
					background-color: rgba(0, 0, 0, 0.2);
				}
			}
			.reading {
				margin-top: 20rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: normal;
				color: #333333;
				a {
					text-decoration: none;
					color: #155bd5;
				}
			}
			.acount_status{
				margin-top: 40rpx;
				font-size: 26rpx;
				font-family: $uni-ffcg;
				font-weight: normal;
				color: #333333;
				line-height: 32rpx;
				text-align: center;
				.sts{
					color: #3662EC;
				}
			}
			::v-deep .primary {
				background-color: #2888e8 !important;
				height: 88rpx !important;
			}
		}			
		}

	}
}
</style>
