import type { SessionState } from '@entities/auth'
import { env } from '@shared/lib'
import { queryClient } from '@shared/reactQuery'
import { create } from 'zustand'

export const useAuthStore = create<SessionState>(set => ({
	token: localStorage.getItem(env.VITE_API_TOKEN_KEY),
	isAuth: false,

	setToken: token => {
		if (token) {
			localStorage.setItem(env.VITE_API_TOKEN_KEY, token)
		}

		set({ token })
	},

	setIsAuth: isAuth => {
		set({ isAuth })
	},

	logout: () => {
		localStorage.removeItem(env.VITE_API_TOKEN_KEY)
		queryClient.clear()

		set({ isAuth: false, token: null })
	}
}))
