import { NOW, column, defineTable } from "astro:db";

export const Comment = defineTable({
	columns: {
		id: column.number({ primaryKey: true }),
		author: column.text(),
		content: column.text({ optional: true }),
		published: column.date({ default: NOW }),
	},
});
