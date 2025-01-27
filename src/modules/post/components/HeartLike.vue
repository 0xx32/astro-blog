<script setup lang="ts">
import type { User } from 'better-auth'

import { createId } from '@paralleldrive/cuid2'
import { actions } from 'astro:actions'
import { Heart } from 'lucide-vue-next'
import { ref } from 'vue'

import type { UserImageAllRelations } from '@/_types/prisma'

interface Props {
  currentUser: User | null
  imgData: UserImageAllRelations
}
const { imgData, currentUser } = defineProps<Props>()

const likes = ref(imgData.likes)

async function handleLike() {
  if (!currentUser)
    return

  const alreadyLiked = likes.value.some(like => like.userId === currentUser.id)

  if (alreadyLiked) {
    likes.value = likes.value.filter(like => like.userId !== currentUser.id)
  }
  else {
    likes.value = [
      ...likes.value,
      { userId: currentUser.id, imageId: imgData.id, createdAt: new Date(), id: createId() },
    ]
  }

  try {
    const { data, error } = await actions.likeImage({
      imageId: imgData.id,
    })

    if (error)
      likes.value = imgData.likes

    if (data?.success && alreadyLiked) {
      likes.value = likes.value.filter(like => like.userId !== currentUser.id)
    }
    if (data?.success && !alreadyLiked && data?.like) {
      const indexOptimisticLike = likes.value.findIndex(like => like.userId === currentUser.id)
      likes.value = likes.value.splice(indexOptimisticLike, 1, data.like)
    }
  }
  catch (error) {
    likes.value = imgData.likes

    return error
  }
}
</script>

<template>
  <div class="flex items-center gap-2 cursor-pointer hover:opacity-85 transition-all w-fit px-2">
    <span>{{ likes.length }}</span>
    <button @click="handleLike">
      <Heart
        :size="18"
        :class="{
          'fill-red-600 stroke-red-600': likes.some((like) => like.userId === currentUser?.id),
        }"
      />
      <p
        :class="{
          'text-red-600': likes.some((like) => like.userId === currentUser?.id),
        }"
        class="text-sm font-bold"
      />
    </button>
  </div>
</template>
