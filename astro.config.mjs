import node from "@astrojs/node"
import tailwind from "@astrojs/tailwind"
import vue from "@astrojs/vue"
// @ts-check
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
	integrations: [vue(), tailwind({})],
	output: "static",
	adapter: node({
		mode: "standalone",
	}),
	devToolbar: {
		enabled: false,
	},
})
