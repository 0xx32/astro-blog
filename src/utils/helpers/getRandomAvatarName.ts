import { DICEBEAR_AVATARS } from '@/utils/constants/dicebear-avatars'

export function getRandomAvatarName(gender: 'male' | 'female') {
  return DICEBEAR_AVATARS[gender][Math.floor(Math.random() * DICEBEAR_AVATARS[gender].length)]
}
