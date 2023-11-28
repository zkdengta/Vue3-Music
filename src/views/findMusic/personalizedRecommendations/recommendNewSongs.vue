<template>
	<div class="recommend-new-songs">
		<div @dblclick="playMusic(item.id)" class="item" v-for="item in list" :key="item.id">
			<div @click="playMusic(item.id)" class="cover">
				<img :src="item.coverImg" alt="" />
				<div class="svg">
					<svg-icon style="position: relative; left: 1px; font-size: 12px" name="play_red"></svg-icon>
				</div>
			</div>
			<div class="content">
				<div>
					{{ item.name }}
				</div>
				<div class="info">
					<svg-icon style="margin-right: 3px; font-size: 20px" v-if="item.sq && !item.hires" name="high-quality"></svg-icon>
					<svg-icon style="margin-right: 3px; font-size: 24px" v-if="item.hires" name="hires"></svg-icon>
					<svg-icon style="margin-right: 3px; font-size: 20px" v-if="item.mvId" name="mv"></svg-icon>
					<span class="ar" v-for="(ar, index) in item.ar" :key="ar.id">
						{{ ar.name }} {{ index === item.ar.length - 1 ? "" : "/ " }}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { withDefaults } from "vue";

export type RecommendNewSongsType = Array<Item>;
export interface Item {
	id: number;
	ar: Ar[];
	coverImg: string;
	name: string;
	sq?: boolean;
	hires?: boolean;
	mvId?: number;
}
export interface Ar {
	name: string;
	id: number;
	[propName: string]: any;
}
withDefaults(defineProps<NewSongs>(), {
	list: () => []
});

interface NewSongs {
	list: RecommendNewSongsType;
}

const playMusic = (id: number) => {};
</script>

<style scoped lang="scss">
.recommend-new-songs {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	.item {
		display: flex;
		align-items: center;
		width: 32%;
		margin-bottom: 12px;
		font-size: 13px;
		border-radius: 10px;
		&:hover {
			background-color: var(--v-m-hover-bgc);
		}
		.cover {
			position: relative;
			width: 20%;
			margin-right: 6px;
			cursor: pointer;
			img {
				width: 100%;
				border-radius: 10px;
			}
			.svg {
				position: absolute;
				top: 50%;
				left: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 25px;
				height: 25px;
				background-color: rgb(255 255 255 / 90%);
				border-radius: 50%;
				transform: translate(-50%, -50%);
			}
		}
	}
}
.ar {
	cursor: pointer;
	&:hover {
		color: var(--v-m-text-color);
	}
}
.info {
	display: flex;
	align-items: center;
	margin: 6px 0;
	font-size: 12px;
	color: var(--v-m-text-dark-color);
}
</style>
