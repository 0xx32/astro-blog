import { DICEBEAR_AVATARS } from "@utils/constants/dicebear-avatars"

export const getRandomAvatarName = (gender: "male" | "female") =>
	DICEBEAR_AVATARS[gender][Math.floor(Math.random() * DICEBEAR_AVATARS[gender].length)]
