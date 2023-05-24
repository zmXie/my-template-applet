<template>
  <view class="wb-empty">
    <u-empty :mode="mode" :text="text" :marginTop="marginTop" :icon="require('../../static/img/common/empty.png')" width="117">
      <slot>
        <view class="btn-wraper">
          <u-button v-if="allowRefresh" shape="circle" text="请重试" @click="$u.debounce(refresh, 300)"></u-button>
        </view>
      </slot>
    </u-empty>
  </view>
</template>

<script>
export default {
  name: 'wb-empty',
  props: {
    // 模式
    mode: {
      type: String,
      default: 'data'
    },
    // 文字描述
    text: {
      type: String,
      default: '暂无数据'
    },
    // 上间距
    marginTop: [Number, String],
    // 允许刷新
    allowRefresh: Boolean
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
.wb-empty {
  .btn-wraper {
    margin-top: 10px;
  }
  padding: 40rpx;
}
</style>