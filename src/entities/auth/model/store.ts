import type { SessionState } from '@entities/auth'
import { env } from '@shared/lib'
import { queryClient } from '@shared/reactQuery'
import { create } from 'zustand'

const token = localStorage.getItem(env.VITE_API_TOKEN_KEY)

export const useAuthStore = create<SessionState>(set => ({
	token,

	setToken: token => {
		if (token) {
			localStorage.setItem(env.VITE_API_TOKEN_KEY, token)
		}

		set({ token })
	},

	logout: () => {
		localStorage.removeItem(env.VITE_API_TOKEN_KEY)
		queryClient.clear()

		set({ token: null })
	}
}))
