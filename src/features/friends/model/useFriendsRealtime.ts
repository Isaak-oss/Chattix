import { type Friend, type FriendsOnlineStatusWebSocket } from '@entities/friends'
import type { Profile } from '@entities/user'
import { updateParticipantOnlineInChatRooms } from '@features/messages/lib/updateParticipantsOnlineStatus.ts'
import { type ApiResponse, useSocket, useSocketEvent } from '@shared/api'
import { FRIENDS_QUERY_KEY, USER_QUERY_KEY, second } from '@shared/config'
import { updateItemToInfiniteQuery } from '@shared/lib'
import { type InfiniteData, useQueryClient } from '@tanstack/react-query'
import { debounce } from 'lodash'
import { useCallback, useEffect, useMemo } from 'react'

export const useFriendsRealtime = () => {
	const queryClient = useQueryClient()
	const socket = useSocket()

	const handleOnlineStatus = useMemo(
		() =>
			debounce(() => {
				if (!socket) return

				if (document.hidden) {
					socket.emit('user:online', { isOnline: false })
				} else {
					socket.emit('user:online', { isOnline: true })
				}
			}, second * 2),
		[socket]
	)

	const handleFriendsPresence = useCallback(
		(data: FriendsOnlineStatusWebSocket) => {
			const updatedUser = data.data

			// Update friends list
			queryClient.setQueriesData<InfiniteData<ApiResponse<Friend[]>>>({ queryKey: [FRIENDS_QUERY_KEY] }, old =>
				updateItemToInfiniteQuery(updatedUser, { key: 'id', cleanUpdate: false }, old)
			)

			// Update Participant oline status on chats list
			updateParticipantOnlineInChatRooms(updatedUser.id, updatedUser.isOnline, updatedUser.lastSeenAt)

			// Update friends user
			queryClient.setQueriesData<Profile>(
				{ queryKey: [USER_QUERY_KEY, updatedUser.id] },
				old => old && { ...old, ...updatedUser }
			)
		},
		[queryClient]
	)

	useEffect(() => {
		// change online status locally
		window.addEventListener('visibilitychange', handleOnlineStatus)

		return () => {
			window.removeEventListener('visibilitychange', handleOnlineStatus)
			handleOnlineStatus.cancel()
		}
	}, [handleOnlineStatus])

	useSocketEvent('friends:presence', handleFriendsPresence)
}
