import type { SessionState } from '@entities/auth'
import { env } from '@shared/lib'
import { queryClient } from '@shared/reactQuery'
import { create } from 'zustand'

const token = localStorage.getItem(env.VITE_API_TOKEN_KEY)

export const useAuthStore = create<SessionState>(set => ({
	token,
	user: null,

	setToken: token => {
		if (token) {
			localStorage.setItem(env.VITE_API_TOKEN_KEY, token)
		} else {
			localStorage.removeItem(env.VITE_API_TOKEN_KEY)
		}

		set(token ? { token } : { token, user: null })
	},

	syncUser: user => {
		set({ user })
	},

	logout: () => {
		localStorage.removeItem(env.VITE_API_TOKEN_KEY)
		queryClient.clear()

		set({ token: null, user: null })
	}
}))
