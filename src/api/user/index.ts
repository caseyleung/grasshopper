// 统一管理用户相关的接口
import request from "@/utils/request";
import type { loginForm, loginResponse, userResponse } from "./type";

enum API {
  LOGIN_URL = "/user/login",
  USER_INFO_URL = "/user/info",
}

export const reqLogin = (data: loginForm) => {
  return request.post<any, loginResponse>(API.LOGIN_URL, data);
};

export const reqUserInfo = () => {
  return request.get<any, userResponse>(API.USER_INFO_URL);
};
