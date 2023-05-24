<template>
  <wb-page :status="pageStatus" @refresh="autoLogin">

  </wb-page>
</template>

<script>
import { uniAuth } from '@/libs/util.auth';
import { mapGetters } from 'vuex'
export default {
  components: {},
  data() {
    return {
      pageStatus: '',
    };
  },
  computed: {
    ...mapGetters('app', ['appId']),
  },
  onInit() {

  },
  onLoad(options = {}) {
    console.log('启动页面参数：', options);
    this.autoLogin();
  },
  onShow() { },
  methods: {
    async autoLogin() {
      try {
        // 静默登录
        await uniAuth.loginWx();
        uni.switchTab({ url: '/pages/home/index' });
      } catch (error) {
        // 登录失败，清除用户信息
        this.$store.dispatch('user/clear');
        // 跳转登录页面
        uni.redirectTo({ url: '/pages/login/index' });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>