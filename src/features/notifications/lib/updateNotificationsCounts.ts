import type { NotificationsCount } from '@entities/notifications'
import { NOTIFICATIONS_COUNT_QUERY_KEY } from '@shared/config'
import { queryClient } from '@shared/reactQuery'

export const updateCounts = (count: NotificationsCount, changes: Partial<NotificationsCount>): NotificationsCount => ({
	all: count.all + (changes.all ?? 0),
	read: count.read + (changes.read ?? 0),
	unread: count.unread + (changes.unread ?? 0)
})

export const updateNotificationsCounts = (action: 'delete' | 'read', isRead: boolean) => {
	queryClient.setQueriesData<NotificationsCount>({ queryKey: [NOTIFICATIONS_COUNT_QUERY_KEY] }, old => {
		if (!old) return old
		return updateCounts(
			old,
			action === 'read'
				? {
						read: 1,
						unread: -1
					}
				: {
						all: -1,
						read: isRead ? -1 : 0,
						unread: isRead ? 0 : -1
					}
		)
	})
}
