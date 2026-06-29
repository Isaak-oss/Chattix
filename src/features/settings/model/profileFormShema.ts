import z from 'zod'

export const profileFormShema = z.object({
	avatar: z.file().optional(),
	fullName: z.string(),
	username: z.string(),
	bio: z.string().optional().nullable()
})

export type ProfileFormShema = z.infer<typeof profileFormShema>
