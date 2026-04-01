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
	name: string
}

export type SessionState = {
	token: string | null
	setToken: (token: string | null) => void

	isAuth: boolean
	setIsAuth: (token: boolean) => void

	logout: () => void
}
