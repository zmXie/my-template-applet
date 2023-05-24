import { dateFormat } from '@/libs/util.format';

// 填充空
function emptyFill(value) {
  return value || '无';
}
// 金钱格式
function money(value) {
  if (value) {
    return `￥${Number(value).toFixed(2)}`;
  } else {
    return '￥0.00';
  }
}
// 手机号脱敏
function phoneEncrypt(value) {
  value = String(value);
  return value.replace(/^(\d{3})\d*(\d{4})$/g, '$1****$2');
}
// 性别
function sex(value) {
  if (value == 'MEN') {
    return '男';
  } else if (value == 'WOMEN') {
    return '女';
  } else {
    return '';
  }
}
// 截取10位，超过...
function maxLength(value, length = 10) {
  if (value) {
    if (value.length > length) {
      return value.substring(0, length) + '...';
    }
    return value;
  } else {
    return '-';
  }
}

export { emptyFill, money, phoneEncrypt, sex, maxLength, dateFormat };
