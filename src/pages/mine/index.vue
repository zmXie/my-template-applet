<template>
  <view class="page">
    <wb-navbar title="我的"></wb-navbar>
    <view class="group-wraper">
      <u-cell icon="question-circle" title="关于我们" isLink url="" @click="goDetail"></u-cell>
      <u-cell icon="info-circle" title="退出登录" isLink url="" @click="logout"></u-cell>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
export default {
  components: {},
  data() {
    return {

    };
  },
  computed: {
    ...mapState('user', ['record']),
    ...mapGetters('app', ['appId']),
  },
  onLoad(options) {

  },
  onShow() { },
  methods: {
    goDetail() {
      uni.showToast({ title: '即将上线，敬请期待', icon: 'none' });
    },
    // 退出登录
    async logout() {
      uni.showModal({
        title: '退出登录',
        content: '确定退出登录吗？',
        success: async (res) => {
          if (res.cancel) return;
          await this.$Api.auth.loginOut();
          this.$store.dispatch('user/clear');
          uni.redirectTo({ url: '/pages/login/index' });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.group-wraper {
  background: #ffffff;
  border-radius: 16rpx;
  margin: 0 30rpx 30rpx;
  position: relative;
  top: -66rpx;
  overflow: hidden;

  ::v-deep .u-cell__body {
    padding: 30rpx;
  }
}
</style>
