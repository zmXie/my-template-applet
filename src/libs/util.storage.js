const PROJECT = 'mlwb';

/**
 * @description 存储数据
 * @param key
 * @param value
 * @param sync true：同步，false：异步
 */
export function setStorage(key, value = '', sync = true) {
  let new_key = PROJECT + '-' + key;
  let data = JSON.stringify(value);
  if (sync) {
    uni.setStorageSync(new_key, data);
  } else {
    uni.setStorage({ key: new_key, data });
  }
}
/**
 * @description 获取本地数据
 * @param key
 * @param value
 * @param sync true：同步，false：异步
 */
export function getStorage(key, sync = true, success) {
  let new_key = PROJECT + '-' + key;
  if (sync) {
    let json = uni.getStorageSync(new_key);
    return safeJsonParse(json);
  } else {
    uni.getStorage({
      key: new_key,
      success: function (res) {
        let data = safeJsonParse(res.data);
        success && success(data);
      }
    });
  }
}
/**
 * @description 移除本地数据
 * @param key
 * @param value
 * @param sync true：同步，false：异步
 */
export function removeStorage(key, sync = true) {
  let new_key = PROJECT + '-' + key;
  if (sync) {
    uni.removeStorageSync(new_key);
  } else {
    uni.removeStorage({ key: new_key });
  }
}
// 安全解析json
function safeJsonParse(data) {
  if (data && data !== 'undefined') {
    try {
      return JSON.parse(data);
    } catch (e) {
      return null;
    }
  } else {
    return null;
  }
}
