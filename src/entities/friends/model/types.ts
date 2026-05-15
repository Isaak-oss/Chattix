import type { User } from '@entities/user'

export enum FriendStatusQuery {
	ACCEPTED = 'accepted',
	INCOMING = 'incoming',
	OUTGOING = 'outgoing',
	REJECTED = 'rejected',
}

export enum FriendStatus {
	ACCEPTED = 'accepted',
	INCOMING = 'incoming',
	OUTGOING = 'outgoing',
	REJECTED_BY_ME = 'rejectedByMe',
	REJECTED_BY_USER = 'rejectedByUser'
}

export type Friend = User & {
	friendStatus?: FriendStatus
	friendRequestId?: Id
}

export type FriendsCount = {
	friends: number
	incoming: number
	outgoing: number
	rejected: number
}
