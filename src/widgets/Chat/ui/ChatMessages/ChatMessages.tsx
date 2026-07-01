import { useMe } from '@entities/user'
import { ArrowLeft } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { ScrollProvider, formatFullLastSeenDate } from '@shared/lib'
import { InfinityDataList, Loader } from '@shared/ui'
import { UserAvatar } from '@shared/ui/UserAvatar'
import { useChatRoomId } from '@widgets/Chat/model/useChatRoomId.ts'
import { useMessages } from '@widgets/Chat/model/useMessages.ts'
import { useReadMessage } from '@widgets/Chat/model/useReadMessage.ts'
import { useSelectedChatRoom } from '@widgets/Chat/model/useSelectedChatRoom.ts'
import { ChatNotSelected } from '@widgets/Chat/ui/ChatMessages/ChatNotSelected.tsx'
import { MessageBubble } from '@widgets/Chat/ui/ChatMessages/MessageBubble.tsx'
import { MessageInput } from '@widgets/Chat/ui/ChatMessages/MessageInput.tsx'

const estimateMessageSize = () => 70

export const ChatMessages = () => {
	const { data: me } = useMe()
	const { setSelectedChatRoomId, chatRoomId } = useChatRoomId()
	const { selectedChatRoom } = useSelectedChatRoom()

	const messagesQuery = useMessages()

	const isDirectChat = selectedChatRoom?.type === 'direct'
	const interlocutor = selectedChatRoom?.participants.find(participant => participant.id !== me?.data.id)
	const isInterlocutorOnline = isDirectChat ? interlocutor?.isOnline : false
	const chatName = isDirectChat ? interlocutor?.fullName : selectedChatRoom?.name

	const { handleReadMessage } = useReadMessage()

	if (!chatRoomId) return <ChatNotSelected />

	if (!selectedChatRoom) return <Loader justifyContent={'center'} />

	return (
		<Stack
			sx={{
				flex: 1,
				bgcolor: 'background.lightGrey',
				minWidth: 0,
				minHeight: 0,
				display: { xs: chatRoomId ? 'flex' : 'none', sm: 'flex' }
			}}
		>
			{/* Chat header */}
			<Stack
				sx={{
					flexDirection: 'row',
					alignItems: 'center',
					gap: 1.5,
					px: { xs: 1.5, sm: 2.5 },
					py: { xs: 1.5, sm: 2 },
					bgcolor: 'background.paper',
					minWidth: 0
				}}
			>
				<IconButton sx={{ display: { sm: 'none' } }} onClick={() => setSelectedChatRoomId(null)} size="small">
					<ArrowLeft />
				</IconButton>
				<UserAvatar isOnline={isInterlocutorOnline} userName={chatName} variant="circular" />
				<Box sx={{ flex: 1, minWidth: 0 }}>
					<Typography variant="subtitle2" noWrap>
						{chatName}
					</Typography>
					<Typography variant="caption" noWrap sx={{ color: 'text.secondary', display: 'block' }}>
						{isDirectChat
							? isInterlocutorOnline
								? 'Online'
								: `Last seen: ${formatFullLastSeenDate(interlocutor?.lastSeenAt)}`
							: `Participants: ${selectedChatRoom.participants.length}`}
					</Typography>
				</Box>
				{/* TODO: Add action functions */}
				{/*<IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}>*/}
				{/*	<Phone size={18} strokeWidth={1.5} />*/}
				{/*</IconButton>*/}
				{/*<IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}>*/}
				{/*	<Video size={18} strokeWidth={1.5} />*/}
				{/*</IconButton>*/}
				{/*<IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}>*/}
				{/*	<MoreVertical size={18} strokeWidth={1.5} />*/}
				{/*</IconButton>*/}
			</Stack>

			{/* Messages */}
			<ScrollProvider sx={{ p: { xs: 1.5, sm: 2 } }}>
				<InfinityDataList
					query={messagesQuery}
					renderItem={message => (
						<MessageBubble message={message} currentUserId={me!.data.id} readStates={selectedChatRoom?.readStates} />
					)}
					reverse
					autoScrollToEnd
					gap={10}
					overscan={6}
					onScroll={handleReadMessage}
					estimateSize={estimateMessageSize}
				/>
			</ScrollProvider>

			<MessageInput />
		</Stack>
	)
}
