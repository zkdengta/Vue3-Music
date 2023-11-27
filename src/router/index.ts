import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(), //可传参数，配置base路径，例如'/app'
	routes: [
		{
			path: "/",
			redirect: "/home"
		},
		{
			path: "/home",
			component: () => import("@/views/a.vue")
		}
	]
});

export default router;
