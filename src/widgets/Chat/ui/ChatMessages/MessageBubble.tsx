import type { ChatRoomReadState, Message } from '@entities/chat'
import CheckIcon from '@mui/icons-material/Check'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import { Box, Stack, Typography } from '@mui/material'
import { formatTime } from '@shared/lib'
import { memo } from 'react'

type MessageBubbleProps = {
	message: Message
	currentUserId: Id
	readStates: ChatRoomReadState[]
}

export const MessageBubble = memo(({ message, currentUserId, readStates }: MessageBubbleProps) => {
	const isMe = message.senderId === currentUserId

	const isRead = readStates.every(readState => new Date(readState.lastReadAt) >= new Date(message.createdAt!))

	const status = !message.createdAt ? 'sending' : isRead ? 'read' : 'unread'

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: isMe ? 'flex-end' : 'flex-start'
			}}
		>
			<Box
				sx={{
					px: 2,
					py: 1.25,
					borderRadius: 2,
					borderBottomRightRadius: isMe ? 0 : 16,
					borderBottomLeftRadius: isMe ? 16 : 0,
					bgcolor: isMe ? 'primary.main' : 'background.paper',
					color: isMe ? 'primary.contrastText' : 'text.primary',
					boxShadow: isMe ? 'none' : theme => `0 1px 2px ${theme.palette.background.lowShadow}`,
					maxWidth: { xs: '88%', sm: '70%' },
					minWidth: { xs: 0, sm: 150 },
					overflowWrap: 'anywhere'
				}}
			>
				<Typography variant="body2" sx={{ lineHeight: 1.6, fontSize: 14 }}>
					{message.content}
				</Typography>
				<Stack flexDirection="row" justifyContent={'flex-end'} gap={1} height={25}>
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
						{message.updatedAt ? formatTime(message.updatedAt) : formatTime(message.createdAt)}
					</Typography>
					{isMe && (
						<Box>
							{status === 'sending' ? (
								<QueryBuilderIcon fontSize="small" />
							) : status === 'unread' ? (
								<CheckIcon fontSize="small" />
							) : (
								status === 'read' && <DoneAllIcon fontSize="small" />
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
		prev.readStates === next.readStates
	)
}
