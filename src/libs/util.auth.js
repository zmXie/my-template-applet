import store from '@/store';
import authApi from '@/api/modules/auth';

const promisify = function (fn) {
  // promisify返回一个函数，这个函数可以接受一个arg参数
  // arg默认是空对象，因为微信小程序api都是接受一个对象参数的
  return function (arg = {}) {
    // 该参数执行后，返回一个promise对象
    return new Promise((resolve, reject) => {
      // 给参数加上success和fail
      arg.success = function (res) {
        resolve(res);
      };
      arg.fail = function (fail) {
        reject(fail);
      };
      // 执行fn
      fn(arg);
    });
  };
};

/**
 * uni接口promise化
 */
const uniGetSetting = promisify(uni.getSetting);
const uniAuthorize = promisify(uni.authorize);
const uniOpenSetting = promisify(uni.openSetting);

// 获取用户地理位置
export const uniGetLocation = promisify(uni.getLocation);
export const uniOpenLocation = promisify(uni.openLocation);

export const uniShowModal = promisify(uni.showModal);
export const uniSuccessToast = (title = '') => uni.showToast({ title, icon: 'success' });
export const uniFailToast = (title = '') => uni.showToast({ title, icon: 'none' });

/**
 * 微信授权列表
 */
const authList = {
  userInfo: {
    title: '需要使用你的用户信息',
    content: '需要使用你的用户信息，请确认授权',
    apiName: ['getUserInfo']
  },
  userLocation: {
    title: '请求授权当前位置',
    content: '需要获取您的地理位置，请确认授权',
    apiName: ['getLocation', 'chooseLocation']
  },
  address: {
    title: '需要使用你的通讯地址',
    content: '需要使用你的通讯地址，请确认授权',
    apiName: ['chooseAddress']
  },
  invoiceTitle: {
    title: '需要使用你的发票抬头',
    content: '需要使用你的发票抬头，请确认授权',
    apiName: ['chooseInvoiceTitle']
  },
  invoice: {
    title: '需要获取你的发票',
    content: '需要获取你的发票，请确认授权',
    apiName: ['chooseInvoice']
  },
  werun: {
    title: '需要获取你的微信运动数据',
    content: '需要获取你的微信运动数据，请确认授权',
    apiName: ['getWeRunData']
  },
  writePhotosAlbum: {
    title: '请求授权相册',
    content: '需要使用你的相册，请确认授权',
    apiName: ['saveImageToPhotosAlbum', 'saveVideoToPhotosAlbum']
  }
};

/**
 * @description: 返回值中只会出现小程序已经向用户请求过的权限
 * @param {String} 权限名称
 * @return {Boolean} 是有拥有权限
 * 文档：https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html
 */
const getAuth = (key) => {
  if (typeof key === 'string' && !authList[key]) return false;
  return new Promise(async (resolve) => {
    const { errMsg, authSetting } = await uniGetSetting();
    console.log({ 微信授权列表: authSetting, errMsg });
    const isAuth = authSetting[`scope.${key}`];
    if (isAuth) {
      // 已授权
      resolve();
    } else if (isAuth === undefined) {
      // 未授权
      try {
        const res = await uniAuthorize({ scope: `scope.${key}` });
        uniSuccessToast('授权成功');
        console.log('授权成功： ', res);
        resolve(res);
      } catch (err) {
        // 引导去授权页
        showSetting(key).then(() => resolve());
      }
    } else if (isAuth === false) {
      // 拒绝授权
      // 引导去授权页
      showSetting(key).then(() => resolve());
    }
  });
};

/**
 * @description: 引导去授权设置页面
 * @param {String} 权限名称
 * @return {Boolean} 是有拥有权限
 */
const showSetting = (key) => {
  return new Promise(async (resolve) => {
    const { confirm, cancel } = await uniShowModal({
      title: authList[key].title,
      content: authList[key].content
    });
    if (confirm) {
      try {
        const { authSetting } = await uniOpenSetting();
        if (authSetting[`scope.${key}`] === true) {
          uniSuccessToast('授权成功');
          resolve();
        } else {
          uniFailToast('授权失败');
        }
      } catch (err) {
        uniFailToast('授权失败');
      }
    } else if (cancel) {
      uniFailToast('授权失败');
    }
  });
};

/**
 * 获取微信用户信息
 * @returns
 */
function getUserProfile() {
  return new Promise((resolve, reject) => {
    //#ifdef MP-WEIXIN
    wx.getUserProfile({
      desc: '获取用户信息',
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        console.log(err);
        reject(new Error(err?.errMsg || '获取用户信息失败'));
      },
      complete: () => {}
    });
    //#endif
  });
}

/**
 * 获取登录凭证
 * @param {*} provider
 * @returns
 */
function getCode(provider = 'weixin') {
  return new Promise((resolve, reject) => {
    uni.login({
      provider,
      onlyAuthorize: true,
      success: function ({ code }) {
        if (code) {
          resolve(code);
        } else {
          reject(new Error('获取code失败'));
        }
      },
      fail: function (err) {
        reject(new Error(err?.errMsg || '获取code失败'));
      }
    });
  });
}

/**
 * 登录微信
 * @param {*}
 * @returns
 */
function loginWx(params = {}) {
  return new Promise(async (resolve, reject) => {
    //#ifdef MP-WEIXIN
    try {
      // 获取小程序APPID
      const appid = store.getters['app/appId'];
      // 获取微信登录code
      let code = await getCode();
      // 手机号登录
      let { value } = await authApi.loginWxNoUnionid({
        appid,
        code,
        autoRegist: false,
        bizType: 'LC_CON_MANAGE',
        loginClientType: 'MINIPROGRAM', // 登录客户端类型 (PC:PC端; APP:APP端; H5:H5; MINIPROGRAM:小程序)
        userTag: 'CON', // 用户标签 (EMP:企业员工; CON:消费者) = ['EMP', 'CON']
        ...params
      });
      if (!value) {
        reject(new Error('登录失败'));
        return;
      }
      await handleLoginSuccess(value);
      resolve(value);
    } catch (err) {
      reject(err);
    }
    //#endif
  });
}

// 手机号验证码登录
function loginUseSmsCode(params = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      // 手机号登录
      let { value } = await authApi.loginUseSmsCode({
        autoRegist: true,
        bizType: 'LC_CON_MANAGE',
        loginClientType: 'MINIPROGRAM', // 登录客户端类型 (PC:PC端; APP:APP端; H5:H5; MINIPROGRAM:小程序)
        userTag: 'CON', // 用户标签 (EMP:企业员工; CON:消费者) = ['EMP', 'CON']
        ...params
      });
      if (!value) {
        reject(new Error('登录失败'));
        return;
      }
      await handleLoginSuccess(value);
      resolve(value);
    } catch (err) {
      reject(err);
    }
    //#endif
  });
}

// 登录成功处理
async function handleLoginSuccess(value) {
  const { token, refreshToken } = value;
  // 存储token
  await store.dispatch('jwt/set', { token, refreshToken });
  // 绑定关系
  await store.dispatch('app/addDoctorEmpRelate');
  // 查询档案资料
  const appid = store.getters['app/appId'];
  await store.dispatch('user/loadRecord', appid);
}

export const uniAuth = {
  // 获取用户信息
  getUserProfile,
  // 微信授权
  loginWx,
  // 手机号登录
  loginUseSmsCode,
  // 获取用户授权设置
  getAuth
};
