<template>
  <view class="page login">
    <view class="login-wraper flex-col-c-c">
      <image :src="logo" />
      <text class="title">小程序名字</text>
      <button class="circle linear" :openType="hasRead[0] ? 'getPhoneNumber' : ''" @getphonenumber="getphonenumber"
              @click="loginClick">微信手机号快捷登录</button>
      <view class="mobile-login" @click="mobileLogin">手机号登录</view>
      <u-checkbox-group v-model="hasRead" placement="row">
        <view class="flex-fs-c">
          <u-checkbox shape="circle" name="1" label="我已阅读并同意"></u-checkbox>
          <text class="clickable" @click.stop="goPrivacy(1)">《隐私协议》</text>
          <text class="clickable" @click.stop="goPrivacy(2)">《用户服务协议》</text>
        </view>
      </u-checkbox-group>
    </view>
  </view>
</template>

<script>
import { uniAuth } from '@/libs/util.auth';
export default {
  components: {},
  data() {
    return {
      logo: '',
      hasRead: []
    };
  },
  computed: {},
  onInit() { },
  onLoad() {
    this.logo = __wxConfig.accountInfo.icon;
  },
  onShow() {
    uni.hideHomeButton();
  },
  onHide() {
  },
  methods: {
    // 手机号授权登录
    getphonenumber(e) {
      const { errMsg, code: phoneCode } = e.detail;
      if (errMsg === 'getPhoneNumber:ok') {
        uniAuth.loginWx({ phoneCode, autoRegist: true }).then(() => {
          uni.switchTab({ url: '/pages/home/index' });
        });
      }
    },
    // 登录点击
    loginClick() {
      if (this.hasRead.length === 0) {
        uni.showToast({ icon: 'none', title: '请先阅读隐私协议和用户服务协议' });
      }
    },
    // 手机号登录
    mobileLogin() {
      uni.navigateTo({ url: '/pages/login/mobile-login/index' })
    },
    // 隐私协议
    goPrivacy(type) {
      uni.navigateTo({ url: `/pages/login/privacy/index?type=${type}` });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  background: white;
  .login-wraper {
    position: relative;
    top: 160rpx;
    padding: 30rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    image {
      width: 120px;
      height: 120px;
    }
    button {
      width: 520rpx;
    }
    .title {
      font-size: 36rpx;
      font-weight: 500;
      font-family: PingFang SC-Medium, PingFang SC;
      color: #222222;
      margin: 10rpx 0 40rpx;
    }
    .mobile-login {
      padding: 10rpx;
      color: $u-primary;
    }
    .clickable {
      font-size: 14px;
      line-height: 1;
      color: $u-primary;
      display: inline-block;
    }
  }
}
</style>