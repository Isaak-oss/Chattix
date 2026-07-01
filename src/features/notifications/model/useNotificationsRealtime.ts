import { type NotificationWebSocket } from '@entities/notifications'
import { revalidateFriends } from '@features/friends'
import { addNewNotifications, setNotificationsCounts } from '@features/notifications'
import { useSocketEvent } from '@shared/api'
import { useCallback } from 'react'

export const useNotificationsRealtime = () => {
	const handleNewNotification = useCallback((data: NotificationWebSocket) => {
		// update notification items
		addNewNotifications(data.data)

		//update notifications counts
		setNotificationsCounts(data.count)

		// revalidate desired data
		if (data.data.type.includes('friend')) {
			revalidateFriends()
		}
	}, [])

	useSocketEvent('notifications:new', handleNewNotification)
}
