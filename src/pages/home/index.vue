<template>
  <view class="home">

  </view>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  components: {},
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters('app', ['appId']),
    ...mapState('jwt', ['token']),
  },
  onLoad(options) {

  },
  onShow() {
    this.refresh();
  },
  // 下拉刷新
  async onPullDownRefresh() {
    setTimeout(() => {
      uni.stopPullDownRefresh()
    }, 1000);
  },
  // 上拉加载更多
  onReachBottom() {

  },
  methods: {
    refresh() {

    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: auto;
  min-height: 100%;
}
</style>
