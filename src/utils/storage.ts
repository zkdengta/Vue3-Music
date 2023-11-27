import { N_M_TOKEN } from "@/config";

export function setToken(token: string) {
	localStorage.setItem(N_M_TOKEN, token);
}
export function getToken() {
	return JSON.parse(JSON.stringify(localStorage.getItem(N_M_TOKEN)));
}
export function removeToken() {
	localStorage.removeItem(N_M_TOKEN);
}
