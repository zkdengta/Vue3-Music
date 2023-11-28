<template>
	<div :style="{ width }" class="playlist-cover">
		<div @click="gotoDetail" class="cover" ref="playlistCoverRef">
			<div class="text">
				<slot name="text"></slot>
			</div>
			<img :src="cover.picUrl" alt="" fit="cover" />
			<div v-if="cover.playcount" class="play-count">
				{{ formatCount(cover.playcount) }}
			</div>
			<div v-if="cover.nickname" class="creator">
				{{ cover.nickname }}
			</div>
			<div class="play-icon"></div>
		</div>
		<div @click="gotoDetail" class="desc">
			{{ cover.name }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { formatCount } from "@/utils/index";
import type { PropType } from "vue";
import { useRouter } from "vue-router";
export interface PlaylistCover {
	id: number | string;
	playcount: number;
	nickname?: string;
	name?: string;
	picUrl: string;
	path: string;
}
const props = defineProps({
	cover: {
		type: Object as PropType<PlaylistCover>,
		default: () => {}
	},
	height: {
		type: String,
		default: "100%"
	},
	width: {
		type: String,
		default: "100%"
	}
});

const router = useRouter();
const gotoDetail = () => {
	router.push({
		path: props.cover.path,
		query: {
			id: props.cover.id
		}
	});
};
</script>

<style scoped lang="scss">
.playlist-cover {
	margin-bottom: 12px;
}
.cover {
	position: relative;
	margin-bottom: 5px;
	font-size: 14px;
	cursor: pointer;
	.text {
		position: absolute;
		top: 65%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	&:hover {
		.play-icon {
			opacity: 1;
		}
	}
	img {
		width: 100%;
		max-width: 238px;
		height: 100%;
		max-height: 238px;
		aspect-ratio: 1;
		background-size: 100% auto;
		border-radius: 0.25em;
	}
	.play-count {
		position: absolute;
		top: 5px;
		right: 5px;
		display: flex;
		align-items: center;
		font-size: 13px;
		color: #ffffff;
		&::before {
			display: inline-block;
			width: 16px;
			height: 16px;
			font-size: 10px;
			content: "";
			background: url("@/icons/svg/playlist_play.svg") no-repeat;
			background-size: 100% 100%;
		}
	}
	.play-icon {
		position: absolute;
		right: 10px;
		bottom: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px;
		background-color: #ffffff;
		border-radius: 50%;
		opacity: 0;
		&::before {
			position: relative;
			left: 2px;
			display: inline-block;
			width: 16px;
			height: 16px;
			font-size: 10px;
			content: "";
			background: url("@/icons/svg/play_red.svg") no-repeat;
			background-size: 100% 100%;
		}
	}
	.creator {
		position: absolute;
		bottom: 10px;
		left: 10px;
		display: flex;
		align-items: center;
		&::before {
			position: relative;
			left: -3px;
			display: inline-block;
			width: 14px;
			height: 14px;
			font-size: 10px;
			content: "";
			background: url("@/icons/svg/person.svg") no-repeat;
			background-size: 100% 100%;
		}
	}
}
.desc {
	display: -webkit-box;
	width: 100%;
	overflow: hidden;
	font-size: 14px;
	text-overflow: ellipsis;
	word-wrap: break-all;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	&:hover {
		color: #ffffff;
		cursor: pointer;
	}
}
</style>
