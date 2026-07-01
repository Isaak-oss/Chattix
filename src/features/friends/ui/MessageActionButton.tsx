import type { ChatRoom } from '@entities/chat'
import { type User, useMe } from '@entities/user'
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined'
import { Button } from '@mui/material'
import { CHAT_ROOMS_QUERY_KEY, CHAT_ROOM_ID_SEARCH_PARAM, routes } from '@shared/config'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

export const MessageActionButton = ({ user }: { user: User }) => {
	const { data } = useMe()
	const me = data!.data
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const handleMessageButton = () => {
		queryClient.setQueryData<ChatRoom>([CHAT_ROOMS_QUERY_KEY, 'new'], () => ({
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
		}))
		navigate(routes.messages.path + '?' + CHAT_ROOM_ID_SEARCH_PARAM + '=new')
	}

	return (
		<Button
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
		</Button>
	)
}
