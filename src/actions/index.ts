import { defineAction } from "astro:actions"
import { z } from "astro:schema"
import { createId } from "@paralleldrive/cuid2"
import { prisma } from "@utils/db"

export const server = {
	addImage: defineAction({
		input: z.object({
			publicId: z.string(),
			format: z.string(),
		}),
		async handler({ publicId, format }, context) {
			const currentUser = context.locals.user

			if (!currentUser) {
				throw new Error("User not found")
			}

			try {
				const newImage = await prisma.userImage.create({
					data: {
						id: createId(),
						userId: currentUser.id,
						url: publicId,
						format,
					},
				})

				return { success: true, image: newImage.url }
			} catch (error) {
				return { success: false, message: "Failed to save image" }
			}
		},
	}),

	likeImage: defineAction({
		input: z.object({
			imageId: z.string(),
		}),
		async handler({ imageId }, context) {
			const currentUserId = context?.locals.user?.id
			if (!currentUserId) throw new Error("User not found")

			try {
				const existingLike = await prisma.imageLike.findFirst({
					where: {
						imageId,
						userId: currentUserId,
					},
				})

				if (existingLike) {
					const deleteLike = await prisma.imageLike.delete({
						where: {
							id: existingLike.id,
							imageId,
						},
					})
				} else {
					const newLike = await prisma.imageLike.create({
						data: {
							id: createId(),
							imageId,
							userId: currentUserId,
						},
					})

					return { success: true, like: newLike }
				}
			} catch (error) {
				return { success: false, message: "Failed to like image" }
			}
		},
	}),
}
