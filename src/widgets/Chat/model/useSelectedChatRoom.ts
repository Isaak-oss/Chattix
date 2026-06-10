import { type ChatRoom, getChatRoom } from '@entities/chat'
import type { ApiResponse } from '@shared/api'
import { CHAT_ROOMS_QUERY_KEY } from '@shared/config'
import { addItemToInfiniteQuery } from '@shared/lib'
import { type InfiniteData, useQuery, useQueryClient } from '@tanstack/react-query'
import { useChatRoomId } from '@widgets/Chat/model/useChatRoomId.ts'
import { useChatRooms } from '@widgets/Chat/model/useChatRooms.ts'
import { useEffect } from 'react'

export const useSelectedChatRoom = () => {
	const queryClient = useQueryClient()
	const { chatRoomId } = useChatRoomId()

	// get chatRoom info from chatRooms list
	const { chatRooms, isFetching, isLoading } = useChatRooms()
	const selectedChatRoom = chatRooms?.find(({ id }) => id === chatRoomId)
	const canFetchSelectedChatRoom = !!chatRoomId && chatRoomId !== 'new' && !isLoading && !selectedChatRoom

	// if there is no chatRoom in chatRooms list, then fetch chatRoom separately
	const { data: chatRoom } = useQuery({
		queryKey: [CHAT_ROOMS_QUERY_KEY, chatRoomId],
		queryFn: () => getChatRoom(chatRoomId!),
		enabled: canFetchSelectedChatRoom,
		initialData: selectedChatRoom
	})

	// if chatRoom fetched, and it doesn't have in chat rooms list (because of pagination), than add it no the top
	useEffect(() => {
		if (chatRoom && chatRoomId !== 'new' && !isFetching) {
			queryClient.setQueriesData<InfiniteData<ApiResponse<ChatRoom[]>>>(
				{ queryKey: [CHAT_ROOMS_QUERY_KEY], exact: true },
				old => addItemToInfiniteQuery(chatRoom, old, chatRoomItem => chatRoomItem.id)
			)
		}
	}, [chatRoom, chatRoomId, isFetching, queryClient])

	return { selectedChatRoom: chatRoom }
}
