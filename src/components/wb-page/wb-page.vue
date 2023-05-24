<template>
  <view class="wb-page">
    <slot v-if="status==='success'"></slot>
    <wb-empty v-else-if="status === 'failed'" text="加载失败" marginTop="100" allowRefresh @refresh="refresh"></wb-empty>
    <wb-empty v-else-if="status === 'empty'" marginTop="100"></wb-empty>
    <view v-if="safeBottom" class="safe-bottom-area"></view>
  </view>
</template>

<script>
export default {
  name: 'wb-page',
  props: {
    // 状态
    status: {
      type: String,
      default: 'success',
      validator(value) {
        return ['', 'success', 'failed', 'empty'].includes(value);
      }
    },
    // 底部安全距离
    safeBottom: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {

    };
  },
  mounted() {
  },
  methods: {
    refresh() {
      this.$emit('refresh');
    }
  }
};
</script>

<style lang="scss" scoped>
.wb-page {
  height: 100%;
  box-sizing: border-box;
  .safe-bottom-area {
    height: max(env(safe-area-inset-bottom), 30rpx);
  }
}
</style>