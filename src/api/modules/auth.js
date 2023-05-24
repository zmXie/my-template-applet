/**
 * 授权微服务接口
 * 一个微服务的接口封装在一起
 * url 默认不用传域名，开始不加斜杠 /
 */
import request from '@/plugin/request';
export default {
  // 微信小程序登录(去除unionid获取用户逻辑)
  loginWxNoUnionid: (data = {}) =>
    request({ method: 'POST', url: `scp-auth/auth2/loginWxNoUnionid`, data, needAuth: false, noToast: !data.autoRegist }),
  // 微信小程序登录
  loginWx: (data = {}) => request({ method: 'POST', url: `scp-auth/auth2/loginWx`, data, needAuth: false, noToast: !data.autoRegist }),
  // 手机号登录
  loginUseSmsCode: (data = {}) => request({ method: 'POST', url: `scp-auth/auth2/loginUseSmsCode`, data, needAuth: false }),
  // 退出
  loginOut: (params = {}) => request({ method: 'GET', url: `scp-auth/auth2/loginout`, params }),
  // 刷新token
  refreshToken: (params = {}) => request({ method: 'POST', url: `scp-auth/auth2/refreshToken`, params })
};
