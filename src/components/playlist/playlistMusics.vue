<template>
	<div class="playlist-music">
		<el-table
			element-loading-background="rgb(43, 43, 43)"
			element-loading-text="载入中..."
			v-loading="loading"
			size="small"
			@row-click="playMusic"
			stripe
			:data="tableData"
			style="width: 100%"
		>
			<template #empty>
				{{ "" }}
			</template>
			<el-table-column type="index" width="50px">
				<template #default="scope">
					<div style="width: 100%; text-align: right">
						{{ indexMethod(scope.$index) }}
					</div>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="70px">
				<template #default="scope">
					<svg-icon style="margin-right: 5px; font-size: 18px; cursor: pointer" name="like_outline"></svg-icon>
					<svg-icon style="font-size: 18px; cursor: pointer" name="download"></svg-icon>
				</template>
			</el-table-column>
			<el-table-column show-overflow-tooltip label="标题">
				<template #default="scope">
					<div style="display: flex; align-items: center; color: rgb(213 213 213)">
						{{ scope.row.name }}
						<svg-icon
							v-if="scope.row.sq && !scope.row.hr"
							style="margin-left: 5px; font-size: 20px"
							name="high-quality"
						></svg-icon>
						<svg-icon
							v-if="scope.row.hr"
							style="position: relative; top: 2px; margin-left: 5px; font-size: 30px"
							name="hires"
						></svg-icon>
						<svg-icon v-if="scope.row.mv" style="margin-left: 5px; font-size: 18px; cursor: pointer" name="mv"></svg-icon>
					</div>
				</template>
			</el-table-column>
			<el-table-column show-overflow-tooltip label="歌手">
				<template #default="scope">
					<div class="table-cell">
						{{ formatAr(scope.row.ar) }}
					</div>
				</template>
			</el-table-column>
			<el-table-column show-overflow-tooltip label="专辑">
				<template #default="scope">
					<div class="table-cell">
						{{ scope.row.al.name }}
					</div>
				</template>
			</el-table-column>
			<el-table-column label="时间" width="100px">
				<template #default="scope">
					<div>
						{{ stampToMin(scope.row.dt) }}
					</div>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getPlaylistMusicApi, getMusicUrlApi } from "@/api";
import { stampToMin } from "@/utils/timeFormat";
import { useGlobalStore } from "@/store/global";
const props = defineProps({
	id: {
		type: [String, Number],
		default: ""
	},
	data: {
		type: Array,
		default: () => []
	}
});
const globalStore = useGlobalStore();
const route = useRoute();
const loading = ref(false);
const tableData = ref<any[]>([]);
const getPlaylistMusic = () => {
	loading.value = true;
	if (!route.query.id && !props.id) {
		tableData.value = props.data;
		globalStore.currentPlaylist = props.data;
		loading.value = false;
		return;
	}
	globalStore.setCurrentPlaylist(Number(route.query.id) || (props.id as number));
	getPlaylistMusicApi({ id: String(route.query.id || props.id) })
		.then(res => {
			tableData.value = res.songs;
		})
		.finally(() => {
			loading.value = false;
		});
};
watch(route, () => {
	getPlaylistMusic();
});
watch(props, () => {
	getPlaylistMusic();
});
getPlaylistMusic();

const playMusic = (row: any) => {
	getMusicUrlApi({
		id: row.id,
		level: globalStore.currentMusicLevel
	}).then(res => {
		globalStore.setAudioUrlAndId(res.data[0].url, row.id);
		globalStore.audioPlay();
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

const indexMethod = (index: number) => {
	let res = "";
	if (index < 9) {
		res = "0" + (index + 1);
	} else {
		res = String(index + 1);
	}
	return res;
};
</script>

<style scoped lang="scss">
:deep(.el-table__header) {
	th {
		background-color: rgb(43 43 43);
		border: none !important;
	}
}
:deep(.el-table__body) {
	border: none !important;
	td {
		background-color: rgb(43 43 43);
		border: none;
		.cell {
			display: flex;
			align-items: center;
		}
	}
}
:deep(.el-table__row--striped) {
	td {
		background-color: rgb(47 47 47) !important;
	}
}
.table-cell {
	cursor: pointer;
	&:hover {
		color: var(--v-m-text-color);
	}
}
:deep(.el-table__empty-block) {
	background-color: var(--v-m-bgc);
}
:deep(.el-table__inner-wrapper::before) {
	bottom: 0;
	left: 0;
	z-index: 3;
	width: 100%;
	height: 0;
}
</style>
