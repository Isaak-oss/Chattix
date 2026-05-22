export enum NotificationType {
	FRIEND_REQUEST = 'friend_request',
	FRIEND_ACCEPTED = 'friend_accepted',
	FRIEND_REJECTED = 'friend_rejected',
	FRIEND_REMOVED = 'friend_removed',
	MESSAGE = 'message',
	SYSTEM = 'system'
}

export type Notification = {
	id: Id
	type: NotificationType
	title: string
	message: string
	data?: Record<string, unknown>
	readAt?: Date
	createdAt: Date
}

export type NotificationsCount = {
	all: number
	read: number
	unread: number
}

export type NotificationState = {
	count: NotificationsCount
	setCount: (count: NotificationsCount) => void
	readNotification: () => void
	deleteNotification: (isRead: boolean) => void
}

export type NotificationWebSocket = {
	data: Notification
	count: NotificationsCount
}
