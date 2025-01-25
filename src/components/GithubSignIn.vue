<script setup lang="ts">
import { signIn } from "@utils/auth";

const signInHanlder = async () => {
	const response = await signIn();

	if (response?.error) {
		console.error(response?.error);
	}
	if (response?.success) {
		console.log(response?.data);
	}
};
</script>

<template>
	<button class='btn btn-primary' @click='signIn'>
		<slot />
	</button>
</template>

<style lang="scss" scoped>

</style>