<template>
	<div class="user-menus">
		<el-collapse>
			<el-collapse-item>
				<template #title>
					{{ options.title }}
					<svg-icon @click.stop.prevent="handleClick" class="action-svg" name="plus"></svg-icon>
				</template>
				<ul>
					<li @click="gotoPlaylist(item)" v-for="(item, index) in options.data" :key="index">
						<ProfileItemVue class="sub-menu" :item="item">
							<template #prefix>
								<svg-icon :name="item.prefixIcon"></svg-icon>
							</template>
						</ProfileItemVue>
					</li>
				</ul>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>

<script setup lang="ts">
import type { ProfileItem } from "@/components/LoginCard/profileItem.vue";
import type { PropType } from "vue";
import ProfileItemVue from "@/components/LoginCard/profileItem.vue";
import { useRouter } from "vue-router";
export interface OptionData extends ProfileItem {
	[propName: string]: any;
}
const router = useRouter();
interface Options {
	title: string;
	data: OptionData[];
}
defineProps({
	options: {
		type: Object as PropType<Options>,
		default: () => {}
	}
});

const handleClick = () => {
	console.log("test");
};
const gotoPlaylist = (item: ProfileItem) => {
	router.push({
		path: "/index/playlist-detail",
		query: {
			id: item.id
		}
	});
};
</script>

<style scoped lang="scss">
.user-menus {
	.user-menus-title {
		font-size: 12px;
		color: var(--v-m-text-dark-color);
		text-indent: 5px;
		p {
			margin-bottom: 0;
		}
	}
	.action-svg {
		position: relative;
		right: -85px;
		font-size: 24px;
	}
	.sub-menu {
		height: 34px;
		padding: 0 5px;
		border-radius: 0.25em;
	}
}
li {
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 34px;
	margin: 2px 0;
	font-size: 14px;
	text-indent: 5px;
	border-radius: 0.25em;
	&:hover {
		cursor: pointer;
		background-color: var(--v-m-hover-bgc);
	}
}
:deep(.el-collapse) {
	padding: 0;
	margin-top: 10px;
	border: none;
	box-shadow: none;
}
:deep(.el-collapse-item__header) {
	height: 20px;
	color: var(--v-m-text-dark-color) !important;
	text-indent: 5px;
	background-color: var(--v-m-bgc);
	border: none !important;
	box-shadow: none !important;
	.is-active {
		color: var(--v-m-text-dark-color) !important;
	}
}
:deep(.el-collapse-item__content) {
	padding-bottom: 0;
	background-color: var(--v-m-bgc);
}
:deep(.el-collapse-item__wrap) {
	background-color: var(--v-m-bgc);
	border: none;
}
:deep(.el-collapse-item__arrow) {
	position: relative;
	left: -80px;
}
</style>
