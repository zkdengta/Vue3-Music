<template>
	<div class="find-music-index">
		<div class="tabs">
			<SubTab :tabs="tabs" />
		</div>
		<div class="router-wrapper">
			<Suspense>
				<RouterView class="router-wrapper__page" v-slot="{ Component }">
					<KeepAlive>
						<component :is="Component" />
					</KeepAlive>
				</RouterView>
			</Suspense>
			<!-- <Suspense>
				<RouterView class="router-wrapper__page" />
			</Suspense> -->
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Tab } from "@/components/SubTab/subTab.vue";
import { ref } from "vue";
import SubTab from "@/components/SubTab/subTab.vue";

const tabs = ref<Tab[]>([
	{
		tab: "个性推荐",
		path: "/index/find-music/personalized-recommendations"
	},
	{
		tab: "专属定制",
		path: "/index/find-music/exclusive-custome"
	},
	{
		tab: "歌单",
		path: "/index/find-music/find-music-playlist"
	},
	{
		tab: "排行榜",
		path: "/index/find-music/rank"
	},
	{
		tab: "歌手",
		path: "/index/find-music/singer"
	},
	{
		tab: "最新音乐",
		path: "/index/find-music/new-music"
	}
]);
</script>
<style scoped lang="scss">
.find-music-index {
	.tabs {
		padding: 30px;
	}
	.router-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		&__page {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 75vw;
			min-width: 765px;
			max-width: 1098px;
			padding: 0 30px;
		}
	}
}
</style>
