import type { ChatRoom, Message, MessageReadWebSocket } from '@entities/chat'
import { useCurrentUser } from '@entities/user'
import { updateMessagesCount } from '@features/messages/lib/updateMessagesCounts.ts'
import { type ApiResponse, useSocket, useSocketEvent } from '@shared/api'
import { CHAT_ROOMS_QUERY_KEY } from '@shared/config'
import { addOrUpdateItemToInfiniteQuery } from '@shared/lib'
import { type InfiniteData, useQueryClient } from '@tanstack/react-query'
import { useSelectedChatRoom } from '@widgets/Chat/model/useSelectedChatRoom.ts'
import { throttle } from 'lodash'
import { useCallback, useEffect, useMemo } from 'react'

export const useReadMessage = () => {
	const currentUser = useCurrentUser()
	const queryClient = useQueryClient()
	const { selectedChatRoom } = useSelectedChatRoom()
	const socket = useSocket()

	const handleReadMessage = useMemo(
		() =>
			throttle((message: Message) => {
				if (!socket) return

				const lastReadAt = selectedChatRoom?.readStates[0]?.lastReadAt
				const isReadByTime =
					!lastReadAt || (message.createdAt && new Date(lastReadAt).getTime() < new Date(message.createdAt).getTime())
				const isNotMeTryToRead = message.senderId !== currentUser.id

				if (isReadByTime && isNotMeTryToRead) {
					socket.emit('chats:read', {
						roomId: selectedChatRoom?.id,
						lastReadMessageId: message.id
					})
				}
			}, 2000),
		[socket, selectedChatRoom?.id, selectedChatRoom?.readStates, currentUser]
	)

	const handleChatRead = useCallback(
		(data: MessageReadWebSocket) => {
			if (!selectedChatRoom?.id) return

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
		},
		[queryClient, selectedChatRoom?.id]
	)

	useEffect(() => {
		return () => {
			handleReadMessage.cancel()
		}
	}, [handleReadMessage])

	useSocketEvent('chats:read', handleChatRead)

	return {
		handleReadMessage
	}
}
