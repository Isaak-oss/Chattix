import { getChatRooms } from '@entities/chat'
import { CHAT_ROOMS_QUERY_KEY } from '@shared/config'
import { getNextPageParam } from '@shared/lib'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useChatRooms = () => {
	const query = useInfiniteQuery({
		queryKey: [CHAT_ROOMS_QUERY_KEY],
		queryFn: params => getChatRooms(params.pageParam),
		initialPageParam: 0,
		getNextPageParam: getNextPageParam
	})

	const chatRooms = query?.data?.pages.flatMap(page => page.data) || []

	return { ...query, chatRooms }
}
