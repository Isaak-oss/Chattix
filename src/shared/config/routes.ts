import { createRoute } from '@shared/lib'

export const routes = {
	authSignIn: createRoute('/auth/sign-in'),
	authSignUp: createRoute('/auth/sign-up'),
	feed: createRoute('/feed'),
	profile: createRoute<{ profileId: string }>('/profile/:profileId'),
	messages: createRoute('/messages'),
	friends: createRoute('/friends'),
	settings: createRoute('/settings')
}
