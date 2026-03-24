import { z } from 'zod'

export const emailShema = z.email({ message: 'Email address is required' })
export const passwordShema = z.string().min(3, { message: 'Password must be at least 3 characters' })
