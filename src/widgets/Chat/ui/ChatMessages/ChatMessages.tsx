import { useMe } from '@entities/user'
import { ArrowLeft } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { ScrollProvider, formatFullLastSeenDate } from '@shared/lib'
import { DataList, Loader } from '@shared/ui'
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
	const { setSelectedChatRoomId } = useChatRoomId()
	const { selectedChatRoom } = useSelectedChatRoom()

	const {
		orderedMessages,
		chatRoomId,
		isLoading,
		isFetching,
		isFetchingNextPage,
		isRefetching,
		hasNextPage,
		fetchNextPage
	} = useMessages()

	const isDirectChat = selectedChatRoom?.type === 'direct'
	const interlocutor = selectedChatRoom?.participants.find(participant => participant.id !== me?.data.id)
	const isInterlocutorOnline = isDirectChat ? interlocutor?.isOnline : false
	const chatName = isDirectChat ? interlocutor?.name : selectedChatRoom?.name

	const { handleReadMessage } = useReadMessage()

	if (!chatRoomId) return <ChatNotSelected />

	if (!selectedChatRoom) return <Loader justifyContent={'center'} />

	return (
		<Stack
			sx={{
				flex: 1,
				bgcolor: 'background.lightGrey'
			}}
		>
			{/* Chat header */}
			<Stack
				sx={{
					flexDirection: 'row',
					alignItems: 'center',
					gap: 1.5,
					px: 2.5,
					py: 2,
					bgcolor: 'background.paper'
				}}
			>
				<IconButton sx={{ display: { sm: 'none' } }} onClick={() => setSelectedChatRoomId(null)} size="small">
					<ArrowLeft />
				</IconButton>
				<UserAvatar isOnline={isInterlocutorOnline} userName={chatName} variant="circular" />
				<Box sx={{ flex: 1 }}>
					<Typography variant="subtitle2">{chatName}</Typography>
					<Typography variant="caption" sx={{ color: 'text.secondary' }}>
						{isDirectChat
							? isInterlocutorOnline
								? 'Online'
								: `Last seen: ${formatFullLastSeenDate(interlocutor?.lastSeenAt)}`
							: `Participants: ${selectedChatRoom.participants.length}`}
					</Typography>
				</Box>
				{/* TODO: Add action functions */}
				{/*<IconButton size="small" sx={{ color: '#6b6b6b', '&:hover': { color: '#1a1a1a' } }}>*/}
				{/*	<Phone size={18} strokeWidth={1.5} />*/}
				{/*</IconButton>*/}
				{/*<IconButton size="small" sx={{ color: '#6b6b6b', '&:hover': { color: '#1a1a1a' } }}>*/}
				{/*	<Video size={18} strokeWidth={1.5} />*/}
				{/*</IconButton>*/}
				{/*<IconButton size="small" sx={{ color: '#6b6b6b', '&:hover': { color: '#1a1a1a' } }}>*/}
				{/*	<MoreVertical size={18} strokeWidth={1.5} />*/}
				{/*</IconButton>*/}
			</Stack>

			{/* Messages */}
			<ScrollProvider sx={{ p: 2 }}>
				<DataList
					data={orderedMessages}
					renderItem={message => (
						<MessageBubble
							message={message}
							currentUserId={me!.data.id}
							readStates={selectedChatRoom?.readStates}
						/>
					)}
					isFetching={isFetching}
					isDataLoading={isLoading}
					isFetchingNextPage={isFetchingNextPage}
					isRefetching={isRefetching}
					hasNextPage={hasNextPage}
					onLoadMore={fetchNextPage}
					reverse
					autoScrollToEnd
					gap={10}
					overscan={6}
					getItemKey={message => message.id}
					onScroll={handleReadMessage}
					estimateSize={estimateMessageSize}
				/>
			</ScrollProvider>

			<MessageInput />
		</Stack>
	)
}
