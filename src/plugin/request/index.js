// 数据请求封装
import store from '@/store';
import qs from 'qs';

const HOST = process.env.VUE_APP_API;

const queryString = (data) => {
  let urlQueryString = qs.stringify(data, {
    addQueryPrefix: true,
    allowDots: true,
    arrayFormat: 'repeat'
  });
  return urlQueryString;
};

/**
 * 通用请求
 * @param config
 * @param config.needAuth 是否需要授权 默认为true, 如果特殊需要非授权，则可设置为false
 * @param config.isHideLoading 是否隐藏loading 默认为false, 如果不需要自动显示loading，则可设置为true
 * @return {Promise<T>}
 */
const request = function (config = {}) {
  let url = config.url || '';
  config.timeout = 20000;
  // 如果非完整地址，自动补充域名
  if (!(url.indexOf('http://') === 0 || url.indexOf('https://') === 0)) {
    config.url = `${HOST}${url}`;
  }
  config.header = config.header || {};
  // 处理请求头
  if (!config.header['Content-Type']) {
    config.header['Content-Type'] = 'application/json; charset=utf-8';
  }
  // 添加token
  if (config.needAuth !== false && store.state.jwt.token) {
    config.header['Authorization'] = store.state.jwt.token;
  }
  // 凭借参数到url
  if (config.params) {
    config.url = config.url + queryString(config.params);
    config.params = null;
  }
  // 添加loading
  if (!config.isHideLoading) {
    uni.showLoading({ title: '请稍等...', mask: true });
  }
  return uni
    .request(config)
    .then((arrData) => {
      uni.hideLoading();
      let [err, res] = arrData;
      let { statusCode, data } = res;
      console.log('请求参数：', config.method, config.url, config.data || '');
      console.log('请求结果：', data);

      // 可根据接口逻辑进行调整
      if (statusCode === 200 && data.success !== false) {
        return data;
      }
      return Promise.reject(res);
    })
    .catch((res) => {
      uni.hideLoading();
      let { data, statusCode, code } = res;
      if (!config.noToast) {
        uni.showToast({ title: data.message || `${statusCode}：请求错误`, icon: 'none' });
      }
      if (code === '9992' || code === '2005') {
        // token过期，清除数据，跳转登录页面
        store.dispatch('user/clear');
        uni.redirectTo({ url: '/pages/login/index' });
      }
      return Promise.reject(data);
    });
};

export default request;
