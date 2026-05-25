import { useAuthStore } from '@entities/auth'
import { useNotificationsRealtime } from '@features/notifications'
import { socketClient } from '@shared/api'
import { type ReactNode, useEffect } from 'react'

export const SocketProvider = ({ children }: { children: ReactNode }) => {
	const token = useAuthStore(s => s.token)

	useEffect(() => {
		if (!token) return

		const socket = socketClient?.connect(token)

		return () => {
			socket?.disconnect()
		}
	}, [token])

	useNotificationsRealtime()

	return children
}
