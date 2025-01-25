import { auth } from "@utils/auth"
import type { APIRoute } from "astro"

export const prerender = false

export const ALL: APIRoute = async (ctx) => {
	console.log("dwadaw")

	return auth.handler(ctx.request)
}
