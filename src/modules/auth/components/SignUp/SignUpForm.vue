<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod"
import { Gem, Github, KeyRound, Mail, User } from "lucide-vue-next"
import { useForm } from "vee-validate"
import { ref } from "vue"
import { toast } from "vue3-toastify"

import { AUTH_STATUS_CODES } from "@modules/auth/constants"
import { authClient, signIn } from "@utils/auth"
import { getRandomAvatarName } from "@utils/helpers/getRandomAvatarName"
import { type SignUpSchema, signUpSchema } from "./constants/singUpSchema"

const authIsPending = ref(false)

const { handleSubmit, defineField, errors } = useForm<SignUpSchema>({
	validationSchema: toTypedSchema(signUpSchema),
})

const [email, emailAttrs] = defineField("email")
const [username, usernameAttrs] = defineField("username")
const [password, passwordAttrs] = defineField("password")
const [gender, genderAttrs] = defineField("gender")

const onSubmit = handleSubmit(async (values) => {
	authIsPending.value = true

	await authClient.signUp.email(
		{
			email: values.email,
			password: values.password,
			name: values.username,
			image: `https://api.dicebear.com/9.x/adventurer/svg?seed=${getRandomAvatarName(values.gender)}`,
		},
		{
			onSuccess() {
				authIsPending.value = false
				window.location.href = "/"
			},
			onError({ error }) {
				authIsPending.value = false
				toast(AUTH_STATUS_CODES[error?.code], {
					position: toast.POSITION.TOP_RIGHT,
				})
			},
		}
	)

	// resetForm()
})
</script>

<template>
	<div class='text-2xl font-bold mb-4'>Регистрация</div>
	<form @submit.prevent='onSubmit' class='card bg-base-100 flex flex-col py-3 w-full lg:w-1/4'>
		<div class='pb-6 relative'>
			<label class="input input-bordered flex items-center gap-2">
				<Mail />
				<input v-model="email" v-bind="emailAttrs" type="text" name='email' class="grow" placeholder="Email" />
			</label>
			<p class='text-error text-sm absolute bottom-1 left-0'>{{ errors.email }}</p>
		</div>
		<div class='pb-6 relative'>
			<label class="input input-bordered flex items-center gap-2">
				<User />
				<input v-model='username' v-bind="usernameAttrs" type="text" name='username' class="grow" placeholder="Имя" />
			</label>
			<p class='text-error text-sm absolute bottom-1 left-0'>{{ errors.username }}</p>
		</div>

		<div class='pb-6 relative'>
			<label class="flex items-center gap-2">
				<Gem class='absolute left-4' />
				<select class="select select-bordered w-full pl-12"
					@change="gender = (($event?.target as HTMLSelectElement)?.value as typeof gender)" v-bind='genderAttrs'>
					<option disabled selected>Ваш пол?</option>
					<option value='male'>Мужчина</option>
					<option value='female'>Женщина</option>
				</select>
			</label>
			<p class='text-error text-sm absolute bottom-1 left-0'>{{ errors.gender }}</p>

		</div>
		<div class='pb-6 relative'>
			<label class="input input-bordered flex items-center gap-2">
				<KeyRound />
				<input v-model='password' v-bind="passwordAttrs" type="password" name='password' class="grow"
					placeholder='Пароль' />
			</label>
			<p class='text-error text-sm absolute bottom-1 left-0'>{{ errors.password }}</p>
		</div>

		<div class='flex gap-4 flex-col'>
			<button class='btn btn-primary' type='submit' :disabled='authIsPending'>Зарегистрироваться</button>
			<button class='btn ' type='button' @click='signIn' :disabled='authIsPending'>
				<Github /> Github
			</button>
		</div>
	</form>
	<div>Если у вас уже есть аккаунт, то <a href='/auth?type=sign-in' class='underline text-blue-600'>войти</a></div>


</template>
