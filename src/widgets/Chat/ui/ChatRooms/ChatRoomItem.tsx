import type { ChatRoom } from '@entities/chat'
import { useMe } from '@entities/user'
import { Box, Chip, Stack, Typography } from '@mui/material'
import { formatLastSeenDate } from '@shared/lib'
import { formatCount } from '@shared/lib/formatCount.ts'
import { UserAvatar } from '@shared/ui/UserAvatar'
import { useChatRoomId } from '@widgets/Chat/model/useChatRoomId.ts'
import { memo } from 'react'

type ChatRoomItemProps = {
	chatRoom: ChatRoom
	isSelected: boolean
}

export const ChatRoomItem = memo(({ chatRoom, isSelected }: ChatRoomItemProps) => {
	const { setSelectedChatRoomId } = useChatRoomId()
	const { data: me } = useMe()

	const isUnread = chatRoom.unreadMessagesCount > 0

	const isDirectChat = chatRoom?.type === 'direct'
	const interlocutor = chatRoom?.participants.find(participant => participant.id !== me?.data.id)
	const isInterlocutorOnline = isDirectChat ? interlocutor?.isOnline : false
	const chatName = isDirectChat ? interlocutor?.fullName : chatRoom?.name

	return (
		<Box
			onClick={() => setSelectedChatRoomId(chatRoom.id)}
			sx={{
				px: 2,
				py: 1.5,
				cursor: 'pointer',
				bgcolor: isSelected ? 'background.chatRoom' : 'transparent',
				borderLeft: '2px solid',
				borderLeftColor: isSelected ? 'secondary.main' : 'transparent',
				'&:hover': !isSelected ? { bgcolor: 'background.chatRoomHover' } : {},
				transition: 'all 0.15s ease'
			}}
		>
			<Stack flexDirection="row" gap={1.5}>
				<UserAvatar userName={chatName} isOnline={isInterlocutorOnline} />
				<Stack flexDirection="row" alignItems="center" justifyContent="space-between" flex={1} minWidth={0} gap={1}>
					<Box sx={{ flex: 1, minWidth: 0, minHeight: 44 }}>
						<Stack flexDirection="row" gap={1}>
							<Typography noWrap variant="subtitle2" sx={{ flex: 1 }}>
								{chatName}
							</Typography>
							{/*TODO: configure for goup chat room*/}
							<Typography variant="caption" color={'text.secondary'} sx={{ flexShrink: 0 }}>
								{formatLastSeenDate(chatRoom?.lastMessage?.createdAt)}
							</Typography>
						</Stack>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
							<Typography
								variant="caption"
								noWrap
								sx={{
									flex: 1,
									fontWeight: isUnread ? 400 : 500,
									color: isUnread ? 'text.secondary' : 'text.primary',
									fontSize: 12
								}}
							>
								{chatRoom?.lastMessage?.content}
							</Typography>
						</Box>
					</Box>
					{isUnread && (
						<Chip label={formatCount(chatRoom.unreadMessagesCount)} color="secondary" size="small" variant="badge" />
					)}
				</Stack>
			</Stack>
		</Box>
	)
})
