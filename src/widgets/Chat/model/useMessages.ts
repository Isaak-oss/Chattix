import { getRoomMessages } from '@entities/chat'
import { CHAT_ROOMS_MESSAGES_QUERY_KEY } from '@shared/config'
import { getNextPageParam } from '@shared/lib'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useChatRoomId } from '@widgets/Chat/model/useChatRoomId.ts'
import { useSelectedChatRoom } from '@widgets/Chat/model/useSelectedChatRoom.ts'

export const useMessages = () => {
	const { chatRoomId } = useChatRoomId()

	const { selectedChatRoom } = useSelectedChatRoom()

	// fetch messages
	const messagesQuery = useInfiniteQuery({
		queryKey: [CHAT_ROOMS_MESSAGES_QUERY_KEY, chatRoomId],
		queryFn: params => getRoomMessages(params.pageParam, chatRoomId!),
		initialPageParam: 0,
		getNextPageParam: getNextPageParam,
		enabled: !!chatRoomId && chatRoomId !== 'new'
	})

	const messages = messagesQuery?.data?.pages.flatMap(page => page.data) || []

	return { ...messagesQuery, messages, chatRoomId, selectedChatRoom }
}
