import { emailShema, passwordShema } from '@shared/lib'
import { z } from 'zod'

export const signInFormSchema = z.object({
	email: emailShema,
	password: passwordShema
})

export type SignInFormSchema = z.infer<typeof signInFormSchema>
