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
			name: "Index",
			redirect: "/index/find-music",
			component: () => import("@/views/appIndex/appIndex.vue"),
			children: [
				{
					path: "/index/find-music",
					name: "FindMusic",
					component: () => import("@/views/findMusic/findMusicIndex.vue"),
					redirect: "/index/find-music/personalized-recommendations",
					children: [
						{
							path: "/index/find-music/personalized-recommendations",
							name: "PersonalizedRecommendations",
							meta: {
								keepAlive: true
							},
							component: () => import("@/views/findMusic/personalizedRecommendations.vue")
						},
						{
							path: "/index/find-music/exclusive-custome",
							name: "ExclusiveCustom",
							meta: {
								keepAlive: true
							},
							component: () => import("@/views/findMusic/exclusiveCustom.vue")
						},
						{
							path: "/index/find-music/find-music-playlist",
							name: "FindMusicPlaylist",
							meta: {
								keepAlive: true
							},
							component: () => import("@/views/findMusic/findMusicPlaylist.vue")
						}
					]
				}
			]
		}
	]
});

export default router;
