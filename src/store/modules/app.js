/**
 * app全局操作或数据
 */
import { setStorage, getStorage, removeStorage } from '@/libs/util.storage';
import Api from '@/api';
export default {
  namespaced: true,
  state: {
    appId: '', // 小程序appid
    launched: getStorage('launched') // 是否已启动过
  },
  getters: {
    appId: (state) => {
      let appId = state.appId;
      if (!state.appId) {
        appId = getMiniAppId();
      }
      return appId;
    },
    launched: (state) => state.launched
  },
  actions: {},
  mutations: {
    SET_VALUE_BY_KEY(state, { key, value, cache = true }) {
      state[key] = value;
      if (cache) {
        setStorage(key, value);
      }
    },
    REMOVE_STATE_BY_KEY(state, { key, value }) {
      state[key] = null;
      removeStorage(key);
    }
  }
};

/**
 * 获取小程序APPID
 * @returns
 */
function getMiniAppId() {
  const {
    miniProgram: { appId }
  } = uni.getAccountInfoSync();
  return appId;
}
