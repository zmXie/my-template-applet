<template>
  <view class="nav-bar" :style="{height:`${navHeight}px`,background,opacity}">
    <!-- 胶囊区域 -->
    <view class="capsule-box"
          :style="{height:`${menuHeight}px`, 'min-height':`${menuHeight}px`, 'line-height':`${menuHeight}px`, bottom:`${menuBottom}px`}">
      <slot>
        <view class="nav-title">{{title}}</view>
      </slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'nav-bar',
  props: {
    title: String,
    background: {
      type: String,
      default: 'linear-gradient(314deg, #0601c6 0%, #aa0ad3 100%)'
    },
    opacity: Number
  },
  data() {
    return {
      navHeight: getApp().globalData.nav.navHeight,
      menuBottom: getApp().globalData.nav.menuBottom,
      menuHeight: getApp().globalData.nav.menuHeight
    };
  }
} 
</script>    

<style lang="scss" scoped>
.nav-bar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
}
.capsule-box {
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
}
.nav-title {
  margin: 0 auto;
  text-align: center;
  font-size: 36rpx;
  font-weight: 500;
  color: #ffffff;
}
</style>
