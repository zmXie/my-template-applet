import dayjs from 'dayjs';
// 请求参数转换
export function queryString(data) {
  const str = [];
  for (const key in data) {
    str.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
  }
  return str.join('&');
}

// 时间格式化函数（value：时间戳，format：格式）
export function dateFormat(value, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!value) return '';
  return dayjs(value).format(format);
}
/* ------------ Currency ------------- */

// 转换为千分制
export function toThousand(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}
