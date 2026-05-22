import { useAuthStore } from '@entities/auth'
import {
	type Notification,
	type NotificationWebSocket,
	getNotificationsCount,
	useNotificationsStore
} from '@entities/notifications'
import { useRevalidateFriends } from '@features/friends'
import { type ApiResponse, notificationsSocketClient } from '@shared/api'
import { NOTIFICATIONS_COUNT_QUERY_KEY, NOTIFICATIONS_QUERY_KEY } from '@shared/config'
import { addItemToInfiniteQuery } from '@shared/lib'
import { type InfiniteData, useQuery, useQueryClient } from '@tanstack/react-query'
import { type ReactNode, useEffect } from 'react'

type SocketProviderProps = {
	children: ReactNode
}

const NotificationsProvider = ({ children }: SocketProviderProps) => {
	const queryClient = useQueryClient()
	const token = useAuthStore(s => s.token)
	const { setCount } = useNotificationsStore()

	const { data: count } = useQuery({ queryKey: [NOTIFICATIONS_COUNT_QUERY_KEY], queryFn: getNotificationsCount })
	const revalidateFriends = useRevalidateFriends()

	useEffect(() => {
		if (count) {
			setCount(count)
		}
	}, [count])

	// connect to notifications web socket
	useEffect(() => {
		if (!token) {
			notificationsSocketClient.disconnect()
			return
		}

		const handler = (data: NotificationWebSocket) => {
			setCount(data.count)
			queryClient.setQueriesData<InfiniteData<ApiResponse<Notification[]>>>(
				{ queryKey: [NOTIFICATIONS_QUERY_KEY] },
				old => addItemToInfiniteQuery(data.data, old, notification => notification.id)
			)
			revalidateFriends()
		}

		const socket = notificationsSocketClient.connect(token)

		socket.on('notifications:new', handler)
	}, [token])

	return children
}

export default NotificationsProvider
