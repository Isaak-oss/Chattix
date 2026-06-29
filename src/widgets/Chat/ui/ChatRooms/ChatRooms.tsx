import SearchIcon from '@mui/icons-material/Search'
import { Box, Divider, InputAdornment, TextField } from '@mui/material'
import { ScrollProvider } from '@shared/lib'
import { DataList } from '@shared/ui'
import { useChatRoomId } from '@widgets/Chat/model/useChatRoomId.ts'
import { useChatRooms } from '@widgets/Chat/model/useChatRooms.ts'
import { ChatRoomItem } from '@widgets/Chat/ui/ChatRooms/ChatRoomItem.tsx'
import { useState } from 'react'

export const ChatRooms = () => {
	const { chatRoomId } = useChatRoomId()

	const [searchQuery, setSearchQuery] = useState('')
	const { chatRooms, isFetching, hasNextPage, isRefetching, isFetchingNextPage, fetchNextPage, isLoading } =
		useChatRooms()

	return (
		<Box
			sx={{
				display: { xs: chatRoomId ? 'none' : 'block', sm: 'block' },
				width: { xs: '100%', sm: 320 },
				flexShrink: 0,
				overflow: 'hidden',
				borderRight: '1px solid',
				borderRightColor: 'divider'
			}}
		>
			<ScrollProvider style={{ overflowX: 'hidden' }}>
				<Box sx={{ p: { xs: 1.5, sm: 2.5 } }}>
					<TextField
						fullWidth
						size="small"
						placeholder="Search conversations..."
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon sx={{ color: 'text.secondary' }} fontSize={'small'} />
									</InputAdornment>
								)
							}
						}}
					/>
				</Box>
				<Divider />
				<DataList
					data={chatRooms}
					renderItem={chatRoom => (
						<ChatRoomItem chatRoom={chatRoom} isSelected={chatRoomId ? chatRoomId === chatRoom.id : false} />
					)}
					isFetching={isFetching}
					hasNextPage={hasNextPage}
					isRefetching={isRefetching}
					isFetchingNextPage={isFetchingNextPage}
					onLoadMore={fetchNextPage}
					isDataLoading={isLoading}
					emptyListTitle={'No chats'}
					gap={1}
				/>
			</ScrollProvider>
		</Box>
	)
}
