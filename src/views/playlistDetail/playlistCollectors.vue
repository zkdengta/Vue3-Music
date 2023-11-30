<template>
	<div v-if="collectors.length" class="collectors">
		<div @click="gotoDetail(item.userId)" v-for="(item, index) in collectors" :key="index" class="collector">
			<img :src="item.avatarUrl" alt="" />
			<div class="info">
				<div class="nickname">
					{{ item.nickname }}
					<svg-icon :name="item.gender === 1 ? 'man' : item.gender === 0 ? '' : 'woman'"></svg-icon>
				</div>
				<div class="desc">
					{{ item.description ?? "" }}
				</div>
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
				:total="total"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { getPlaylistCollectorsApi } from "@/api";
import { useRoute } from "vue-router";
import router from "@/router";
const route = useRoute();
const collectors = ref<any>([]);
const total = ref();
const params = reactive({
	id: String(route.query.id),
	limit: 60,
	offset: 1
});
const getPlaylistCollectors = () => {
	getPlaylistCollectorsApi({
		id: params.id,
		limit: params.limit,
		offset: (params.offset - 1) * params.limit
	}).then(res => {
		total.value = res.total;
		collectors.value = res.subscribers;
	});
};
watch(route, () => {
	params.id = String(route.query.id);
	getPlaylistCollectors();
});

getPlaylistCollectors();

const hanldCurrentChange = (page: number) => {
	params.offset = page;
	getPlaylistCollectors();
};

const gotoDetail = (userId: number) => {
	router.push({
		path: "/index/profile",
		query: {
			id: userId
		}
	});
};
</script>

<style scoped lang="scss">
.collectors {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 20px 30px 0;
	.collector {
		display: flex;
		align-items: center;
		width: 350px;
		margin-bottom: 24px;
		img {
			width: 88px;
			height: 88px;
			cursor: pointer;
			border-radius: 50%;
		}
		.info {
			margin-left: 12px;
			font-size: 14px;
			.nickname {
				cursor: pointer;
				&:hover {
					color: #ffffff;
				}
			}
			.desc {
				margin-top: 12px;
				font-size: 13px;
			}
		}
	}
}
.pagination-wrapper {
	display: flex;
	justify-content: center;
	width: 100%;
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
</style>
