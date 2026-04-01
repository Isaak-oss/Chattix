import { emailShema, passwordShema } from '@shared/lib/zod/fields.ts'
import { z } from 'zod'

export const signUpFormSchema = z.object({
	email: emailShema,
	password: passwordShema,
	confirmPassword: passwordShema,
	name: z.string()
})

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>
