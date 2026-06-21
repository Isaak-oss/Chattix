import type { ChatRoom, Message, MessageReadWebSocket } from '@entities/chat'
import { useMe } from '@entities/user'
import { updateMessagesCount } from '@features/messages/lib/updateMessagesCounts.ts'
import { type ApiResponse, socketClient } from '@shared/api'
import { CHAT_ROOMS_QUERY_KEY } from '@shared/config'
import { addOrUpdateItemToInfiniteQuery } from '@shared/lib'
import { type InfiniteData, useQueryClient } from '@tanstack/react-query'
import { useSelectedChatRoom } from '@widgets/Chat/model/useSelectedChatRoom.ts'
import { throttle } from 'lodash'
import { useEffect, useMemo } from 'react'

export const useReadMessage = () => {
	const { data: me } = useMe()
	const queryClient = useQueryClient()
	const { selectedChatRoom } = useSelectedChatRoom()
	const socket = socketClient.getSocket()

	const handleReadMessage = useMemo(
		() =>
			throttle((message: Message) => {
				const lastReadAt = selectedChatRoom?.readStates[0]?.lastReadAt
				const isReadByTime =
					!lastReadAt || (message.createdAt && new Date(lastReadAt).getTime() < new Date(message.createdAt).getTime())
				const isNotMeTryToRead = message.senderId !== me!.data.id

				if (isReadByTime && isNotMeTryToRead) {
					socket?.emit('chats:read', {
						roomId: selectedChatRoom?.id,
						lastReadMessageId: message.id
					})
				}
			}, 2000),
		[socket, selectedChatRoom?.id, selectedChatRoom?.readStates, me]
	)

	useEffect(() => {
		if (!selectedChatRoom?.id) return

		const handler = (data: MessageReadWebSocket) => {
			const result = queryClient.setQueriesData<ChatRoom>(
				{ queryKey: [CHAT_ROOMS_QUERY_KEY, selectedChatRoom?.id] },
				old => {
					if (!old) return old

					return {
						...old,
						readStates: [data.readState],
						lastMessage: data.lastMessage,
						unreadMessagesCount: data.unreadMessagesCount
					}
				}
			)

			const chatRoom = result[0]?.[1]

			if (chatRoom) {
				queryClient.setQueriesData<InfiniteData<ApiResponse<ChatRoom[]>>>(
					{ queryKey: [CHAT_ROOMS_QUERY_KEY], exact: true },
					old => addOrUpdateItemToInfiniteQuery(chatRoom, { key: 'id' }, old, true)
				)
			}

			updateMessagesCount(data.totalUnreadMessagesCount)
		}

		socket?.on('chats:read', handler)

		return () => {
			socket?.off('chats:read', handler)
		}
	}, [selectedChatRoom?.id, socket])

	return {
		handleReadMessage
	}
}
