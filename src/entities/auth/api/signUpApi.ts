import type { Session, SignUpBody } from '@entities/auth'
import { apiClient } from '@shared/api'

export const signUpApi = async ({ email, password, name }: SignUpBody) => {
	const res = await apiClient.post<Session, SignUpBody>('auth/register', { email, password, name })
	return res.data
}
