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
  return uni.request(config).then((arrData) => {
    console.log('请求参数：', config.method, config.url, config.data || '');
    uni.hideLoading();
    let [err, res] = arrData;
    if (res) {
      // 请求成功
      let { statusCode, data } = res;
      console.log('请求结果：', data);
      if (statusCode === 200 && data.success !== false) {
        return data;
      }
      // 业务失败相关处理
      const { code, message } = data;
      if (!config.noToast) {
        uni.showToast({ title: message || `${statusCode}：请求错误`, icon: 'none' });
      }
      // token过期 || 用户未登录，清除数据，跳转登录页面
      if (code === 'A0009' || code === 'A0008') {
        store.dispatch('user/clear');
        uni.redirectTo({ url: '/pages/login/mobile-login/index' });
      }
      return Promise.reject(res);
    } else {
      // 请求失败
      if (!config.noToast) {
        uni.showToast({ title: '网络连接失败，请稍后再试', icon: 'none' });
      }
      console.log('请求结果：', err);
      return Promise.reject(err);
    }
  }).catch((err) => {
    return Promise.reject(err);
  });
};

export default request;
