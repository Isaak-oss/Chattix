import type { Message } from '@entities/chat'
import CheckIcon from '@mui/icons-material/Check'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import { Box, Stack, Typography } from '@mui/material'
import { formatDate } from '@shared/lib'
import { memo } from 'react'

type MessageBubbleProps = {
	message: Message
	currentUserId: Id
	lastReadAt: string
}

export const MessageBubble = memo(({ message, currentUserId, lastReadAt }: MessageBubbleProps) => {
	const isMe = message.senderId === currentUserId

	const status = !message.createdAt
		? 'sending'
		: new Date(lastReadAt) >= new Date(message.createdAt)
			? 'read'
			: 'unread'

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
					borderBottomRightRadius: isMe ? 0 : 16,
					borderBottomLeftRadius: isMe ? 16 : 0,
					bgcolor: isMe ? '#1a1a1a' : '#fefefe',
					color: isMe ? '#f5f3ef' : '#1a1a1a',
					boxShadow: isMe ? 'none' : '0 1px 2px rgba(26,26,26,0.04)',
					minWidth: 150
				}}
			>
				<Typography variant="body2" sx={{ lineHeight: 1.6, fontSize: 14 }}>
					{message.content}
				</Typography>
				<Stack flexDirection="row" justifyContent={'flex-end'} gap={1}>
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
					{isMe && (
						<Box>
							{status === 'sending' ? (
								<QueryBuilderIcon fontSize="small" sx={{ color: '' }} />
							) : status === 'unread' ? (
								<CheckIcon fontSize="small" sx={{ color: '' }} />
							) : (
								status === 'read' && <DoneAllIcon fontSize="small" sx={{ color: '' }} />
							)}
						</Box>
					)}
				</Stack>
			</Box>
		</Box>
	)
}, areMessageBubblePropsEqual)

function areMessageBubblePropsEqual(prev: MessageBubbleProps, next: MessageBubbleProps) {
	return (
		prev.currentUserId === next.currentUserId &&
		prev.message.id === next.message.id &&
		prev.message.content === next.message.content &&
		prev.message.senderId === next.message.senderId &&
		prev.message.createdAt === next.message.createdAt &&
		prev.message.updatedAt === next.message.updatedAt &&
		prev.lastReadAt === next.lastReadAt
	)
}
