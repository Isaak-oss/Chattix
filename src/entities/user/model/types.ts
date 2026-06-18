import type { BaseEntity } from '@globalTypes/base.ts'

export type User = BaseEntity & {
	email: Email
	name: string
	bio?: string
	lastSeenAt: string
	isOnline: boolean
}

export type Profile = User & {
	postsCount: number
	friendsCount: number
	isFriend: boolean
}
