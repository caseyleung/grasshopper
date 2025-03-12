// 路由鉴权: 项目中路由能不能被访问的权限的设置
import router from "./router";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import useUserStore from "./store/modules/user";
import pinia from "./store";
import { GET_TOKEN } from "./utils/token";
import setting from "./setting";

nprogress.configure({ showSpinner: false });

let userStore = useUserStore(pinia);

// 全局的前置守卫
// to: 即将要进入的目标
// from: 当前导航正要离开的路由
// next: 路由的放置函数
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${setting.title}-${to.meta.title}`;
  // 实现进度条的切换的业务
  nprogress.start();
  let token = userStore.token;
  let username = userStore.username;
  if (token && token === GET_TOKEN()) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      if (username) {
        next();
      } else {
        try {
          await userStore.userInfo();
          next();
        } catch (error) {
          // token过期或者用户手动修改本地存储信息
          console.log(error);
          // 退出登录 -> 用户相关数据清空
          userStore.userLogout();
          next({ path: "/login", query: { redirect: to.path } });
        }
      }
    }
  } else {
    if (to.path === "/login") {
      next();
    } else {
      next({ path: "/login", query: { redirect: to.path } });
    }
  }
});

// 全局的后置守卫
router.afterEach((to: any, from: any, next: any) => {
  // 实现进度条的切换的业务
  nprogress.done();
});

// 全部路由: 登录|404|任意路由|首页|数据大屏|权限管理|商品管理
// 未登录：可以访问login,其余的不可以访问[指向login]
// 登录：不可以访问login[指向首页], 其余的路由可以访问
