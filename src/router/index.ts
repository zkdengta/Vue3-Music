import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(), //可传参数，配置base路径，例如'/app'
	routes: [
		{
			path: "/",
			redirect: "/index"
		},
		{
			path: "/index",
			component: () => import("@/views/appIndex/appIndex.vue")
		}
	]
});

export default router;
