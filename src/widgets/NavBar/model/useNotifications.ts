import { getNotifications } from '@entities/notifications/api/notificationsApi.ts'
import { NOTIFICATIONS_QUERY_KEY } from '@shared/config'
import { getNextPageParam } from '@shared/lib'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useNotifications = () => {
	const query = useInfiniteQuery({
		queryKey: [NOTIFICATIONS_QUERY_KEY],
		queryFn: params => getNotifications(params.pageParam),
		initialPageParam: 0,
		getNextPageParam: getNextPageParam
	})

	const notifications = query?.data?.pages.flatMap(page => page.data) || []

	return { ...query, notifications }
}
