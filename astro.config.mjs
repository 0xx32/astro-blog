import node from "@astrojs/node";
import vue from "@astrojs/vue";
// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
	integrations: [vue(), tailwind(), db()],

	adapter: node({
		mode: "standalone",
	}),
});
