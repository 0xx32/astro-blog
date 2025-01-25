<script setup lang="ts">
import { signOut } from "@utils/auth";

const signOutHandler = async () => {
	const response = await signOut();

	if (response?.error) {
		console.error(response?.error);
		throw new Error(response?.error.message);
	}
	if (response?.success) {
		console.log(response?.data);
		window.location.href = "/";
	}
};
</script>

<template>
	<button class='btn' @click='signOutHandler'>
		<slot />
	</button>
</template>

