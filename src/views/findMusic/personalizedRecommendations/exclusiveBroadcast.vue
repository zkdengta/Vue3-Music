<template>
	<div class="exclusive-broadcast">
		<div class="item" v-for="item in list" :key="item.id">
			<div class="cover">
				<img :src="item.coverImg" alt="" />
				<div class="svg">
					<svg-icon style="font-size: 12px" name="play"></svg-icon>
				</div>
			</div>
			<div class="name">
				{{ item.name }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { withDefaults } from "vue";
export type List = Array<Item>;
export interface Item {
	id: number;
	coverImg: string;
	name: string;
}

interface Props {
	list: List;
}
withDefaults(defineProps<Props>(), {
	list: () => []
});
</script>

<style scoped lang="scss">
.exclusive-broadcast {
	display: flex;
	justify-content: space-between;
	.item {
		width: 32%;
		.cover {
			position: relative;
			cursor: pointer;
			img {
				width: 100%;
				border-radius: 10px;
			}
			.svg {
				position: absolute;
				top: 6px;
				left: 6px;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 20px;
				height: 20px;
				border: 1px solid rgb(226 226 226);
				border-radius: 50%;
			}
		}
		.name {
			display: -webkit-box;
			width: 100%;
			margin-top: 6px;
			overflow: hidden;
			text-overflow: ellipsis;
			word-wrap: break-all;
			cursor: pointer;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			&:hover {
				color: var(--v-m-text-active-color);
			}
		}
	}
}
</style>
