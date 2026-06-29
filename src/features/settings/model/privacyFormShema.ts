import { ProfileVisibility, WhoCanMessage } from '@entities/user'
import z from 'zod'

export const privacyFormSchema = z.object({
	profileVisibility: z.enum(ProfileVisibility),
	whoCanMessage: z.enum(WhoCanMessage)
})

export type PrivacyFormSchema = z.infer<typeof privacyFormSchema>
