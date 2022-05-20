/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend } from 'umi-request';
import { message, notification } from 'antd';
import { getPageQuery } from '@/utils/utils';
import { stringify } from 'querystring';
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新增或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新增或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/** 异常处理程序 */

const errorHandler = (error) => {
  return Promise.reject(error);
};
/** 配置request请求时的默认参数 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  timeout: 30 * 1000, // 超时配置
  requestType: 'form',
  // headers: {
  // 	'Access-Control-Allow-Credentials': true,
  // },
});

request.interceptors.request.use((url, options) => {
  // 自定义携带用户信息
  // if (userInfo && userInfo.token) {
  // options.headers['token'] = userInfo.token;
  // }
  // if(url.indexOf(''))
  // options.headers['authorization'] = token;

  console.log('interceptors request===>url', url, 'options', options);
  return { url, options };
});

request.interceptors.response.use(async (response) => {
  const { url } = response;
  console.log('interceptors response===>', 'response', response);

  let data = '';
  if (response.url.indexOf('excel/export') == -1 && response.url.indexOf('api/file/video') == -1) {
    data = await response.clone().json();
    console.log('response', data);
  }
  if (data && data.status && data.status.code !== undefined) {
    //return manual status;
    const errorText = codeMessage[data.status.code] || '';
    const errorCode = data.status.code;
    notification.error({
      message: `请求错误：${url}`,
      description: `错误码：${errorCode || ''}`,
      key: 'errorCode',
    });
    throw new Error(data.status.message || errorText || 'Error');
  }
  if (data && data.error) {
    //return system status;
    console.log('systemresponse,', data);
    const { url } = response;
    const errorText = codeMessage[data.status] || '';

    const errorCode = data.status;

    notification.error({
      message: `请求错误：${url}`,
      description: `错误码：${errorCode || ''}`,
      key: 'errorCode',
    });
    throw new Error(data.error || errorText || 'Error');
  }
  return response;
});

export default request;