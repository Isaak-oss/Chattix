import type { Session, SignInBody } from '@entities/auth'
import { apiClient } from '@shared/api'

export const signInApi = async ({ email, password }: SignInBody) => {
	const res = await apiClient.post<Session, SignInBody>('auth/login', { email, password: password })
	return res.data
}
