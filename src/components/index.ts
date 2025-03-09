// 引入项目中全部的全局组件
import SvgIcon from "./SvgIcon/index.vue";
import Pagination from "./Pagination/index.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const allGlobalComponents: any = { SvgIcon, Pagination };

// 对外暴露插件对象
export default {
  install(app: any) {
    Object.keys(allGlobalComponents).forEach((key) => {
      app.component(key, allGlobalComponents[key]);
      // console.log(key, allGlobalComponents[key])
    });
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
