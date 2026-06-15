import type { ChatRoom, Message, NewMessageWebSocket } from '@entities/chat'
import { updateMessagesCount } from '@features/messages/lib/updateMessagesCounts.ts'
import { socketClient } from '@shared/api'
import type { ApiResponse } from '@shared/api'
import { CHAT_ROOMS_MESSAGES_QUERY_KEY, CHAT_ROOMS_QUERY_KEY } from '@shared/config'
import { addItemToInfiniteQuery, addOrUpdateItemToInfiniteQuery } from '@shared/lib'
import type { InfiniteData } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useMessagesRealtime = () => {
	const queryClient = useQueryClient()

	useEffect(() => {
		const socket = socketClient.getSocket()

		if (!socket) return

		const handler = (data: NewMessageWebSocket) => {
			const newMessage = data.data

			queryClient.setQueriesData<InfiniteData<ApiResponse<Message[]>>>(
				{ queryKey: [CHAT_ROOMS_MESSAGES_QUERY_KEY, newMessage.chatRoomId] },
				old => {
					return addItemToInfiniteQuery(newMessage, old, message => message.id)
				}
			)

			queryClient.setQueriesData<InfiniteData<ApiResponse<ChatRoom[]>>>(
				{ queryKey: [CHAT_ROOMS_QUERY_KEY], exact: true },
				old => addOrUpdateItemToInfiniteQuery(newMessage.chatRoom, { key: 'id' }, old, true)
			)

			updateMessagesCount(data.unreadMessagesCount)
		}

		socket.on('message:new', handler)
	}, [])
}
