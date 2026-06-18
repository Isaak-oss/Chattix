import type { ChatRoom } from '@entities/chat'
import type { ApiResponse } from '@shared/api'
import { CHAT_ROOMS_QUERY_KEY } from '@shared/config'
import { queryClient } from '@shared/reactQuery'
import type { InfiniteData } from '@tanstack/react-query'

export const updateParticipantOnlineInChatRooms = (userId: string, isOnline: boolean, lastSeenAt: string) => {
	const updatedChatRooms: ChatRoom[] = []

	queryClient.setQueriesData<InfiniteData<ApiResponse<ChatRoom[]>>>(
		{ queryKey: [CHAT_ROOMS_QUERY_KEY], exact: true },
		old => {
			if (!old) return old

			return {
				...old,
				pages: old.pages.map(page => ({
					...page,
					data: page.data.map(chatRoom => {
						const hasParticipant = chatRoom.participants.some(participant => participant.id === userId)

						if (!hasParticipant) return chatRoom

						const nextChatRoom: ChatRoom = {
							...chatRoom,
							participants: chatRoom.participants.map(participant =>
								participant.id === userId
									? {
											...participant,
											isOnline,
											lastSeenAt: isOnline ? participant.lastSeenAt : lastSeenAt
										}
									: participant
							)
						}

						updatedChatRooms.push(nextChatRoom)

						return nextChatRoom
					})
				}))
			}
		}
	)

	updatedChatRooms.forEach(chatRoom => {
		queryClient.setQueryData<ChatRoom>([CHAT_ROOMS_QUERY_KEY, chatRoom.id], chatRoom)
	})
}
