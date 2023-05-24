<template>
  <view>
    <web-view :webview-styles="webviewStyles" :src="src"></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      src: '',
      webviewStyles: {
        progress: {
          color: '#FF3333'
        }
      }
    }
  },
  onLoad(options) {
    const { type } = options;
    const basePath = `${process.env.VUE_APP_MAIN_PROJECT_LOCATION}sub_project/xg-scp-patient-manage/mlgb`;
    this.src = type == 1 ? `${basePath}/provacy.html` : `${basePath}/service.html`;
  }
}
</script>

<style>
</style>
