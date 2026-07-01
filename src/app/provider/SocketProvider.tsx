import { useAuthStore } from '@entities/auth'
import { useFriendsRealtime } from '@features/friends'
import { useMessagesRealtime } from '@features/messages'
import { useNotificationsRealtime } from '@features/notifications'
import { SocketContext, socketClient } from '@shared/api'
import { type ReactNode, useEffect, useState } from 'react'
import type { Socket } from 'socket.io-client'

const RealtimeSubscriptions = () => {
	useNotificationsRealtime()
	useMessagesRealtime()
	useFriendsRealtime()

	return null
}

export const SocketProvider = ({ children }: { children: ReactNode }) => {
	const token = useAuthStore(s => s.token)
	const [socket, setSocket] = useState<Socket | null>(null)

	useEffect(() => {
		if (!token) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setSocket(null)

			return
		}

		const nextSocket = socketClient.connect(token)
		setSocket(nextSocket)

		return () => {
			socketClient.disconnect()
			setSocket(null)
		}
	}, [token])

	return (
		<SocketContext.Provider value={socket}>
			<RealtimeSubscriptions />
			{children}
		</SocketContext.Provider>
	)
}
