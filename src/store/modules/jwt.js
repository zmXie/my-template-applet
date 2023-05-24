/**
 * 此文件用于处理token相关操作
 */
import { parseJwtToken, token, refreshToken, data } from '@/libs/util.jwt.js';
import { setStorage } from '@/libs/util.storage';
import Api from '@/api';

export default {
  namespaced: true,
  state: {
    // jwt token
    token,
    // 刷新token
    refreshToken,
    // jwt 格式化数据
    data
  },
  actions: {
    /**
     * @description 设置解析jwtToken
     * @param {Object} context
     * @param {object} info {jwtTokenStr}
     */
    set({ state, dispatch }, { token, refreshToken }) {
      return new Promise(async (resolve) => {
        state.token = token;
        state.refreshToken = refreshToken;
        state.data = parseJwtToken(token);
        setStorage('token', token);
        setStorage('refreshToken', refreshToken);
        // 将jwt中的用户数据，统一设置到user模块中
        dispatch('user/load', state.data.payload, { root: true });
        resolve();
      });
    },
    /**
     * 刷新token
     * @param state
     * @param dispatch
     * @return {Promise<unknown>}
     */
    refresh({ state, dispatch }) {
      return new Promise(async (resolve, reject) => {
        const { refreshToken } = state;
        if (!refreshToken) {
          return reject();
        }
        Api.auth
          .refreshToken({ refreshToken })
          .then((data) => {
            if (data && data.success && data.value) {
              dispatch('set', data.value);
              resolve();
            } else {
              reject();
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    /**
     * 清除jwt
     * @param state
     * @param dispatch
     * @return {Promise<unknown>}
     */
    clear({ state, dispatch, commit }) {
      return new Promise(async (resolve) => {
        commit('clearJwtInfo');
        resolve();
      });
    }
  },
  getters: {},
  mutations: {
    /**
     * 清除缓存token信息
     */
    clearJwtInfo(state) {
      state.data = {};
      state.token = null;
      state.refreshToken = null;
      uni.removeStorageSync('mlwb-token');
      uni.removeStorageSync('mlwb-refreshToken');
    }
  }
};
