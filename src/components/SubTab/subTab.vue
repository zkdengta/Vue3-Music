<template>
	<div class="sub-tab">
		<a
			@click="handleClick(item, index)"
			v-for="(item, index) in props.tabs"
			:key="index"
			class="tab"
			:class="{ active: activeClass(item, index) }"
			>{{ item.tab }}</a
		>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export interface Tab {
	tab: string;
	path?: string;
}

interface Props {
	tabs: Array<Tab>;
	withQuery?: boolean;
}

const router = useRouter();
const route = useRoute();
const props = withDefaults(defineProps<Props>(), {
	tabs: () => [],
	withQuery: false
});

const emits = defineEmits(["handleClick"]);

// 根据是否传递path参数控制border-bottom
const handleClick = (item: Tab, index: number) => {
	if (item.path) {
		router.push({
			path: item.path,
			query: props.withQuery ? route.query : undefined
		});
		emits("handleClick", item.path, index);
	} else {
		currentIndex.value = index;
		emits("handleClick", index);
	}
};

const currentIndex = ref(0);
const activeClass = computed(() => {
	return (item: Tab, index: number) => {
		if (item.path) {
			return route.path.includes(item.path);
		} else {
			return currentIndex.value === index;
		}
	};
});
</script>
<style scoped lang="scss">
.sub-tab {
	display: flex;
	align-items: center;
	.tab {
		padding-bottom: 3px;
		margin-right: 20px;
		color: rgb(181 181 181);
		&:hover {
			// 在鼠标移到链接上时添加的特殊样式
			color: #ffffff !important;
			cursor: pointer; // 计算机中将光标呈现为指示链接的指针
		}
	}
	.active {
		font-size: 600;
		font-size: 20px;
		color: rgb(213 213 213);
		border-bottom: 3px solid rgb(236 65 65);
	}
}
</style>
