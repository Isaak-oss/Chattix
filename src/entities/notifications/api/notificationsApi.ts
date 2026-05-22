import type {Notification, NotificationsCount} from '@entities/notifications/model/types.ts'
import { apiClient } from '@shared/api'

const notificationsLimit = 10

// QUERY
export const getNotifications = async (offset: number = 0) => {
	return apiClient.get<Notification[]>(`notifications?offset=${offset}&limit=${notificationsLimit}`)
}

export const getNotificationsCount = async () => {
	const res = await apiClient.get<NotificationsCount>(`notifications/count`)
	return res.data
}

// MUTATION
export const readNotification = async (notificationId: Id) => {
	return apiClient.patch<Notification>(`notifications/${notificationId}/read`)
}

export const deleteNotification = async (notificationId: Id) => {
	return apiClient.delete<Notification>(`notifications/${notificationId}`)
}
