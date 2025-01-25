<script setup lang="ts">
import { authClient } from "@utils/auth"
import GithubSignIn from "./GithubSignIn.vue"
import SignOut from "./SignOut.vue"

const session = authClient.useSession()
</script>

<template>
	<nav class='py-6'>
		<ul class='flex justify-between items-center'>
			<li>
				<a href="/" class='flex gap-2 items-center font-bold font-kalam text-2xl text-base-content hover:underline'>Astro Blog</a>
			</li>
			<GithubSignIn v-if='!session.data'>Войти</GithubSignIn>
			<div v-else class='flex items-center gap-6'>
				<div>
					<a href="/dashboard">
						<img v-if='!session.data?.user.image' src="" alt="">
						<img v-else :src='session.data?.user.image!' class='w-14  rounded-full' alt="">
					</a>
				</div>
				<div>
					<SignOut>
						Выход
					</SignOut>
				</div>
			</div>
		</ul>
	</nav>
</template>

<style lang="scss" scoped></style>