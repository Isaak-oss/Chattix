import type { NotificationState, NotificationsCount } from '@entities/notifications'
import { create } from 'zustand'

const updateCounts = (count: NotificationsCount, changes: Partial<NotificationsCount>): NotificationsCount => ({
	all: count.all + (changes.all ?? 0),
	read: count.read + (changes.read ?? 0),
	unread: count.unread + (changes.unread ?? 0)
})

export const useNotificationsStore = create<NotificationState>(set => ({
	count: { all: 0, read: 0, unread: 0 },

	setCount: (count: NotificationsCount) => {
		set({ count })
	},

	readNotification: () => {
		set(state => ({
			count: updateCounts(state.count, {
				read: 1,
				unread: -1
			})
		}))
	},

	deleteNotification: (isRead: boolean) => {
		set(state => ({
			count: updateCounts(state.count, {
				all: -1,
				read: isRead ? -1 : 0,
				unread: isRead ? 0 : -1
			})
		}))
	}
}))
