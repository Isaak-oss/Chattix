import type { User } from '@entities/user'
import { apiClient } from '@shared/api'

export const getMe = async () => {
	return await apiClient.get<User>('/user/me')
}
