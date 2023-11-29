<template>
	<div class="official-rank">
		<img :src="props.content.coverImgUrl" alt="" />
		<div class="info">
			<ul>
				<li
					@click="playMusic(item)"
					:style="[{ background: index % 2 ? 'transparent' : 'rgb(47, 47, 47)' }]"
					v-for="(item, index) in top5Music"
					:key="index"
				>
					<span
						:style="[{ color: index > 2 ? 'var(--v-m-text-dark-color)' : 'rgb(236, 57, 51)' }]"
						style="margin-right: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap"
						>{{ index + 1 }}</span
					>
					<span style="width: 50%; margin-right: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">
						{{ item.name }}</span
					>
					<span> {{ formatAr(item.ar) }}</span>
				</li>
				<li class="find-all">
					<a @click="gotoDetail">查看全部</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getPlaylistDetailApi } from "@/api";
import { useRouter } from "vue-router";
const router = useRouter();
interface RankType {
	coverImgUrl: string;
	updateTime: number;
	id: number;
	[propName: string]: any;
}
interface Props {
	content: RankType;
}

const props = withDefaults(defineProps<Props>(), {
	content: () => ({ coverImgUrl: "", updateTime: 0, id: 0 })
});

const top5Music = ref<any[]>([]);
const getTop5Music = async () => {
	const { playlist } = await getPlaylistDetailApi(props.content.id);
	top5Music.value = playlist.tracks.slice(0, 5);
};
getTop5Music();

const playMusic = (row: any) => {};

const gotoDetail = () => {
	router.push({
		path: "/index/playlist-detail",
		query: {
			id: props.content.id
		}
	});
};
const formatAr = (arr: any[]): string => {
	let res: string = "";
	arr.forEach((item, index) => {
		const l = index === arr.length - 1 ? "" : "/";
		res += item.name + l;
	});
	return res;
};
</script>

<style scoped lang="scss">
.official-rank {
	display: flex;
	width: 100%;
	padding-bottom: 20px;
	margin-bottom: 20px;
	img {
		width: 168px;
		height: 168px;
		margin-right: 30px;
		border-radius: 10px;
	}
	.info {
		flex: 1;
		ul {
			li {
				display: flex;
				padding: 8px 12px;
				font-size: 13px;
				span:last-child {
					flex: 1;
					color: var(--v-m-text-dark-color);
					text-align: right;
				}
			}
			li:hover {
				background-color: var(--v-m-hover-bgc) !important;
			}
			.find-all {
				color: var(--v-m-text-dark-color);
				cursor: pointer;
				background-color: transparent;
				&:hover {
					background-color: transparent !important;
				}
				a {
					display: flex;
					align-items: center;
				}
				a::after {
					display: inline-block;
					width: 10px;
					height: 10px;
					font-size: 10px;
					content: "";
					background: url("@/icons/svg/arrow_right.svg") no-repeat;
					background-size: 100% 100%;
				}
				a:hover {
					color: var(--v-m-text-color);
				}
			}
		}
	}
}
</style>
