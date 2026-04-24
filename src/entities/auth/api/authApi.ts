import type { Session, SignInBody, SignUpBody } from '@entities/auth'
import { apiClient } from '@src/shared/api'

export const signInApi = async ({ email, password }: SignInBody) => {
	const res = await apiClient.post<Session, SignInBody>('auth/login', { email, password })
	return res.data
}

export const signUpApi = async ({ email, password, name }: SignUpBody) => {
	const res = await apiClient.post<Session, SignUpBody>('auth/register', { email, password, name })
	return res.data
}
