import type { Profile, User } from '@entities/user'
import { apiClient } from '@shared/api'

export const getMe = async () => {
	return await apiClient.get<User>('/user/me')
}

export const getUser = async (id: Id) => {
	const res = await apiClient.get<Profile>(`/user/${id}`)
	return res.data
}
