import { env } from '@shared/lib'
import { type Socket, io } from 'socket.io-client'

class SocketClient {
	private socket: Socket | null = null
	private socketUrl = new URL('/realtime', env.VITE_API_BASE_URL).toString()

	connect(token: string) {
		this.disconnect()

		this.socket = io(this.socketUrl, {
			auth: {
				token,
				authorization: `Bearer ${token}`
			},
			transports: ['websocket']
		})

		return this.socket
	}

	disconnect() {
		this.socket?.disconnect()
		this.socket = null
	}
}

export const socketClient = new SocketClient()
