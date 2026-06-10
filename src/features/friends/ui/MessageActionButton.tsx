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
		queryClient.setQueriesData<ChatRoom>({ queryKey: [CHAT_ROOMS_QUERY_KEY, 'new'] }, () => ({
			id: 'new',
			name: user.name,
			participants: [user, me],
			type: 'direct',
			createdAt: '',
			updatedAt: '',
			readStates: []
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
				borderColor: 'rgba(26,26,26,0.15)',
				color: '#1a1a1a',
				py: 0.75,
				'&:hover': {
					borderColor: '#1a1a1a',
					bgcolor: 'transparent'
				}
			}}
		>
			Message
		</Button>
	)
}
