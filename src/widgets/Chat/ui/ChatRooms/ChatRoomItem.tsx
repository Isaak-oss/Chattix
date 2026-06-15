import type { ChatRoom } from '@entities/chat'
import { useMe } from '@entities/user'
import { Avatar, Badge, Box, Stack, Typography } from '@mui/material'
import { useChatRoomId } from '@widgets/Chat/model/useChatRoomId.ts'
import { memo } from 'react'

type ChatRoomItemProps = {
	chatRoom: ChatRoom
	isSelected: boolean
}

export const ChatRoomItem = memo(({ chatRoom, isSelected }: ChatRoomItemProps) => {
	const { setSelectedChatRoomId } = useChatRoomId()
	const { data } = useMe()

	const lastReadState = chatRoom?.readStates[chatRoom?.readStates?.length]

	const isUnread = chatRoom.unreadMessagesCount > 0

	const chatName =
		chatRoom.type === 'direct'
			? chatRoom.participants.find(participant => participant.id !== data?.data.id)?.name
			: chatRoom.name

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
				{chatName?.charAt(0)}
			</Avatar>
			<Stack flexDirection="row" alignItems="center" justifyContent="space-between" flex={1}>
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
							{chatName}
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
							{chatRoom?.lastMessage?.content}
						</Typography>
					</Box>
				</Box>
				{isUnread && <Badge badgeContent={chatRoom.unreadMessagesCount} max={99} />}
			</Stack>
		</Box>
	)
})
