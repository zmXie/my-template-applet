<script>
export default {
  onLaunch: async function () {
    console.log("App Launch");
    console.log(process.env.VUE_APP_API);
    this.calcNavBarInfo()
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
  globalData: {
    //全局数据管理
    nav: {
      navHeight: 64, // 导航栏高度
      menuRight: 7, // 胶囊距右边间距
      menuBottom: 8, // 胶囊距底部间距
      menuHeight: 32, // 胶囊高度
    }
  },
  methods: {
    calcNavBarInfo() {
      uni.getSystemInfo({
        success: res => {
          let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
          // 导航栏高度 = 胶囊bottom + 胶囊距底部间距
          this.globalData.nav.navHeight = menuButtonInfo.bottom + this.globalData.nav.menuBottom;
          this.globalData.nav.menuRight = res.screenWidth - menuButtonInfo.right;
          this.globalData.nav.menuHeight = menuButtonInfo.height;
        },
        fail(err) { }
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/uni_modules/uview-ui/index.scss";
@import "./style/index.scss";
/*每个页面公共css */
</style>
