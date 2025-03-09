// 通过vue-router插件实现模板路由配置

import { createRouter, createWebHistory } from "vue-router";
import { constantRoute } from "./routes";

let router = createRouter({
  // 路由模式hash
  history: createWebHistory(),
  routes: constantRoute,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});

export default router;
