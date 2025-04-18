import { createApp } from "vue";
import App from "@/App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { zhCn } from "element-plus/es/locales.mjs";
import "virtual:svg-icons-register";
import "@/styles/index.scss";
// 引入自定义插件对象：注册整个项目全局组件
import globalComponents from "@/components";
import router from "./router";
import pinia from "./store";
import './permission';
import './assets/styles/global.scss';
// 引入暗黑模式css
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App);

app.use(ElementPlus, {
  locale: zhCn,
});

// 安装自定义插件
app.use(globalComponents);
app.use(router);
app.use(pinia);

app.mount("#app");
