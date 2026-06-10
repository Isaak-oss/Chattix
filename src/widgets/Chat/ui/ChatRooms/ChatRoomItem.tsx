import type { ChatRoom } from '@entities/chat'
import { Avatar, Box, Typography } from '@mui/material'
import { useChatRoomId } from '@widgets/Chat/model/useChatRoomId.ts'
import { memo } from 'react'

type ChatRoomItemProps = {
	chatRoom: ChatRoom
	isSelected: boolean
}

export const ChatRoomItem = memo(({ chatRoom, isSelected }: ChatRoomItemProps) => {
	const { setSelectedChatRoomId } = useChatRoomId()

	const lastReadState = chatRoom.readStates[chatRoom.readStates.length]

	const isUnread = !!lastReadState?.lastReadAt

	return (
		<Box
			onClick={() => setSelectedChatRoomId(chatRoom.id)}
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: 1.5,
				px: 2.5,
				py: 1.75,
				cursor: 'pointer',
				bgcolor: isSelected ? 'rgba(201,168,124,0.08)' : 'transparent',
				borderLeft: isSelected ? '2px solid #c9a87c' : '2px solid transparent',
				'&:hover': { bgcolor: 'rgba(26,26,26,0.02)' },
				transition: 'all 0.15s ease'
			}}
		>
			{/* TODO: add online status */}
			<Avatar
				sx={{
					width: 44,
					height: 44,
					bgcolor: '#1a1a1a',
					fontSize: 16,
					fontWeight: 500
				}}
			>
				{chatRoom.name}
			</Avatar>
			<Box sx={{ flex: 1, minWidth: 0 }}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						mb: 0.25
					}}
				>
					<Typography
						variant="body2"
						sx={{
							fontWeight: isUnread ? 500 : 600,
							color: '#1a1a1a',
							fontSize: 14
						}}
						noWrap
					>
						{chatRoom.name}
					</Typography>
					<Typography
						variant="caption"
						sx={{
							flexShrink: 0,
							ml: 1,
							color: '#6b6b6b',
							fontSize: 11
						}}
					>
						{/* @ts-ignore */}
						{lastReadState?.lastReadAt}
					</Typography>
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<Typography
						variant="caption"
						noWrap
						sx={{
							flex: 1,
							fontWeight: isUnread ? 400 : 500,
							color: isUnread ? '#6b6b6b' : '#1a1a1a',
							fontSize: 12
						}}
					>
						{/* TODO: add last message */}
						last massage
					</Typography>
					{isUnread && (
						<Box
							sx={{
								minWidth: 18,
								height: 18,
								borderRadius: 1,
								bgcolor: '#c9a87c',
								color: '#1a1a1a',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: 10,
								fontWeight: 600
							}}
						>
							{/* TODO: add unread messages count */}
							10
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	)
})
