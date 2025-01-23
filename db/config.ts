import { defineDb } from "astro:db";

import * as tables from "./tables";

export default defineDb({
	tables: { ...tables },
});
