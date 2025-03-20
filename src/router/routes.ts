// 对外暴露配置路由
export const constantRoute = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      hidden: true,
      icon: "User",
    },
  },
  {
    path: "/",
    name: "layout",
    component: () => import("@/layout/index.vue"),
    meta: {
      title: "",
      hidden: false,
      icon: "",
    },
    redirect: '/home',
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
          hidden: false,
          icon: "HomeFilled",
        },
      },
    ]
  },
  {
    path: "/screen",
    name: "screen",
    component: () => import("@/views/screen/index.vue"),
    meta: {
      title: "数据大屏",
      hidden: false,
      icon: "Platform",
    },
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("@/layout/index.vue"),
    redirect: '/auth/user',
    meta: {
      title: "权限管理",
      hidden: false,
      icon: "Lock",
    },
    children: [
      {
        path: "/auth/user",
        name: "user",
        component: () => import("@/views/auth/user/index.vue"),
        meta: {
          title: "用户管理",
          hidden: false,
          icon: "User",
        },
      },
      {
        path: "/auth/role",
        name: "role",
        component: () => import("@/views/auth/role/index.vue"),
        meta: {
          title: "角色管理",
          hidden: false,
          icon: "UserFilled",
        },
      },
      {
        path: "/auth/permission",
        name: "permission",
        component: () => import("@/views/auth/permission/index.vue"),
        meta: {
          title: "菜单管理",
          hidden: false,
          icon: "Monitor",
        },
      },
    ],
  },
  {
    path: "/product",
    name: "product",
    component: () => import("@/layout/index.vue"),
    redirect: '/product/trademark',
    meta: {
      title: "商品管理",
      hidden: false,
      icon: "Goods",
    },
    children: [
      {
        path: "/product/trademark",
        name: "trademark",
        component: () => import("@/views/product/trademark/index.vue"),
        meta: {
          title: "品牌管理",
          hidden: false,
          icon: "ShoppingBag",
        },
      },
      {
        path: "/product/sku",
        name: "sku",
        component: () => import("@/views/product/sku/index.vue"),
        meta: {
          title: "SKU管理",
          hidden: false,
          icon: "Present",
        },
      },
      {
        path: "/product/spu",
        name: "spu",
        component: () => import("@/views/product/spu/index.vue"),
        meta: {
          title: "SPU管理",
          hidden: false,
          icon: "Box",
        },
      },
      {
        path: "/product/attr",
        name: "attr",
        component: () => import("@/views/product/attr/index.vue"),
        meta: {
          title: "属性管理",
          hidden: false,
          icon: "Orange",
        },
      },
    ]
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
