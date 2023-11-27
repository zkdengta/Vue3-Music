import { createApp } from "vue";
import "./styles/app.css";
import "virtual:uno.css";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { loadSvg } from "@/icons";

const app = createApp(App);
loadSvg(app);
//路由注册
app.use(router);
//状态管理
app.use(store);
//ElementPlus
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}
app.use(ElementPlus);

app.mount("#app");
