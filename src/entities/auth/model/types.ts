import type { User } from '@entities/user/model/types.ts'

export type Session = {
	access_token: string
}

export type SignInBody = {
	email: string
	password: string
}

export type SignUpBody = {
	email: string
	password: string
	fullName: string
	username: string
}

export type SessionState = {
	token: string | null
	user: User | null
	setToken: (token: string | null) => void
	syncUser: (user: User | null) => void

	logout: () => void
}
