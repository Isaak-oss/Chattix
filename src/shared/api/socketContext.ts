import { createContext, useContext, useEffect } from 'react'
import type { Socket } from 'socket.io-client'

export const SocketContext = createContext<Socket | null>(null)

export const useSocket = () => {
	return useContext(SocketContext)
}

export const useSocketEvent = <TData>(event: string, handler: (data: TData) => void) => {
	const socket = useSocket()

	useEffect(() => {
		if (!socket) return

		socket.on(event, handler)

		return () => {
			socket.off(event, handler)
		}
	}, [event, handler, socket])
}
