import type { Message } from '@entities/chat'
import { useMe } from '@entities/user'
import { Box, Typography } from '@mui/material'
import { formatDate } from '@shared/lib'

type MessageBubbleProps = {
	message: Message
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
	const { data } = useMe()
	const user = data!.data

	const isMe = message.senderId === user.id

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: isMe ? 'flex-end' : 'flex-start'
			}}
		>
			<Box
				sx={{
					maxWidth: '70%',
					px: 2,
					py: 1.25,
					borderRadius: 2,
					borderBottomRightRadius: isMe ? 0.5 : 2,
					bgcolor: isMe ? '#1a1a1a' : '#fefefe',
					color: isMe ? '#f5f3ef' : '#1a1a1a',
					boxShadow: isMe ? 'none' : '0 1px 2px rgba(26,26,26,0.04)'
				}}
			>
				<Typography variant="body2" sx={{ lineHeight: 1.6, fontSize: 14 }}>
					{message.content}
				</Typography>
				<Typography
					variant="caption"
					sx={{
						display: 'block',
						textAlign: 'right',
						mt: 0.5,
						opacity: 0.6,
						fontSize: 10
					}}
				>
					{message.updatedAt ? formatDate(message.updatedAt) : formatDate(message.createdAt)}
				</Typography>
			</Box>
		</Box>
	)
}
