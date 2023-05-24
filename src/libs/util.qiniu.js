import dayjs from 'dayjs';
import basicApi from '@/api/modules/basic';

// 上传七牛
let index = 0;
function uploadQiniu(val, file) {
  return new Promise((resolve, reject) => {
    index++;
    uni.uploadFile({
      url: 'https://up.qbox.me/', //仅为示例，非真实的接口地址
      filePath: file,
      name: 'file',
      formData: {
        token: val.uploadToken,
        key: `image/scale/${dayjs().format('YYYYMMDDHHmmssSSSS')}${index}.png`
      },
      success: (uploadFileRes) => {
        let url = `${val.domain}${JSON.parse(uploadFileRes.data).key}`;
        resolve(url);
      },
      fail: (err) => {
        uni.showToast({ icon: 'none', title: '上传失败' });
        reject(err);
      }
    });
  });
}

// 多图上传
async function uploadImages(event, picArray) {
  if (!picArray) {
    console.error('图片数组为空');
    return;
  }
  // 先获取上传token
  const { value } = await basicApi.geQiniuToken({ keyPrefix: '', returnBody: '' });
  let lists = [].concat(event.file);
  let fileListLen = picArray.length;
  lists.map((e) => {
    picArray.push({
      ...e,
      status: 'uploading',
      message: '上传中'
    });
  });
  // 遍历上传
  for (let i = 0; i < lists.length; i++) {
    const e = picArray[fileListLen];
    try {
      const result = await uploadQiniu(value, lists[i].url);
      picArray.splice(
        fileListLen,
        1,
        Object.assign(e, {
          status: 'success',
          message: '',
          url: result
        })
      );
    } catch (error) {
      picArray.splice(
        fileListLen,
        1,
        Object.assign(e, {
          status: 'failed',
          message: '上传失败'
        })
      );
    }
    fileListLen++;
  }
}

export { uploadQiniu, uploadImages };
