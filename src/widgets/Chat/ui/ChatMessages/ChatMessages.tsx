import { useMe } from '@entities/user'
import { ArrowLeft } from '@mui/icons-material'
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material'
import { ScrollProvider } from '@shared/lib'
import { DataList, Loader } from '@shared/ui'
import { useChatRoomId } from '@widgets/Chat/model/useChatRoomId.ts'
import { useMessages } from '@widgets/Chat/model/useMessages.ts'
import { ChatNotSelected } from '@widgets/Chat/ui/ChatMessages/ChatNotSelected.tsx'
import { MessageBubble } from '@widgets/Chat/ui/ChatMessages/MessageBubble.tsx'
import { MessageInput } from '@widgets/Chat/ui/ChatMessages/MessageInput.tsx'

export const ChatMessages = () => {
	const { data: me } = useMe()
	const { setSelectedChatRoomId } = useChatRoomId()

	const {
		messages,
		chatRoomId,
		selectedChatRoom,
		isLoading,
		isFetching,
		isFetchingNextPage,
		isRefetching,
		hasNextPage,
		fetchNextPage
	} = useMessages()

	console.log(selectedChatRoom)

	if (!chatRoomId) return <ChatNotSelected />

	if (!selectedChatRoom) return <Loader justifyContent={'center'} />

	return (
		<Stack
			sx={{
				flex: 1,
				bgcolor: 'background.lightGrey',
				minHeight: 0
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
				<IconButton
					sx={{ display: { sm: 'none' }, color: '#1a1a1a' }}
					onClick={() => setSelectedChatRoomId(null)}
					size="small"
				>
					<ArrowLeft />
				</IconButton>
				<Avatar
					sx={{
						width: 40,
						height: 40,
						bgcolor: '#c9a87c',
						color: '#1a1a1a',
						fontSize: 15,
						fontWeight: 500
					}}
				>
					{selectedChatRoom.name?.charAt(0)}
				</Avatar>
				<Box sx={{ flex: 1 }}>
					<Typography
						variant="subtitle2"
						sx={{
							fontWeight: 600,
							lineHeight: 1.2,
							color: '#1a1a1a'
						}}
					>
						{selectedChatRoom.name}
					</Typography>
					<Typography variant="caption" sx={{ color: '#5a8a6c', fontSize: 11 }}>
						Active now
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
					data={messages}
					renderItem={message => <MessageBubble message={message} currentUserId={me!.data.id} />}
					isFetching={isFetching}
					isDataLoading={isLoading}
					isFetchingNextPage={isFetchingNextPage}
					isRefetching={isRefetching}
					hasNextPage={hasNextPage}
					onLoadMore={fetchNextPage}
					reverse
					autoScrollToEnd
					gap={10}
					getItemKey={message => message.id}
				/>
			</ScrollProvider>

			<MessageInput />
		</Stack>
	)
}
