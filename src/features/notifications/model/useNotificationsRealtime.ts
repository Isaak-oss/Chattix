import { type NotificationWebSocket } from '@entities/notifications'
import { revalidateFriends } from '@features/friends'
import { addNewNotifications, setNotificationsCounts } from '@features/notifications'
import { socketClient } from '@shared/api/socket.ts'
import { useEffect } from 'react'

export const useNotificationsRealtime = () => {
	useEffect(() => {
		const socket = socketClient.getSocket()

		if (!socket) return

		console.log('notifications socket')
		const handler = (data: NotificationWebSocket) => {
			// update notification items
			addNewNotifications(data.data)

			//update notifications counts
			setNotificationsCounts(data.count)

			// revalidate desired data
			if (data.data.type.includes('friend')) {
				revalidateFriends()
			}
		}

		socket.on('notifications:new', handler)
	}, [])
}
