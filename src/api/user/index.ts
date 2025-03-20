// 统一管理用户相关的接口
import request from "@/utils/request";
import type { loginForm, loginResponse, userResponse,
  loginFormData, loginResponseData, userInfoResponseData } from "./type";

enum API {
  LOGIN_URL = "/user/login",
  // LOGIN_URL = "/admin/acl/index/login",
  USER_INFO_URL = "/user/info",
  // USER_INFO_URL = "/admin/acl/index/info",
  LOGOUT_URL = "/user/logout",
  // LOGOUT_URL = "/admin/acl/index/logout"
}

// export const reqLogin = (data: loginForm) => {
//   return request.post<any, loginResponse>(API.LOGIN_URL, data);
// };

// export const reqUserInfo = () => {
//   return request.get<userResponse>(API.USER_INFO_URL);
// };

// export const reqLogout = () => {
//   return request.post<any, any>(API.LOGOUT_URL);
// }


export const reqLogin = (data: loginFormData) => {
  return request.post<any, loginResponseData>(API.LOGIN_URL, data);
};

export const reqUserInfo = () => {
  return request.get<any, userInfoResponseData>(API.USER_INFO_URL);
};

export const reqLogout = () => {
  return request.post<any, any>(API.LOGOUT_URL);
}