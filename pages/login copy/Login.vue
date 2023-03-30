<template>
  <view class="background">
    <view class="bg"></view>
    <img class="img" src="../../static/login/logo.png" alt="" srcset="" />
    <span class="text1">滴灌链中国行业信息系统</span>
    <span class="text2"
      >Micro Connect Chain - China Industry Information System (MCC-CIIS)</span
    >
    <uni-forms
      class="form"
      :modelValue="formData"
      :label-width="100"
      :label-align="'center'"
    >
      <uni-forms-item label="账号" name="name">
        <uni-easyinput
          class="ipt"
          type="text"
          :focus="name"
          v-model="formData.name"
          placeholder="请输入账号"
        />
      </uni-forms-item>
      <uni-forms-item name="password" label="密码">
        <uni-easyinput
          class="ipt"
          type="password"
          :focus="password"
          v-model="formData.password"
          placeholder="请输入密码"
        />
      </uni-forms-item>
    </uni-forms>
    <button class="btn" @click="login">登录</button>
  </view>
</template>

<script>
import { login } from "../../api/Login.js";
export default {
  data() {
    return {
      formData: {
        //表单数据
        name: null, //账号
        password: null, //密码
      },
      name: false,
      password: false,
    };
  },
  methods: {
    login() {
      if (!this.formData.name) {
        uni.showToast({
          icon: "error",
          title: "账号不能为空",
        });
        this.name = true;
        return;
      }
      if (!this.formData.password) {
        uni.showToast({
          icon: "error",
          title: "密码不能为空",
        });
        this.password = true;

        return;
      }
      uni.showLoading({
        title: "加载中",
        mask: true,
      });
      login(this.formData).then((res) => {
        uni.setStorageSync("Token", res.data.token);
        uni.hideLoading();
        uni.redirectTo({
          url: "../index/index",
        });
      });
    },
  },
};
</script>

<style lang="less">
.background {
  background-color: #002131;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  .bg {
    height: 44px;
    width: 100vw;
    background-color: #002131;
  }

  .img {
    width: 249rpx;
    height: 120rpx;
  }

  .text1 {
    font-size: 40rpx;
    font-weight: 500;
    color: #ffffff;
    line-height: 56rpx;
    margin: 36rpx 0 10rpx 0;
  }

  .text2 {
    font-size: 20rpx;
    font-weight: 500;
    color: #ffffff;
    line-height: 28rpx;
    margin-bottom: 69rpx;
  }
  .form {
    width: 670rpx;
    .uni-forms-item {
      width: 670rpx;
      height: 96rpx;
      background: rgba(185, 231, 252, 0.12);
      border: 1rpx solid #00ce9e;
      margin-bottom: 20rpx;
      .uni-forms-item__box {
        height: 96rpx;
      }
      ::v-deep .uni-forms-item__label {
        width: 80rpx;
        height: 96rpx;
        .label-text {
          font-size: 34rpx;
          font-weight: 400;
          color: #ffffff;
          line-height: 48rpx;
        }
      }
      ::v-deep .uni-forms-item__content {
        width: 100rpx;
        height: 96rpx;
        .uni-easyinput__content {
          width: 100%;
          height: 96rpx;
          border: none;

          input,
          .uni-input-placeholder {
            font-size: 34rpx;
            font-weight: 400;
            color: #cccccc;
            line-height: 48rpx;
          }
        }
      }
      ::v-deep .uni-icons {
        font-size: 34rpx !important;
      }
    }
  }
  .btn {
    margin-top: 20rpx;
    width: 670rpx;
    height: 98rpx;
    background: #00ce9e;
    border-radius: 8rpx;
    font-size: 36rpx;
    font-weight: 400;
    color: #ffffff;
    line-height: 98rpx;
  }
}
</style>
