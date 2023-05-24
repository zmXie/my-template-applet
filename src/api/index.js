/**
 * 接口文件合并
 */
const files = require.context('./modules', false, /\.js$/);
const modules = {};

files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
});

export default {
  ...modules
};