import type { Prisma } from "@prisma/client"

export type UserImageAllRelations = Prisma.UserImageGetPayload<{
	include: {
		likes: true
		user: true
	}
}>
