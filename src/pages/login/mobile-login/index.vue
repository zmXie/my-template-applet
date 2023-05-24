<template>
  <view class="page mobile-login">
    <u--form labelPosition="left" :model="form" labelWidth="65" ref="form">
      <u-form-item required label="手机号" prop="mobile" borderBottom>
        <u--input v-model="form.mobile" type="number" placeholder="请输入手机号" border="none"></u--input>
      </u-form-item>
      <u-form-item required label="验证码" prop="smsCode" borderBottom>
        <u-input v-model="form.smsCode" :focus="smsCodeFocus" type="number" placeholder="请输入验证码" border="none">
          <template slot="suffix">
            <u-code ref="uCode" @change="tips = $event" seconds="120" keepRunning></u-code>
            <u-button @tap="getCode" :text="tips" type="success" size="mini" :disabled="tips!=='获取验证码' && tips!=='重新获取'"></u-button>
          </template>
        </u-input>
      </u-form-item>
      <u-checkbox-group v-model="hasRead" placement="row">
        <view class="flex-fs-c">
          <u-checkbox shape="circle" name="1" label="我已阅读并同意"></u-checkbox>
          <text class="clickable" @click.stop="goPrivacy(1)">《隐私协议》</text>
          <text class="clickable" @click.stop="goPrivacy(2)">《用户服务协议》</text>
        </view>
      </u-checkbox-group>
      <button class="circle linear" @click="submit">登录</button>
      <view class="tips">未注册的手机号将自动注册并登录</view>
    </u--form>
  </view>
</template>

<script>
import { uniAuth, uniFailToast } from '@/libs/util.auth';
export default {
  components: {},
  data() {
    return {
      tips: '',
      smsCodeFocus: false,
      form: { mobile: '', smsCode: '' },
      hasRead: false
    };
  },
  computed: {
  },
  onLoad(options) {

  },
  onShow() { },
  onReady() {
    // 填充校验规则
    this.$refs.form.setRules({
      mobile: [
        {
          required: true,
          validator: (rule, value, callback) => {
            if (!value) return callback(new Error('请输入手机号'));
            if (!this.$u.test.mobile(value)) return callback(new Error('请输入正确的手机号'));
            return callback();
          }
        }
      ],
      smsCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
    });
  },
  methods: {
    // 获取验证码
    getCode() {
      if (!this.$refs.uCode.canGetCode) return;
      this.$refs.form.validateField('mobile', async (err) => {
        if (err?.length > 0) {
          uniFailToast(err[0].message);
        } else {
          const { mobile } = this.form;
          await this.$Api.basic.sendSmsCode({ bizType: 'LC_CON_MANAGE', type: 'CODE_LOGIN', userTag: 'CON', mobile });
          this.$refs.uCode.start();
          this.smsCodeFocus = true;
        }
      });
    },
    // 提交
    submit() {
      this.$refs.form.validate().then(async (res) => {
        if (!this.hasRead[0]) {
          uni.showToast({ icon: 'none', title: '请先阅读隐私协议和用户服务协议' });
          return;
        }
        await uniAuth.loginUseSmsCode({ ...this.form, autoRegist: true });
        uni.switchTab({ url: '/pages/home/index' });
      }).catch((err) => {
        if (err?.length > 0) {
          uniFailToast(err[0].message);
        }
      });
    },
    // 隐私协议
    goPrivacy(type) {
      uni.navigateTo({ url: `/pages/login/privacy/index?type=${type}` });
    }
  }
};
</script>

<style lang="scss" scoped>
.mobile-login {
  background: white;
  padding: 30rpx;
  button {
    margin-top: 60rpx;
    width: 520rpx;
  }
  .tips {
    margin-top: 6rpx;
    font-size: 28rpx;
    color: #555;
    text-align: center;
  }
  .clickable {
    font-size: 14px;
    line-height: 1;
    color: $u-primary;
    display: inline-block;
  }
}
</style>