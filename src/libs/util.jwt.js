// 此文件可封装一些工具方法
const Base64 = require('js-base64').Base64;
import { getStorage } from './util.storage';

/**
 * 解析jwt_token
 * @param token
 */
function parseJwtToken(token) {
  try {
    let jwtArr = token.split('.');
    let jwt = {};
    jwt.header = JSON.parse(Base64.decode(jwtArr[0]));
    jwt.payload = JSON.parse(Base64.decode(jwtArr[1]));
    jwt.signature = jwtArr[2];
    jwt.token = token;
    console.log('解析jwt：', jwt);
    return jwt;
  } catch (e) {
    console.log('解析token出错' + e);
    return {};
  }
}
const token = getStorage('token') || '';
const refreshToken = getStorage('refreshToken') || '';
const data = parseJwtToken(token);

export { parseJwtToken, token, refreshToken, data };
