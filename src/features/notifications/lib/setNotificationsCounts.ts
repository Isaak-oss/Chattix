import type { NotificationsCount } from '@entities/notifications'
import { NOTIFICATIONS_COUNT_QUERY_KEY } from '@shared/config'
import { queryClient } from '@shared/reactQuery'

export const setNotificationsCounts = (counts: NotificationsCount) => {
	queryClient.setQueriesData<NotificationsCount>({ queryKey: [NOTIFICATIONS_COUNT_QUERY_KEY] }, counts)
}
