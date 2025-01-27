<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Github, KeyRound, Mail } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

import { AUTH_STATUS_CODES } from '@/modules/auth/constants'
import { authClient, signIn } from '@/utils/auth'

import type { SignInSchema } from './constants/signInSchema'

import { signInSchema } from './constants/signInSchema'

const authIsPending = ref(false)

const { handleSubmit, defineField, errors } = useForm<SignInSchema>({
  validationSchema: toTypedSchema(signInSchema),
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  authIsPending.value = true

  await authClient.signIn.email(
    {
      email: values.email,
      password: values.password,
    },
    {
      onSuccess() {
        authIsPending.value = false
        window.location.href = '/'
      },
      onError({ error }) {
        toast(AUTH_STATUS_CODES[error?.code], {
          position: toast.POSITION.TOP_RIGHT,
        })
      },
    },
  )
})
</script>

<template>
  <div class="text-2xl font-bold mb-4">
    Вход
  </div>
  <form class="card bg-base-100 flex flex-col py-3 w-full lg:w-1/4" @submit.prevent="onSubmit">
    <div class="pb-6 relative">
      <label class="input input-bordered flex items-center gap-2">
        <Mail />
        <input
          v-model="email"
          v-bind="emailAttrs"
          type="text"
          name="email"
          class="grow"
          placeholder="Email"
        >
      </label>
      <p class="text-error text-sm absolute bottom-1 left-0">
        {{ errors.email }}
      </p>
    </div>

    <div class="pb-6 relative">
      <label class="input input-bordered flex items-center gap-2">
        <KeyRound />
        <input
          v-model="password"
          v-bind="passwordAttrs"
          type="password"
          name="password"
          class="grow"
          placeholder="Пароль"
        >
      </label>
      <p class="text-error text-sm absolute bottom-1 left-0">
        {{ errors.password }}
      </p>
    </div>

    <div class="flex gap-4 flex-col">
      <button class="btn btn-primary" type="submit" :disabled="authIsPending">
        Войти
      </button>
      <button class="btn" type="button" :disabled="authIsPending" @click="signIn">
        <Github /> Github
      </button>
    </div>
  </form>

  <div>
    Если у вас нет аккаунта, то
    <a href="/auth?type=sign-up" class="underline text-blue-600">зарегистрироваться</a>
  </div>
</template>
