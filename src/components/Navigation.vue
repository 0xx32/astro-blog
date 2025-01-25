<script setup lang="ts">
import type { Session, User } from "better-auth";
import GithubSignIn from "./GithubSignIn.vue";
import SignOut from "./SignOut.vue";

interface Props {
	sesh: {
		session: Session;
		user: User;
	} | null;
}
defineProps<Props>();
</script>

<template>
	<nav class='py-6'>
		<ul class='flex justify-between items-center'>
			<li>
				<a href="/" class='flex gap-2 items-center font-bold font-kalam text-2xl text-base-content hover:underline'>Astro Blog</a>
			</li>
			<GithubSignIn v-if='!sesh'>Войти</GithubSignIn>
			<div v-else class='flex items-center gap-6'>
				<div>
					<a href="/dashboard">
						<img :src='sesh.user.image!' class='w-10  rounded-full' alt="">
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