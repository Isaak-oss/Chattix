import { useAuthStore } from '@entities/auth'
import { notificationsSocketClient } from '@shared/api'
import { type ReactNode, useEffect } from 'react'

type SocketProviderProps = {
	children: ReactNode
}

const SocketProvider = ({ children }: SocketProviderProps) => {
	const token = useAuthStore(s => s.token)

	// connect notificationsSocket
	useEffect(() => {
		if (!token) {
			notificationsSocketClient.disconnect()
			return
		}

		const socket = notificationsSocketClient.connect(token)

		socket.on('notifications:new', notification => {
			console.log(notification)
		})

		return () => {
			socket.disconnect()
		}
	}, [token])

	return children
}

export default SocketProvider
