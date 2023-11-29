<template>
	<div class="video">
		<div class="page">
			<div class="w-100% flex justify-start mb-24px">
				<SubTab :tabs="tabs" />
			</div>
			<RouterView />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SubTab, { type Tab } from "@/components/SubTab/subTab.vue";

const tabs = ref<Tab[]>([
	{
		tab: "视频",
		path: "/index/video/video-index"
	},
	{
		tab: "MV",
		path: "/index/video/mv-index"
	}
]);
</script>

<style scoped lang="scss">
.video {
	display: flex;
	flex-direction: column;
	align-items: center;
	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 75vw;
		min-width: 765px;
		max-width: 1098px;
		padding: 20px 30px;
	}
}
</style>
