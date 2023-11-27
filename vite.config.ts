import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import UnoCSS from "unocss/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
// export default defineConfig({ mode }: ConfigEnv): UserConfig => {
//     const env = loadEnv(mode, process.cwd());
// 	return {
// 		plugins: [vue()],
// 		resolve: {
// 			alias: {
// 				"@": path.resolve(__dirname, "./src") //相对路径别名配置，使用 @ 代替 src
// 			}
// 		},
// 		css: {
// 			preprocessorOptions: {
// 				scss: {
// 					additionalData: `@import "@/styles/var.scss";`
// 				}
// 			}
// 		},
// 		server: {
// 			port: 5173,
// 			open: true,
// 			cors: true,
// 			strictPort: false,
// 			proxy: {
// 				"/api": {
// 					target: "http://localhost:3000",
// 					ws: true,
// 					changeOrigin: true,
// 					rewrite: path => path.replace("/api", "")
// 				}
// 			}
// 		}
// 	}
// }

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const env = loadEnv(mode, process.cwd());
	return {
		plugins: [
			vue(),
			UnoCSS(),
			createSvgIconsPlugin({
				iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
				symbolId: "icon-[dir]-[name]"
			})
		],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src") //相对路径别名配置，使用 @ 代替 src
			}
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import "@/styles/var.scss";`
				}
			}
		},
		server: {
			port: 5173,
			open: true,
			cors: true,
			strictPort: false,
			proxy: {
				"/api": {
					target: env.VITE_BASE_URL,
					ws: true,
					changeOrigin: true,
					rewrite: path => path.replace("/api", "")
				}
			}
		}
	};
});
