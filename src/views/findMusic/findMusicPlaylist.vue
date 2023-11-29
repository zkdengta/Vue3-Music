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
	</div>
</template>

<script setup lang="ts">
import { getHotPlaylistCategoryApi, getPlaylistCategoryApi } from "@/api";
import { ref } from "vue";

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

const changeCategory = (index: number) => {
	currentIndexName.value = hotPlaylistCategory.value[index].name;
	// params.cat = hotPlaylistCategory.value[index].name;
	// getPlaylist();
};

const popoverRef = ref();
const getAllPlaylist = (name: string) => {
	popoverRef.value.hide();
	// params.cat = name;
	currentIndexName.value = name;
	// getPlaylist();
};
</script>
<style scoped lang="scss"></style>
