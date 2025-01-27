import * as z from "zod"

export const signInSchema = z.object({
	email: z
		.string({ message: "Email является обязательным" })
		.email({ message: "Некорректный email" }),
	password: z.string({ message: "Пароль является обязательным" }),
})

export type SignInSchema = z.infer<typeof signInSchema>
