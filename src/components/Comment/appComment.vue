<template>
	<div class="comment">
		<el-input v-model="commentContent" type="textarea" resize="none" :rows="3" maxlength="140" show-word-limit></el-input>
		<div class="comment-btns">
			<div class="left">
				<svg-icon class="svg" name="topic"></svg-icon>
				<svg-icon class="svg" name="@"></svg-icon>
				<svg-icon class="svg" name="smile"></svg-icon>
			</div>
			<div class="right">
				<div @click="hanldeComment" class="btn">发送</div>
			</div>
		</div>
		<h5 class="subtitle">精彩评论</h5>
		<CommentItem @like-comment="likeComment" :type="type" :comment="item" v-for="(item, index) in hotComments" :key="index" />
		<div class="pagination-wrapper">
			<div class="more-btn">更多精彩评论 ></div>
		</div>
		<h5 class="subtitle">最新评论</h5>
		<CommentItem @like-comment="likeComment" :type="type" :comment="item" v-for="(item, index) in comments" :key="index" />
		<div class="pagination-wrapper">
			<slot name="pagination"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";
import CommentItem, { type Comment } from "./commentItem.vue";
import type { CType } from "@/api";
export type Comments = Array<Comment>;
const commentContent = ref("");
defineProps({
	hotComments: {
		type: Array as PropType<Comments>,
		default: () => []
	},
	comments: {
		type: Array as PropType<Comments>,
		default: () => []
	},
	type: {
		type: Number as PropType<CType>,
		default: 0
	}
});
const emits = defineEmits(["hanldeComment", "likeComment"]);
const hanldeComment = () => {
	emits("hanldeComment", commentContent.value);
	commentContent.value = "";
};
const likeComment = () => {
	emits("likeComment");
};
</script>

<style scoped lang="scss">
.comment {
	// padding: 0 30px 20px;
	:deep(.el-textarea) {
		.el-textarea__inner {
			color: var(--v-m-text-color);
			background-color: rgb(58 58 58) !important;
			box-shadow: none !important;
		}
		.el-input__count {
			background-color: transparent;
		}
	}
	.comment-btns {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 6px;
		.left {
			display: flex;
			align-items: center;
			.svg {
				margin-right: 6px;
				font-size: 20px;
				cursor: pointer;
			}
		}
		.right {
			.btn {
				padding: 6px 12px;
				font-size: 14px;
				cursor: pointer;
				border: 1px solid rgb(75 75 75);
				border-radius: 2em;
				&:hover {
					background-color: rgb(54 54 54);
				}
			}
		}
	}
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
.more-btn {
	padding: 8px 16px;
	margin-bottom: 20px;
	font-size: 14px;
	cursor: pointer;
	border: 1px solid rgb(75 75 75);
	border-radius: 2em;
	&:hover {
		background-color: rgb(54 54 54);
	}
}
.subtitle {
	margin-bottom: 6px;
}
</style>
