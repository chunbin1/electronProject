import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { notification } from 'antd';
import router from 'umi/router';

const DEFAULT_EXPIRY = 3600; // sec
const BASE_URL = "https://api.github.com"

const instance: AxiosInstance = Axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
  // withCredentials: true,  // todo change
});

// keep only one notification
const createNotification = (message, onClick = undefined) => {
  try {
    notification.destroy();
  } finally {
    notification.error({
      message,
      onClick,
    });
  }
};

/** 错误 */
const errorHandler = (error) => {
  const { message, status } = error;
  // fix for window 403 error
  if (!status) {
    return;
  }
  let msg = `请求错误: ${message}`;
  if (message === 'Network Error') {
    msg = `无法连接到网络！`;
  }
  if (status === 403) {
    msg = `没有权限访问😑！`;
  } else if (status === 401) {
    msg = `未登录（👉🏻点此前往登录👈🏻）`;
    createNotification(msg, () => {
      router.push({
        pathname: '/top',
      });
      notification.destroy();
    });
  } else {
    if (status >= 500) {
      if (message) {
        msg = message;
      } else {
        msg = `服务器错误，请稍后重试😤`;
      }
    }
    createNotification(msg);
  }
  return Promise.reject(error);
};

instance.interceptors.response.use(({ data }) => {
  if (data.ret >= 300) {
    // todo handle
    // if (data.ret === 401) {
    //   return router.push('/login');
    // }
    return errorHandler({ message: data.msg, status: data.ret });
  }
  return data;
}, errorHandler);

const request = ({ whitelist = [], expiry = DEFAULT_EXPIRY }) => ({
  ...instance,
  get: async (url: string, config?: AxiosRequestConfig) => {
    if (config) {
      config.url = url;
    }
    const rsp = await instance.get(url, config);
    return rsp;
  },
});

export default request({ whitelist: [] });