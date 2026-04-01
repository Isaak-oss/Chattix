import { env } from '@shared/lib'

export const getToken = () => localStorage.getItem(env.VITE_API_TOKEN_KEY)
