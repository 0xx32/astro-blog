<script setup lang="ts">
import { authClient, signOut } from "@utils/auth"

const session = authClient.useSession()

const signOutHandler = async () => {
	const response = await signOut()

	if (response?.success) window.location.href = "/"
}
</script>

<template>
	<nav class='py-6'>
		<ul class='flex justify-between items-center'>
			<li>
				<a href="/"
					class='flex gap-2 items-center font-bold font-kalam text-2xl text-base-content hover:underline'>Astro Blog</a>
			</li>

			<div v-if='session.isPending' class="skeleton h-[48px] w-[76px]"></div>
			<a v-else-if='!session.data && !session.isPending' class='btn btn-primary' href='/auth?type=sign-in'>
				Войти
			</a>
			<div v-else-if='session.data' class='flex items-center gap-6'>
				<div>
					<a href="/dashboard">
						<img v-if='!session.data?.user.image' src="" alt="">
						<img v-else :src='session.data?.user.image!' class='w-14  rounded-full' alt="">
					</a>
				</div>
				<div>
					<button class='btn' @click='signOutHandler'>
						Выход
					</button>
				</div>
			</div>
		</ul>
	</nav>
</template>
