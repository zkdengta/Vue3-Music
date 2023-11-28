<template>
	<div class="podcast-list">
		<div class="item" v-for="(item, index) in list" :key="index">
			<PodcastItem :dj="item" />
		</div>
	</div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import PodcastItem, { type Dj } from "./podcastItem.vue";
export type DjList = Array<Dj>;
defineProps({
	list: {
		type: Array as PropType<DjList>,
		default: () => []
	}
});
</script>

<style scoped lang="scss">
.podcast-list {
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	.item {
		width: 48%;
		margin-right: 12px;
		margin-bottom: 12px;
	}
}
</style>
