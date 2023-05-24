/**
 * 用户信息相关的全局操作或数据
 */
// import basicApi from '@/api/modules/basic';

import { data } from '@/libs/util.jwt.js';
import dpApi from '@/api/modules/dp';

export default {
  namespaced: true,
  state: {
    // 用户信息（从token解析出来的信息）
    userInfo: data?.payload || {},
    // 用户档案
    record: {}
  },
  actions: {
    /**
     * @description 设置用户数据
     * @param {Object} context
     * @param {*} userInfo userInfo
     */
    load({ state, commit }, userInfo) {
      return new Promise(async (resolve) => {
        if (!userInfo) {
          // 请求微信用户信息
          // userInfo = await basicApi.getWxUserInfo()
        }
        state.userInfo = userInfo;
        resolve();
      });
    },
    /**
     * @description 设置用户数据
     * @param {Object} context
     * @param {*} userInfo userInfo
     */
    loadRecord({ state, commit }, appid) {
      return new Promise(async (resolve, reject) => {
        try {
          // 获取用户基础信息
          const value = await dpApi.getDefaultRecord({ appid });
          if (value?.itemId) {
            state.record = value;
          }
          resolve();
        } catch (error) {
          reject();
        }
      });
    },
    /**
     * @description 清除用户数据
     * @param state
     * @param dispatch
     * @returns {Promise}
     */
    clear({ state, dispatch }) {
      return new Promise(async (resolve) => {
        state.userInfo = {};
        state.record = {};
        // 清空jwt
        await dispatch('jwt/clear', {}, { root: true });
        // end
        resolve();
      });
    }
  },
  mutations: {}
};
