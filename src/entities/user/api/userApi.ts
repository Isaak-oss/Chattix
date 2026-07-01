import type { Profile, User, UserUpdateBody } from '@entities/user'
import { apiClient } from '@shared/api'

export const getMe = async () => {
	const res = await apiClient.get<User>('/user/me')

	return res.data
}

export const getUser = async (id: Id) => {
	const res = await apiClient.get<Profile>(`/user/${id}`)
	return res.data
}

export const updateMe = async (data: Partial<UserUpdateBody>) => {
	const res = await apiClient.patch<User>(`/user/me`, data)
	return res.data
}
