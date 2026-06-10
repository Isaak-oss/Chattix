import type { ChatRoom, ChatRoomReadState, Message } from '@entities/chat'
import { useMe } from '@entities/user'
import { socketClient } from '@shared/api'
import { CHAT_ROOMS_QUERY_KEY } from '@shared/config'
import { useQueryClient } from '@tanstack/react-query'
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

		const handler = (data: ChatRoomReadState) => {
			queryClient.setQueriesData<ChatRoom>({ queryKey: [CHAT_ROOMS_QUERY_KEY, selectedChatRoom?.id] }, old => {
				if (!old) return old
				return { ...old, readStates: [data] }
			})
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
