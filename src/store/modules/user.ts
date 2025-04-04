// 创建用户相关的小仓库

import { defineStore } from "pinia";
// import { loginForm, loginResponse } from "@/api/user/type";
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from "../../api/user/type.ts";
import type { UserState } from "./types/type.ts";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "../../utils/token.ts";
// 引入路由
import { constantRoute } from "../../router/routes.ts";
import { reqLogin, reqUserInfo, reqLogout } from "../../api/user/index.ts";

let useUserStore = defineStore("User", {
  // 小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute, // 仓库存储生成菜单需要的数组（路由）
      username: "",
      avatar: "",
    };
  },
  // 异步或者逻辑的地方
  actions: {
    // async userLogin(data: loginForm) {
    async userLogin(data: loginFormData) {
      // let result: loginResponse = await reqLogin(data);
      let result: { code: number; data: { token: string } } = await reqLogin(data);
      // 成功 --> 返回token
      // 失败 --> 登录失败信息
      if (result.code === 200) {
        this.token = result.data.token;
        SET_TOKEN(result.data.token);
        return Promise.resolve(result); // 成功返回
      } else {
        return Promise.reject(result.data); // 失败返回
      }
    },
    async userInfo() {
      let result: userInfoResponseData = await reqUserInfo();
      // 存储用户信息
      if (result.code == 200) {
        this.username = result.data.username;
        this.avatar = result.data.avatar;
        localStorage.setItem("username", result.data.username);
        return "ok";
      } else {
        return Promise.reject("获取用户信息失败");
      }
    },
    async userLogout() {
      let result: any = await reqLogout();
      console.log("rrrr", result);
      this.token = "";
      this.username = "";
      this.avatar = "";
      REMOVE_TOKEN();
    },
  },
  getters: {},
});

export default useUserStore;
