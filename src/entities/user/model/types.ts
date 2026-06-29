import type { BaseEntity } from '@globalTypes/base.ts'

export enum ProfileVisibility {
	PUBLIC = 'public',
	FRIENDS_ONLY = 'friendsOnly',
	PRIVATE = 'private'
}

export enum WhoCanMessage {
	EVERYONE = 'everyone',
	FRIENDS_ONLY = 'friendsOnly'
}

export type User = BaseEntity & {
	email: Email
	fullName: string
	username: string
	bio?: string
	lastSeenAt: string
	isOnline: boolean
	whoCanMessage: WhoCanMessage
	profileVisibility: ProfileVisibility
}

export type Profile = User & {
	postsCount: number
	friendsCount: number
	isFriend: boolean
}

export type UserUpdateBody = {
	fullName?: string | null
	username?: string | null
	bio?: string | null
	profileVisibility?: ProfileVisibility
	whoCanMessage?: WhoCanMessage
}
