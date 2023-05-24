import request from '@/plugin/request';

export default {
  // 发送验证码
  sendSmsCode: (params = {}) => request({ method: 'POST', url: 'scp-basic/sms/open/v2/sendSmsCode', params }),
  // 获取七牛上传凭证
  geQiniuToken: (data = {}) => request({ method: 'POST', url: 'scp-basic/qiniu/getQiniuToken', data })
};
