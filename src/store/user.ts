import { setToken } from "@/utils/storage";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
	"user",
	() => {
		const loginState = ref(false);
		const userInfo = ref<any>({});
		const loginSuccess = <T extends Object>(profile: T, token: string): void => {
			loginState.value = true;
			userInfo.value = profile;
			setToken(token);
		};
		return { loginState, userInfo, loginSuccess };
	},
	{
		persist: true
	}
);
