import { useAuthStore } from '@entities/auth'
import { apiClient } from '@shared/api'

export const initSession = () => {
	apiClient.attachAuthInterceptors({
		getToken: () => useAuthStore.getState().token,
		onUnauthorized: useAuthStore.getState().logout
	})
}
