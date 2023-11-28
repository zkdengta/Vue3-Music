<template>
	<div class="podcast-item">
		<div class="cover" @click="coverClick">
			<img :src="dj.coverImg" alt="" />
			<div class="svg">
				<svg-icon style="font-size: 12px" name="play_red"></svg-icon>
			</div>
		</div>
		<div class="item">
			<div class="title">{{ dj.title }}</div>
			<div class="tag">{{ dj.tag }}</div>
			<div class="info">
				<span class="name">{{ dj.creator }}</span>
				<span class="palycount">
					<svg-icon style="margin-right: 3px; font-size: 10px" name="play_outline"></svg-icon>
					{{ formatCount(dj.playcount) }}
				</span>
				<span class="time">
					<svg-icon style="margin-right: 3px; font-size: 10px" name="time"></svg-icon>
					{{ stampToMin(dj.duration) }}
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { PropType } from "vue";
import { formatCount } from "@/utils";
import { stampToMin } from "@/utils/timeFormat";

export interface Dj {
	coverImg: string;
	title: string;
	tag: string | string[];
	creator: string;
	playcount: number;
	duration: number;
	id: number;
}
defineProps({
	dj: {
		type: Object as PropType<Dj>,
		default: () => {}
	}
});
const coverClick = () => {
	ElMessage.info("接口获取的音频URL暂时都为NULL 此处只做展示");
};
</script>
<style scoped lang="scss">
.podcast-item {
	display: flex;
	align-items: center;
	height: 75px;
	cursor: pointer;
	&:hover {
		background-color: var(--v-m-hover-bgc);
		border-radius: 5px;
	}
	.cover {
		position: relative;
		margin-right: 6px;
		.svg {
			position: absolute;
			right: 5px;
			bottom: 7px;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 25px;
			height: 25px;
			background-color: #ffffff;
			border-radius: 50%;
		}
		img {
			position: relative;
			top: 2px;
			width: 75px;
			height: 75px;
			border-radius: 5px;
		}
	}
	.item {
		font-size: 12px;
		color: var(--v-m-text-dark-color);
		.tag {
			display: inline-block;
			padding: 2px;
			margin: 6px 0;
			border: 1px solid rgb(73 73 73);
		}
		.title {
			font-size: 14px;
			color: var(--v-m-text-color);
		}
		.info {
			display: flex;
			align-items: center;
			span {
				display: inline-block;
				display: flex;
				align-items: center;
				margin-right: 8px;
			}
			.name {
				max-width: 118px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
}
</style>
