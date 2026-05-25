import type { Notification } from '@entities/notifications'
import type { ApiResponse } from '@shared/api'
import { NOTIFICATIONS_QUERY_KEY } from '@shared/config'
import { addItemToInfiniteQuery } from '@shared/lib'
import { queryClient } from '@shared/reactQuery'
import type { InfiniteData } from '@tanstack/react-query'

export const addNewNotifications = (data: Notification) => {
	queryClient.setQueriesData<InfiniteData<ApiResponse<Notification[]>>>({ queryKey: [NOTIFICATIONS_QUERY_KEY] }, old =>
		addItemToInfiniteQuery(data, old, notification => notification.id)
	)
}
