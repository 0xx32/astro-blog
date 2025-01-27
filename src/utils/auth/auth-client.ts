import { createAuthClient } from 'better-auth/vue'

export const authClient = createAuthClient()

export async function signIn() {
  const response = await authClient.signIn.social({
    provider: 'github',
    callbackURL: '/',
  })

  if (response.error) {
    return {
      error: response.error,
      success: false,
    }
  }

  if (response.data) {
    return { data: response.data, success: true }
  }
}

export async function signOut() {
  const response = await authClient.signOut()

  if (response.error) {
    return {
      error: response.error,
      success: false,
    }
  }

  if (response.data) {
    return { data: response.data, success: true }
  }
}
