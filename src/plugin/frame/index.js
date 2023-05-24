/**
 * 汇总其他插件
 */
import Api from '@/api/index';
import uView from '@/uni_modules/uview-ui';
import components from '@/components';
import '@/libs/util.array.js';
import '@/filters';

export default {
  install(Vue, options) {
    // TODO 设置uni-app api 拦截器
    // 可根据实际需求再此编写拦截器逻辑
    // 把所有接口添加至Vue原型链，方便调用
    Vue.prototype.$Api = Api;
    Vue.use(components);

    // 安装uview
    Vue.use(uView);
    uni.$u.setConfig({
      config: {
        unit: 'px'
      },
      props: {
        loadmore: {
          marginBottom: 0,
          marginTop: 0,
          height: 40
        }
      }
    });
  }
};
