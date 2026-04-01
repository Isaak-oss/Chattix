import { useAuthStore } from '@entities/auth'
import { apiClient } from '@shared/api'
import { type ReactNode } from 'react'

apiClient.attachAuthInterceptors({
	getToken: () => useAuthStore.getState().token,
	onUnauthorized: useAuthStore.getState().logout
})

export const SessionProvider = ({ children }: { children: ReactNode }) => {
	const token = useAuthStore(s => s.token)

	const setIsAuth = useAuthStore(s => s.setIsAuth)

	// set auth as default if it has token, If getMe reject 401 error, logout will be performed
	if (token) {
		setIsAuth(true)
	}

	return children
}
