<template>
	<div class="recommend-mv">
		<div class="item" v-for="item in list" :key="item.id">
			<div class="cover">
				<img :src="item.coverImg" alt="" />
				<div class="play-count">
					<svg-icon style="position: relative; top: -1px; margin-right: 3px; font-size: 12px" name="play_outline"></svg-icon>
					{{ formatCount(item.playcount) }}
				</div>
			</div>
			<div class="name">
				{{ item.name }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { formatCount } from "@/utils";
export interface Item {
	id: number;
	coverImg: string;
	name: string;
	playcount: number;
}
export type RecommendMVType = Array<Item>;

interface Props {
	list: RecommendMVType;
}
withDefaults(defineProps<Props>(), {
	list: () => []
});
</script>

<style scoped lang="scss">
.recommend-mv {
	display: flex;
	align-items: center;
	.item {
		width: 32%;
		margin-right: 12px;
		cursor: pointer;
		.cover {
			position: relative;
			img {
				width: 100%;
				border-radius: 10px;
			}
			.play-count {
				position: absolute;
				top: 6px;
				right: 6px;
				display: flex;
				align-items: center;
				font-size: 13px;
			}
		}
		.name {
			font-size: 14px;
		}
	}
}
</style>
