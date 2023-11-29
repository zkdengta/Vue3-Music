<template>
	<div class="find-music-playlist">
		<div class="category" v-if="hotPlaylistCategory.length">
			<div class="name">
				<el-popover
					ref="popoverRef"
					style="background: red"
					trigger="click"
					width="880px"
					:show-arrow="false"
					placement="bottom-start"
				>
					<div class="popover-title">
						<a @click="getAllPlaylist('全部歌单')"> 全部歌单</a>
					</div>
					<div class="popover-content">
						<div class="popover-content__item" v-for="(item, index) in playlistCategory" :key="index">
							<div class="icon">
								<svg-icon style="margin-right: 5px; font-size: 26px" :name="item.label"></svg-icon> {{ item.label }}
							</div>
							<div class="categories">
								<div class="item" v-for="(i, index) in item.data" :key="index">
									<a @click="getAllPlaylist(i)" :class="{ active: currentIndexName === i }">
										{{ i }}
									</a>
								</div>
							</div>
						</div>
					</div>
					<template #reference>
						{{ currentIndexName }}
						<svg-icon style="margin-left: 2px; font-size: 14px" name="arrow_right"></svg-icon>
					</template>
				</el-popover>
			</div>
			<div class="tags">
				<div
					:class="{ active: currentIndexName === item.name }"
					@click="changeCategory(index)"
					class="item"
					v-for="(item, index) in hotPlaylistCategory"
					:key="index"
				>
					{{ item.name }}
				</div>
			</div>
		</div>
		<el-skeleton style="width: 100%" :loading="loading" animated :throttle="500">
			<template #template>
				<div style="display: grid; grid-template-columns: repeat(5, 1fr); grid-gap: 15px">
					<div v-for="item in 10" :key="item">
						<el-skeleton-item variant="image" style="width: 100%; height: 190px" />
						<el-skeleton-item variant="text" style="width: 50%" />
					</div>
				</div>
			</template>
			<template #default>
				<div class="play-list">
					<div v-for="(item, index) in playlist" :key="index" class="item">
						<playlistCover style="width: 100%" :cover="item" />
					</div>
				</div>
				<div class="pagination-wrapper">
					<el-pagination
						@current-change="hanldCurrentChange"
						small
						background
						v-model:current-page="params.offset"
						:page-size="60"
						layout="prev, pager, next"
						:total="totals"
					/>
				</div>
			</template>
		</el-skeleton>
	</div>
</template>

<script setup lang="ts">
import { getHotPlaylistCategoryApi, getPlaylistApi, getPlaylistCategoryApi } from "@/api";
import playlistCover, { type PlaylistCover } from "@/components/playlist/playlistCover.vue";
import { reactive, ref } from "vue";

const loading = ref(false);

// 歌单完整分类
interface PlaylistCategoryItem {
	key: number | string;
	label: string;
	data: string[];
}
const playlistCategory = ref<PlaylistCategoryItem[]>([]);
async function getPlaylistCategory() {
	const { categories, sub } = await getPlaylistCategoryApi();

	playlistCategory.value = [];
	for (let k in categories) {
		playlistCategory.value.push({
			key: k,
			label: categories[k],
			data: []
		});
	}
	sub.forEach((item: any) => {
		playlistCategory.value.forEach(i => {
			if (item.category === Number(i.key)) {
				i.data.push(item.name);
			}
		});
	});
}
await getPlaylistCategory();

// 歌单热门分类
const hotPlaylistCategory = ref<any[]>([]);
const currentIndexName = ref("");

async function getHotPlaylistCategory() {
	const { tags } = await getHotPlaylistCategoryApi();
	hotPlaylistCategory.value = tags;
	console.log("hotPlaylistCategory:" + hotPlaylistCategory.value);
}

await getHotPlaylistCategory();

await getHotPlaylistCategory();

// 歌单列表
const params = reactive({
	offset: 1,
	limit: 80,
	cat: ""
});
const totals = ref(0);
const playlist = ref<PlaylistCover[]>([]);
currentIndexName.value = hotPlaylistCategory.value[0].name;
params.cat = hotPlaylistCategory.value[0].name;
const getPlaylist = async () => {
	loading.value = true;
	const { total, playlists } = await getPlaylistApi({
		offset: params.limit * params.offset - 1,
		limit: params.limit,
		cat: params.cat
	}).finally(() => {
		loading.value = false;
	});
	playlist.value = [];
	totals.value = total;
	playlists.forEach((item: any) => {
		playlist.value.push({
			id: item.id,
			name: item.name,
			nickname: item.creator.nickname,
			playcount: item.playCount,
			picUrl: item.coverImgUrl,
			path: "/index/playlist-detail"
		});
	});
};
getPlaylist();

const changeCategory = (index: number) => {
	currentIndexName.value = hotPlaylistCategory.value[index].name;
	params.cat = hotPlaylistCategory.value[index].name;
	getPlaylist();
};

const hanldCurrentChange = (page: number) => {
	params.offset = page;
	getPlaylist();
};
const popoverRef = ref();
const getAllPlaylist = (name: string) => {
	popoverRef.value.hide();
	params.cat = name;
	currentIndexName.value = name;
	getPlaylist();
};
</script>
<style scoped lang="scss">
.category {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 24px;
	.name {
		display: flex;
		align-items: center;
		padding: 5px 30px;
		font-size: 12px;
		cursor: pointer;
		border: 1px solid var(--v-m-dark-border-color);
		border-radius: 15px;
		&:hover {
			color: var(--v-m-hover-bgc);
		}
	}
	.tags {
		display: flex;
		.item {
			display: flex;
			align-items: center;
			padding: 3px 10px;
			font-size: 12px;
			color: var(--v-m-text-dark-color);
			cursor: pointer;
			border-radius: 10px;
			&:hover {
				color: var(--v-m-text-color);
			}
		}
	}
}
.play-list {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-gap: 15px;
}
.pagination-wrapper {
	display: flex;
	justify-content: center;
	width: 100%;
	margin-top: 12px;
	:deep(.el-pagination) {
		button {
			color: var(--v-m-text-color);
			background-color: rgb(58 58 58) !important;
			border-radius: 5px;
			&:hover {
				background-color: transparent !important;
			}
		}
		.el-pager {
			li {
				color: var(--v-m-text-color);
				background-color: rgb(43 43 43);
				border: 1px solid rgb(54 54 54);
				border-radius: 5px;
				&:hover {
					border: none;
				}
			}
			.is-active {
				background-color: rgb(236 65 65);
			}
		}
	}
}
.popover-title {
	padding-bottom: 15px;
	color: var(--v-m-text-color);
	cursor: pointer;
	border-bottom: 1px solid var(--v-m-dark-border-color);
}
.popover-content {
	margin-top: 15px;
	&__item {
		display: flex;
		margin-bottom: 20px;
		.icon {
			display: flex;
			align-items: center;
			width: 100px;
		}
		.categories {
			display: flex;
			flex: 1;
			flex-wrap: wrap;
			align-items: center;
			color: var(--v-m-text-color);
			.item {
				padding: 10px 0;
				margin-right: 10px;
				overflow: hidden;
				font-size: 13px;
				text-overflow: ellipsis;
				cursor: pointer;
				a {
					padding: 3px 10px;
					border-radius: 15px;
				}
				a:hover {
					color: rgb(236 65 65) !important;
				}
			}
		}
	}
}
.active {
	color: rgb(236 65 65) !important;
	background-color: rgb(68 55 55);
	&:hover {
		color: rgb(236 65 65);
	}
}
</style>
