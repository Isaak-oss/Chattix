import { getRoomMessages } from '@entities/chat'
import { CHAT_ROOMS_MESSAGES_QUERY_KEY } from '@shared/config'
import { getNextPageParam } from '@shared/lib'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useChatRoomId } from '@widgets/Chat/model/useChatRoomId.ts'
import { useMemo } from 'react'

export const useMessages = () => {
	const { chatRoomId } = useChatRoomId()

	// fetch messages
	const messagesQuery = useInfiniteQuery({
		queryKey: [CHAT_ROOMS_MESSAGES_QUERY_KEY, chatRoomId],
		queryFn: params => getRoomMessages(params.pageParam, chatRoomId!),
		initialPageParam: 0,
		getNextPageParam: getNextPageParam,
		enabled: !!chatRoomId && chatRoomId !== 'new',
		staleTime: 30_000
	})

	const messages = useMemo(() => messagesQuery.data?.pages.flatMap(page => page.data) ?? [], [messagesQuery.data])
	const orderedMessages = useMemo(() => [...messages].reverse(), [messages])

	return { ...messagesQuery, messages, orderedMessages, chatRoomId }
}
