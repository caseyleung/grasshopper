import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs";

// 对外暴露配置路由
export const constantRoute = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      hidden: true,
      icon: 'User',
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "test11",
      hidden: false,
      icon: 'Pointer',
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "test",
      hidden: false,
      icon: 'Odometer',
    },
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "children",
          hidden: false,
          icon: 'Compass',
        },
      },
    ],
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/layout/index.vue"),
    meta: {
      title: "home",
      hidden: false,
      icon: 'Promotion',
    },
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
          hidden: false,
          icon: 'DataBoard',
        },
      },
      {
        path: "/home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
          hidden: false,
          icon: 'IceTea',
        },
      },
      {
        path: "/test",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "test",
          hidden: false,
          icon: 'Platform',
        },
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404/index.vue"),
    meta: {
      title: "404",
      hidden: true,
    },
  },
  {
    path: "/:patchMatch(.*)*",
    name: "any",
    redirect: "/404",
    meta: {
      title: "任意路由",
      hidden: true,
    },
  },
];
