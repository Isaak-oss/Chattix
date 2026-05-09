import { emailShema, passwordShema } from '@shared/lib'
import { z } from 'zod'

export const signUpFormSchema = z.object({
	email: emailShema,
	password: passwordShema,
	confirmPassword: passwordShema,
	name: z.string()
})

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>
