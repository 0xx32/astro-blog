import * as z from "zod"

export const signUpSchema = z.object({
	email: z
		.string({ message: "Email является обязательным" })
		.email({ message: "Некорректный email" }),
	username: z.string({ message: "Имя является обязательным" }),
	password: z.string({ message: "Пароль является обязательным" }),
	gender: z.enum(["male", "female"], { message: "Пол является обязательным" }),
})

export type SignUpSchema = z.infer<typeof signUpSchema>
