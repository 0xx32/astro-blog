import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"

import { prisma } from "../db"

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	socialProviders: {
		github: {
			clientId: import.meta.env.GITHUB_CLIENT_ID || "Ov23liopAyw8ykOUbnmy",
			clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
		},
	},
})
