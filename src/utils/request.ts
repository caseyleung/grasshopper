import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from "../store/modules/user";

// 创建axios实列
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASEURL,
  timeout: 5000,
});

// 请求拦截器
request.interceptors.request.use((config) => {
  // conifg 配置对象，headers属性请求头，给服务端携带公共参数
  let userStore = useUserStore();
  let token = userStore.token;
  if (token) {
    config.headers.token = token;
  }
  
  return config;
});

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log('error[interceptors.response]', error);
    let msg = "";
    let status = error.code;
    switch (status) {
      case 401:
        msg = "Token过期";
        break;
      case 403:
        msg = "无权访问";
        break;
      case 404:
        msg = "请求地址错误";
        break;
      case 500:
        msg = "服务器出现错误";
        break;
      default:
        msg = "请求获取失败，请稍后重试！";
        break;
    }
    ElMessage({
      type: "error",
      message: msg,
    });

    return Promise.reject(error);
  }
);

// 对外暴露
export default request;
