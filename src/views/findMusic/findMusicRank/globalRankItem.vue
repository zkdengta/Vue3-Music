<template>
	<div class="global-rank-item">
		<div @click="gotoDetail" class="cover">
			<img :src="props.content.coverImgUrl" alt="" />
			<div class="play">
				<svg-icon name="play_red"></svg-icon>
			</div>
			<div class="play-count">
				{{ formatCount(props.content.playCount) }}
			</div>
		</div>
		<div class="name">{{ props.content.name }}</div>
	</div>
</template>

<script setup lang="ts">
import { formatCount } from "@/utils";
import { useRouter } from "vue-router";
const router = useRouter();
interface RankType {
	name: string;
	playCount: number;
	id: number;
	coverImgUrl: string;
	[propName: string]: any;
}
interface Props {
	content: RankType;
}
const props = withDefaults(defineProps<Props>(), {
	content: () => ({ name: "", playCount: 0, id: 0, coverImgUrl: "" })
});
const gotoDetail = () => {
	router.push({
		path: "/index/playlist-detail",
		query: {
			id: props.content.id
		}
	});
};
</script>

<style scoped lang="scss">
.cover {
	position: relative;
	width: 100%;
	height: 100%;
	cursor: pointer;
	img {
		width: 100%;
		height: 100%;
		border-radius: 10px;
	}
	&:hover {
		.play {
			opacity: 1;
		}
	}
	.play-count {
		position: absolute;
		top: 4px;
		right: 4px;
		font-size: 13px;
		color: #ffffff;
	}
	.play {
		position: absolute;
		top: 50%;
		left: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background-color: rgb(255 255 255 / 80%);
		border-radius: 50%;
		opacity: 0;
		transform: translate(-50%, -50%);
	}
}
</style>
