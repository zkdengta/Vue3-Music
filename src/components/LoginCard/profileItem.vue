<template>
	<div class="profile-item" :class="{ border: item.showBorder }">
		<span class="icon prefix">
			<slot name="prefix"></slot>
		</span>
		<p class="label">{{ item.label }}</p>
		<span class="icon suffix">
			<slot name="suffix"></slot>
		</span>
		<el-icon v-if="item.url">
			<ArrowRight />
		</el-icon>
	</div>
</template>

<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
import type { PropType } from "vue";
export interface ProfileItem {
	id?: number | string;
	label: string;
	url?: string;
	showBorder?: boolean;
	hasMessage?: boolean;
	suffixText?: string;
	suffixIcon?: string;
	prefixIcon?: string;
}
defineProps({
	item: {
		type: Object as PropType<ProfileItem>,
		default: () => {}
	}
});
</script>

<style scoped lang="scss">
@import "@/styles/root.css";
.profile-item {
	display: flex;
	align-items: center;
	padding: 10px;
	&:hover {
		cursor: pointer;
		background: var(--v-m-hover-bgc);
	}
	.icon {
		display: flex;
		align-items: center;
		margin-right: 6px;
		font-size: 22px;
	}
	.label {
		flex: 1;
		width: 100%;
		padding: 0;
		margin: 0;
		overflow: hidden;
		font-size: 14px;
		color: var(--v-m-text-color);
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}
.border {
	border-bottom: 1px solid var(--v-m-text-color);
}
.el-icon {
	color: var(--v-m-text-color);
}
</style>
