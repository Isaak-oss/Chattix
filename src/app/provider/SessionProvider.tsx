import { useAuthStore } from '@entities/auth'
import { apiClient, notificationsSocketClient } from '@shared/api'
import { type ReactNode, useEffect } from 'react'

apiClient.attachAuthInterceptors({
	getToken: () => useAuthStore.getState().token,
	onUnauthorized: useAuthStore.getState().logout
})

export const SessionProvider = ({ children }: { children: ReactNode }) => {
	const token = useAuthStore(s => s.token)
	const setIsAuth = useAuthStore(s => s.setIsAuth)

	useEffect(() => {
		// Set auth as default if it has token. If getMe rejects with 401, logout will be performed.
		setIsAuth(!!token)

		if (!token) {
			notificationsSocketClient.disconnect()
			return
		}

		notificationsSocketClient.connect(token)

		return () => {
			notificationsSocketClient.disconnect()
		}
	}, [setIsAuth, token])

	return children
}
