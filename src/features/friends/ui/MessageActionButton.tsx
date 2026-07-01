import { type ChatRoom, getChatRoomByParticipant } from '@entities/chat'
import { type User, useMe } from '@entities/user'
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined'
import type { ApiResponse } from '@shared/api'
import { CHAT_ROOMS_QUERY_KEY, CHAT_ROOM_ID_SEARCH_PARAM, routes } from '@shared/config'
import { flatMapInfinityData } from '@shared/lib'
import { SubmitButton } from '@shared/ui'
import { type InfiniteData, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router'

export const MessageActionButton = ({ user }: { user: User }) => {
	const { data } = useMe()
	const me = data!.data
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const handleMessageButton = async () => {
		const chatRoomsData = queryClient.getQueryData<InfiniteData<ApiResponse<ChatRoom[]>>>([CHAT_ROOMS_QUERY_KEY])
		const existingChatRoom = flatMapInfinityData(chatRoomsData).find(chatRoom => {
			if (chatRoom.type !== 'direct') return false

			return chatRoom.participants.some(participant => participant.id === user.id)
		})

		if (!existingChatRoom) {
			try {
				const chatRoom = await getChatRoomByParticipant(user.id)
				navigate(routes.messages.path + '?' + CHAT_ROOM_ID_SEARCH_PARAM + '=' + chatRoom.id)
			} catch (err) {
				console.error(err)
				if (
					axios.isAxiosError(err) &&
					err.response?.status === 400 &&
					String(err.response.data?.message).toLowerCase().includes('user not found')
				) {
					queryClient.setQueryData<ChatRoom>([CHAT_ROOMS_QUERY_KEY, 'new'], {
						id: 'new',
						name: user.fullName,
						participants: [user, me],
						type: 'direct',
						createdAt: '',
						updatedAt: '',
						readStates: [],
						lastMessage: {
							id: 'new',
							content: '',
							chatRoomId: 'new',
							sender: me,
							senderId: me.id
						},
						unreadMessagesCount: 0
					} as ChatRoom)

					navigate(routes.messages.path + '?' + CHAT_ROOM_ID_SEARCH_PARAM + '=new')
				} else {
					// TODO: toast error
				}
			}
		} else {
			navigate(routes.messages.path + '?' + CHAT_ROOM_ID_SEARCH_PARAM + '=' + existingChatRoom.id)
		}
	}

	return (
		<SubmitButton
			onClick={handleMessageButton}
			variant="outlined"
			fullWidth
			size="small"
			startIcon={<ModeCommentOutlinedIcon fontSize="small" />}
			sx={{
				fontWeight: 500,
				borderColor: 'divider',
				color: 'text.primary',
				py: 0.75,
				'&:hover': {
					borderColor: 'text.primary',
					bgcolor: 'transparent'
				}
			}}
		>
			Message
		</SubmitButton>
	)
}
